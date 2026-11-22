import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { IntroOverlay } from './components/home/IntroOverlay';
import { Navbar } from './components/common/Navbar';
import { IntroHero } from './components/home/IntroHero';
import { EditorialShowcase } from './components/home/EditorialShowcase';
import { VehicleCollection } from './components/collection/VehicleCollection';
import { VehicleDetailModal } from './components/collection/VehicleDetailModal';
import { VehicleCompareModal } from './components/compare/VehicleCompareModal';
import { FavoritesModal } from './components/collection/FavoritesModal';
import { ConfiguratorSection } from './components/configurator/ConfiguratorSection';
import { Showroom360Section } from './components/showroom/Showroom360Section';
import { ServicesSection } from './components/services/ServicesSection';
import { ServiceDetailModal } from './components/services/ServiceDetailModal';
import { BeforeAfterSlider } from './components/beforeafter/BeforeAfterSlider';
import { PriceEstimatorSection } from './components/estimator/PriceEstimatorSection';
import { ShowreelGallery } from './components/gallery/ShowreelGallery';
import { AboutSection } from './components/about/AboutSection';
import { TestimonialsSection } from './components/testimonials/TestimonialsSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/common/Footer';
import { SmartBookingModal } from './components/booking/SmartBookingModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { vehicles } from './data/vehicles';
import { AutomotiveService, Vehicle } from './types';
import { storage } from './services/storage';

