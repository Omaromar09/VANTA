import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { services } from '../../data/services';
import { vehicles } from '../../data/vehicles';
import { storage } from '../../services/storage';
import { Booking } from '../../types';
import confetti from 'canvas-confetti';
import { 
  X, Check, Calendar, Clock, User, Mail, Phone, 
  Car, ShieldCheck, Sparkles, ArrowRight, ArrowLeft, Copy, CheckCircle 
} from 'lucide-react';

interface SmartBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    serviceId?: string;
    vehicleModel?: string;
    notes?: string;
    estimatedPrice?: number;
    bookingType?: 'service' | 'test-drive' | 'consultation';
  } | null;
}

export const SmartBookingModal: React.FC<SmartBookingModalProps> = ({
  isOpen,
  onClose,
  prefill,
}) => {
  const { t, isRTL } = useLanguage();

  const [currentStep, setCurrentStep] = useState(1);
  const [bookingType, setBookingType] = useState<'service' | 'test-drive' | 'consultation'>(
    prefill?.bookingType || (prefill?.serviceId ? 'service' : 'test-drive')
  );
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    prefill?.serviceId || services[0].id
  );
  const [vehicleMake, setVehicleMake] = useState('VANTA');
  const [vehicleModel, setVehicleModel] = useState<string>(
    prefill?.vehicleModel || vehicles[0].name
  );
  const [vehicleYear, setVehicleYear] = useState('2026');

  const [preferredDate, setPreferredDate] = useState('2026-11-28');
  const [preferredTime, setPreferredTime] = useState('10:00 AM');

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [notes, setNotes] = useState(prefill?.notes || '');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen) return null;

  // Validation
  const validateStep4 = () => {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) errs.name = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (!phone.trim()) errs.phone = 'Contact phone number is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep4()) {
      setCurrentStep(4);
      return;
    }

    const saved = storage.saveBooking({
      bookingType,
      serviceId: bookingType === 'service' ? selectedServiceId : undefined,
      vehicleModel,
      vehicleYear,
      customerName,
      email,
      phone,
      whatsapp: whatsapp || phone,
      date: preferredDate,
      timeSlot: preferredTime,
      notes,
      status: 'new',
      estimatedPrice: prefill?.estimatedPrice || (bookingType === 'service' ? 1850 : 0),
    });

    setConfirmedBooking(saved);
    setCurrentStep(6); // Success screen

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f36b21', '#ff7a1a', '#ffffff', '#111318'],
      });
    } catch {}
  };

  const handleCopyRef = () => {
    if (confirmedBooking) {
      navigator.clipboard.writeText(confirmedBooking.bookingRef);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const timeSlots = [
    '09:00 AM',
    '10:30 AM',
    '01:00 PM',
    '02:30 PM',
    '04:00 PM',
    '05:30 PM',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#090b10] border border-[#1b1e28] rounded-sm shadow-2xl my-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#1b1e28] bg-[#0c0e15]">
          <div className="flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-[#f36b21]" />
            <h3 className="font-display font-bold text-lg text-white">
              {t.booking.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded bg-[#12151e] hover:bg-[#1f2433] text-[#bfc2c7] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar (1 to 5) */}
        {currentStep <= 5 && (
          <div className="bg-[#0e1118] px-6 py-3 border-b border-[#1b1e28] flex items-center justify-between text-xs font-mono-tech">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                    currentStep === s
                      ? 'bg-[#f36b21] text-black shadow-[0_0_10px_#f36b21]'
                      : currentStep > s
                      ? 'bg-[#1b1e28] text-[#f36b21]'
                      : 'bg-[#13161f] text-[#5a6070]'
                  }`}
                >
                  {currentStep > s ? '✓' : s}
                </div>
                <span className={`hidden sm:inline ${currentStep === s ? 'text-white' : 'text-[#8b919e]'}`}>
                  {s === 1 && 'Experience'}
                  {s === 2 && 'Vehicle'}
                  {s === 3 && 'Schedule'}
                  {s === 4 && 'Client'}
                  {s === 5 && 'Confirm'}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: Select Experience */}
          {currentStep === 1 && (
            <div className="flex flex-col gap-4">
              <h4 className="font-display font-bold text-lg text-white">
                {t.booking.step1}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setBookingType('test-drive')}
                  className={`p-4 rounded-sm border text-start transition-all ${
                    bookingType === 'test-drive'
                      ? 'bg-[#151822] border-[#f36b21] text-white shadow-md'
                      : 'bg-[#0b0d13] border-[#1b1e28] text-[#8b919e]'
                  }`}
                >
                  <Car className="w-5 h-5 text-[#f36b21] mb-2" />
                  <span className="font-bold text-sm text-white block">VIP Test Drive</span>
                  <span className="text-[11px] text-[#8b919e] mt-1 block">
                    Private track / showroom test evaluation.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setBookingType('service')}
                  className={`p-4 rounded-sm border text-start transition-all ${
                    bookingType === 'service'
                      ? 'bg-[#151822] border-[#f36b21] text-white shadow-md'
                      : 'bg-[#0b0d13] border-[#1b1e28] text-[#8b919e]'
                  }`}
                >
                  <ShieldCheck className="w-5 h-5 text-[#f36b21] mb-2" />
                  <span className="font-bold text-sm text-white block">Ceramic / Detailing</span>
                  <span className="text-[11px] text-[#8b919e] mt-1 block">
                    Surface protection and bespoke care.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setBookingType('consultation')}
                  className={`p-4 rounded-sm border text-start transition-all ${
                    bookingType === 'consultation'
                      ? 'bg-[#151822] border-[#f36b21] text-white shadow-md'
                      : 'bg-[#0b0d13] border-[#1b1e28] text-[#8b919e]'
                  }`}
                >
                  <Sparkles className="w-5 h-5 text-[#f36b21] mb-2" />
                  <span className="font-bold text-sm text-white block">Design Consultation</span>
                  <span className="text-[11px] text-[#8b919e] mt-1 block">
                    Bespoke hypercar commissioning.
                  </span>
                </button>
              </div>

              {bookingType === 'service' && (
                <div className="mt-4">
                  <label className="text-xs font-mono-tech text-[#8b919e] block mb-2">
                    SELECT SERVICE TIER
                  </label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full p-3 bg-[#0c0e14] border border-[#1b1e28] rounded-sm text-xs font-mono-tech text-white focus:border-[#f36b21] focus:outline-none"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title} (Starting at ${s.priceStartingAt.toLocaleString()})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Vehicle Details */}
          {currentStep === 2 && (
            <div className="flex flex-col gap-4">
              <h4 className="font-display font-bold text-lg text-white">
                {t.booking.step2}
              </h4>

              <div className="flex flex-col gap-3 text-xs font-mono-tech">
                <div>
                  <label className="text-[#8b919e] block mb-1">VEHICLE MODEL / CONFIGURATION</label>
                  <input
                    type="text"
                    value={vehicleModel}
                    onChange={(e) => setVehicleModel(e.target.value)}
                    placeholder="e.g. VANTA GT-900 or Custom Hypercar"
                    className="w-full p-3 bg-[#0c0e14] border border-[#1b1e28] rounded-sm text-white focus:border-[#f36b21] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#8b919e] block mb-1">MANUFACTURER / BRAND</label>
                    <input
                      type="text"
                      value={vehicleMake}
                      onChange={(e) => setVehicleMake(e.target.value)}
                      className="w-full p-3 bg-[#0c0e14] border border-[#1b1e28] rounded-sm text-white focus:border-[#f36b21] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[#8b919e] block mb-1">MODEL YEAR</label>
                    <input
                      type="text"
                      value={vehicleYear}
                      onChange={(e) => setVehicleYear(e.target.value)}
                      className="w-full p-3 bg-[#0c0e14] border border-[#1b1e28] rounded-sm text-white focus:border-[#f36b21] focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Picker */}
          {currentStep === 3 && (
            <div className="flex flex-col gap-4">
              <h4 className="font-display font-bold text-lg text-white">
                {t.booking.step3}
              </h4>

              <div className="flex flex-col gap-4 text-xs font-mono-tech">
                <div>
                  <label className="text-[#8b919e] block mb-2">{t.booking.preferredDate}</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full p-3 bg-[#0c0e14] border border-[#1b1e28] rounded-sm text-white focus:border-[#f36b21] focus:outline-none cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[#8b919e] block mb-2">{t.booking.preferredTime}</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setPreferredTime(slot)}
                        className={`p-2.5 rounded-sm border text-xs text-center transition-all ${
                          preferredTime === slot
                            ? 'bg-[#f36b21] text-black font-bold border-[#f36b21]'
                            : 'bg-[#0c0e14] text-[#bfc2c7] border-[#1b1e28] hover:border-[#2a2f3f]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: Client Information */}
          {currentStep === 4 && (
            <div className="flex flex-col gap-4">
              <h4 className="font-display font-bold text-lg text-white">
                {t.booking.step4}
              </h4>

              <div className="flex flex-col gap-3 text-xs font-mono-tech">
                <div>
                  <label className="text-[#8b919e] block mb-1">{t.booking.fullName} *</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Lord / Lady / Mr. / Ms. Full Name"
                    className={`w-full p-3 bg-[#0c0e14] border rounded-sm text-white focus:outline-none ${
                      errors.name ? 'border-red-500' : 'border-[#1b1e28] focus:border-[#f36b21]'
                    }`}
                  />
                  {errors.name && <span className="text-red-500 text-[10px] mt-1 block">{errors.name}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[#8b919e] block mb-1">{t.booking.email} *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@luxury.com"
                      className={`w-full p-3 bg-[#0c0e14] border rounded-sm text-white focus:outline-none ${
                        errors.email ? 'border-red-500' : 'border-[#1b1e28] focus:border-[#f36b21]'
                      }`}
                    />
                    {errors.email && <span className="text-red-500 text-[10px] mt-1 block">{errors.email}</span>}
                  </div>
                  <div>
                    <label className="text-[#8b919e] block mb-1">{t.booking.phone} *</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 0192"
                      className={`w-full p-3 bg-[#0c0e14] border rounded-sm text-white focus:outline-none ${
                        errors.phone ? 'border-red-500' : 'border-[#1b1e28] focus:border-[#f36b21]'
                      }`}
                    />
                    {errors.phone && <span className="text-red-500 text-[10px] mt-1 block">{errors.phone}</span>}
                  </div>
                </div>

                <div>
                  <label className="text-[#8b919e] block mb-1">{t.booking.notes}</label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specific questions, transport requirements, track preference..."
                    className="w-full p-3 bg-[#0c0e14] border border-[#1b1e28] rounded-sm text-white focus:border-[#f36b21] focus:outline-none resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Review & Submit */}
          {currentStep === 5 && (
            <div className="flex flex-col gap-4">
              <h4 className="font-display font-bold text-lg text-white">
                {t.booking.step5}
              </h4>

              <div className="bg-[#0b0d13] border border-[#1b1e28] rounded-sm p-4 text-xs font-mono-tech flex flex-col gap-2.5">
                <div className="flex justify-between py-1 border-b border-[#1b1e28]">
                  <span className="text-[#8b919e]">EXPERIENCE TYPE</span>
                  <span className="text-white uppercase font-bold">{bookingType}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1b1e28]">
                  <span className="text-[#8b919e]">VEHICLE</span>
                  <span className="text-white">{vehicleModel} ({vehicleYear})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1b1e28]">
                  <span className="text-[#8b919e]">PREFERRED SCHEDULE</span>
                  <span className="text-[#f36b21]">{preferredDate} at {preferredTime}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#1b1e28]">
                  <span className="text-[#8b919e]">CLIENT</span>
                  <span className="text-white">{customerName}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8b919e]">CONTACT</span>
                  <span className="text-white">{email} • {phone}</span>
                </div>
              </div>

              <div className="p-3 bg-[#11141e] border border-[#f36b21]/30 rounded text-[11px] text-[#bfc2c7]">
                By confirming, your VIP appointment is recorded in the VANTA concierge queue. A dedicated private liaison will confirm logistics via WhatsApp or phone.
              </div>
            </div>
          )}

          {/* STEP 6: Success Confirmation */}
          {currentStep === 6 && confirmedBooking && (
            <div className="py-8 text-center flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[#f36b21]/20 border border-[#f36b21] flex items-center justify-center text-[#f36b21] mb-2">
                <CheckCircle className="w-8 h-8" />
              </div>

              <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                {t.booking.successTitle}
              </h4>
              <p className="text-xs sm:text-sm text-[#8b919e] max-w-md font-light">
                {t.booking.successDesc}
              </p>

              {/* Booking Reference Pill */}
              <div className="p-4 bg-[#0e1118] border border-[#f36b21]/60 rounded-sm w-full max-w-sm mt-3">
                <span className="text-[10px] font-mono-tech text-[#8b919e] uppercase block mb-1">
                  {t.booking.referenceLabel}
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="font-mono-tech font-bold text-xl text-[#f36b21] tracking-wider">
                    {confirmedBooking.bookingRef}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyRef}
                    className="p-1.5 rounded bg-black/60 hover:bg-black text-[#bfc2c7] hover:text-white"
                    title="Copy Reference"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
                {isCopied && <span className="text-[10px] text-green-400 block mt-1">Copied to clipboard!</span>}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="mt-6 px-8 py-3 rounded-sm bg-[#1b1e28] hover:bg-[#282d3d] text-white text-xs font-mono-tech uppercase tracking-wider"
              >
                {t.booking.backToHome}
              </button>
            </div>
          )}

          {/* Navigation Controls */}
          {currentStep <= 5 && (
            <div className="mt-8 pt-4 border-t border-[#1b1e28] flex items-center justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="px-4 py-2 rounded bg-[#12151e] border border-[#1b1e28] text-xs font-mono-tech text-[#bfc2c7] hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  <span>Previous</span>
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < 5 ? (
                <button
                  type="button"
                  onClick={() => {
                    if (currentStep === 4 && !validateStep4()) return;
                    setCurrentStep((s) => s + 1);
                  }}
                  className="px-6 py-2.5 rounded-sm bg-[#f36b21] hover:bg-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 rounded-sm bg-gradient-to-r from-[#f36b21] to-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(243,107,33,0.4)] flex items-center gap-2 active:scale-95"
                >
                  <Check className="w-4 h-4" />
                  <span>{t.booking.submitBtn}</span>
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
