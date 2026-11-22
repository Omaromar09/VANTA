import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, Sparkles, ArrowUp, Heart, Globe } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin, onOpenBooking }) => {
  const { t, language, setLanguage } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-[#030406] border-t border-[#151822] text-[#8b919e] text-xs font-mono-tech select-none">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-[#151822]">
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3" dir="ltr">
              <div className="w-8 h-8 bg-gradient-to-br from-[#1b1e28] to-[#0a0b0e] border border-[#f36b21]/50 rounded-sm flex items-center justify-center">
                <span className="font-display font-extrabold text-[#f36b21] text-base">V</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg tracking-[0.25em] text-white">
                  VANTA
                </span>
                <span className="text-[9px] tracking-[0.3em] text-[#f36b21] uppercase">
                  7P STUDIO AUTOMOTIVE
                </span>
              </div>
            </div>

            <p className="text-xs text-[#8b919e] font-light max-w-sm leading-relaxed mt-2">
              {t.footer.desc}
            </p>

            <div className="flex items-center gap-4 text-[11px] text-[#bfc2c7] mt-2">
              <span>DRIVE BEYOND ORDINARY.</span>
              <span>•</span>
              <span>ENGINEERED TO IMPRESS.</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 flex flex-col gap-2.5">
            <span className="text-white text-xs uppercase tracking-widest font-bold mb-2">
              {t.footer.quickLinks}
            </span>
            <a href="#collection" className="hover:text-[#f36b21] transition-colors">{t.nav.collection}</a>
            <a href="#configurator" className="hover:text-[#f36b21] transition-colors">{t.nav.configurator}</a>
            <a href="#showroom360" className="hover:text-[#f36b21] transition-colors">{t.nav.showroom360}</a>
            <a href="#services" className="hover:text-[#f36b21] transition-colors">{t.nav.services}</a>
            <a href="#before-after" className="hover:text-[#f36b21] transition-colors">{t.nav.beforeAfter}</a>
            <a href="#estimator" className="hover:text-[#f36b21] transition-colors">{t.nav.estimator}</a>
            <a href="#gallery" className="hover:text-[#f36b21] transition-colors">{t.nav.gallery}</a>
            <a href="#contact" className="hover:text-[#f36b21] transition-colors">{t.nav.contact}</a>
          </div>

          {/* Concept Disclaimer & Concierge */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="text-white text-xs uppercase tracking-widest font-bold">
              {t.footer.legal}
            </span>
            <p className="text-[11px] text-[#6b7280] leading-relaxed font-light">
              {t.footer.legalNotice}
            </p>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 rounded-sm bg-[#11141e] hover:bg-[#1a1f2e] border border-[#f36b21]/40 text-[#f36b21] hover:text-white text-xs font-mono-tech uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.nav.bookExperience}</span>
              </button>

              {/* Admin Portal Trigger */}
              <button
                onClick={onOpenAdmin}
                className="w-full py-2 text-center text-[11px] text-[#5a6070] hover:text-[#8b919e] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Shield className="w-3.5 h-3.5 text-[#f36b21]" />
                <span>{t.footer.adminLink}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#5a6070]">
          <span>{t.footer.rights}</span>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="hover:text-[#f36b21] transition-colors flex items-center gap-1"
            >
              <Globe className="w-3.5 h-3.5 text-[#f36b21]" />
              <span>{language === 'en' ? 'Arabic / العربية' : 'English'}</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-[#0a0c12] hover:bg-[#151822] text-[#bfc2c7] hover:text-white transition-colors"
              title="Return to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
