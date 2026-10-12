import React, { createContext, useContext, useState, useEffect } from 'react';
import type { NotificationItem, Page } from '../types';

interface NotificationContextType {
  notifications: NotificationItem[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissNotification: (id: string) => void;
  addNotification: (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => void;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'expert_answer',
    title: 'Verified Agronomist Solution',
    message: 'Dr. Cheruiyot verified your silage compaction inquiry on the community feed.',
    timestamp: '15m ago',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    targetPage: 'community',
    targetId: 'post-1',
  },
  {
    id: 'notif-2',
    type: 'market_enquiry',
    title: 'Wholesale Buyer Inquiry',
    message: 'Kiprono Aggregators sent an offer for 45 bags of dry maize in Eldoret.',
    timestamp: '1h ago',
    read: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    targetPage: 'messages',
    targetId: 'conv-1',
  },
  {
    id: 'notif-3',
    type: 'weather_alert',
    title: 'Seasonal Rainfall Advisory',
    message: 'KMD Alert: Enhanced rainfall expected across Uasin Gishu and Trans Nzoia next week.',
    timestamp: '3h ago',
    read: false,
    targetPage: 'weather',
  },
  {
    id: 'notif-4',
    type: 'reply',
    title: 'New Reply on Your Post',
    message: 'Agnes Muriuki replied to your question regarding avocado fertilizer timing.',
    timestamp: '1d ago',
    read: true,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    targetPage: 'community',
    targetId: 'post-2',
  },
  {
    id: 'notif-5',
    type: 'system',
    title: 'Masterclass Milestone',
    message: 'You completed 100% of Commercial Silage Preservation. Certificate ready!',
    timestamp: '2d ago',
    read: true,
    targetPage: 'learning',
  },
];

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    try {
      const saved = localStorage.getItem('agri_notifications');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return initialNotifications;
  });

  useEffect(() => {
    try {
      localStorage.setItem('agri_notifications', JSON.stringify(notifications));
    } catch {
      // ignore
    }
  }, [notifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const addNotification = (item: Omit<NotificationItem, 'id' | 'timestamp' | 'read'>) => {
    const newItem: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}`,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newItem, ...prev]);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        dismissNotification,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
