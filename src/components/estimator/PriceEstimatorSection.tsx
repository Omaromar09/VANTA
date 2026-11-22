import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  vehicleClasses, pricingServices, pricingAddOns 
} from '../../data/pricingEstimator';
import { Sparkles, Calculator, Check, Clock, ShieldCheck, ArrowRight, Layers } from 'lucide-react';

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
    <section id="estimator" className="relative w-full py-24 sm:py-32 bg-[#06070a] border-t border-[#151822]">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#1b1e28]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#111318] border border-[#f36b21]/30 text-[10px] sm:text-xs font-mono-tech text-[#f36b21] tracking-widest uppercase mb-3">
              <Calculator className="w-3.5 h-3.5" />
              {t.estimator.badge}
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              {t.estimator.title}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#8b919e] max-w-2xl font-light">
              {t.estimator.subtitle}
            </p>
          </div>

          <span className="text-xs font-mono-tech text-[#8b919e]">
            CENTRALIZED TRANSPARENT ESTIMATION ENGINE
          </span>
        </div>

        {/* 2-Column Estimator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10 items-start">
          {/* Left Column: Selections */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* 1. Vehicle Class */}
            <div>
              <span className="text-xs font-mono-tech text-[#f36b21] uppercase tracking-wider block mb-3">
                STEP 01 // {t.estimator.vehicleClass}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicleClasses.map((vc) => (
                  <button
                    key={vc.id}
                    onClick={() => setSelectedClassId(vc.id)}
                    className={`p-4 rounded-sm border text-start transition-all ${
                      selectedClassId === vc.id
                        ? 'bg-[#151822] border-[#f36b21] text-white shadow-lg'
                        : 'bg-[#090b10] border-[#1b1e28] text-[#8b919e] hover:border-[#2a2f3f] hover:text-[#bfc2c7]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-display font-bold text-sm text-white">
                        {isRTL ? vc.nameAr : vc.nameEn}
                      </span>
                      {selectedClassId === vc.id && <Check className="w-4 h-4 text-[#f36b21]" />}
                    </div>
                    <p className="text-xs text-[#8b919e] font-light">
                      {isRTL ? vc.descriptionAr : vc.descriptionEn}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Select Services */}
            <div>
              <span className="text-xs font-mono-tech text-[#f36b21] uppercase tracking-wider block mb-3">
                STEP 02 // {t.estimator.selectServices}
              </span>
              <div className="flex flex-col gap-2.5">
                {pricingServices.map((srv) => {
                  const isChecked = selectedServiceIds.includes(srv.id);
                  const effectivePrice = Math.round(srv.basePrice * selectedClass.multiplier);

                  return (
                    <div
                      key={srv.id}
                      onClick={() => toggleService(srv.id)}
                      className={`p-3.5 rounded-sm border cursor-pointer flex items-center justify-between transition-colors ${
                        isChecked
                          ? 'bg-[#121620] border-[#f36b21]/60 text-white'
                          : 'bg-[#090b10] border-[#1b1e28] text-[#8b919e] hover:border-[#2a2f3f]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded-xs border flex items-center justify-center ${
                            isChecked ? 'bg-[#f36b21] border-[#f36b21]' : 'border-[#2a2f3f]'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 text-black font-bold" />}
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-medium block">
                            {isRTL ? srv.nameAr : srv.nameEn}
                          </span>
                          <span className="text-[11px] font-mono-tech text-[#8b919e]">
                            Est. {srv.durationHours} hours
                          </span>
                        </div>
                      </div>

                      <span className="font-display font-bold text-sm text-[#f36b21]">
                        ${effectivePrice.toLocaleString()}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3. Add-Ons */}
            <div>
              <span className="text-xs font-mono-tech text-[#f36b21] uppercase tracking-wider block mb-3">
                STEP 03 // {t.estimator.addons}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {pricingAddOns.map((addon) => {
                  const isChecked = selectedAddOnIds.includes(addon.id);

                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-3 rounded-sm border cursor-pointer flex items-center justify-between transition-colors ${
                        isChecked
                          ? 'bg-[#121620] border-[#f36b21]/60 text-white'
                          : 'bg-[#090b10] border-[#1b1e28] text-[#8b919e] hover:border-[#2a2f3f]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center ${
                            isChecked ? 'bg-[#f36b21] border-[#f36b21]' : 'border-[#2a2f3f]'
                          }`}
                        >
                          {isChecked && <Check className="w-2.5 h-2.5 text-black font-bold" />}
                        </div>
                        <span className="text-xs font-light">
                          {isRTL ? addon.nameAr : addon.nameEn}
                        </span>
                      </div>
                      <span className="font-mono-tech text-xs text-white">
                        +${addon.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Sticky Summary Box */}
          <div className="lg:col-span-4 sticky top-28 bg-[#090b10] border border-[#1b1e28] rounded-sm p-6 flex flex-col gap-6">
            <div className="border-b border-[#1b1e28] pb-4">
              <span className="text-[10px] font-mono-tech text-[#f36b21] uppercase tracking-widest block">
                PACKAGE BUILDER MANIFEST
              </span>
              <h3 className="font-display font-bold text-xl text-white mt-1">
                {isRTL ? selectedClass.nameAr : selectedClass.nameEn}
              </h3>
            </div>

            {/* Selected Breakdown */}
            <div className="flex flex-col gap-3 text-xs font-mono-tech">
              <div className="flex justify-between text-[#8b919e]">
                <span>Active Services</span>
                <span className="text-white">{selectedServiceIds.length} Selected</span>
              </div>
              <div className="flex justify-between text-[#8b919e]">
                <span>Add-On Items</span>
                <span className="text-white">{selectedAddOnIds.length} Selected</span>
              </div>
              <div className="flex justify-between text-[#8b919e] pt-2 border-t border-[#1b1e28]">
                <span>Est. Facility Time</span>
                <span className="text-[#f36b21] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {totalHours} Hours (~{Math.ceil(totalHours / 8)} Days)
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-[#1b1e28]">
              <span className="text-[10px] font-mono-tech text-[#8b919e] uppercase block">
                {t.estimator.totalEstimate}
              </span>
              <span className="font-display font-extrabold text-3xl sm:text-4xl text-white mt-1 block">
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
              className="w-full py-3.5 rounded-sm bg-gradient-to-r from-[#f36b21] to-[#ff7a1a] disabled:opacity-50 text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(243,107,33,0.4)] flex items-center justify-center gap-2 active:scale-95 transition-all"
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
