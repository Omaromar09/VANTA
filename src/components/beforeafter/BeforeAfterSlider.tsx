import React, { useState, useRef, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { beforeAfterProjects } from '../../data/beforeAfter';
import { Sparkles, ArrowLeftRight } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const currentProject = beforeAfterProjects[activeProjectIndex];

  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = isRTL ? (rect.right - clientX) : (clientX - rect.left);
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, [isRTL]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  const projectTitle = isRTL && currentProject.titleAr ? currentProject.titleAr : currentProject.title;
  const projectCategory = isRTL && currentProject.categoryAr ? currentProject.categoryAr : currentProject.category;
  const projectDesc = isRTL && currentProject.descriptionAr ? currentProject.descriptionAr : currentProject.description;

  return (
    <section id="before-after" className="relative w-full py-24 sm:py-32 bg-[#050608] border-t border-white/[0.06] select-none">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#111318] border border-[#f36b21]/30 text-[10px] sm:text-xs font-tech text-[#f36b21] tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t.beforeAfter.badge}</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
              {t.beforeAfter.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#8b919e] max-w-2xl font-light">
              {t.beforeAfter.subtitle}
            </p>
          </div>

          {/* Project Switcher Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {beforeAfterProjects.map((proj, idx) => {
              const catLabel = isRTL && proj.categoryAr ? proj.categoryAr : proj.category;
              return (
                <button
                  key={proj.id}
                  onClick={() => {
                    setActiveProjectIndex(idx);
                    setSliderPos(50);
                  }}
                  className={`px-4 py-2 text-xs font-tech uppercase tracking-wider rounded-full border whitespace-nowrap transition-all cursor-pointer ${
                    activeProjectIndex === idx
                      ? 'bg-[#f36b21] text-black font-bold border-[#f36b21] shadow-[0_0_15px_rgba(243,107,33,0.3)]'
                      : 'bg-black/50 text-[#8b919e] border-white/10 hover:text-white hover:border-white/20'
                  }`}
                >
                  {catLabel}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Comparison Viewport */}
        <div className="mt-10 bg-[#090b10] border border-white/[0.08] rounded-2xl p-4 sm:p-6 shadow-2xl">
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-tech text-[#f36b21] uppercase tracking-wider block">
                {projectCategory} // {t.beforeAfter.caseStudy}
              </span>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-1">
                {projectTitle}
              </h3>
            </div>
            <span className="text-xs font-tech text-[#8b919e]">
              {t.beforeAfter.dragHint}
            </span>
          </div>

          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative w-full aspect-16/10 sm:aspect-21/9 bg-black rounded-xl overflow-hidden select-none cursor-ew-resize border border-white/10 touch-none"
          >
            {/* After Image (Base underneath) */}
            <img
              src={currentProject.afterImage}
              alt="After VANTA Finish"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              draggable={false}
            />

            {/* Before Image (Clipped precisely by clipPath with ZERO distortion) */}
            <img
              src={currentProject.beforeImage}
              alt="Before Treatment"
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{
                clipPath: isRTL
                  ? `inset(0 0 0 ${100 - sliderPos}%)`
                  : `inset(0 ${100 - sliderPos}% 0 0)`,
              }}
              draggable={false}
            />

            {/* Dividing Line & Grab Handle */}
            <div
              className="absolute inset-y-0 w-[2px] bg-[#f36b21] shadow-[0_0_15px_#f36b21] pointer-events-none"
              style={{ [isRTL ? 'right' : 'left']: `${sliderPos}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-black/90 border-2 border-[#f36b21] flex items-center justify-center text-[#f36b21] shadow-[0_0_20px_rgba(243,107,33,0.5)]">
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            </div>

            {/* Floating Comparison Labels */}
            <div className="absolute top-4 start-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-tech text-[#bfc2c7] uppercase pointer-events-none">
              {t.beforeAfter.before}
            </div>
            <div className="absolute top-4 end-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-[#f36b21]/40 rounded-full text-[10px] font-tech text-[#f36b21] uppercase pointer-events-none">
              {t.beforeAfter.after}
            </div>
          </div>

          <p className="mt-4 text-xs sm:text-sm text-[#bfc2c7] font-light leading-relaxed">
            {projectDesc}
          </p>
        </div>
      </div>
    </section>
  );
};
