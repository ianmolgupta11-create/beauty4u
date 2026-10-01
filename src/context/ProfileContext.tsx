import React, { createContext, useContext, useState, useEffect } from 'react';
import { InstagramPost, Stylist } from '../types';
import { STYLISTS_DATA } from '../data/salonData';

export interface HeroSlide {
  id: string;
  url: string;
  createdAt: number;
}

interface UploadFeedData {
  file: File;
  styleName: string;
  stylistName: string;
  category: 'blondes' | 'balayage' | 'cuts' | 'extensions' | 'treatments' | 'bridal';
  formulaNote?: string;
  timeSpent?: string;
  caption?: string;
  tags?: string[];
}

interface ProfileContextType {
  profileImage: string;
  founderImage: string | null;
  isSavingFounder: boolean;
  uploadFounderImage: (file: File) => Promise<string>;
  resetFounderImage: () => Promise<void>;
  
  // Hero
  heroImage: string | null;
  heroSlides: HeroSlide[];
  isSavingHero: boolean;
  uploadHeroSlides: (files: FileList | File[]) => Promise<HeroSlide[]>;
  deleteHeroSlide: (id: string) => Promise<void>;
  resetAllHeroSlides: () => Promise<void>;
  uploadHeroImage: (file: File) => Promise<string>;
  resetHeroImage: () => Promise<void>;
  
  // Feed
  feedPosts: InstagramPost[];
  isLoadingFeed: boolean;
  isUploadingFeed: boolean;
  loadFeedPosts: () => Promise<void>;
  uploadFeedPost: (data: UploadFeedData) => Promise<InstagramPost>;
  deleteFeedPost: (id: string) => Promise<void>;

