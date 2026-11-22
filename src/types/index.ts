export type VehicleCategory = 'all' | 'hypercars' | 'supercars' | 'performance' | 'classics';

export interface VehicleSpec {
  power: string; // e.g., "980 HP"
  torque: string; // e.g., "1,050 Nm"
  acceleration: string; // e.g., "2.3s (0-100 km/h)"
  topSpeed: string; // e.g., "385 km/h"
  engine: string; // e.g., "4.0L Quad-Turbo V8 Hybrid"
  transmission: string; // e.g., "8-Speed Dual-Clutch F1"
  weight: string; // e.g., "1,420 kg"
  driveType: string; // e.g., "AWD with Vectoring"
  downforce: string; // e.g., "680 kg @ 250 km/h"
}

export interface VehicleColorOption {
  name: string;
  hex: string;
  finish: 'metallic' | 'matte' | 'carbon';
  turntableFolder?: string; // e.g., 'orange', 'silver', 'black'
}

export interface Vehicle {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: VehicleCategory;
  priceEstimate: string;
  year: number;
  specs: VehicleSpec;
  description: string;
  overview: string[];
  heroImage: string;
  gallery: string[];
  turntableDefault: 'orange' | 'silver' | 'black';
  availableColors: VehicleColorOption[];
  featured?: boolean;
}

export interface ServiceStep {
  step: number;
  title: string;
  description: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface AutomotiveService {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  process: ServiceStep[];
  duration: string;
  priceStartingAt: number;
  image: string;
  faqs: ServiceFAQ[];
  badge?: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export interface Booking {
  id: string;
  bookingRef: string;
  bookingType: 'service' | 'test-drive' | 'consultation';
  serviceId?: string;
  vehicleModel: string;
  vehicleYear?: string;
  customerName: string;
  email: string;
  phone: string;
  whatsapp?: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'new' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  estimatedPrice?: number;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  vehicleId?: string;
  serviceId?: string;
  status: 'unread' | 'read' | 'resolved';
  createdAt: string;
}

export interface ConfiguratorOptions {
  vehicleId: string;
  color: VehicleColorOption;
  wheelStyle: string;
  wheelFinish: string;
  caliperColor: string;
  interiorTrim: string;
  aeroPackage: boolean;
  sportExhaust: boolean;
  totalPrice: number;
}
