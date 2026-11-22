import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  RotateCcw, ChevronRight, ArrowRight, Eye 
} from 'lucide-react';

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
      <div className="absolute inset-0 z-0 bg-radial from-transparent via-[#050608]/50 to-[#050608] pointer-events-none"></div>

      {/* 2. Massive Ghosted Watermark Behind Vehicle (Matching Lamborghini Reference) */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-1 overflow-hidden text-center">
        <span className="font-condensed font-black text-[22vw] text-white/[0.025] uppercase leading-none select-none block">
          VANTA
        </span>
      </div>

      {/* 3. The Stopped Vehicle (Matches 100% with intro video's final frame) */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <img
          src="/assets/poster.jpg"
          alt="VANTA GT-900 Flagship Hybrid Hypercar"
          className="w-full h-full object-cover object-[70%_center] sm:object-center pointer-events-none"
        />

        {/* Studio Floor Gradient & Vignette for flawless text readability */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050608] via-[#050608]/85 to-transparent"></div>
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#050608]/90 via-[#050608]/30 to-transparent"></div>
      </div>

      {/* 4. Top Micro Utilities Bar */}
      <div className="relative z-20 pt-20 sm:pt-28 px-4 sm:px-10 lg:px-16 w-full max-w-full min-w-0 flex items-center justify-between gap-2 intro-anim-header">
        <div className="flex items-center gap-2 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f36b21] animate-ping"></span>
          <span className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.3em] font-tech text-[#8b919e] uppercase">
            {isRTL ? 'صالة العرض // 01' : 'FLAGSHIP SHOWROOM // 01'}
          </span>
        </div>

        {/* Replay Intro Action */}
        {onReplayIntro && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onReplayIntro}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-black/60 hover:bg-black/85 border border-white/10 hover:border-[#f36b21]/50 text-[10px] sm:text-[11px] font-tech text-[#bfc2c7] hover:text-white backdrop-blur-md transition-all active:scale-95 cursor-pointer"
              title={isRTL ? 'إعادة العرض' : 'Replay Cinematic Intro'}
            >
              <RotateCcw className="w-3 h-3 text-[#f36b21]" />
              <span className="tracking-wider uppercase text-[9px] sm:text-[10px]">
                {isRTL ? 'إعادة العرض' : 'Replay Intro'}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* 5. Left Editorial Text Column (Matching Reference 2 - Lamborghini Style) */}
      <div className="relative z-20 px-4 sm:px-10 lg:px-16 w-full max-w-full min-w-0 my-auto flex items-center justify-between intro-anim-hero-text">
        <div className="w-full max-w-full sm:max-w-xl min-w-0 flex flex-col gap-3 sm:gap-4 bg-black/40 sm:bg-transparent backdrop-blur-[2px] sm:backdrop-blur-none p-4 sm:p-0 rounded-2xl border border-white/5 sm:border-transparent">
          <span className="text-[10px] sm:text-[11px] font-tech tracking-[0.25em] text-[#f36b21] uppercase">
            {isRTL ? 'السيارة الهجينة الخارقة الرائدة' : 'FLAGSHIP HYBRID HYPERCAR'}
          </span>

          <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-[clamp(2.5rem,5vw,4.5rem)] text-white tracking-tight leading-[1.05]">
            <span className="telemetry-val">GT-900</span> {isRTL ? 'هايبرد' : 'HYBRID'}
          </h1>

          <p className="text-xs sm:text-sm lg:text-base text-[#848a99] font-light leading-relaxed max-w-full sm:max-w-lg break-words">
            {isRTL 
              ? 'تُجسد GT-900 ذروة الإتقان الإيروديناميكي والدفع الهجين فائق الكثافة. صُممت مع أنفاق فنتوري بنظام DRS النشط، وأجنحة تيتانيوم، وهيكل كربوني أحادي لا يُقهر.'
              : 'The GT-900 is the culmination of aerodynamic mastery and high-density hybrid propulsion. Engineered with active DRS venturi tunnels, titanium aero-foils, and unyielding carbon monocoque.'}
          </p>

          <div className="pt-1 sm:pt-2">
            <button
              onClick={onExploreCollection}
              className="group inline-flex items-center gap-3 text-xs font-tech tracking-[0.2em] text-[#f36b21] hover:text-[#ff8c37] transition-all uppercase cursor-pointer"
            >
              <span className="border-b border-[#f36b21]/40 pb-0.5 group-hover:border-[#f36b21]">
                {t.hero.exploreCTA}
              </span>
              <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1.5 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Right Vertical Badges / Spec Column (Matching Reference 2) */}
        <div className="hidden lg:flex flex-col items-center gap-6 text-[11px] font-tech text-[#5a6070] tracking-widest uppercase intro-anim-hero-details">
          <span className="rotate-90 origin-center text-[#848a99]">VANTA // 2026</span>
          <div className="w-[1px] h-12 bg-white/10 my-4"></div>
          <span className="text-[10px] text-[#848a99]">GT-900</span>
          <span className="text-[10px] text-[#f36b21]">V8-HYBRID</span>
        </div>
      </div>

      {/* 6. Bottom Timeline Navigation & 3D View Toggle (Matching Reference 2) */}
      <div className="relative z-20 pb-6 sm:pb-12 px-4 sm:px-10 lg:px-16 w-full flex flex-col gap-3 sm:gap-4 intro-anim-hero-details">
        <div className="flex items-center justify-between">
          {/* Slide Indicator */}
          <div className="flex items-center gap-3 text-xs font-tech text-[#848a99]">
            <span className="text-white font-bold text-sm">01</span>
            <span className="w-8 h-[1px] bg-white/20"></span>
            <span>04</span>
          </div>

          {/* Central 3D View Studio Button (Matching Reference 2) */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenConfigurator}
              className="group relative flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#11141e]/90 hover:bg-[#181c2a] border border-[#f36b21]/50 hover:border-[#f36b21] text-xs font-tech text-white transition-all shadow-[0_0_25px_rgba(243,107,33,0.3)] active:scale-95 cursor-pointer"
            >
              <div className="w-2 h-2 rounded-full bg-[#f36b21] animate-pulse"></div>
              <span className="tracking-widest uppercase text-[11px] font-medium">
                {isRTL ? 'استوديو التخصيص 360°' : 'Studio Configurator'}
              </span>
              <Eye className="w-3.5 h-3.5 text-[#f36b21] group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Next Slide Arrow Button */}
          <button
            onClick={onExploreCollection}
            className="w-10 h-10 rounded-full border border-white/15 hover:border-[#f36b21] hover:bg-[#f36b21]/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
            title="Explore Collection"
          >
            <ChevronRight className={`w-4 h-4 text-[#bfc2c7] hover:text-white ${isRTL ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Horizontal Telemetry Specs Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.06] text-xs font-tech">
          <div>
            <span className="text-[10px] text-[#5a6070] uppercase block tracking-wider">
              {isRTL ? 'القوة الإجمالية' : 'POWER OUTPUT'}
            </span>
            <span className="telemetry-val font-display font-bold text-white text-sm sm:text-base">
              {isRTL ? '980 HP هجين' : '980 HP COMBINED'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#5a6070] uppercase block tracking-wider">
              {isRTL ? 'التسارع 0–100' : '0–100 KM/H'}
            </span>
            <span className="telemetry-val font-display font-bold text-[#f36b21] text-sm sm:text-base">
              {isRTL ? '2.3 SEC' : '2.3 SEC'}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#5a6070] uppercase block tracking-wider">
              {isRTL ? 'السرعة القصوى' : 'TOP VELOCITY'}
            </span>
            <span className="telemetry-val font-display font-bold text-white text-sm sm:text-base">
              {isRTL ? '385 KM/H' : '385 KM/H'}
            </span>
          </div>
          <div className="hidden sm:block">
            <span className="text-[10px] text-[#5a6070] uppercase block tracking-wider">
              {isRTL ? 'مواصفات الشاسيه' : 'CHASSIS SPEC'}
            </span>
            <span className="font-display font-bold text-white text-sm sm:text-base">
              {isRTL ? 'ألياف كربون أحادي' : 'CARBON MONOCOQUE'}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
