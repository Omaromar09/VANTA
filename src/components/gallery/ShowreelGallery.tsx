import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

export const ShowreelGallery: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const galleryItems = [
    {
      id: 'g-01',
      title: 'VANTA GT-900 Side Profile in Shadow & Light',
      titleAr: 'المظهر الجانبي لفانتا GT-900 بين الظل والضوء',
      category: 'exterior',
      image: '/images/hero-car-final-frame.jpg',
    },
    {
      id: 'g-02',
      title: '3/4 Front Quarter Aerodynamic Stance',
      titleAr: 'وقفة إيروديناميكية هجومية من زاوية 3/4 الأمامية',
      category: 'exterior',
      image: '/images/gt900-front-34.jpg',
    },
    {
      id: 'g-03',
      title: 'Liquid Titanium Spectre X Studio Reflection',
      titleAr: 'انعكاسات الاستوديو على طلاء التيتانيوم السائل لطراز سبيكتر X',
      category: 'studio',
      image: '/images/spectre-front.jpg',
    },
    {
      id: 'g-04',
      title: 'Twin Titanium Exhaust & Carbon Diffuser Tunnel',
      titleAr: 'نفق الديفيوزر الكربوني ومخارج العادم التيتانيوم المزدوجة',
      category: 'exterior',
      image: '/images/gt900-rear.jpg',
    },
    {
      id: 'g-05',
      title: 'Obsidian Vanta Black Track Weapon',
      titleAr: 'وحش الحلبات باللون الأسود الكربوني أوبسيديان',
      category: 'studio',
      image: '/images/nocturne-front.jpg',
    },
    {
      id: 'g-06',
      title: 'Active DRS Aerodynamics & Stance',
      titleAr: 'جناح DRS النشط ووقفة الهايبركار الثابتة',
      category: 'exterior',
      image: '/images/gt900-side.jpg',
    },
  ];

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = galleryItems.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  return (
    <section id="gallery" className="relative w-full py-24 sm:py-32 bg-[#050608] border-t border-white/[0.06] select-none">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-[#f36b21]/30 text-[10px] sm:text-xs font-tech text-[#f36b21] tracking-widest uppercase mb-3">
              <Camera className="w-3.5 h-3.5" />
              <span>{t.gallery.badge}</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
              {t.gallery.title}
            </h2>
            <p className="mt-3 text-sm text-[#848a99] max-w-2xl font-light">
              {t.gallery.subtitle}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {(['all', 'exterior', 'studio'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-tech uppercase tracking-wider rounded-full border whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#181c28] text-white border-[#f36b21] shadow-[0_0_15px_rgba(243,107,33,0.3)]'
                    : 'bg-black/50 text-[#848a99] border-white/10 hover:border-white/25 hover:text-white'
                }`}
              >
                {cat === 'all' && t.gallery.all}
                {cat === 'exterior' && t.gallery.exterior}
                {cat === 'studio' && t.gallery.studio}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-10">
          {filteredItems.map((item, idx) => {
            const itemTitle = isRTL ? item.titleAr : item.title;
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="group relative bg-[#090b10] border border-white/[0.08] hover:border-[#f36b21]/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 shadow-xl"
              >
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src={item.image}
                    alt={itemTitle}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-106"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-tech text-white line-clamp-1">
                        {itemTitle}
                      </span>
                      <div className="p-1.5 rounded-full bg-black/60 text-[#f36b21] border border-[#f36b21]/50 shrink-0 ms-2">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 end-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 cursor-pointer"
            aria-label={t.common.close}
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              isRTL ? nextImage() : prevImage();
            }}
            className="absolute start-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              isRTL ? prevImage() : nextImage();
            }}
            className="absolute end-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            className="max-w-5xl max-h-[85vh] flex flex-col items-center gap-3"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[lightboxIndex].image}
              alt=""
              className="max-w-full max-h-[75vh] object-contain rounded-lg border border-white/10 shadow-2xl"
            />
            <span className="text-xs font-tech text-[#bfc2c7]">
              {isRTL ? filteredItems[lightboxIndex].titleAr : filteredItems[lightboxIndex].title} ({lightboxIndex + 1} / {filteredItems.length})
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
