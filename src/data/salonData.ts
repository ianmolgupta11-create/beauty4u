import { ServiceItem, Stylist, InstagramPost, ClientReview } from '../types';

export const SALON_INFO = {
  name: 'Beauty 4 U Bathurst',
  tagline: 'Bespoke Hair Artistry, Advanced Dermal Therapies & Luxury Beauty',
  established: '2010',
  address: '223 George St, Bathurst, NSW 2795',
  phone: '(02) 6334 3369',
  email: 'Beauty4ubathurst@outlook.com',
  instagram: '@beauty4ubathurst',
  instagramUrl: 'https://www.instagram.com/beauty4ubathurst/',
  facebook: 'Beauty 4 U Bathurst',
  facebookUrl: 'https://www.facebook.com/beauty4ubathurst/',
  tiktok: '@beauty4ubathurst',
  hours: [
    { day: 'Monday', hours: '9:00 AM – 5:30 PM' },
    { day: 'Tuesday', hours: '9:00 AM – 5:30 PM' },
    { day: 'Wednesday', hours: '9:00 AM – 5:30 PM' },
    { day: 'Thursday', hours: '9:00 AM – 5:30 PM' },
    { day: 'Friday', hours: '9:00 AM – 5:30 PM' },
    { day: 'Saturday', hours: 'By Appointment / Special Events' },
    { day: 'Sunday', hours: 'Closed' }
  ],
  stats: [
    { label: 'Years of Beauty & Hair Mastery', value: '15+' },
    { label: '5-Star Client Reviews', value: '480+' },
    { label: 'Specialist Treatment Rooms', value: 'Dermal & Hair' },
    { label: 'Master Therapists & Stylists', value: '5' }
  ]
};

