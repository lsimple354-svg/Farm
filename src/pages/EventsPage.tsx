import React, { useState } from 'react';
import type { AgriEvent } from '../types';
import { MOCK_EVENTS, COUNTIES } from '../data/mockData';
import {
  Calendar,
  MapPin,
  Clock,
  Ticket,
  Users,
  CheckCircle,
  Share2,
  PhoneCall,
  Search,
} from 'lucide-react';

interface EventsPageProps {
  isMobileFrame?: boolean;
}

export const EventsPage: React.FC<EventsPageProps> = ({ isMobileFrame = false }) => {
  const [events, setEvents] = useState<AgriEvent[]>(() => {
    try {
      const saved = localStorage.getItem('agri_events');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return MOCK_EVENTS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const toggleRegister = (id: string) => {
    const updated = events.map((ev) => {
      if (ev.id === id) {
        const isRegistered = !ev.isRegistered;
        return {
          ...ev,
          isRegistered,
          attendeesCount: isRegistered ? ev.attendeesCount + 1 : ev.attendeesCount - 1,
        };
      }
      return ev;
    });
    setEvents(updated);
    try {
      localStorage.setItem('agri_events', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const categories = ['All', 'Field Day', 'ASK Show', 'Training Clinic', 'Webinar', 'Baraza'];

  const filtered = events.filter((ev) => {
    const matchCat = selectedCategory === 'All' || ev.category === selectedCategory;
    const matchSearch =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.county.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className={`space-y-6 ${isMobileFrame ? 'text-xs' : 'max-w-5xl mx-auto'}`}>
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-700" />
            <h1 className="text-xl font-serif font-bold text-stone-900">
              Agricultural Field Days & Expos
            </h1>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Hands-on farm demos, seed trials, machinery expos, and county farmer clinics across Kenya.
          </p>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, counties..."
            className="text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelectedCategory(c)}
            className={`px-3.5 py-1.5 rounded-full font-semibold transition ${
              selectedCategory === c
                ? 'bg-purple-800 text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((ev) => (
          <div
            key={ev.id}
            className="bg-white rounded-2xl p-5 border border-stone-200 shadow-xs hover:border-purple-300 transition space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              {/* Category & Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900">
                  {ev.category}
                </span>
                <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {ev.fee}
                </span>
              </div>

              {/* Title & Organizer */}
              <div>
                <h3 className="font-serif font-bold text-base text-stone-900 leading-snug">
                  {ev.title}
                </h3>
                <p className="text-xs text-stone-500 font-medium mt-0.5">
                  Organized by: {ev.organizer}
                </p>
              </div>

              {/* Date, Time, Location */}
              <div className="space-y-1 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                  <span className="font-semibold text-stone-800">{ev.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                  <span>{ev.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-purple-700 shrink-0" />
                  <span className="font-medium text-stone-900">
                    {ev.location} ({ev.county})
                  </span>
                </div>
              </div>

              {/* Description & Key Highlights */}
              <p className="text-xs text-stone-600 leading-relaxed">{ev.description}</p>

              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                  Session Highlights:
                </p>
                <ul className="text-xs text-stone-600 space-y-1">
                  {ev.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-purple-600 font-bold">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Registration & Attendees */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-stone-500">
                <Users className="w-4 h-4 text-stone-400" />
                <span>{ev.attendeesCount} farmers attending</span>
              </div>

              <button
                onClick={() => toggleRegister(ev.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  ev.isRegistered
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-purple-700 hover:bg-purple-800 text-white shadow-md'
                }`}
              >
                {ev.isRegistered ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Seat Reserved</span>
                  </>
                ) : (
                  <>
                    <Ticket className="w-4 h-4" />
                    <span>Register Free</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
