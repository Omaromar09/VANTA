import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Shield, Cpu, Award, Compass, Eye } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const values = [
    {
      icon: <Cpu className="w-5 h-5 text-[#f36b21]" />,
      title: 'Aerodynamic Obsession',
      desc: 'Form dictated strictly by airflow. Every curve, duct, and venturi tunnel serves to stabilize the machine at terminal velocities.',
    },
    {
      icon: <Shield className="w-5 h-5 text-[#f36b21]" />,
      title: 'Molecular Surface Defense',
      desc: 'Partnering aerospace ceramic technology with self-healing films so that perfection remains impervious to the elements.',
    },
    {
      icon: <Award className="w-5 h-5 text-[#f36b21]" />,
      title: '7P STUDIO Artistry',
      desc: 'Engineered as an avant-garde digital showcase demonstrating high-fidelity 360° studio interaction, cinematic motion design, and bespoke software craft.',
    },
  ];

  return (
    <section id="about" className="relative w-full py-24 sm:py-32 bg-[#06070a] border-t border-[#151822]">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#111318] border border-[#f36b21]/30 text-[10px] sm:text-xs font-mono-tech text-[#f36b21] tracking-widest uppercase self-start">
              <Compass className="w-3.5 h-3.5" />
              <span>THE MANIFESTO // 7P STUDIO</span>
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
              WHERE AERODYNAMIC RACING BLOOD MEETS ARTISAN PERFECTION.
            </h2>

            <p className="text-base text-[#bfc2c7] font-light leading-relaxed">
              VANTA is born from an uncompromising creative vision by <strong>7P STUDIO</strong>. We conceived VANTA to shatter the standard boundaries of digital automotive presentation, uniting genuine 360° rotational studio mechanics with high-definition cinematic studio recordings.
            </p>

            <p className="text-sm text-[#8b919e] font-light leading-relaxed">
              From our flagship GT-900 hybrid hypercar to our five bespoke ceramic and protection divisions, every element embodies the dark, metallic spirit of VANTA: precision engineering, absolute presence, and timeless restraint.
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1b1e28]">
              {values.map((v, idx) => (
                <div key={idx} className="p-4 rounded-sm bg-[#0a0c12] border border-[#1b1e28]">
                  {v.icon}
                  <h4 className="font-display font-bold text-sm text-white mt-2.5">
                    {v.title}
                  </h4>
                  <p className="text-xs text-[#8b919e] mt-1.5 font-light leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-sm overflow-hidden border border-[#1b1e28] bg-[#0c0e15] shadow-2xl">
              <img
                src="/images/spectre-front.jpg"
                alt="VANTA Design Philosophy"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

              <div className="absolute bottom-6 inset-x-6 p-4 bg-black/80 backdrop-blur-md border border-[#1b1e28] rounded-sm">
                <span className="text-[10px] font-mono-tech text-[#f36b21] uppercase tracking-wider block">
                  CREATIVE VISION BY 7P STUDIO
                </span>
                <span className="font-display font-bold text-sm text-white mt-1 block">
                  "Speed is mathematics. Presence is pure emotion."
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
