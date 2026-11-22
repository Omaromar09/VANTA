import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { beforeAfterProjects } from '../../data/beforeAfter';
import { Sparkles, SlidersHorizontal, ArrowLeftRight } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const currentProject = beforeAfterProjects[activeProjectIndex];

  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handlePointerDown = () => {
    setIsDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = isRTL ? (rect.right - e.clientX) : (e.clientX - rect.left);
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="before-after" className="relative w-full py-24 sm:py-32 bg-[#050608] border-t border-[#151822]">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1b1e28]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#111318] border border-[#f36b21]/30 text-[10px] sm:text-xs font-mono-tech text-[#f36b21] tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {t.beforeAfter.badge}
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              {t.beforeAfter.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#8b919e] max-w-2xl font-light">
              {t.beforeAfter.subtitle}
            </p>
          </div>

          {/* Project Switcher Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {beforeAfterProjects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => {
                  setActiveProjectIndex(idx);
                  setSliderPos(50);
                }}
                className={`px-4 py-2 text-xs font-mono-tech uppercase tracking-wider rounded-sm border whitespace-nowrap transition-colors ${
                  activeProjectIndex === idx
                    ? 'bg-[#1b1e28] text-white border-[#f36b21]'
                    : 'bg-[#0a0c10] text-[#8b919e] border-[#1b1e28] hover:text-[#bfc2c7]'
                }`}
              >
                {proj.category}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Comparison Viewport */}
        <div className="mt-10 bg-[#090b10] border border-[#1b1e28] rounded-sm p-4 sm:p-6">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono-tech text-[#f36b21] uppercase tracking-wider block">
                {currentProject.category} // CASE STUDY
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                {currentProject.title}
              </h3>
            </div>
            <span className="text-xs font-mono-tech text-[#8b919e]">
              {t.beforeAfter.dragHint}
            </span>
          </div>

          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative w-full aspect-16/9 sm:aspect-21/9 bg-black rounded-sm overflow-hidden select-none cursor-ew-resize border border-[#1b1e28]"
          >
            {/* After Image (Full width underneath) */}
            <img
              src={currentProject.afterImage}
              alt="After VANTA Finish"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              draggable={false}
            />

            {/* Before Image (Clipped on top by percentage) */}
            <div
              className={`absolute inset-y-0 ${isRTL ? 'right-0' : 'left-0'} overflow-hidden pointer-events-none`}
              style={{ width: `${sliderPos}%` }}
            >
              <img
                src={currentProject.beforeImage}
                alt="Before Finish"
                className="absolute inset-0 w-full h-full object-cover max-w-none"
                style={{
                  width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%',
                  height: '100%',
                }}
                draggable={false}
              />
            </div>

            {/* Dividing Line & Grab Handle */}
            <div
              className="absolute inset-y-0 w-0.5 bg-[#f36b21] shadow-[0_0_15px_#f36b21] pointer-events-none"
              style={{ [isRTL ? 'right' : 'left']: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-black border-2 border-[#f36b21] flex items-center justify-center text-[#f36b21] shadow-2xl">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-[#1b1e28] text-[10px] font-mono-tech text-[#8b919e] uppercase pointer-events-none">
              {t.beforeAfter.before}
            </div>
            <div className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-[#f36b21]/40 text-[10px] font-mono-tech text-[#f36b21] uppercase pointer-events-none">
              {t.beforeAfter.after}
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-[#bfc2c7] font-light leading-relaxed">
            {currentProject.description}
          </p>
        </div>
      </div>
    </section>
  );
};
