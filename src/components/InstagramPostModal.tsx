import React, { useState } from 'react';
import { InstagramPost } from '../types';
import { 
  X, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  Calendar, 
  Sparkles, 
  Clock, 
  ExternalLink,
  Check
} from 'lucide-react';
import { SalonVisual } from './SalonVisual';
import { ProfileAvatar } from './ProfileAvatar';
import { SALON_INFO } from '../data/salonData';

interface InstagramPostModalProps {
  post: InstagramPost | null;
  onClose: () => void;
  onBookThisLook: (serviceId?: string, stylistId?: string) => void;
}

export const InstagramPostModal: React.FC<InstagramPostModalProps> = ({
  post,
  onClose,
  onBookThisLook
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [comments, setComments] = useState<string[]>([
    'Stunning tone! That blend is pure magic 😍',
    'Obsessed with this cut! Saving for my next appointment'
  ]);
  const [newComment, setNewComment] = useState('');

  if (!post) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([...comments, newComment.trim()]);
    setNewComment('');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div 
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row max-h-[90vh] border border-[#E0D7C9]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Visual Image Asset */}
        <div className="md:w-1/2 bg-[#1C1917] relative flex items-center justify-center min-h-[320px] md:min-h-full">
          <SalonVisual
            type={post.imageType || 'blonde-dimensional'}
            alt={post.styleName}
            stylistName={post.stylistName}
            imageUrl={post.imageUrl}
            className="w-full h-full object-cover"
          />

          {/* Top Instagram badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px]">@{post.author}</span>
          </div>
        </div>

        {/* Right Side: Editorial & Social Post Details */}
        <div className="md:w-1/2 flex flex-col justify-between bg-[#FAF8F5]">
          
          {/* Post Header */}
          <div className="p-4 sm:p-5 border-b border-[#EAE3D7] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ProfileAvatar size="sm" />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-bold text-[#1C1917] leading-none">
                    {SALON_INFO.name}
                  </h4>
                  <span className="text-xs text-blue-600">●</span>
                </div>
                <p className="text-[11px] text-[#7A7165] mt-0.5">
                  Styled by <strong className="text-[#936D48]">{post.stylistName}</strong> · {post.postedAgo}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#7A7165] hover:text-[#1C1917] hover:bg-[#EFEAE1] rounded-full transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Post Body: Scrollable */}
          <div className="p-5 overflow-y-auto space-y-4 max-h-[380px] text-xs">
            
            {/* Style Title & Highlight */}
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#936D48] font-bold">
                Signature Portfolio Look
              </span>
              <h3 className="text-lg font-serif font-bold text-[#1C1917] mt-0.5">
                {post.styleName}
              </h3>
            </div>

            {/* Caption */}
            <p className="text-[#3D372F] leading-relaxed text-[13px]">
              {post.caption}
            </p>

            {/* Formula / Technique Spec Sheet */}
            {(post.formulaNote || post.timeSpent) && (
              <div className="bg-[#F2ECE1] border border-[#DDD2C0] rounded-lg p-3 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#1C1917]">
                  <Sparkles className="w-3.5 h-3.5 text-[#936D48]" />
                  <span>Salon Technical Specs</span>
                </div>
                {post.formulaNote && (
                  <p className="text-[11px] text-[#5C554B]">
                    <strong>Colour / Formula:</strong> {post.formulaNote}
                  </p>
                )}
                {post.timeSpent && (
                  <p className="text-[11px] text-[#5C554B] flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#936D48]" />
                    <span><strong>Chair Time:</strong> {post.timeSpent}</span>
                  </p>
                )}
              </div>
            )}

            {/* Hashtags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] text-[#8C7A67] hover:text-[#936D48] transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Comments List */}
            <div className="border-t border-[#EAE3D7] pt-3 space-y-2">
              <span className="text-[10px] uppercase tracking-wider text-[#8A8174] font-semibold">
                Client Praises ({post.commentsCount + comments.length})
              </span>
              {comments.map((comm, idx) => (
                <div key={idx} className="flex gap-2 text-[11px]">
                  <span className="font-semibold text-[#1C1917]">guest_client:</span>
                  <span className="text-[#4A433A]">{comm}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Post Footer & Booking Action */}
          <div className="p-4 sm:p-5 border-t border-[#EAE3D7] bg-[#F7F3EC] space-y-3">
            
            {/* Social Action Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setLiked(!liked)}
                  className={`flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    liked ? 'text-rose-600' : 'text-[#5C554B] hover:text-[#1C1917]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${liked ? 'fill-rose-600' : ''}`} />
                  <span className="tabular-nums">{post.likes + (liked ? 1 : 0)}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center gap-1 text-xs text-[#5C554B] hover:text-[#1C1917] transition-colors cursor-pointer"
                  title="Share Look"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? 'Link Copied' : 'Share'}</span>
                </button>
              </div>

              <button
                onClick={() => setSaved(!saved)}
                className={`p-1.5 text-[#5C554B] hover:text-[#1C1917] transition-colors cursor-pointer ${
                  saved ? 'text-[#936D48]' : ''
                }`}
                title="Save Look"
              >
                <Bookmark className={`w-4 h-4 ${saved ? 'fill-[#936D48]' : ''}`} />
              </button>
            </div>

            {/* Quick Comment Input */}
            <form onSubmit={handleAddComment} className="flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment or question..."
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#DDD3C3] rounded-md focus:outline-hidden focus:border-[#936D48]"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-3 py-1.5 text-xs font-semibold text-[#936D48] disabled:opacity-40 cursor-pointer"
              >
                Post
              </button>
            </form>

            {/* Direct Booking CTA for this look */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  onClose();
                  onBookThisLook(post.serviceId, post.stylistId);
                }}
                className="w-full py-2.5 bg-[#24201D] hover:bg-[#3D352E] text-white text-xs font-semibold uppercase tracking-wider rounded-md flex items-center justify-center gap-2 transition-all shadow-sm active:scale-[0.99] cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#E6CBA8]" />
                <span>Book This Look with {post.stylistName}</span>
              </button>

              <a
                href="https://www.instagram.com/aspire_hair_and_body_spa/"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2 border border-[#DDD3C2] hover:bg-[#F2EDE4] text-[#1C1917] text-xs font-medium rounded-md flex items-center justify-center gap-1.5 transition-colors text-center"
              >
                <ExternalLink className="w-3 h-3 text-[#936D48]" />
                <span>View on Instagram (@aspire_hair_and_body_spa)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
