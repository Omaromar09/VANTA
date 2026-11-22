import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  vehicleClasses, pricingServices, pricingAddOns 
} from '../../data/pricingEstimator';
import { Calculator, Check, Clock, ArrowRight } from 'lucide-react';

interface PriceEstimatorSectionProps {
  onLockInPackage: (packageDetails: {
    vehicleClass: string;
    services: string[];
    addOns: string[];
    totalPrice: number;
    totalHours: number;
  }) => void;
}

export const PriceEstimatorSection: React.FC<PriceEstimatorSectionProps> = ({ onLockInPackage }) => {
  const { t, isRTL } = useLanguage();

  const [selectedClassId, setSelectedClassId] = useState(vehicleClasses[0].id);
  const selectedClass = vehicleClasses.find((vc) => vc.id === selectedClassId) || vehicleClasses[0];

  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(['ceramic', 'detailing']);
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(['wheels-ceramic']);

  // Toggle Services
  const toggleService = (id: string) => {
    setSelectedServiceIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  // Toggle Add-Ons
  const toggleAddOn = (id: string) => {
    setSelectedAddOnIds((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  // Calculation
  const servicesBaseSum = pricingServices
    .filter((s) => selectedServiceIds.includes(s.id))
    .reduce((acc, curr) => acc + curr.basePrice, 0);

  const addOnsSum = pricingAddOns
    .filter((a) => selectedAddOnIds.includes(a.id))
    .reduce((acc, curr) => acc + curr.price, 0);

  const totalRawPrice = Math.round((servicesBaseSum * selectedClass.multiplier) + addOnsSum);

  const totalHours =
    pricingServices
      .filter((s) => selectedServiceIds.includes(s.id))
      .reduce((acc, curr) => acc + curr.durationHours, 0) +
    pricingAddOns
      .filter((a) => selectedAddOnIds.includes(a.id))
      .reduce((acc, curr) => acc + curr.durationHours, 0);

  const handleProceed = () => {
    const serviceNames = pricingServices
      .filter((s) => selectedServiceIds.includes(s.id))
      .map((s) => (isRTL ? s.nameAr : s.nameEn));

    const addOnNames = pricingAddOns
      .filter((a) => selectedAddOnIds.includes(a.id))
      .map((a) => (isRTL ? a.nameAr : a.nameEn));

    onLockInPackage({
      vehicleClass: isRTL ? selectedClass.nameAr : selectedClass.nameEn,
      services: serviceNames,
      addOns: addOnNames,
      totalPrice: totalRawPrice,
      totalHours,
    });
  };

  return (
    <section id="estimator" className="relative w-full py-24 sm:py-32 bg-[#06070a] border-t border-white/[0.06] select-none">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.06]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-[#f36b21]/30 text-[10px] sm:text-xs font-tech text-[#f36b21] tracking-widest uppercase mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>{t.estimator.badge}</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
              {t.estimator.title}
            </h2>
            <p className="mt-3 text-sm text-[#848a99] max-w-2xl font-light">
              {t.estimator.subtitle}
            </p>
          </div>

          <span className="text-xs font-tech text-[#848a99]">
            {t.estimator.engineLabel}
          </span>
        </div>

        {/* 2-Column Estimator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 items-start">
          {/* Left Column: Selections */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* 1. Vehicle Class */}
            <div>
              <span className="text-xs font-tech text-[#f36b21] uppercase tracking-wider block mb-3">
                01 // {t.estimator.vehicleClass}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicleClasses.map((vc) => (
                  <button
                    key={vc.id}
                    onClick={() => setSelectedClassId(vc.id)}
                    className={`p-4 rounded-xl border text-start transition-all cursor-pointer ${
                      selectedClassId === vc.id
                        ? 'bg-[#151822] border-[#f36b21] text-white shadow-[0_0_15px_rgba(243,107,33,0.3)]'
                        : 'bg-[#090b10] border-white/10 text-[#848a99] hover:border-white/25 hover:text-[#bfc2c7]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-sm text-white">
                        {isRTL ? vc.nameAr : vc.nameEn}
                      </span>
                      {selectedClassId === vc.id && <Check className="w-4 h-4 text-[#f36b21]" />}
                    </div>
                    <p className="text-xs text-[#848a99] font-light">
                      {isRTL ? vc.descriptionAr : vc.descriptionEn}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Select Services */}
            <div>
              <span className="text-xs font-tech text-[#f36b21] uppercase tracking-wider block mb-3">
                02 // {t.estimator.selectServices}
              </span>
              <div className="flex flex-col gap-2.5">
                {pricingServices.map((srv) => {
                  const isChecked = selectedServiceIds.includes(srv.id);
                  const effectivePrice = Math.round(srv.basePrice * selectedClass.multiplier);

                  return (
                    <div
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                        isChecked
                          ? 'bg-[#121620] border-[#f36b21]/60 text-white'
                          : 'bg-[#090b10] border-white/10 text-[#848a99] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-sm border flex items-center justify-center ${
                            isChecked ? 'bg-[#f36b21] border-[#f36b21]' : 'border-white/20'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 text-black font-bold" />}
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-medium block">
                            {isRTL ? srv.nameAr : srv.nameEn}
                          </span>
                          <span className="text-[11px] font-tech text-[#848a99]">
                            {isRTL ? `الوقت المقدر: ${srv.durationHours} ساعات` : `Est. ${srv.durationHours} hours`}
                          </span>
                        </div>
                      </div>

                      <span dir="ltr" className="font-display font-bold text-sm text-[#f36b21] telemetry-val">
                        ${effectivePrice.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Add-Ons */}
            <div>
              <span className="text-xs font-tech text-[#f36b21] uppercase tracking-wider block mb-3">
                03 // {t.estimator.addons}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pricingAddOns.map((addon) => {
                  const isChecked = selectedAddOnIds.includes(addon.id);

                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                        isChecked
                          ? 'bg-[#121620] border-[#f36b21]/60 text-white'
                          : 'bg-[#090b10] border-white/10 text-[#848a99] hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center ${
                            isChecked ? 'bg-[#f36b21] border-[#f36b21]' : 'border-white/20'
                          }`}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5 text-black font-bold" />}
                        </div>
                        <span className="text-xs font-light">
                          {isRTL ? addon.nameAr : addon.nameEn}
                        </span>
                      </div>
                      <span dir="ltr" className="font-tech text-xs text-white telemetry-val">
                        +${addon.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Sticky Summary Box */}
          <div className="lg:col-span-4 sticky top-28 bg-[#090b10] border border-white/10 rounded-2xl p-6 flex flex-col gap-6 shadow-2xl">
            <div className="border-b border-white/[0.06] pb-4">
              <span className="text-[10px] font-tech text-[#f36b21] uppercase tracking-widest block">
                {isRTL ? 'ملخص باقة التجهيز المخصصة' : 'PACKAGE BUILDER MANIFEST'}
              </span>
              <h3 className="font-display font-bold text-xl text-white mt-1">
                {isRTL ? selectedClass.nameAr : selectedClass.nameEn}
              </h3>
            </div>

            {/* Selected Breakdown */}
            <div className="flex flex-col gap-3 text-xs font-tech">
              <div className="flex justify-between text-[#8b919e]">
                <span>{isRTL ? 'الخدمات المختارة' : 'Active Services'}</span>
                <span className="text-white">{selectedServiceIds.length} {isRTL ? 'محدد' : 'Selected'}</span>
              </div>
              <div className="flex justify-between text-[#8b919e]">
                <span>{isRTL ? 'الترقيات الإضافية' : 'Add-On Items'}</span>
                <span className="text-white">{selectedAddOnIds.length} {isRTL ? 'محدد' : 'Selected'}</span>
              </div>
              <div className="flex justify-between text-[#8b919e] pt-2 border-t border-white/[0.06]">
                <span>{isRTL ? 'مدة العمل داخل الاستوديو' : 'Est. Facility Time'}</span>
                <span className="text-[#f36b21] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span dir="ltr" className="telemetry-val">{totalHours}h (~{Math.ceil(totalHours / 8)} {isRTL ? 'أيام' : 'Days'})</span>
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-white/[0.06]">
              <span className="text-[10px] font-tech text-[#8b919e] uppercase block">
                {t.estimator.totalEstimate}
              </span>
              <span dir="ltr" className="font-display font-black text-3xl sm:text-4xl text-white mt-1 block telemetry-val">
                ${totalRawPrice.toLocaleString()}
              </span>
              <p className="text-[11px] text-[#8b919e] mt-2 font-light leading-relaxed">
                {t.estimator.notice}
              </p>
            </div>

            {/* Lock In Button */}
            <button
              onClick={handleProceed}
              disabled={selectedServiceIds.length === 0}
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#f36b21] to-[#ff8c37] disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(243,107,33,0.4)] flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
            >
              <span>{t.estimator.lockIn}</span>
              <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
