import React from 'react';
import { BookingEngine } from '../components/BookingEngine';
import { SALON_INFO } from '../data/salonData';
import { Phone, Clock, ShieldCheck, Sparkles } from 'lucide-react';

interface BookingPageProps {
  initialServiceId?: string;
  initialStylistId?: string;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  initialServiceId,
  initialStylistId
}) => {
  return (
    <div className="py-10 sm:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs uppercase tracking-widest text-[#936D48] font-semibold">
          Seamless Concierge Scheduling
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-medium text-[#1C1917]">
          Online Appointment Booking
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6358]">
          Reserve your preferred hair or spa service with our master stylists. Real-time availability, instant calendar generation, and zero booking fee.
        </p>
      </div>

      {/* Main Booking Engine Container */}
      <div className="max-w-4xl mx-auto rounded-2xl border border-[#DDD3C2] bg-white shadow-xl overflow-hidden">
        <BookingEngine
          initialServiceId={initialServiceId}
          initialStylistId={initialStylistId}
          isModal={false}
        />
      </div>

      {/* Reassurance Footer */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-[#5C554B] text-center pt-4">
        <div className="bg-[#F2ECE1] p-4 rounded-xl border border-[#DDD3C2] space-y-1">
          <ShieldCheck className="w-4 h-4 text-[#936D48] mx-auto" />
          <strong className="text-[#1C1917] block">Free Cancellation</strong>
          <span>Adjust or reschedule up to 24 hours prior to appointment.</span>
        </div>
        <div className="bg-[#F2ECE1] p-4 rounded-xl border border-[#DDD3C2] space-y-1">
          <Sparkles className="w-4 h-4 text-[#936D48] mx-auto" />
          <strong className="text-[#1C1917] block">Complimentary Upgrades</strong>
          <span>Sensory basin wash, scalp massage, and organic hot beverages included.</span>
        </div>
        <div className="bg-[#F2ECE1] p-4 rounded-xl border border-[#DDD3C2] space-y-1">
          <Phone className="w-4 h-4 text-[#936D48] mx-auto" />
          <strong className="text-[#1C1917] block">Prefer to Call?</strong>
          <span>Our desk is reachable at <strong className="text-[#1C1917]">{SALON_INFO.phone}</strong></span>
        </div>
      </div>

    </div>
  );
};