const VantaExperience: React.FC = () => {
  const { t } = useLanguage();

  // State Management
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId) || null;

  const [selectedService, setSelectedService] = useState<AutomotiveService | null>(null);

  const [favorites, setFavorites] = useState<string[]>(() => storage.getFavorites());
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

  const [compareList, setCompareList] = useState<string[]>(['vanta-gt900', 'vanta-spectre-x']);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPrefill, setBookingPrefill] = useState<{
    serviceId?: string;
    vehicleModel?: string;
    notes?: string;
    estimatedPrice?: number;
    bookingType?: 'service' | 'test-drive' | 'consultation';
  } | null>(null);

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [introKey, setIntroKey] = useState(0);

  // Handlers
  const handleReplayIntro = () => {
    document.documentElement.classList.remove('intro-done');
    setIntroKey((prev) => prev + 1);
  };
  const handleToggleFavorite = (carId: string) => {
    const updated = storage.toggleFavorite(carId);
    setFavorites(updated);
  };

  const handleToggleCompare = (carId: string) => {
    setCompareList((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 vehicles simultaneously.');
        return prev;
      }
      return [...prev, carId];
    });
  };

  const handleOpenBooking = (prefillData?: typeof bookingPrefill) => {
    setBookingPrefill(prefillData || null);
    setIsBookingOpen(true);
  };

  const handleOpenConfigurator = (carId?: string) => {
    const targetElement = document.getElementById('configurator');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreCollection = () => {
    const targetElement = document.getElementById('collection');
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-[100dvh] bg-[#050608] text-[#F3F3F1] selection:bg-[#F36B21] selection:text-white overflow-x-clip">
      {/* 0. Full-Screen Cinematic Intro Overlay (Strictly isolated, removed on complete) */}
      <IntroOverlay key={introKey} />

      {/* 1. Main Website Container: Completely hidden & non-interactive until intro ends */}
      <div id="site" className="relative w-full min-h-[100dvh] overflow-x-clip">
        {/* Global Navigation */}
        <Navbar
          onOpenBooking={() => handleOpenBooking()}
          onOpenAdmin={() => setIsAdminOpen(true)}
          onOpenFavorites={() => setIsFavoritesOpen(true)}
          onOpenCompare={() => setIsCompareOpen(true)}
          favoritesCount={favorites.length}
          compareCount={compareList.length}
        />

        {/* Cinematic Video Intro Hero (Reveals when intro ends) */}
        <IntroHero
          onExploreCollection={handleExploreCollection}
          onOpenConfigurator={() => handleOpenConfigurator()}
          onReplayIntro={handleReplayIntro}
        />

      {/* 3. Luxury Editorial Automotive Showcase */}
      <EditorialShowcase
        onExploreCar={(carId) => setSelectedVehicleId(carId)}
        onOpenConfigurator={() => handleOpenConfigurator()}
      />

      {/* 4. Complete Vehicle Fleet & Showroom Collection */}
      <VehicleCollection
        onOpenDetails={(carId) => setSelectedVehicleId(carId)}
        onOpenConfigurator={(carId) => handleOpenConfigurator(carId)}
        onToggleFavorite={handleToggleFavorite}
        favorites={favorites}
        onToggleCompare={handleToggleCompare}
        compareList={compareList}
      />

      {/* 5. Interactive 360° Studio Car Configurator */}
      <ConfiguratorSection
        onRequestConfig={(configSummary) => {
          handleOpenBooking({
            bookingType: 'consultation',
            vehicleModel: configSummary.vehicleName,
            estimatedPrice: configSummary.totalPrice,
            notes: `Requested Configuration: Color: ${configSummary.colorName}, Finish: ${configSummary.finish}, Wheels: ${configSummary.wheel}, Calipers: ${configSummary.caliper}. Add-Ons: ${configSummary.options.join(', ') || 'None'}. Estimated Price: $${configSummary.totalPrice.toLocaleString()}.`,
          });
        }}
      />

      {/* 6. Dedicated 360° Cinematic Studio Turntable Section (Videos 2, 3, 4) */}
      <Showroom360Section
        onOpenDetails={(carId) => setSelectedVehicleId(carId)}
        onBookTestDrive={(carName) =>
          handleOpenBooking({
            bookingType: 'test-drive',
            vehicleModel: carName,
            notes: `VIP Test-Drive Request for ${carName} after 360° Studio Inspection.`,
          })
        }
      />

      {/* 7. Bespoke Automotive Services */}
      <ServicesSection
        onSelectService={(service) => setSelectedService(service)}
        onBookService={(serviceId) =>
          handleOpenBooking({
            bookingType: 'service',
            serviceId,
            notes: `Service booking reservation for selected tier.`,
          })
        }
      />

      {/* 8. Interactive Before & After Transformation Slider */}
      <BeforeAfterSlider />

      {/* 9. Smart Price Estimator & Package Builder */}
      <PriceEstimatorSection
        onLockInPackage={(pkg) =>
          handleOpenBooking({
            bookingType: 'service',
            estimatedPrice: pkg.totalPrice,
            notes: `Custom Package: Class: ${pkg.vehicleClass}. Services: ${pkg.services.join(', ')}. Add-Ons: ${pkg.addOns.join(', ') || 'None'}. Est. Time: ${pkg.totalHours} hrs. Est. Total: $${pkg.totalPrice.toLocaleString()}.`,
          })
        }
      />

      {/* 10. Visual Media Showreel Gallery */}
      <ShowreelGallery />

      {/* 11. About VANTA Manifesto by 7P STUDIO */}
      <AboutSection />

      {/* 12. Concept Testimonials */}
      <TestimonialsSection />

      {/* 13. VIP Contact & Concierge Form */}
      <ContactSection />

      {/* 14. Luxury Automotive Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* ========================================================= */}
      {/* MODALS & DRAWERS */}
      {/* ========================================================= */}

      {/* Vehicle Detail Dossier Modal */}
      <VehicleDetailModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicleId(null)}
        onOpenConfigurator={(carId) => {
          setSelectedVehicleId(null);
          handleOpenConfigurator(carId);
        }}
        onBookTestDrive={(carName) => {
          setSelectedVehicleId(null);
          handleOpenBooking({
            bookingType: 'test-drive',
            vehicleModel: carName,
          });
        }}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={selectedVehicle ? favorites.includes(selectedVehicle.id) : false}
        onToggleCompare={handleToggleCompare}
        inCompare={selectedVehicle ? compareList.includes(selectedVehicle.id) : false}
      />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookService={(serviceId) => {
          setSelectedService(null);
          handleOpenBooking({
            bookingType: 'service',
            serviceId,
          });
        }}
      />

      {/* Vehicle Comparison Modal */}
      {isCompareOpen && (
        <VehicleCompareModal
          compareIds={compareList}
          onClose={() => setIsCompareOpen(false)}
          onRemoveFromCompare={(carId) => handleToggleCompare(carId)}
          onOpenConfigurator={(carId) => {
            setIsCompareOpen(false);
            handleOpenConfigurator(carId);
          }}
          onBookTestDrive={(carName) => {
            setIsCompareOpen(false);
            handleOpenBooking({
              bookingType: 'test-drive',
              vehicleModel: carName,
            });
          }}
        />
      )}

      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onRemoveFavorite={handleToggleFavorite}
        onOpenDetails={(carId) => {
          setIsFavoritesOpen(false);
          setSelectedVehicleId(carId);
        }}
        onOpenConfigurator={(carId) => {
          setIsFavoritesOpen(false);
          handleOpenConfigurator(carId);
        }}
        onBookTestDrive={(carName) => {
          setIsFavoritesOpen(false);
          handleOpenBooking({
            bookingType: 'test-drive',
            vehicleModel: carName,
          });
        }}
      />

      {/* Smart Booking Modal */}
      <SmartBookingModal
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setBookingPrefill(null);
        }}
        prefill={bookingPrefill}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
      </div>
    </div>
  );
};

export function App() {
  return (
    <LanguageProvider>
      <VantaExperience />
    </LanguageProvider>
  );
}

export default App;
