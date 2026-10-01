import React, { useState } from 'react';
import { ActivePage } from '../types';
import { SALON_INFO } from '../data/salonData';
import { Phone, Mail, MapPin, Instagram, Facebook, ArrowRight, Check, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: ActivePage) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => setSubscribed(false), 5000);
  };

  return (
    <footer className="bg-[#1C1917] text-[#EDE7DE] pt-16 pb-12 border-t border-[#38322D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#332D28]">
          
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-[#FAF8F5] tracking-wide">
              {SALON_INFO.name}
            </h3>
            <p className="text-xs text-[#A89F93] leading-relaxed">
              Bathurst’s premier hair salon and advanced dermal spa sanctuary. Dedicated to Nanoplasty smoothing, bespoke colour artistry, and clinical skincare results.
            </p>

            <div className="pt-2">
              <span className="text-[11px] uppercase tracking-wider text-[#C4A987] font-semibold block mb-2">
                Follow Our Work
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={`https://instagram.com/${SALON_INFO.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#2A2420] border border-[#423A33] flex items-center justify-center text-[#EDE7DE] hover:text-[#C4A987] hover:border-[#C4A987] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={SALON_INFO.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-full bg-[#2A2420] border border-[#423A33] flex items-center justify-center text-[#EDE7DE] hover:text-[#C4A987] hover:border-[#C4A987] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <span className="text-xs text-[#8C8377] font-mono">
                  {SALON_INFO.instagram}
                </span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C4A987]">
              Explore Beauty 4 U
            </h4>
            <ul className="space-y-2 text-xs text-[#BBB0A3]">
              <li>
                <button
                  onClick={() => onNavigate('tracksuit-sets')}
                  className="text-[#E6CBA8] font-semibold hover:text-white transition-colors cursor-pointer"
                >
                  Track Suit Sets Boutique →
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services & Treatment Menu
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('price-list')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Full Price List & Value Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('team')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Meet Our Specialist Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('spa')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Dermal Spa & Facial Packages
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Bathurst Salon & Contact
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="text-[#C4A987] font-semibold hover:text-white transition-colors cursor-pointer"
                >
                  Book Online Concierge →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Location */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C4A987]">
              Salon Hours & Location
            </h4>
            <div className="text-xs text-[#A89F93] space-y-1.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C4A987] shrink-0 mt-0.5" />
                <span>{SALON_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C4A987] shrink-0" />
                <a href={`tel:${SALON_INFO.phone.replace(/[^0-9]/g, '')}`} className="hover:text-white">
                  {SALON_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C4A987] shrink-0" />
                <span>{SALON_INFO.email}</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#8C8377] space-y-1">
              <p><strong className="text-[#C4A987]">Mon – Fri:</strong> 9:00am – 5:30pm</p>
              <p><strong className="text-[#C4A987]">Saturday:</strong> By Appointment</p>
              <p><strong className="text-[#8C8377]">Sunday:</strong> Closed</p>
            </div>
          </div>

          {/* Col 4: Newsletter & Style Notes */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#C4A987]">
              Beauty & Skin Notes
            </h4>
            <p className="text-xs text-[#A89F93]">
              Subscribe for exclusive skin health tips, seasonal specials, and priority appointment availability.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="bg-[#29231E] border border-[#473E36] px-3 py-2 text-xs rounded-l-md text-white placeholder-[#786E64] focus:outline-hidden focus:border-[#C4A987] flex-1"
                />
                <button
                  type="submit"
                  className="bg-[#C4A987] hover:bg-[#D4BC9B] text-[#1C1917] px-3 py-2 text-xs font-semibold rounded-r-md transition-colors cursor-pointer"
                  aria-label="Submit Newsletter"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <Check className="w-3 h-3" /> Thank you for subscribing to Beauty 4 U Notes.
                </p>
              )}
            </form>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full py-2 bg-[#2E2823] hover:bg-[#3D352E] border border-[#52463B] text-xs font-medium text-[#FAF8F5] rounded-md transition-colors cursor-pointer"
              >
                Instant Online Booking
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Recognition */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#786E64] gap-4">
          <p>© {new Date().getFullYear()} Beauty 4 U Bathurst. All rights reserved.</p>
          <div className="flex items-center gap-2 text-center text-[11px]">
            <span>We acknowledge the Wiradjuri people, the Traditional Custodians of the Bathurst region.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
