import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { vehicles } from '../../data/vehicles';
import { Vehicle } from '../../types';
import { X, Scale, Sparkles, ArrowRight, Trash2, Check, Zap, Gauge, Wind } from 'lucide-react';

interface VehicleCompareModalProps {
  compareIds: string[];
  onClose: () => void;
  onRemoveFromCompare: (carId: string) => void;
  onOpenConfigurator: (carId: string) => void;
  onBookTestDrive: (carName: string) => void;
}

export const VehicleCompareModal: React.FC<VehicleCompareModalProps> = ({
  compareIds,
  onClose,
  onRemoveFromCompare,
  onOpenConfigurator,
  onBookTestDrive,
}) => {
  const { t, isRTL } = useLanguage();

  const comparedCars = vehicles.filter((v) => compareIds.includes(v.id));

  // Determine winners for specs
  const maxPower = Math.max(...comparedCars.map((c) => parseInt(c.specs.power.replace(/[^0-9]/g, '')) || 0));
  const minAccel = Math.min(...comparedCars.map((c) => parseFloat(c.specs.acceleration) || 99));
  const maxSpeed = Math.max(...comparedCars.map((c) => parseInt(c.specs.topSpeed.replace(/[^0-9]/g, '')) || 0));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl bg-[#090b10] border border-[#1b1e28] rounded-xl shadow-2xl my-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#1b1e28] bg-[#0c0e15]">
          <div className="flex items-center gap-3">
            <Scale className="w-5 h-5 text-[#f36b21]" />
            <h3 className="font-display font-black text-lg sm:text-xl text-white uppercase tracking-wider">
              {t.compare.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#12151e] hover:bg-[#1f2433] text-[#bfc2c7] hover:text-white transition-colors cursor-pointer"
            aria-label={t.common.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 max-h-[80vh] overflow-y-auto">
          {comparedCars.length === 0 ? (
            <div className="py-16 text-center text-[#8b919e] font-tech">
              <p className="text-base text-white mb-2">{t.compare.emptyTitle}</p>
              <p className="text-xs">{t.compare.emptySubtitle}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 min-w-[700px]">
                {comparedCars.map((car) => {
                  const powerNum = parseInt(car.specs.power.replace(/[^0-9]/g, '')) || 0;
                  const accelNum = parseFloat(car.specs.acceleration) || 99;
                  const speedNum = parseInt(car.specs.topSpeed.replace(/[^0-9]/g, '')) || 0;

                  return (
                    <div
                      key={car.id}
                      className="bg-[#0e1118] border border-white/10 rounded-xl p-5 flex flex-col justify-between gap-6"
                    >
                      {/* Car Card Header */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-tech text-[#f36b21] uppercase tracking-wider">
                            {car.category}
                          </span>
                          <button
                            onClick={() => onRemoveFromCompare(car.id)}
                            className="p-1.5 text-[#8b919e] hover:text-red-400 transition-colors cursor-pointer"
                            title={t.compare.remove}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <img
                          src={car.heroImage}
                          alt={car.name}
                          className="w-full aspect-16/10 object-cover rounded-lg border border-white/10 mb-3"
                        />

                        <h4 className="font-display font-black text-xl text-white">{car.name}</h4>
                        <span dir="ltr" className="font-display font-bold text-sm text-[#f36b21] block mt-0.5 telemetry-val">
                          {car.priceEstimate}
                        </span>
                      </div>

                      {/* Specs Comparison Table */}
                      <div className="flex flex-col gap-2.5 text-xs font-tech border-y border-white/10 py-4">
                        <div className="flex justify-between items-center py-1">
                          <span className="text-[#8b919e]">{t.compare.powertrain}</span>
                          <span
                            dir="ltr"
                            className={`font-bold telemetry-val ${
                              powerNum === maxPower ? 'text-[#f36b21] flex items-center gap-1' : 'text-white'
                            }`}
                          >
                            {car.specs.power} {powerNum === maxPower && '★'}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-1">
                          <span className="text-[#8b919e]">{t.compare.accel}</span>
                          <span
                            dir="ltr"
                            className={`font-bold telemetry-val ${
                              accelNum === minAccel ? 'text-[#f36b21] flex items-center gap-1' : 'text-white'
                            }`}
                          >
                            {car.specs.acceleration} {accelNum === minAccel && '★'}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-1">
                          <span className="text-[#8b919e]">{t.compare.speed}</span>
                          <span
                            dir="ltr"
                            className={`font-bold telemetry-val ${
                              speedNum === maxSpeed ? 'text-[#f36b21] flex items-center gap-1' : 'text-white'
                            }`}
                          >
                            {car.specs.topSpeed} {speedNum === maxSpeed && '★'}
                          </span>
                        </div>

                        <div className="flex justify-between items-center py-1">
                          <span className="text-[#8b919e]">{t.compare.torque}</span>
                          <span dir="ltr" className="text-white telemetry-val">{car.specs.torque}</span>
                        </div>

                        <div className="flex justify-between items-center py-1">
                          <span className="text-[#8b919e]">{t.compare.weight}</span>
                          <span dir="ltr" className="text-white telemetry-val">{car.specs.weight}</span>
                        </div>

                        <div className="flex justify-between items-center py-1">
                          <span className="text-[#8b919e]">{t.compare.downforce}</span>
                          <span dir="ltr" className="text-white telemetry-val">{car.specs.downforce}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => {
                            onClose();
                            onOpenConfigurator(car.id);
                          }}
                          className="w-full py-2.5 rounded-full bg-[#161a25] hover:bg-[#202738] border border-white/10 text-xs font-tech text-white uppercase tracking-wider cursor-pointer transition-all"
                        >
                          {t.compare.configureCTA}
                        </button>
                        <button
                          onClick={() => {
                            onClose();
                            onBookTestDrive(car.name);
                          }}
                          className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#f36b21] to-[#ff8c37] text-black font-bold text-xs uppercase tracking-wider cursor-pointer transition-all shadow-[0_0_15px_rgba(243,107,33,0.3)]"
                        >
                          {t.compare.viewingCTA}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
