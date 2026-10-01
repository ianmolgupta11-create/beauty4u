import React, { useState, useMemo } from 'react';
import { INSTAGRAM_POSTS_DATA, SALON_INFO } from '../data/salonData';
import { InstagramPost } from '../types';
import { SalonVisual } from '../components/SalonVisual';
import { ProfileAvatar } from '../components/ProfileAvatar';
import { useProfile } from '../context/ProfileContext';
import { 
  Instagram, 
  Heart, 
  MessageCircle, 
  ExternalLink, 
  Calendar,
  Sparkles,
  MapPin,
  Phone,
  Bookmark,
  Check
} from 'lucide-react';

interface GalleryPageProps {
  onSelectPost: (post: InstagramPost) => void;
  onOpenBooking: (serviceId?: string, stylistId?: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onSelectPost,
  onOpenBooking
}) => {
  const { feedPosts } = useProfile();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [followed, setFollowed] = useState(false);

  const filterTabs = [
    { id: 'all', label: 'All Recent Styles' },
    { id: 'blondes', label: 'Blonde Corrections & Foilayage' },
    { id: 'balayage', label: 'Spring Palette & Balayage' },
    { id: 'treatments', label: 'Bhave Keratin & Spa' },
    { id: 'bridal', label: 'Bridal Suite Creations' },
    { id: 'extensions', label: 'Showpony Extensions' },
    { id: 'cuts', label: 'Precision Cuts' },
  ];

  const highlights = [
    { label: 'Blondes', icon: '✨' },
    { label: 'Colour Room', icon: '🎨' },
    { label: 'Bridal Suite', icon: '💍' },
    { label: 'Bhave Smooth', icon: '🤍' },
    { label: 'Spa Hut & Tan', icon: '🌿' },
    { label: 'Before/After', icon: '🪄' }
  ];

  // Combine custom uploaded posts from public assets with base portfolio
  const allPosts = useMemo(() => {
    const customIds = new Set(feedPosts.map((p) => p.id));
    const defaults = INSTAGRAM_POSTS_DATA.filter((p) => !customIds.has(p.id));
    return [...feedPosts, ...defaults];
  }, [feedPosts]);

  const filteredPosts = useMemo(() => {
    if (selectedFilter === 'all') return allPosts;
    return allPosts.filter((p) => p.category === selectedFilter);
  }, [allPosts, selectedFilter]);

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      {/* Instagram Profile Header Container */}
      <div className="bg-white rounded-2xl border border-[#E5DDD0] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 pb-6 border-b border-[#F0EAE1]">
          
          <div className="flex flex-col sm:flex-row items-center md:items-start gap-6 text-center sm:text-left">
            
            {/* Salon Profile Picture */}
            <div className="shrink-0 flex flex-col items-center">
              <ProfileAvatar
                size="lg"
                withStoryRing={true}
              />
            </div>

            {/* Profile Bio Details */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <h1 className="text-xl sm:text-2xl font-bold text-[#1C1917] font-mono tracking-tight">
                  beauty4ubathurst
                </h1>
                <span className="text-[11px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  Verified Business
                </span>
                
                <a
                  href={SALON_INFO.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setFollowed(true)}
                  className={`text-xs font-semibold px-4 py-1.5 rounded-md transition-colors inline-flex items-center gap-1.5 cursor-pointer ${
                    followed
                      ? 'bg-[#EAE4D9] text-[#1C1917]'
                      : 'bg-[#936D48] text-white hover:bg-[#7D5B3A]'
                  }`}
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{followed ? 'Following ✓' : 'Follow on Instagram'}</span>
                </a>
              </div>

              {/* Counts */}
              <div className="flex items-center justify-center sm:justify-start gap-6 text-xs text-[#5C554B]">
                <span><strong className="text-[#1C1917] font-bold">1,240</strong> Posts</span>
                <span><strong className="text-[#1C1917] font-bold">5.8k</strong> Followers</span>
                <span><strong className="text-[#1C1917] font-bold">920</strong> Following</span>
              </div>

              {/* Bio matching @beauty4ubathurst */}
              <div className="text-xs text-[#5C554B] max-w-xl leading-relaxed space-y-1">
                <p className="font-semibold text-[#1C1917]">Beauty 4 U Bathurst</p>
                <p>Hair Salon · Dermal Skin & Beauty Sanctuary</p>
                <p className="text-[#936D48] font-medium">
                  📍 {SALON_INFO.address} · {SALON_INFO.phone}
                </p>
                <p>
                  ✨ Organic Nanoplasty Straightening · Hydrodermabrasion Facials<br />
                  🤍 Korean Lash Lift · Dermalogica Peels · Hybrid Brow Sculpting · Balayage
                </p>
              </div>

              <div className="pt-1 flex items-center justify-center sm:justify-start gap-3">
                <a
                  href={SALON_INFO.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-[#936D48] hover:underline inline-flex items-center gap-1"
                >
                  <span>instagram.com/beauty4ubathurst</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

          </div>

          {/* Quick Booking CTAs */}
          <div className="flex flex-col gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 bg-[#24201D] hover:bg-[#3D352E] text-white text-xs font-semibold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#E6CBA8]" />
              <span>Book Appointment Online</span>
            </button>
            <a
              href="https://www.instagram.com/aspire_hair_and_body_spa/"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 border border-[#DDD3C2] hover:bg-[#F4EFE6] text-[#1C1917] text-xs font-medium rounded-md flex items-center justify-center gap-1.5 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-[#936D48]" />
              <span>View Live Feed in Instagram</span>
              <ExternalLink className="w-3 h-3 text-[#8C8173]" />
            </a>
          </div>

        </div>

        {/* Stories Highlights Carousel */}
        <div className="pt-6">
          <span className="text-[10px] uppercase font-bold tracking-widest text-[#8A8174] block mb-3 text-center sm:text-left">
            Featured Salon Highlights
          </span>
          <div className="flex items-center justify-start sm:justify-start gap-5 overflow-x-auto pb-2 scrollbar-none">
            {highlights.map((h, i) => (
              <button
                key={i}
                onClick={() => {
                  if (h.label.includes('Blonde')) setSelectedFilter('blondes');
                  else if (h.label.includes('Bridal')) setSelectedFilter('bridal');
                  else if (h.label.includes('Bhave')) setSelectedFilter('treatments');
                  else if (h.label.includes('Colour')) setSelectedFilter('balayage');
                  else setSelectedFilter('all');
                }}
                className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#DDD3C2] group-hover:border-[#936D48] p-0.5 transition-colors bg-[#FAF8F5] flex items-center justify-center text-xl shadow-xs">
                  <span>{h.icon}</span>
                </div>
                <span className="text-[11px] font-medium text-[#5C554B] group-hover:text-[#1C1917]">
                  {h.label}
                </span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedFilter(tab.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-md whitespace-nowrap transition-all cursor-pointer ${
              selectedFilter === tab.id
                ? 'bg-[#24201D] text-[#FAF8F5] shadow-xs'
                : 'bg-white border border-[#DDD3C2] text-[#5C554B] hover:bg-[#F2ECE1] hover:text-[#1C1917]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Instagram Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => onSelectPost(post)}
            className="bg-white rounded-xl border border-[#E5DDD0] overflow-hidden hover:shadow-xl hover:border-[#C4B7A5] transition-all cursor-pointer group flex flex-col justify-between text-left"
          >
            {/* Visual with hover interaction */}
            <div className="relative">
              <SalonVisual
                type={post.imageType || 'blonde-dimensional'}
                alt={post.styleName}
                stylistName={post.stylistName}
                imageUrl={post.imageUrl}
                className="w-full aspect-square"
              />

              {post.imageUrl && (
                <div className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-xs text-white text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>Public Asset</span>
                </div>
              )}

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 p-6 text-white text-center">
                <div className="flex items-center gap-4 text-sm font-semibold">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4 fill-white" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 fill-white" /> {post.commentsCount}
                  </span>
                </div>
                <span className="px-4 py-2 bg-white text-[#1C1917] text-xs font-semibold uppercase tracking-wider rounded shadow-md">
                  Inspect Formula & Book Look
                </span>
              </div>
            </div>

            {/* Post Information */}
            <div className="p-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-[#8A8174]">
                <span className="font-semibold text-[#936D48]">
                  Styled by {post.stylistName}
                </span>
                <span>{post.postedAgo}</span>
              </div>

              <h3 className="text-sm font-semibold text-[#1C1917] leading-tight">
                {post.styleName}
              </h3>

              <p className="text-xs text-[#5C554B] line-clamp-2 leading-relaxed">
                {post.caption}
              </p>

              {post.formulaNote && (
                <div className="text-[11px] text-[#7A7165] bg-[#FAF8F5] p-2 rounded border border-[#EDE6DC] truncate">
                  <strong>Formula:</strong> {post.formulaNote}
                </div>
              )}

              <div className="pt-2 border-t border-[#F0ECE3] flex items-center justify-between text-xs">
                <span className="text-[#8C8173] font-mono text-[11px]">
                  ♥ {post.likes} likes
                </span>
                <span className="text-[#936D48] font-medium group-hover:underline">
                  View Look & Book →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Social Media Community Banner */}
      <div className="bg-[#FAF8F5] border border-[#DDD3C2] rounded-2xl p-8 sm:p-12 text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#936D48] font-semibold">
          Bathurst Regional Artistry
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#1C1917]">
          Follow @aspire_hair_and_body_spa on Instagram
        </h2>
        <p className="text-xs sm:text-sm text-[#6B6358] max-w-xl mx-auto leading-relaxed">
          See daily behind-the-scenes transformations, private bridal suite setups, and seasonal promotions right on your Instagram feed.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://www.instagram.com/aspire_hair_and_body_spa/"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 bg-[#936D48] hover:bg-[#7D5B3A] text-white text-xs font-semibold rounded-md transition-colors inline-flex items-center gap-2"
          >
            <Instagram className="w-4 h-4" />
            <span>Open @aspire_hair_and_body_spa</span>
          </a>
          <button
            onClick={() => onOpenBooking()}
            className="px-5 py-2.5 bg-[#24201D] hover:bg-[#3D352E] text-white text-xs font-semibold uppercase tracking-wider rounded-md transition-colors"
          >
            Reserve Your Hair Transformation
          </button>
        </div>
      </div>

    </div>
  );
};
