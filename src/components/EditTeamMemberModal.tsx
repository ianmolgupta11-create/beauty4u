import React, { useState, useRef } from 'react';
import { Stylist } from '../types';
import { useProfile } from '../context/ProfileContext';
import { SalonVisual } from './SalonVisual';
import { 
  X, 
  Camera, 
  Loader2, 
  Check, 
  Trash2, 
  Sparkles, 
  Instagram, 
  Clock, 
  Briefcase 
} from 'lucide-react';

interface EditTeamMemberModalProps {
  stylist: Stylist | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (stylist: Stylist) => void;
  onDelete?: (id: string) => void;
  isNew?: boolean;
}

const ALL_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const EditTeamMemberModal: React.FC<EditTeamMemberModalProps> = ({
  stylist,
  isOpen,
  onClose,
  onSave,
  onDelete,
  isNew = false
}) => {
  const { uploadTeamPhoto, isSavingTeam } = useProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Stylist>(() => {
    if (stylist) return { ...stylist };
    return {
      id: '',
      name: '',
      role: 'Senior Stylist & Colourist',
      experienceYears: 5,
      specialties: ['Precision Cutting', 'Lived-In Colour', 'Signature Blow-dries'],
      bio: 'Dedicated to personalized hair consultations, luxurious basin care, and effortless modern styles tailored to each client.',
      signatureStyle: 'Natural lived-in dimension with glossy bounce',
      favoriteProduct: 'Kérastase Elixir Ultime & Wella Gloss',
      instagramHandle: '@aspire_stylist',
      rating: 5.0,
      reviewCount: 24,
      availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      accentColor: '#936D48',
      avatarPlaceholderColor: '#F3ECE4',
      imageUrl: ''
    };
  });

  const [specialtiesInput, setSpecialtiesInput] = useState<string>(
    formData.specialties.join(', ')
  );
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(formData.imageUrl);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Sync if stylist changes
  React.useEffect(() => {
    if (stylist) {
      setFormData({ ...stylist });
      setSpecialtiesInput(stylist.specialties.join(', '));
      setPhotoPreview(stylist.imageUrl);
    } else {
      const defaultNew: Stylist = {
        id: '',
        name: '',
        role: 'Senior Stylist & Colourist',
        experienceYears: 5,
        specialties: ['Precision Cutting', 'Lived-In Colour', 'Signature Blow-dries'],
        bio: 'Dedicated to personalized hair consultations, luxurious basin care, and effortless modern styles tailored to each client.',
        signatureStyle: 'Natural lived-in dimension with glossy bounce',
        favoriteProduct: 'Kérastase Elixir Ultime & Wella Gloss',
        instagramHandle: '@aspire_stylist',
        rating: 5.0,
        reviewCount: 24,
        availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        accentColor: '#936D48',
        avatarPlaceholderColor: '#F3ECE4',
        imageUrl: ''
      };
      setFormData(defaultNew);
      setSpecialtiesInput(defaultNew.specialties.join(', '));
      setPhotoPreview(undefined);
    }
  }, [stylist, isOpen]);

  if (!isOpen) return null;

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    try {
      const targetId = formData.id || (formData.name ? formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'new-stylist');
      const uploadedUrl = await uploadTeamPhoto(targetId, file);
      setPhotoPreview(uploadedUrl);
      setFormData((prev) => ({ ...prev, imageUrl: uploadedUrl }));
      setToastMsg('Photo uploaded and saved to public directory!');
      setTimeout(() => setToastMsg(null), 3000);
    } catch (err: any) {
      setToastMsg(err?.message || 'Failed to upload photo');
      setTimeout(() => setToastMsg(null), 3000);
    } finally {
      setIsUploadingPhoto(false);
      e.target.value = '';
    }
  };

  const toggleDay = (day: string) => {
    setFormData((prev) => {
      const exists = prev.availableDays.includes(day);
      const updated = exists
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day];
      return { ...prev, availableDays: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Please enter stylist name.');
      return;
    }

    const specs = specialtiesInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const finalized: Stylist = {
      ...formData,
      id: formData.id || formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      specialties: specs.length > 0 ? specs : ['Master Hair Artistry'],
      imageUrl: photoPreview || formData.imageUrl
    };

    onSave(finalized);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-[#FAF8F5] w-full max-w-2xl rounded-2xl shadow-2xl border border-[#E8DFD3] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#24201D] text-white flex items-center justify-between border-b border-[#3D352E]">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#E6CBA8]">
              {isNew ? 'Team Management' : 'Edit Stylist Profile'}
            </span>
            <h2 className="text-xl font-serif font-bold text-white">
              {isNew ? 'Add New Team Member' : `Edit ${formData.name || 'Team Member'}`}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toast Notification */}
        {toastMsg && (
          <div className="bg-[#24201D] text-white px-4 py-2 text-xs flex items-center gap-2 border-b border-[#E6CBA8]/30">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Scrollable Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1 text-left text-[#1C1917]">
          
          {/* Photo Upload Section */}
          <div className="bg-white p-4 rounded-xl border border-[#E5DDD0] flex flex-col sm:flex-row items-center gap-5">
            <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-[#D4C5B3] bg-[#EFEAE1] shrink-0 group">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt={formData.name || 'Stylist Preview'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <SalonVisual
                  type="stylist-avatar"
                  alt={formData.name || 'Stylist'}
                  stylistName={formData.name}
                  className="w-full h-full"
                />
              )}

              {/* Overlay camera button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingPhoto || isSavingTeam}
                className="absolute inset-0 bg-black/50 hover:bg-black/70 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                title="Change Photo"
              >
                <Camera className="w-5 h-5 text-[#E6CBA8] mb-1" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">Change</span>
              </button>

              {isUploadingPhoto && (
                <div className="absolute inset-0 bg-black/75 flex items-center justify-center text-white">
                  <Loader2 className="w-6 h-6 animate-spin text-[#E6CBA8]" />
                </div>
              )}
            </div>

            <div className="space-y-2 text-center sm:text-left flex-1">
              <h4 className="text-sm font-serif font-bold text-[#1C1917]">
                Stylist Portrait Photo
              </h4>
              <p className="text-xs text-[#7A7165] leading-relaxed">
                Upload a real high-resolution picture for this team member. Photos are saved permanently to public assets (<code className="text-[#936D48] text-[11px]">/assets/team/</code>).
              </p>
              
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploadingPhoto || isSavingTeam}
                  className="px-3 py-1.5 bg-[#936D48] hover:bg-[#7D5B3A] text-white text-xs font-semibold rounded-lg border border-transparent shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>{photoPreview ? 'Upload New Photo' : 'Upload Stylist Photo'}</span>
                </button>

                {photoPreview && (
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoPreview(undefined);
                      setFormData((prev) => ({ ...prev, imageUrl: '' }));
                    }}
                    className="px-2.5 py-1.5 bg-[#F4EFE6] hover:bg-[#EAE2D5] text-[#5C554B] text-xs font-semibold rounded-lg border border-[#DDD3C3] transition-colors cursor-pointer"
                  >
                    Remove Photo
                  </button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Core Info: Name, Role, Experience, Instagram */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Kate, Isabelle, Belinda"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CABB] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#936D48]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-1">
                Role / Title *
              </label>
              <input
                type="text"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g. Senior Colour Director & Blonde Master"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CABB] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#936D48]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-1">
                Experience (Years)
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={formData.experienceYears}
                onChange={(e) => setFormData({ ...formData, experienceYears: parseInt(e.target.value, 10) || 1 })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CABB] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#936D48]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-1">
                Instagram Handle
              </label>
              <div className="relative">
                <Instagram className="w-4 h-4 text-[#8C8173] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={formData.instagramHandle}
                  onChange={(e) => setFormData({ ...formData, instagramHandle: e.target.value })}
                  placeholder="@stylist_handle"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#D5CABB] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#936D48]"
                />
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-1">
              Specialties (Comma Separated)
            </label>
            <input
              type="text"
              value={specialtiesInput}
              onChange={(e) => setSpecialtiesInput(e.target.value)}
              placeholder="e.g. Platinum & Scandi Blondes, Foilayage, French Bobs"
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CABB] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#936D48]"
            />
            <p className="text-[11px] text-[#8C8173] mt-1">
              Separate each skill with a comma (e.g. Balayage, Showpony Tapes, Japanese Head Spa).
            </p>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-1">
              Biography & Background
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Describe their experience, international training, technique mastery..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CABB] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#936D48]"
            />
          </div>

          {/* Signature Style & Favorite Formula */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-1">
                Signature Style
              </label>
              <input
                type="text"
                value={formData.signatureStyle}
                onChange={(e) => setFormData({ ...formData, signatureStyle: e.target.value })}
                placeholder="e.g. High-contrast face framing baby foils"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CABB] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#936D48]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-1">
                Favorite Salon Formula / Product
              </label>
              <input
                type="text"
                value={formData.favoriteProduct}
                onChange={(e) => setFormData({ ...formData, favoriteProduct: e.target.value })}
                placeholder="e.g. Kérastase Blond Absolu & Wella Illumina"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CABB] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#936D48]"
              />
            </div>
          </div>

          {/* Available Working Days */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#936D48]" />
              <span>Available Working Days</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ALL_DAYS.map((day) => {
                const isSelected = formData.availableDays.includes(day);
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => toggleDay(day)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all text-left flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#24201D] text-white border-[#24201D]'
                        : 'bg-white text-[#5C554B] border-[#D5CABB] hover:bg-[#F4EFE6]'
                    }`}
                  >
                    <span>{day}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#E6CBA8]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rating and Review count */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-1">
                Client Rating (1.0 – 5.0)
              </label>
              <input
                type="number"
                step="0.1"
                min="4.0"
                max="5.0"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) || 5.0 })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CABB] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#936D48]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-1">
                Verified Reviews Count
              </label>
              <input
                type="number"
                min="0"
                value={formData.reviewCount}
                onChange={(e) => setFormData({ ...formData, reviewCount: parseInt(e.target.value, 10) || 0 })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D5CABB] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#936D48]"
              />
            </div>
          </div>

          {/* Actions Bar */}
          <div className="pt-4 border-t border-[#E8DFD3] flex items-center justify-between">
            {!isNew && onDelete && stylist && stylist.id !== 'belinda' ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to remove ${stylist.name} from the team?`)) {
                    onDelete(stylist.id);
                    onClose();
                  }
                }}
                className="px-3.5 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold rounded-lg border border-rose-200 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Member</span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-[#EFEAE1] hover:bg-[#E5DCce] text-[#5C554B] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#936D48] hover:bg-[#7D5B3A] text-white text-xs font-semibold uppercase tracking-wider rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4" />
                <span>Save Team Member</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
