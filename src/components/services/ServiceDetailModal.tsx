import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { AutomotiveService } from '../../types';
import { X, Sparkles, Clock, CheckCircle2, ChevronDown, ChevronUp, Calendar, ArrowRight } from 'lucide-react';

interface ServiceDetailModalProps {
  service: AutomotiveService | null;
  onClose: () => void;
  onBookService: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onBookService,
}) => {
  const { t, isRTL } = useLanguage();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-4xl bg-[#090b10] border border-[#1b1e28] rounded-sm shadow-2xl my-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#1b1e28] bg-[#0c0e15]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#f36b21]"></span>
            <span className="text-xs font-mono-tech text-[#f36b21] tracking-widest uppercase">
              ARTISAN SERVICE SPECIFICATION
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded bg-[#12151e] hover:bg-[#1f2433] text-[#bfc2c7] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-8 max-h-[80vh] overflow-y-auto flex flex-col gap-8">
          {/* Hero Banner */}
          <div className="relative aspect-16/7 bg-[#06070a] rounded-sm overflow-hidden border border-[#1b1e28]">
            <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-[10px] font-mono-tech text-[#f36b21] uppercase tracking-wider">
                  {service.badge || 'BESPOKE TREATMENT'}
                </span>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                  {service.title}
                </h3>
              </div>
              <div className="text-end">
                <span className="text-[10px] font-mono-tech text-[#8b919e] uppercase block">STARTING AT</span>
                <span className="font-display font-bold text-2xl text-white">
                  ${service.priceStartingAt.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Description & Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-mono-tech text-[#8b919e] uppercase tracking-widest mb-3">
                DETAILED METHODOLOGY
              </h4>
              <p className="text-sm text-[#bfc2c7] font-light leading-relaxed">
                {service.fullDesc}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-mono-tech text-[#8b919e] uppercase tracking-widest mb-3">
                GUARANTEED ADVANTAGES
              </h4>
              <ul className="flex flex-col gap-2.5">
                {service.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-[#8b919e]">
                    <CheckCircle2 className="w-4 h-4 text-[#f36b21] flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 5-Step Process Timeline */}
          <div>
            <h4 className="text-xs font-mono-tech text-[#f36b21] uppercase tracking-widest mb-4">
              5-STAGE EXECUTION PROCESS
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {service.process.map((step) => (
                <div
                  key={step.step}
                  className="p-3.5 bg-[#0e1118] border border-[#1b1e28] rounded-sm flex flex-col justify-between gap-2"
                >
                  <span className="font-mono-tech text-xs text-[#f36b21] font-bold">
                    STEP // 0{step.step}
                  </span>
                  <div>
                    <h5 className="font-display font-bold text-xs text-white leading-tight">
                      {step.title}
                    </h5>
                    <p className="text-[11px] text-[#8b919e] mt-1 font-light leading-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          {service.faqs.length > 0 && (
            <div>
              <h4 className="text-xs font-mono-tech text-[#8b919e] uppercase tracking-widest mb-3">
                FREQUENTLY ASKED QUESTIONS
              </h4>
              <div className="flex flex-col gap-2">
                {service.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="border border-[#1b1e28] rounded bg-[#0b0d13] overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                      className="w-full p-3.5 text-start text-xs font-medium text-white flex items-center justify-between hover:text-[#f36b21] transition-colors"
                    >
                      <span>{faq.question}</span>
                      {openFaqIndex === idx ? (
                        <ChevronUp className="w-4 h-4 text-[#f36b21]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8b919e]" />
                      )}
                    </button>
                    {openFaqIndex === idx && (
                      <div className="px-3.5 pb-3.5 text-xs text-[#8b919e] font-light leading-relaxed border-t border-[#1b1e28]/60 pt-2.5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Booking CTA Bar */}
          <div className="pt-4 border-t border-[#1b1e28] flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#8b919e]">
              <Clock className="w-4 h-4 text-[#f36b21]" />
              <span>Turnaround: {service.duration}</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookService(service.id);
              }}
              className="px-6 py-3 rounded-sm bg-gradient-to-r from-[#f36b21] to-[#ff7a1a] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(243,107,33,0.4)] flex items-center gap-2 active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment for {service.title}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
