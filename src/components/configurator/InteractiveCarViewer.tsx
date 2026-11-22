import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  RotateCw, ZoomIn, ZoomOut, Compass, RefreshCw,
  ChevronLeft, ChevronRight, Sparkles, Box, SlidersHorizontal
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface InteractiveCarViewerProps {
  colorHex?: string;
  turntableColor: 'orange' | 'silver' | 'black' | 'red' | 'blue' | 'white';
  viewMode?: '360-turntable' | '3d-canvas';
  headlightsOn?: boolean;
  wheelStyle?: string;
  wheelFinish?: string;
  caliperColor?: string;
  onAngleChange?: (angle: number) => void;
  onViewModeChange?: (mode: '3d-canvas' | '360-turntable') => void;
  resetSignal?: number;
}

export const InteractiveCarViewer: React.FC<InteractiveCarViewerProps> = ({
  colorHex = '#F36B21',
  turntableColor = 'orange',
  viewMode = '3d-canvas',
  headlightsOn = true,
  wheelStyle = 'aeroblade',
  wheelFinish = 'satin-titanium',
  caliperColor = '#F36B21',
  onAngleChange,
  onViewModeChange,
  resetSignal,
}) => {
  const { t, isRTL } = useLanguage();

  // =========================================================================
  // 1. TURNTABLE PHOTOGRAPHIC MODE STATE
  // =========================================================================
  const [frameIndex, setFrameIndex] = useState(4); // Default to frame 4 (~40° heroic front 3/4)
  const [isDraggingTurntable, setIsDraggingTurntable] = useState(false);
  const [startTurntableX, setStartTurntableX] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showHotspots, setShowHotspots] = useState(false);
  const totalFrames = 36;

  // Turntable folder calculation
  const getTurntableFolder = () => {
    if (turntableColor === 'silver' || turntableColor === 'blue' || turntableColor === 'white') return 'silver';
    if (turntableColor === 'black') return 'black';
    return 'orange';
  };

  const currentFolder = getTurntableFolder();
  const formattedIndex = String(frameIndex + 1).padStart(2, '0');
  const frameSrc = `/turntable/${currentFolder}/frame_${formattedIndex}.jpg`;
  const currentAngleDegrees = frameIndex * 10;

  // Preload turntable frames for smooth scrubbing
  useEffect(() => {
    const preloadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= totalFrames; i++) {
      const idx = String(i).padStart(2, '0');
      const img = new Image();
      img.src = `/turntable/${currentFolder}/frame_${idx}.jpg`;
      preloadedImages.push(img);
    }
  }, [currentFolder]);

  const getColorFilter = () => {
    if (turntableColor === 'red') return 'hue-rotate(-20deg) saturate(1.8) brightness(0.95)';
    if (turntableColor === 'blue') return 'hue-rotate(185deg) saturate(1.5) brightness(0.9)';
    if (turntableColor === 'white') return 'saturate(0.1) brightness(1.4)';
    return 'none';
  };

  // Turntable Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDraggingTurntable(true);
    setStartTurntableX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingTurntable) return;
    const deltaX = e.clientX - startTurntableX;
    if (Math.abs(deltaX) > 4) {
      const step = Math.sign(deltaX);
      setFrameIndex((prev) => {
        let next = prev - step;
        if (next < 0) next = totalFrames - 1;
        if (next >= totalFrames) next = 0;
        if (onAngleChange) onAngleChange(next * 10);
        return next;
      });
      setStartTurntableX(e.clientX);
    }
  };

  const handleMouseUp = () => setIsDraggingTurntable(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDraggingTurntable(true);
      setStartTurntableX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingTurntable || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - startTurntableX;
    if (Math.abs(deltaX) > 4) {
      const step = Math.sign(deltaX);
      setFrameIndex((prev) => {
        let next = prev - step;
        if (next < 0) next = totalFrames - 1;
        if (next >= totalFrames) next = 0;
        if (onAngleChange) onAngleChange(next * 10);
        return next;
      });
      setStartTurntableX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => setIsDraggingTurntable(false);

  const stepAngle = (deltaFrames: number) => {
    setFrameIndex((prev) => {
      let next = prev + deltaFrames;
      if (next < 0) next = (next % totalFrames) + totalFrames;
      if (next >= totalFrames) next = next % totalFrames;
      if (onAngleChange) onAngleChange(next * 10);
      return next;
    });
  };

  // Turntable Auto-rotate interval
  useEffect(() => {
    if (!autoRotate || viewMode !== '360-turntable') return;
    const interval = setInterval(() => {
      setFrameIndex((prev) => {
        const next = (prev + 1) % totalFrames;
        if (onAngleChange) onAngleChange(next * 10);
        return next;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [autoRotate, viewMode, onAngleChange]);

  // =========================================================================
  // 2. REAL THREE.JS 3D WEBGL ENGINE
  // =========================================================================
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const carModelRef = useRef<THREE.Group | null>(null);
  const animFrameIdRef = useRef<number | null>(null);

  const [is3DLoading, setIs3DLoading] = useState(true);
  const [load3DError, setLoad3DError] = useState(false);
  const [activePreset, setActivePreset] = useState<'FRONT' | '3/4 FRONT' | 'PROFILE' | '3/4 REAR' | 'REAR'>('3/4 FRONT');

  // Camera Target Vectors for Presets
  const cameraTargetPosition = useRef<THREE.Vector3 | null>(null);

  // Initialize Three.js Scene
  useEffect(() => {
    if (viewMode !== '3d-canvas') return;
    const container = canvasContainerRef.current;
    if (!container) return;

    setIs3DLoading(true);
    setLoad3DError(false);

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(3.8, 1.4, 3.8); // Initial 3/4 front view
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.02; // Prevent going beneath floor
    controls.minDistance = 3.2;
    controls.maxDistance = 8.5;
    controls.target.set(0, 0.45, 0);
    controlsRef.current = controls;

    // 5. Studio Lighting Rig
    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambient);

    // Main key light
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4, 7, 5);
    scene.add(keyLight);

    // Warm orange studio accent rim light
    const orangeRim = new THREE.DirectionalLight(0xf36b21, 2.2);
    orangeRim.position.set(-5, 5, -4);
    scene.add(orangeRim);

    // Cool fill light
    const coolFill = new THREE.DirectionalLight(0x90b0e0, 1.5);
    coolFill.position.set(0, 6, -6);
    scene.add(coolFill);

    // Ground circular shadow disc
    const floorGeo = new THREE.CircleGeometry(3.5, 64);
    const floorMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.7,
      depthWrite: false,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.005;
    scene.add(floor);

    // Outer turntable rim ring
    const ringGeo = new THREE.RingGeometry(3.4, 3.45, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xf36b21,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = 0.008;
    scene.add(ring);

    // 6. Load Draco & GLTF Model
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    const gltfLoader = new GLTFLoader();
    gltfLoader.setDRACOLoader(dracoLoader);

    gltfLoader.load(
      '/models/car.glb',
      (gltf) => {
        const car = gltf.scene;
        carModelRef.current = car;

        // Ground and center the car model precisely
        const box = new THREE.Box3().setFromObject(car);
        const center = box.getCenter(new THREE.Vector3());
        car.position.x = -center.x;
        car.position.y = -box.min.y;
        car.position.z = -center.z;

        // Adjust materials for photorealistic luxury look
        car.traverse((node) => {
          if ((node as THREE.Mesh).isMesh) {
            const mesh = node as THREE.Mesh;
            const mat = mesh.material as THREE.MeshStandardMaterial;
            if (mat) {
              if (mat.name === 'Body_Color' || mesh.name === 'body') {
                mat.color = new THREE.Color(colorHex);
                mat.metalness = 0.85;
                mat.roughness = 0.2;
              } else if (mat.name === 'brake' || mesh.name === 'brake' || mesh.name === 'brakes') {
                mat.color = new THREE.Color(caliperColor);
              }
            }
          }
        });

        scene.add(car);
        setIs3DLoading(false);
      },
      undefined,
      (err) => {
        console.error('Failed to load 3D car model:', err);
        setLoad3DError(true);
        setIs3DLoading(false);
      }
    );

    // 7. Render Loop with Smooth Camera Interpolation
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      // Camera interpolation when a preset is triggered
      if (cameraTargetPosition.current && cameraRef.current && controlsRef.current) {
        cameraRef.current.position.lerp(cameraTargetPosition.current, 0.08);
        if (cameraRef.current.position.distanceTo(cameraTargetPosition.current) < 0.02) {
          cameraRef.current.position.copy(cameraTargetPosition.current);
          cameraTargetPosition.current = null;
        }
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // 8. Responsive Resize Observer
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
      resizeObserver.disconnect();
      dracoLoader.dispose();
      renderer.dispose();
      controls.dispose();
    };
  }, [viewMode]);

  // Update 3D Materials when props change
  useEffect(() => {
    if (viewMode !== '3d-canvas' || !carModelRef.current) return;
    carModelRef.current.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        const mesh = node as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          if (mat.name === 'Body_Color' || mesh.name === 'body') {
            mat.color.set(colorHex);
          } else if (mat.name === 'brake' || mesh.name === 'brake' || mesh.name === 'brakes') {
            mat.color.set(caliperColor);
          } else if (mat.name === 'lights' || mat.name === 'leds' || mesh.name === 'leds' || mesh.name === 'lights') {
            mat.emissive = new THREE.Color(headlightsOn ? 0xffffff : 0x000000);
            mat.emissiveIntensity = headlightsOn ? 3.0 : 0.0;
          } else if (mesh.name.startsWith('rim') || mesh.name.startsWith('wheel')) {
            if (wheelFinish === 'gloss-black') {
              mat.color.set(0x0a0b0e);
              mat.metalness = 0.9;
              mat.roughness = 0.1;
            } else if (wheelFinish === 'liquid-silver') {
              mat.color.set(0xe8ecf0);
              mat.metalness = 0.96;
              mat.roughness = 0.12;
            } else if (wheelFinish === 'brushed-gold') {
              mat.color.set(0xc89d4a);
              mat.metalness = 0.92;
              mat.roughness = 0.28;
            } else {
              // Standard Satin Titanium
              mat.color.set(0x6e737c);
              mat.metalness = 0.88;
              mat.roughness = 0.32;
            }
          }
        }
      }
    });
  }, [colorHex, caliperColor, headlightsOn, wheelStyle, wheelFinish, viewMode]);

  // Handle external reset signal
  useEffect(() => {
    if (resetSignal !== undefined && resetSignal > 0) {
      setPresetAngle('3/4 FRONT');
      setZoomLevel(1);
      setAutoRotate(false);
    }
  }, [resetSignal]);

  // Set Preset Camera Angle (Handles both Real 3D and 360 Turntable)
  const setPresetAngle = (preset: 'FRONT' | '3/4 FRONT' | 'PROFILE' | '3/4 REAR' | 'REAR') => {
    setActivePreset(preset);

    if (viewMode === '3d-canvas') {
      const cameraCoords = {
        'FRONT': new THREE.Vector3(0, 1.15, 5.2),
        '3/4 FRONT': new THREE.Vector3(3.6, 1.35, 3.6),
        'PROFILE': new THREE.Vector3(5.4, 1.1, 0),
        '3/4 REAR': new THREE.Vector3(3.6, 1.35, -3.6),
        'REAR': new THREE.Vector3(0, 1.15, -5.2),
      };
      cameraTargetPosition.current = cameraCoords[preset];
      if (controlsRef.current) {
        controlsRef.current.target.set(0, 0.45, 0);
      }
    } else {
      // 360 Turntable Frame Mapping
      const frameMappings = {
        'FRONT': 0, // Frame 01: Front angle
        '3/4 FRONT': 4, // Frame 05: 3/4 Front
        'PROFILE': 9, // Frame 10: Side profile
        '3/4 REAR': 14, // Frame 15: 3/4 Rear
        'REAR': 18, // Frame 19: Rear
      };
      const f = frameMappings[preset];
      setFrameIndex(f);
      if (onAngleChange) onAngleChange(f * 10);
    }
  };

  const handleZoom = (direction: 'in' | 'out') => {
    if (viewMode === '3d-canvas' && cameraRef.current && controlsRef.current) {
      const factor = direction === 'in' ? 0.85 : 1.15;
      cameraRef.current.position.multiplyScalar(factor);
    } else {
      setZoomLevel((prev) => {
        if (direction === 'in') return Math.min(prev + 0.25, 2.0);
        return Math.max(prev - 0.25, 0.85);
      });
    }
  };

  const handleResetCamera = () => {
    setPresetAngle('3/4 FRONT');
    setZoomLevel(1);
  };

  return (
    <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] xl:h-[700px] bg-transparent overflow-hidden select-none flex flex-col justify-between items-center car-viewport">
      {/* 1. Main Viewport Stage */}
      {viewMode === '3d-canvas' && !load3DError ? (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Three.js Canvas Container */}
          <div
            ref={canvasContainerRef}
            className="w-full h-full cursor-grab active:cursor-grabbing outline-none"
          />

          {/* 3D Loading Spinner Overlay */}
          {is3DLoading && (
            <div className="absolute inset-0 bg-[#0a0c10]/85 backdrop-blur-md flex flex-col items-center justify-center gap-3 z-30 pointer-events-none">
              <div className="w-10 h-10 border-2 border-[#f36b21] border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs font-tech text-[#bfc2c7] tracking-wider uppercase">
                {t.configurator.loadingModel}
              </span>
            </div>
          )}
        </div>
      ) : (
        /* 360 Photographic Studio Turntable Stage */
        <div
          className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Overhead Lighting Glow */}
          <div className="absolute top-0 w-3/4 max-w-[900px] h-32 bg-radial from-white/[0.08] via-white/[0.02] to-transparent blur-2xl pointer-events-none"></div>

          {/* Ground Circular Turntable Disc */}
          <div className="absolute bottom-[10%] sm:bottom-[12%] w-[88%] max-w-[950px] h-36 rounded-full border border-white/[0.07] pointer-events-none flex items-center justify-center">
            <div className="w-[96%] h-[92%] rounded-full border border-[#f36b21]/20"></div>
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-20 rounded-full bg-radial from-black via-black/80 to-transparent blur-xl"></div>
          </div>

          {/* Active Photographic Image */}
          <div
            className="relative z-10 w-full h-full flex items-center justify-center transition-transform duration-200 ease-out"
            style={{ transform: `scale(${zoomLevel})` }}
          >
            <img
              src={frameSrc}
              alt={`VANTA GT-900 360° Studio Angle ${currentAngleDegrees}°`}
              className="max-h-[90%] max-w-[95%] object-contain pointer-events-none drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
              style={{ filter: getColorFilter() }}
              draggable={false}
            />

            {/* Hotspot Annotations */}
            {showHotspots && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="absolute bottom-[28%] start-[28%] pointer-events-auto group">
                  <div className="w-6 h-6 rounded-full bg-[#f36b21]/40 border border-[#f36b21] flex items-center justify-center animate-pulse cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div className="absolute start-8 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded bg-black/90 border border-white/20 text-[11px] font-tech text-white uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    21" Center-Lock Forged Aeroblades
                  </div>
                </div>

                <div className="absolute top-[32%] end-[26%] pointer-events-auto group">
                  <div className="w-6 h-6 rounded-full bg-[#f36b21]/40 border border-[#f36b21] flex items-center justify-center animate-pulse cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                  </div>
                  <div className="absolute end-8 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded bg-black/90 border border-white/20 text-[11px] font-tech text-white uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Active Carbon DRS Aero Wing
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. Distinct Camera Angle Preset Buttons (Front, 3/4 Front, Profile, 3/4 Rear, Rear) */}
      <div className="absolute start-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
        {(['FRONT', '3/4 FRONT', 'PROFILE', '3/4 REAR', 'REAR'] as const).map((preset) => {
          const isSelected = activePreset === preset;
          const labels: Record<string, string> = {
            'FRONT': t.configurator.angles.front,
            '3/4 FRONT': t.configurator.angles.front34,
            'PROFILE': t.configurator.angles.profile,
            '3/4 REAR': t.configurator.angles.rear34,
            'REAR': t.configurator.angles.rear,
          };

          return (
            <button
              key={preset}
              onClick={(e) => {
                e.stopPropagation();
                setPresetAngle(preset);
              }}
              className={`px-3 py-1.5 rounded text-[10px] font-tech tracking-wider uppercase transition-all text-start cursor-pointer border ${
                isSelected
                  ? 'bg-[#f36b21] text-black font-bold border-[#f36b21] shadow-[0_0_12px_rgba(243,107,33,0.4)]'
                  : 'bg-black/75 text-[#848a99] border-white/10 hover:text-white hover:border-white/30 backdrop-blur-md'
              }`}
            >
              {labels[preset]}
            </button>
          );
        })}
      </div>

      {/* 3. Floating Tactical Camera Utilities (Top Right) */}
      <div className="absolute top-4 end-4 z-20 flex flex-col gap-2">
        <button
          onClick={() => handleZoom('in')}
          className="w-9 h-9 rounded-full bg-black/70 hover:bg-black border border-white/10 hover:border-[#f36b21]/50 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn className="w-4 h-4 text-[#bfc2c7] hover:text-white" />
        </button>
        <button
          onClick={() => handleZoom('out')}
          className="w-9 h-9 rounded-full bg-black/70 hover:bg-black border border-white/10 hover:border-[#f36b21]/50 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut className="w-4 h-4 text-[#bfc2c7] hover:text-white" />
        </button>
        <button
          onClick={handleResetCamera}
          className="w-9 h-9 rounded-full bg-black/70 hover:bg-black border border-white/10 hover:border-[#f36b21]/50 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
          title="Reset Camera Preset"
          aria-label="Reset Camera Preset"
        >
          <Compass className="w-4 h-4 text-[#bfc2c7] hover:text-white" />
        </button>
        {viewMode === '360-turntable' && (
          <button
            onClick={() => setShowHotspots(!showHotspots)}
            className={`w-9 h-9 rounded-full border flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg ${
              showHotspots
                ? 'bg-[#f36b21] text-black border-[#f36b21]'
                : 'bg-black/70 border-white/10 text-[#bfc2c7] hover:text-white'
            }`}
            title="Toggle Inspection Hotspots"
            aria-label="Toggle Inspection Hotspots"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 4. Bottom Controls / Mode Readout */}
      <div className="relative z-20 pb-4 w-full max-w-[650px] px-4 flex flex-col items-center gap-3">
        {viewMode === '360-turntable' ? (
          <>
            {/* Turntable Slider */}
            <div className="w-full flex items-center gap-3">
              <span className="text-[10px] font-tech text-[#848a99] tracking-wider uppercase hidden sm:block">
                0°
              </span>
              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min={0}
                  max={totalFrames - 1}
                  value={frameIndex}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setFrameIndex(val);
                    if (onAngleChange) onAngleChange(val * 10);
                  }}
                  className="w-full h-1.5 bg-[#1b1e28] rounded-lg appearance-none cursor-ew-resize accent-[#f36b21] focus:outline-none"
                />
              </div>
              <span className="text-[10px] font-tech text-[#848a99] tracking-wider uppercase hidden sm:block">
                360°
              </span>
            </div>

            {/* Step Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => stepAngle(-1)}
                className="w-8 h-8 rounded-full bg-black/70 hover:bg-black border border-white/15 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-lg"
                title="Step Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="px-4 py-1.5 rounded-full bg-black/85 border border-white/10 backdrop-blur-md text-xs font-tech text-[#848a99] flex items-center gap-2 shadow-xl">
                <span dir="ltr" className="text-[#f36b21] font-bold telemetry-val">{currentAngleDegrees}°</span>
                <span>/</span>
                <span className="tracking-wider uppercase text-[10px] sm:text-[11px] text-white/90">
                  {t.configurator.mode360}
                </span>
              </div>

              <button
                onClick={() => stepAngle(1)}
                className="w-8 h-8 rounded-full bg-black/70 hover:bg-black border border-white/15 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-lg"
                title="Step Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setAutoRotate(!autoRotate)}
                className={`p-2 rounded-full border transition-all cursor-pointer shadow-xl ${
                  autoRotate
                    ? 'bg-[#f36b21] text-black border-[#f36b21]'
                    : 'bg-black/70 text-[#848a99] border-white/15 hover:text-white hover:border-[#f36b21]/40'
                }`}
                title="Auto-Rotate Studio Turntable"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </>
        ) : (
          /* 3D WebGL Orbit Controls Helper Pill */
          <div className="px-5 py-2 rounded-full bg-black/85 border border-white/10 backdrop-blur-md text-xs font-tech text-[#bfc2c7] flex items-center gap-2.5 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-[#f36b21] animate-ping"></span>
            <span className="tracking-wider uppercase text-[10px] sm:text-[11px] text-white/90">
              {t.configurator.dragToRotate3D}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
