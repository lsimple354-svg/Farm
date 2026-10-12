import React, { useState, useEffect, useRef } from 'react';
import type { Page, NotificationItem } from '../types';
import { useNotifications } from '../context/NotificationContext';
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  X,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  CloudSun,
  TrendingUp,
  Award,
  Sparkles,
} from 'lucide-react';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page, targetId?: string) => void;
}

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, dismissNotification } =
    useNotifications();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      // Use setTimeout so trigger click doesn't immediately close it
      const timer = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 50);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = notifications.filter((n) => (filter === 'unread' ? !n.read : true));

  const handleItemClick = (item: NotificationItem) => {
    markAsRead(item.id);
    onClose();
    onNavigate(item.targetPage, item.targetId);
  };

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'expert_answer':
        return <ShieldCheck className="w-4 h-4 text-emerald-500" />;
      case 'market_enquiry':
        return <TrendingUp className="w-4 h-4 text-amber-500" />;
      case 'weather_alert':
        return <CloudSun className="w-4 h-4 text-sky-400" />;
      case 'reply':
      case 'mention':
        return <MessageSquare className="w-4 h-4 text-indigo-400" />;
      default:
        return <Award className="w-4 h-4 text-emerald-400" />;
    }
  };

  return (
    <div
      ref={panelRef}
      className="fixed inset-x-2 top-20 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-96 max-w-[calc(100vw-1rem)] bg-stone-900 text-stone-100 rounded-2xl shadow-2xl border border-emerald-800/80 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
      role="dialog"
      aria-label="Notifications"
    >
      {/* Panel Header */}
      <div className="bg-emerald-950/90 px-4 py-3 border-b border-emerald-900 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-emerald-400" />
          <h2 className="font-bold text-sm tracking-tight text-white">Notifications</h2>
          {unreadCount > 0 && (
            <span className="bg-amber-500 text-stone-950 font-bold text-[10px] px-1.5 py-0.5 rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-[11px] text-emerald-300 hover:text-white flex items-center gap-1 px-2 py-1 rounded-md hover:bg-emerald-900/60 transition cursor-pointer"
              title="Mark all notifications as read"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mark read</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition cursor-pointer"
            aria-label="Close notifications"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-stone-900 px-4 py-2 border-b border-stone-800 flex items-center gap-2 text-xs">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
            filter === 'all'
              ? 'bg-emerald-800 text-white'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1 rounded-lg font-semibold transition cursor-pointer ${
            filter === 'unread'
              ? 'bg-emerald-800 text-white'
              : 'text-stone-400 hover:text-stone-200'
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 sm:max-h-96 overflow-y-auto divide-y divide-stone-800/80 overscroll-contain">
        {filtered.length === 0 ? (
          <div className="py-12 px-4 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center mx-auto text-stone-400">
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="font-semibold text-xs text-stone-300">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
            </p>
            <p className="text-[11px] text-stone-500">
              You are completely up to date with farm alerts and replies.
            </p>
          </div>
        ) : (
          filtered.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 flex items-start gap-3 transition group ${
                item.read ? 'bg-stone-900/50 hover:bg-stone-850' : 'bg-emerald-950/30 hover:bg-emerald-950/50'
              }`}
            >
              {/* Avatar / Icon */}
              <div className="relative shrink-0">
                {item.avatar ? (
                  <img
                    src={item.avatar}
                    alt=""
                    className="w-9 h-9 rounded-full object-cover border border-emerald-600/40"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-stone-800 flex items-center justify-center border border-stone-700">
                    {getIcon(item.type)}
                  </div>
                )}
                {!item.read && (
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-stone-900" />
                )}
              </div>

              {/* Message Content */}
              <div
                className="flex-1 min-w-0 cursor-pointer"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex items-center justify-between gap-1 mb-0.5">
                  <h3 className="text-xs font-bold text-white truncate pr-1">{item.title}</h3>
                  <span className="text-[10px] text-stone-400 whitespace-nowrap shrink-0">
                    {item.timestamp}
                  </span>
                </div>
                <p className="text-[11px] text-stone-300 leading-relaxed line-clamp-2">
                  {item.message}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-emerald-400 font-medium">
                  <span>View in {item.targetPage}</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>

              {/* Quick Actions (Dismiss / Mark as Read) */}
              <div className="flex flex-col gap-1 shrink-0 opacity-70 group-hover:opacity-100 transition">
                {!item.read && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      markAsRead(item.id);
                    }}
                    className="p-1 rounded text-stone-400 hover:text-emerald-400 hover:bg-stone-800 transition cursor-pointer"
                    title="Mark as read"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    dismissNotification(item.id);
                  }}
                  className="p-1 rounded text-stone-500 hover:text-rose-400 hover:bg-stone-800 transition cursor-pointer"
                  title="Dismiss notification"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer link to Settings / Help */}
      <div className="bg-stone-950 px-4 py-2 border-t border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
        <span>AgriAlerts • Real-time Kenyan & Global updates</span>
        <button
          onClick={() => {
            onClose();
            onNavigate('about');
          }}
          className="text-emerald-400 hover:underline"
        >
          Help
        </button>
      </div>
    </div>
  );
};
