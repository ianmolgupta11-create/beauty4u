import React from 'react';

interface SalonVisualProps {
  type: 
    | 'hero-salon'
    | 'profile-picture'
    | 'blonde-dimensional'
    | 'balayage-caramel'
    | 'curls-brunette'
    | 'bob-precision'
    | 'copper-gloss'
    | 'extensions-glam'
    | 'lived-in-beige'
    | 'platinum-pearl'
    | 'spa-sanctuary'
    | 'founder-portrait'
    | 'tools-shears'
    | 'stylist-avatar';
  alt: string;
  className?: string;
  stylistName?: string;
  initials?: string;
  imageUrl?: string;
}

export const SalonVisual: React.FC<SalonVisualProps> = ({
  type,
  alt,
  className = '',
  stylistName,
  initials,
  imageUrl
}) => {
  // Common container styling
  const baseClasses = `relative overflow-hidden select-none ${className}`;

  if (imageUrl) {
    return (
      <div className={`${baseClasses} bg-[#1C1917]`}>
        <img
          src={imageUrl}
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  if (type === 'profile-picture') {
    return (
      <div className={`${baseClasses} bg-[#CCD7DE] flex items-center justify-center`}>
        {/* We use the exact SVG asset created from the user's uploaded profile picture */}
        <img
          src="/aspire-profile.svg"
          alt={alt || "Aspire Hair Profile"}
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
    );
  }

  if (type === 'hero-salon') {
    return (
      <div className={`${baseClasses} bg-[#23201D] text-[#FAF8F5]`}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#3D352E] via-[#24201C] to-[#141211] opacity-90" />
        
        {/* Architectural salon lines & arches */}
        <svg className="absolute inset-0 w-full h-full opacity-25" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="archGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#8C7355" stopOpacity="0.05" />
            </linearGradient>
            <radialGradient id="lightGlow" cx="50%" cy="30%" r="50%">
              <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#lightGlow)" />
          {/* Stylized Salon Arch Mirrors */}
          <path d="M120 400 V220 A90 90 0 0 1 300 220 V400" stroke="url(#archGrad)" strokeWidth="1.5" fill="none" />
          <path d="M420 400 V180 A120 120 0 0 1 660 180 V400" stroke="url(#archGrad)" strokeWidth="2" fill="none" />
          <path d="M780 400 V220 A90 90 0 0 1 960 220 V400" stroke="url(#archGrad)" strokeWidth="1.5" fill="none" />
          {/* Subtle travertine floor line */}
          <line x1="0" y1="400" x2="1200" y2="400" stroke="#8C7355" strokeWidth="1" strokeOpacity="0.3" />
        </svg>

        {/* Floating warm atmospheric dust particles and luxury aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141211] via-transparent to-black/30" />
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-[#C8BEB2] tracking-wider uppercase">
          <span>Beauty 4 U · Bathurst Salon & Spa</span>
          <span>Est. 2010</span>
        </div>
      </div>
    );
  }

  if (type === 'spa-sanctuary') {
    return (
      <div className={`${baseClasses} bg-[#1F2620]`}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#2D382F] via-[#202721] to-[#121713]" />
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
          <circle cx="200" cy="150" r="100" stroke="#9BB09D" strokeWidth="1" strokeDasharray="4 4" fill="none" />
          <path d="M160 150 Q200 80 240 150 Q200 220 160 150 Z" fill="#435246" opacity="0.6" />
          <circle cx="200" cy="150" r="12" fill="#E8D5B5" opacity="0.8" />
        </svg>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-xs text-[#E3EDE4] tracking-widest uppercase">
          Dermal Spa & Skin Wellness
        </div>
      </div>
    );
  }

  if (type === 'founder-portrait' || type === 'stylist-avatar') {
    const defaultInitials = initials || (stylistName ? stylistName.slice(0, 2).toUpperCase() : 'AH');
    return (
      <div className={`${baseClasses} bg-[#EDE6DC] flex flex-col items-center justify-center`}>
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#E8DFD3] to-[#D5C9B8]" />
        
        {/* Subtle silhouette graphic */}
        <svg className="w-2/3 h-2/3 text-[#9A8772] opacity-70 transition-transform duration-500 group-hover:scale-105" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.686 2 6 4.686 6 8c0 2.21 1.196 4.143 2.973 5.185C5.163 14.773 2.5 18.067 2.5 22h19c0-3.933-2.663-7.227-6.473-8.815C16.804 12.143 18 10.21 18 8c0-3.314-2.686-6-6-6zm0 2c2.209 0 4 1.791 4 4s-1.791 4-4 4-4-1.791-4-4 1.791-4 4-4zm0 12c3.314 0 6.136 1.838 7.027 4.5H4.973C5.864 19.838 8.686 18 12 18z"/>
        </svg>

        <span className="absolute bottom-3 right-3 text-[11px] font-mono font-medium text-[#7D6B57] bg-white/70 px-2 py-0.5 rounded backdrop-blur-sm shadow-xs">
          {defaultInitials}
        </span>
      </div>
    );
  }

  // Instagram Hairstyle cards (Dimensional Blonde, Caramel Balayage, Textured Bob, etc.)
  const gradientStyles: Record<string, { bg: string; waveColors: string[]; badge: string; accent: string }> = {
    'blonde-dimensional': {
      bg: 'from-[#FDFBF7] via-[#F2E5CE] to-[#C9AB78]',
      waveColors: ['#EAD19E', '#FFF8EC', '#BD9A61'],
      badge: 'Creamy Blonde',
      accent: '#9C7A40'
    },
    'balayage-caramel': {
      bg: 'from-[#382619] via-[#65432B] to-[#B88755]',
      waveColors: ['#8A5A36', '#DDAA76', '#4E311D'],
      badge: 'Warm Balayage',
      accent: '#E6BC8E'
    },
    'curls-brunette': {
      bg: 'from-[#1A1513] via-[#332722] to-[#59443B]',
      waveColors: ['#7A5E52', '#3D2F28', '#A88677'],
      badge: 'Luxe Waves',
      accent: '#D1BAAF'
    },
    'bob-precision': {
      bg: 'from-[#2B2827] via-[#4F4A46] to-[#8A827B]',
      waveColors: ['#69625D', '#B5ACA4', '#363230'],
      badge: 'French Bob',
      accent: '#DFD8D0'
    },
    'copper-gloss': {
      bg: 'from-[#4D1D13] via-[#853923] to-[#CF6E44]',
      waveColors: ['#A84B2E', '#F59A6E', '#5E2215'],
      badge: 'Spiced Copper',
      accent: '#FFC8B0'
    },
    'extensions-glam': {
      bg: 'from-[#F9F4EC] via-[#E6D4BD] to-[#A68862]',
      waveColors: ['#D6BA96', '#FAF2E6', '#876943'],
      badge: 'Showpony 20"',
      accent: '#7D6039'
    },
    'lived-in-beige': {
      bg: 'from-[#F7F4EF] via-[#DFD5C6] to-[#A89884]',
      waveColors: ['#C4B5A2', '#F9F7F3', '#7F705E'],
      badge: 'Beige Face-Frame',
      accent: '#736453'
    },
    'platinum-pearl': {
      bg: 'from-[#F0F2F5] via-[#DEE2E8] to-[#99A6B8]',
      waveColors: ['#CFD6E0', '#FFFFFF', '#7E8CA0'],
      badge: 'Nordic Platinum',
      accent: '#4F5E73'
    }
  };

  const styleConfig = gradientStyles[type] || gradientStyles['blonde-dimensional'];

  return (
    <div className={`${baseClasses} bg-gradient-to-br ${styleConfig.bg} group aspect-square flex flex-col justify-between p-4`}>
      {/* Editorial flowing wave lines representation */}
      <svg className="absolute inset-0 w-full h-full opacity-60 mix-blend-overlay transition-transform duration-700 ease-out group-hover:scale-105" viewBox="0 0 300 300" preserveAspectRatio="none">
        <path d="M0,100 C150,200 150,50 300,120 L300,300 L0,300 Z" fill={styleConfig.waveColors[0]} opacity="0.6" />
        <path d="M0,160 C120,60 180,240 300,170 L300,300 L0,300 Z" fill={styleConfig.waveColors[1]} opacity="0.4" />
        <path d="M0,210 C80,280 200,140 300,230 L300,300 L0,300 Z" fill={styleConfig.waveColors[2]} opacity="0.5" />
        <circle cx="150" cy="110" r="60" stroke="#FFFFFF" strokeWidth="1" strokeOpacity="0.25" fill="none" />
      </svg>

      {/* Top subtle tone badge */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="text-[11px] font-medium tracking-wider uppercase text-white/90 bg-black/35 px-2.5 py-1 rounded backdrop-blur-md">
          {styleConfig.badge}
        </span>
        <span className="text-[10px] text-white/80 font-mono tracking-widest uppercase">
          Aspire Style
        </span>
      </div>

      {/* Bottom text scrim and title */}
      <div className="relative z-10">
        <div className="bg-black/40 backdrop-blur-md p-2.5 rounded-lg border border-white/10 text-white">
          <p className="text-xs font-semibold tracking-wide line-clamp-1">{alt}</p>
          {stylistName && (
            <p className="text-[11px] text-white/80 mt-0.5">Crafted by {stylistName}</p>
          )}
        </div>
      </div>
    </div>
  );
};
