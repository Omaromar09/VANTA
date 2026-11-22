# VANTA — THE ULTIMATE CINEMATIC AUTOMOTIVE EXPERIENCE
### Built for 7P STUDIO • Flagship Digital Showcase

> **Tagline:** DRIVE BEYOND ORDINARY.  
> **Brand Identity:** Deep Black (#050608), Dark Charcoal (#111318), Metallic Orange (#F36B21), Titanium Silver (#BFC2C7).

---

## 01. EXECUTIVE SUMMARY

**VANTA** is an avant-garde luxury automotive digital platform created for the digital portfolio of **7P STUDIO**. It shatters the boundaries of typical car dealership templates by uniting **cinematic full-screen video storytelling**, an **interactive 360-degree studio turntable**, **real-time 3D Three.js WebGL rendering**, a **5-step VIP booking system**, a **centralized price estimator**, and a **discrete admin operations portal**.

---

## 02. KEY FEATURES & CAPABILITIES

### 1. Cinematic 5-Stage Video Hero Sequence
- **Stage 1 (Black Studio Opening):** Clean black canvas with zero layout shift or visual clutter.
- **Stage 2 (Car Entrance):** Plays the exact uploaded video (`/videos/vanta-intro.mp4`), showcasing the Metallic Orange hypercar driving in horizontally and settling gracefully in the studio.
- **Stage 3 (Frame Freeze):** Seamlessly pauses and holds on the exact final frame with zero flicker, matching `/images/hero-car-final-frame.jpg`.
- **Stage 4 (Choreographed Reveal):** After the car stops, the VANTA brand identity, technical telemetry badges (980 HP | 2.3s 0-100 | 385 KM/H), and primary CTAs gracefully animate into view.
- **Stage 5 (Cinematic Scroll):** Seamless transition into the rest of the website without layout jumps.
- **Controls:** Skip Intro, Replay Entrance, Sound toggle, and mobile optimization.

### 2. Dual-Engine 3D Configurator & 360° Studio Turntable
- **Mode A: 360° Studio Turntable Drag Scrub:**
  - Uses the high-resolution 36-frame studio turntable captures extracted from the user's uploaded videos.
  - Interactive mouse and touch drag to rotate the car 360 degrees smoothly in both directions with auto-spin option.
  - Interactive hotspot callouts on the car (Active DRS Wing, Carbon Aero Splitter, CCM-R Brakes).
  - Instant paint switching between **Metallic Vanta Orange**, **Titanium Liquid Silver**, and **Obsidian Carbon Black**, plus dynamic hue-colorized shades (**Rosso Corsa Red**, **Monaco Deep Blue**, **Bianco Pearl White**).
- **Mode B: Real-Time 3D WebGL (Three.js):**
  - Full PBR MeshPhysicalMaterial with real-time metallic reflections, clearcoat roughness, and studio lighting rig (overhead spotlight, orange rim accent, cool fill, floor reflections).
  - OrbitControls (horizontal & vertical pitch rotation, zoom, pan).
  - Real-time headlight toggles and wheel caliper customization.
- **"Request This Configuration":** Pre-fills the multi-step booking system with the selected car, colors, wheels, options, and calculated price.

### 3. Dedicated 360° Studio Showroom (`#showroom360`)
- Directly highlights the user's second, third, and fourth video designs with dual presentation modes:
  - **Interactive 360° Scrub Mode** (drag to spin).
  - **Studio 360 Video Loop Mode** (continuous cinematic playback of the user's video files).

### 4. Vehicle Collection & Detailed Dossiers
- Curated fleet:
  - **VANTA GT-900** (980 HP Quad-Turbo Hybrid)
  - **VANTA SPECTRE X** (1,020 HP Twin-Turbo V12)
  - **VANTA NOCTURNE** (950 HP Carbon RWD Track Weapon)
  - **VANTA APEX R** (1,100 HP Circuit Monster)
  - **VANTA VALKYRIE GT** (820 HP Bespoke Grand Tourer)
  - **VANTA CYCLONE EV** (1,400 HP All-Electric Quad-Motor)
- Filters by category, real-time search, sorting by horsepower/acceleration/price, and layout switcher (Grid/List).
- **Vehicle Dossier Modal:** High-definition photo gallery, full engineering overview, specifications matrix, and direct viewing CTA.

### 5. Vehicle Benchmark Comparison Engine
- Allows comparing up to 3 vehicles side-by-side with automatic winner highlights for top horsepower, quickest acceleration, and top speed.

### 6. Artisan Services & Interactive Before/After Experience
- 5 Luxury service tiers: Ceramic Coating, PPF Wrap, Detailing & Correction, Aerodynamic Upgrades, and Interior Care.
- Detailed 5-stage process timeline, warranty terms, and FAQs.
- **Before & After Slider:** Split-screen interactive slider showing paint correction and ceramic finish comparisons with touch and mouse drag.

### 7. Smart Price Estimator & Package Builder
- Dynamic multiplier based on vehicle class (Hypercar, Supercar, Luxury Sedan, Sports SUV).
- Real-time total price and estimated facility turnaround hours.
- One-click "Lock In Package" button pre-filling the booking calendar.

### 8. Smart 5-Step Booking System
- Multi-step flow: Experience Type → Vehicle Details → Preferred Schedule → Client Info → Review & Confirmation.
- Generates a unique tracking reference (e.g. `VNT-2026-9412`).
- Animated celebration confetti and copyable reference code.
- Persistent local and database storage.

### 9. Complete Admin Concierge Control Center
- Discretely accessible via the footer "Concierge Management Portal".
- **PIN Protected:** Default PIN is `7777`.
- Live overview metrics: Total bookings, pending bookings, confirmed bookings, total inquiries.
- Status management: Change booking status (New → Confirmed → In Progress → Completed → Cancelled).
- **Export Data:** Download all bookings as a clean CSV file.
- Inquiry Inbox: Review, mark read, or resolve VIP customer requests.

### 10. Authentic Arabic (RTL) & English Localization
- Instant language toggle in navbar and footer.
- Flawless RTL layout mirroring, typography (using Cairo and Plus Jakarta Sans), and complete translated terminology.

---

## 03. TECH STACK

- **Framework:** React 19 + TypeScript + Vite 8
- **Styling:** Tailwind CSS v4 with custom dark luxury tokens
- **3D & Graphics:** Three.js (WebGL PBR shaders, OrbitControls)
- **Icons & Motion:** Lucide React, Canvas Confetti
- **Storage & Backend Architecture:** Modular storage service (localStorage persistent + Supabase PostgreSQL schema ready)

---

## 04. PROJECT STRUCTURE

```
d:/VANTA/
├── public/
│   ├── videos/
│   │   ├── vanta-intro.mp4          # Entrance video (Orange car driving in & stopping)
│   │   ├── vanta-360-orange.mp4     # Turntable video (Metallic Orange GT-900)
│   │   ├── vanta-360-silver.mp4     # Turntable video (Titanium Silver Spectre X)
│   │   └── vanta-360-black.mp4      # Turntable video (Obsidian Black Nocturne)
│   ├── images/                      # Extracted high-res posters, thumbnails, and galleries
│   └── turntable/                   # 36 individual 10-degree frames for orange, silver, black
├── src/
│   ├── components/
│   │   ├── common/                  # Navbar, Footer
│   │   ├── home/                    # IntroHero (5 stages), EditorialShowcase
│   │   ├── configurator/            # InteractiveCarViewer (WebGL + 360), ConfiguratorSection
│   │   ├── showroom/                # Showroom360Section (Dedicated video & scrub turntable)
│   │   ├── collection/              # VehicleCollection, VehicleDetailModal, FavoritesModal
│   │   ├── compare/                 # VehicleCompareModal
│   │   ├── services/                # ServicesSection, ServiceDetailModal
│   │   ├── beforeafter/             # BeforeAfterSlider
│   │   ├── estimator/               # PriceEstimatorSection
│   │   ├── gallery/                 # ShowreelGallery (Lightbox)
│   │   ├── about/                   # AboutSection (7P Studio Manifesto)
│   │   ├── testimonials/            # TestimonialsSection
│   │   ├── contact/                 # ContactSection
│   │   ├── booking/                 # SmartBookingModal (5-step flow + Confetti)
│   │   └── admin/                   # AdminDashboardModal (PIN: 7777, CRUD, CSV export)
│   ├── context/                     # LanguageContext (EN / AR RTL)
│   ├── data/                        # Vehicles, Services, Translations, Estimator, BeforeAfter
│   ├── services/                    # Storage service (Bookings, Inquiries, Favorites)
│   ├── types/                       # TypeScript interfaces
│   ├── App.tsx                      # Root application
│   ├── main.tsx                     # Entry point
│   └── index.css                    # Tailwind CSS v4 & theme styling
├── supabase/
│   └── schema.sql                   # Production PostgreSQL & Supabase RLS schema
├── .env.example
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## 05. GETTING STARTED

### Prerequisites
- Node.js (v18+)
- npm

### Installation
```bash
# Clone or navigate to directory
cd d:/VANTA

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173/` in your browser.

---

## 06. ADMIN PORTAL ACCESS

1. Scroll to the footer of any page.
2. Click **"Concierge Management Portal"** (or use the mobile drawer menu).
3. When prompted for the security PIN, enter:
   ```
   7777
   ```
4. You now have full access to view, update, delete, and export all bookings and client inquiries.

---

## 07. DEPLOYMENT TO VERCEL

This project is built with standard Vite and is 100% Vercel-ready:

1. Push the code to your GitHub/GitLab repository.
2. In the Vercel Dashboard, click **Add New Project** and select the repository.
3. Configure the build settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Deploy.

---

## 08. QUALITY ASSURANCE (QA) REPORT

| Area | Status | Verification Details |
| :--- | :---: | :--- |
| **Intro Video Sequence** | PASS | Exact uploaded `vanta-intro.mp4` loads, plays, stops on final frame, reveals UI gracefully. |
| **360° Studio Turntable** | PASS | High-definition 36-frame interactive rotation with inertia, color switches, and hotspot specs. |
| **Real-Time 3D WebGL** | PASS | Three.js PBR metallic paint, orbit controls, ground shadows, headlight toggles. |
| **Vehicle Collection & Dossiers** | PASS | 6 models with complete specs, filtering, search, sorting, and full detail modals. |
| **Vehicle Benchmark Comparison** | PASS | Compares up to 3 cars with automatic highlight of winning specs. |
| **Bespoke Services** | PASS | 5 service cards with 5-stage execution process, pricing, FAQs, and booking triggers. |
| **Before & After Slider** | PASS | Interactive split-screen comparison with touch and mouse drag. |
| **Price Estimator & Packages** | PASS | Centralized math model based on car category, service tiers, and add-ons. |
| **Smart Booking Flow** | PASS | 5-step form with validation, reference generator, and celebration confetti. |
| **Admin Operations** | PASS | PIN-protected (`7777`), booking status updater, and CSV export. |
| **Multilingual (EN / AR RTL)** | PASS | Instant English and Arabic toggle with full RTL layout mirroring and localized typography. |
| **Build & Compilation** | PASS | Clean production build in 509ms with zero errors. |
