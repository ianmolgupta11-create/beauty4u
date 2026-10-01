import React, { useState } from 'react';
import { SALON_INFO } from '../data/salonData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Check, 
  HelpCircle, 
  Car, 
  Train, 
  Calendar 
} from 'lucide-react';

interface ContactPageProps {
  onOpenBooking: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenBooking }) => {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formSubject, setFormSubject] = useState('Hair Colour Consultation');
  const [formMessage, setFormMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail) return;
    setSubmitted(true);
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormMessage('');
    setTimeout(() => setSubmitted(false), 6000);
  };

  const faqs = [
    {
      q: 'Do I need an allergy skin patch test for colours?',
      a: 'Yes, if you are a new colour client or haven’t had your colour done with us in the past 6 months, we provide a quick complimentary 48-hour patch test at our front desk.'
    },
    {
      q: 'Where can I park in Bathurst?',
      a: 'Convenient street parking is available along George Street directly outside the salon, as well as nearby off-street parking behind the block.'
    },
    {
      q: 'What is the salon cancellation policy?',
      a: 'We understand schedules shift. We kindly request at least 24 hours notice for standard appointments, and 48 hours for long colour transformations or extensions.'
    },
    {
      q: 'Do you offer Afterpay or payment plans for extensions & smoothing?',
      a: 'Yes, we gladly accept Afterpay and major credit cards for all hair extensions, Bhave keratin treatments, and boutique retail purchases.'
    }
  ];

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#936D48] font-semibold">
          Visit Us in Bathurst, NSW
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-medium text-[#1C1917]">
          Connect with Beauty 4 U Concierge
        </h1>
        <p className="text-sm sm:text-base text-[#6B6358] leading-relaxed">
          Conveniently located at 223 George Street, Bathurst. Contact our salon team for appointment assistance, skin consultation inquiries, or custom bridal bookings.
        </p>
      </div>

      {/* Main Grid: Details & Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Col: Contact Info & Opening Hours */}
        <div className="lg:col-span-5 space-y-8 text-left">
          
          <div className="bg-white rounded-2xl border border-[#E5DDD0] p-6 sm:p-8 space-y-6 shadow-xs">
            <h3 className="text-xl font-serif font-bold text-[#1C1917]">
              Bathurst Salon & Spa
            </h3>

            <div className="space-y-4 text-xs text-[#5C554B]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#936D48] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1917] block">Salon Address</strong>
                  <span>{SALON_INFO.address}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#936D48] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1917] block">Phone Inquiries</strong>
                  <a
                    href={`tel:${SALON_INFO.phone.replace(/[^0-9]/g, '')}`}
                    className="text-[#936D48] font-semibold hover:underline"
                  >
                    {SALON_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#936D48] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1C1917] block">Direct Email</strong>
                  <span>{SALON_INFO.email}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#F2ECE2]">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-[#936D48]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C1917]">
                  Weekly Trading Hours
                </h4>
              </div>

              <div className="space-y-2 text-xs">
                {SALON_INFO.hours.map((item, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-[#FAF6F0] last:border-0">
                    <span className="font-medium text-[#1C1917]">{item.day}</span>
                    <span className={`tabular-nums ${item.day === 'Thursday' ? 'font-semibold text-amber-800' : 'text-[#6B6358]'}`}>
                      {item.hours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3 bg-[#24201D] hover:bg-[#3D352E] text-white text-xs font-semibold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-[#E6CBA8]" />
              <span>Book Online Instantly</span>
            </button>
          </div>

          {/* Location & Parking Details */}
          <div className="bg-[#FAF8F5] rounded-xl border border-[#E5DDD0] p-6 space-y-4">
            <h4 className="text-sm font-serif font-bold text-[#1C1917]">
              Visiting Our Salon
            </h4>
            
            <div className="space-y-3 text-xs text-[#5C554B]">
              <div className="flex items-start gap-2.5">
                <Car className="w-4 h-4 text-[#936D48] shrink-0 mt-0.5" />
                <span>
                  <strong>Parking:</strong> On-street parking along George Street in front of the salon, with additional spaces on adjacent blocks.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#936D48] shrink-0 mt-0.5" />
                <span>
                  <strong>Salon Suites:</strong> Featuring our dedicated Private Colour Room, Bridal Suite, and Balinese Spa Hut.
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Col: Interactive Message Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-2xl border border-[#E5DDD0] p-6 sm:p-10 shadow-xs text-left">
            <h3 className="text-2xl font-serif font-medium text-[#1C1917]">
              Send Our Concierge a Message
            </h3>
            <p className="text-xs text-[#6B6358] mt-1 mb-6">
              Have questions regarding our colour pricing, bridal packages, or booking adjustments? We reply within 2 business hours.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <h4 className="text-base font-bold text-[#1C1917]">Message Received</h4>
                <p className="text-xs text-[#5C554B] max-w-md mx-auto">
                  Thank you! Our Bathurst salon receptionist will contact you shortly via email or phone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#DDD3C2] rounded-md focus:outline-hidden focus:border-[#936D48]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formPhone}
                      onChange={(e) => setFormPhone(e.target.value)}
                      placeholder="04xx xxx xxx"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#DDD3C2] rounded-md focus:outline-hidden focus:border-[#936D48]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="sarah@example.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#DDD3C2] rounded-md focus:outline-hidden focus:border-[#936D48]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                      Inquiry Subject
                    </label>
                    <select
                      value={formSubject}
                      onChange={(e) => setFormSubject(e.target.value)}
                      className="w-full px-3 py-2.5 text-xs bg-[#FAF8F5] border border-[#DDD3C2] rounded-md focus:outline-hidden focus:border-[#936D48]"
                    >
                      <option value="Hair Colour Consultation">Hair Colour & Balayage Consultation</option>
                      <option value="Showpony Extension Query">Showpony Extensions Pricing</option>
                      <option value="Bridal Party Package">Bridal / Wedding Party Inquiry</option>
                      <option value="Body Spa Reservation">Body Spa & Tan Appointment</option>
                      <option value="Other Inquiries">General Question</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                    Your Message / Desired Date *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Tell us about your hair goals, desired dates, or questions..."
                    className="w-full px-3.5 py-2.5 text-xs bg-[#FAF8F5] border border-[#DDD3C2] rounded-md focus:outline-hidden focus:border-[#936D48] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 bg-[#936D48] hover:bg-[#7D5B3A] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message to Concierge</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-[#F5EFE6] rounded-2xl p-8 sm:p-12 border border-[#E0D5C4] text-left space-y-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#936D48] font-semibold">
            Common Inquiries
          </span>
          <h3 className="text-2xl font-serif font-bold text-[#1C1917] mt-1">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-[#E3D9CA] space-y-2">
              <h4 className="text-sm font-semibold text-[#1C1917] flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-[#936D48] shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-[#5C554B] leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
