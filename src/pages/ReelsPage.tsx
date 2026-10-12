import React, { useState } from 'react';
import type { AgriReel, Page } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Subtitles,
  Heart,
  MessageSquare,
  Bookmark,
  Share2,
  ExternalLink,
  PlusCircle,
  X,
  Sparkles,
  Check,
  UserCheck,
  UserPlus,
  Flame,
} from 'lucide-react';

interface ReelsPageProps {
  setCurrentPage?: (page: Page) => void;
}

const INITIAL_REELS: AgriReel[] = [
  {
    id: 'reel-1',
    creatorId: 'usr-cheruiyot',
    creatorName: 'Dr. Joseph Cheruiyot',
    creatorHandle: '@cheruiyot_vet',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    creatorRole: 'Dairy Specialist (KDB / KALRO)',
    videoUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
    title: 'How to test 32% Dry Matter in silage before pit closing',
    description:
      'Squeeze the chopped maize firmly in your hand for 20 seconds. If your palm stays moist with zero dripping and the ball breaks apart slowly, your dry matter is exactly 32-35%. Perfect for anaerobic lactic acid fermentation!',
    topicTag: 'Dairy Silage',
    county: 'Uasin Gishu',
    country: 'Kenya',
    likes: 1240,
    commentsCount: 88,
    sharesCount: 310,
    relatedResourceTitle: 'Silage Pit Capacity Calculator',
    relatedResourcePage: 'calculators',
    verifiedBadge: true,
    captions: 'Step 1: Grab a fistful of chopped maize. Step 2: Squeeze hard for 20 seconds. Step 3: Observe zero drops.',
  },
  {
    id: 'reel-2',
    creatorId: 'usr-adams',
    creatorName: 'Adams Kipkoech Kering',
    creatorHandle: '@adams_kering',
    creatorAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=250&q=80',
    creatorRole: 'Founder, AgriKnowledge Hub',
    videoUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80',
    title: 'Gravity-fed Drip Irrigation: Zero electricity setup for 1 acre',
    description:
      'Setting up a 1,000L tank on a 2-meter elevated wooden platform provides 0.2 bar hydrostatic pressure. Combined with inline 16mm drip lines with 20cm emitter spacing, you save 60% irrigation water on capsicums and tomatoes.',
    topicTag: 'Precision Drip',
    county: 'Uasin Gishu',
    country: 'Kenya',
    likes: 2150,
    commentsCount: 142,
    sharesCount: 520,
    relatedResourceTitle: 'Drip Irrigation Sizer Calculator',
    relatedResourcePage: 'calculators',
    verifiedBadge: true,
    captions: 'Elevate your tank 2 meters above ground. Connect 32mm main pipe and 120 mesh disc filter.',
  },
  {
    id: 'reel-3',
    creatorId: 'usr-muriuki',
    creatorName: 'Agnes Muriuki',
    creatorHandle: '@agnes_horticulture',
    creatorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    creatorRole: 'Agronomist & GlobalGAP Auditor',
    videoUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80',
    thumbnail: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80',
    title: 'Grafting Hass Avocado Scion onto indigenous rootstock',
    description:
      'Wedge grafting technique demonstrated in Central Kenya nursery. Cut a clean V-notch on 6-month Puebla rootstock. Align the cambium layers precisely and seal with parafilm for 95% take rate.',
    topicTag: 'Hass Grafting',
    county: 'Kiambu',
    country: 'Kenya',
    likes: 980,
    commentsCount: 64,
    sharesCount: 240,
    relatedResourceTitle: 'Hass Avocado Masterclass',
    relatedResourcePage: 'learning',
    verifiedBadge: true,
    captions: 'Make sure your razor blade is sterilized with methylated spirit before wedge grafting.',
  },
];