export const SERVICES_DATA: ServiceItem[] = [
  // Hair Cutting & Styling
  {
    id: 'cut-style-female',
    name: 'Ladies Precision Cut, Sensory Basin Wash & Signature Blow-dry',
    category: 'haircuts',
    price: 95,
    durationMinutes: 60,
    description: 'Detailed face-shape consultation, relaxing shampoo ritual, precision scissor architecture, and bouncy blow-dry styling.',
    tag: 'Popular Choice',
    includesConsultation: true
  },
  {
    id: 'restyle-transformation',
    name: 'Complete Restyle & Makeover Cut',
    category: 'haircuts',
    price: 125,
    durationMinutes: 75,
    description: 'Transformative length change, heavy texture de-bulking, curtain fringe framing, and tailored styling advice.',
    includesConsultation: true
  },
  {
    id: 'blowdry-event',
    name: 'Luxe Glamour Blowout & GHD Heat Wave Sculpting',
    category: 'haircuts',
    price: 65,
    durationMinutes: 45,
    description: 'Volumising wash, round-brush finish or loose beach waves with professional thermal protection.'
  },
  {
    id: 'cut-mens',
    name: 'Men’s Tailored Scissor & Clipper Cut',
    category: 'haircuts',
    price: 45,
    durationMinutes: 30,
    description: 'Precision scissor over comb, clean neckline taper, invigorating wash, and matte styling product application.'
  },
  
  // Colour & Blondes
  {
    id: 'balayage-artisanal',
    name: 'Dimensional Lived-in Balayage & Custom Root Shadow Melt',
    category: 'colour-blondes',
    price: 260,
    durationMinutes: 180,
    description: 'Hand-painted freehand ribbons or micro-foils, seamless root melt for soft grow-out, and high-shine conditioning gloss toner.',
    tag: 'Signature Service',
    includesConsultation: true
  },
  {
    id: 'full-head-foils',
    name: 'Full Head Multi-Tonal Blonde Micro Foils',
    category: 'colour-blondes',
    price: 230,
    durationMinutes: 150,
    description: 'Fine weaves placed systematically for luminous all-over blonde radiance. Includes tailored gloss toner.',
    includesConsultation: true
  },
  {
    id: 'half-head-foils',
    name: 'Half Head Refresh Foils & Face-Framing Money Piece',
    category: 'colour-blondes',
    price: 175,
    durationMinutes: 120,
    description: 'Crown, parting, and hairline blonde illumination to maintain brightness between full foil appointments.'
  },
  {
    id: 'root-touch-gloss',
    name: 'Permanent Grey Retouch & Gloss Ends Revitalisation',
    category: 'colour-blondes',
    price: 120,
    durationMinutes: 90,
    description: 'Flawless 100% grey coverage with nourishing gentle formula and gloss seal through mid-lengths.'
  },

  // Advanced Hair Straightening & Extensions
  {
    id: 'nanoplasty-smoothing',
    name: 'Nanoplasty Organic Hair Straightening & Anti-Frizz System',
    category: 'smoothing-treatments',
    price: 350,
    durationMinutes: 180,
    description: 'Revolutionary amino acid & collagen smoothing technology. Delivers mirror-like glass hair, eliminates 100% frizz, and restores strength for up to 6 months without formaldehyde.',
    tag: 'Trending Star',
    includesConsultation: true
  },
  {
    id: 'keratin-microbond-ext',
    name: 'Keratin Microbond & Tape-In Hair Extensions',
    category: 'extensions',
    price: 490,
    durationMinutes: 120,
    description: '100% premium cuticle-intact human hair extensions for effortless length and natural volume. Includes custom blending cut and style.',
    includesConsultation: true
  },
  {
    id: 'deep-conditioning-ritual',
    name: 'Intensive Dermal Scalp & Bond Repair Treatment',
    category: 'smoothing-treatments',
    price: 60,
    durationMinutes: 30,
    description: 'Targeted hydration therapy with warm steam infusion to restore compromised hair integrity.'
  },

  // Clinical Dermal, Skin & Facials
  {
    id: 'hydrodermabrasion-full',
    name: 'Hydrodermabrasion Deep Aqua Infusion Facial',
    category: 'spa-wellness',
    price: 150,
    durationMinutes: 60,
    description: 'Diamond-tip aquatic exfoliation with targeted peptide serum infusion to deeply extract pores, banish dullness, and flood skin with hydration.',
    tag: 'Skin Signature'
  },
  {
    id: 'dermalogica-pro-peel',
    name: 'Dermalogica Pro Power Chemical Peel',
    category: 'spa-wellness',
    price: 130,
    durationMinutes: 45,
    description: 'Customized multi-acid resurfacing peel targeting hyperpigmentation, fine lines, acne scarring, and uneven texture with zero downtime.'
  },
  {
    id: 'collagen-induction',
    name: 'Collagen Induction Therapy (Medical Microneedling)',
    category: 'spa-wellness',
    price: 195,
    durationMinutes: 60,
    description: 'Precision dermal micro-channeling to stimulate natural elastin and collagen remodeling for firm, pore-refined skin.'
  },
  {
    id: 'signature-glow-facial',
    name: 'Beauty 4 U Signature Dermal Glow Facial',
    category: 'spa-wellness',
    price: 110,
    durationMinutes: 50,
    description: 'Double cleanse, botanical enzyme peel, soothing acupressure facial drainage, hydrating mask, and SPF protection.'
  },

  // Brows, Lashes & Waxing
  {
    id: 'korean-lash-lift',
    name: 'Korean Lash Lift, Keratin Nourish & Gloss Tint',
    category: 'spa-wellness',
    price: 85,
    durationMinutes: 50,
    description: 'Ultra-gentle lifting formula creating dramatic eye-opening curl and deep glossy midnight tint lasting 6–8 weeks.'
  },
  {
    id: 'hybrid-brow-sculpt',
    name: 'Hybrid Brow Dye Sculpt, Mapping & Precision Wax',
    category: 'spa-wellness',
    price: 75,
    durationMinutes: 40,
    description: 'Custom skin-staining hybrid dye formula that lasts up to 7 weeks on hair and 10 days on skin for an airbrushed look.'
  },
  {
    id: 'spray-tan-bronze',
    name: 'Body Bronzing Deluxe Full Body Spray Tan',
    category: 'spa-wellness',
    price: 45,
    durationMinutes: 20,
    description: 'Quick-drying, natural olive-tone organic bronzing mist for streak-free golden Bathurst sunshine glow.'
  },
  {
    id: 'deluxe-pedicure-spa',
    name: 'Deluxe Spa Pedicure & Foot Exfoliation Ritual',
    category: 'spa-wellness',
    price: 75,
    durationMinutes: 50,
    description: 'Aromatic foot soak, heel buff, sugar exfoliation, warm towel wrap, foot massage, and long-lasting polish finish.'
  },

  // Bridal & Formal
  {
    id: 'bridal-hair-makeup',
    name: 'Bridal Couture Hair Styling & Veil Fitting',
    category: 'bridal-events',
    price: 160,
    durationMinutes: 75,
    description: 'Romantic textured up-dos, hollywood glam waves, or bespoke bridal chignons curated for your milestone day.',
    includesConsultation: true
  },
  {
    id: 'formal-event-glam',
    name: 'Special Occasion Hair Styling & Event Waves',
    category: 'bridal-events',
    price: 90,
    durationMinutes: 50,
    description: 'Polished runway styling, textured boho braids, or sleek modern red carpet pony.'
  }
];