  // Team Members & Stylist Photos
  teamMembers: Stylist[];
  isLoadingTeam: boolean;
  isSavingTeam: boolean;
  loadTeamMembers: () => Promise<void>;
  uploadTeamPhoto: (stylistId: string, file: File) => Promise<string>;
  updateTeamMember: (stylist: Stylist) => Promise<void>;
  addTeamMember: (stylist: Omit<Stylist, 'id'>) => Promise<void>;
  deleteTeamMember: (stylistId: string) => Promise<void>;
  resetTeamMembers: () => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

const HERO_SLIDES_STORAGE_KEY = 'b4u_custom_hero_slides_v2';
const FOUNDER_IMAGE_STORAGE_KEY = 'b4u_custom_founder_image_v2';
const TEAM_STORAGE_KEY = 'b4u_bathurst_3_team_members_v4';

const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 'legacy-hero',
    url: '/assets/hero-salon.jpg',
    createdAt: 1790825662939
  },
  {
    id: 'slide-1',
    url: '/assets/hero/slide-1790826145722-1.jpg',
    createdAt: 1790826145722
  },
  {
    id: 'slide-2',
    url: '/assets/hero/slide-1790826166309-1.jpg',
    createdAt: 1790826166309
  },
  {
    id: 'slide-3',
    url: '/assets/hero/slide-1790826188775-1.jpg',
    createdAt: 1790826188775
  }
];

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Permanent public profile image
  const [profileImage] = useState<string>('/assets/profile-picture.jpg');
  
  // Founder (Belinda) custom portrait
  const [founderImage, setFounderImage] = useState<string | null>('/assets/founder-picture.jpg');
  const [isSavingFounder, setIsSavingFounder] = useState<boolean>(false);

  // Hero showcase slideshow photos
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(DEFAULT_HERO_SLIDES);
  const [isSavingHero, setIsSavingHero] = useState<boolean>(false);

  // Feed posts
  const [feedPosts, setFeedPosts] = useState<InstagramPost[]>([]);
  const [isLoadingFeed, setIsLoadingFeed] = useState<boolean>(true);
  const [isUploadingFeed, setIsUploadingFeed] = useState<boolean>(false);

  // Team members
  const [teamMembers, setTeamMembers] = useState<Stylist[]>(STYLISTS_DATA);
  const [isLoadingTeam, setIsLoadingTeam] = useState<boolean>(false);
  const [isSavingTeam, setIsSavingTeam] = useState<boolean>(false);

  // Load public founder image on mount
  useEffect(() => {
    let isMounted = true;
    async function loadPublicFounderImage() {
      try {
        const res = await fetch('/api/founder-image');
        if (res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('application/json')) {
            const data = await res.json();
            if (data.exists && data.url && isMounted) {
              setFounderImage(data.url);
              return;
            }
          }
        }
      } catch (err) {
        // Expected on static hosting like Vercel
      }

      try {
        const local = localStorage.getItem(FOUNDER_IMAGE_STORAGE_KEY);
        if (local && isMounted) {
          setFounderImage(local);
          return;
        }
      } catch (e) {}

      if (isMounted) {
        setFounderImage('/assets/founder-picture.jpg');
      }
    }

    loadPublicFounderImage();

    return () => {
      isMounted = false;
    };
  }, []);

  // Upload founder image to public directory
  const uploadFounderImage = async (file: File): Promise<string> => {
    if (!file.type.startsWith('image/')) {
      throw new Error('Please select an image file (JPG, PNG, WEBP).');
    }

    setIsSavingFounder(true);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const dataUrl = event.target?.result as string;
        if (!dataUrl) {
          setIsSavingFounder(false);
          reject(new Error('Failed to read image.'));
          return;
        }

        // 1. Instant optimistic update
        setFounderImage(dataUrl);

        // 2. Local fallback
        try {
          localStorage.setItem(FOUNDER_IMAGE_STORAGE_KEY, dataUrl);
        } catch (e) {
          console.warn('Local storage write error', e);
        }

        // 3. Save to public directory
        try {
          const res = await fetch('/api/upload-founder-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dataUrl })
          });

          if (res.ok) {
            const data = await res.json();
            if (data.url) {
              setFounderImage(data.url);
              // Also update Belinda in teamMembers if present
              setTeamMembers((prev) =>
                prev.map((m) => (m.id === 'belinda' ? { ...m, imageUrl: data.url } : m))
              );
              resolve(data.url);
              return;
            }
          }
          resolve(dataUrl);
        } catch (err) {
          console.warn('Server upload error for founder image', err);
          resolve(dataUrl);
        } finally {
          setIsSavingFounder(false);
        }
      };

      reader.onerror = (err) => {
        setIsSavingFounder(false);
        reject(err);
      };

      reader.readAsDataURL(file);
    });
  };

  const resetFounderImage = async () => {
    setFounderImage(null);
    try {
      localStorage.removeItem(FOUNDER_IMAGE_STORAGE_KEY);
    } catch (e) {
      console.warn(e);
    }
    try {
      await fetch('/api/founder-image', { method: 'DELETE' });
    } catch (err) {
      console.warn(err);
    }
  };

  // --- TEAM MEMBERS MANAGEMENT ---
  const loadTeamMembers = async () => {
    // Clear any obsolete localStorage keys from previous versions
    try {
      localStorage.removeItem('aspire_custom_team_members');
      localStorage.removeItem('aspire_team_members');
      localStorage.removeItem('beauty4u_team_members');
      localStorage.removeItem('b4u_bathurst_official_team_v3');
    } catch (e) {}

    try {
      setIsLoadingTeam(true);
      const res = await fetch('/api/team-members');
      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (data.success && Array.isArray(data.members) && data.members.length === 3) {
            const has3Members = data.members.some((m: Stylist) => m.name.includes('Kailtyn') || m.name.includes('Madeline') || m.name.includes('Sienna'));
            if (has3Members) {
              setTeamMembers(data.members);
              try {
                localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(data.members));
              } catch (e) {}
              return;
            }
          }
        }
      }
    } catch (err) {
      // Server not present on static hosting
    } finally {
      setIsLoadingTeam(false);
    }

    try {
      const staticRes = await fetch('/assets/team-members.json');
      if (staticRes.ok) {
        const contentType = staticRes.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const staticData = await staticRes.json();
          if (Array.isArray(staticData) && staticData.length === 3) {
            const has3Members = staticData.some((m: Stylist) => m.name.includes('Kailtyn') || m.name.includes('Madeline') || m.name.includes('Sienna'));
            if (has3Members) {
              setTeamMembers(staticData);
              return;
            }
          }
        }
      }
    } catch (e) {}

    try {
      const local = localStorage.getItem(TEAM_STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length === 3) {
          const has3Members = parsed.some((m: Stylist) => m.name.includes('Kailtyn') || m.name.includes('Madeline') || m.name.includes('Sienna'));
          if (has3Members) {
            setTeamMembers(parsed);
            return;
          }
        }
      }
    } catch (e) {}

    setTeamMembers(STYLISTS_DATA);
  };

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const uploadTeamPhoto = async (stylistId: string, file: File): Promise<string> => {
    if (!file.type.startsWith('image/')) {
      throw new Error('Please select an image file (JPG, PNG, WEBP).');
    }

    setIsSavingTeam(true);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const dataUrl = event.target?.result as string;
        if (!dataUrl) {
          setIsSavingTeam(false);
          reject(new Error('Failed to read image.'));
          return;
        }

        // Optimistic UI update
        setTeamMembers((prev) =>
          prev.map((m) => (m.id === stylistId ? { ...m, imageUrl: dataUrl } : m))
        );

        if (stylistId === 'belinda') {
          setFounderImage(dataUrl);
        }

        try {
          const res = await fetch('/api/upload-team-photo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ stylistId, dataUrl })
          });

          if (res.ok) {
            const data = await res.json();
            if (data.url) {
              setTeamMembers((prev) =>
                prev.map((m) => (m.id === stylistId ? { ...m, imageUrl: data.url } : m))
              );
              if (stylistId === 'belinda') {
                setFounderImage(data.url);
              }
              resolve(data.url);
              return;
            }
          }
          resolve(dataUrl);
        } catch (err) {
          console.warn('Server error uploading team photo', err);
          resolve(dataUrl);
        } finally {
          setIsSavingTeam(false);
        }
      };

      reader.onerror = (err) => {
        setIsSavingTeam(false);
        reject(err);
      };

      reader.readAsDataURL(file);
    });
  };

  const updateTeamMember = async (updatedStylist: Stylist) => {
    const updated = teamMembers.map((m) => (m.id === updatedStylist.id ? updatedStylist : m));
    setTeamMembers(updated);
    try {
      localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(updated));
      await fetch('/api/team-members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ members: updated })
      });
    } catch (err) {
      console.warn('Failed to save updated team member', err);
    }
  };

  const addTeamMember = async (newMember: Omit<Stylist, 'id'>) => {
    const id = newMember.name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now().toString().slice(-4);
    const member: Stylist = {
      ...newMember,
      id,
      accentColor: newMember.accentColor || '#936D48',
      avatarPlaceholderColor: newMember.avatarPlaceholderColor || '#F3ECE4'
    };
    const updated = [...teamMembers, member];
    setTeamMembers(updated);
    try {
      localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(updated));
      await fetch('/api/team-members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ members: updated })
      });
    } catch (err) {
      console.warn('Failed to add team member', err);
    }
  };

  const deleteTeamMember = async (stylistId: string) => {
    const updated = teamMembers.filter((m) => m.id !== stylistId);
    setTeamMembers(updated);
    try {
      localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(updated));
      await fetch(`/api/team-members/${stylistId}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Failed to delete team member', err);
    }
  };

  const resetTeamMembers = async () => {
    try {
      const res = await fetch('/api/reset-team-members', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        if (data.members) {
          setTeamMembers(data.members);
          localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(data.members));
          return;
        }
      }
    } catch (err) {
      console.warn('Failed to reset team', err);
    }
    setTeamMembers(STYLISTS_DATA);
    localStorage.removeItem(TEAM_STORAGE_KEY);
  };

  // --- HERO SLIDESHOW ---
  const loadHeroSlides = async () => {
    try {
      const res = await fetch('/api/hero-slides');
      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (data.success && Array.isArray(data.slides) && data.slides.length > 0) {
            setHeroSlides(data.slides);
            return;
          }
        }
      }
    } catch (err) {
      // Server not present on static hosting
    }

    try {
      const staticRes = await fetch('/assets/hero/slides.json');
      if (staticRes.ok) {
        const contentType = staticRes.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const staticSlides = await staticRes.json();
          if (Array.isArray(staticSlides) && staticSlides.length > 0) {
            setHeroSlides(staticSlides);
            return;
          }
        }
      }
    } catch (e) {}

    try {
      const local = localStorage.getItem(HERO_SLIDES_STORAGE_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setHeroSlides(parsed);
          return;
        }
      }
    } catch (e) {}

    setHeroSlides(DEFAULT_HERO_SLIDES);
  };

  useEffect(() => {
    loadHeroSlides();
  }, []);

  // Upload multiple hero photos
  const uploadHeroSlides = async (filesInput: FileList | File[]): Promise<HeroSlide[]> => {
    const files = Array.from(filesInput).filter((f) => f.type.startsWith('image/'));
    if (files.length === 0) {
      throw new Error('Please select one or more image files (JPG, PNG, WEBP).');
    }

    setIsSavingHero(true);

    try {
      const readPromises = files.map((file) => {
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const dataUrls = await Promise.all(readPromises);

      const res = await fetch('/api/upload-hero-slides', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataUrls })
      });

      if (!res.ok) {
        throw new Error('Failed to save photos to public assets directory.');
      }

      const resData = await res.json();
      if (resData.success && Array.isArray(resData.slides)) {
        setHeroSlides(resData.slides);
        try {
          localStorage.setItem(HERO_SLIDES_STORAGE_KEY, JSON.stringify(resData.slides));
        } catch (e) {
          console.warn(e);
        }
        return resData.slides;
      }
      return heroSlides;
    } finally {
      setIsSavingHero(false);
    }
  };

  const deleteHeroSlide = async (id: string) => {
    try {
      const res = await fetch(`/api/hero-slides/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const data = await res.json();
        const updated = data.slides || heroSlides.filter((s) => s.id !== id);
        setHeroSlides(updated);
        try {
          localStorage.setItem(HERO_SLIDES_STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {
          console.warn(e);
        }
      }
    } catch (err) {
      console.warn('Failed to delete slide', err);
    }
  };

  const resetAllHeroSlides = async () => {
    try {
      await fetch('/api/hero-slides', { method: 'DELETE' });
      setHeroSlides([]);
      localStorage.removeItem(HERO_SLIDES_STORAGE_KEY);
    } catch (err) {
      console.warn('Failed to reset hero slides', err);
      setHeroSlides([]);
    }
  };

  const uploadHeroImage = async (file: File): Promise<string> => {
    const slides = await uploadHeroSlides([file]);
    return slides[slides.length - 1]?.url || '';
  };

  const resetHeroImage = async () => {
    await resetAllHeroSlides();
  };

  // --- FEED POSTS ---
  const loadFeedPosts = async () => {
    try {
      setIsLoadingFeed(true);
      const res = await fetch('/api/feed-posts');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.posts)) {
          setFeedPosts(data.posts);
        }
      }
    } catch (err) {
      console.warn('Could not fetch feed posts from server assets:', err);
    } finally {
      setIsLoadingFeed(false);
    }
  };

  useEffect(() => {
    loadFeedPosts();
  }, []);

  const uploadFeedPost = async (data: UploadFeedData): Promise<InstagramPost> => {
    setIsUploadingFeed(true);

    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const dataUrl = event.target?.result as string;
        if (!dataUrl) {
          setIsUploadingFeed(false);
          reject(new Error('Failed to read selected image file.'));
          return;
        }

        try {
          const response = await fetch('/api/upload-feed-post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              dataUrl,
              styleName: data.styleName,
              stylistName: data.stylistName,
              category: data.category,
              formulaNote: data.formulaNote,
              timeSpent: data.timeSpent,
              caption: data.caption,
              tags: data.tags
            })
          });

          if (!response.ok) {
            throw new Error('Server returned an error saving to public assets');
          }

          const resData = await response.json();
          if (resData.success && resData.post) {
            setFeedPosts((prev) => [resData.post, ...prev]);
            resolve(resData.post);
          } else {
            throw new Error(resData.error || 'Failed to save post');
          }
        } catch (serverErr: any) {
          reject(serverErr);
        } finally {
          setIsUploadingFeed(false);
        }
      };

      reader.onerror = (err) => {
        setIsUploadingFeed(false);
        reject(err);
      };

      reader.readAsDataURL(data.file);
    });
  };

  const deleteFeedPost = async (id: string) => {
    try {
      const res = await fetch(`/api/feed-posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setFeedPosts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.warn('Failed to delete feed post:', err);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profileImage,
        founderImage,
        isSavingFounder,
        uploadFounderImage,
        resetFounderImage,
        heroImage: heroSlides[0]?.url || null,
        heroSlides,
        isSavingHero,
        uploadHeroSlides,
        deleteHeroSlide,
        resetAllHeroSlides,
        uploadHeroImage,
        resetHeroImage,
        feedPosts,
        isLoadingFeed,
        isUploadingFeed,
        loadFeedPosts,
        uploadFeedPost,
        deleteFeedPost,
        teamMembers,
        isLoadingTeam,
        isSavingTeam,
        loadTeamMembers,
        uploadTeamPhoto,
        updateTeamMember,
        addTeamMember,
        deleteTeamMember,
        resetTeamMembers
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
