import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';
import { SalonVisual } from '../components/SalonVisual';
import { Stylist } from '../types';
import { 
  Calendar, 
  Instagram, 
  Star, 
  Clock, 
  Sparkles, 
  Check 
} from 'lucide-react';

interface TeamPageProps {
  onOpenBooking: (serviceId?: string, stylistId?: string) => void;
}

const StylistPortrait: React.FC<{ stylist: Stylist }> = ({ stylist }) => {
  const [hasError, setHasError] = useState(false);

  if (!stylist.imageUrl || hasError) {
    return (
      <SalonVisual
        type="stylist-avatar"
        alt={stylist.name}
        stylistName={stylist.name}
        className="w-full h-full"
      />
    );
  }

  return (
    <img
      src={stylist.imageUrl}
      alt={stylist.name}
      onError={() => setHasError(true)}
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
    />
  );
};

export const TeamPage: React.FC<TeamPageProps> = ({ onOpenBooking }) => {
  const { teamMembers } = useProfile();

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pb-4">
        <span className="text-xs uppercase tracking-widest text-[#936D48] font-semibold">
          Master Craftsmanship
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-medium text-[#1C1917]">
          Meet Our Team
        </h1>
        <p className="text-sm sm:text-base text-[#6B6358] leading-relaxed">
          Meet our dedicated hair and beauty professionals at Beauty 4 U Bathurst — providing personalized hair artistry, clinical dermal care, and relaxing salon rituals.
        </p>
      </div>

      {/* Team Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((stylist) => (
          <div
            key={stylist.id}
            className="bg-white rounded-2xl border border-[#E5DDD0] overflow-hidden hover:shadow-xl hover:border-[#C4B7A5] transition-all flex flex-col justify-between text-left group"
          >
            <div>
              {/* Stylist Portrait Frame */}
              <div className="aspect-[4/3] bg-[#EFEAE1] relative overflow-hidden">
                <StylistPortrait stylist={stylist} />

                {/* Subtle vignette for luxury styling */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-[#1C1917] flex items-center gap-1 shadow-xs z-10">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span className="tabular-nums">{stylist.rating}</span>
                  <span className="text-[#8C8173] text-[10px]">({stylist.reviewCount})</span>
                </div>
              </div>

              {/* Profile Details */}
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-serif font-bold text-[#1C1917]">
                      {stylist.name}
                    </h3>
                    {stylist.instagramHandle && (
                      <a
                        href="https://www.instagram.com/beauty4ubathurst/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#8C8173] hover:text-[#936D48] flex items-center gap-1 font-mono transition-colors"
                        title="Beauty 4 U Instagram"
                      >
                        <Instagram className="w-3.5 h-3.5 text-[#936D48]" />
                        <span>{stylist.instagramHandle}</span>
                      </a>
                    )}
                  </div>

                  <p className="text-xs font-semibold text-[#936D48] mt-0.5">
                    {stylist.role}
                  </p>

                  <span className="inline-block mt-1 text-[11px] text-[#7A7165] font-mono">
                    {stylist.experienceYears} Years Master Experience
                  </span>
                </div>

                <p className="text-xs text-[#5C554B] leading-relaxed">
                  {stylist.bio}
                </p>

                {/* Specialties tags */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#8A8174] block">
                    Specialist Focus:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {stylist.specialties.map((spec) => (
                      <span
                        key={spec}
                        className="text-[11px] bg-[#F4EFE6] text-[#4A433A] px-2 py-0.5 rounded border border-[#E8E0D2]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Signature technique & favorite product */}
                {(stylist.signatureStyle || stylist.favoriteProduct) && (
                  <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#EDE6DC] space-y-1 text-[11px]">
                    {stylist.signatureStyle && (
                      <p className="text-[#4A433A]">
                        <strong className="text-[#1C1917]">Signature Look:</strong> {stylist.signatureStyle}
                      </p>
                    )}
                    {stylist.favoriteProduct && (
                      <p className="text-[#7A7165]">
                        <strong className="text-[#1C1917]">Go-To Formula:</strong> {stylist.favoriteProduct}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Booking Action */}
            <div className="p-6 pt-0 border-t border-[#F2EDE5] bg-white">
              <div className="py-2 flex items-center justify-between text-[11px] text-[#7A7165]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-[#936D48]" />
                  <span>Available {stylist.availableDays.length} days/week</span>
                </span>
                <span className="text-emerald-700 font-medium">Accepting Clients</span>
              </div>

              <button
                onClick={() => onOpenBooking(undefined, stylist.id)}
                className="w-full py-2.5 bg-[#24201D] hover:bg-[#936D48] text-white text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer mt-1"
              >
                <Calendar className="w-3.5 h-3.5 text-[#E6CBA8]" />
                <span>Book with {stylist.name.split(' ')[0]}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Salon Culture & Training Section */}
      <div className="bg-[#F5EFE6] rounded-2xl p-8 sm:p-12 border border-[#E0D5C4] text-left">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#936D48] font-semibold">
            Our Care Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1C1917]">
            Personalized Beauty & Hair Artistry on George Street
          </h2>
          <p className="text-xs sm:text-sm text-[#5C554B] leading-relaxed">
            At Beauty 4 U Bathurst, we take pride in delivering an exceptional, welcoming experience where every treatment is customized to your personal aesthetic. Led by owner Kailtyn Whyte, our salon provides transformative Nanoplasty smoothing, bespoke blonde foiling, and clinical Hydrodermabrasion facials.
          </p>
        </div>
      </div>

    </div>
  );
};