export const STYLISTS_DATA: Stylist[] = [
  {
    id: 'kailtyn-whyte',
    name: 'Kailtyn Whyte',
    role: 'Owner, Master Hairstylist & Beauty Therapist',
    experienceYears: 8,
    specialties: ['Hair Colouring & Foils', 'Nanoplasty & Keratin', 'Precision Cuts', 'Beauty Treatments'],
    bio: 'Owner of Beauty 4 U Bathurst, Kailtyn brings versatile master expertise across custom hair colouring, blonde foiling, Nanoplasty smoothing, precision cutting, and advanced beauty therapies. Passionate about empowering clients through personalized care.',
    signatureStyle: 'Seamless dimensional colour & polished bouncy blow-outs',
    favoriteProduct: 'Wella Color Touch & Deep Hydration Treatment',
    instagramHandle: '@beauty4ubathurst',
    rating: 5.0,
    reviewCount: 164,
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    accentColor: '#B08D57',
    avatarPlaceholderColor: '#F8F4EC',
    imageUrl: '/assets/team/kaitlyn.jpg'
  },
  {
    id: 'madeline-holding',
    name: 'Madeline Holding',
    role: 'Beauty Therapist',
    experienceYears: 7,
    specialties: ['Hydrodermabrasion Facials', 'Lash & Brow Artistry', 'Dermal Peels', 'Full Body Waxing'],
    bio: 'Madeline is dedicated to glowing skin health and bespoke brow and lash design. Her tailored facial therapies and meticulous attention to detail ensure a deeply relaxing, revitalizing visit at Beauty 4 U Bathurst.',
    signatureStyle: 'Aqua-infusion Hydrodermabrasion & Hybrid Brow Sculpting',
    favoriteProduct: 'Dermalogica Daily Microfoliant & Hydra-Gel',
    instagramHandle: '@beauty4ubathurst',
    rating: 5.0,
    reviewCount: 148,
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    accentColor: '#6B7A68',
    avatarPlaceholderColor: '#EEF2EC',
    imageUrl: '/assets/team/madeline.jpg'
  },
  {
    id: 'sienna-rozema',
    name: 'Sienna Rozema',
    role: 'Apprentice Hairdresser & Salon Assistant',
    experienceYears: 2,
    specialties: ['Relaxing Hair Washes & Scalp Massage', 'Blow Waves & Curls', 'Apprentice Specials', 'Hair Care'],
    bio: 'Sienna delivers exceptional basin care, dreamy scalp massages, and long-lasting blow waves and curls. Clients love her gentle technique and welcoming energy at Beauty 4 U Bathurst.',
    signatureStyle: 'Signature Relaxing Basin Massage & Bouncy Beach Curls',
    favoriteProduct: 'Mr Smith Luxury Masque & Leave-In Creme',
    instagramHandle: '@beauty4ubathurst',
    rating: 4.9,
    reviewCount: 92,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    accentColor: '#936D48',
    avatarPlaceholderColor: '#FAF5EE',
    imageUrl: '/assets/team/sienna.jpg'
  }
];

