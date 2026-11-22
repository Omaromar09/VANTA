import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  RotateCw, ZoomIn, ZoomOut, Compass, RefreshCw,
  ChevronLeft, ChevronRight, Eye, Sparkles, SlidersHorizontal
} from 'lucide-react';

interface InteractiveCarViewerProps {
  colorHex?: string;
  turntableColor: 'orange' | 'silver' | 'black' | 'red' | 'blue' | 'white';
  viewMode?: '360-turntable' | '3d-canvas';
  headlightsOn?: boolean;
  wheelStyle?: string;
  caliperColor?: string;
  onAngleChange?: (angle: number) => void;
}

export const InteractiveCarViewer: React.FC<InteractiveCarViewerProps> = ({
  colorHex = '#F36B21',
  turntableColor = 'orange',
  viewMode = '360-turntable',
  headlightsOn = true,
  wheelStyle = 'aeroblade',
  caliperColor = '#F36B21',
  onAngleChange,
}) => {
  const [frameIndex, setFrameIndex] = useState(4); // Default to frame 4 (~40° heroic front 3/4)
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showHotspots, setShowHotspots] = useState(false);
  const totalFrames = 36; // 36 frames = 10 degrees per frame

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

  // Background Preloading for ultra-smooth scrubbing without flicker
  useEffect(() => {
    const preloadedImages: HTMLImageElement[] = [];
    for (let i = 1; i <= totalFrames; i++) {
      const idx = String(i).padStart(2, '0');
      const img = new Image();
      img.src = `/turntable/${currentFolder}/frame_${idx}.jpg`;
      preloadedImages.push(img);
    }
  }, [currentFolder]);

  // CSS Color filter for dynamically tinted vehicle finishes
  const getColorFilter = () => {
    if (turntableColor === 'red') return 'hue-rotate(-20deg) saturate(1.8) brightness(0.95)';
    if (turntableColor === 'blue') return 'hue-rotate(185deg) saturate(1.5) brightness(0.9)';
    if (turntableColor === 'white') return 'saturate(0.1) brightness(1.4)';
    return 'none';
  };

  // Drag handlers for 360-turntable mode
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    if (Math.abs(deltaX) > 5) {
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
    if (Math.abs(deltaX) > 5) {
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

  // Stepping angle via left/right buttons
  const stepAngle = (deltaFrames: number) => {
    setFrameIndex((prev) => {
      let next = prev + deltaFrames;
      if (next < 0) next = (next % totalFrames) + totalFrames;
      if (next >= totalFrames) next = next % totalFrames;
      if (onAngleChange) onAngleChange(next * 10);
      return next;
    });
  };

  // Jump to specific angle preset
  const setPresetAngle = (deg: number) => {
    const frame = Math.round(deg / 10) % totalFrames;
    setFrameIndex(frame);
    if (onAngleChange) onAngleChange(deg);
  };

  // Zoom controls
  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel((prev) => {
      if (direction === 'in') return Math.min(prev + 0.25, 2.0);
      return Math.max(prev - 0.25, 0.85);
    });
  };

  // Reset to initial heroic perspective
  const handleResetCamera = () => {
    setFrameIndex(4); // 40 degrees heroic 3/4
    setZoomLevel(1);
    if (onAngleChange) onAngleChange(40);
  };

  // Turntable Auto-rotate loop (low CPU, clean interval)
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

  return (
    <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[640px] xl:h-[700px] bg-transparent overflow-hidden select-none flex flex-col justify-between items-center car-viewport">
      {/* 1. Main Photographic 360 Studio Turntable Stage */}
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
        {/* Studio Lighting Overhead Glow */}
        <div className="absolute top-0 w-3/4 max-w-[900px] h-32 bg-radial from-white/[0.08] via-white/[0.02] to-transparent blur-2xl pointer-events-none"></div>

        {/* Circular Studio Turntable Ground Ring (Matching Porsche Reference 1) */}
        <div className="absolute bottom-[10%] sm:bottom-[12%] w-[88%] max-w-[950px] h-36 rounded-full border border-white/[0.07] pointer-events-none flex items-center justify-center">
          <div className="w-[96%] h-[92%] rounded-full border border-[#f36b21]/20"></div>
          {/* Floor Contact Grounding Shadow */}
          <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-20 rounded-full bg-radial from-black via-black/80 to-transparent blur-xl"></div>
        </div>

        {/* Active Turntable High-Res Photographic Image */}
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

          {/* Interactive Hotspot Annotations (Toggleable) */}
          {showHotspots && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              {/* Wheel Hotspot */}
              <div className="absolute bottom-[28%] left-[28%] pointer-events-auto group">
                <div className="w-6 h-6 rounded-full bg-[#f36b21]/40 border border-[#f36b21] flex items-center justify-center animate-pulse cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div className="absolute left-8 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded bg-black/90 border border-white/20 text-[11px] font-tech text-white uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  21" Forged Monoblock Wheels
                </div>
              </div>

              {/* Aero Hotspot */}
              <div className="absolute top-[32%] right-[26%] pointer-events-auto group">
                <div className="w-6 h-6 rounded-full bg-[#f36b21]/40 border border-[#f36b21] flex items-center justify-center animate-pulse cursor-pointer">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                </div>
                <div className="absolute right-8 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded bg-black/90 border border-white/20 text-[11px] font-tech text-white uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  Active Carbon Rear Diffuser
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Angle Jump Controls (Floating on Left - Reference 2 Lamborghini) */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-2">
          {[
            { label: 'FRONT', deg: 0 },
            { label: '3/4 FRONT', deg: 40 },
            { label: 'PROFILE', deg: 90 },
            { label: '3/4 REAR', deg: 140 },
            { label: 'REAR', deg: 180 },
          ].map((preset) => {
            const isMatch = Math.abs(currentAngleDegrees - preset.deg) < 15;
            return (
              <button
                key={preset.label}
                onClick={(e) => {
                  e.stopPropagation();
                  setPresetAngle(preset.deg);
                }}
                className={`px-3 py-1.5 rounded text-[10px] font-tech tracking-wider uppercase transition-all text-start cursor-pointer border ${
                  isMatch
                    ? 'bg-[#f36b21] text-black font-bold border-[#f36b21] shadow-[0_0_12px_rgba(243,107,33,0.4)]'
                    : 'bg-black/70 text-[#848a99] border-white/10 hover:text-white hover:border-white/30 backdrop-blur-md'
                }`}
              >
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Floating Tactical Camera Controls (Top Right - Matching Porsche Reference 1) */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={() => handleZoom('in')}
          className="w-9 h-9 rounded-full bg-black/70 hover:bg-black border border-white/10 hover:border-[#f36b21]/50 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4 text-[#bfc2c7] hover:text-white" />
        </button>
        <button
          onClick={() => handleZoom('out')}
          className="w-9 h-9 rounded-full bg-black/70 hover:bg-black border border-white/10 hover:border-[#f36b21]/50 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4 text-[#bfc2c7] hover:text-white" />
        </button>
        <button
          onClick={handleResetCamera}
          className="w-9 h-9 rounded-full bg-black/70 hover:bg-black border border-white/10 hover:border-[#f36b21]/50 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
          title="Reset Camera Angle"
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
        >
          <Sparkles className="w-4 h-4" />
        </button>
      </div>

      {/* 3. Under-Vehicle Carousel / Angle Slider Indicator (Matching Reference 1 "< 360° >" & Reference 2 Slider) */}
      <div className="relative z-20 pb-4 w-full max-w-[650px] px-4 flex flex-col items-center gap-3">
        {/* Horizontal 360° Angle Scrubber Slider (Lamborghini Reference 2 "3D View") */}
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

        {/* Center Pill with Step Buttons and Angle Readout */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => stepAngle(-1)}
            className="w-8 h-8 rounded-full bg-black/70 hover:bg-black border border-white/15 text-white flex items-center justify-center transition-all active:scale-95 cursor-pointer shadow-lg"
            title="Step Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="px-4 py-1.5 rounded-full bg-black/85 border border-white/10 backdrop-blur-md text-xs font-tech text-[#848a99] flex items-center gap-2 shadow-xl">
            <span className="text-[#f36b21] font-bold telemetry-val">{currentAngleDegrees}°</span>
            <span>/</span>
            <span className="tracking-wider uppercase text-[10px] sm:text-[11px] text-white/90">
              360° STUDIO VIEW
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
