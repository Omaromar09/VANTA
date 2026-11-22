import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { storage } from '../../services/storage';
import { Booking, Inquiry } from '../../types';
import { services } from '../../data/services';
import { 
  X, Shield, Lock, Unlock, Download, Trash2, 
  CheckCircle2, Clock, Calendar, Mail, Phone, 
  MessageSquare, User, RefreshCw, Layers, Sparkles 
} from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const { t, isRTL } = useLanguage();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [activeTab, setActiveTab] = useState<'bookings' | 'inquiries' | 'pricing'>('bookings');

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const loadData = () => {
    setBookings(storage.getBookings());
    setInquiries(storage.getInquiries());
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === '7777') {
      setIsAuthenticated(true);
      setPinError(false);
      loadData();
    } else {
      setPinError(true);
    }
  };

  const handleUpdateBookingStatus = (id: string, status: Booking['status']) => {
    storage.updateBookingStatus(id, status);
    loadData();
  };

  const handleDeleteBooking = (id: string) => {
    if (window.confirm('Delete this booking permanently?')) {
      storage.deleteBooking(id);
      loadData();
    }
  };

  const handleUpdateInquiryStatus = (id: string, status: Inquiry['status']) => {
    storage.updateInquiryStatus(id, status);
    loadData();
  };

  const handleExportCSV = () => {
    const csvContent = storage.exportBookingsToCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `VANTA-Bookings-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBookings = bookings.filter(
    (b) => statusFilter === 'all' || b.status === statusFilter
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl overflow-y-auto animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl bg-[#090b10] border border-[#1b1e28] rounded-sm shadow-2xl my-auto overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#1b1e28] bg-[#0c0e15]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#131620] border border-[#f36b21]/50 flex items-center justify-center text-[#f36b21]">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-white">
                {t.admin.title}
              </h3>
              <span className="text-[10px] font-mono-tech text-[#f36b21] tracking-widest uppercase block">
                VIP CONCIERGE & OPERATIONS
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="px-3 py-1.5 rounded bg-[#151924] border border-[#1b1e28] text-xs font-mono-tech text-[#8b919e] hover:text-white"
              >
                {t.admin.logout}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded bg-[#12151e] hover:bg-[#1f2433] text-[#bfc2c7] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Lock Screen if not authorized */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-16 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#11141e] border border-[#f36b21]/40 flex items-center justify-center text-[#f36b21] mb-6">
              <Lock className="w-8 h-8" />
            </div>

            <h4 className="font-display font-bold text-2xl text-white">
              {t.admin.enterPin}
            </h4>
            <p className="text-xs text-[#8b919e] font-mono-tech mt-2 max-w-sm">
              Default access PIN for demonstration review is <strong>7777</strong>.
            </p>

            <form onSubmit={handleUnlock} className="mt-6 flex flex-col sm:flex-row gap-3 w-full max-w-xs">
              <input
                type="password"
                maxLength={6}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError(false);
                }}
                placeholder="7777"
                className={`flex-1 p-3 bg-[#0c0e14] border rounded-sm text-center font-mono-tech text-lg text-white tracking-widest focus:outline-none ${
                  pinError ? 'border-red-500' : 'border-[#1b1e28] focus:border-[#f36b21]'
                }`}
                autoFocus
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-sm bg-[#f36b21] hover:bg-[#ff7a1a] text-black font-bold text-xs font-mono-tech uppercase tracking-wider"
              >
                {t.admin.unlock}
              </button>
            </form>
            {pinError && (
              <span className="text-red-500 text-xs font-mono-tech mt-3">
                {t.admin.invalidPin}
              </span>
            )}
          </div>
        ) : (
          /* Dashboard Workspace */
          <div className="p-4 sm:p-8 max-h-[80vh] overflow-y-auto flex flex-col gap-6">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-[#0e1118] border border-[#1b1e28] rounded-sm">
                <span className="text-[10px] font-mono-tech text-[#8b919e] uppercase block">TOTAL BOOKINGS</span>
                <span className="font-display font-extrabold text-2xl text-white mt-1 block">
                  {bookings.length}
                </span>
              </div>
              <div className="p-4 bg-[#0e1118] border border-[#1b1e28] rounded-sm">
                <span className="text-[10px] font-mono-tech text-[#8b919e] uppercase block">NEW CONFIRMATIONS</span>
                <span className="font-display font-extrabold text-2xl text-[#f36b21] mt-1 block">
                  {bookings.filter((b) => b.status === 'new').length}
                </span>
              </div>
              <div className="p-4 bg-[#0e1118] border border-[#1b1e28] rounded-sm">
                <span className="text-[10px] font-mono-tech text-[#8b919e] uppercase block">UNREAD INQUIRIES</span>
                <span className="font-display font-extrabold text-2xl text-[#f36b21] mt-1 block">
                  {inquiries.filter((i) => i.status === 'unread').length}
                </span>
              </div>
              <div className="p-4 bg-[#0e1118] border border-[#1b1e28] rounded-sm">
                <span className="text-[10px] font-mono-tech text-[#8b919e] uppercase block">TOTAL INQUIRIES</span>
                <span className="font-display font-extrabold text-2xl text-white mt-1 block">
                  {inquiries.length}
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center justify-between border-b border-[#1b1e28] pb-2">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`pb-2 text-xs font-mono-tech uppercase tracking-wider border-b-2 transition-colors ${
                    activeTab === 'bookings'
                      ? 'border-[#f36b21] text-white font-bold'
                      : 'border-transparent text-[#8b919e] hover:text-[#bfc2c7]'
                  }`}
                >
                  {t.admin.tabBookings} ({bookings.length})
                </button>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`pb-2 text-xs font-mono-tech uppercase tracking-wider border-b-2 transition-colors ${
                    activeTab === 'inquiries'
                      ? 'border-[#f36b21] text-white font-bold'
                      : 'border-transparent text-[#8b919e] hover:text-[#bfc2c7]'
                  }`}
                >
                  {t.admin.tabInquiries} ({inquiries.length})
                </button>
                <button
                  onClick={() => setActiveTab('pricing')}
                  className={`pb-2 text-xs font-mono-tech uppercase tracking-wider border-b-2 transition-colors ${
                    activeTab === 'pricing'
                      ? 'border-[#f36b21] text-white font-bold'
                      : 'border-transparent text-[#8b919e] hover:text-[#bfc2c7]'
                  }`}
                >
                  {t.admin.tabPricing}
                </button>
              </div>

              {activeTab === 'bookings' && (
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1.5 rounded bg-[#161a25] hover:bg-[#202738] border border-[#23293a] text-xs font-mono-tech text-[#bfc2c7] hover:text-white flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-[#f36b21]" />
                  <span>{t.admin.exportCSV}</span>
                </button>
              )}
            </div>

            {/* TAB 1: Bookings Management */}
            {activeTab === 'bookings' && (
              <div className="flex flex-col gap-4">
                {/* Status Filter Pills */}
                <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono-tech">
                  {['all', 'new', 'confirmed', 'in_progress', 'completed', 'cancelled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-3 py-1 rounded-sm border uppercase ${
                        statusFilter === st
                          ? 'bg-[#f36b21] text-black border-[#f36b21] font-bold'
                          : 'bg-[#0c0e14] text-[#8b919e] border-[#1b1e28]'
                      }`}
                    >
                      {st.replace('_', ' ')}
                    </button>
                  ))}
                </div>

                {filteredBookings.length === 0 ? (
                  <div className="py-12 text-center text-xs font-mono-tech text-[#8b919e]">
                    {t.admin.noBookings}
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {filteredBookings.map((b) => (
                      <div
                        key={b.id}
                        className="p-4 rounded-sm bg-[#0e1118] border border-[#1b1e28] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs font-mono-tech"
                      >
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[#f36b21] font-bold">{b.bookingRef}</span>
                            <span className="text-[#5a6070]">•</span>
                            <span className="text-white uppercase font-bold">{b.bookingType}</span>
                            <span className="text-[#5a6070]">•</span>
                            <span className="text-[#8b919e]">{b.vehicleModel}</span>
                          </div>
                          <div className="text-white">
                            <strong>{b.customerName}</strong> ({b.email} • {b.phone})
                          </div>
                          <div className="text-[#8b919e]">
                            Schedule: <span className="text-white">{b.date} at {b.timeSlot}</span>
                            {b.notes && <span className="ml-2 italic">— "{b.notes}"</span>}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                          <select
                            value={b.status}
                            onChange={(e: any) => handleUpdateBookingStatus(b.id, e.target.value)}
                            className="p-2 rounded bg-[#090b10] border border-[#1b1e28] text-xs font-mono-tech text-white cursor-pointer"
                          >
                            <option value="new">New</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>

                          <button
                            onClick={() => handleDeleteBooking(b.id)}
                            className="p-2 rounded bg-[#13161f] hover:bg-red-500/20 text-[#8b919e] hover:text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Inquiry Inbox */}
            {activeTab === 'inquiries' && (
              <div className="flex flex-col gap-3">
                {inquiries.length === 0 ? (
                  <div className="py-12 text-center text-xs font-mono-tech text-[#8b919e]">
                    No inquiries recorded in inbox.
                  </div>
                ) : (
                  inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className={`p-4 rounded-sm border flex flex-col gap-2.5 text-xs font-mono-tech ${
                        inq.status === 'unread'
                          ? 'bg-[#121620] border-[#f36b21]/50'
                          : 'bg-[#0e1118] border-[#1b1e28]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{inq.name}</span>
                          <span className="text-[#8b919e]">({inq.email} • {inq.phone || 'N/A'})</span>
                        </div>
                        <span className="text-[10px] text-[#8b919e]">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="text-[#f36b21] font-semibold">{inq.subject}</div>
                      <p className="text-white font-light bg-[#080a0f] p-3 rounded border border-[#1b1e28]">
                        {inq.message}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <span className="text-[10px] uppercase text-[#8b919e]">STATUS: {inq.status}</span>
                        <div className="flex items-center gap-2">
                          {inq.status === 'unread' ? (
                            <button
                              onClick={() => handleUpdateInquiryStatus(inq.id, 'read')}
                              className="px-3 py-1 rounded bg-[#1b1e28] text-white hover:bg-[#252b3b]"
                            >
                              Mark Read
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUpdateInquiryStatus(inq.id, 'resolved')}
                              className="px-3 py-1 rounded bg-[#1b1e28] text-white hover:bg-[#252b3b]"
                            >
                              Mark Resolved
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* TAB 3: Pricing & Services Matrix */}
            {activeTab === 'pricing' && (
              <div className="flex flex-col gap-4 text-xs font-mono-tech">
                <span className="text-[#8b919e]">
                  Active services synced with the client-facing price calculator.
                </span>
                <div className="flex flex-col gap-2.5">
                  {services.map((s) => (
                    <div
                      key={s.id}
                      className="p-3.5 bg-[#0e1118] border border-[#1b1e28] rounded-sm flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-white block">{s.title}</span>
                        <span className="text-[#8b919e] text-[11px]">Turnaround: {s.duration}</span>
                      </div>
                      <span className="font-bold text-[#f36b21]">
                        ${s.priceStartingAt.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
