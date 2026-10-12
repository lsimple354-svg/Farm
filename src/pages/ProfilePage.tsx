import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFarm } from '../context/FarmContext';
import { COUNTIES, MOCK_CROPS, MOCK_LIVESTOCK } from '../data/mockData';
import {
  User,
  MapPin,
  Award,
  Sparkles,
  Edit3,
  Bookmark,
  CheckCircle2,
  Calendar,
  Layers,
  Phone,
  Shield,
  Sprout,
  Save,
} from 'lucide-react';

interface ProfilePageProps {
  isMobileFrame?: boolean;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ isMobileFrame = false }) => {
  const { user, setUser } = useAuth();
  const { bookmarkedGuideIds, tasks } = useFarm();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [county, setCounty] = useState(user.county);
  const [farmSize, setFarmSize] = useState(user.farmSizeAcres.toString());
  const [phone, setPhone] = useState(user.phone || '');
  const [bio, setBio] = useState(user.bio || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name,
      county,
      farmSizeAcres: parseFloat(farmSize) || prev.farmSizeAcres,
      phone,
      bio,
    }));
    setIsEditing(false);
  };

  const bookmarkedCrops = MOCK_CROPS.filter((c) => bookmarkedGuideIds.includes(c.id));
  const bookmarkedLive = MOCK_LIVESTOCK.filter((l) => bookmarkedGuideIds.includes(l.id));

  return (
    <div className={`space-y-6 ${isMobileFrame ? 'text-xs' : 'max-w-4xl mx-auto'}`}>
      {/* Profile Card Header */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-600 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-serif font-bold text-stone-900">{user.name}</h1>
                <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  Verified Farmer
                </span>
              </div>
              <p className="text-xs text-stone-500">{user.handle} • Joined {user.joinedDate}</p>

              <div className="flex items-center gap-3 mt-2 text-xs text-stone-600 flex-wrap">
                <span className="flex items-center gap-1 font-medium text-emerald-900">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                  {user.county} County
                </span>
                <span>•</span>
                <span>{user.farmSizeAcres} Acres Farmed</span>
                <span>•</span>
                <span>{user.role}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs flex items-center gap-1.5 transition"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Bio */}
        {user.bio && (
          <p className="text-xs text-stone-600 mt-4 pt-3 border-t border-stone-100 leading-relaxed italic">
            "{user.bio}"
          </p>
        )}

        {/* Edit Form */}
        {isEditing && (
          <form
            onSubmit={handleSave}
            className="mt-4 pt-4 border-t-2 border-emerald-500 bg-emerald-50/50 p-4 rounded-2xl space-y-3"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-700">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 rounded-lg bg-white border border-stone-300"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-stone-700">County</label>
                <select
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 rounded-lg bg-white border border-stone-300"
                >
                  {COUNTIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-stone-700">Total Farm Acres</label>
                <input
                  type="number"
                  step="0.1"
                  value={farmSize}
                  onChange={(e) => setFarmSize(e.target.value)}
                  className="w-full text-xs px-3 py-1.5 rounded-lg bg-white border border-stone-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-stone-700">Farmer Bio / Enterprises</label>
              <textarea
                rows={2}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full text-xs px-3 py-1.5 rounded-lg bg-white border border-stone-300"
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </form>
        )}
      </div>

      {/* Gamification Reputation & Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-amber-50 to-amber-100/60 p-4 rounded-2xl border border-amber-200 flex items-center gap-3">
          <div className="p-3 bg-amber-400 text-amber-950 rounded-xl">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-serif font-black text-amber-950">
              {user.reputationPoints.toLocaleString()}
            </div>
            <p className="text-[11px] text-amber-800 font-medium">Reputation Points</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/60 p-4 rounded-2xl border border-emerald-200 flex items-center gap-3">
          <div className="p-3 bg-emerald-600 text-white rounded-xl">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-serif font-black text-emerald-950">
              {tasks.filter((t) => t.completed).length} / {tasks.length}
            </div>
            <p className="text-[11px] text-emerald-800 font-medium">Farm Chores Completed</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100/60 p-4 rounded-2xl border border-purple-200 flex items-center gap-3">
          <div className="p-3 bg-purple-600 text-white rounded-xl">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-serif font-black text-purple-950">
              {user.badges.length} Badges
            </div>
            <p className="text-[11px] text-purple-800 font-medium">Extension Recognitions</p>
          </div>
        </div>
      </div>

      {/* Badges Earned Showcase */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-3">
        <h2 className="text-sm font-serif font-bold text-stone-900 flex items-center gap-2">
          <Award className="w-4 h-4 text-emerald-700" />
          <span>Agricultural Badges & Certifications</span>
        </h2>
        <div className="flex flex-wrap gap-2">
          {user.badges.map((b, i) => (
            <span
              key={i}
              className="px-3 py-1.5 rounded-xl bg-stone-100 border border-stone-300 text-stone-800 text-xs font-semibold flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{b}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bookmarked Crop & Livestock Guides */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs space-y-3">
        <h2 className="text-sm font-serif font-bold text-stone-900 flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-emerald-700" />
          <span>Saved Agronomy Bookmarks</span>
        </h2>

        {bookmarkedCrops.length === 0 && bookmarkedLive.length === 0 ? (
          <p className="text-xs text-stone-500">No bookmarked guides yet. Tap bookmark on any crop page.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {bookmarkedCrops.map((c) => (
              <div key={c.id} className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center gap-3">
                <img src={c.image} alt={c.name} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <h4 className="font-bold text-xs text-stone-900">{c.name}</h4>
                  <p className="text-[11px] text-emerald-800">Maturity: {c.maturityPeriod}</p>
                </div>
              </div>
            ))}
            {bookmarkedLive.map((l) => (
              <div key={l.id} className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 flex items-center gap-3">
                <img src={l.image} alt={l.name} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <h4 className="font-bold text-xs text-stone-900">{l.name}</h4>
                  <p className="text-[11px] text-amber-800">{l.yieldBenchmark}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
