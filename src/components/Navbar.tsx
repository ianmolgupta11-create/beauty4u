import React, { useState } from 'react';
import { ActivePage } from '../types';
import { Phone, Calendar, Menu, X } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface NavbarProps {
  currentPage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  onOpenBooking: (preselectedServiceId?: string, preselectedStylistId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { label: string; page: ActivePage }[] = [
    { label: 'Track Suit Sets', page: 'tracksuit-sets' },
    { label: 'Services', page: 'services' },
    { label: 'Price Guide', page: 'price-list' },
    { label: 'Our Team', page: 'team' },
    { label: 'Dermal Spa', page: 'spa' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleLinkClick = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full max-w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8] transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4 w-full">
        
        {/* Zone 1: Single element brand wordmark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="text-base sm:text-2xl font-serif font-medium tracking-tight text-[#1C1917] hover:text-[#936D48] transition-colors cursor-pointer text-left truncate flex-1 min-w-0"
        >
          <span className="hidden sm:inline">Beauty 4 U Bathurst</span>
          <span className="sm:hidden font-semibold">Beauty 4 U</span>
        </button>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-medium tracking-wide text-[#5C564E]">
          {navLinks.map((item) => {
            const isActive = currentPage === item.page;
            return (
              <button
                key={item.page}
                onClick={() => handleLinkClick(item.page)}
                className={`relative py-1 transition-colors hover:text-[#1C1917] cursor-pointer whitespace-nowrap ${
                  isActive ? 'text-[#1C1917] font-semibold' : ''
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#936D48] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <a
            href={`tel:${SALON_INFO.phone.replace(/[^0-9]/g, '')}`}
            className="hidden md:inline-flex items-center gap-2 text-xs font-medium text-[#5C564E] hover:text-[#1C1917] px-3 py-2 rounded border border-[#DDD4C7] transition-colors whitespace-nowrap"
            title="Call Salon"
          >
            <Phone className="w-3.5 h-3.5 text-[#936D48]" />
            <span className="tabular-nums">{SALON_INFO.phone}</span>
          </a>

          <button
            onClick={() => onOpenBooking()}
            className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 bg-[#24201D] hover:bg-[#3D352E] text-[#FAF8F5] text-[11px] sm:text-xs font-semibold tracking-wider uppercase rounded-md shadow-xs hover:shadow-md transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-3.5 h-3.5 text-[#E6CBA8]" />
            <span>Book Online</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 text-[#24201D] hover:bg-[#EFEAE1] rounded-md transition-colors shrink-0 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8E2D8] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((item) => (
              <button
                key={item.page}
                onClick={() => handleLinkClick(item.page)}
                className={`text-left px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                  currentPage === item.page
                    ? 'bg-[#EFEAE1] text-[#1C1917] font-semibold'
                    : 'text-[#5C564E] hover:bg-[#F4F0E8] hover:text-[#1C1917]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8E2D8] flex flex-col gap-2">
            <a
              href={`tel:${SALON_INFO.phone.replace(/[^0-9]/g, '')}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-medium text-[#24201D] bg-[#F2EDE4] rounded-md"
            >
              <Phone className="w-4 h-4 text-[#936D48]" />
              <span>Call Salon {SALON_INFO.phone}</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#24201D] rounded-md"
            >
              <Calendar className="w-4 h-4 text-[#E6CBA8]" />
              <span>Book Appointment Online</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
