import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RotateCcw, ChevronRight, ArrowRight, Eye } from 'lucide-react';

interface IntroHeroProps {
  onExploreCollection: () => void;
  onOpenConfigurator: () => void;
  onReplayIntro?: () => void;
}

export const IntroHero: React.FC<IntroHeroProps> = ({
  onExploreCollection,
  onOpenConfigurator,
  onReplayIntro,
}) => {
  const { t, isRTL } = useLanguage();

  return (
    <section className="relative w-full h-[100svh] min-h-[720px] bg-[#050608] overflow-hidden flex flex-col justify-between select-none">
      {/* 1. Cinematic Background Vignette & Floor Lighting */}
      <div className="absolute inset-0 z-0 bg-radial from-transparent via-[#050608]/40 to-[#050608] pointer-events-none"></div>

      {/* 2. Massive Ghosted Watermark Behind Vehicle */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-1 overflow-hidden text-center">
        <span className="font-condensed font-black text-[20vw] text-white/[0.025] uppercase leading-none select-none block">
          VANTA
        </span>
      </div>

      {/* 3. The Stopped Vehicle */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <img
          src="/assets/poster.jpg"
          alt="VANTA GT-900 Flagship Hybrid Hypercar"
          className="w-full h-full object-cover object-[65%_center] sm:object-center pointer-events-none"
        />

        {/* Studio Floor Gradient & Top Vignette for text readability */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050608] via-[#050608]/85 to-transparent"></div>
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#050608]/90 via-[#050608]/30 to-transparent"></div>
      </div>

      {/* 4. Top Micro Utilities Bar */}
      <div className="relative z-20 pt-20 sm:pt-28 px-4 sm:px-10 lg:px-16 w-full max-w-full min-w-0 flex items-center justify-between gap-2 intro-anim-header">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f36b21] animate-ping"></span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.25em] font-tech text-[#8b919e] uppercase">
            {t.hero.badge}
          </span>
        </div>

        {/* Replay Intro Action */}
        {onReplayIntro && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onReplayIntro}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/85 border border-white/10 hover:border-[#f36b21]/50 text-[10px] sm:text-[11px] font-tech text-[#bfc2c7] hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-lg"
              title={t.hero.replayIntro}
            >
              <RotateCcw className="w-3 h-3 text-[#f36b21]" />
              <span className="tracking-wider uppercase text-[9px] sm:text-[10px]">
                {t.hero.replayIntro}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* 5. Editorial Text Placement — Protected Negative Space (Zero Vehicle Detail Overlap) */}
      <div className="relative z-20 px-4 sm:px-10 lg:px-16 w-full max-w-full min-w-0 my-auto flex items-center justify-between intro-anim-hero-text">
        <div className="w-full max-w-md lg:max-w-lg min-w-0 flex flex-col gap-3 sm:gap-4 bg-gradient-to-br from-black/85 via-black/60 to-black/30 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/[0.08] shadow-2xl">
          <span className="text-[10px] sm:text-[11px] font-tech tracking-[0.25em] text-[#f36b21] uppercase font-semibold">
            {t.hero.edition}
          </span>

          <h1 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.05]">
            <span dir="ltr" className="telemetry-val">{t.hero.modelName}</span>{' '}
            <span className="text-white">{t.hero.modelType}</span>
          </h1>

          <p className="text-xs sm:text-sm text-[#bfc2c7] font-light leading-relaxed break-words">
            {t.hero.subtitle}
          </p>

          <div className="pt-2">
            <button
              onClick={onExploreCollection}
              className="group inline-flex items-center gap-3 text-xs font-tech tracking-[0.2em] text-[#f36b21] hover:text-[#ff8c37] transition-all uppercase cursor-pointer"
            >
              <span className="border-b border-[#f36b21]/40 pb-0.5 group-hover:border-[#f36b21] font-semibold">
                {t.hero.exploreCTA}
              </span>
              <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1.5 ${isRTL ? 'rotate-180 group-hover:-translate-x-1.5' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Vertical Badges / Spec Column */}
        <div className="hidden lg:flex flex-col items-center gap-6 text-[11px] font-tech text-[#5a6070] tracking-widest uppercase intro-anim-hero-details">
          <span className="rotate-90 origin-center text-[#848a99]">VANTA // 2026</span>
          <div className="w-[1px] h-12 bg-white/10 my-4"></div>
          <span dir="ltr" className="text-[10px] text-[#848a99] telemetry-val">GT-900</span>
          <span dir="ltr" className="text-[10px] text-[#f36b21] telemetry-val">V8-HYBRID</span>
        </div>
      </div>

      {/* 6. Bottom Timeline Navigation & Telemetry Specs Strip */}
      <div className="relative z-20 pb-6 sm:pb-10 px-4 sm:px-10 lg:px-16 w-full flex flex-col gap-3 sm:gap-4 intro-anim-hero-details">
        <div className="flex items-center justify-between">
          {/* Slide Indicator */}
          <div className="flex items-center gap-3 text-xs font-tech text-[#848a99]">
            <span className="text-white font-bold text-sm">01</span>
            <span className="w-8 h-[1px] bg-white/20"></span>
            <span>04</span>
          </div>

          {/* Central Studio Configurator Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenConfigurator}
              className="group relative flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#11141e]/90 hover:bg-[#181c2a] border border-[#f36b21]/50 hover:border-[#f36b21] text-xs font-tech text-white transition-all shadow-[0_0_25px_rgba(243,107,33,0.3)] active:scale-95 cursor-pointer"
            >
              <div className="w-2 h-2 rounded-full bg-[#f36b21] animate-pulse"></div>
              <span className="tracking-widest uppercase text-[11px] font-medium">
                {t.hero.configuratorCTA}
              </span>
              <Eye className="w-3.5 h-3.5 text-[#f36b21] group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Next Slide Arrow Button */}
          <button
            onClick={onExploreCollection}
            className="w-10 h-10 rounded-full border border-white/15 hover:border-[#f36b21] hover:bg-[#f36b21]/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
            title={t.hero.exploreCTA}
          >
            <ChevronRight className={`w-4 h-4 text-[#bfc2c7] hover:text-white ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Horizontal Telemetry Specs Strip with Isolated LTR Directions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.06] text-xs font-tech">
          <div>
            <span className="text-[10px] text-[#5a6070] uppercase block tracking-wider">
              {t.hero.specs.powerLabel}
            </span>
            <span className="font-display font-bold text-white text-sm sm:text-base inline-flex items-baseline gap-1">
              <span dir="ltr" className="telemetry-val">{t.hero.specs.power}</span>
              <span className="text-xs text-[#848a99]">{t.hero.specs.powerSuffix}</span>
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#5a6070] uppercase block tracking-wider">
              {t.hero.specs.accelLabel}
            </span>
            <span dir="ltr" className="telemetry-val font-display font-bold text-[#f36b21] text-sm sm:text-base">
              {t.hero.specs.accel}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#5a6070] uppercase block tracking-wider">
              {t.hero.specs.speedLabel}
            </span>
            <span dir="ltr" className="telemetry-val font-display font-bold text-white text-sm sm:text-base">
              {t.hero.specs.speed}
            </span>
          </div>
          <div className="hidden sm:block">
            <span className="text-[10px] text-[#5a6070] uppercase block tracking-wider">
              {t.hero.specs.chassisLabel}
            </span>
            <span className="font-display font-bold text-white text-sm sm:text-base">
              {t.hero.specs.chassis}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
