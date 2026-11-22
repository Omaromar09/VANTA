import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { vehicles } from '../../data/vehicles';
import { InteractiveCarViewer } from '../configurator/InteractiveCarViewer';
import { RotateCw, Video, ArrowRight, Eye, Box, Sliders } from 'lucide-react';

interface Showroom360SectionProps {
  onOpenDetails: (carId: string) => void;
  onBookTestDrive: (carName: string) => void;
}

export const Showroom360Section: React.FC<Showroom360SectionProps> = ({
  onOpenDetails,
  onBookTestDrive,
}) => {
  const { t, isRTL } = useLanguage();

  const showcaseModels = [
    {
      id: 'vanta-gt900',
      name: 'VANTA GT-900',
      edition: isRTL ? 'إصدار أورانج ميتاليك التوقيعي' : 'Signature Metallic Orange Edition',
      turntable: 'orange' as const,
      colorHex: '#F36B21',
      tag: 'QUAD-TURBO HYBRID // 980 HP',
      videoSrc: '/videos/vanta-360-orange.mp4',
    },
    {
      id: 'vanta-spectre-x',
      name: 'VANTA SPECTRE X',
      edition: isRTL ? 'إصدار تيتانيوم سيلفر ستيلث' : 'Titanium Liquid Silver Stealth Edition',
      turntable: 'silver' as const,
      colorHex: '#BFC2C7',
      tag: 'TWIN-TURBO V12 // 1,020 HP',
      videoSrc: '/videos/vanta-360-silver.mp4',
    },
    {
      id: 'vanta-nocturne',
      name: 'VANTA NOCTURNE',
      edition: isRTL ? 'إصدار أوبسيديان تراك كربون' : 'Vanta Obsidian Track Carbon Edition',
      turntable: 'black' as const,
      colorHex: '#0A0B0E',
      tag: 'NATURALLY ASPIRATED V12 // 950 HP',
      videoSrc: '/videos/vanta-360-black.mp4',
    },
  ];

  const [activeModelIndex, setActiveModelIndex] = useState(0);
  const currentModel = showcaseModels[activeModelIndex];
  const vehicleData = vehicles.find((v) => v.id === currentModel.id) || vehicles[0];

  const [displayMode, setDisplayMode] = useState<'interactive-scrub' | 'video-loop'>('interactive-scrub');

  return (
    <section id="showroom360" className="relative w-full py-28 sm:py-36 bg-[#07090d] border-t border-white/[0.06] overflow-hidden select-none">
      {/* Studio Stage Spotlight */}
      <div className="absolute inset-0 bg-radial from-[#121622]/40 via-[#07090d] to-[#050608] pointer-events-none"></div>

      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-[11px] font-tech text-[#f36b21] tracking-[0.3em] uppercase block mb-3">
            {t.showroom360.badge}
          </span>
          <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
            {t.showroom360.title}
          </h2>
          <p className="mt-4 text-sm text-[#848a99] font-light leading-relaxed">
            {t.showroom360.subtitle}
          </p>

          {/* Model Switcher Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {showcaseModels.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => setActiveModelIndex(idx)}
                className={`px-5 py-2.5 rounded-full border text-xs font-tech tracking-wider uppercase transition-all duration-300 flex items-center gap-2.5 cursor-pointer ${
                  activeModelIndex === idx
                    ? 'bg-[#181c28] text-white border-[#f36b21] shadow-[0_0_20px_rgba(243,107,33,0.3)]'
                    : 'bg-black/50 text-[#848a99] border-white/10 hover:border-white/20 hover:text-white'
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-white/30"
                  style={{ backgroundColor: m.colorHex }}
                ></span>
                <span dir="ltr">{m.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 360 Studio Enclosure */}
        <div className="rounded-2xl bg-black/60 border border-white/[0.08] backdrop-blur-xl p-6 sm:p-8 relative">
          {/* Top Stage Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
            <div>
              <span dir="ltr" className="text-[10px] font-tech text-[#f36b21] uppercase tracking-widest block telemetry-val">
                {currentModel.tag}
              </span>
              <h3 className="font-display font-black text-2xl text-white mt-1">
                <span dir="ltr">{currentModel.name}</span> <span className="text-sm font-normal text-[#848a99]">— {currentModel.edition}</span>
              </h3>
            </div>

            {/* Stage Mode Switcher */}
            <div className="flex items-center p-1 bg-black/70 border border-white/10 rounded-full self-start sm:self-auto">
              <button
                onClick={() => setDisplayMode('interactive-scrub')}
                className={`px-4 py-1.5 text-xs font-tech uppercase tracking-wider rounded-full transition-colors flex items-center gap-1.5 cursor-pointer ${
                  displayMode === 'interactive-scrub'
                    ? 'bg-[#f36b21] text-black font-bold'
                    : 'text-[#848a99] hover:text-white'
                }`}
                title="360° Studio Turntable"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{t.showroom360.dragScrub}</span>
              </button>

              <button
                onClick={() => setDisplayMode('video-loop')}
                className={`px-4 py-1.5 text-xs font-tech uppercase tracking-wider rounded-full transition-colors flex items-center gap-1.5 cursor-pointer ${
                  displayMode === 'video-loop'
                    ? 'bg-[#f36b21] text-black font-bold'
                    : 'text-[#848a99] hover:text-white'
                }`}
                title="Studio Video Turntable"
              >
                <Video className="w-3.5 h-3.5" />
                <span>{t.showroom360.studioVideo}</span>
              </button>
            </div>
          </div>

          {/* Interactive Viewer / Video Area */}
          <div className="py-4">
            {displayMode === 'interactive-scrub' ? (
              <InteractiveCarViewer
                colorHex={currentModel.colorHex}
                turntableColor={currentModel.turntable}
                viewMode="360-turntable"
                headlightsOn={true}
                wheelStyle="aeroblade"
                caliperColor="#f36b21"
              />
            ) : (
              <div className="relative w-full h-[460px] sm:h-[540px] bg-black rounded-xl overflow-hidden flex items-center justify-center">
                <video
                  key={currentModel.videoSrc}
                  src={currentModel.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Stage Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/[0.06]">
            <div className="flex items-center gap-6 text-xs font-tech text-[#848a99]">
              <div>
                <span className="text-[#f36b21] font-bold">{t.showroom360.accelLabel} </span>
                <span dir="ltr" className="text-white font-medium telemetry-val">{vehicleData.specs.acceleration}</span>
              </div>
              <div>
                <span className="text-[#f36b21] font-bold">{t.showroom360.vmaxLabel} </span>
                <span dir="ltr" className="text-white font-medium telemetry-val">{vehicleData.specs.topSpeed}</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-[#f36b21] font-bold">{t.showroom360.startingAtLabel} </span>
                <span dir="ltr" className="text-white font-medium telemetry-val">{vehicleData.priceEstimate}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onOpenDetails(currentModel.id)}
                className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-tech text-white uppercase tracking-wider transition-colors cursor-pointer"
              >
                {t.showroom360.vehicleDossier}
              </button>
              <button
                onClick={() => onBookTestDrive(currentModel.name)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#f36b21] to-[#ff8c37] text-black font-bold text-xs uppercase tracking-wider transition-transform active:scale-95 cursor-pointer shadow-[0_0_20px_rgba(243,107,33,0.3)]"
              >
                {t.showroom360.scheduleViewing}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
