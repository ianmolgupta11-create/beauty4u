import React, { useState } from 'react';
import { SALON_INFO } from '../data/salonData';
import { 
  ShoppingBag, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Check, 
  MapPin, 
  Ruler, 
  X, 
  CheckCircle2, 
  Eye
} from 'lucide-react';

interface ApparelItem {
  id: string;
  name: string;
  price: number;
  sizes: ('XS' | 'S' | 'M' | 'L' | 'XL')[];
  description: string;
  highlights: string[];
  imageUrl: string;
  imageAlt: string;
}

export const APPAREL_ITEMS: ApparelItem[] = [
  {
    id: 'hoodie',
    name: 'Hoodie',
    price: 55,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Cozy, premium heavyweight fleece hoodie with double-lined hood, front kangaroo pocket, and ribbed cuffs for effortless warmth.',
    highlights: ['Brushed fleece interior', 'Relaxed unisex fit', 'Pre-shrunk cotton blend'],
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Beauty 4 U Bathurst Cozy Fleece Hoodie'
  },
  {
    id: 'quarter-zip',
    name: 'Quarter Zip',
    price: 50,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Sophisticated collared pullover with smooth zip neckline. Designed for versatile layering pre- and post-treatment or daily leisure.',
    highlights: ['High-neck zip collar', 'Structured athletic drape', 'Soft breathable cotton'],
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Beauty 4 U Bathurst Quarter Zip Pullover'
  },
  {
    id: 'track-suit-pants',
    name: 'Track Suit Pants',
    price: 50,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: 'Matching tailored track pants with elasticated waistband, drawstring adjusters, deep side pockets, and cuffed ankles.',
    highlights: ['Elastic waistband + drawcord', 'Deep side pockets', 'Tapered ribbed cuffs'],
    imageUrl: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Beauty 4 U Bathurst Matching Track Suit Pants'
  }
];

