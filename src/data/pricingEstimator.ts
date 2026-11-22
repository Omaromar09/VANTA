export interface VehicleClassPricing {
  id: string;
  nameEn: string;
  nameAr: string;
  multiplier: number;
  descriptionEn: string;
  descriptionAr: string;
}

export interface ServiceOptionPricing {
  id: string;
  nameEn: string;
  nameAr: string;
  basePrice: number;
  durationHours: number;
  included: boolean;
}

export interface AddOnOptionPricing {
  id: string;
  nameEn: string;
  nameAr: string;
  price: number;
  durationHours: number;
}

export const vehicleClasses: VehicleClassPricing[] = [
  {
    id: 'hypercar',
    nameEn: 'Hypercar / Bespoke Carbon Prototype',
    nameAr: 'سيارة خارقة هايبركار / نموذج كربون مخصص',
    multiplier: 1.35,
    descriptionEn: 'Carbon tub, active aerodynamics, specialized jacking procedures',
    descriptionAr: 'هيكل كربون أحادي، إيروديناميك نشط، إجراءات رفع خاصة',
  },
  {
    id: 'supercar',
    nameEn: 'Mid-Engine Supercar / Exotic GT',
    nameAr: 'سوبركار بمحرك وسطي / سيارة رياضية خارقة',
    multiplier: 1.2,
    descriptionEn: 'Wide rear haunches, complex intake grilles, carbon splitters',
    descriptionAr: 'أكتاف خلفية عريضة، فتحات تهوية معقدة، شفة كربون أمامية',
  },
  {
    id: 'luxury-sedan',
    nameEn: 'Luxury Grand Tourer / Flagship Sedan',
    nameAr: 'سيارة فاخرة جراند تورر / صالون فارهة',
    multiplier: 1.0,
    descriptionEn: 'Extended surface area, premium metallic clearcoats',
    descriptionAr: 'مساحة سطح ممتدة، طبقات طلاء ميتاليك نقية',
  },
  {
    id: 'sports-suv',
    nameEn: 'Performance Luxury SUV',
    nameAr: 'دفع رباعي رياضي فاخر SUV',
    multiplier: 1.25,
    descriptionEn: 'Large glasshouse, high-stance roof, wheel arch cladding',
    descriptionAr: 'أسطح زجاجية كبيرة، سقف مرتفع، حواف رفارف عريضة',
  },
];

export const pricingServices: ServiceOptionPricing[] = [
  {
    id: 'ceramic',
    nameEn: '10H Nanotechnology Ceramic Shield (5-Year)',
    nameAr: 'حماية النانو سيراميك 10H (ضمان 5 سنوات)',
    basePrice: 1850,
    durationHours: 24,
    included: true,
  },
  {
    id: 'ppf',
    nameEn: 'Self-Healing Paint Protection Film (Full Body)',
    nameAr: 'فيلم حماية الطلاء PPF المعالج ذاتياً (كامل السيارة)',
    basePrice: 3400,
    durationHours: 36,
    included: false,
  },
  {
    id: 'detailing',
    nameEn: 'Concours Multi-Stage Paint Correction',
    nameAr: 'تصحيح الطلاء وإزالة الخدوش المتعدد المراحل',
    basePrice: 950,
    durationHours: 12,
    included: true,
  },
  {
    id: 'interior',
    nameEn: 'Artisan Cabin Leather & Alcantara Rejuvenation',
    nameAr: 'تجديد وعناية الجلود والكانتارا للمقصورة',
    basePrice: 750,
    durationHours: 8,
    included: false,
  },
  {
    id: 'carbon-aero',
    nameEn: 'Autoclave Carbon Aero Component Installation',
    nameAr: 'تركيب قطع الإيروديناميك من ألياف الكربون',
    basePrice: 2200,
    durationHours: 16,
    included: false,
  },
];

export const pricingAddOns: AddOnOptionPricing[] = [
  {
    id: 'wheels-ceramic',
    nameEn: 'Wheel Faces & Barrel Ceramic Barrier',
    nameAr: 'سيراميك الجنوط والبراميل الداخلية ضد غبار الفرامل',
    price: 380,
    durationHours: 3,
  },
  {
    id: 'glass-shield',
    nameEn: 'Optical Windshield & Panoramic Glass Hydrophobic Shield',
    nameAr: 'طبقة طرد المياه الفائقة للزجاج الأمامي والبانورامي',
    price: 240,
    durationHours: 2,
  },
  {
    id: 'engine-bay',
    nameEn: 'Engine Bay Steam Decontamination & Satin Dressing',
    nameAr: 'تنظيف وتطهير حجرة المحرك بالبخار وحماية اللمسات',
    price: 320,
    durationHours: 3,
  },
  {
    id: 'caliper-ceramic',
    nameEn: 'High-Heat Ceramic Coating for Brake Calipers',
    nameAr: 'سيراميك عالي المقاومة للحرارة لملاقط المكابح',
    price: 220,
    durationHours: 2,
  },
  {
    id: 'leather-ceramic',
    nameEn: 'Denim Dye Resistant Leather Ceramic Shielding',
    nameAr: 'درع السيراميك الواقي للجلود من تصبغ الجينز والأوساخ',
    price: 450,
    durationHours: 4,
  },
];
