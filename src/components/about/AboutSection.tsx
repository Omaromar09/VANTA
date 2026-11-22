import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Compass, Cpu, Shield, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const values = [
    {
      icon: <Cpu className="w-5 h-5 text-[#f36b21]" />,
      title: t.about.val1Title,
      desc: t.about.val1Desc,
    },
    {
      icon: <Shield className="w-5 h-5 text-[#f36b21]" />,
      title: t.about.val2Title,
      desc: t.about.val2Desc,
    },
    {
      icon: <Award className="w-5 h-5 text-[#f36b21]" />,
      title: t.about.val3Title,
      desc: t.about.val3Desc,
    },
  ];

  return (
    <section id="about" className="relative w-full py-24 sm:py-32 bg-[#06070a] border-t border-white/[0.06] select-none">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Text Column */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-[#f36b21]/30 text-[10px] sm:text-xs font-tech text-[#f36b21] tracking-widest uppercase self-start">
              <Compass className="w-3.5 h-3.5" />
              <span>{t.about.badge}</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-[1.05]">
              {t.about.title}
            </h2>

            <p className="text-base text-[#bfc2c7] font-light leading-relaxed">
              {t.about.p1}
            </p>

            <p className="text-sm text-[#848a99] font-light leading-relaxed">
              {t.about.p2}
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/[0.06]">
              {values.map((v, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[#0a0c12] border border-white/[0.08] hover:border-[#f36b21]/30 transition-colors">
                  {v.icon}
                  <h4 className="font-display font-bold text-sm text-white mt-2.5">
                    {v.title}
                  </h4>
                  <p className="text-xs text-[#848a99] mt-1.5 font-light leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0e15] shadow-2xl">
              <img
                src="/images/spectre-front.jpg"
                alt="VANTA Design Philosophy"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

              <div className="absolute bottom-6 inset-x-6 p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl">
                <span className="text-[10px] font-tech text-[#f36b21] uppercase tracking-wider block">
                  {t.about.visionTag}
                </span>
                <span className="font-display font-bold text-sm text-white mt-1 block">
                  {t.about.quote}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
