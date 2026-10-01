import React, { useState, useMemo } from 'react';
import { SERVICES_DATA, SALON_INFO } from '../data/salonData';
import { ServiceCategory, ServiceItem } from '../types';
import { Search, Clock, Calendar, Check, Sparkles, Coffee, ShieldCheck } from 'lucide-react';

interface ServicesPageProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: ServiceCategory; label: string }[] = [
    { id: 'all', label: 'All Services' },
    { id: 'haircuts', label: 'Cuts & Precision Styling' },
    { id: 'colour-blondes', label: 'Colours & Blondes' },
    { id: 'smoothing-treatments', label: 'Nanoplasty & Treatments' },
    { id: 'extensions', label: 'Hair Extensions' },
    { id: 'spa-wellness', label: 'Dermal Spa & Wellness' },
    { id: 'bridal-events', label: 'Bridal & Occasions' }
  ];

  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchCategory =
        selectedCategory === 'all' || service.category === selectedCategory;
      const matchSearch =
        searchQuery === '' ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#936D48] font-semibold">
          Transparent Pricing & Artisanal Craft
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-medium text-[#1C1917]">
          Salon Services & Price Menu
        </h1>
        <p className="text-sm sm:text-base text-[#6B6358] leading-relaxed">
          Every hair service includes a bespoke consultation, scalp assessment, relaxing basin massage, and premium organic styling finishes.
        </p>
      </div>

      {/* Complimentary Inclusions Banner */}
      <div className="bg-[#F2ECE1] border border-[#DDD3C2] rounded-xl p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5C554B]">
        <div className="flex items-center gap-3">
          <Coffee className="w-5 h-5 text-[#936D48] shrink-0" />
          <div>
            <strong className="text-[#1C1917] block">Complimentary Refreshments</strong>
            <span>Barista coffee, organic herbal tea infusions & chilled champagne.</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-[#936D48] shrink-0" />
          <div>
            <strong className="text-[#1C1917] block">Sensory Basin Experience</strong>
            <span>Warm steam towel and shiatsu acupressure head massage.</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[#936D48] shrink-0" />
          <div>
            <strong className="text-[#1C1917] block">48h Colour Guarantee</strong>
            <span>Complimentary toner balance within 14 days if needed.</span>
          </div>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="space-y-4">
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-[#8C8173] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search treatments (e.g. balayage, olaplex, foils, massage)..."
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#DDD3C2] rounded-lg focus:outline-hidden focus:border-[#936D48] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C8173] hover:text-[#1C1917]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills/Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-md whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#24201D] text-[#FAF8F5] shadow-xs'
                  : 'bg-white border border-[#DDD3C2] text-[#5C554B] hover:bg-[#F2ECE1] hover:text-[#1C1917]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-xl border border-[#E5DDD0] p-6 flex flex-col justify-between hover:shadow-md hover:border-[#C4B7A5] transition-all text-left"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  {service.tag && (
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#936D48] mb-1 block">
                      {service.tag}
                    </span>
                  )}
                  <h3 className="text-lg font-serif font-semibold text-[#1C1917]">
                    {service.name}
                  </h3>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xl font-bold text-[#1C1917] tabular-nums">
                    ${service.price}
                  </span>
                  <span className="text-[11px] text-[#7A7165] block">AUD</span>
                </div>
              </div>

              <p className="text-xs text-[#6B6358] leading-relaxed mt-3">
                {service.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F2ECE2] flex items-center justify-between">
              <span className="text-xs text-[#7A7165] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#936D48]" />
                <span className="tabular-nums">{service.durationMinutes} Minutes</span>
              </span>

              <button
                onClick={() => onOpenBooking(service.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#24201D] hover:bg-[#936D48] text-white text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                <Calendar className="w-3 h-3 text-[#E6CBA8]" />
                <span>Book Service</span>
              </button>
            </div>
          </div>
        ))}

        {filteredServices.length === 0 && (
          <div className="col-span-2 text-center py-16 bg-white rounded-xl border border-[#E5DDD0]">
            <p className="text-sm font-medium text-[#1C1917]">
              No services found matching "{searchQuery}"
            </p>
            <p className="text-xs text-[#7A7165] mt-1">
              Try adjusting your search terms or category selection.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#936D48] bg-[#F2ECE1] rounded-md hover:bg-[#EAE2D3]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Booking Reminder Card */}
      <div className="bg-[#FAF8F5] border border-[#DDD3C2] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-left space-y-1">
          <h4 className="text-lg font-serif font-bold text-[#1C1917]">
            Need advice before scheduling?
          </h4>
          <p className="text-xs text-[#6B6358]">
            Complimentary 15-minute consultations are available with any of our senior stylists to assess tone and technique.
          </p>
        </div>

        <button
          onClick={() => onOpenBooking()}
          className="px-6 py-3 bg-[#24201D] hover:bg-[#3D352E] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors shrink-0 cursor-pointer"
        >
          Book Consultation
        </button>
      </div>

    </div>
  );
};