export const INSTAGRAM_POSTS_DATA: InstagramPost[] = [
  {
    id: 'post-1',
    author: 'beauty4ubathurst',
    stylistId: 'kailtyn-whyte',
    stylistName: 'Kailtyn Whyte',
    styleName: 'Nanoplasty Organic Hair Straightening Glass Shine',
    caption: 'Incredible Nanoplasty transformation today at Beauty 4 U Bathurst! Say goodbye to morning frizz, humidity fluff, and flat irons. 100% formaldehyde free, infused with organic amino acids for mirror-like shine and silkiness that lasts up to 6 months. ✨🤍',
    tags: ['#beauty4ubathurst', '#nanoplasty', '#bathurstsalon', '#glasshair', '#straightening', '#bathursthair', '#smoothhairgoals'],
    likes: 428,
    commentsCount: 36,
    postedAgo: '4 hours ago',
    category: 'treatments',
    formulaNote: 'Nanoplasty Bio-Active Collagen & Amino infusion',
    timeSpent: '3 hrs',
    serviceId: 'nanoplasty-smoothing',
    imageType: 'blonde-dimensional'
  },
  {
    id: 'post-2',
    author: 'beauty4ubathurst',
    stylistId: 'kailtyn-whyte',
    stylistName: 'Kailtyn Whyte',
    styleName: 'Sunlit Caramel Honey Lived-in Balayage',
    caption: 'Soft dimensional balayage ribbons hand-painted for our lovely client on George Street. Low-maintenance contrast designed to catch the Bathurst sunshine beautifully! 🌸',
    tags: ['#bathursthairdresser', '#livedinbalayage', '#beauty4ubathurst', '#foilayage', '#caramelblonde', '#bathurstnsw'],
    likes: 512,
    commentsCount: 29,
    postedAgo: '1 day ago',
    category: 'balayage',
    formulaNote: 'Multi-tonal baby foils + 9/73 peach champagne gloss',
    timeSpent: '2.5 hrs',
    serviceId: 'balayage-artisanal',
    imageType: 'balayage-caramel'
  },
  {
    id: 'post-3',
    author: 'beauty4ubathurst',
    stylistId: 'madeline-holding',
    stylistName: 'Madeline Holding',
    styleName: 'Hydrodermabrasion Aqua Infusion Dermal Glow',
    caption: 'Skin renewal day! Gentle diamond-tip aquatic suction clears away dead skin cells and blackheads while deeply infusing hyaluronic acid and peptides. Swipe to see that instant dewy hydration. 💧✨',
    tags: ['#hydrodermabrasion', '#beauty4ubathurst', '#bathurstspa', '#dermalskincare', '#bathurstskin', '#hydrafacial'],
    likes: 384,
    commentsCount: 22,
    postedAgo: '2 days ago',
    category: 'treatments',
    formulaNote: 'AHA/BHA suction cleanse + Hyaluronic peptide mask',
    timeSpent: '1 hr',
    serviceId: 'hydrodermabrasion-full',
    imageType: 'spa-sanctuary'
  },
  {
    id: 'post-4',
    author: 'beauty4ubathurst',
    stylistId: 'sienna-rozema',
    stylistName: 'Sienna Rozema',
    styleName: 'Deluxe Basin Head Massage & Bouncy Glamour Curls',
    caption: 'Relaxation at its best! Soothing basin scalp therapy followed by a voluminous blow wave and bouncy tong curls by our apprentice Sienna Rozema. 🌿✨',
    tags: ['#beauty4ubathurst', '#headmassage', '#bathursthairdresser', '#blowwave', '#curls'],
    likes: 467,
    commentsCount: 31,
    postedAgo: '3 days ago',
    category: 'treatments',
    timeSpent: '45 min',
    serviceId: 'cut-blowdry-signature',
    imageType: 'lived-in-beige'
  }
];

