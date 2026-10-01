import React, { useState } from 'react';
import { useProfile } from '../context/ProfileContext';

interface ProfileAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  withStoryRing?: boolean;
  className?: string;
  alt?: string;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  size = 'md',
  withStoryRing = false,
  className = '',
  alt = 'Beauty 4 U Bathurst'
}) => {
  const { profileImage } = useProfile();
  const [hasError, setHasError] = useState(false);

  // Dimensions based on size
  const sizeMap = {
    sm: 'w-10 h-10 text-xs',
    md: 'w-14 h-14 text-sm',
    lg: 'w-24 h-24 sm:w-28 sm:h-28 text-lg',
    xl: 'w-32 h-32 sm:w-36 sm:h-36 text-xl'
  };

  const currentSizeClass = sizeMap[size];
  const imageSrc = profileImage || '/assets/profile-picture.jpg';

  const avatarContent = (
    <div
      className={`relative rounded-full overflow-hidden bg-[#FAF8F5] select-none shadow-xs border border-[#DDD3C2] flex items-center justify-center ${currentSizeClass} ${className}`}
    >
      {hasError ? (
        <div className="w-full h-full bg-[#EAE2D5] flex items-center justify-center text-[#936D48] font-serif font-bold">
          <span>B4U</span>
        </div>
      ) : (
        <img
          src={imageSrc}
          alt={alt}
          className="w-full h-full object-cover"
          loading="eager"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );

  if (withStoryRing) {
    return (
      <div className="relative group">
        <div className="rounded-full p-1 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 shadow-md">
          <div className="rounded-full bg-white p-0.5">
            {avatarContent}
          </div>
        </div>
      </div>
    );
  }

  return avatarContent;
};
