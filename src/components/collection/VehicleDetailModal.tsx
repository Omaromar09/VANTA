import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Vehicle } from '../../types';
import { 
  X, Zap, Gauge, Wind, Check, 
  Heart, Scale, Calendar, Sliders, Info, ChevronRight 
} from 'lucide-react';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onOpenConfigurator: (carId: string) => void;
  onBookTestDrive: (carName: string) => void;
  onToggleFavorite: (carId: string) => void;
  isFavorite: boolean;
  onToggleCompare: (carId: string) => void;
  inCompare: boolean;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  onClose,
  onOpenConfigurator,
  onBookTestDrive,
  onToggleFavorite,
  isFavorite,
  onToggleCompare,
  inCompare,
}) => {
  const { isRTL } = useLanguage();

  if (!vehicle) return null;

  const [activeImage, setActiveImage] = useState(vehicle.gallery[0] || vehicle.heroImage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl bg-[#090b10] border border-white/[0.08] rounded-2xl shadow-2xl my-auto overflow-hidden">
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/[0.06] bg-[#0c0f16]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#f36b21] animate-ping"></span>
            <span className="text-xs font-tech text-[#f36b21] tracking-widest uppercase">
              {vehicle.category} // OFFICIAL DOSSIER
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleCompare(vehicle.id)}
              className={`p-2 rounded-full border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                inCompare
                  ? 'bg-[#f36b21] text-black border-[#f36b21] font-bold'
                  : 'bg-black/60 text-[#bfc2c7] border-white/10 hover:text-white'
              }`}
              title="Compare"
            >
              <Scale className="w-4 h-4" />
              <span className="hidden sm:inline">{inCompare ? 'In Compare' : 'Compare'}</span>
            </button>

            <button
              onClick={() => onToggleFavorite(vehicle.id)}
              className={`p-2 rounded-full border transition-colors cursor-pointer ${
                isFavorite
                  ? 'bg-red-500/20 text-red-500 border-red-500/50'
                  : 'bg-black/60 text-[#bfc2c7] border-white/10 hover:text-[#f36b21]'
              }`}
              title="Favorite"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 max-h-[82vh] overflow-y-auto">
          {/* Main Showcase Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-16/9 bg-[#06070a] rounded-xl overflow-hidden border border-white/[0.08]">
              <img
                src={activeImage}
                alt={vehicle.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-md border border-white/10 rounded-full text-xs font-tech text-[#f36b21]">
                {vehicle.name}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {vehicle.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {vehicle.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 sm:w-32 aspect-16/10 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                      activeImage === img ? 'border-[#f36b21] scale-102' : 'border-white/10 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Allocation Price */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-8 pb-6 border-b border-white/[0.06]">
            <div>
              <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
                {vehicle.name}
              </h2>
              <p className="text-sm sm:text-base text-[#f36b21] font-tech mt-1 tracking-wide">
                {vehicle.tagline}
              </p>
            </div>

            <div className="text-start md:text-end">
              <span className="text-[10px] font-tech text-[#5a6070] uppercase block">
                STARTING ALLOCATION
              </span>
              <span className="font-display font-black text-3xl text-white">
                {vehicle.priceEstimate}
              </span>
            </div>
          </div>

          {/* Detailed Narrative & Telemetry Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 my-8">
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <h4 className="text-xs font-tech text-[#848a99] uppercase tracking-widest mb-2 font-bold">
                  ENGINEERING PHILOSOPHY
                </h4>
                <p className="text-sm text-[#bfc2c7] font-light leading-relaxed">
                  {vehicle.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-tech text-[#848a99] uppercase tracking-widest mb-3 font-bold">
                  AERODYNAMIC & CHASSIS HIGHLIGHTS
                </h4>
                <ul className="flex flex-col gap-2.5">
                  {vehicle.overview.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-[#848a99]">
                      <Check className="w-4 h-4 text-[#f36b21] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Available Colors */}
              <div>
                <h4 className="text-xs font-tech text-[#848a99] uppercase tracking-widest mb-3 font-bold">
                  CURATED SURFACE FINISHES
                </h4>
                <div className="flex items-center gap-3">
                  {vehicle.availableColors.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform shadow-md"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    ></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="lg:col-span-5 bg-[#0e1118] border border-white/[0.08] rounded-xl p-6 flex flex-col justify-between gap-4">
              <h4 className="text-xs font-tech text-[#f36b21] uppercase tracking-widest border-b border-white/[0.06] pb-3 flex items-center gap-2 font-bold">
                <Gauge className="w-4 h-4" />
                OFFICIAL SPECIFICATIONS
              </h4>

              <div className="flex flex-col gap-3 text-xs font-tech">
                <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#848a99]">POWERTRAIN</span>
                  <span className="text-white font-bold">{vehicle.specs.power}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#848a99]">TORQUE</span>
                  <span className="text-white">{vehicle.specs.torque}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#848a99]">0–100 KM/H</span>
                  <span className="text-[#f36b21] font-bold">{vehicle.specs.acceleration}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#848a99]">TOP SPEED</span>
                  <span className="text-white font-bold">{vehicle.specs.topSpeed}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#848a99]">ENGINE ARCHITECTURE</span>
                  <span className="text-white text-end max-w-[200px]">{vehicle.specs.engine}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#848a99]">TRANSMISSION</span>
                  <span className="text-white text-end max-w-[200px]">{vehicle.specs.transmission}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#848a99]">CURB WEIGHT</span>
                  <span className="text-white">{vehicle.specs.weight}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/[0.04]">
                  <span className="text-[#848a99]">DOWNFORCE</span>
                  <span className="text-white">{vehicle.specs.downforce}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-[#848a99]">DRIVE TYPE</span>
                  <span className="text-white text-end">{vehicle.specs.driveType}</span>
                </div>
              </div>

              <div className="p-3 bg-black/60 border border-white/[0.06] rounded-lg text-[10px] text-[#848a99] font-tech flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-[#f36b21] flex-shrink-0 mt-0.5" />
                <span>Concept simulated metrics validated through wind-tunnel scale modeling.</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenConfigurator(vehicle.id);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#141824] hover:bg-[#1d2232] border border-white/10 text-xs font-tech text-white uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-[#f36b21]" />
              <span>Launch Studio Configurator</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onBookTestDrive(vehicle.name);
              }}
              className="w-full sm:w-auto px-8 py-3 rounded-full bg-gradient-to-r from-[#f36b21] to-[#ff8c37] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(243,107,33,0.4)] flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Schedule VIP Viewing / Drive</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
