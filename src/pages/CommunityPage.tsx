import React, { useState } from 'react';
import type { CommunityPost, PostComment, CommentReply, AgriStory } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useNotifications } from '../context/NotificationContext';
import { MOCK_COMMUNITY_POSTS, COUNTIES } from '../data/mockData';
import {
  MessageSquare,
  Heart,
  Share2,
  CheckCircle2,
  ShieldCheck,
  Send,
  PlusCircle,
  Image as ImageIcon,
  MapPin,
  Sparkles,
  Filter,
  Check,
  Bookmark,
  Repeat2,
  Trash2,
  Edit3,
  Flag,
  MoreVertical,
  Reply,
  UserPlus,
  UserCheck,
  X,
  Clock,
  Play,
  Flame,
} from 'lucide-react';

interface CommunityPageProps {
  isMobileFrame?: boolean;
}

const INITIAL_STORIES: AgriStory[] = [
  {
    id: 'story-1',
    authorId: 'usr-adams',
    authorName: 'Adams Kering',
    authorAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=250&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
    mediaType: 'image',
    caption: 'Field inspection in Soy, Uasin Gishu: High-yielding maize canopy trial thriving!',
    county: 'Uasin Gishu',
    createdAt: '3h ago',
    expiresAt: '21h left',
  },
  {
    id: 'story-2',
    authorId: 'usr-cheruiyot',
    authorName: 'Dr. Cheruiyot',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
    mediaType: 'image',
    caption: 'Silage harvest window: checking 32% Dry Matter kernel milk line with Eldoret dairy co-op.',
    county: 'Uasin Gishu',
    createdAt: '5h ago',
    expiresAt: '19h left',
  },
  {
    id: 'story-3',
    authorId: 'usr-muriuki',
    authorName: 'Agnes Muriuki',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80',
    mediaType: 'image',
    caption: 'Export grade Hass Avocado picking in Murang\'a: Zero fruit fly damage with pheromone traps.',
    county: 'Kiambu',
    createdAt: '8h ago',
    expiresAt: '16h left',
  },
  {
    id: 'story-4',
    authorId: 'usr-chepkoech',
    authorName: 'Mary Chebet',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    mediaUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80',
    mediaType: 'image',
    caption: 'Solar drip fertigation on red cabbage in Nandi Hills: 40% water reduction.',
    county: 'Nandi',
    createdAt: '11h ago',
    expiresAt: '13h left',
  },
];

