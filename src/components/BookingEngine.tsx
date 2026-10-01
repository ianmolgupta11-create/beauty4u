import React, { useState, useMemo } from 'react';
import { SERVICES_DATA, SALON_INFO } from '../data/salonData';
import { ServiceItem, Stylist, ServiceCategory } from '../types';
import { useProfile } from '../context/ProfileContext';
import { 
  Check, 
  Clock, 
  Calendar, 
  User, 
  Scissors, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Phone, 
  Mail, 
  AlertCircle,
  CalendarPlus,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { SalonVisual } from './SalonVisual';

interface BookingEngineProps {
  initialServiceId?: string;
  initialStylistId?: string;
  onClose?: () => void;
  isModal?: boolean;
}

export const BookingEngine: React.FC<BookingEngineProps> = ({
  initialServiceId,
  initialStylistId,
  onClose,
  isModal = false
}) => {
  const { teamMembers } = useProfile();
  // Step state: 1: Service, 2: Stylist, 3: Date & Time, 4: Details, 5: Confirmation
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Selected Services (can multi-select add-ons)
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>(
    initialServiceId ? [initialServiceId] : ['balayage-artisanal']
  );
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<ServiceCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Stylist
  const [selectedStylistId, setSelectedStylistId] = useState<string>(
    initialStylistId || 'any'
  );

  // Selected Date & Time
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    // Pick tomorrow or next open day
    const nextDay = new Date(today);
    nextDay.setDate(today.getDate() + 1);
    if (nextDay.getDay() === 0) nextDay.setDate(nextDay.getDate() + 2); // if Sunday, jump to Tuesday
    if (nextDay.getDay() === 1) nextDay.setDate(nextDay.getDate() + 1); // if Monday, jump to Tuesday
    return nextDay.toISOString().split('T')[0];
  });
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00 AM');

  // Customer Contact Details
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [requiresPatchTest, setRequiresPatchTest] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Confirmed Reference
  const [bookingRef, setBookingRef] = useState<string>('');

  // Calculations
  const selectedServices = useMemo(() => {
    return SERVICES_DATA.filter((s) => selectedServiceIds.includes(s.id));
  }, [selectedServiceIds]);

  const totalPrice = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + s.price, 0);
  }, [selectedServices]);

  const totalDuration = useMemo(() => {
    return selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);
  }, [selectedServices]);

  const chosenStylist = useMemo(() => {
    if (selectedStylistId === 'any') {
      return {
        id: 'any',
        name: 'First Available Senior Specialist',
        role: 'Salon Master Team',
        rating: 5.0
      };
    }
    return teamMembers.find((s) => s.id === selectedStylistId);
  }, [selectedStylistId, teamMembers]);

  // Service toggle handler
  const handleToggleService = (serviceId: string) => {
    if (selectedServiceIds.includes(serviceId)) {
      if (selectedServiceIds.length === 1) {
        // keep at least one
        return;
      }
      setSelectedServiceIds(selectedServiceIds.filter((id) => id !== serviceId));
    } else {
      setSelectedServiceIds([...selectedServiceIds, serviceId]);
    }
  };

  // Filtered services list
  const filteredServices = useMemo(() => {
    return SERVICES_DATA.filter((service) => {
      const matchCategory =
        activeCategoryFilter === 'all' || service.category === activeCategoryFilter;
      const matchSearch =
        searchQuery === '' ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategoryFilter, searchQuery]);

  // Generate available calendar dates for the next 14 days
  const availableDates = useMemo(() => {
    const dates = [];
    const base = new Date();
    for (let i = 1; i <= 21; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      const dayOfWeek = d.getDay(); // 0 is Sun, 1 is Mon
      // Aspire is closed Sun & Mon
      if (dayOfWeek !== 0 && dayOfWeek !== 1) {
        dates.push({
          fullDate: d.toISOString().split('T')[0],
          dayName: d.toLocaleDateString('en-AU', { weekday: 'short' }),
          dayNum: d.getDate(),
          monthName: d.toLocaleDateString('en-AU', { month: 'short' }),
          isThursday: dayOfWeek === 4 // Late night shopping day!
        });
      }
    }
    return dates;
  }, []);

  // Time slots depending on selected day (Thursdays have late evening slots)
  const availableSlots = useMemo(() => {
    const selectedDateObj = new Date(selectedDate);
    const isLateNight = selectedDateObj.getDay() === 4; // Thursday

    const baseMorning = ['9:00 AM', '9:45 AM', '10:30 AM', '11:15 AM'];
    const baseAfternoon = ['1:00 PM', '1:45 PM', '2:30 PM', '3:15 PM', '4:00 PM'];
    const eveningSlots = isLateNight ? ['5:15 PM', '6:00 PM', '6:45 PM', '7:15 PM'] : [];

    return {
      morning: baseMorning,
      afternoon: baseAfternoon,
      evening: eveningSlots
    };
  }, [selectedDate]);

  // Validate Step 4
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!customerName.trim()) newErrors.customerName = 'Please enter your full name';
    if (!customerEmail.trim() || !customerEmail.includes('@'))
      newErrors.customerEmail = 'Please provide a valid email for confirmation';
    if (!customerPhone.trim() || customerPhone.length < 8)
      newErrors.customerPhone = 'Please provide an Australian mobile number (e.g. 0412 345 678)';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Booking
  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate reference
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const ref = `ASP-2026-${randomCode}`;
    setBookingRef(ref);
    setCurrentStep(5);
  };

  // Download .ics calendar event
  const handleDownloadCalendar = () => {
    const summary = `Aspire Hair Appointment (${selectedServices.map(s => s.name).join(', ')})`;
    const description = `Appointment with ${chosenStylist?.name} at Aspire Hair & Body Spa Glenelg. Total $${totalPrice} AUD. Ref: ${bookingRef}`;
    const location = SALON_INFO.address;
    
    // Quick pseudo-ics formatted string
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Aspire Hair & Body Spa//Appointment//EN
BEGIN:VEVENT
SUMMARY:${summary}
DESCRIPTION:${description}
LOCATION:${location}
DTSTART:${selectedDate.replace(/-/g, '')}T100000Z
DURATION:PT${totalDuration}M
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${bookingRef}-Aspire-Appointment.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`bg-[#FAF8F5] text-[#1C1917] ${isModal ? 'max-w-4xl mx-auto rounded-xl shadow-2xl border border-[#E0D7C9] overflow-hidden' : 'w-full'}`}>
      
      {/* Header bar */}
      <div className="bg-[#24201D] text-[#FAF8F5] px-6 py-5 flex items-center justify-between border-b border-[#3D352E]">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#E6CBA8] font-semibold">
              Live Concierge Booking
            </span>
            <span className="text-white/40">·</span>
            <span className="text-xs text-white/70">Instant Real-Time Confirmation</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif mt-0.5">
            Reserve Your Aspire Experience
          </h2>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
            aria-label="Close Booking"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Step Progress Indicator (Steps 1 to 4) */}
      {currentStep < 5 && (
        <div className="bg-[#F2EDE4] px-6 py-3 border-b border-[#E2D8C9]">
          <div className="flex items-center justify-between max-w-2xl mx-auto text-xs font-medium">
            {[
              { num: 1, label: 'Select Services' },
              { num: 2, label: 'Choose Stylist' },
              { num: 3, label: 'Date & Time' },
              { num: 4, label: 'Your Details' },
            ].map((step) => {
              const isPast = currentStep > step.num;
              const isCurrent = currentStep === step.num;
              return (
                <button
                  key={step.num}
                  disabled={step.num > currentStep}
                  onClick={() => setCurrentStep(step.num)}
                  className={`flex items-center gap-2 cursor-pointer transition-colors ${
                    isCurrent
                      ? 'text-[#936D48] font-semibold'
                      : isPast
                      ? 'text-[#1C1917] hover:text-[#936D48]'
                      : 'text-[#8A8276] cursor-not-allowed'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-mono ${
                      isPast
                        ? 'bg-[#936D48] text-white'
                        : isCurrent
                        ? 'border-2 border-[#936D48] text-[#936D48] bg-white'
                        : 'bg-[#DDD4C7] text-[#6B645A]'
                    }`}
                  >
                    {isPast ? <Check className="w-3.5 h-3.5" /> : step.num}
                  </span>
                  <span className="hidden sm:inline">{step.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="p-6 sm:p-8">
        
        {/* STEP 1: SELECT SERVICES */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-serif font-medium text-[#1C1917]">
                  1. Choose Your Hair & Spa Rituals
                </h3>
                <p className="text-xs text-[#736B61] mt-1">
                  Select one or more services. You can pair a cut, balayage, or smoothing treatment with an Olaplex bond repair or scalp massage.
                </p>
              </div>

              {/* Live cart ticker */}
              <div className="bg-[#EFEAE1] border border-[#DDD3C3] px-4 py-2 rounded-lg flex items-center gap-4 text-xs shrink-0">
                <div>
                  <span className="text-[#736B61] block text-[10px] uppercase tracking-wider">Estimated Total</span>
                  <span className="font-semibold text-sm tabular-nums text-[#1C1917]">${totalPrice} AUD</span>
                </div>
                <div className="h-6 w-[1px] bg-[#D4C8B5]" />
                <div>
                  <span className="text-[#736B61] block text-[10px] uppercase tracking-wider">Duration</span>
                  <span className="font-medium tabular-nums text-[#1C1917]">{totalDuration} mins</span>
                </div>
              </div>
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#E8E1D5] scrollbar-none">
              {[
                { id: 'all', label: 'All Services' },
                { id: 'haircuts', label: 'Cuts & Styling' },
                { id: 'colour-blondes', label: 'Colours & Blondes' },
                { id: 'extensions', label: 'Showpony Extensions' },
                { id: 'smoothing-treatments', label: 'Kerasilk & Treatments' },
                { id: 'spa-wellness', label: 'Body Spa & Rituals' },
                { id: 'bridal-events', label: 'Bridal & Occasion' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategoryFilter(tab.id as ServiceCategory)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategoryFilter === tab.id
                      ? 'bg-[#24201D] text-[#FAF8F5]'
                      : 'text-[#615A51] hover:bg-[#EFEAE1]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Service List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-[440px] overflow-y-auto pr-1">
              {filteredServices.map((service) => {
                const isSelected = selectedServiceIds.includes(service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => handleToggleService(service.id)}
                    className={`p-4 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#936D48] bg-[#F7F2EB] shadow-xs'
                        : 'border-[#E4DCD0] bg-white hover:border-[#C4B7A5]'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-[#1C1917] leading-snug">
                          {service.name}
                        </h4>
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-[#936D48] text-white'
                              : 'border border-[#C9BEAE] bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>

                      {service.tag && (
                        <span className="inline-block mt-1 text-[10px] uppercase font-semibold text-[#936D48]">
                          {service.tag}
                        </span>
                      )}

                      <p className="text-xs text-[#6B6358] mt-2 line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#EAE3D7] flex items-center justify-between text-xs">
                      <span className="text-[#7A7165] flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#936D48]" />
                        <span className="tabular-nums">{service.durationMinutes} mins</span>
                      </span>
                      <span className="text-sm font-semibold text-[#1C1917] tabular-nums">
                        ${service.price} <span className="text-[10px] font-normal text-[#7A7165]">AUD</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom action bar */}
            <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-between">
              <div className="text-xs text-[#6B6358]">
                {selectedServiceIds.length} service{selectedServiceIds.length > 1 ? 's' : ''} selected
              </div>

              <button
                disabled={selectedServiceIds.length === 0}
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#24201D] hover:bg-[#3D352E] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer disabled:opacity-50"
              >
                <span>Continue to Stylist</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CHOOSE STYLIST */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-serif font-medium text-[#1C1917]">
                2. Select Your Preferred Stylist
              </h3>
              <p className="text-xs text-[#736B61] mt-1">
                Choose a specific master stylist or select First Available for optimal scheduling flexibility.
              </p>
            </div>

            {/* Stylists Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
              
              {/* Option 1: Any Available */}
              <div
                onClick={() => setSelectedStylistId('any')}
                className={`p-4 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between ${
                  selectedStylistId === 'any'
                    ? 'border-[#936D48] bg-[#F7F2EB] shadow-xs'
                    : 'border-[#E4DCD0] bg-white hover:border-[#C4B7A5]'
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-full bg-[#E8E1D5] flex items-center justify-center mb-3">
                    <Sparkles className="w-5 h-5 text-[#936D48]" />
                  </div>
                  <h4 className="text-sm font-semibold text-[#1C1917]">
                    First Available Stylist
                  </h4>
                  <p className="text-[11px] text-[#936D48] font-medium mt-0.5">
                    Fastest Booking Availability
                  </p>
                  <p className="text-xs text-[#6B6358] mt-2">
                    Our salon manager matches your specific hair needs with the best qualified senior team member.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#EAE3D7] flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-medium text-[11px]">Next Day Available</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedStylistId === 'any' ? 'border-[#936D48] bg-[#936D48] text-white' : 'border-[#C9BEAE]'}`}>
                    {selectedStylistId === 'any' && <Check className="w-2.5 h-2.5" />}
                  </div>
                </div>
              </div>

              {/* Named Stylists */}
              {teamMembers.map((stylist) => {
                const isSelected = selectedStylistId === stylist.id;
                return (
                  <div
                    key={stylist.id}
                    onClick={() => setSelectedStylistId(stylist.id)}
                    className={`p-4 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#936D48] bg-[#F7F2EB] shadow-xs'
                        : 'border-[#E4DCD0] bg-white hover:border-[#C4B7A5]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-[#DDD3C3]">
                          {stylist.imageUrl ? (
                            <img
                              src={stylist.imageUrl}
                              alt={stylist.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <SalonVisual
                              type="stylist-avatar"
                              alt={stylist.name}
                              stylistName={stylist.name}
                              className="w-full h-full"
                            />
                          )}
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-[#1C1917]">
                            {stylist.name}
                          </h4>
                          <p className="text-[11px] text-[#8A7968]">
                            {stylist.role.split('&')[0]}
                          </p>
                          <span className="text-[10px] text-[#936D48] font-mono">
                            {stylist.experienceYears}+ Years Exp
                          </span>
                        </div>
                      </div>

                      <div className="text-[11px] text-[#5C554B] space-y-1">
                        <p className="line-clamp-2">
                          <strong className="font-medium text-[#1C1917]">Specialty:</strong> {stylist.specialties.slice(0, 2).join(', ')}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#EAE3D7] flex items-center justify-between text-xs">
                      <span className="text-[11px] text-[#7A7165]">
                        ★ {stylist.rating} ({stylist.reviewCount})
                      </span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-[#936D48] bg-[#936D48] text-white' : 'border-[#C9BEAE]'}`}>
                        {isSelected && <Check className="w-2.5 h-2.5" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#DDD3C3] text-xs font-semibold text-[#5C554B] rounded-md hover:bg-[#EFEAE1] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#24201D] hover:bg-[#3D352E] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer"
              >
                <span>Select Date & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: DATE & TIME */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-serif font-medium text-[#1C1917]">
                3. Choose Appointment Date & Time
              </h3>
              <p className="text-xs text-[#736B61] mt-1">
                Aspire Glenelg opens Tuesday through Saturday, featuring late night styling every Thursday until 8:30 PM.
              </p>
            </div>

            {/* Horizontal Date Picker */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#6B6358] mb-2">
                Available Salon Dates
              </label>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {availableDates.map((item) => {
                  const isSelected = selectedDate === item.fullDate;
                  return (
                    <button
                      key={item.fullDate}
                      onClick={() => setSelectedDate(item.fullDate)}
                      className={`flex flex-col items-center justify-center min-w-[70px] py-3 px-2 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#24201D] text-white border-[#24201D] shadow-sm'
                          : 'bg-white text-[#24201D] border-[#DDD4C7] hover:border-[#936D48]'
                      }`}
                    >
                      <span className={`text-[10px] uppercase font-semibold ${isSelected ? 'text-[#E6CBA8]' : 'text-[#8A8174]'}`}>
                        {item.dayName}
                      </span>
                      <span className="text-lg font-bold tabular-nums mt-0.5">
                        {item.dayNum}
                      </span>
                      <span className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-[#8A8174]'}`}>
                        {item.monthName}
                      </span>
                      {item.isThursday && (
                        <span className="mt-1 text-[9px] font-mono text-amber-500 font-semibold">
                          Late
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-4 pt-2">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6358] block mb-2">
                  Morning Slots
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableSlots.morning.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 px-3 text-xs font-medium rounded-md border text-center transition-all cursor-pointer ${
                        selectedTimeSlot === slot
                          ? 'bg-[#936D48] text-white border-[#936D48]'
                          : 'bg-white text-[#1C1917] border-[#DDD4C7] hover:border-[#936D48]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6358] block mb-2">
                  Afternoon Slots
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {availableSlots.afternoon.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 px-3 text-xs font-medium rounded-md border text-center transition-all cursor-pointer ${
                        selectedTimeSlot === slot
                          ? 'bg-[#936D48] text-white border-[#936D48]'
                          : 'bg-white text-[#1C1917] border-[#DDD4C7] hover:border-[#936D48]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {availableSlots.evening.length > 0 && (
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 block mb-2">
                    Thursday Late Night Twilight Slots
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {availableSlots.evening.map((slot) => (
                      <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        className={`py-2 px-3 text-xs font-medium rounded-md border text-center transition-all cursor-pointer ${
                          selectedTimeSlot === slot
                            ? 'bg-[#936D48] text-white border-[#936D48]'
                            : 'bg-amber-50/50 text-[#1C1917] border-amber-200 hover:border-[#936D48]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#DDD3C3] text-xs font-semibold text-[#5C554B] rounded-md hover:bg-[#EFEAE1] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setCurrentStep(4)}
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#24201D] hover:bg-[#3D352E] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all cursor-pointer"
              >
                <span>Enter Guest Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: DETAILS & CONFIRM */}
        {currentStep === 4 && (
          <form onSubmit={handleConfirmBooking} className="space-y-6">
            <div>
              <h3 className="text-xl font-serif font-medium text-[#1C1917]">
                4. Confirm Appointment & Guest Details
              </h3>
              <p className="text-xs text-[#736B61] mt-1">
                We will send an immediate SMS and email confirmation with your booking reference and calendar pass.
              </p>
            </div>

            {/* Appointment Brief Card */}
            <div className="bg-[#F5EFE6] border border-[#DDD3C3] rounded-lg p-4 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E3D9C9] pb-3 text-xs">
                <span className="font-semibold text-[#1C1917]">
                  {selectedDate} · {selectedTimeSlot}
                </span>
                <span className="text-[#876F53] font-medium">
                  Stylist: {chosenStylist?.name}
                </span>
              </div>

              <div className="space-y-1.5">
                {selectedServices.map((service) => (
                  <div key={service.id} className="flex justify-between text-xs">
                    <span className="text-[#4F483F]">{service.name}</span>
                    <span className="font-medium text-[#1C1917] tabular-nums">${service.price} AUD</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#E3D9C9] pt-2 flex justify-between text-xs font-semibold text-[#1C1917]">
                <span>Total Expected Duration: {totalDuration} mins</span>
                <span className="text-sm tabular-nums">${totalPrice} AUD</span>
              </div>
            </div>

            {/* Input fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Jessica Miller"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DDD4C7] rounded-md focus:outline-hidden focus:border-[#936D48] transition-colors"
                />
                {errors.customerName && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.customerName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                  Mobile Number (AU) *
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 0412 345 678"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DDD4C7] rounded-md focus:outline-hidden focus:border-[#936D48] transition-colors"
                />
                {errors.customerPhone && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.customerPhone}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="jessica@example.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DDD4C7] rounded-md focus:outline-hidden focus:border-[#936D48] transition-colors"
                />
                {errors.customerEmail && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.customerEmail}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#1C1917] mb-1">
                  Styling Notes / Hair History (Optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="E.g., Fine hair, looking for lived-in balayage; previous dark toner 6 months ago; or special bridal notes."
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#DDD4C7] rounded-md focus:outline-hidden focus:border-[#936D48] transition-colors resize-none"
                />
              </div>
            </div>

            {/* Patch test checkbox */}
            <div className="flex items-start gap-3 p-3 bg-white rounded-md border border-[#E4DCD0]">
              <input
                id="patchTest"
                type="checkbox"
                checked={requiresPatchTest}
                onChange={(e) => setRequiresPatchTest(e.target.checked)}
                className="mt-0.5 rounded border-[#C4B7A5] text-[#936D48] focus:ring-[#936D48]"
              />
              <label htmlFor="patchTest" className="text-xs text-[#5C554B] leading-relaxed cursor-pointer">
                <strong>First-time colour client:</strong> I understand that a complimentary 48-hour allergy skin patch test is recommended before full scalp colour treatments.
              </label>
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-[#E8E1D5] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(3)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-[#DDD3C3] text-xs font-semibold text-[#5C554B] rounded-md hover:bg-[#EFEAE1] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#936D48] hover:bg-[#7D5B3A] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-all shadow-md active:scale-[0.98] cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Complete Booking Reservation</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 5: INSTANT CONFIRMATION SUCCESS */}
        {currentStep === 5 && (
          <div className="text-center py-6 space-y-6 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase tracking-widest text-[#936D48] font-semibold">
                Reservation Confirmed
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1C1917] mt-1">
                We Can’t Wait to Welcome You, {customerName}!
              </h3>
              <p className="text-xs text-[#6B6358] mt-2">
                A confirmation SMS and calendar invite have been dispatched to <strong className="text-[#1C1917]">{customerPhone}</strong> and <strong className="text-[#1C1917]">{customerEmail}</strong>.
              </p>
            </div>

            {/* Reference Ticket Card */}
            <div className="bg-white border border-[#DDD3C3] rounded-xl p-6 text-left shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-[#EAE3D7] pb-4">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#8C7A67]">Booking Reference</span>
                  <p className="text-lg font-mono font-bold text-[#1C1917] tracking-wider">{bookingRef}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-mono text-[#8C7A67]">Status</span>
                  <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Confirmed
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[#7A7165] block">Date & Time:</span>
                  <p className="font-semibold text-[#1C1917]">{selectedDate} at {selectedTimeSlot}</p>
                </div>
                <div>
                  <span className="text-[#7A7165] block">Assigned Stylist:</span>
                  <p className="font-semibold text-[#1C1917]">{chosenStylist?.name}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-[#7A7165] block">Selected Services:</span>
                  <ul className="mt-1 space-y-1">
                    {selectedServices.map(s => (
                      <li key={s.id} className="text-[#1C1917] flex justify-between font-medium">
                        <span>• {s.name}</span>
                        <span className="tabular-nums">${s.price} AUD</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-2 pt-2 border-t border-[#F0ECE1] flex justify-between font-semibold text-sm">
                  <span>Estimated Total</span>
                  <span className="text-[#936D48]">${totalPrice} AUD</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-[#7A7165] bg-[#FAF8F5] p-3 rounded-lg border border-[#EDE6DA]">
                <p><strong>Salon Location:</strong> {SALON_INFO.address}</p>
                <p className="mt-1">Complimentary herbal teas, artisan coffee, and champagne are served during all appointments.</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleDownloadCalendar}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#24201D] text-white text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#3D352E] transition-all cursor-pointer"
              >
                <CalendarPlus className="w-4 h-4 text-[#E6CBA8]" />
                <span>Add to Apple / Google Calendar</span>
              </button>

              {onClose && (
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 border border-[#DDD3C3] text-[#1C1917] text-xs font-semibold uppercase tracking-wider rounded-md hover:bg-[#EFEAE1] transition-all cursor-pointer"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
