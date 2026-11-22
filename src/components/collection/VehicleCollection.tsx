import React, { useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { vehicles } from '../../data/vehicles';
import { VehicleCategory } from '../../types';
import { 
  Search, Heart, Scale, ArrowRight, Zap, 
  Gauge, Wind, Sliders, ChevronRight 
} from 'lucide-react';

interface VehicleCollectionProps {
  onOpenDetails: (carId: string) => void;
  onOpenConfigurator: (carId?: string) => void;
  onToggleFavorite: (carId: string) => void;
  favorites: string[];
  onToggleCompare: (carId: string) => void;
  compareList: string[];
}

export const VehicleCollection: React.FC<VehicleCollectionProps> = ({
  onOpenDetails,
  onOpenConfigurator,
  onToggleFavorite,
  favorites,
  onToggleCompare,
  compareList,
}) => {
  const { t, isRTL } = useLanguage();

  const [activeCategory, setActiveCategory] = useState<VehicleCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'power' | 'accel' | 'price'>('featured');

  const filteredVehicles = useMemo(() => {
    return vehicles
      .filter((car) => {
        const matchesCategory = activeCategory === 'all' || car.category === activeCategory;
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          car.name.toLowerCase().includes(query) ||
          car.tagline.toLowerCase().includes(query) ||
          car.specs.engine.toLowerCase().includes(query) ||
          car.specs.power.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'power') {
          const pA = parseInt(a.specs.power.replace(/[^0-9]/g, '')) || 0;
          const pB = parseInt(b.specs.power.replace(/[^0-9]/g, '')) || 0;
          return pB - pA;
        }
        if (sortBy === 'accel') {
          const aA = parseFloat(a.specs.acceleration) || 99;
          const aB = parseFloat(b.specs.acceleration) || 99;
          return aA - aB;
        }
        if (sortBy === 'price') {
          const prA = parseInt(a.priceEstimate.replace(/[^0-9]/g, '')) || 0;
          const prB = parseInt(b.priceEstimate.replace(/[^0-9]/g, '')) || 0;
          return prB - prA;
        }
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [activeCategory, searchQuery, sortBy]);

  const categories = [
    { id: 'all' as VehicleCategory, label: 'All Fleet' },
    { id: 'hypercars' as VehicleCategory, label: 'Hypercars' },
    { id: 'supercars' as VehicleCategory, label: 'Supercars' },
    { id: 'performance' as VehicleCategory, label: 'Performance & Track' },
  ];

  return (
    <section id="collection" className="relative w-full py-28 sm:py-36 bg-[#050608] border-t border-white/[0.06] select-none">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.06]">
          <div>
            <span className="text-[11px] font-tech text-[#f36b21] tracking-[0.3em] uppercase block mb-3">
              THE CURATED FLEET // 2026
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
              AUTOMOTIVE SHOWROOM
            </h2>
            <p className="mt-3 text-sm text-[#848a99] max-w-xl font-light">
              Explore our fleet of aerodynamically honed hypercars, track-focused prototypes, and grand tourers. Each model is engineered for uncompromising emotional presence.
            </p>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-3 text-xs font-tech text-[#848a99]">
            <span className="px-3 py-1.5 rounded-full bg-[#0d1017] border border-white/10">
              FLEET COUNT: <strong className="text-white">{vehicles.length}</strong>
            </span>
          </div>
        </div>

        {/* Filters & Search Toolbar */}
        <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06]">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 text-xs font-tech tracking-wider uppercase rounded-full border transition-all whitespace-nowrap cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#f36b21] text-black font-bold border-[#f36b21] shadow-[0_0_15px_rgba(243,107,33,0.3)]'
                    : 'bg-black/50 text-[#848a99] border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#848a99] start-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search models, engines..."
                className="w-full py-2 bg-[#0c0e14] border border-white/10 rounded-full text-xs text-white placeholder-[#5a6070] focus:border-[#f36b21] focus:outline-none transition-colors ps-8 pe-3"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="py-2 px-3 bg-[#0c0e14] border border-white/10 rounded-full text-xs font-tech text-[#bfc2c7] focus:border-[#f36b21] focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="power">Highest Power</option>
              <option value="accel">Quickest Acceleration</option>
              <option value="price">Starting Investment</option>
            </select>
          </div>
        </div>

        {/* Luxury Editorial Vehicle Cards Grid (Matching Reference 4 - LuxeMotion Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {filteredVehicles.map((car) => {
            const isFav = favorites.includes(car.id);
            const inCompare = compareList.includes(car.id);

            return (
              <div
                key={car.id}
                className="group relative rounded-2xl bg-[#0b0e14] border border-white/[0.08] hover:border-[#f36b21]/50 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 shadow-2xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(243,107,33,0.15)]"
              >
                {/* Vehicle Showcase Image Container */}
                <div className="relative aspect-16/10 bg-[#06070a] overflow-hidden">
                  <img
                    src={car.heroImage}
                    alt={car.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-transparent to-transparent opacity-90"></div>

                  {/* Top Floating Category Tag & Utility Actions */}
                  <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-tech text-[#f36b21] tracking-widest uppercase">
                      {car.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onToggleCompare(car.id)}
                        className={`p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                          inCompare
                            ? 'bg-[#f36b21] text-black border-[#f36b21]'
                            : 'bg-black/60 text-[#bfc2c7] border-white/10 hover:text-white'
                        }`}
                        title={inCompare ? 'Remove from Compare' : 'Add to Compare'}
                      >
                        <Scale className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onToggleFavorite(car.id)}
                        className={`p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                          isFav
                            ? 'bg-red-500/20 text-red-500 border-red-500/50'
                            : 'bg-black/60 text-[#bfc2c7] border-white/10 hover:text-[#f36b21]'
                        }`}
                        title="Save to Favorites"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>

                  {/* Telemetry Trio Overlay */}
                  <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-[11px] font-tech text-[#bfc2c7]">
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#f36b21]" />
                      <span>{car.specs.power}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-[#f36b21]" />
                      <span>{car.specs.acceleration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Wind className="w-3 h-3 text-[#f36b21]" />
                      <span>{car.specs.topSpeed}</span>
                    </div>
                  </div>
                </div>

                {/* Card Editorial Information */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-display font-black text-2xl text-white group-hover:text-[#f36b21] transition-colors tracking-tight">
                        {car.name}
                      </h3>
                      <span className="font-tech text-xs text-[#5a6070]">{car.year}</span>
                    </div>

                    <p className="text-xs text-[#848a99] mt-1 font-tech tracking-wide line-clamp-1">
                      {car.tagline}
                    </p>

                    <p className="text-xs text-[#bfc2c7] mt-3 font-light line-clamp-2 leading-relaxed">
                      {car.description}
                    </p>
                  </div>

                  {/* Price & Action Row */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-tech text-[#5a6070] uppercase block">
                        STARTING ALLOCATION
                      </span>
                      <span className="font-display font-bold text-lg text-white">
                        {car.priceEstimate}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onOpenConfigurator(car.id)}
                        className="px-3 py-2 rounded-full bg-[#141824] hover:bg-[#1d2232] border border-white/10 text-xs font-tech text-[#f36b21] hover:text-[#ff8c37] transition-all cursor-pointer"
                        title="Open in Studio Configurator"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenDetails(car.id)}
                        className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#f36b21] text-white hover:text-black font-semibold text-xs tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Explore</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
