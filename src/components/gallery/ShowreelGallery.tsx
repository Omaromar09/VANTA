import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

export const ShowreelGallery: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const galleryItems = [
    {
      id: 'g-01',
      title: 'VANTA GT-900 Side Profile in Shadow & Light',
      category: 'exterior',
      image: '/images/hero-car-final-frame.jpg',
      aspect: 'aspect-16/9',
    },
    {
      id: 'g-02',
      title: '3/4 Front Quarter Aerodynamic Stance',
      category: 'exterior',
      image: '/images/gt900-front-34.jpg',
      aspect: 'aspect-4/3',
    },
    {
      id: 'g-03',
      title: 'Liquid Titanium Spectre X Studio Reflection',
      category: 'studio',
      image: '/images/spectre-front.jpg',
      aspect: 'aspect-4/3',
    },
    {
      id: 'g-04',
      title: 'Twin Titanium Exhaust & Carbon Diffuser Tunnel',
      category: 'exterior',
      image: '/images/gt900-rear.jpg',
      aspect: 'aspect-16/9',
    },
    {
      id: 'g-05',
      title: 'Obsidian Vanta Black Track Weapon',
      category: 'studio',
      image: '/images/nocturne-front.jpg',
      aspect: 'aspect-16/9',
    },
    {
      id: 'g-06',
      title: 'Active DRS Aerodynamics & Stance',
      category: 'exterior',
      image: '/images/gt900-side.jpg',
      aspect: 'aspect-4/3',
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

  const nextImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="relative w-full py-24 sm:py-32 bg-[#050608] border-t border-[#151822]">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1b1e28]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#111318] border border-[#f36b21]/30 text-[10px] sm:text-xs font-mono-tech text-[#f36b21] tracking-widest uppercase mb-3">
              <Camera className="w-3.5 h-3.5" />
              {t.gallery.badge}
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              {t.gallery.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#8b919e] max-w-2xl font-light">
              {t.gallery.subtitle}
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {['all', 'exterior', 'studio'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-mono-tech uppercase tracking-wider rounded-sm border whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#1b1e28] text-white border-[#f36b21]'
                    : 'bg-[#0a0c10] text-[#8b919e] border-[#1b1e28] hover:text-[#bfc2c7]'
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
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              className="group relative bg-[#090b10] border border-[#1b1e28] rounded-sm overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-mono-tech text-white">
                      {item.title}
                    </span>
                    <div className="p-1.5 rounded-full bg-black/60 text-[#f36b21] border border-[#f36b21]/50">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 animate-in fade-in duration-200">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="max-w-5xl max-h-[85vh] flex flex-col items-center gap-3">
            <img
              src={filteredItems[lightboxIndex].image}
              alt=""
              className="max-w-full max-h-[75vh] object-contain rounded border border-[#1b1e28] shadow-2xl"
            />
            <span className="text-xs font-mono-tech text-[#bfc2c7]">
              {filteredItems[lightboxIndex].title} ({lightboxIndex + 1} / {filteredItems.length})
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