export const CLIENT_REVIEWS_DATA: ClientReview[] = [
  {
    id: 'review-1',
    clientName: 'Megan Connelly',
    stylistName: 'Kailtyn Whyte',
    serviceName: 'Nanoplasty Straightening & Cut',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Kailtyn at Beauty 4 U is absolutely wonderful! The Nanoplasty straightening was a total game-changer for my thick frizzy hair. It dries smooth in 5 minutes now. Warm, friendly atmosphere right on George Street!',
    verified: true
  },
  {
    id: 'review-2',
    clientName: 'Jessica Murphy',
    stylistName: 'Kailtyn Whyte',
    serviceName: 'Full Head Foils & Styling',
    rating: 5,
    date: '3 weeks ago',
    comment: 'Kailtyn did the most beautiful clean foils for me. No harsh lines, so soft and blended. Best hair experience I’ve had in Bathurst!',
    verified: true
  },
  {
    id: 'review-3',
    clientName: 'Sarah Higgins',
    stylistName: 'Madeline Holding',
    serviceName: 'Hydrodermabrasion Facial & Brow Sculpt',
    rating: 5,
    date: '1 month ago',
    comment: 'My skin was glowing for weeks after the Hydrodermabrasion treatment with Madeline. She really knows skin and recommended products that actually worked for my dry patches.',
    verified: true
  },
  {
    id: 'review-4',
    clientName: 'Chloe Bennett',
    stylistName: 'Sienna Rozema',
    serviceName: 'Apprentice Wash, Massage & Blow Wave',
    rating: 5,
    date: '1 month ago',
    comment: 'Sienna Rozema gave me the most incredible relaxing hair wash and head massage, followed by gorgeous curls. Fantastic attention to detail!',
    verified: true
  }
];

export const SPA_PACKAGES = [
  {
    id: 'package-sanctuary',
    name: 'The Beauty 4 U Signature Rejuvenation Package',
    duration: '2.5 Hours',
    price: 285,
    description: 'Our most loved combination of advanced facial dermal care and hair styling.',
    includes: [
      'Full Face & Neck Hydrodermabrasion Aqua Infusion',
      'Customized Dermalogica Botanical Sheet Mask & Neck Massage',
      'Korean Lash Lift or Hybrid Brow Sculpt Duo',
      'Signature Hair Wash & Glamour Blowout'
    ]
  },
  {
    id: 'package-glow',
    name: 'Event Ready Glow & Tan Package',
    duration: '1.5 Hours',
    price: 165,
    description: 'Perfect preparation before races, gala dinners, or weekend parties in Bathurst.',
    includes: [
      'Express Botanical Glow Facial with Enzyme Polish',
      'Full Body Bronzing Organic Spray Tan',
      'Express Basin Scalp Treatment & Finish'
    ]
  },
  {
    id: 'package-skin-renewal',
    name: 'Total Dermal Skin Reset & Peeling Ritual',
    duration: '2 Hours',
    price: 240,
    description: 'Designed for intensive skin clarifying, cellular renewal, and deep pore refinement.',
    includes: [
      'Double Deep Cleanse & Skin Analysis',
      'Dermalogica Pro Power Chemical Peel',
      'Collagen Bio-Matrix Hydra Mask',
      'LED Light Therapy & Acupressure Facial Drainage'
    ]
  }
];
