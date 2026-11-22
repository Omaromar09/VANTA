import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { services } from '../../data/services';
import { AutomotiveService } from '../../types';
import { Clock, ChevronRight, CheckCircle2 } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (service: AutomotiveService) => void;
  onBookService: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onBookService,
}) => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="services" className="relative w-full py-28 sm:py-36 bg-[#050608] border-t border-white/[0.06] select-none">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.06]">
          <div>
            <span className="text-[11px] font-tech text-[#f36b21] tracking-[0.3em] uppercase block mb-3">
              {t.services.badge}
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
              {t.services.title}
            </h2>
            <p className="mt-3 text-sm text-[#848a99] max-w-xl font-light">
              {t.services.subtitle}
            </p>
          </div>

          <div className="text-xs font-tech text-[#848a99]">
            <span>{t.services.facilityNotice}</span>
          </div>
        </div>

        {/* 5 Luxury Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
          {services.map((srv, idx) => {
            const title = isRTL && srv.titleAr ? srv.titleAr : srv.title;
            const shortDesc = isRTL && srv.shortDescAr ? srv.shortDescAr : srv.shortDesc;
            const duration = isRTL && srv.durationAr ? srv.durationAr : srv.duration;
            const badge = isRTL && srv.badgeAr ? srv.badgeAr : (srv.badge || `0${idx + 1}`);
            const benefits = isRTL && srv.benefitsAr ? srv.benefitsAr : srv.benefits;

            return (
              <div
                key={srv.id}
                className={`group relative rounded-2xl bg-[#0b0e14] border border-white/[0.08] hover:border-[#f36b21]/50 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 shadow-2xl hover:shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_30px_rgba(243,107,33,0.15)] ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Image Presentation */}
                <div className="relative aspect-16/10 bg-[#06070a] overflow-hidden">
                  <img
                    src={srv.image}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0e14] via-transparent to-transparent opacity-90"></div>

                  <div className="absolute top-4 start-4">
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-tech text-[#f36b21] tracking-widest uppercase">
                      {badge}
                    </span>
                  </div>

                  <div className="absolute bottom-3 inset-x-4 flex items-center justify-between text-xs font-tech text-white">
                    <div className="flex items-center gap-1.5 bg-black/70 px-3 py-1 rounded-full backdrop-blur-md">
                      <Clock className="w-3.5 h-3.5 text-[#f36b21]" />
                      <span>{duration}</span>
                    </div>
                    <span dir="ltr" className="bg-[#f36b21] text-black font-bold px-3 py-1 rounded-full text-xs telemetry-val">
                      ${srv.priceStartingAt.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Text Content */}
                <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                  <div>
                    <h3 className="font-display font-black text-xl sm:text-2xl text-white group-hover:text-[#f36b21] transition-colors tracking-tight">
                      {title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#848a99] font-light leading-relaxed line-clamp-3">
                      {shortDesc}
                    </p>

                    <ul className="mt-4 flex flex-col gap-2">
                      {benefits.slice(0, 3).map((b, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2 text-xs text-[#848a99]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#f36b21] flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Actions */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                    <button
                      onClick={() => onSelectService(srv)}
                      className="text-xs font-tech text-[#bfc2c7] hover:text-[#f36b21] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{t.services.processMethodology}</span>
                      <ChevronRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                    </button>

                    <button
                      onClick={() => onBookService(srv.id)}
                      className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#f36b21] hover:text-black text-xs font-tech text-white uppercase tracking-wider transition-all cursor-pointer font-semibold"
                    >
                      {t.services.reserveSlot}
                    </button>
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
