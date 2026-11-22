import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  RotateCw, ZoomIn, ZoomOut, Compass, RefreshCw,
  ChevronLeft, ChevronRight, Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface InteractiveCarViewerProps {
  colorHex?: string;
  turntableColor: 'orange' | 'silver' | 'black' | 'red' | 'blue' | 'white';
  viewMode?: '360-turntable';
  headlightsOn?: boolean;
  wheelStyle?: string;
  wheelFinish?: string;
  caliperColor?: string;
  onAngleChange?: (angle: number) => void;
  resetSignal?: number;
}

export const InteractiveCarViewer: React.FC<InteractiveCarViewerProps> = ({
  colorHex = '#F36B21',
  turntableColor = 'orange',
  headlightsOn = true,
  wheelStyle = 'aeroblade',
  wheelFinish = 'satin-titanium',
  caliperColor = '#F36B21',
  onAngleChange,
  resetSignal,
}) => {
  const { t, isRTL } = useLanguage();

  // =========================================================================
  // 1. TURNTABLE PHOTOGRAPHIC STUDIO STATE
  // =========================================================================
  const [frameIndex, setFrameIndex] = useState(4); // Default to frame 4 (~40° heroic front 3/4)
  const [activePreset, setActivePreset] = useState<'FRONT' | '3/4 FRONT' | 'PROFILE' | '3/4 REAR' | 'REAR'>('3/4 FRONT');
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
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

  // Color Filter for custom hues on photo base
  const getColorFilter = () => {
    if (turntableColor === 'red') return 'hue-rotate(-20deg) saturate(1.8) brightness(0.95)';
    if (turntableColor === 'blue') return 'hue-rotate(185deg) saturate(1.5) brightness(0.9)';
    if (turntableColor === 'white') return 'saturate(0.1) brightness(1.4)';
    return 'none';
  };

  // Drag Handlers (Mouse & Touch)
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 4) {
      const step = Math.sign(deltaX);
      setFrameIndex((prev) => {
        let next = prev - step;
        if (next < 0) next = totalFrames - 1;
        if (next >= totalFrames) next = 0;
        if (onAngleChange) onAngleChange(next * 10);
        return next;
      });
      setStartX(e.clientX);
    }
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - startX;
    if (Math.abs(deltaX) > 4) {
      const step = Math.sign(deltaX);
      setFrameIndex((prev) => {
        let next = prev - step;
        if (next < 0) next = totalFrames - 1;
        if (next >= totalFrames) next = 0;
        if (onAngleChange) onAngleChange(next * 10);
        return next;
      });
      setStartX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  const stepAngle = (deltaFrames: number) => {
    setFrameIndex((prev) => {
      let next = prev + deltaFrames;
      if (next < 0) next = (next % totalFrames) + totalFrames;
      if (next >= totalFrames) next = next % totalFrames;
      if (onAngleChange) onAngleChange(next * 10);
      return next;
    });
  };

  // Auto-rotate interval
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setFrameIndex((prev) => {
        const next = (prev + 1) % totalFrames;
        if (onAngleChange) onAngleChange(next * 10);
        return next;
      });
    }, 120);
    return () => clearInterval(interval);
  }, [autoRotate, onAngleChange]);

  // Set Preset Camera Angle (Front, 3/4 Front, Profile, 3/4 Rear, Rear)
  const setPresetAngle = (preset: 'FRONT' | '3/4 FRONT' | 'PROFILE' | '3/4 REAR' | 'REAR') => {
    setActivePreset(preset);
    const frameMappings = {
      'FRONT': 0,     // Frame 01: Front
      '3/4 FRONT': 4, // Frame 05: 3/4 Front
      'PROFILE': 9,   // Frame 10: Side Profile
      '3/4 REAR': 14, // Frame 15: 3/4 Rear
      'REAR': 18,     // Frame 19: Rear
    };
    const f = frameMappings[preset];
    setFrameIndex(f);
    if (onAngleChange) onAngleChange(f * 10);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel((prev) => {
      if (direction === 'in') return Math.min(prev + 0.25, 2.0);
      return Math.max(prev - 0.25, 0.85);
    });
  };

  const handleResetCamera = () => {
    setPresetAngle('3/4 FRONT');
    setZoomLevel(1);
    setAutoRotate(false);
  };

  // Listen to external reset signal
  useEffect(() => {
    if (resetSignal !== undefined && resetSignal > 0) {
      handleResetCamera();
    }
  }, [resetSignal]);

  return (
    <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] xl:h-[700px] bg-transparent overflow-hidden select-none flex flex-col justify-between items-center car-viewport">
      {/* 1. Main Photographic Turntable Stage */}
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
        <div
          className="relative w-full h-full flex items-center justify-center transition-transform duration-200"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          {/* Turntable High-Res Frame */}
          <img
            src={frameSrc}
            alt={`VANTA GT-900 360° Studio Angle ${currentAngleDegrees}°`}
            className="max-h-[90%] max-w-[95%] object-contain pointer-events-none drop-shadow-[0_25px_45px_rgba(0,0,0,0.95)]"
            style={{ filter: getColorFilter() }}
            draggable={false}
          />

          {/* Interactive Inspection Hotspots */}
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
              className={`px-3 py-1.5 rounded-lg text-[10px] font-tech tracking-wider uppercase transition-all text-start cursor-pointer border ${
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

      {/* 3. Floating Tactical Camera Utilities (Zoom, Reset, Hotspots) */}
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
      </div>

      {/* 4. Bottom Controls / Angle Scrubber */}
      <div className="relative z-20 pb-4 w-full max-w-[650px] px-4 flex flex-col items-center gap-3">
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

        {/* Step Controls & Status */}
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
      </div>
    </div>
  );
};
