import { Booking, Inquiry } from '../types';

const BOOKINGS_KEY = 'vanta_bookings_v1';
const INQUIRIES_KEY = 'vanta_inquiries_v1';
const FAVORITES_KEY = 'vanta_favorites_v1';
const CONFIGS_KEY = 'vanta_custom_configs_v1';

// Seed initial demo data so the system isn't completely blank for the admin preview
const initialBookings: Booking[] = [
  {
    id: 'b-01',
    bookingRef: 'VNT-2026-9412',
    bookingType: 'service',
    serviceId: 'ceramic-coating',
    vehicleModel: 'VANTA GT-900 (2026)',
    customerName: 'Marcus Vance',
    email: 'm.vance@vancemotors.ch',
    phone: '+41 79 555 0192',
    date: '2026-11-28',
    timeSlot: '10:00 AM',
    notes: 'Requesting double-layer 10H ceramic shield and wheel ceramic add-on.',
    status: 'confirmed',
    createdAt: '2026-11-20T14:22:00Z',
    estimatedPrice: 2230,
  },
  {
    id: 'b-02',
    bookingRef: 'VNT-2026-8831',
    bookingType: 'test-drive',
    vehicleModel: 'VANTA SPECTRE X',
    customerName: 'Sultan Al-Mansoor',
    email: 'salmansoor@almansoor-holdings.ae',
    phone: '+971 50 882 1940',
    whatsapp: '+971 50 882 1940',
    date: '2026-11-30',
    timeSlot: '03:00 PM',
    notes: 'Private track evaluation requested at Yas Marina or private circuit.',
    status: 'new',
    createdAt: '2026-11-21T09:15:00Z',
    estimatedPrice: 0,
  },
  {
    id: 'b-03',
    bookingRef: 'VNT-2026-7249',
    bookingType: 'service',
    serviceId: 'paint-protection-film',
    vehicleModel: 'VANTA NOCTURNE (Carbon Edition)',
    customerName: 'Elena Rostova',
    email: 'elena.rostova@apexcap.uk',
    phone: '+44 20 7946 0991',
    date: '2026-12-04',
    timeSlot: '11:30 AM',
    notes: 'Satin matte PPF over exposed carbon bodywork.',
    status: 'in_progress',
    createdAt: '2026-11-19T18:40:00Z',
    estimatedPrice: 3850,
  },
];

const initialInquiries: Inquiry[] = [
  {
    id: 'inq-01',
    name: 'David Sterling',
    email: 'd.sterling@sterlingmotors.com',
    phone: '+1 (310) 555-0144',
    subject: 'Commissioning VANTA GT-900 in Custom Viola Metallic',
    message: 'We are interested in acquiring an allocation for the GT-900 with bespoke paint-to-sample finish and custom titanium exhaust.',
    vehicleId: 'vanta-gt900',
    status: 'unread',
    createdAt: '2026-11-21T16:30:00Z',
  },
  {
    id: 'inq-02',
    name: 'Tariq Al-Sabah',
    email: 'tariq@alsabah-capital.kw',
    phone: '+965 99 123 456',
    subject: 'Fleet Ceramic Coating and Track Preparation',
    message: 'Inquiring about booking our collection for 10H ceramic protection before the upcoming winter supercar rally.',
    serviceId: 'ceramic-coating',
    status: 'read',
    createdAt: '2026-11-20T11:10:00Z',
  },
];

export const storage = {
  getBookings(): Booking[] {
    try {
      const data = localStorage.getItem(BOOKINGS_KEY);
      if (!data) {
        localStorage.setItem(BOOKINGS_KEY, JSON.stringify(initialBookings));
        return initialBookings;
      }
      return JSON.parse(data);
    } catch {
      return initialBookings;
    }
  },

  saveBooking(booking: Omit<Booking, 'id' | 'bookingRef' | 'createdAt'>): Booking {
    const bookings = this.getBookings();
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      ...booking,
      id: `b-${Date.now()}`,
      bookingRef: `VNT-2026-${randomDigits}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newBooking, ...bookings];
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
    return newBooking;
  },

  updateBookingStatus(id: string, status: Booking['status']): void {
    const bookings = this.getBookings();
    const updated = bookings.map((b) => (b.id === id ? { ...b, status } : b));
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  },

  deleteBooking(id: string): void {
    const bookings = this.getBookings();
    const updated = bookings.filter((b) => b.id !== id);
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(updated));
  },

  getInquiries(): Inquiry[] {
    try {
      const data = localStorage.getItem(INQUIRIES_KEY);
      if (!data) {
        localStorage.setItem(INQUIRIES_KEY, JSON.stringify(initialInquiries));
        return initialInquiries;
      }
      return JSON.parse(data);
    } catch {
      return initialInquiries;
    }
  },

  saveInquiry(inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>): Inquiry {
    const inquiries = this.getInquiries();
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: 'unread',
      createdAt: new Date().toISOString(),
    };
    const updated = [newInquiry, ...inquiries];
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    return newInquiry;
  },

  updateInquiryStatus(id: string, status: Inquiry['status']): void {
    const inquiries = this.getInquiries();
    const updated = inquiries.map((i) => (i.id === id ? { ...i, status } : i));
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
  },

  getFavorites(): string[] {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : ['vanta-gt900'];
    } catch {
      return ['vanta-gt900'];
    }
  },

  toggleFavorite(vehicleId: string): string[] {
    const favs = this.getFavorites();
    const exists = favs.includes(vehicleId);
    const updated = exists ? favs.filter((id) => id !== vehicleId) : [...favs, vehicleId];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  },

  saveCustomConfig(config: any): void {
    try {
      const existing = localStorage.getItem(CONFIGS_KEY);
      const list = existing ? JSON.parse(existing) : [];
      list.unshift({ ...config, savedAt: new Date().toISOString() });
      localStorage.setItem(CONFIGS_KEY, JSON.stringify(list.slice(0, 10)));
    } catch (e) {
      console.error(e);
    }
  },

  exportBookingsToCSV(): string {
    const bookings = this.getBookings();
    const headers = ['Booking Ref', 'Type', 'Vehicle', 'Customer', 'Email', 'Phone', 'Date', 'Time Slot', 'Status', 'Price', 'Notes'];
    const rows = bookings.map((b) => [
      `"${b.bookingRef}"`,
      `"${b.bookingType}"`,
      `"${b.vehicleModel}"`,
      `"${b.customerName}"`,
      `"${b.email}"`,
      `"${b.phone}"`,
      `"${b.date}"`,
      `"${b.timeSlot}"`,
      `"${b.status}"`,
      `"${b.estimatedPrice || 0}"`,
      `"${(b.notes || '').replace(/"/g, '""')}"`,
    ]);
    return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  },
};