export const TracksuitSetsPage: React.FC = () => {
  // Cart / Selected state for each of the 3 items
  const [selectedSizes, setSelectedSizes] = useState<Record<string, 'XS' | 'S' | 'M' | 'L' | 'XL'>>({
    'hoodie': 'M',
    'quarter-zip': 'M',
    'track-suit-pants': 'M'
  });

  // Modal State
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [activeItemForDirectOrder, setActiveItemForDirectOrder] = useState<ApparelItem | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [fulfillmentType, setFulfillmentType] = useState<'pickup' | 'delivery'>('pickup');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  const handleSizeChange = (itemId: string, size: 'XS' | 'S' | 'M' | 'L' | 'XL') => {
    setSelectedSizes(prev => ({ ...prev, [itemId]: size }));
  };

  const handleDirectOrder = (item: ApparelItem) => {
    setActiveItemForDirectOrder(item);
    setIsOrderModalOpen(true);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) return;

    const ref = `B4U-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderRef(ref);
    setOrderComplete(true);
  };

  const handleCloseModal = () => {
    setIsOrderModalOpen(false);
    setOrderComplete(false);
    setActiveItemForDirectOrder(null);
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#936D48] font-semibold flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#936D48]" />
          <span>Beauty 4 U Bathurst · Official Collection</span>
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-medium text-[#1C1917]">
          Track Suit Sets
        </h1>
        <p className="text-sm sm:text-base text-[#6B6358] leading-relaxed">
          Ultra-comfortable, premium quality loungewear. Order individual pieces or create your complete matching set. Available in sizes XS to XL.
        </p>

        {/* Quick Badges */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-[#7A7165]">
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-[#936D48]" />
            <span>Pickup at 223 George St, Bathurst</span>
          </span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Truck className="w-3.5 h-3.5 text-[#936D48]" />
            <span>Australia-Wide Delivery Available</span>
          </span>
          <span>·</span>
          <button
            onClick={() => setIsSizeGuideOpen(true)}
            className="text-[#936D48] hover:underline inline-flex items-center gap-1 cursor-pointer font-medium"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Size Guide</span>
          </button>
        </div>
      </div>

      {/* Hero Showcase Matching the Exact 3 Items & Style with Stock Images */}
      <div className="bg-[#E5F3F0] rounded-3xl p-6 sm:p-10 lg:p-12 border border-[#CDE5E0] shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 divide-y md:divide-y-0 md:divide-x divide-[#C2DDD7]">
          
          {APPAREL_ITEMS.map((item, idx) => (
            <div 
              key={item.id} 
              className={`flex flex-col justify-between text-center space-y-5 ${idx > 0 ? 'pt-8 md:pt-0 md:pl-8 lg:pl-10' : ''}`}
            >
              {/* Product Stock Image Box */}
              <div className="space-y-4">
                <div 
                  className="relative rounded-2xl overflow-hidden aspect-square bg-white shadow-xs border border-[#C2DDD7] group cursor-pointer"
                  onClick={() => setZoomedImage(item.imageUrl)}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.imageAlt}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-3 py-1.5 rounded-full bg-black/60 text-white text-[11px] backdrop-blur-xs flex items-center gap-1 font-medium">
                      <Eye className="w-3.5 h-3.5" /> View Photo
                    </span>
                  </div>
                </div>

                {/* Title in Italic Serif as requested */}
                <h2 className="text-3xl sm:text-4xl font-serif italic font-medium text-[#1F332F] tracking-wide">
                  {item.name}
                </h2>

                {/* Exact Price format: $ 55 / $ 50 */}
                <div className="text-2xl sm:text-3xl font-light text-[#1F332F] tracking-wide">
                  $ {item.price}
                </div>

                {/* Available in sizes text */}
                <p className="text-sm text-[#3E5C56] font-normal tracking-wide">
                  Available in sizes {item.sizes.join(', ')}
                </p>

                <p className="text-xs text-[#4A6862] leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </div>

              {/* Interactive Selector for Size & Ordering */}
              <div className="space-y-4 pt-4 border-t border-[#D0E7E2]">
                
                {/* Size Selector Pills */}
                <div className="space-y-1.5">
                  <span className="text-[11px] uppercase tracking-wider text-[#35524C] font-semibold block">
                    Select Size:
                  </span>
                  <div className="flex items-center justify-center gap-1.5">
                    {item.sizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => handleSizeChange(item.id, sz)}
                        className={`w-9 h-9 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center justify-center ${
                          selectedSizes[item.id] === sz
                            ? 'bg-[#1F332F] text-white shadow-sm ring-2 ring-[#1F332F]/40'
                            : 'bg-white/80 border border-[#B8D7D0] text-[#1F332F] hover:bg-white'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Direct Buy / Reserve Button */}
                <button
                  onClick={() => handleDirectOrder(item)}
                  className="w-full py-3 bg-[#1F332F] hover:bg-[#2C4A44] text-white text-xs font-semibold uppercase tracking-wider rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-[#D8ECE8]" />
                  <span>Reserve {item.name} · ${item.price}</span>
                </button>

              </div>
            </div>
          ))}

        </div>
      </div>

      {/* Set Bundles / Combine & Save Section */}
      <div className="bg-white rounded-3xl border border-[#E5DDD0] p-8 sm:p-10 shadow-xs text-left">
        <div className="max-w-3xl space-y-2 mb-8">
          <span className="text-xs uppercase tracking-widest text-[#936D48] font-semibold">
            Complete Sets
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C1917]">
            Build Your Track Suit Set
          </h3>
          <p className="text-xs sm:text-sm text-[#6B6358]">
            Mix and match sizes for top and bottoms to ensure a flawless tailored fit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Bundle 1: Hoodie + Pants */}
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E0D5C4] flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=200&q=80"
                    alt="Hoodie"
                    className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-xs"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=200&q=80"
                    alt="Track Pants"
                    className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#936D48] bg-[#FAF5EE] px-2 py-0.5 rounded">
                    Popular 2-Piece Set
                  </span>
                  <h4 className="text-base font-serif font-bold text-[#1C1917] mt-1">
                    Classic Hoodie Set
                  </h4>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#F0ECE3]">
                <span className="text-xs text-[#6B6358]">Hoodie ($55) + Pants ($50)</span>
                <span className="text-xl font-serif font-bold text-[#1C1917] tabular-nums">
                  $105 <span className="text-xs font-normal text-[#8C8377]">AUD</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveItemForDirectOrder({
                  id: 'hoodie-set-bundle',
                  name: 'Hoodie + Track Suit Pants Set',
                  price: 105,
                  sizes: ['XS', 'S', 'M', 'L', 'XL'],
                  description: 'Complete 2-piece set including Hoodie and Track Suit Pants.',
                  highlights: ['Full matching outfit', 'Mix/match sizes available'],
                  imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
                  imageAlt: 'Hoodie and Tracksuit Pants Set'
                });
                setIsOrderModalOpen(true);
              }}
              className="w-full py-3 bg-[#24201D] hover:bg-[#936D48] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center"
            >
              Order Complete Hoodie Set ($105)
            </button>
          </div>

          {/* Bundle 2: Quarter Zip + Pants */}
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#E0D5C4] flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=200&q=80"
                    alt="Quarter Zip"
                    className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-xs"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=200&q=80"
                    alt="Track Pants"
                    className="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#936D48] bg-[#FAF5EE] px-2 py-0.5 rounded">
                    Athleisure Zip Set
                  </span>
                  <h4 className="text-base font-serif font-bold text-[#1C1917] mt-1">
                    Quarter Zip Set
                  </h4>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#F0ECE3]">
                <span className="text-xs text-[#6B6358]">Quarter Zip ($50) + Pants ($50)</span>
                <span className="text-xl font-serif font-bold text-[#1C1917] tabular-nums">
                  $100 <span className="text-xs font-normal text-[#8C8377]">AUD</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveItemForDirectOrder({
                  id: 'zip-set-bundle',
                  name: 'Quarter Zip + Track Suit Pants Set',
                  price: 100,
                  sizes: ['XS', 'S', 'M', 'L', 'XL'],
                  description: 'Complete 2-piece set including Quarter Zip pullover and Track Suit Pants.',
                  highlights: ['Full matching outfit', 'Mix/match sizes available'],
                  imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80',
                  imageAlt: 'Quarter Zip and Tracksuit Pants Set'
                });
                setIsOrderModalOpen(true);
              }}
              className="w-full py-3 bg-[#24201D] hover:bg-[#936D48] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors cursor-pointer text-center"
            >
              Order Complete Zip Set ($100)
            </button>
          </div>

        </div>
      </div>

      {/* Ordering & Pickup Information */}
      <div className="bg-[#FAF8F5] rounded-2xl border border-[#E5DDD0] p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#5C554B] text-left">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#1C1917] font-bold">
            <MapPin className="w-4 h-4 text-[#936D48]" />
            <span>Bathurst In-Salon Pickup</span>
          </div>
          <p className="leading-relaxed text-[#7A7165]">
            Pick up your reserved pieces directly from our salon at <strong>223 George Street, Bathurst NSW</strong> during opening hours.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#1C1917] font-bold">
            <Truck className="w-4 h-4 text-[#936D48]" />
            <span>Australia-Wide Delivery</span>
          </div>
          <p className="leading-relaxed text-[#7A7165]">
            Prefer home delivery? We dispatch via Australia Post with tracking numbers provided upon dispatch.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[#1C1917] font-bold">
            <ShieldCheck className="w-4 h-4 text-[#936D48]" />
            <span>Try-On & Exchanges</span>
          </div>
          <p className="leading-relaxed text-[#7A7165]">
            Unsure about sizing? We offer hassle-free size exchanges within 14 days in unworn condition with tags attached.
          </p>
        </div>
      </div>

      {/* Reservation / Order Modal */}
      {isOrderModalOpen && activeItemForDirectOrder && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E5DDD0] text-left relative">
            
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-[#8C8377] hover:text-[#1C1917] p-1.5 rounded-full hover:bg-[#FAF8F5] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {!orderComplete ? (
              <form onSubmit={handleSubmitOrder} className="space-y-5">
                <div className="space-y-1">
                  <span className="text-xs uppercase tracking-widest text-[#936D48] font-semibold">
                    Reserve Track Suit Piece
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-[#1C1917]">
                    {activeItemForDirectOrder.name}
                  </h3>
                </div>

                {/* Item Details with Thumbnail */}
                <div className="p-4 rounded-xl bg-[#E5F3F0] border border-[#CDE5E0] text-xs flex items-center gap-4">
                  <img
                    src={activeItemForDirectOrder.imageUrl}
                    alt={activeItemForDirectOrder.name}
                    className="w-16 h-16 rounded-lg object-cover border border-[#B8D7D0] shadow-xs"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#1F332F] text-sm">{activeItemForDirectOrder.name}</span>
                      <span className="text-base font-bold text-[#1F332F]">$ {activeItemForDirectOrder.price} AUD</span>
                    </div>
                    
                    {activeItemForDirectOrder.id !== 'hoodie-set-bundle' && activeItemForDirectOrder.id !== 'zip-set-bundle' && (
                      <div className="flex items-center gap-2 pt-0.5">
                        <span className="text-[#35524C] font-medium">Selected Size:</span>
                        <strong className="px-2.5 py-0.5 rounded bg-[#1F332F] text-white">
                          {selectedSizes[activeItemForDirectOrder.id] || 'M'}
                        </strong>
                      </div>
                    )}
                  </div>
                </div>

                {/* Fulfillment */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-[#1C1917] block">
                    Fulfillment Method:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setFulfillmentType('pickup')}
                      className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                        fulfillmentType === 'pickup'
                          ? 'border-[#1F332F] bg-[#1F332F] text-white'
                          : 'border-[#DDD3C2] bg-white text-[#6B6358]'
                      }`}
                    >
                      In-Salon Pickup (Bathurst)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFulfillmentType('delivery')}
                      className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                        fulfillmentType === 'delivery'
                          ? 'border-[#1F332F] bg-[#1F332F] text-white'
                          : 'border-[#DDD3C2] bg-white text-[#6B6358]'
                      }`}
                    >
                      Express Delivery
                    </button>
                  </div>
                </div>

                {/* Contact Inputs */}
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-[#1C1917] block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jessica Taylor"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#DDD3C2] rounded-lg text-xs text-[#1C1917] focus:outline-hidden focus:border-[#1F332F]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-[#1C1917] block mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="0400 000 000"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#DDD3C2] rounded-lg text-xs text-[#1C1917] focus:outline-hidden focus:border-[#1F332F]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#1C1917] block mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="jessica@example.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#DDD3C2] rounded-lg text-xs text-[#1C1917] focus:outline-hidden focus:border-[#1F332F]"
                      />
                    </div>
                  </div>

                  {fulfillmentType === 'delivery' && (
                    <div>
                      <label className="text-xs font-medium text-[#1C1917] block mb-1">
                        Delivery Address *
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Street Address, Suburb, State, Postcode"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#DDD3C2] rounded-lg text-xs text-[#1C1917] focus:outline-hidden focus:border-[#1F332F]"
                      />
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#1F332F] hover:bg-[#2C4A44] text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-md transition-colors cursor-pointer"
                  >
                    Confirm Reservation · $ {activeItemForDirectOrder.price} AUD
                  </button>
                  <p className="text-[11px] text-[#8C8377] text-center mt-2">
                    Pay on pickup at 223 George Street, or via invoice prior to dispatch.
                  </p>
                </div>
              </form>
            ) : (
              <div className="space-y-4 text-center py-4">
                <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <h3 className="text-2xl font-serif font-bold text-[#1C1917]">
                  Reservation Confirmed!
                </h3>

                <p className="text-xs text-[#6B6358] leading-relaxed max-w-sm mx-auto">
                  Thank you, <strong>{customerName}</strong>. Your reservation for <strong>{activeItemForDirectOrder.name}</strong> has been received by our salon team.
                </p>

                <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#E8E0D5] inline-block text-xs font-mono">
                  Order Ref: <strong className="text-[#936D48]">{orderRef}</strong>
                </div>

                <p className="text-[11px] text-[#8C8377]">
                  We will SMS your collection notification to {customerPhone}.
                </p>

                <div className="pt-4">
                  <button
                    onClick={handleCloseModal}
                    className="px-6 py-2.5 bg-[#24201D] text-white text-xs font-semibold uppercase tracking-wider rounded-md cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Zoom Image Lightbox */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setZoomedImage(null)}
        >
          <div className="relative max-w-2xl max-h-[85vh]">
            <img
              src={zoomedImage}
              alt="Tracksuit Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
            <button
              onClick={() => setZoomedImage(null)}
              className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/90"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E5DDD0] text-left relative">
            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-4 right-4 text-[#8C8377] hover:text-[#1C1917] p-1.5 rounded-full hover:bg-[#FAF8F5] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#936D48] font-semibold">
                  Sizing & Fit Chart
                </span>
                <h3 className="text-xl font-serif font-bold text-[#1C1917]">
                  Track Suit Sets Sizing Guide
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#DDD3C2] text-[#8C7A67] font-semibold">
                      <th className="py-2 px-3">Size</th>
                      <th className="py-2 px-3">AU Size</th>
                      <th className="py-2 px-3">Bust</th>
                      <th className="py-2 px-3">Waist</th>
                      <th className="py-2 px-3">Hips</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0ECE3] text-[#1C1917]">
                    <tr><td className="py-2 px-3 font-bold">XS</td><td className="py-2 px-3">6 - 8</td><td className="py-2 px-3">82 - 86 cm</td><td className="py-2 px-3">64 - 68 cm</td><td className="py-2 px-3">88 - 92 cm</td></tr>
                    <tr><td className="py-2 px-3 font-bold">S</td><td className="py-2 px-3">8 - 10</td><td className="py-2 px-3">86 - 92 cm</td><td className="py-2 px-3">68 - 74 cm</td><td className="py-2 px-3">92 - 98 cm</td></tr>
                    <tr><td className="py-2 px-3 font-bold">M</td><td className="py-2 px-3">10 - 12</td><td className="py-2 px-3">92 - 98 cm</td><td className="py-2 px-3">74 - 80 cm</td><td className="py-2 px-3">98 - 104 cm</td></tr>
                    <tr><td className="py-2 px-3 font-bold">L</td><td className="py-2 px-3">12 - 14</td><td className="py-2 px-3">98 - 106 cm</td><td className="py-2 px-3">80 - 88 cm</td><td className="py-2 px-3">104 - 112 cm</td></tr>
                    <tr><td className="py-2 px-3 font-bold">XL</td><td className="py-2 px-3">14 - 16</td><td className="py-2 px-3">106 - 114 cm</td><td className="py-2 px-3">88 - 96 cm</td><td className="py-2 px-3">112 - 120 cm</td></tr>
                  </tbody>
                </table>
              </div>

              <p className="text-[11px] text-[#7A7165] leading-relaxed">
                * Designed for a relaxed, comfortable fit. If you prefer a more tailored look, select one size down.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setIsSizeGuideOpen(false)}
                  className="w-full py-2.5 bg-[#24201D] text-white text-xs font-semibold uppercase tracking-wider rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
