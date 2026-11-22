import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const reviews = [
    {
      id: 'rev-01',
      author: isRTL ? 'اللورد جوليان ستيرلينغ' : 'Lord Julian Sterling',
      title: isRTL ? 'جامع سيارات وسائق سباقات كلاسيكية' : 'Private Collector & Historic Racer',
      location: isRTL ? 'جنيف / لندن' : 'Geneva / London',
      stars: 5,
      service: isRTL ? 'طلاء سيراميك 10H وتغليف PPF' : '10H Ceramic Coating & PPF Wrap',
      car: 'VANTA GT-900',
      comment: isRTL
        ? 'عمق طلاء الأورانج ميتاليك بعد المعالجة بالأشعة تحت الحمراء للسيراميك 10H يفوق الوصف. حتى تحت أضواء البادوك الساطعة، لا تجد خدشاً مجهرياً واحداً. فريق فانتا يضع معياراً يتجاوز تسليمات المصانع العالمية.'
        : 'The depth of the metallic orange paint after the 10H ceramic bake is unparalleled. Even under harsh paddock light, there isn’t a single micro-swirl. VANTA’s team sets a standard that exceeds factory concours deliveries.',
    },
    {
      id: 'rev-02',
      author: isRTL ? 'منصور الفلاسي' : 'Mansoor Al-Falasi',
      title: isRTL ? 'مشرف أسطول سيارات فائقة' : 'Exotic Fleet Custodian',
      location: isRTL ? 'دبي، الإمارات' : 'Dubai, UAE',
      stars: 5,
      service: isRTL ? 'تعديل وتثبيت كربون أيرو حصري' : 'Bespoke Carbon Aero Fitment',
      car: 'VANTA SPECTRE X',
      comment: isRTL
        ? 'عاينّا تشطيب التيتانيوم السائل عبر استوديو التخصيص 360 قبل طلب الترقية الكاملة لحزمة الحلبات. والسيارة الحقيقية تطابقت مع المحاكاة الرقمية ثلاثية الأبعاد بدقة ملليمترية. رفاهية رقمية غير مسبوقة.'
        : 'We evaluated the titanium silver finish through their 360 configurator before committing to the full track aero upgrade. The real car matches the 3D digital simulation down to the millimeter. Unprecedented digital luxury.',
    },
    {
      id: 'rev-03',
      author: isRTL ? 'هنريك فيسترجارد' : 'Henrik Vestergaard',
      title: isRTL ? 'سائق سباقات تحمل للسيارات الخارقة' : 'Supercar Endurance Driver',
      location: isRTL ? 'كوبنهاغن، الدنمارك' : 'Copenhagen, Denmark',
      stars: 5,
      service: isRTL ? 'تسوية وتصحيح طلاء كونكور' : 'Concours Paint Leveling',
      car: 'VANTA NOCTURNE',
      comment: isRTL
        ? 'ألياف الكربون المكشوفة هي أصعب الأسطح في المعالجة والتلميع. نجحت فانتا في إزالة تموجات قشر البرتقال من ورنيش نوكتورن ومنحتنا صفاءً كالزجاج السائل. تجربة استثنائية بكل المقاييس.'
        : 'Exposed carbon fiber is the most unforgiving material on earth to correct. VANTA removed all orange peel from our Nocturne clearcoat, delivering absolute liquid glass clarity. Simply extraordinary.',
    },
  ];

  return (
    <section className="relative w-full py-24 sm:py-32 bg-[#050608] border-t border-white/[0.06] select-none">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-[#f36b21]/30 text-[10px] sm:text-xs font-tech text-[#f36b21] tracking-widest uppercase mb-3">
              <Quote className="w-3.5 h-3.5" />
              <span>{t.testimonials.badge}</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
              {t.testimonials.title}
            </h2>
            <p className="mt-3 text-sm text-[#848a99] max-w-2xl font-light">
              {t.testimonials.subtitle}
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-black/60 border border-white/10 text-[11px] font-tech text-[#848a99]">
            {t.testimonials.conceptEndorsement}
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#090b10] border border-white/[0.08] hover:border-[#f36b21]/40 rounded-xl p-6 sm:p-8 flex flex-col justify-between gap-6 transition-all duration-300 shadow-xl"
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

              <div className="pt-4 border-t border-white/[0.06]">
                <span className="font-display font-bold text-sm text-white block">
                  {rev.author}
                </span>
                <span className="text-[11px] font-tech text-[#f36b21] block mt-0.5">
                  {rev.title} • {rev.location}
                </span>
                <div className="mt-2 text-[10px] font-tech text-[#848a99]">
                  {t.testimonials.commission} <span dir="ltr" className="text-white font-medium">{rev.car}</span> ({rev.service})
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
