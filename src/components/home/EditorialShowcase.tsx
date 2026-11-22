import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Play, ArrowRight, Gauge, Zap, Wind, Compass } from 'lucide-react';

interface EditorialShowcaseProps {
  onExploreCar: (carId: string) => void;
  onOpenConfigurator: () => void;
}

export const EditorialShowcase: React.FC<EditorialShowcaseProps> = ({
  onExploreCar,
  onOpenConfigurator,
}) => {
  const { t, isRTL } = useLanguage();

  const [activeTab, setActiveTab] = useState<'highlights' | 'model' | 'exterior' | 'performance'>('highlights');

  const tabs = [
    { id: 'highlights', label: t.editorial.tabs.highlights },
    { id: 'model', label: t.editorial.tabs.model },
    { id: 'exterior', label: t.editorial.tabs.exterior },
    { id: 'performance', label: t.editorial.tabs.performance },
  ];

  return (
    <section className="relative w-full py-28 sm:py-36 bg-[#050608] border-t border-white/[0.06] overflow-hidden select-none">
      {/* Background Subtle Gradient & Light Trail */}
      <div className="absolute end-0 top-1/3 w-[300px] sm:w-[600px] h-[300px] bg-[#f36b21]/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Vertical Index Menu */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <div className="flex items-center gap-3" dir="ltr">
              <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-[#1b1f2b] to-black border border-[#f36b21]/40 flex items-center justify-center">
                <span className="font-display font-black text-[#f36b21] text-lg">V</span>
              </div>
              <span className="font-display font-bold text-sm tracking-[0.25em] text-white">
                VANTA GT-900
              </span>
            </div>

            {/* Vertical Sub-nav with Active Orange Indicator */}
            <nav className="flex flex-col gap-3 text-xs font-tech">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`group flex items-center justify-between text-start py-2 transition-all cursor-pointer ${
                    activeTab === tab.id ? 'text-white font-bold' : 'text-[#848a99] hover:text-[#bfc2c7]'
                  }`}
                >
                  <span className="tracking-wider">{tab.label}</span>
                  {activeTab === tab.id && (
                    <span className="w-5 h-[2px] bg-[#f36b21]"></span>
                  )}
                </button>
              ))}

              <button
                onClick={onOpenConfigurator}
                className="text-start py-2 text-[#f36b21] hover:text-[#ff8c37] tracking-wider transition-colors font-semibold"
              >
                {t.editorial.configureCTA}
              </button>
            </nav>

            <div className="pt-6 border-t border-white/[0.06]">
              <span className="text-[10px] font-tech text-[#5a6070] uppercase tracking-widest block">
                {t.editorial.architectureTag}
              </span>
              <p className="text-xs text-[#848a99] mt-2 font-light leading-relaxed">
                {t.editorial.architectureDesc}
              </p>
            </div>
          </div>

          {/* Right Column: Hero Stage with Bold Condensed Headline */}
          <div className="lg:col-span-9 flex flex-col gap-8">
            {/* Monumental Headline with Play Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/[0.06] pb-8">
              <h2 className="font-condensed font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.95] max-w-xl">
                {t.editorial.headline}
              </h2>

              <button
                onClick={() => onExploreCar('vanta-gt900')}
                className="w-14 h-14 rounded-full bg-[#f36b21] hover:bg-[#ff8c37] flex items-center justify-center text-black shadow-[0_0_25px_rgba(243,107,33,0.5)] transition-transform hover:scale-110 active:scale-95 flex-shrink-0 cursor-pointer"
                title="View GT-900 Dossier"
                aria-label="View GT-900 Dossier"
              >
                <Play className="w-6 h-6 fill-black ml-0.5" />
              </button>
            </div>

            {/* Model Name & Big Telemetry Stats with Strict LTR Isolations */}
            <div>
              <span className="font-condensed font-bold text-2xl sm:text-3xl text-[#f36b21] tracking-wider uppercase block mb-6">
                <span dir="ltr" className="telemetry-val">{t.editorial.modelBadge}</span>
              </span>

              <div className="grid grid-cols-3 gap-6 text-start pb-8 border-b border-white/[0.06]">
                <div>
                  <span dir="ltr" className="telemetry-val font-display font-black text-2xl sm:text-4xl text-white block">
                    {t.editorial.specTorque}
                  </span>
                  <span className="text-[11px] font-tech text-[#848a99] uppercase tracking-wider mt-1 block">
                    {t.editorial.specTorqueLabel}
                  </span>
                </div>
                <div>
                  <span dir="ltr" className="telemetry-val font-display font-black text-2xl sm:text-4xl text-[#f36b21] block">
                    {t.editorial.specAccel}
                  </span>
                  <span className="text-[11px] font-tech text-[#848a99] uppercase tracking-wider mt-1 block">
                    {t.editorial.specAccelLabel}
                  </span>
                </div>
                <div>
                  <span dir="ltr" className="telemetry-val font-display font-black text-2xl sm:text-4xl text-white block">
                    {t.editorial.specSpeed}
                  </span>
                  <span className="text-[11px] font-tech text-[#848a99] uppercase tracking-wider mt-1 block">
                    {t.editorial.specSpeedLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* Inset Visual Composition */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Main Exterior Image */}
              <div className="md:col-span-8 relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0c0e14] group shadow-xl">
                <img
                  src="/images/gt900-side.jpg"
                  alt="VANTA GT-900 Side Profile"
                  className="w-full h-auto aspect-16/9 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-3 start-3 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-tech text-[#bfc2c7] uppercase">
                  {t.editorial.aeroCaption}
                </div>
              </div>

              {/* Secondary Inset Cockpit Shot with Telemetry */}
              <div className="md:col-span-4 relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0c0e14] group shadow-xl">
                <img
                  src="/images/cockpit-detail.jpg"
                  alt="VANTA Cockpit"
                  className="w-full aspect-4/3 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-4">
                  <span className="text-[9px] font-tech text-[#f36b21] uppercase tracking-widest">
                    COCKPIT // 002
                  </span>
                  <span className="text-xs font-display font-bold text-white mt-0.5">
                    {t.editorial.cockpitCaption}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
