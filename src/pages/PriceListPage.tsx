import React, { useState, useMemo } from 'react';
import { SERVICES_DATA, SALON_INFO, SPA_PACKAGES } from '../data/salonData';
import { ServiceCategory, ServiceItem } from '../types';
import { 
  Sparkles, 
  Clock, 
  Calendar, 
  Check, 
  Search, 
  Tag, 
  Scissors, 
  Heart, 
  ShieldCheck, 
  FileText, 
  Printer, 
  Info,
  Phone,
  ArrowRight
} from 'lucide-react';

interface PriceListPageProps {
  onOpenBooking: (serviceId?: string) => void;
}

export const PriceListPage: React.FC<PriceListPageProps> = ({ onOpenBooking }) => {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: ServiceCategory; label: string; icon: string }[] = [
    { id: 'all', label: 'Complete Price List', icon: '✨' },
    { id: 'haircuts', label: 'Cuts & Precision Styling', icon: '✂️' },
    { id: 'colour-blondes', label: 'Colours, Foils & Balayage', icon: '🎨' },
    { id: 'smoothing-treatments', label: 'Nanoplasty & Smoothing', icon: '💆‍♀️' },
    { id: 'extensions', label: 'Hair Extensions', icon: '🤍' },
    { id: 'spa-wellness', label: 'Dermal Facials & Brows/Lashes', icon: '🌿' },
    { id: 'bridal-events', label: 'Bridal & Occasion Styling', icon: '💍' },
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#936D48] font-semibold flex items-center justify-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-[#936D48]" />
          <span>Beauty 4 U Bathurst · Official Price List</span>
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-medium text-[#1C1917]">
          Treatment Guide & Price List
        </h1>
        <p className="text-sm sm:text-base text-[#6B6358] leading-relaxed">
          Transparent pricing for our full suite of hair artistry, Nanoplasty organic smoothing, Hydrodermabrasion facials, Dermalogica peels, and bespoke beauty rituals.
        </p>

        {/* Action button bar */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => onOpenBooking()}
            className="px-6 py-2.5 bg-[#24201D] hover:bg-[#3D352E] text-white text-xs font-semibold uppercase tracking-wider rounded-md inline-flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#E6CBA8]" />
            <span>Book Online Now</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 border border-[#D5C9B8] hover:bg-[#EFEAE2] text-[#24201D] text-xs font-semibold uppercase tracking-wider rounded-md inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#936D48]" />
            <span>Print Price List</span>
          </button>

          <a
            href={`tel:${SALON_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="px-4 py-2.5 border border-[#D5C9B8] hover:bg-[#EFEAE2] text-[#24201D] text-xs font-semibold uppercase tracking-wider rounded-md inline-flex items-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4 text-[#936D48]" />
            <span>Call {SALON_INFO.phone}</span>
          </a>
        </div>
      </div>

      {/* Featured Value Bundles / Specials Spotlight */}
      <div className="space-y-6">
        <div className="text-left">
          <span className="text-xs uppercase tracking-widest text-[#936D48] font-semibold">
            Value Packages & Specials
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1C1917] mt-1">
            Curated Beauty & Dermal Combinations
          </h2>
          <p className="text-xs sm:text-sm text-[#6B6358]">
            Bundled packages delivering maximum results with significant savings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPA_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl border-2 border-[#E5DDD0] hover:border-[#936D48] p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all text-left group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#936D48] bg-[#FAF5EE] px-2.5 py-1 rounded">
                    Popular Package
                  </span>
                  <span className="text-xs text-[#8C8377] font-medium flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#936D48]" />
                    <span>{pkg.duration}</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-serif font-bold text-[#1C1917] group-hover:text-[#936D48] transition-colors">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[#6B6358] mt-1.5 leading-relaxed">
                    {pkg.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#F2EDE4]">
                  <p className="text-[11px] uppercase tracking-wider font-semibold text-[#8C7A67]">
                    Includes:
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#524B42]">
                    {pkg.includes.map((inc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#936D48] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F0ECE3] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#8C8377] block uppercase font-medium">Package Value</span>
                  <span className="text-2xl font-serif font-bold text-[#1C1917] tabular-nums">
                    ${pkg.price} <span className="text-xs font-normal text-[#8C8377]">AUD</span>
                  </span>
                </div>

                <button
                  onClick={() => onOpenBooking()}
                  className="px-4 py-2 bg-[#24201D] group-hover:bg-[#936D48] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors cursor-pointer"
                >
                  Book Package
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Search & Category Filter Toolbar */}
      <div className="space-y-6 pt-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-[#8C8377] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search treatments (e.g. Nanoplasty, Foils, Peel, Brows)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D5C9B8] rounded-lg text-xs text-[#1C1917] placeholder-[#8C8377] focus:outline-hidden focus:border-[#936D48] focus:ring-1 focus:ring-[#936D48] shadow-xs"
            />
          </div>

          <span className="text-xs text-[#7A7165] self-start md:self-center">
            Showing <strong className="text-[#1C1917]">{filteredServices.length}</strong> items
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-[#24201D] text-[#FAF8F5] shadow-xs font-semibold'
                  : 'bg-white border border-[#DDD3C2] text-[#5C554B] hover:bg-[#F2ECE1] hover:text-[#1C1917]'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Comprehensive Services Table & Grid */}
      <div className="bg-white rounded-2xl border border-[#E5DDD0] shadow-xs overflow-hidden text-left">
        <div className="p-6 bg-[#FAF8F5] border-b border-[#E8E0D5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#936D48]" />
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#1C1917]">
              Itemised Menu & Rates (AUD)
            </h3>
          </div>
          <span className="text-[11px] text-[#7A7165]">
            GST Included · Consultation Provided
          </span>
        </div>

        <div className="divide-y divide-[#F0ECE3]">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="p-5 sm:p-6 hover:bg-[#FCFAF7] transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-serif font-bold text-[#1C1917] group-hover:text-[#936D48] transition-colors">
                    {service.name}
                  </h4>
                  {service.tag && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#936D48] bg-[#FAF5EE] px-2 py-0.5 rounded border border-[#EAE0D2]">
                      {service.tag}
                    </span>
                  )}
                  {service.includesConsultation && (
                    <span className="text-[10px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Incl. Consultation
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#6B6358] leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-[#8C8377] pt-0.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#936D48]" />
                    <span>Duration: ~{service.durationMinutes} mins</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#F5EFE6]">
                <div className="text-left md:text-right">
                  <span className="text-[10px] text-[#8C8377] block uppercase">Investment</span>
                  <span className="text-xl font-bold text-[#1C1917] tabular-nums">
                    ${service.price}
                  </span>
                </div>

                <button
                  onClick={() => onOpenBooking(service.id)}
                  className="px-4 py-2 bg-[#24201D] group-hover:bg-[#936D48] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  Book Item
                </button>
              </div>
            </div>
          ))}

          {filteredServices.length === 0 && (
            <div className="py-12 text-center text-xs text-[#7A7165]">
              No treatments found matching "{searchQuery}". Try selecting "Complete Price List".
            </div>
          )}
        </div>
      </div>

      {/* Salon Policies & Inclusions Notice */}
      <div className="bg-[#FAF8F5] rounded-xl border border-[#E0D5C4] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#5C554B] text-left">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[#1C1917] font-bold">
            <Info className="w-4 h-4 text-[#936D48]" />
            <span>Consultation & Customization</span>
          </div>
          <p className="leading-relaxed text-[#7A7165]">
            Every treatment is tailored to your hair density, skin sensitivity, and lifestyle goals. We assess your canvas before starting.
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[#1C1917] font-bold">
            <ShieldCheck className="w-4 h-4 text-[#936D48]" />
            <span>Patch Testing & Safety</span>
          </div>
          <p className="leading-relaxed text-[#7A7165]">
            Complimentary 48-hour allergy patch tests are available for all new colour and lash lift clients at our George Street salon.
          </p>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[#1C1917] font-bold">
            <Sparkles className="w-4 h-4 text-[#936D48]" />
            <span>Payment Options</span>
          </div>
          <p className="leading-relaxed text-[#7A7165]">
            We accept major credit cards, EFTPOS, Afterpay, and gift vouchers for all services, extensions, and retail products.
          </p>
        </div>
      </div>

    </div>
  );
};
