import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Menu, X, Globe, Heart, Shield, Sparkles, ChevronRight, Scale
} from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
  onOpenFavorites: () => void;
  onOpenCompare: () => void;
  favoritesCount: number;
  compareCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
  onOpenAdmin,
  onOpenFavorites,
  onOpenCompare,
  favoritesCount,
  compareCount,
}) => {
  const { t, language, setLanguage, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.collection, href: '#collection' },
    { label: t.nav.configurator, href: '#configurator', highlight: true },
    { label: t.nav.showroom360, href: '#showroom360' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.beforeAfter, href: '#before-after' },
    { label: t.nav.estimator, href: '#estimator' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 select-none intro-anim-header ${
          isScrolled
            ? 'bg-[#050608]/92 backdrop-blur-xl border-b border-white/[0.06] py-3.5 shadow-2xl shadow-black/90'
            : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-4 sm:py-6'
        }`}
      >
        <div className="w-full max-w-full min-w-0 px-4 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Wordmark (Matching Reference 2 & Reference 4 - Strictly unmirrored in RTL) */}
            <a href="#" dir="ltr" className="flex items-center gap-2.5 sm:gap-3.5 group focus:outline-none cursor-pointer shrink-0">
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-sm bg-gradient-to-br from-[#1b1f2b] to-black border border-[#f36b21]/50 flex items-center justify-center overflow-hidden group-hover:border-[#f36b21] transition-all shrink-0">
                <span className="font-display font-black text-[#f36b21] text-sm sm:text-base tracking-wider">V</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-lg sm:text-xl tracking-[0.2em] sm:tracking-[0.25em] text-white group-hover:text-[#f36b21] transition-colors leading-none">
                  VANTA
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.3em] sm:tracking-[0.35em] text-[#848a99] font-tech uppercase mt-0.5 sm:mt-1">
                  7P STUDIO
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-tech tracking-wider uppercase transition-colors relative py-1 group focus:outline-none ${
                    link.highlight
                      ? 'text-[#f36b21] hover:text-[#ff8c37] font-semibold'
                      : 'text-[#848a99] hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 start-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                      link.highlight ? 'bg-[#f36b21]' : 'bg-white/60'
                    }`}
                  ></span>
                </a>
              ))}
            </nav>

            {/* Utility Actions */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Compare Button */}
              {compareCount > 0 && (
                <button
                  onClick={onOpenCompare}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-[#f36b21]/50 text-xs text-[#f36b21] hover:bg-[#f36b21]/10 transition-colors cursor-pointer"
                  title="Compare Fleet"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span className="font-tech">{compareCount}</span>
                </button>
              )}

              {/* Favorites Button */}
              <button
                onClick={onOpenFavorites}
                className="relative p-2 rounded-full bg-black/60 border border-white/10 text-[#bfc2c7] hover:text-[#f36b21] hover:border-[#f36b21]/40 transition-colors focus:outline-none cursor-pointer"
                title={t.nav.savedVehicles}
              >
                <Heart className="w-4 h-4" />
                {favoritesCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#f36b21] text-black font-bold text-[9px] rounded-full flex items-center justify-center font-tech">
                    {favoritesCount}
                  </span>
                )}
              </button>

              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-xs font-tech text-[#bfc2c7] hover:text-white hover:border-white/20 transition-colors focus:outline-none cursor-pointer"
                title="Switch Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#f36b21]" />
                <span>{language === 'en' ? 'العربية' : 'EN'}</span>
              </button>

              {/* VIP Reservation CTA */}
              <button
                onClick={onOpenBooking}
                className="relative group px-5 py-2.5 rounded-full bg-gradient-to-r from-[#f36b21] to-[#ff8c37] text-black font-bold text-xs font-tech tracking-wider uppercase transition-all duration-300 hover:shadow-[0_0_25px_rgba(243,107,33,0.45)] focus:outline-none active:scale-[0.98] cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t.nav.bookExperience}
                </span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="p-2 text-xs font-tech text-[#f36b21]"
              >
                {language === 'en' ? 'عربي' : 'EN'}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full bg-black/60 text-white border border-white/10 focus:outline-none"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050608]/98 backdrop-blur-2xl pt-24 px-6 pb-8 flex flex-col justify-between sm:hidden animate-in fade-in duration-200">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-lg font-display tracking-wider py-2.5 border-b border-white/[0.06] flex items-center justify-between ${
                  link.highlight ? 'text-[#f36b21]' : 'text-white'
                }`}
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#848a99]" />
              </a>
            ))}
          </nav>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/[0.06]">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenFavorites();
                }}
                className="flex-1 py-2.5 rounded-full bg-black/60 border border-white/10 text-xs text-[#bfc2c7] flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 text-[#f36b21]" />
                Saved ({favoritesCount})
              </button>
              {compareCount > 0 && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCompare();
                  }}
                  className="flex-1 py-2.5 rounded-full bg-black/60 border border-[#f36b21]/40 text-xs text-[#f36b21] flex items-center justify-center gap-2"
                >
                  <Scale className="w-4 h-4" />
                  Compare ({compareCount})
                </button>
              )}
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#f36b21] to-[#ff8c37] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(243,107,33,0.3)]"
            >
              {t.nav.bookExperience}
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2 text-center text-xs text-[#5a6070] hover:text-[#848a99] flex items-center justify-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-[#f36b21]" />
              Concierge Console
            </button>
          </div>
        </div>
      )}
    </>
  );
};
