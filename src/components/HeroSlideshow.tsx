import React, { useState, useEffect } from 'react';
import { useProfile, HeroSlide } from '../context/ProfileContext';
import { SalonVisual } from './SalonVisual';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  ArrowRight
} from 'lucide-react';

interface HeroSlideshowProps {
  onNavigateTeam?: () => void;
}

const SlideItem: React.FC<{ slide: HeroSlide; isActive: boolean; index: number }> = ({
  slide,
  isActive,
  index
}) => {
  const [error, setError] = useState(false);

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
        isActive ? 'opacity-100 z-0 scale-100' : 'opacity-0 -z-10 pointer-events-none'
      }`}
    >
      {error ? (
        <SalonVisual
          type="hero-salon"
          alt="Aspire Hair & Body Spa"
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={slide.url}
          alt={`Aspire Hair Salon Slide ${index + 1}`}
          className="w-full h-full object-cover"
          loading={index === 0 ? 'eager' : 'lazy'}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

export const HeroSlideshow: React.FC<HeroSlideshowProps> = ({ onNavigateTeam }) => {
  const { heroSlides } = useProfile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-advance timer (5 seconds per slide)
  useEffect(() => {
    if (!isPlaying || isHovered || heroSlides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, heroSlides.length]);

  // Handle bounds if slides count changes
  useEffect(() => {
    if (currentIndex >= heroSlides.length && heroSlides.length > 0) {
      setCurrentIndex(0);
    }
  }, [heroSlides.length, currentIndex]);

  const handleNext = () => {
    if (heroSlides.length > 1) {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }
  };

  const handlePrev = () => {
    if (heroSlides.length > 1) {
      setCurrentIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    }
  };

  return (
    <div className="relative">
      {/* Main Slideshow Frame */}
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative mx-auto max-w-md lg:max-w-none rounded-2xl overflow-hidden shadow-2xl border-4 border-[#FAF8F5] bg-[#1C1917] aspect-[4/5] sm:aspect-square lg:aspect-[4/5] group select-none transition-all"
      >
        {/* Slides Images or Fallback SVG */}
        {heroSlides.length > 0 ? (
          <div className="relative w-full h-full">
            {heroSlides.map((slide, idx) => (
              <SlideItem
                key={slide.id}
                slide={slide}
                isActive={idx === currentIndex}
                index={idx}
              />
            ))}
          </div>
        ) : (
          <SalonVisual
            type="hero-salon"
            alt="Aspire Hair & Body Spa Glenelg Interior"
            className="w-full h-full object-cover"
          />
        )}

        {/* Subtle Top & Bottom Vignette for UI controls visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/50 pointer-events-none" />

        {/* Top Controls Bar: Slide Counter & Play/Pause */}
        {heroSlides.length > 1 && (
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-1.5">
              <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-white text-[11px] font-mono font-semibold rounded-md border border-white/20">
                {currentIndex + 1} / {heroSlides.length}
              </span>

              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-7 h-7 rounded-md bg-black/60 hover:bg-black/80 backdrop-blur-md text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
                title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
            </div>
          </div>
        )}

        {/* Manual Navigation Arrows (Visible when 2+ slides) */}
        {heroSlides.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-20 active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md flex items-center justify-center border border-white/20 transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-20 active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Bottom Editorial Caption Card */}
        <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-auto">
          <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-white/30 shadow-lg text-left flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-full bg-[#936D48] text-[#FAF8F5] flex items-center justify-center font-serif font-bold text-xs shrink-0 shadow-inner">
                AG
              </div>
              <div className="min-w-0">
                <p className="text-xs font-serif font-bold text-[#1C1917] truncate">
                  Directorship by Angela Gould
                </p>
                <p className="text-[11px] text-[#7A7165] truncate">
                  20+ Years Hair & Dermal Mastery
                </p>
              </div>
            </div>

            {onNavigateTeam && (
              <button
                onClick={onNavigateTeam}
                className="text-[11px] font-semibold text-[#936D48] hover:text-[#24201D] flex items-center gap-1 transition-colors cursor-pointer shrink-0 uppercase tracking-wider"
              >
                <span>Meet Team</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Slide Indicator Dots at Bottom */}
        {heroSlides.length > 1 && (
          <div className="absolute bottom-20 left-0 right-0 flex items-center justify-center gap-1.5 z-20 pointer-events-auto">
            {heroSlides.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  dotIdx === currentIndex
                    ? 'w-6 bg-white shadow-xs'
                    : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
