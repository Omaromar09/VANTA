import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Star, ShieldCheck, Quote, Sparkles } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const reviews = [
    {
      id: 'rev-01',
      author: 'Lord Julian Sterling',
      title: 'Private Collector & Historic Racer',
      location: 'Geneva / London',
      stars: 5,
      service: '10H Ceramic Coating & PPF Wrap',
      car: 'VANTA GT-900',
      comment:
        'The depth of the metallic orange paint after the 10H ceramic bake is unparalleled. Even under harsh paddock light, there isn’t a single micro-swirl. VANTA’s team sets a standard that exceeds factory concours deliveries.',
    },
    {
      id: 'rev-02',
      author: 'Mansoor Al-Falasi',
      title: 'Exotic Fleet Custodian',
      location: 'Dubai, UAE',
      stars: 5,
      service: 'Bespoke Carbon Aero Fitment',
      car: 'VANTA SPECTRE X',
      comment:
        'We evaluated the titanium silver finish through their 360 configurator before committing to the full track aero upgrade. The real car matches the 3D digital simulation down to the millimeter. Unprecedented digital luxury.',
    },
    {
      id: 'rev-03',
      author: 'Henrik Vestergaard',
      title: 'Supercar Endurance Driver',
      location: 'Copenhagen, Denmark',
      stars: 5,
      service: 'Concours Paint Leveling',
      car: 'VANTA NOCTURNE',
      comment:
        'Exposed carbon fiber is the most unforgiving material on earth to correct. VANTA removed all orange peel from our Nocturne clearcoat, delivering absolute liquid glass clarity. Simply extraordinary.',
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#050608] border-t border-[#151822]">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1b1e28]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#111318] border border-[#f36b21]/30 text-[10px] sm:text-xs font-mono-tech text-[#f36b21] tracking-widest uppercase mb-3">
              <Quote className="w-3.5 h-3.5" />
              <span>COLLECTOR DISPATCHES</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              COMMISSION TESTIMONIALS
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#8b919e] max-w-2xl font-light">
              Reflections from private collectors, hypercar custodians, and automotive enthusiasts.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded bg-[#11141f] border border-[#1b1e28] text-[11px] font-mono-tech text-[#8b919e]">
            CONCEPT DEMO ENDORSEMENTS
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#090b10] border border-[#1b1e28] hover:border-[#f36b21]/40 rounded-sm p-6 sm:p-8 flex flex-col justify-between gap-6 transition-all duration-300"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#f36b21] text-[#f36b21]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#bfc2c7] font-light leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#1b1e28]">
                <span className="font-display font-bold text-sm text-white block">
                  {rev.author}
                </span>
                <span className="text-[11px] font-mono-tech text-[#f36b21] block">
                  {rev.title} • {rev.location}
                </span>
                <div className="mt-2 text-[10px] font-mono-tech text-[#8b919e]">
                  COMMISSION: {rev.car} ({rev.service})
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
