import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { vehicles } from '../../data/vehicles';
import { InteractiveCarViewer } from './InteractiveCarViewer';
import { 
  RotateCw, Eye, Sparkles, Heart, Share2, Scale, 
  ChevronLeft, ChevronRight, Check, Sliders, ArrowRight 
} from 'lucide-react';

interface ConfiguratorSectionProps {
  onRequestConfig: (configSummary: {
    vehicleName: string;
    colorName: string;
    finish: string;
    wheel: string;
    caliper: string;
    totalPrice: number;
    options: string[];
  }) => void;
}

export const ConfiguratorSection: React.FC<ConfiguratorSectionProps> = ({ onRequestConfig }) => {
  const { t, isRTL } = useLanguage();

  const [selectedVehicleId, setSelectedVehicleId] = useState('vanta-gt900');
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  // View Mode: pure 360 Turntable studio (Zero WebGL lag)
  const viewMode = '360-turntable' as const;

  // Color Swatches (Matching Porsche Configurator)
  const colorOptions = [
    { id: 'orange', name: 'Metallic Vanta Orange', hex: '#F36B21', turntable: 'orange' as const },
    { id: 'silver', name: 'Liquid Titanium Silver', hex: '#BFC2C7', turntable: 'silver' as const },
    { id: 'black', name: 'Obsidian Carbon Black', hex: '#0A0B0E', turntable: 'black' as const },
    { id: 'red', name: 'Rosso Corsa Racing Red', hex: '#D31A26', turntable: 'red' as const },
    { id: 'blue', name: 'Monaco Deep Blue', hex: '#0D3B66', turntable: 'blue' as const },
    { id: 'white', name: 'Bianco Pearl White', hex: '#F3F3F1', turntable: 'white' as const },
  ];
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  // Wheel Designs (Matching Porsche Configurator)
  const wheelOptions = [
    { id: 'aeroblade', name: '21" Forged Aeroblades', extraPrice: 0, preview: '/images/cockpit-detail.jpg' },
    { id: 'monoblock', name: '20" Track Monoblock', extraPrice: 8500, preview: '/images/gt900-side.jpg' },
    { id: 'turbine', name: '21" Diamond Turbine', extraPrice: 14000, preview: '/images/spectre-front.jpg' },
  ];
  const [selectedWheel, setSelectedWheel] = useState(wheelOptions[0]);

  // Calipers
  const caliperOptions = [
    { id: 'vanta-orange', name: 'Vanta Orange', hex: '#F36B21' },
    { id: 'racing-red', name: 'Brembo Red', hex: '#D31A26' },
    { id: 'acid-green', name: 'Acid Green', hex: '#76FF03' },
    { id: 'liquid-chrome', name: 'Liquid Chrome', hex: '#E0E0E0' },
  ];
  const [selectedCaliper, setSelectedCaliper] = useState(caliperOptions[0]);

  // Light / Aero Toggles
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [aeroPackActive, setAeroPackActive] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Price Calculation
  const basePrice = parseInt(selectedVehicle.priceEstimate.replace(/[^0-9]/g, '')) || 2450000;
  const totalPrice = basePrice + selectedWheel.extraPrice + (aeroPackActive ? 35000 : 0);

  const handleRequestBuild = () => {
    onRequestConfig({
      vehicleName: selectedVehicle.name,
      colorName: selectedColor.name,
      finish: 'Metallic Gloss Clearcoat',
      wheel: selectedWheel.name,
      caliper: selectedCaliper.name,
      totalPrice,
      options: aeroPackActive ? ['Active Carbon Aero Pack'] : [],
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="configurator" className="relative w-full min-h-[920px] py-16 sm:py-24 bg-[#0a0c10] border-t border-white/[0.06] select-none flex flex-col justify-between">
      {/* Background Subtle Spotlight */}
      <div className="absolute inset-0 bg-radial from-[#121622]/40 via-[#0a0c10] to-[#07080b] pointer-events-none"></div>

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 flex flex-col flex-1 justify-between">
        {/* 1. Porsche-Style Minimal Configurator Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.06]">
          {/* Brand & Model designation */}
          <div className="flex items-center gap-4" dir="ltr">
            <div className="w-10 h-10 rounded-sm bg-black border border-[#f36b21]/50 flex items-center justify-center">
              <span className="font-display font-black text-[#f36b21] text-xl">V</span>
            </div>
            <div>
              <span className="font-display font-black text-2xl text-white tracking-wider block uppercase">
                {selectedVehicle.name}
              </span>
              <span className="text-xs font-tech text-[#848a99] tracking-widest block uppercase">
                STUDIO CONFIGURATION // 2026
              </span>
            </div>
          </div>

          {/* Center Studio Status Pill (Matching Luxury Reference) */}
          <div className="flex items-center gap-2.5 px-4 py-2 bg-black/70 border border-white/10 rounded-full self-start sm:self-auto backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-[#f36b21] animate-pulse"></span>
            <span className="text-xs font-tech text-white uppercase tracking-wider">
              {isRTL ? 'استوديو العرض 360° الحصري' : '360° ROTATIONAL STUDIO'}
            </span>
          </div>

          {/* Right Price Display (Matching Porsche "$ 250 780,00") */}
          <div className="flex items-center gap-4">
            <div className="text-start sm:text-end">
              <span className="font-display font-black text-2xl text-white tracking-wide block">
                $ {totalPrice.toLocaleString()}
              </span>
              <span className="text-[11px] font-tech text-[#f36b21] cursor-pointer hover:underline">
                Estimated Investment &gt;
              </span>
            </div>
          </div>
        </div>

        {/* 2. Main Vehicle 3D / 360 Stage */}
        <div className="relative w-full my-auto py-4 flex items-center justify-center">
          {/* Main Interactive Canvas */}
          <div className="w-full">
            <InteractiveCarViewer
              colorHex={selectedColor.hex}
              turntableColor={selectedColor.turntable}
              viewMode={viewMode}
              headlightsOn={headlightsOn}
              wheelStyle={selectedWheel.id}
              caliperColor={selectedCaliper.hex}
            />
          </div>

          {/* Floating Action Tool Bar (Matching Porsche Bookmark/Share/Compare) */}
          <div className="absolute end-2 sm:end-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`w-11 h-11 rounded-full border backdrop-blur-md flex items-center justify-center transition-all ${
                isSaved
                  ? 'bg-[#f36b21] text-black border-[#f36b21]'
                  : 'bg-black/70 text-[#bfc2c7] border-white/10 hover:text-white hover:border-[#f36b21]/50'
              }`}
              title="Bookmark Configuration"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="w-11 h-11 rounded-full bg-black/70 border border-white/10 hover:border-[#f36b21]/50 text-[#bfc2c7] hover:text-white backdrop-blur-md flex items-center justify-center transition-all"
              title={copiedLink ? 'Link Copied!' : 'Share Build'}
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleRequestBuild}
              className="w-11 h-11 rounded-full bg-[#f36b21] hover:bg-[#ff8c37] text-black flex items-center justify-center shadow-[0_0_20px_rgba(243,107,33,0.5)] transition-all active:scale-95"
              title="Request This Build"
            >
              <ArrowRight className="w-5 h-5 font-bold" />
            </button>
          </div>
        </div>

        {/* 3. Bottom Floating Modular Configurator Panels (Matching Reference 1 - Porsche) */}
        <div className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Panel 1: COLORS (Matching Porsche Card) */}
            <div className="p-4 rounded-xl bg-black/70 border border-white/10 backdrop-blur-xl flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-tech text-[#848a99] uppercase tracking-widest font-bold">
                  COLORS
                </span>
                <span className="text-[11px] font-tech text-[#f36b21]">
                  {selectedColor.name}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                {colorOptions.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c)}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 flex items-center justify-center ${
                      selectedColor.id === c.id
                        ? 'border-[#f36b21] scale-110 shadow-[0_0_12px_rgba(243,107,33,0.6)]'
                        : 'border-white/15'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  >
                    {selectedColor.id === c.id && (
                      <Check className={`w-3.5 h-3.5 ${c.id === 'white' || c.id === 'silver' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Panel 2: WHEELS (Matching Porsche Card) */}
            <div className="p-4 rounded-xl bg-black/70 border border-white/10 backdrop-blur-xl flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-tech text-[#848a99] uppercase tracking-widest font-bold">
                  WHEELS
                </span>
                <span className="text-[11px] font-tech text-[#bfc2c7]">
                  {selectedWheel.extraPrice === 0 ? 'Standard' : `+$${selectedWheel.extraPrice.toLocaleString()}`}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                {wheelOptions.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWheel(w)}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      selectedWheel.id === w.id
                        ? 'bg-[#181c28] border-[#f36b21] text-white'
                        : 'bg-black/40 border-white/10 text-[#848a99] hover:border-white/25'
                    }`}
                  >
                    <span className="text-[10px] font-tech block truncate">{w.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Panel 3: LIGHTS & CALIPERS (Matching Porsche Card) */}
            <div className="p-4 rounded-xl bg-black/70 border border-white/10 backdrop-blur-xl flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-tech text-[#848a99] uppercase tracking-widest font-bold">
                  LIGHTS & CALIPERS
                </span>
                <span className="text-[11px] font-tech text-[#f36b21]">
                  Active Options
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 pt-1">
                {/* Headlights Toggle */}
                <button
                  onClick={() => setHeadlightsOn(!headlightsOn)}
                  className={`flex-1 py-2 px-3 rounded-lg border text-[11px] font-tech uppercase tracking-wider transition-all ${
                    headlightsOn
                      ? 'bg-[#181c28] border-[#f36b21] text-[#f36b21] font-bold'
                      : 'bg-black/40 border-white/10 text-[#848a99]'
                  }`}
                >
                  LED Lights: {headlightsOn ? 'ON' : 'OFF'}
                </button>

                {/* Caliper Swatches */}
                <div className="flex items-center gap-1.5">
                  {caliperOptions.map((cal) => (
                    <button
                      key={cal.id}
                      onClick={() => setSelectedCaliper(cal)}
                      className={`w-6 h-6 rounded-full border transition-transform hover:scale-110 flex items-center justify-center ${
                        selectedCaliper.id === cal.id ? 'border-white scale-110' : 'border-white/20'
                      }`}
                      style={{ backgroundColor: cal.hex }}
                      title={cal.name}
                    >
                      {selectedCaliper.id === cal.id && <Check className="w-3 h-3 text-black font-bold" />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Direct CTA Bar */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs font-tech text-[#848a99]">
              <span>ACTIVE DRS AERO: <strong className="text-white">ENABLED</strong></span>
              <span>•</span>
              <span>PBR CARBON CLEARCOAT: <strong className="text-white">3-LAYER</strong></span>
            </div>

            <button
              onClick={handleRequestBuild}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#f36b21] to-[#ff8c37] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(243,107,33,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>{t.configurator.requestConfig}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
