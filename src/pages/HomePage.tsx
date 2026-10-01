import React, { useState } from 'react';
import { ActivePage, InstagramPost, ServiceItem } from '../types';
import { SALON_INFO, SERVICES_DATA, STYLISTS_DATA, CLIENT_REVIEWS_DATA } from '../data/salonData';
import { SalonVisual } from '../components/SalonVisual';
import { ProfileAvatar } from '../components/ProfileAvatar';
import { HeroSlideshow } from '../components/HeroSlideshow';
import { useProfile } from '../context/ProfileContext';
import { 
  Calendar, 
  ArrowRight, 
  Sparkles, 
  CheckCircle, 
  Star, 
  Instagram, 
  Phone, 
  Clock, 
  Scissors, 
  Award, 
  ShieldCheck, 
  ChevronRight 
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: ActivePage) => void;
  onOpenBooking: (serviceId?: string, stylistId?: string) => void;
  onSelectPost?: (post: InstagramPost) => void;
}

const FounderPortraitFrame: React.FC<{ imageUrl: string | null }> = ({ imageUrl }) => {
  const [error, setError] = useState(false);

  const finalSrc = imageUrl || '/assets/team/kaitlyn.jpg';

  if (error) {
    return (
      <SalonVisual
        type="founder-portrait"
        alt="Kailtyn Whyte - Salon Owner & Master Stylist"
        stylistName="Kailtyn"
        className="w-full h-full object-cover"
      />
    );
  }

  return (
    <img
      src={finalSrc}
      alt="Kailtyn Whyte - Salon Owner & Master Stylist"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      onError={() => setError(true)}
      loading="lazy"
    />
  );
};

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking
}) => {
  const { 
    founderImage 
  } = useProfile();

  // Highlighted services for home spotlight
  const signatureServices = [
    SERVICES_DATA.find((s) => s.id === 'nanoplasty-smoothing')!,
    SERVICES_DATA.find((s) => s.id === 'hydrodermabrasion-full')!,
    SERVICES_DATA.find((s) => s.id === 'balayage-artisanal')!,
    SERVICES_DATA.find((s) => s.id === 'korean-lash-lift')!,
  ].filter(Boolean);

  return (
    <div className="space-y-20 sm:space-y-28 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-[#FAF8F5] pt-12 md:pt-20 lg:pt-24 border-b border-[#EDE6DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Col: Editorial Messaging */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Subtle kicker */}
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-widest uppercase text-[#936D48]">
                <span>223 George St, Bathurst</span>
                <span className="text-[#C4B8A5]">·</span>
                <span>Central West NSW</span>
                <span className="text-[#C4B8A5]">·</span>
                <span>Est. {SALON_INFO.established}</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#1A1816] tracking-tight leading-[1.1] text-balance">
                Where Hair Artistry Meets Dermal Wellness.
              </h1>

              <p className="text-base sm:text-lg text-[#5C554B] leading-relaxed max-w-xl">
                Bathurst’s premier destination for organic Nanoplasty straightening, sunlit blondes, Hydrodermabrasion aqua facials, Korean lash lifts, and bespoke beauty rituals.
              </p>

              {/* Primary Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="px-7 py-3.5 bg-[#24201D] hover:bg-[#3D352E] text-[#FAF8F5] text-xs font-semibold tracking-wider uppercase rounded-md shadow-md hover:shadow-lg transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#E6CBA8]" />
                  <span>Reserve Appointment</span>
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="px-6 py-3.5 border border-[#DDD3C3] text-[#24201D] hover:bg-[#EFEAE1] text-xs font-semibold tracking-wider uppercase rounded-md transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Treatment Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trust markers */}
              <div className="pt-6 border-t border-[#EAE3D7] grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#6B6358]">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#936D48] shrink-0" />
                  <span>Nanoplasty Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#936D48] shrink-0" />
                  <span>Dermalogica Expert</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-600 shrink-0 fill-amber-600" />
                  <span>480+ 5-Star Reviews</span>
                </div>
              </div>
            </div>

            {/* Right Col: High-Fidelity Hero Visual Frame & Automated Slideshow */}
            <div className="lg:col-span-5 relative">
              <HeroSlideshow onNavigateTeam={() => onNavigate('team')} />
            </div>

          </div>
        </div>

        {/* Bottom subtle metrics bar */}
        <div className="mt-16 bg-[#F2ECE1] border-t border-[#E5DCCE] py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {SALON_INFO.stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917] tabular-nums">
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#7A7165] uppercase tracking-wider font-medium">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. SIGNATURE OFFERINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs uppercase font-semibold tracking-widest text-[#936D48]">
              Curated Menu
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1C1917] mt-1">
              Signature Beauty & Hair Rituals
            </h2>
            <p className="text-sm text-[#6B6358] max-w-xl mt-2">
              Every appointment at Beauty 4 U includes a personalized consultation, sensory head massage, and custom tone balancing.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="text-xs font-semibold uppercase tracking-wider text-[#1C1917] hover:text-[#936D48] flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
          >
            <span>View Full Treatment Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Featured Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-[#E5DDD0] p-6 flex flex-col justify-between hover:shadow-lg hover:border-[#C4B7A5] transition-all group text-left"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#8A8174] mb-3">
                  <span className="uppercase tracking-wider font-semibold text-[#936D48]">
                    {service.tag || 'Popular'}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{service.durationMinutes} min</span>
                  </div>
                </div>

                <h3 className="text-lg font-serif font-semibold text-[#1C1917] leading-snug group-hover:text-[#936D48] transition-colors">
                  {service.name}
                </h3>

                <p className="text-xs text-[#6B6358] leading-relaxed mt-2.5">
                  {service.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F0ECE3] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8C8377] block uppercase">Investment</span>
                  <span className="text-base font-bold text-[#1C1917] tabular-nums">
                    ${service.price} <span className="text-xs font-normal text-[#8C8377]">AUD</span>
                  </span>
                </div>

                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="px-3.5 py-2 bg-[#24201D] group-hover:bg-[#936D48] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. FOUNDER & PHILOSOPHY SPOTLIGHT */}
      <section className="bg-[#24201D] text-[#FAF8F5] py-20 border-y border-[#3D352E]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#52463C] aspect-square max-w-md mx-auto group bg-[#1C1917] shadow-2xl transition-all">
                {/* Founder Image: Saved in public assets or Default SVG */}
                <FounderPortraitFrame imageUrl={founderImage} />

                {/* Subtle gradient vignette for luxury contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />

                {/* Bottom Signature Tag */}
                <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between text-left">
                  <div>
                    <p className="text-xs font-bold text-white tracking-wide">Kailtyn Whyte</p>
                    <p className="text-[11px] text-[#E6CBA8]">Salon Owner & Master Stylist</p>
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-black/40 text-white/80 border border-white/10 backdrop-blur-xs">
                    Est. {SALON_INFO.established}
                  </span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs uppercase tracking-widest text-[#E6CBA8] font-semibold">
                Our Owner’s Ethos
              </span>

              <h2 className="text-3xl sm:text-4xl font-serif font-light leading-snug">
                “Beauty should feel effortless, nurturing, and empowering. When your hair and skin are at their healthiest, your inner confidence naturally radiates.”
              </h2>

              <p className="text-sm text-[#C9BEB2] leading-relaxed">
                Kailtyn Whyte leads Beauty 4 U Bathurst with a dedication to bespoke hair transformation, Nanoplasty smoothing, and clinical dermal therapy on George Street. Designed as a welcoming sanctuary where each client receives unhurried attention, master technique, and tailored care.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-6">
                <div>
                  <p className="text-lg font-serif font-bold text-[#FAF8F5]">Kailtyn Whyte</p>
                  <p className="text-xs text-[#E6CBA8]">Salon Owner & Master Stylist / Dermal Specialist</p>
                </div>
                <div className="h-8 w-[1px] bg-[#4A4036]" />
                <button
                  onClick={() => onNavigate('team')}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FAF8F5] hover:text-[#E6CBA8] transition-colors cursor-pointer"
                >
                  <span>Meet our Specialist Team</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BOUTIQUE SPOTLIGHT: Track Suit Sets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#1C1917] via-[#2E2721] to-[#1C1917] rounded-3xl p-8 sm:p-12 text-white border border-[#473E36] flex flex-col md:flex-row items-center justify-between gap-8 text-left shadow-xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-[11px] uppercase tracking-widest text-[#E6CBA8] font-semibold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E6CBA8]" />
              <span>Beauty 4 U Boutique Apparel</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium leading-tight">
              Track Suit Sets Collection
            </h2>
            <p className="text-xs sm:text-sm text-[#D1C7BB] leading-relaxed">
              Featuring our signature Hoodie ($55), Quarter Zip ($50), and Track Suit Pants ($50). Available in sizes XS, S, M, L, XL with in-salon pickup in Bathurst or delivery.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
            <button
              onClick={() => onNavigate('tracksuit-sets')}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#936D48] hover:bg-[#7D5B3A] text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explore Track Suit Sets</span>
              <ArrowRight className="w-4 h-4 text-[#FAF8F5]" />
            </button>
          </div>
        </div>
      </section>

      {/* 4. CLIENT PRAISE & REVIEWS */}
      <section className="bg-[#F5EFE6] py-20 border-y border-[#E2D6C5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
            <div className="flex items-center justify-center gap-1 text-amber-600">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-medium text-[#1C1917]">
              Bathurst’s Most Trusted Salon & Spa
            </h2>
            <p className="text-xs text-[#7A7165] uppercase tracking-wider">
              Over 480 Verified 5-Star Reviews Across Google & Fresha
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLIENT_REVIEWS_DATA.slice(0, 3).map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl p-6 border border-[#E0D5C4] shadow-xs flex flex-col justify-between text-left"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-0.5 text-amber-600">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#8C8377]">{review.date}</span>
                  </div>

                  <p className="text-xs text-[#4A433A] leading-relaxed italic">
                    “{review.comment}”
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#F0EBE1]">
                  <p className="text-xs font-bold text-[#1C1917]">{review.clientName}</p>
                  <p className="text-[11px] text-[#8C7A67]">
                    {review.serviceName} · with {review.stylistName}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. INSTANT ONLINE BOOKING BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#24201D] text-[#FAF8F5] rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden border border-[#3D352E] text-left">
          
          <div className="max-w-2xl relative z-10 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#E6CBA8] font-semibold">
              Seamless Salon Concierge
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-light leading-tight">
              Ready for Your Hair & Skin Renewal? Book Online Today.
            </h2>
            <p className="text-sm text-[#C9BEB2] leading-relaxed">
              Choose your favorite specialist, select your preferred date, and receive instant confirmation for your appointment on George Street, Bathurst.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onOpenBooking()}
                className="px-8 py-3.5 bg-[#936D48] hover:bg-[#7D5B3A] text-white text-xs font-semibold tracking-wider uppercase rounded-md shadow-lg transition-all active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#FAF8F5]" />
                <span>Open Online Booking Engine</span>
              </button>

              <a
                href={`tel:${SALON_INFO.phone.replace(/[^0-9]/g, '')}`}
                className="px-6 py-3.5 border border-[#52463B] text-[#FAF8F5] hover:bg-white/10 text-xs font-semibold tracking-wider uppercase rounded-md transition-all inline-flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#E6CBA8]" />
                <span>Call {SALON_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Decorative graphic flourish */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 pointer-events-none hidden md:block">
            <Scissors className="w-full h-full text-white transform rotate-45 translate-x-12" />
          </div>
        </div>
      </section>

    </div>
  );
};
