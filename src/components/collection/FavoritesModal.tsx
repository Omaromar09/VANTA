import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { vehicles } from '../../data/vehicles';
import { X, Heart, Trash2, ArrowRight, Sliders, Calendar } from 'lucide-react';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  onRemoveFavorite: (carId: string) => void;
  onOpenDetails: (carId: string) => void;
  onOpenConfigurator: (carId: string) => void;
  onBookTestDrive: (carName: string) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onOpenDetails,
  onOpenConfigurator,
  onBookTestDrive,
}) => {
  const { t, isRTL } = useLanguage();

  if (!isOpen) return null;

  const favCars = vehicles.filter((v) => favorites.includes(v.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-[#090b10] border border-[#1b1e28] rounded-xl shadow-2xl my-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#1b1e28] bg-[#0c0e15]">
          <div className="flex items-center gap-3">
            <Heart className="w-5 h-5 text-red-500 fill-current" />
            <h3 className="font-display font-black text-lg text-white uppercase tracking-wider">
              {t.favorites.title} ({favCars.length})
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
        <div className="p-4 sm:p-6 max-h-[75vh] overflow-y-auto">
          {favCars.length === 0 ? (
            <div className="py-16 text-center text-[#8b919e] font-tech text-xs">
              <p className="text-base text-white mb-2">{t.favorites.emptyTitle}</p>
              <p>{t.favorites.emptySubtitle}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {favCars.map((car) => (
                <div
                  key={car.id}
                  className="p-4 rounded-xl bg-[#0e1118] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img
                      src={car.heroImage}
                      alt={car.name}
                      className="w-24 aspect-16/10 object-cover rounded-lg border border-white/10 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-tech text-[#f36b21] uppercase">
                        {car.category}
                      </span>
                      <h4 className="font-display font-bold text-lg text-white">{car.name}</h4>
                      <span dir="ltr" className="text-xs font-tech text-[#bfc2c7] block telemetry-val">
                        {car.specs.power} • {car.specs.acceleration}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenConfigurator(car.id);
                      }}
                      className="p-2 rounded-lg bg-[#151924] hover:bg-[#202738] text-xs font-tech text-[#f36b21] cursor-pointer"
                      title={t.favorites.configureCTA}
                    >
                      <Sliders className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        onClose();
                        onOpenDetails(car.id);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#1b1e28] hover:bg-[#282d3d] text-xs font-tech text-white cursor-pointer"
                    >
                      {isRTL ? 'الملف' : 'Dossier'}
                    </button>
                    <button
                      onClick={() => onRemoveFavorite(car.id)}
                      className="p-2 rounded-lg bg-black/40 hover:bg-red-500/20 text-[#8b919e] hover:text-red-400 cursor-pointer"
                      title={t.favorites.remove}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
