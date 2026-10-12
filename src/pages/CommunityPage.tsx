import React, { useState } from 'react';
import type { CommunityPost, PostComment } from '../types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
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
} from 'lucide-react';

interface CommunityPageProps {
  isMobileFrame?: boolean;
}

export const CommunityPage: React.FC<CommunityPageProps> = ({ isMobileFrame = false }) => {
  const { user, awardPoints } = useAuth();
  const { t } = useLanguage();

  const [posts, setPosts] = useState<CommunityPost[]>(() => {
    try {
      const saved = localStorage.getItem('agri_community_posts');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return MOCK_COMMUNITY_POSTS;
  });

  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [selectedCountyFilter, setSelectedCountyFilter] = useState<string>('All');

  // New Post Form state
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState<CommunityPost['tag']>('Crops');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');

  // Comment input per post
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [openComments, setOpenComments] = useState<Record<string, boolean>>({
    'post-1': true, // open first by default
  });

  const savePosts = (updated: CommunityPost[]) => {
    setPosts(updated);
    try {
      localStorage.setItem('agri_community_posts', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleLike = (postId: string) => {
    const updated = posts.map((p) => {
      if (p.id === postId) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likes: isLiked ? p.likes + 1 : p.likes - 1,
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
      author: user.name,
      authorRole: user.role,
      authorAvatar: user.avatar,
      county: user.county,
      content: text,
      createdAt: 'Just now',
      likes: 0,
      isExpertAdvice: user.role.includes('Agronomist') || user.role.includes('Officer'),
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
      tag: newTag,
      title: newTitle.trim(),
      content: newContent.trim(),
      imageUrl: newImageUrl.trim() || undefined,
      imageCaption: newImageCaption.trim() || undefined,
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
    setIsCreatingPost(false);
    awardPoints(50);
  };

  const tags = ['All', 'Crops', 'Livestock', 'SoilHealth', 'PestAlert', 'MarketDeal', 'Organic', 'Question'];

  const filteredPosts = posts.filter((p) => {
    const matchTag = selectedTag === 'All' || p.tag === selectedTag;
    const matchCounty = selectedCountyFilter === 'All' || p.county === selectedCountyFilter;
    return matchTag && matchCounty;
  });

  return (
    <div className={`space-y-4 ${isMobileFrame ? 'text-xs' : 'max-w-4xl mx-auto'}`}>
      {/* Feed Top Header */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-lg sm:text-xl font-serif font-bold text-[#183D29]">
              Farmer Community Baraza & Feed
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-0.5">
            Real questions, peer answers, verified agronomist solutions & crop pictures
          </p>
        </div>

        <button
          onClick={() => setIsCreatingPost(!isCreatingPost)}
          className="px-4 py-2 rounded-xl bg-[#183D29] hover:bg-[#122e1f] text-white font-semibold text-xs shadow-md flex items-center justify-center gap-2 transition shrink-0"
        >
          <PlusCircle className="w-4 h-4 text-emerald-400" />
          <span>{isCreatingPost ? 'Close Form' : 'New Post / Ask Question'}</span>
        </button>
      </div>

      {/* New Post Modal/Drawer Inline */}
      {isCreatingPost && (
        <form
          onSubmit={handleCreatePost}
          className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-emerald-600 shadow-md space-y-3 animate-in fade-in"
        >
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="font-bold text-xs text-emerald-950 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Publish to Farmer Feed (Earn +50 Points)</span>
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
              placeholder="e.g. My maize leaves have small yellow stripes, what deficiency is this?"
              className="w-full text-xs sm:text-sm px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-hidden focus:border-emerald-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Category Tag
              </label>
              <select
                value={newTag}
                onChange={(e) => setNewTag(e.target.value as CommunityPost['tag'])}
                className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-hidden"
              >
                <option value="Crops">🌾 Crops & Planting</option>
                <option value="Livestock">🐄 Livestock & Feeds</option>
                <option value="PestAlert">🐛 Pest / Disease Alert</option>
                <option value="SoilHealth">🌱 Soil & Fertilizer</option>
                <option value="MarketDeal">📊 Market & Off-takers</option>
                <option value="Organic">🌿 Organic / Push-Pull</option>
                <option value="Question">❓ General Farming Question</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                Optional Image URL
              </label>
              <input
                type="url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://... photo link (or leave blank)"
                className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-hidden"
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
              className="w-full text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-hidden focus:border-emerald-600 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsCreatingPost(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 hover:bg-stone-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition"
            >
              Publish Post
            </button>
          </div>
        </form>
      )}

      {/* Tags and Filters Bar */}
      <div className="bg-white rounded-2xl p-3 border border-stone-200 shadow-xs space-y-2">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-3 py-1 rounded-full whitespace-nowrap font-medium text-xs transition ${
                selectedTag === tag
                  ? 'bg-[#183D29] text-white shadow-xs'
                  : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* County Filter dropdown */}
        <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-100">
          <div className="flex items-center gap-1 text-stone-500">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span>Filter by Region:</span>
          </div>
          <select
            value={selectedCountyFilter}
            onChange={(e) => setSelectedCountyFilter(e.target.value)}
            className="text-xs bg-stone-50 border border-stone-200 px-2 py-0.5 rounded-lg text-stone-700 focus:outline-hidden"
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
          <div className="bg-white rounded-2xl p-8 text-center text-stone-500 border border-stone-200">
            <p className="font-semibold text-sm">No community posts under this filter.</p>
            <p className="text-xs mt-1">Be the first to ask a question or share advice!</p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs hover:border-stone-300 transition space-y-3"
            >
              {/* Author Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    className="w-10 h-10 rounded-full object-cover border border-emerald-600/40"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-sm text-stone-900">{post.authorName}</span>
                      <span className="text-[11px] text-stone-400">{post.authorHandle}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-stone-500">
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

                {/* Tag Badge */}
                <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100/70 text-emerald-900 shrink-0">
                  #{post.tag}
                </span>
              </div>

              {/* Title & Body */}
              <div className="space-y-1.5">
                <h3 className="font-bold text-sm sm:text-base text-stone-900 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              {/* Attached Image */}
              {post.imageUrl && (
                <div className="rounded-xl overflow-hidden border border-stone-200 max-h-80 bg-stone-100">
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

              {/* Verified Solution indicator if solved */}
              {post.verifiedExpertAnswer && (
                <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center gap-2 text-xs text-emerald-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>
                    <strong>Verified Agronomist Solution:</strong> KALRO Extension Officer has
                    verified best practice below.
                  </span>
                </div>
              )}

              {/* Action Bar: Likes, Comments Toggle, Share */}
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-600">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg transition font-medium ${
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

                  <button
                    onClick={() => handleToggleComments(post.id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-stone-600 hover:bg-stone-100 transition font-medium"
                  >
                    <MessageSquare className="w-4 h-4 text-stone-500" />
                    <span>{post.comments.length} Comments</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Post link copied to clipboard!');
                  }}
                  className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-100"
                  title="Share Post"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Comments Section Drawer */}
              {openComments[post.id] && (
                <div className="pt-3 border-t border-stone-100 space-y-3 bg-[#FAF7F0]/60 p-3 rounded-xl">
                  {/* Comments list */}
                  <div className="space-y-2.5">
                    {post.comments.map((comment) => (
                      <div
                        key={comment.id}
                        className={`p-3 rounded-xl border text-xs ${
                          comment.isExpertAdvice
                            ? 'bg-emerald-50/90 border-emerald-300 shadow-2xs'
                            : 'bg-white border-stone-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <img
                              src={comment.authorAvatar}
                              alt={comment.author}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <span className="font-bold text-stone-900">{comment.author}</span>
                            {comment.isExpertAdvice && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold bg-emerald-700 text-white px-1.5 py-0.2 rounded">
                                <ShieldCheck className="w-3 h-3" /> Expert
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-stone-400">{comment.createdAt}</span>
                        </div>
                        <p className="text-stone-700 leading-relaxed pl-8">{comment.content}</p>
                      </div>
                    ))}
                  </div>

                  {/* Add comment input */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(post.id);
                      }}
                      placeholder="Add an answer or share your farming experience..."
                      className="flex-1 text-xs px-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-hidden focus:border-emerald-600"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="p-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white transition shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))
        )}
      </div>
    </div>
  );
};
