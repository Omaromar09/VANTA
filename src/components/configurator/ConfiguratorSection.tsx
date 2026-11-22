import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { vehicles } from '../../data/vehicles';
import { InteractiveCarViewer } from './InteractiveCarViewer';
import { 
  RotateCw, Eye, Sparkles, Heart, Share2, Scale, 
  ChevronLeft, ChevronRight, Check, Sliders, ArrowRight,
  RotateCcw, Shield, Zap, CircleDot
} from 'lucide-react';

interface ConfiguratorSectionProps {
  onRequestConfig: (configSummary: {
    vehicleName: string;
    colorName: string;
    finish: string;
    wheel: string;
    wheelFinish: string;
    caliper: string;
    totalPrice: number;
    options: string[];
  }) => void;
}

export const ConfiguratorSection: React.FC<ConfiguratorSectionProps> = ({ onRequestConfig }) => {
  const { t, isRTL } = useLanguage();

  const [selectedVehicleId, setSelectedVehicleId] = useState('vanta-gt900');
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || vehicles[0];

  // View Mode: Pure High-Definition 360 Photographic Studio Turntable
  const [resetSignal, setResetSignal] = useState(0);

  // 1. Color Swatches
  const colorOptions = [
    { id: 'orange', name: isRTL ? 'برتقالي فانتا المعدني' : 'Metallic Vanta Orange', hex: '#F36B21', turntable: 'orange' as const },
    { id: 'silver', name: isRTL ? 'فضي تيتانيوم سائل' : 'Liquid Titanium Silver', hex: '#BFC2C7', turntable: 'silver' as const },
    { id: 'black', name: isRTL ? 'أسود كربوني أوبسيديان' : 'Obsidian Carbon Black', hex: '#0A0B0E', turntable: 'black' as const },
    { id: 'red', name: isRTL ? 'أحمر روسو سباق' : 'Rosso Corsa Racing Red', hex: '#D31A26', turntable: 'red' as const },
    { id: 'blue', name: isRTL ? 'أزرق موناكو عميق' : 'Monaco Deep Blue', hex: '#0D3B66', turntable: 'blue' as const },
    { id: 'white', name: isRTL ? 'أبيض بيانكو لؤلؤي' : 'Bianco Pearl White', hex: '#F3F3F1', turntable: 'white' as const },
  ];
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);

  // 2. Wheel Designs
  const wheelOptions = [
    { id: 'aeroblade', name: isRTL ? 'شفرات أيرو 21" فورجد' : '21" Forged Aeroblades', extraPrice: 0 },
    { id: 'monoblock', name: isRTL ? 'مونوبلوك حلبات 20"' : '20" Track Monoblock', extraPrice: 8500 },
    { id: 'turbine', name: isRTL ? 'توربين دايموند 21"' : '21" Diamond Turbine', extraPrice: 14000 },
  ];
  const [selectedWheel, setSelectedWheel] = useState(wheelOptions[0]);

  // 3. Wheel Finishes
  const wheelFinishOptions = [
    { id: 'satin-titanium', name: isRTL ? 'تيتانيوم ساتان' : 'Satin Titanium', extraPrice: 0, hex: '#6e737c' },
    { id: 'gloss-black', name: isRTL ? 'أسود لامع بيانو' : 'Gloss Black', extraPrice: 2500, hex: '#0a0b0e' },
    { id: 'liquid-silver', name: isRTL ? 'فضي سائل ملمع' : 'Liquid Silver', extraPrice: 2000, hex: '#e8ecf0' },
    { id: 'brushed-gold', name: isRTL ? 'ذهب نحاسي مسحوب' : 'Brushed Gold', extraPrice: 3800, hex: '#c89d4a' },
  ];
  const [selectedWheelFinish, setSelectedWheelFinish] = useState(wheelFinishOptions[0]);

  // 4. Calipers
  const caliperOptions = [
    { id: 'vanta-orange', name: isRTL ? 'برتقالي فانتا' : 'Vanta Orange', hex: '#F36B21' },
    { id: 'racing-red', name: isRTL ? 'أحمر بريمبو' : 'Brembo Red', hex: '#D31A26' },
    { id: 'acid-green', name: isRTL ? 'أخضر حمضي' : 'Acid Green', hex: '#76FF03' },
    { id: 'liquid-chrome', name: isRTL ? 'كروم سائل' : 'Liquid Chrome', hex: '#E0E0E0' },
    { id: 'ceramic-yellow', name: isRTL ? 'أصفر سيراميك' : 'Ceramic Yellow', hex: '#FFD600' },
  ];
  const [selectedCaliper, setSelectedCaliper] = useState(caliperOptions[0]);

  // 5. Exterior & Aero Customizations
  const [headlightsOn, setHeadlightsOn] = useState(true);
  const [aeroPackActive, setAeroPackActive] = useState(true);
  const [carbonRoofActive, setCarbonRoofActive] = useState(false);
  const [exhaustActive, setExhaustActive] = useState(false);

  const [isSaved, setIsSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Price Calculation
  const basePrice = parseInt(selectedVehicle.priceEstimate.replace(/[^0-9]/g, '')) || 2450000;
  const totalPrice = basePrice 
    + selectedWheel.extraPrice 
    + selectedWheelFinish.extraPrice 
    + (aeroPackActive ? 35000 : 0)
    + (carbonRoofActive ? 18500 : 0)
    + (exhaustActive ? 14200 : 0);

  // Reset to Factory Defaults
  const handleReset = () => {
    setSelectedColor(colorOptions[0]);
    setSelectedWheel(wheelOptions[0]);
    setSelectedWheelFinish(wheelFinishOptions[0]);
    setSelectedCaliper(caliperOptions[0]);
    setHeadlightsOn(true);
    setAeroPackActive(true);
    setCarbonRoofActive(false);
    setExhaustActive(false);
    setResetSignal((prev) => prev + 1);
  };

  const handleRequestBuild = () => {
    const activeOptions: string[] = [];
    if (aeroPackActive) activeOptions.push('Active Carbon DRS Aero Wing');
    if (carbonRoofActive) activeOptions.push('Carbon Fiber Roof & Mirrors');
    if (exhaustActive) activeOptions.push('Titanium Sport Exhaust System');

    onRequestConfig({
      vehicleName: selectedVehicle.name,
      colorName: selectedColor.name,
      finish: 'Metallic Gloss Clearcoat',
      wheel: selectedWheel.name,
      wheelFinish: selectedWheelFinish.name,
      caliper: selectedCaliper.name,
      totalPrice,
      options: activeOptions,
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <section id="configurator" className="relative w-full min-h-[960px] py-16 sm:py-24 bg-[#0a0c10] border-t border-white/[0.06] select-none flex flex-col justify-between">
      {/* Background Subtle Spotlight */}
      <div className="absolute inset-0 bg-radial from-[#121622]/40 via-[#0a0c10] to-[#07080b] pointer-events-none"></div>

      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10 flex flex-col flex-1 justify-between">
        {/* 1. Header Bar: Model Designation, View Mode Switcher, and Total Price */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/[0.06]">
          {/* Brand & Model designation */}
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-sm bg-black border border-[#f36b21]/50 flex items-center justify-center shrink-0">
              <span className="font-display font-black text-[#f36b21] text-2xl">V</span>
            </div>
            <div>
              <span className="font-display font-black text-2xl sm:text-3xl text-white tracking-wider block uppercase">
                {selectedVehicle.name}
              </span>
              <span className="text-xs font-tech text-[#848a99] tracking-widest block uppercase">
                {t.configurator.badge} // 2026
              </span>
            </div>
          </div>

          {/* Center Luxury Studio Status Pill */}
          <div className="flex items-center gap-2.5 px-4 py-2 bg-black/80 border border-white/10 rounded-full backdrop-blur-md self-start lg:self-auto shadow-lg">
            <span className="w-2 h-2 rounded-full bg-[#f36b21] animate-pulse"></span>
            <span className="text-xs font-tech text-white uppercase tracking-wider">
              {isRTL ? 'استوديو العرض 360° الفاخر' : '360° ROTATIONAL STUDIO'}
            </span>
          </div>

          {/* Right Price Display & Reset Button */}
          <div className="flex items-center gap-4 self-end lg:self-auto">
            <button
              onClick={handleReset}
              className="px-3.5 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs font-tech text-[#bfc2c7] hover:text-white flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              title={t.configurator.reset}
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#f36b21]" />
              <span className="hidden sm:inline">{t.configurator.reset}</span>
            </button>

            <div className="text-end">
              <span dir="ltr" className="font-display font-black text-2xl sm:text-3xl text-white tracking-wide block telemetry-val">
                $ {totalPrice.toLocaleString()}
              </span>
              <span className="text-[11px] font-tech text-[#f36b21]">
                {t.configurator.estPrice}
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
              viewMode="360-turntable"
              headlightsOn={headlightsOn}
              wheelStyle={selectedWheel.id}
              wheelFinish={selectedWheelFinish.id}
              caliperColor={selectedCaliper.hex}
              resetSignal={resetSignal}
            />
          </div>

          {/* Floating Action Tool Bar (Bookmark / Share / Direct Order) */}
          <div className="absolute end-2 sm:end-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`w-11 h-11 rounded-full border backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
                isSaved
                  ? 'bg-[#f36b21] text-black border-[#f36b21]'
                  : 'bg-black/70 text-[#bfc2c7] border-white/10 hover:text-white hover:border-[#f36b21]/50'
              }`}
              title={t.configurator.bookmark}
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="w-11 h-11 rounded-full bg-black/70 border border-white/10 hover:border-[#f36b21]/50 text-[#bfc2c7] hover:text-white backdrop-blur-md flex items-center justify-center transition-all cursor-pointer"
              title={copiedLink ? t.configurator.linkCopied : t.configurator.shareBuild}
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={handleRequestBuild}
              className="w-11 h-11 rounded-full bg-[#f36b21] hover:bg-[#ff8c37] text-black flex items-center justify-center shadow-[0_0_20px_rgba(243,107,33,0.5)] transition-all active:scale-95 cursor-pointer"
              title={t.configurator.requestConfig}
            >
              <ArrowRight className="w-5 h-5 font-bold" />
            </button>
          </div>
        </div>

        {/* 3. Modular Configurator Panels */}
        <div className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Panel 1: EXTERIOR COLOR */}
            <div className="p-4 rounded-xl bg-black/70 border border-white/10 backdrop-blur-xl flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-tech text-[#848a99] uppercase tracking-widest font-bold">
                  {t.configurator.colors}
                </span>
                <span className="text-[11px] font-tech text-[#f36b21] truncate max-w-[150px]">
                  {selectedColor.name}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                {colorOptions.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedColor(c)}
                    className={`relative w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 flex items-center justify-center cursor-pointer ${
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

            {/* Panel 2: WHEEL DESIGN */}
            <div className="p-4 rounded-xl bg-black/70 border border-white/10 backdrop-blur-xl flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-tech text-[#848a99] uppercase tracking-widest font-bold">
                  {t.configurator.wheels}
                </span>
                <span dir="ltr" className="text-[11px] font-tech text-[#bfc2c7] telemetry-val">
                  {selectedWheel.extraPrice === 0 ? t.configurator.standard : `+$${selectedWheel.extraPrice.toLocaleString()}`}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {wheelOptions.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => setSelectedWheel(w)}
                    className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                      selectedWheel.id === w.id
                        ? 'bg-[#181c28] border-[#f36b21] text-white shadow-[0_0_10px_rgba(243,107,33,0.3)]'
                        : 'bg-black/40 border-white/10 text-[#848a99] hover:border-white/25'
                    }`}
                  >
                    <span className="text-[10px] font-tech block truncate">{w.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Panel 3: WHEEL FINISH */}
            <div className="p-4 rounded-xl bg-black/70 border border-white/10 backdrop-blur-xl flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-tech text-[#848a99] uppercase tracking-widest font-bold">
                  {isRTL ? 'طلاء العجلات' : 'WHEEL FINISH'}
                </span>
                <span dir="ltr" className="text-[11px] font-tech text-[#bfc2c7] telemetry-val">
                  {selectedWheelFinish.extraPrice === 0 ? t.configurator.standard : `+$${selectedWheelFinish.extraPrice.toLocaleString()}`}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {wheelFinishOptions.map((wf) => (
                  <button
                    key={wf.id}
                    onClick={() => setSelectedWheelFinish(wf)}
                    className={`p-1.5 rounded-lg border text-center transition-all flex flex-col items-center gap-1 cursor-pointer ${
                      selectedWheelFinish.id === wf.id
                        ? 'bg-[#181c28] border-[#f36b21] text-white'
                        : 'bg-black/40 border-white/10 text-[#848a99] hover:border-white/25'
                    }`}
                    title={wf.name}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-white/20" 
                      style={{ backgroundColor: wf.hex }}
                    />
                    <span className="text-[9px] font-tech truncate w-full">{wf.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Panel 4: CALIPERS & LIGHTS */}
            <div className="p-4 rounded-xl bg-black/70 border border-white/10 backdrop-blur-xl flex flex-col justify-between gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-tech text-[#848a99] uppercase tracking-widest font-bold">
                  {t.configurator.lightsCalipers}
                </span>
                <button
                  onClick={() => setHeadlightsOn(!headlightsOn)}
                  className={`text-[10px] font-tech px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                    headlightsOn ? 'border-[#f36b21] text-[#f36b21] bg-[#f36b21]/10' : 'border-white/15 text-[#848a99]'
                  }`}
                >
                  LED: {headlightsOn ? t.configurator.on : t.configurator.off}
                </button>
              </div>

              <div className="flex items-center justify-between gap-1 pt-1">
                {caliperOptions.map((cal) => (
                  <button
                    key={cal.id}
                    onClick={() => setSelectedCaliper(cal)}
                    className={`w-7 h-7 rounded-full border transition-transform hover:scale-110 flex items-center justify-center cursor-pointer ${
                      selectedCaliper.id === cal.id ? 'border-white scale-110 shadow-[0_0_10px_rgba(255,255,255,0.4)]' : 'border-white/20'
                    }`}
                    style={{ backgroundColor: cal.hex }}
                    title={cal.name}
                  >
                    {selectedCaliper.id === cal.id && (
                      <Check className={`w-3 h-3 ${cal.id === 'liquid-chrome' || cal.id === 'acid-green' || cal.id === 'ceramic-yellow' ? 'text-black' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Direct CTA & Aero Specs Bar */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            {/* Toggles for Exterior Packages */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-tech">
              <button
                onClick={() => setAeroPackActive(!aeroPackActive)}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                  aeroPackActive
                    ? 'border-[#f36b21] bg-[#f36b21]/10 text-white font-medium'
                    : 'border-white/10 bg-black/40 text-[#848a99]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${aeroPackActive ? 'bg-[#f36b21]' : 'bg-gray-600'}`} />
                <span>{isRTL ? 'جناح DRS الكربوني النشط' : 'Active Carbon DRS Aero Wing'}</span>
                <span dir="ltr" className="text-[10px] text-[#f36b21] telemetry-val">+$35k</span>
              </button>

              <button
                onClick={() => setCarbonRoofActive(!carbonRoofActive)}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                  carbonRoofActive
                    ? 'border-[#f36b21] bg-[#f36b21]/10 text-white font-medium'
                    : 'border-white/10 bg-black/40 text-[#848a99]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${carbonRoofActive ? 'bg-[#f36b21]' : 'bg-gray-600'}`} />
                <span>{isRTL ? 'سقف كربون ومرايا' : 'Carbon Roof & Mirrors'}</span>
                <span dir="ltr" className="text-[10px] text-[#f36b21] telemetry-val">+$18.5k</span>
              </button>

              <button
                onClick={() => setExhaustActive(!exhaustActive)}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                  exhaustActive
                    ? 'border-[#f36b21] bg-[#f36b21]/10 text-white font-medium'
                    : 'border-white/10 bg-black/40 text-[#848a99]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${exhaustActive ? 'bg-[#f36b21]' : 'bg-gray-600'}`} />
                <span>{isRTL ? 'عادم تيتانيوم رياضي' : 'Titanium Sport Exhaust'}</span>
                <span dir="ltr" className="text-[10px] text-[#f36b21] telemetry-val">+$14.2k</span>
              </button>
            </div>

            <button
              onClick={handleRequestBuild}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-[#f36b21] to-[#ff8c37] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(243,107,33,0.4)] hover:shadow-[0_0_35px_rgba(243,107,33,0.6)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
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