export const ReelsPage: React.FC<ReelsPageProps> = ({ setCurrentPage }) => {
  const { user, awardPoints } = useAuth();
  const [reels, setReels] = useState<AgriReel[]>(INITIAL_REELS);
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [showCaptions, setShowCaptions] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Follow states
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>({
    'usr-cheruiyot': true,
    'usr-adams': true,
  });

  // Upload reel form states
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadTag, setUploadTag] = useState('Crops');
  const [uploadThumbnail, setUploadThumbnail] = useState('');

  const currentReel = reels[activeReelIndex] || reels[0];

  const handleLike = (id: string) => {
    setReels((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const isLiked = !r.isLiked;
          return {
            ...r,
            isLiked,
            likes: isLiked ? r.likes + 1 : Math.max(0, r.likes - 1),
          };
        }
        return r;
      })
    );
  };

  const handleBookmark = (id: string) => {
    setReels((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isBookmarked: !r.isBookmarked } : r))
    );
  };

  const toggleFollow = (creatorId: string) => {
    setFollowingMap((prev) => ({ ...prev, [creatorId]: !prev[creatorId] }));
  };

  const handleUploadReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    const newReel: AgriReel = {
      id: `reel-${Date.now()}`,
      creatorId: user.id,
      creatorName: user.name,
      creatorHandle: user.handle,
      creatorAvatar: user.avatar,
      creatorRole: user.role,
      videoUrl:
        uploadThumbnail.trim() ||
        'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
      thumbnail:
        uploadThumbnail.trim() ||
        'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80',
      title: uploadTitle.trim(),
      description: uploadDesc.trim(),
      topicTag: uploadTag,
      county: user.county,
      country: user.country || 'Kenya',
      likes: 0,
      commentsCount: 0,
      sharesCount: 0,
      captions: uploadDesc.trim(),
    };

    setReels([newReel, ...reels]);
    setActiveReelIndex(0);
    setUploadTitle('');
    setUploadDesc('');
    setUploadThumbnail('');
    setShowUploadModal(false);
    awardPoints(60);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-12">
      {/* Top Header */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200 shadow-xs flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
            <h1 className="text-lg sm:text-xl font-serif font-bold text-[#183D29]">
              AgriReels — Practical Farming Short Videos
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Quick 60-second video demonstrations on grafting, silage, soil testing & farm mechanization
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md flex items-center gap-2 transition cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Upload Reel</span>
        </button>
      </div>

      {/* Main Reel Cinema Container */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Vertical Video Stage (7 cols on md) */}
        <div className="md:col-span-7 bg-black rounded-3xl overflow-hidden relative shadow-2xl aspect-[9/16] max-h-[720px] mx-auto w-full max-w-sm flex items-center justify-center">
          {/* Simulated Video Player */}
          <img
            src={currentReel.videoUrl}
            alt={currentReel.title}
            className="w-full h-full object-cover"
          />

          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 pointer-events-none" />

          {/* Top Controls: Play/Pause, Mute, Captions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                #{currentReel.topicTag}
              </span>
              <span className="text-[11px] text-stone-300">{currentReel.county}</span>
            </div>

            <div className="flex items-center gap-1.5 bg-black/50 p-1 rounded-full backdrop-blur-xs">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-1.5 rounded-full hover:bg-white/20 transition cursor-pointer"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-1.5 rounded-full hover:bg-white/20 transition cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setShowCaptions(!showCaptions)}
                className={`p-1.5 rounded-full transition cursor-pointer ${
                  showCaptions ? 'text-emerald-400 bg-white/20' : 'text-stone-300 hover:bg-white/20'
                }`}
                title="Toggle Captions"
              >
                <Subtitles className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Captions Overlay */}
          {showCaptions && currentReel.captions && (
            <div className="absolute bottom-28 left-4 right-14 z-10">
              <div className="bg-black/75 backdrop-blur-xs text-white text-xs p-2.5 rounded-xl border border-white/10 leading-snug">
                💬 {currentReel.captions}
              </div>
            </div>
          )}

          {/* Reel Bottom Creator & Meta */}
          <div className="absolute bottom-4 left-4 right-16 z-10 text-white space-y-2">
            <div className="flex items-center gap-2.5">
              <img
                src={currentReel.creatorAvatar}
                alt=""
                className="w-10 h-10 rounded-full object-cover border-2 border-emerald-400"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm">{currentReel.creatorName}</span>
                  {currentReel.verifiedBadge && (
                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 text-stone-950 flex items-center justify-center text-[9px] font-black">
                      ✓
                    </span>
                  )}
                </div>
                <p className="text-[10px] text-emerald-300">{currentReel.creatorRole}</p>
              </div>

              <button
                onClick={() => toggleFollow(currentReel.creatorId)}
                className={`ml-2 text-[10px] px-2.5 py-1 rounded-full font-bold transition cursor-pointer ${
                  followingMap[currentReel.creatorId]
                    ? 'bg-white/20 text-white'
                    : 'bg-emerald-500 text-stone-950 hover:bg-emerald-400'
                }`}
              >
                {followingMap[currentReel.creatorId] ? 'Following' : 'Follow'}
              </button>
            </div>

            <h3 className="text-xs sm:text-sm font-bold leading-snug">{currentReel.title}</h3>
            <p className="text-[11px] text-stone-300 line-clamp-2 leading-relaxed">
              {currentReel.description}
            </p>

            {currentReel.relatedResourceTitle && setCurrentPage && (
              <button
                onClick={() => setCurrentPage(currentReel.relatedResourcePage || 'calculators')}
                className="mt-1 inline-flex items-center gap-1 bg-emerald-800/90 hover:bg-emerald-700 text-emerald-100 text-[11px] px-2.5 py-1 rounded-xl transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Open {currentReel.relatedResourceTitle}</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Right Action Rail: Likes, Comments, Bookmark, Share */}
          <div className="absolute right-3 bottom-12 flex flex-col items-center gap-4 text-white z-10">
            <button
              onClick={() => handleLike(currentReel.id)}
              className="flex flex-col items-center gap-1 cursor-pointer group"
            >
              <div
                className={`p-2.5 rounded-full backdrop-blur-xs transition ${
                  currentReel.isLiked ? 'bg-rose-600 text-white' : 'bg-black/50 text-white group-hover:bg-rose-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${currentReel.isLiked ? 'fill-white' : ''}`} />
              </div>
              <span className="text-[10px] font-bold">{currentReel.likes}</span>
            </button>

            <button className="flex flex-col items-center gap-1 cursor-pointer group">
              <div className="p-2.5 rounded-full bg-black/50 text-white group-hover:bg-emerald-600 backdrop-blur-xs transition">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold">{currentReel.commentsCount}</span>
            </button>

            <button
              onClick={() => handleBookmark(currentReel.id)}
              className="flex flex-col items-center gap-1 cursor-pointer group"
            >
              <div
                className={`p-2.5 rounded-full backdrop-blur-xs transition ${
                  currentReel.isBookmarked ? 'bg-amber-600 text-white' : 'bg-black/50 text-white group-hover:bg-amber-600'
                }`}
              >
                <Bookmark className={`w-5 h-5 ${currentReel.isBookmarked ? 'fill-white' : ''}`} />
              </div>
              <span className="text-[10px] font-bold">Save</span>
            </button>

            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.href);
                alert('Reel link copied to clipboard!');
              }}
              className="flex flex-col items-center gap-1 cursor-pointer group"
            >
              <div className="p-2.5 rounded-full bg-black/50 text-white group-hover:bg-emerald-600 backdrop-blur-xs transition">
                <Share2 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold">{currentReel.sharesCount}</span>
            </button>
          </div>
        </div>

        {/* Next / Previous Reel Playlist Carousel (5 cols on md) */}
        <div className="md:col-span-5 space-y-3">
          <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs space-y-3">
            <h3 className="font-serif font-bold text-stone-900 text-sm flex items-center justify-between">
              <span>More Farming Demonstrations</span>
              <span className="text-xs text-stone-500 font-normal">{reels.length} Reels</span>
            </h3>

            <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
              {reels.map((reel, idx) => (
                <button
                  key={reel.id}
                  onClick={() => setActiveReelIndex(idx)}
                  className={`w-full p-2.5 rounded-2xl border text-left transition flex items-center gap-3 cursor-pointer ${
                    activeReelIndex === idx
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'bg-stone-50 border-stone-200 hover:border-emerald-300'
                  }`}
                >
                  <div className="w-16 h-20 rounded-xl overflow-hidden relative shrink-0 bg-stone-900">
                    <img src={reel.thumbnail} alt="" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Play className="w-5 h-5 text-white opacity-80" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-1.5 py-0.2 rounded">
                      #{reel.topicTag}
                    </span>
                    <h4 className="font-bold text-xs text-stone-900 line-clamp-2 leading-snug">
                      {reel.title}
                    </h4>
                    <p className="text-[10px] text-stone-500 truncate">
                      {reel.creatorName} • {reel.likes} likes
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Upload Reel Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs">
          <form
            onSubmit={handleUploadReel}
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                <Play className="w-4 h-4 text-emerald-700" />
                <span>Publish AgriReel Video</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Demonstration Title *
              </label>
              <input
                type="text"
                required
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                placeholder="e.g. How to calibrate a 20L knapsack sprayer nozzle"
                className="w-full text-xs p-2 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Topic Category
                </label>
                <select
                  value={uploadTag}
                  onChange={(e) => setUploadTag(e.target.value)}
                  className="w-full text-xs p-2 rounded-xl border border-stone-300 focus:outline-none"
                >
                  <option value="Dairy Silage">Dairy & Silage</option>
                  <option value="Precision Drip">Irrigation & Drip</option>
                  <option value="Hass Grafting">Horticulture Grafting</option>
                  <option value="Soil Health">Soil & Biochar</option>
                  <option value="Poultry">Poultry Brooders</option>
                  <option value="Pest Control">Pest Scouting</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                  Video Thumbnail URL
                </label>
                <input
                  type="url"
                  value={uploadThumbnail}
                  onChange={(e) => setUploadThumbnail(e.target.value)}
                  placeholder="https://... photo link"
                  className="w-full text-xs p-2 rounded-xl border border-stone-300 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Step-by-Step Practical Explanation *
              </label>
              <textarea
                required
                rows={3}
                value={uploadDesc}
                onChange={(e) => setUploadDesc(e.target.value)}
                placeholder="Explain the tool measurements, time of day, dosage, or technique..."
                className="w-full text-xs p-2 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 resize-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowUploadModal(false)}
                className="px-3 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Publish AgriReel (+60 Pts)
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
