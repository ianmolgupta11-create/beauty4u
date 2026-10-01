import React from 'react';
import { SPA_PACKAGES, SALON_INFO, SERVICES_DATA } from '../data/salonData';
import { SalonVisual } from '../components/SalonVisual';
import { Clock, Calendar, Check, Sparkles, Heart, Flower2 } from 'lucide-react';

interface SpaPageProps {
  onOpenBooking: (serviceId?: string, stylistId?: string) => void;
}

export const SpaPage: React.FC<SpaPageProps> = ({ onOpenBooking }) => {
  const spaServices = SERVICES_DATA.filter((s) => s.category === 'spa-wellness');

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#936D48] font-semibold flex items-center justify-center gap-1.5">
          <Flower2 className="w-3.5 h-3.5 text-[#936D48]" />
          <span>Advanced Dermal & Spa Wellness</span>
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-medium text-[#1C1917]">
          Beauty 4 U Dermal Spa & Skin Sanctuary
        </h1>
        <p className="text-sm sm:text-base text-[#6B6358] leading-relaxed">
          Situated on George Street in Bathurst, our private treatment rooms offer Hydrodermabrasion aqua facials, Dermalogica chemical peels, collagen induction microneedling, and deluxe body bronzing.
        </p>
      </div>

      {/* Spa Sanctuary Visual Hero */}
      <div className="relative rounded-2xl overflow-hidden aspect-[16/7] shadow-xl border border-[#DED3C4]">
        <SalonVisual
          type="spa-sanctuary"
          alt="Beauty 4 U Bathurst Dermal Spa Sanctuary"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6 sm:p-10 text-white text-left">
          <div className="max-w-xl space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#E6CBA8] font-semibold">
              Curated by Angela Gould & Specialist Dermal Team
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-light">
              A sensory pause and targeted dermal rejuvenation.
            </h2>
            <p className="text-xs text-white/80">
              Featuring Dermalogica clinical formulations, diamond aqua peeling, and therapeutic tension relief.
            </p>
          </div>
        </div>
      </div>

      {/* Signature Spa Packages */}
      <div className="space-y-8">
        <div className="text-left">
          <span className="text-xs uppercase tracking-widest text-[#936D48] font-semibold">
            Complete Immersion
          </span>
          <h2 className="text-3xl font-serif font-medium text-[#1C1917] mt-1">
            Curated Sanctuary Day Packages
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPA_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl border border-[#E5DDD0] p-6 flex flex-col justify-between hover:shadow-lg hover:border-[#C4B7A5] transition-all text-left"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#8A8174] mb-3">
                  <span className="flex items-center gap-1 font-semibold text-[#936D48]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{pkg.duration}</span>
                  </span>
                  <span className="text-lg font-bold text-[#1C1917] tabular-nums">
                    ${pkg.price} AUD
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#1C1917] leading-snug">
                  {pkg.name}
                </h3>

                <p className="text-xs text-[#6B6358] mt-2 mb-4 leading-relaxed">
                  {pkg.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-[#F2ECE2]">
                  <span className="text-[10px] uppercase font-bold text-[#8C8173] tracking-wider block">
                    Ritual Inclusions:
                  </span>
                  <ul className="space-y-1.5 text-xs text-[#4A433A]">
                    {pkg.includes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#936D48] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F2ECE2]">
                <button
                  onClick={() => onOpenBooking(undefined, 'isabelle')}
                  className="w-full py-2.5 bg-[#24201D] hover:bg-[#936D48] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Reserve Spa Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Spa & Body Treatments */}
      <div className="space-y-6 text-left">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#936D48] font-semibold">
            A La Carte
          </span>
          <h2 className="text-3xl font-serif font-medium text-[#1C1917] mt-1">
            Individual Spa & Tan Treatments
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spaServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl border border-[#E5DDD0] p-6 flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-base font-serif font-bold text-[#1C1917]">
                    {service.name}
                  </h3>
                  <span className="text-base font-bold text-[#1C1917] tabular-nums">
                    ${service.price} AUD
                  </span>
                </div>

                <p className="text-xs text-[#6B6358] mt-2 leading-relaxed">
                  {service.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#F2ECE2] flex items-center justify-between">
                <span className="text-xs text-[#7A7165] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#936D48]" />
                  <span>{service.durationMinutes} Minutes</span>
                </span>

                <button
                  onClick={() => onOpenBooking(service.id, 'isabelle')}
                  className="px-3.5 py-1.5 bg-[#24201D] hover:bg-[#936D48] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Book Treatment
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
