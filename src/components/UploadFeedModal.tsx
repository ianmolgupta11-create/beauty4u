import React, { useState, useRef } from 'react';
import { useProfile } from '../context/ProfileContext';
import { InstagramPost } from '../types';
import { STYLISTS_DATA } from '../data/salonData';
import { 
  X, 
  Upload, 
  Sparkles, 
  Image as ImageIcon, 
  Check, 
  AlertCircle, 
  Loader2, 
  Clock, 
  User, 
  Tag 
} from 'lucide-react';

interface UploadFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostUploaded?: (post: InstagramPost) => void;
}

export const UploadFeedModal: React.FC<UploadFeedModalProps> = ({
  isOpen,
  onClose,
  onPostUploaded
}) => {
  const { uploadFeedPost, isUploadingFeed } = useProfile();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [styleName, setStyleName] = useState('');
  const [stylistName, setStylistName] = useState(STYLISTS_DATA[0].name);
  const [category, setCategory] = useState<'blondes' | 'balayage' | 'cuts' | 'extensions' | 'treatments' | 'bridal'>('balayage');
  const [formulaNote, setFormulaNote] = useState('');
  const [timeSpent, setTimeSpent] = useState('2.5 hrs');
  const [caption, setCaption] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }
    setErrorMsg(null);
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    // Auto populate style name if empty
    if (!styleName) {
      const cleanName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[_-]/g, ' ')
        .replace(/(\b[a-z](?!\s))/g, (x) => x.toUpperCase());
      setStyleName(cleanName.slice(0, 45));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrorMsg('Please upload a transformation photo.');
      return;
    }
    if (!styleName.trim()) {
      setErrorMsg('Please enter a title for this hair or spa style.');
      return;
    }

    setErrorMsg(null);

    try {
      const generatedTags = [
        `#AspireHairBathurst`,
        `#${category.charAt(0).toUpperCase() + category.slice(1)}Hair`,
        `#BathurstSalon`,
        `#AustralianHairdresser`
      ];

      const newPost = await uploadFeedPost({
        file: selectedFile,
        styleName: styleName.trim(),
        stylistName,
        category,
        formulaNote: formulaNote.trim() || 'Custom salon bespoke formulation',
        timeSpent: timeSpent.trim() || '2.5 hrs',
        caption: caption.trim() || `${styleName.trim()} crafted by ${stylistName} at Aspire Hair Bathurst.`,
        tags: generatedTags
      });

      if (onPostUploaded) {
        onPostUploaded(newPost);
      }

      // Reset and close
      setSelectedFile(null);
      setPreviewUrl(null);
      setStyleName('');
      setFormulaNote('');
      setCaption('');
      onClose();
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message || 'Failed to save transformation to assets directory.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div 
        className="w-full max-w-2xl bg-[#FAF8F5] rounded-2xl shadow-2xl border border-[#DDD3C2] overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#EAE3D7] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FAF5EE] flex items-center justify-center border border-[#E0D5C3]">
              <Sparkles className="w-4 h-4 text-[#936D48]" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-medium text-[#1C1917]">
                Upload Transformation to Feed
              </h3>
              <p className="text-xs text-[#7A7165]">
                Saves photo into public assets (/assets/feed/) for every visitor to view
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#7A7165] hover:text-[#1C1917] hover:bg-[#F3EDE2] transition-colors cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto flex-1 text-left">
          
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-xs text-red-700">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. Image Dropzone / Preview */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-2">
              1. Transformation Image <span className="text-rose-600">*</span>
            </label>

            {previewUrl ? (
              <div className="relative rounded-xl overflow-hidden border-2 border-[#DDD3C2] bg-[#1C1917] aspect-video sm:aspect-[16/10] max-h-64 flex items-center justify-center group">
                <img
                  src={previewUrl}
                  alt="Transformation Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-white text-[#1C1917] rounded-md text-xs font-semibold shadow-md hover:bg-neutral-100 cursor-pointer"
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
                    className="px-3 py-1.5 bg-rose-600 text-white rounded-md text-xs font-semibold shadow-md hover:bg-rose-700 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                  isDragging
                    ? 'border-[#936D48] bg-[#F5EDE1]'
                    : 'border-[#DDD3C2] bg-white hover:border-[#936D48] hover:bg-[#FAF6F0]'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-[#F5EDE1] text-[#936D48] flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-semibold text-[#1C1917]">
                  Click to upload or drag & drop transformation photo
                </p>
                <p className="text-xs text-[#8C8173] mt-1">
                  JPG, PNG, or WEBP (Saved directly to public assets directory)
                </p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* 2. Transformation Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Style Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-1.5">
                Transformation Title <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                value={styleName}
                onChange={(e) => setStyleName(e.target.value)}
                placeholder="e.g. Creamy Pearl Foilayage & Face Frame"
                className="w-full px-3.5 py-2.5 bg-white border border-[#DDD3C2] rounded-lg text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#936D48]"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-1.5">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#DDD3C2] rounded-lg text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#936D48]"
              >
                <option value="balayage">Balayage & Foils</option>
                <option value="blondes">Blonde Alchemy</option>
                <option value="cuts">Precision Cuts & Styling</option>
                <option value="extensions">Showpony Extensions</option>
                <option value="treatments">Bhave & Hair Therapy</option>
                <option value="bridal">Bridal Suite</option>
              </select>
            </div>

            {/* Stylist */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-1.5">
                Stylist / Artist
              </label>
              <select
                value={stylistName}
                onChange={(e) => setStylistName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border border-[#DDD3C2] rounded-lg text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#936D48]"
              >
                {STYLISTS_DATA.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name} ({s.role.split('·')[0].trim()})
                  </option>
                ))}
              </select>
            </div>

            {/* Chair Time */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-1.5">
                Chair Duration
              </label>
              <input
                type="text"
                value={timeSpent}
                onChange={(e) => setTimeSpent(e.target.value)}
                placeholder="e.g. 2.5 hrs or 3 hrs"
                className="w-full px-3.5 py-2.5 bg-white border border-[#DDD3C2] rounded-lg text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#936D48]"
              />
            </div>

            {/* Formula Note */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-1.5">
                Technical Formula / Recipe
              </label>
              <input
                type="text"
                value={formulaNote}
                onChange={(e) => setFormulaNote(e.target.value)}
                placeholder="e.g. Wella Illumina 9/60 + 8/38 root shadow"
                className="w-full px-3.5 py-2.5 bg-white border border-[#DDD3C2] rounded-lg text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#936D48]"
              />
            </div>

            {/* Caption */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#5C554B] mb-1.5">
                Caption / Story
              </label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={2}
                placeholder="Share client journey, before condition, or aftercare tips..."
                className="w-full px-3.5 py-2 bg-white border border-[#DDD3C2] rounded-lg text-sm text-[#1C1917] focus:outline-none focus:ring-2 focus:ring-[#936D48]"
              />
            </div>
          </div>

          {/* Public Assets Saving Reassurance */}
          <div className="p-3.5 bg-[#F0EAE1] rounded-xl flex items-center justify-between text-xs text-[#5C554B] border border-[#E0D5C3]">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                Saved into <strong>public assets (/assets/feed/)</strong> for instant visibility to all visitors.
              </span>
            </div>
          </div>

          {/* Footer Submit Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3 border-t border-[#EAE3D7]">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploadingFeed}
              className="px-4 py-2.5 text-xs font-semibold text-[#5C554B] hover:text-[#1C1917] hover:bg-[#EFEAE1] rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploadingFeed || !selectedFile}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#936D48] hover:bg-[#7D5B3A] disabled:opacity-50 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
            >
              {isUploadingFeed ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving to Public Assets...</span>
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  <span>Publish to Feed</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
