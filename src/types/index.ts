export type ServiceCategory = 
  | 'all'
  | 'haircuts'
  | 'colour-blondes'
  | 'extensions'
  | 'smoothing-treatments'
  | 'spa-wellness'
  | 'bridal-events';

export interface ServiceItem {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  durationMinutes: number;
  description: string;
  tag?: string;
  includesConsultation?: boolean;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  specialties: string[];
  bio: string;
  signatureStyle: string;
  favoriteProduct: string;
  instagramHandle: string;
  rating: number;
  reviewCount: number;
  availableDays: string[];
  accentColor: string;
  avatarPlaceholderColor: string;
  imageUrl?: string;
}

export interface InstagramPost {
  id: string;
  author: string;
  stylistId: string;
  stylistName: string;
  caption: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  postedAgo: string;
  category: 'blondes' | 'balayage' | 'cuts' | 'extensions' | 'treatments' | 'bridal';
  styleName: string;
  formulaNote?: string;
  timeSpent?: string;
  serviceId?: string;
  imageType?: 'blonde-dimensional' | 'balayage-caramel' | 'curls-brunette' | 'bob-precision' | 'copper-gloss' | 'extensions-glam' | 'lived-in-beige' | 'platinum-pearl' | 'spa-sanctuary';
  imageUrl?: string;
}

export interface ClientReview {
  id: string;
  clientName: string;
  stylistName: string;
  serviceName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface BookingDetails {
  serviceIds: string[];
  stylistId: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes: string;
  requiresPatchTest: boolean;
  appointmentRef?: string;
}

export type ActivePage = 'home' | 'tracksuit-sets' | 'services' | 'price-list' | 'team' | 'gallery' | 'spa' | 'contact' | 'book';
