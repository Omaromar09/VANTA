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

  const [activeTab, setActiveTab] = useState<'model' | 'exterior' | 'performance' | 'config'>('model');

  const tabs = [
    { id: 'highlights', label: 'Highlights' },
    { id: 'model', label: 'Model Information' },
    { id: 'exterior', label: 'Exterior Aero' },
    { id: 'performance', label: 'Performance' },
  ];

  return (
    <section className="relative w-full py-28 sm:py-36 bg-[#050608] border-t border-white/[0.06] overflow-hidden">
      {/* Background Subtle Gradient & Light Trail */}
      <div className="absolute end-0 top-1/3 w-[300px] sm:w-[600px] h-[300px] bg-[#f36b21]/5 blur-[120px] pointer-events-none"></div>

      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Vertical Index Menu (Matching Reference 3) */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <div className="flex items-center gap-3" dir="ltr">
              <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-[#1b1f2b] to-black border border-[#f36b21]/40 flex items-center justify-center">
                <span className="font-display font-black text-[#f36b21] text-lg">V</span>
              </div>
              <span className="font-display font-bold text-sm tracking-[0.25em] text-white">
                VANTA GT-900
              </span>
            </div>

            {/* Vertical Sub-nav with Active Orange Indicator (Matching Reference 3) */}
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
                Configure Vehicle →
              </button>
            </nav>

            <div className="pt-6 border-t border-white/[0.06]">
              <span className="text-[10px] font-tech text-[#5a6070] uppercase tracking-widest block">
                7P STUDIO ARCHITECTURE
              </span>
              <p className="text-xs text-[#848a99] mt-2 font-light leading-relaxed">
                Sculpted from aerospace carbon fiber and tuned to generate 680kg of functional downforce.
              </p>
            </div>
          </div>

          {/* Right Column: Hero Stage with Bold Condensed Headline (Matching Reference 3) */}
          <div className="lg:col-span-9 flex flex-col gap-8">
            {/* Monumental Headline with Yellow/Orange Play Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-white/[0.06] pb-8">
              <h2 className="font-condensed font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.95] max-w-xl">
                EXPERIENCE THE FUTURE OF DRIVING
              </h2>

              <button
                onClick={() => onExploreCar('vanta-gt900')}
                className="w-14 h-14 rounded-full bg-[#f36b21] hover:bg-[#ff8c37] flex items-center justify-center text-black shadow-[0_0_25px_rgba(243,107,33,0.5)] transition-transform hover:scale-110 active:scale-95 flex-shrink-0 cursor-pointer"
                title="Watch Feature Film"
              >
                <Play className="w-6 h-6 fill-black ml-0.5" />
              </button>
            </div>

            {/* Model Name & Big Telemetry Stats (Matching Reference 3) */}
            <div>
              <span className="font-condensed font-bold text-2xl sm:text-3xl text-[#f36b21] tracking-wider uppercase block mb-6">
                GT-900 HYPERCAR.
              </span>

              <div className="grid grid-cols-3 gap-6 text-start pb-8 border-b border-white/[0.06]">
                <div>
                  <span className="font-display font-black text-2xl sm:text-4xl text-white block">
                    1,050 Nm
                  </span>
                  <span className="text-[11px] font-tech text-[#848a99] uppercase tracking-wider mt-1 block">
                    TORQUE VECTORING
                  </span>
                </div>
                <div>
                  <span className="font-display font-black text-2xl sm:text-4xl text-[#f36b21] block">
                    2.3 s
                  </span>
                  <span className="text-[11px] font-tech text-[#848a99] uppercase tracking-wider mt-1 block">
                    0–100 KM/H
                  </span>
                </div>
                <div>
                  <span className="font-display font-black text-2xl sm:text-4xl text-white block">
                    385 km/h
                  </span>
                  <span className="text-[11px] font-tech text-[#848a99] uppercase tracking-wider mt-1 block">
                    MAX VELOCITY
                  </span>
                </div>
              </div>
            </div>

            {/* Inset Visual Composition (Matching Reference 3) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Main Exterior Image */}
              <div className="md:col-span-8 relative rounded-sm overflow-hidden border border-white/[0.08] bg-[#0c0e14] group">
                <img
                  src="/images/gt900-side.jpg"
                  alt="VANTA GT-900 Side Profile"
                  className="w-full h-auto aspect-16/9 object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-tech text-[#bfc2c7] uppercase">
                  Active Carbon Venturi Chutes
                </div>
              </div>

              {/* Secondary Inset Cockpit Shot with Telemetry (Matching Reference 3 "002") */}
              <div className="md:col-span-4 relative rounded-sm overflow-hidden border border-white/[0.08] bg-[#0c0e14] group">
                <img
                  src="/images/cockpit-detail.jpg"
                  alt="VANTA Cockpit"
                  className="w-full aspect-4/3 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-between">
                  <span className="text-xs font-tech text-[#f36b21] font-bold">
                    INSET // 002
                  </span>
                  <div>
                    <span className="font-display font-bold text-sm text-white block">
                      Carbon Driver Cell
                    </span>
                    <span className="text-[10px] font-tech text-[#848a99]">
                      Telemetry display with G-meter
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
