import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { storage } from '../../services/storage';
import { 
  Mail, Phone, MapPin, Clock, Send, CheckCircle2, 
  MessageSquare, ArrowRight 
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Bespoke Hypercar Allocation Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Full name is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid email is required';
    if (!message.trim()) errs.message = 'Please provide details about your inquiry';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    storage.saveInquiry({
      name,
      email,
      phone,
      subject,
      message,
    });

    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative w-full py-28 sm:py-36 bg-[#050608] border-t border-white/[0.06] select-none">
      <div className="max-w-[1720px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Header (Matching Reference 4 - LuxeMotion) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.06]">
          <div>
            <span className="text-[11px] font-tech text-[#f36b21] tracking-[0.3em] uppercase block mb-3">
              VIP CONCIERGE // 2026
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tight uppercase leading-[0.95]">
              CONTACT US
            </h2>
            <p className="mt-3 text-sm text-[#848a99] max-w-xl font-light">
              Feel free to contact our private liaison team at any time. We will get back to you within two hours.
            </p>
          </div>

          <span className="text-xs font-tech text-[#848a99]">
            ENCRYPTED DIRECT LIAISON // 24/7 STANDBY
          </span>
        </div>

        {/* 2-Column Layout (Matching Reference 4: Form paired with Moody Hypercar Visual) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 items-center">
          {/* Form Card (Matching Reference 4) */}
          <div className="lg:col-span-7 rounded-2xl bg-[#0b0e14] border border-white/[0.08] p-8 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center flex flex-col items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#f36b21]/20 border border-[#f36b21] flex items-center justify-center text-[#f36b21]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-display font-black text-2xl text-white">
                  INQUIRY RECORDED
                </h3>
                <p className="text-xs sm:text-sm text-[#848a99] max-w-md font-light leading-relaxed">
                  {t.contact.sentSuccess}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="mt-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-tech uppercase"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs font-tech">
                <div>
                  <label className="text-[#848a99] block mb-1.5 uppercase tracking-wider text-[11px]">Your Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className={`w-full p-3.5 bg-black/60 border rounded-xl text-white placeholder-[#454a59] focus:outline-none transition-colors ${
                      errors.name ? 'border-red-500' : 'border-white/10 focus:border-[#f36b21]'
                    }`}
                  />
                  {errors.name && <span className="text-red-500 text-[10px] mt-1 block">{errors.name}</span>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#848a99] block mb-1.5 uppercase tracking-wider text-[11px]">E-mail Address *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className={`w-full p-3.5 bg-black/60 border rounded-xl text-white placeholder-[#454a59] focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-white/10 focus:border-[#f36b21]'
                      }`}
                    />
                    {errors.email && <span className="text-red-500 text-[10px] mt-1 block">{errors.email}</span>}
                  </div>
                  <div>
                    <label className="text-[#848a99] block mb-1.5 uppercase tracking-wider text-[11px]">Contact Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 0192"
                      className="w-full p-3.5 bg-black/60 border border-white/10 focus:border-[#f36b21] rounded-xl text-white placeholder-[#454a59] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[#848a99] block mb-1.5 uppercase tracking-wider text-[11px]">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3.5 bg-black/60 border border-white/10 focus:border-[#f36b21] rounded-xl text-white focus:outline-none cursor-pointer"
                  >
                    <option value="Bespoke Hypercar Allocation Inquiry">Bespoke Hypercar Allocation Inquiry</option>
                    <option value="Private Circuit Evaluation / Test Drive">Private Circuit Evaluation / Test Drive</option>
                    <option value="10H Ceramic / PPF Fleet Protection">10H Ceramic / PPF Fleet Protection</option>
                    <option value="Design House & Bespoke Commission">Design House & Bespoke Commission</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#848a99] block mb-1.5 uppercase tracking-wider text-[11px]">Your Message *</label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your collection or project..."
                    className={`w-full p-3.5 bg-black/60 border rounded-xl text-white placeholder-[#454a59] focus:outline-none resize-none transition-colors ${
                      errors.message ? 'border-red-500' : 'border-white/10 focus:border-[#f36b21]'
                    }`}
                  ></textarea>
                  {errors.message && <span className="text-red-500 text-[10px] mt-1 block">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="mt-3 w-full py-4 rounded-full bg-gradient-to-r from-[#f36b21] to-[#ff8c37] text-black font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(243,107,33,0.4)] flex items-center justify-center gap-2 active:scale-98 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Moody Vehicle Visual (Matching Reference 4) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0c0e14] shadow-2xl group">
              <img
                src="/images/nocturne-front.jpg"
                alt="VANTA Nocturne Studio"
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

              <div className="absolute bottom-6 inset-x-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10">
                <span className="text-[10px] font-tech text-[#f36b21] uppercase tracking-wider block">
                  VANTA DESIGN HOUSE
                </span>
                <span className="font-display font-bold text-sm text-white mt-0.5 block">
                  7P Creative District • Private Client Lounge
                </span>
                <span className="text-xs text-[#848a99] mt-1 block font-light">
                  Mon – Sat: 09:00 – 21:00 (VIP By Appointment)
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Pill */}
            <a
              href="https://wa.me/41795550192?text=Hello%20VANTA%20Concierge,%20I%20am%20inquiring%20about%20a%20private%20hypercar%20commission."
              target="_blank"
              rel="noreferrer"
              className="p-4 rounded-2xl bg-black/40 hover:bg-[#121622] border border-white/[0.08] hover:border-[#f36b21]/40 flex items-center justify-between text-xs font-tech text-white transition-all"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-[#f36b21]" />
                <span>Direct WhatsApp VIP Concierge</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#848a99]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