export const CommunityPage: React.FC<CommunityPageProps> = ({ isMobileFrame = false }) => {
  const { user, awardPoints } = useAuth();
  const { t } = useLanguage();
  const { addNotification } = useNotifications();

  // Posts State
  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    try {
      const saved = localStorage.getItem('agri_community_posts_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return MOCK_COMMUNITY_POSTS;
  });

  // Followed Creators State
  const [followingMap, setFollowingMap] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('agri_following_creators');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return { 'usr-cheruiyot': true, 'usr-adams': true };
  });

  // Stories State
  const [stories, setStories] = useState<AgriStory[]>(INITIAL_STORIES);
  const [activeStory, setActiveStory] = useState<AgriStory | null>(null);
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [newStoryCaption, setNewStoryCaption] = useState('');
  const [newStoryMedia, setNewStoryMedia] = useState('');

  // Filters & Search
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedCountyFilter, setSelectedCountyFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // New Post Form State
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState<CommunityPost['tag']>('Crops');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');
  const [newVideoUrl, setNewVideoUrl] = useState('');

  // Comment Input & Reply State
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({
    'post-1': true,
  });

  // Edit Post State
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  // Moderation / Report Modal
  const [reportingPostId, setReportingPostId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState<string>('Unverified / Unregistered Chemical');
  const [reportSuccessToast, setReportSuccessToast] = useState(false);

  const savePosts = (updated: CommunityPost[]) => {
    setPosts(updated);
    try {
      localStorage.setItem('agri_community_posts_v2', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const toggleFollow = (authorId: string, authorName: string) => {
    setFollowingMap((prev) => {
      const next = { ...prev, [authorId]: !prev[authorId] };
      try {
        localStorage.setItem('agri_following_creators', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleLike = (postId: string) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likes: isLiked ? p.likes + 1 : Math.max(0, p.likes - 1),
        };
      }
      return p;
    });
    savePosts(updated);
  };

  const handleBookmark = (postId: string) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        return { ...p, isBookmarked: !p.isBookmarked };
      }
      return p;
    });
    savePosts(updated);
  };

  const handleRepost = (postId: string) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const isReposted = !p.isReposted;
        return {
          ...p,
          isReposted,
          repostsCount: (p.repostsCount || 0) + (isReposted ? 1 : -1),
        };
      }
      return p;
    });
    savePosts(updated);
  };

  const handleToggleComments = (postId: string) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    const newComment: PostComment = {
      id: `c-${Date.now()}`,
      authorId: user.id,
      author: user.name,
      authorRole: user.role,
      authorAvatar: user.avatar,
      county: user.county,
      content: text,
      createdAt: 'Just now',
      likes: 0,
      isExpertAdvice: user.role.includes('Agronomist') || user.role.includes('Officer'),
      replies: [],
    };

    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [...p.comments, newComment],
        };
      }
      return p;
    });

    savePosts(updated);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    setOpenComments((prev) => ({ ...prev, [postId]: true }));
    awardPoints(15);
  };

  const handleAddReply = (postId: string, parentCommentId: string, parentAuthor: string) => {
    const text = replyInputs[parentCommentId]?.trim();
    if (!text) return;

    const newReply: CommentReply = {
      id: `r-${Date.now()}`,
      authorId: user.id,
      author: user.name,
      authorRole: user.role,
      authorAvatar: user.avatar,
      county: user.county,
      content: text,
      createdAt: 'Just now',
      likes: 0,
      replyToAuthor: parentAuthor,
    };

    const updated = posts.map((p) => {
      if (p.id === postId) {
        const updatedComments = p.comments.map((c) => {
          if (c.id === parentCommentId) {
            return {
              ...c,
              replies: [...(c.replies || []), newReply],
            };
          }
          return c;
        });
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: updatedComments,
        };
      }
      return p;
    });

    savePosts(updated);
    setReplyInputs((prev) => ({ ...prev, [parentCommentId]: '' }));
    setReplyingToCommentId(null);
    awardPoints(10);
  };

  const handleDeletePost = (postId: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const updated = posts.filter((p) => p.id !== postId);
      savePosts(updated);
    }
  };

  const handleStartEdit = (post: CommunityPost) => {
    setEditingPostId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const handleSaveEdit = (postId: string) => {
    if (!editTitle.trim() || !editContent.trim()) return;
    const updated = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          title: editTitle.trim(),
          content: editContent.trim(),
        };
      }
      return p;
    });
    savePosts(updated);
    setEditingPostId(null);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorId: user.id,
      authorName: user.name,
      authorHandle: user.handle,
      authorAvatar: user.avatar,
      authorRole: user.role,
      county: user.county,
      country: user.country || 'Kenya',
      tag: newTag,
      title: newTitle.trim(),
      content: newContent.trim(),
      imageUrl: newImageUrl.trim() || undefined,
      imageCaption: newImageCaption.trim() || undefined,
      videoUrl: newVideoUrl.trim() || undefined,
      likes: 0,
      isLiked: false,
      commentsCount: 0,
      comments: [],
      createdAt: 'Just now',
    };

    const updated = [newPost, ...posts];
    savePosts(updated);
    setNewTitle('');
    setNewContent('');
    setNewImageUrl('');
    setNewImageCaption('');
    setNewVideoUrl('');
    setIsCreatingPost(false);
    awardPoints(50);
  };

  const handleAddStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStoryCaption.trim()) return;

    const story: AgriStory = {
      id: `story-${Date.now()}`,
      authorId: user.id,
      authorName: user.name,
      authorAvatar: user.avatar,
      mediaUrl:
        newStoryMedia.trim() ||
        'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
      mediaType: 'image',
      caption: newStoryCaption.trim(),
      county: user.county,
      createdAt: 'Just now',
      expiresAt: '24h left',
    };

    setStories([story, ...stories]);
    setNewStoryCaption('');
    setNewStoryMedia('');
    setIsAddingStory(false);
    awardPoints(25);
  };

  const submitReport = () => {
    setReportingPostId(null);
    setReportSuccessToast(true);
    setTimeout(() => setReportSuccessToast(false), 4000);
  };

  const tags = [
    'All',
    'Crops',
    'Livestock',
    'SoilHealth',
    'PestAlert',
    'MarketDeal',
    'Organic',
    'Regenerative',
    'Aquaculture',
    'Question',
  ];

  const filteredPosts = posts.filter((p) => {
    const matchTag = selectedTag === 'All' || p.tag === selectedTag;
    const matchCounty = selectedCountyFilter === 'All' || p.county === selectedCountyFilter;
    const matchSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.authorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchTag && matchCounty && matchSearch;
  });

  return (
    <div className={`space-y-4 ${isMobileFrame ? 'text-xs' : 'max-w-4xl mx-auto'}`}>
      {/* Toast Confirmation for Reporting */}
      {reportSuccessToast && (
        <div className="fixed top-20 right-4 z-50 bg-emerald-900 border border-emerald-500 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 text-xs animate-in slide-in-from-top">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Report submitted to the agronomy moderation committee. Asante!</span>
        </div>
      )}

      {/* AgriStories Carousel (Phase 4) */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border border-stone-200 shadow-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-100">
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>AgriStories (24h Live Farm Updates)</span>
          </div>
          <button
            onClick={() => setIsAddingStory(true)}
            className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Add Story</span>
          </button>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
          {/* Add Story Button Thumbnail */}
          <button
            onClick={() => setIsAddingStory(true)}
            className="flex flex-col items-center shrink-0 cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-emerald-600 flex items-center justify-center bg-emerald-50 group-hover:scale-105 transition">
              <PlusCircle className="w-6 h-6 text-emerald-700" />
            </div>
            <span className="text-[10px] text-stone-600 font-medium mt-1">My Farm</span>
          </button>

          {/* Stories List */}
          {stories.map((story) => (
            <button
              key={story.id}
              onClick={() => setActiveStory(story)}
              className="flex flex-col items-center shrink-0 cursor-pointer group"
            >
              <div className="w-14 h-14 rounded-full p-0.5 ring-2 ring-emerald-600 hover:ring-amber-500 transition group-hover:scale-105">
                <img
                  src={story.authorAvatar}
                  alt={story.authorName}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <span className="text-[10px] text-stone-800 font-semibold mt-1 max-w-[64px] truncate">
                {story.authorName.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Story Viewer Modal */}
      {activeStory && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-stone-900 rounded-3xl max-w-sm w-full overflow-hidden text-white relative shadow-2xl">
            {/* Top Progress bar */}
            <div className="h-1 bg-stone-700 w-full">
              <div className="h-full bg-emerald-400 w-2/3 animate-pulse" />
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src={activeStory.authorAvatar}
                  alt=""
                  className="w-8 h-8 rounded-full object-cover border border-emerald-400"
                />
                <div>
                  <p className="text-xs font-bold leading-tight">{activeStory.authorName}</p>
                  <p className="text-[10px] text-stone-400">
                    {activeStory.county} • {activeStory.expiresAt}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveStory(null)}
                className="p-1 rounded-full bg-stone-800 text-stone-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-80 bg-black relative">
              <img
                src={activeStory.mediaUrl}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <p className="text-xs sm:text-sm text-stone-100 font-medium leading-relaxed">
                  {activeStory.caption}
                </p>
              </div>
            </div>

            <div className="p-3 bg-stone-950 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-semibold">AgriStory • 24h Farm Diary</span>
              <button
                onClick={() => setActiveStory(null)}
                className="text-stone-400 hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Story Modal */}
      {isAddingStory && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs">
          <form
            onSubmit={handleAddStory}
            className="bg-white rounded-3xl max-w-md w-full p-5 shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500" />
                <span>Post 24h AgriStory</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAddingStory(false)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Story Caption / Farm Update *
              </label>
              <textarea
                required
                rows={3}
                value={newStoryCaption}
                onChange={(e) => setNewStoryCaption(e.target.value)}
                placeholder="e.g. Inspecting knee-high maize in Soy; zero Fall Armyworm damage after neem spray..."
                className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-600 resize-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Photo URL (optional sample)
              </label>
              <input
                type="url"
                value={newStoryMedia}
                onChange={(e) => setNewStoryMedia(e.target.value)}
                placeholder="https://images.unsplash.com/... (optional)"
                className="w-full text-xs p-2 rounded-xl border border-stone-300 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingStory(false)}
                className="px-3 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs"
              >
                Share to AgriStories
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Feed Top Header */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-lg sm:text-xl font-serif font-bold text-[#183D29]">
              AgriFeed — Global Farmer Community Baraza
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Real farm observations, peer discussions, verified agronomist solutions & crop pictures
          </p>
        </div>

        <button
          onClick={() => setIsCreatingPost(!isCreatingPost)}
          className="px-4 py-2 rounded-xl bg-[#183D29] hover:bg-[#122e1f] text-white font-semibold text-xs shadow-md flex items-center justify-center gap-2 transition shrink-0 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span>{isCreatingPost ? 'Close Form' : 'New Post / Ask Question'}</span>
        </button>
      </div>

      {/* New Post Form Drawer */}
      {isCreatingPost && (
        <form
          onSubmit={handleCreatePost}
          className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-emerald-600 shadow-md space-y-3 animate-in fade-in"
        >
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="font-bold text-xs text-emerald-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Publish to AgriFeed (Earn +50 Reputation Points)</span>
            </span>
            <span className="text-[11px] text-stone-500">Posting as {user.name}</span>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">
              Topic / Question Title *
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Yellowing leaf edges on my 30-day potatoes: Potassium deficiency or early blight?"
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-none focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Category Tag
              </label>
              <select
                value={newTag}
                onChange={(e) => setNewTag(e.target.value as CommunityPost['tag'])}
                className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-none"
              >
                <option value="Crops">🌾 Crops & Planting</option>
                <option value="Livestock">🐄 Livestock & Feeds</option>
                <option value="PestAlert">🐛 Pest / Disease Alert</option>
                <option value="SoilHealth">🌱 Soil & Fertilizer</option>
                <option value="MarketDeal">📊 Market & Off-takers</option>
                <option value="Organic">🌿 Organic / Push-Pull</option>
                <option value="Regenerative">🌍 Regenerative Carbon</option>
                <option value="Aquaculture">🐟 Aquaculture & Fish</option>
                <option value="Question">❓ General Farm Question</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Photo URL
              </label>
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://... photo link"
                className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Video Clip URL (optional)
              </label>
              <input
                type="url"
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
                placeholder="https://... video URL"
                className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-stone-700 mb-1">
              Detailed Description / Experience *
            </label>
            <textarea
              required
              rows={3}
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Describe what you observed, your county, crop variety, weather, or feeding routine..."
              className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-none focus:border-emerald-600 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsCreatingPost(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition cursor-pointer"
            >
              Publish Post
            </button>
          </div>
        </form>
      )}

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-3xl p-3 sm:p-4 border border-stone-200 shadow-xs space-y-3">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search discussions by crop, symptom, farmer name..."
            className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-emerald-600"
          />
          <Filter className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium text-xs transition cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[#183D29] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Region Filter */}
        <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-100">
          <div className="flex items-center gap-1 text-stone-500">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span>Filter by County:</span>
          </div>
          <select
            value={selectedCountyFilter}
            onChange={(e) => setSelectedCountyFilter(e.target.value)}
            className="text-xs bg-stone-50 border border-stone-200 px-2 py-1 rounded-lg text-stone-700 focus:outline-none cursor-pointer"
          >
            <option value="All">All Counties (Kenya)</option>
            {COUNTIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Feed Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center text-stone-500 border border-stone-200">
            <p className="font-semibold text-sm">No community posts matching this filter.</p>
            <p className="text-xs mt-1">Be the first to share your field observations or question!</p>
          </div>
        ) : (
          filteredPosts.map((post) => {
            const isFollowing = followingMap[post.authorId];
            const isAuthor = post.authorId === user.id;

            return (
              <article
                key={post.id}
                className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200 shadow-xs hover:border-stone-300 transition space-y-3"
              >
                {/* Author Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      className="w-10 h-10 rounded-full object-cover border border-emerald-600/40 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-sm text-stone-900">{post.authorName}</span>
                        <span className="text-[11px] text-stone-400">{post.authorHandle}</span>
                        {!isAuthor && (
                          <button
                            onClick={() => toggleFollow(post.authorId, post.authorName)}
                            className={`ml-1 text-[10px] px-2 py-0.5 rounded-full font-semibold transition cursor-pointer flex items-center gap-1 ${
                              isFollowing
                                ? 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                            }`}
                          >
                            {isFollowing ? (
                              <>
                                <UserCheck className="w-3 h-3" />
                                <span>Following</span>
                              </>
                            ) : (
                              <>
                                <UserPlus className="w-3 h-3" />
                                <span>Follow</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                        <span className="bg-emerald-50 text-emerald-800 font-medium px-1.5 py-0.2 rounded">
                          {post.authorRole}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3 text-emerald-600" />
                          {post.county}
                        </span>
                        <span>•</span>
                        <span>{post.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tag and Actions Menu */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100/70 text-emerald-900">
                      #{post.tag}
                    </span>
                    {isAuthor ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleStartEdit(post)}
                          className="p-1 rounded text-stone-400 hover:text-emerald-700 transition cursor-pointer"
                          title="Edit Post"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-1 rounded text-stone-400 hover:text-rose-600 transition cursor-pointer"
                          title="Delete Post"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setReportingPostId(post.id)}
                        className="p-1 rounded text-stone-400 hover:text-amber-600 transition cursor-pointer"
                        title="Report Post"
                      >
                        <Flag className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Post Body (or Edit Form) */}
                {editingPostId === post.id ? (
                  <div className="space-y-2 bg-stone-50 p-3 rounded-2xl border border-stone-200">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full text-xs font-bold p-2 bg-white rounded-xl border border-stone-300"
                    />
                    <textarea
                      rows={3}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full text-xs p-2 bg-white rounded-xl border border-stone-300 resize-none"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingPostId(null)}
                        className="px-3 py-1 text-xs font-semibold text-stone-600 hover:bg-stone-200 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveEdit(post.id)}
                        className="px-4 py-1 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-sm sm:text-base text-stone-900 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                      {post.content}
                    </p>
                  </div>
                )}

                {/* Attached Image */}
                {post.imageUrl && (
                  <div className="rounded-2xl overflow-hidden border border-stone-200 max-h-80 bg-stone-100">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-auto max-h-80 object-cover"
                    />
                    {post.imageCaption && (
                      <div className="bg-stone-50 px-3 py-1.5 text-[11px] text-stone-600 italic border-t border-stone-200">
                        📷 {post.imageCaption}
                      </div>
                    )}
                  </div>
                )}

                {/* Verified Solution Badge */}
                {post.verifiedExpertAnswer && (
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>
                      <strong>Verified Agronomist Solution:</strong> KALRO Extension Officer has verified
                      the scientific best practice below.
                    </span>
                  </div>
                )}

                {/* Actions Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-600">
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Likes */}
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
                        post.isLiked
                          ? 'text-rose-600 bg-rose-50 font-bold'
                          : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          post.isLiked ? 'fill-rose-600 text-rose-600' : 'text-stone-500'
                        }`}
                      />
                      <span>{post.likes}</span>
                    </button>

                    {/* Comments Toggle */}
                    <button
                      onClick={() => handleToggleComments(post.id)}
                      className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-stone-600 hover:bg-stone-100 transition font-medium cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 text-stone-500" />
                      <span>{post.comments.length} Comments</span>
                    </button>

                    {/* Repost */}
                    <button
                      onClick={() => handleRepost(post.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
                        post.isReposted ? 'text-emerald-700 font-bold bg-emerald-50' : 'text-stone-600 hover:bg-stone-100'
                      }`}
                      title="Repost to your network"
                    >
                      <Repeat2 className="w-4 h-4" />
                      <span>{post.repostsCount || 0}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Bookmark */}
                    <button
                      onClick={() => handleBookmark(post.id)}
                      className={`p-1.5 rounded-lg transition cursor-pointer ${
                        post.isBookmarked ? 'text-amber-600 fill-amber-600' : 'text-stone-500 hover:bg-stone-100'
                      }`}
                      title="Bookmark post"
                    >
                      <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-amber-600' : ''}`} />
                    </button>

                    {/* Share */}
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.href);
                        alert('Link to post copied to clipboard!');
                      }}
                      className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100 cursor-pointer"
                      title="Share Post"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Threaded Comments & Replies Section */}
                {openComments[post.id] && (
                  <div className="pt-3 border-t border-stone-100 space-y-3 bg-[#FAF7F0]/60 p-3 sm:p-4 rounded-2xl">
                    {/* Comments List */}
                    <div className="space-y-3">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="space-y-2">
                          {/* Parent Comment Card */}
                          <div
                            className={`p-3 rounded-2xl text-xs space-y-1.5 border ${
                              comment.isExpertAdvice
                                ? 'bg-emerald-50/80 border-emerald-200'
                                : 'bg-white border-stone-200'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <img
                                  src={comment.authorAvatar}
                                  alt=""
                                  className="w-6 h-6 rounded-full object-cover border border-emerald-600/30"
                                />
                                <span className="font-bold text-stone-900">{comment.author}</span>
                                {comment.isExpertAdvice && (
                                  <span className="bg-emerald-700 text-white font-bold text-[9px] px-1.5 py-0.2 rounded-full">
                                    Agronomist
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-stone-400">{comment.createdAt}</span>
                            </div>

                            <p className="text-stone-700 pl-8 leading-relaxed">{comment.content}</p>

                            <div className="flex items-center justify-between pl-8 pt-1 text-[11px] text-stone-500">
                              <div className="flex items-center gap-3">
                                <span>{comment.likes} likes</span>
                                <button
                                  onClick={() =>
                                    setReplyingToCommentId(
                                      replyingToCommentId === comment.id ? null : comment.id
                                    )
                                  }
                                  className="text-emerald-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                                >
                                  <Reply className="w-3 h-3" />
                                  <span>Reply</span>
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Nested Replies Tree */}
                          {comment.replies && comment.replies.length > 0 && (
                            <div className="pl-6 sm:pl-8 space-y-2 border-l-2 border-emerald-200 ml-3">
                              {comment.replies.map((reply) => (
                                <div
                                  key={reply.id}
                                  className="p-2.5 rounded-xl bg-white border border-stone-200 text-xs space-y-1"
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <img
                                        src={reply.authorAvatar}
                                        alt=""
                                        className="w-5 h-5 rounded-full object-cover"
                                      />
                                      <span className="font-bold text-stone-900">{reply.author}</span>
                                      <span className="text-[10px] text-emerald-700">
                                        Replying to @{reply.replyToAuthor || comment.author}
                                      </span>
                                    </div>
                                    <span className="text-[10px] text-stone-400">{reply.createdAt}</span>
                                  </div>
                                  <p className="text-stone-700 pl-7">{reply.content}</p>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Inline Reply Form */}
                          {replyingToCommentId === comment.id && (
                            <div className="pl-6 sm:pl-8 ml-3 flex gap-2">
                              <input
                                type="text"
                                placeholder={`Reply to ${comment.author}...`}
                                value={replyInputs[comment.id] || ''}
                                onChange={(e) =>
                                  setReplyInputs((prev) => ({
                                    ...prev,
                                    [comment.id]: e.target.value,
                                  }))
                                }
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleAddReply(post.id, comment.id, comment.author);
                                  }
                                }}
                                className="flex-1 text-xs px-3 py-1.5 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-emerald-600"
                              />
                              <button
                                onClick={() => handleAddReply(post.id, comment.id, comment.author)}
                                className="px-3 py-1.5 bg-emerald-700 text-white rounded-xl text-xs font-semibold hover:bg-emerald-800 transition cursor-pointer"
                              >
                                Send
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* New Comment Input for Post */}
                    <div className="pt-2 flex items-center gap-2">
                      <img
                        src={user.avatar}
                        alt=""
                        className="w-7 h-7 rounded-full object-cover border border-emerald-400 shrink-0"
                      />
                      <input
                        type="text"
                        placeholder="Write constructive farm advice or ask follow-up..."
                        value={commentInputs[post.id] || ''}
                        onChange={(e) =>
                          setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                        }
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleAddComment(post.id);
                        }}
                        className="flex-1 text-xs px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-emerald-600"
                      />
                      <button
                        onClick={() => handleAddComment(post.id)}
                        className="p-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition cursor-pointer shrink-0"
                        title="Submit Comment"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </article>
            );
          })
        )}
      </div>

      {/* Moderation / Report Modal */}
      {reportingPostId && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-stone-200">
              <h3 className="font-bold text-sm text-stone-900 flex items-center gap-1.5">
                <Flag className="w-4 h-4 text-amber-600" />
                <span>Report Content to Agronomy Board</span>
              </h3>
              <button
                onClick={() => setReportingPostId(null)}
                className="text-stone-400 hover:text-stone-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-stone-600">Please choose the violation category:</p>
              {[
                'Unregistered or dangerous agrochemical formulation',
                'Misleading veterinary treatment advice',
                'Counterfeit seed or fraudulent market listing',
                'Harassment, abusive language, or spam',
              ].map((reason) => (
                <label
                  key={reason}
                  className="flex items-center gap-2 p-2 rounded-xl hover:bg-stone-50 cursor-pointer border border-transparent hover:border-stone-200"
                >
                  <input
                    type="radio"
                    name="reportReason"
                    checked={reportReason === reason}
                    onChange={() => setReportReason(reason)}
                    className="accent-emerald-700"
                  />
                  <span className="text-stone-800 font-medium">{reason}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setReportingPostId(null)}
                className="px-3 py-1.5 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={submitReport}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
