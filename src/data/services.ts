import { AutomotiveService } from '../types';

export const services: AutomotiveService[] = [
  {
    id: 'ceramic-coating',
    title: '10H Nanotechnology Ceramic Coating',
    shortDesc: 'Permanent molecular quartz shield providing extreme hydrophobic water beading, chemical resistance, and diamond-like gloss depth.',
    fullDesc:
      'VANTA Ceramic Shield utilizes 10H hardness liquid quartz nanoparticles that cross-link directly with your vehicle’s factory clearcoat. The result is a hardened sacrificial barrier that resists swirl marks, acid rain, bird droppings, and UV oxidation while delivering an unyielding mirror reflection.',
    benefits: [
      '10H hardness rating on pencil hardness scale',
      'Ultra-hydrophobic self-cleaning contact angle > 115°',
      '5-Year written transferable warranty certificate',
      'Enhanced depth and clarity on metallic & solid paints',
      'UV blocking prevents premature pigment fading',
    ],
    process: [
      { step: 1, title: 'Multi-Stage Decontamination', description: 'pH-neutral snow foam bath, iron fallout removal, and clay bar treatment to eliminate all surface contaminants.' },
      { step: 2, title: 'Dual-Action Paint Correction', description: 'Microscopic leveling of clearcoat to remove swirls, holograms, and minor defects before sealing.' },
      { step: 3, title: 'Solvent Panel Wipe', description: 'Full surface wipe-down with isopropanol alcohol to ensure pure clearcoat contact.' },
      { step: 4, title: 'Dual-Layer Ceramic Application', description: 'Application of base coat for tensile bonding, followed by top coat for gloss and hydrophobicity.' },
      { step: 5, title: 'Infrared Shortwave Curing', description: 'Controlled IR baking at 65°C for 30 minutes per panel to lock the molecular lattice.' },
    ],
    duration: '2 to 3 Days',
    priceStartingAt: 1850,
    image: '/images/hero-car-final-frame.jpg',
    badge: 'Signature Finish',
    faqs: [
      { question: 'How long does the 10H ceramic coating last?', answer: 'Our 10H coating provides up to 5 years of verified protection when maintained with our annual inspection wash.' },
      { question: 'Can ceramic coating be applied over PPF?', answer: 'Yes! We frequently apply ceramic coating on top of paint protection film to give the film hydrophobic and anti-dirt properties.' },
    ],
  },
  {
    id: 'paint-protection-film',
    title: 'Bespoke Self-Healing Paint Protection Film (PPF)',
    shortDesc: 'Optically clear 8.5-mil polyurethane armour that heals scratches under solar heat and prevents stone chip impact damage.',
    fullDesc:
      'Engineered for track and high-speed road use, our Paint Protection Film is precision-cut using laser digital patterns tailored specifically to every contour of your vehicle. The advanced elastomeric polymer topcoat automatically reflows when exposed to heat, erasing swirl marks and light scratches instantly.',
    benefits: [
      'Self-healing elastomeric topcoat against light abrasions',
      'Superior stone chip and road debris puncture resistance',
      'Custom wrapped edges with zero visible seam lines',
      'Available in Ultra Gloss, Satin Matte, or Carbon Weave texture',
      '10-Year anti-yellowing and delamination guarantee',
    ],
    process: [
      { step: 1, title: 'Digital CAD Templating', description: 'Precision laser plotting matched to exact vehicle millimeter dimensions.' },
      { step: 2, title: 'Surface Sanitization', description: 'Cleanroom preparation removing all dust particles from jambs and edges.' },
      { step: 3, title: 'Slip-Solution Film Mounting', description: 'Wet application using specialized gel for bubble-free adhesion.' },
      { step: 4, title: 'Edge Tucking & Sealing', description: 'Wrapping film around hood, door, and fender edges for invisible finish.' },
      { step: 5, title: 'Heat Gun Stabilization', description: 'Post-heating edges to 90°C to activate memory seal.' },
    ],
    duration: '3 to 5 Days',
    priceStartingAt: 3400,
    image: '/images/spectre-front.jpg',
    badge: 'Maximum Defense',
    faqs: [
      { question: 'Will PPF damage my original factory paint upon removal?', answer: 'Not at all. When removed professionally with steam, genuine OEM paint remains pristine and identical to the day it was applied.' },
      { question: 'Can you wrap in Satin Matte to change the car finish?', answer: 'Yes! Our Satin Matte PPF transforms any gloss car into a frozen satin stealth finish while providing the same rock-solid protection.' },
    ],
  },
  {
    id: 'detailing-polishing',
    title: 'Master-Level Concours Detailing & Polishing',
    shortDesc: 'Multi-stage rotary and random-orbital paint correction achieving 98%+ optical clarity and flawless reflection.',
    fullDesc:
      'Standard detailing cleans; VANTA Concours Detailing restores vehicles to better-than-factory perfection. Utilizing electronic paint depth gauges and microscopic inspection lamps, our master detailers level out factory orange peel, sand scratches, and wash marring to uncover jewel-like gloss.',
    benefits: [
      '95% - 99% swirl mark and hologram defect elimination',
      'Digital paint depth meter monitoring on every metal and carbon panel',
      'Exhaust tip mirror polishing & wheel drum cleaning',
      'Jeweling polish stage using ultra-fine micro-abrasives',
      'Swissvax carnauba or synthetic sealant base coat applied',
    ],
    process: [
      { step: 1, title: 'Depth Profiling', description: 'Measuring clearcoat thickness across 40+ reference points.' },
      { step: 2, title: 'Heavy Cut Correction', description: 'Wool pad rotary compounding for deep oxidation and scratch removal.' },
      { step: 3, title: 'Refining Polish', description: 'Foam pad dual-action polishing to eliminate compounding haze.' },
      { step: 4, title: 'Jeweling Polish', description: 'Ultra-soft pad finishing pass generating the signature deep liquid gloss.' },
      { step: 5, title: 'Polymer Sealant Shield', description: 'Hydrophobic spray sealant applied for instant slickness.' },
    ],
    duration: '1 to 2 Days',
    priceStartingAt: 950,
    image: '/images/nocturne-front.jpg',
    badge: 'Concours Grade',
    faqs: [
      { question: 'How much clearcoat is removed during polishing?', answer: 'Our master detailers take away only 1 to 2 microns of clearcoat, leaving more than 95% of your factory layer completely intact.' },
    ],
  },
  {
    id: 'exterior-customization',
    title: 'Bespoke Aerodynamics & Exterior Upgrades',
    shortDesc: 'Wind-tunnel tested carbon fiber splitters, diffusers, forged wheel retrofits, and titanium exhaust installations.',
    fullDesc:
      'Elevate your vehicle from extraordinary to singular. VANTA specializes in dry pre-preg autoclave carbon fiber aero components, custom center-lock forged wheel fitment, bespoke painted accent striping, and valvetronic titanium exhaust systems that alter the acoustic character of your engine.',
    benefits: [
      'Dry autoclave pre-preg carbon fiber (2x2 twill & forged carbon)',
      'Custom wheel offset and stance alignment for flush fitment',
      'Valvetronic titanium exhaust systems with remote valve switch',
      'Bespoke caliper paint customization with custom heat-resistant logos',
      'Functional aerodynamic downforce enhancements',
    ],
    process: [
      { step: 1, title: '3D Scan & Render Consultation', description: 'Digital scanning and 3D preview of carbon components on your vehicle model.' },
      { step: 2, title: 'Component Inspection', description: 'Quality inspection of carbon weave symmetry and structural rigidity.' },
      { step: 3, title: 'Precision Mounting', description: 'Factory chassis mounting points utilized without destructive drilling.' },
      { step: 4, title: 'Aero Alignment & Torquing', description: 'Torquing all fasteners to motorsport spec with threadlocker.' },
      { step: 5, title: 'Track or Dynamic Road Test', description: 'Verification of zero vibrations and acoustic exhaust harmonics.' },
    ],
    duration: '3 to 7 Days',
    priceStartingAt: 4500,
    image: '/images/gt900-side.jpg',
    badge: 'Custom Engineering',
    faqs: [
      { question: 'Are the carbon parts functional or purely cosmetic?', answer: 'All VANTA aerodynamic parts are developed and tested for genuine aerodynamic downforce and high-speed stability.' },
    ],
  },
  {
    id: 'interior-care',
    title: 'Artisan Interior Detailing & Leather Restoration',
    shortDesc: 'pH-balanced Swiss leather conditioning, Alcantara fiber rejuvenation, steam sterilization, and ceramic leather shielding.',
    fullDesc:
      'The cockpit is where the driver interacts with the soul of the machine. Our interior specialists restore aniline leather, deep-clean delicate Alcantara fibers, and apply breathable hydrophobic ceramic coatings to protect light-colored leather from denim dye transfer and UV cracking.',
    benefits: [
      'Steam sterilization reaching deep air vent ducts and hidden seams',
      'Alcantara pile brushing and hydrophobic barrier application',
      'Leather recoloring and crack repair by certified master artisans',
      'Ceramic leather shield prevents denim dye stains and spill penetration',
      'Odor neutralization leaving an authentic luxury leather bouquet',
    ],
    process: [
      { step: 1, title: 'Dry Extraction & HEPA Vacuuming', description: 'Clearing all micro-debris from carpets, seams, and seat perforations.' },
      { step: 2, title: 'Low-Moisture Steam Cleansing', description: 'Sanitizing dashboard, console, and door cards without water soaking.' },
      { step: 3, title: 'Enzyme Leather Scrub', description: 'Gentle horsehair brush scrubbing with natural pH-balanced leather soap.' },
      { step: 4, title: 'Essential Oil Leather Conditioning', description: 'Replenishing natural tanning oils for supple texture without greasy residue.' },
      { step: 5, title: 'Ceramic Leather Hydro-Shield', description: 'Invisible hydrophobic coating applied to all high-contact bolster areas.' },
    ],
    duration: '1 Day',
    priceStartingAt: 750,
    image: '/images/gt900-rear.jpg',
    badge: 'Artisan Cabin',
    faqs: [
      { question: 'Will ceramic leather coating make the seats shiny or slippery?', answer: 'No. Our coating cures to a completely natural matte finish with OEM tactile softness and zero slip.' },
    ],
  },
];
