import React, { useState, useEffect, useRef } from 'react';
import type { Conversation, ChatMessage, Page } from '../types';
import { useAuth } from '../context/AuthContext';
import {
  Send,
  Image as ImageIcon,
  Paperclip,
  Search,
  MoreVertical,
  ShieldAlert,
  Phone,
  Video,
  Check,
  CheckCheck,
  User,
  Users,
  Lock,
  ArrowLeft,
  Circle,
  PlusCircle,
  X,
  AlertCircle,
  Trash2,
} from 'lucide-react';

interface MessagesPageProps {
  setCurrentPage?: (page: Page) => void;
  initialConversationId?: string;
}

const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    recipientId: 'usr-buyer-1',
    recipientName: 'Kiprono Aggregators',
    recipientHandle: '@kiprono_grain',
    recipientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    recipientRole: 'Wholesale Grain Off-taker',
    recipientCounty: 'Uasin Gishu',
    isOnline: true,
    unreadCount: 1,
    lastMessage: 'Are the 45 bags of dry maize moisture tested below 13.5%?',
    lastMessageTime: '10:42 AM',
    messages: [
      {
        id: 'm-1',
        senderId: 'usr-buyer-1',
        senderName: 'Kiprono Aggregators',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        text: 'Habari John! I saw your listing for 45 bags of dry maize on AgriMarket.',
        timestamp: '10:38 AM',
        isRead: true,
      },
      {
        id: 'm-2',
        senderId: 'usr-101',
        senderName: 'John Kipchoge',
        senderAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=150&q=80',
        text: 'Habari! Yes, harvested in Soy, well dried and bagged in 90kg hermetic bags.',
        timestamp: '10:40 AM',
        isRead: true,
      },
      {
        id: 'm-3',
        senderId: 'usr-buyer-1',
        senderName: 'Kiprono Aggregators',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        text: 'Are the 45 bags of dry maize moisture tested below 13.5%? If so, we can dispatch our truck tomorrow morning at KES 3,400/bag.',
        timestamp: '10:42 AM',
        isRead: false,
      },
    ],
  },
  {
    id: 'conv-2',
    recipientId: 'usr-cheruiyot',
    recipientName: 'Dr. Joseph Cheruiyot',
    recipientHandle: '@cheruiyot_vet',
    recipientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    recipientRole: 'Senior Extension Officer (KALRO)',
    recipientCounty: 'Trans Nzoia',
    isOnline: true,
    unreadCount: 0,
    lastMessage: 'Remember to check the California Mastitis Test paddle weekly.',
    lastMessageTime: 'Yesterday',
    messages: [
      {
        id: 'm-201',
        senderId: 'usr-cheruiyot',
        senderName: 'Dr. Joseph Cheruiyot',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        text: 'Great work on the silage pit! Remember to check the California Mastitis Test paddle weekly to catch subclinical mastitis early.',
        timestamp: 'Yesterday 3:15 PM',
        isRead: true,
      },
    ],
  },
  {
    id: 'conv-3',
    recipientId: 'group-rift-dairy',
    recipientName: 'Rift Valley Dairy Co-op Circle',
    recipientHandle: '@rift_dairy_group',
    recipientAvatar: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=150&q=80',
    recipientRole: 'Farmer Discussion Group (180 Members)',
    recipientCounty: 'Rift Valley Regional',
    isGroup: true,
    groupName: 'Rift Valley Dairy Co-op Circle',
    unreadCount: 0,
    lastMessage: 'Evans: New KCC Eldoret intake price adjusted to KES 50/L today.',
    lastMessageTime: '2 days ago',
    messages: [
      {
        id: 'm-301',
        senderId: 'usr-evans',
        senderName: 'Evans Kiplagat',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        text: 'New KCC Eldoret intake price adjusted to KES 50/L today for morning milk batches!',
        timestamp: '2 days ago',
        isRead: true,
      },
    ],
  },
];

export const MessagesPage: React.FC<MessagesPageProps> = ({
  setCurrentPage,
  initialConversationId,
}) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    try {
      const saved = localStorage.getItem('agri_conversations');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_CONVERSATIONS;
  });

  const [activeConvId, setActiveConvId] = useState<string>(
    initialConversationId || conversations[0]?.id || 'conv-1'
  );
  const [messageInput, setMessageInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [blockedMap, setBlockedMap] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      localStorage.setItem('agri_conversations', JSON.stringify(conversations));
    } catch {
      // ignore
    }
  }, [conversations]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConvId, conversations]);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!messageInput.trim() && !attachmentUrl.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      text: messageInput.trim(),
      attachmentUrl: attachmentUrl.trim() || undefined,
      timestamp: 'Just now',
      isRead: true,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeConvId) {
          return {
            ...c,
            lastMessage: newMsg.text || '📷 Photo attachment',
            lastMessageTime: 'Just now',
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );

    setMessageInput('');
    setAttachmentUrl('');
    setShowAttachModal(false);
  };

  const handleClearChat = (convId: string) => {
    if (confirm('Clear message history for this conversation?')) {
      setConversations((prev) =>
        prev.map((c) => (c.id === convId ? { ...c, messages: [] } : c))
      );
    }
  };

  const toggleBlock = (recipientId: string) => {
    setBlockedMap((prev) => {
      const next = { ...prev, [recipientId]: !prev[recipientId] };
      alert(next[recipientId] ? 'User blocked.' : 'User unblocked.');
      return next;
    });
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.recipientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm overflow-hidden flex flex-col md:flex-row h-[750px]">
        {/* Left Side: Conversation List */}
        <div className="w-full md:w-80 border-r border-stone-200 flex flex-col bg-stone-50/50">
          {/* Header */}
          <div className="p-4 border-b border-stone-200 flex items-center justify-between">
            <h2 className="font-serif font-bold text-base text-stone-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>AgriMessages</span>
            </h2>
            <span className="text-[10px] text-emerald-800 bg-emerald-100 font-bold px-2 py-0.5 rounded-full">
              End-to-End Secure
            </span>
          </div>

          {/* Search Box */}
          <div className="p-3 border-b border-stone-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations & groups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-emerald-600"
              />
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto divide-y divide-stone-100">
            {filteredConversations.map((conv) => {
              const isActive = conv.id === activeConvId;
              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`w-full p-3.5 flex items-start gap-3 text-left transition cursor-pointer ${
                    isActive ? 'bg-emerald-50/80 border-l-4 border-emerald-700' : 'hover:bg-stone-100/70'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={conv.recipientAvatar}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover border border-emerald-600/30"
                    />
                    {conv.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-xs text-stone-900 truncate">
                        {conv.recipientName}
                      </span>
                      <span className="text-[10px] text-stone-400 shrink-0">
                        {conv.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-[11px] text-stone-500 truncate leading-snug">
                      {conv.lastMessage}
                    </p>
                    <span className="text-[9px] text-emerald-700 font-medium">
                      {conv.recipientRole}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Side: Active Chat Window */}
        {activeConv ? (
          <div className="flex-1 flex flex-col bg-stone-50">
            {/* Chat Top Bar */}
            <div className="p-3.5 sm:p-4 bg-white border-b border-stone-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={activeConv.recipientAvatar}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover border border-emerald-600/30"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-xs sm:text-sm text-stone-900">
                      {activeConv.recipientName}
                    </h3>
                    {activeConv.isOnline && (
                      <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                        <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500" /> Online
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-stone-500">
                    {activeConv.recipientRole} • {activeConv.recipientCounty}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleBlock(activeConv.recipientId)}
                  className="text-xs text-stone-400 hover:text-rose-600 p-2 rounded-xl hover:bg-stone-100 transition cursor-pointer"
                  title="Block / Unblock contact"
                >
                  <ShieldAlert className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleClearChat(activeConv.id)}
                  className="text-xs text-stone-400 hover:text-stone-700 p-2 rounded-xl hover:bg-stone-100 transition cursor-pointer"
                  title="Clear chat history"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Messages Log */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <div className="text-center py-2">
                <span className="text-[10px] bg-stone-200/70 text-stone-600 px-3 py-1 rounded-full">
                  🔒 Farmer-to-buyer encrypted direct message • Zero intermediary commission
                </span>
              </div>

              {activeConv.messages.length === 0 ? (
                <div className="text-center py-16 text-stone-400 text-xs">
                  No messages yet. Send a greeting or trade inquiry below!
                </div>
              ) : (
                activeConv.messages.map((m) => {
                  const isMe = m.senderId === user.id;
                  return (
                    <div
                      key={m.id}
                      className={`flex gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isMe && (
                        <img
                          src={m.senderAvatar}
                          alt=""
                          className="w-7 h-7 rounded-full object-cover shrink-0 mt-1"
                        />
                      )}
                      <div
                        className={`max-w-[75%] p-3 rounded-2xl text-xs space-y-1 shadow-2xs ${
                          isMe
                            ? 'bg-[#183D29] text-white rounded-tr-none'
                            : 'bg-white text-stone-900 border border-stone-200 rounded-tl-none'
                        }`}
                      >
                        <p className="leading-relaxed whitespace-pre-line">{m.text}</p>
                        {m.attachmentUrl && (
                          <div className="rounded-xl overflow-hidden mt-1 border border-stone-300">
                            <img src={m.attachmentUrl} alt="" className="max-h-48 w-full object-cover" />
                          </div>
                        )}
                        <div
                          className={`flex items-center justify-end gap-1 text-[9px] ${
                            isMe ? 'text-emerald-200/80' : 'text-stone-400'
                          }`}
                        >
                          <span>{m.timestamp}</span>
                          {isMe && <CheckCheck className="w-3 h-3 text-emerald-300" />}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Attachment Modal */}
            {showAttachModal && (
              <div className="bg-white p-3 border-t border-stone-200 flex items-center gap-2 text-xs">
                <ImageIcon className="w-4 h-4 text-emerald-700" />
                <input
                  type="url"
                  placeholder="Paste photo URL (e.g. crop inspection photo)..."
                  value={attachmentUrl}
                  onChange={(e) => setAttachmentUrl(e.target.value)}
                  className="flex-1 text-xs p-1.5 border border-stone-300 rounded-xl"
                />
                <button
                  onClick={() => setShowAttachModal(false)}
                  className="text-xs text-stone-500 hover:text-stone-700 px-2"
                >
                  Cancel
                </button>
              </div>
            )}

            {/* Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
            >
              <button
                type="button"
                onClick={() => setShowAttachModal(!showAttachModal)}
                className="p-2 text-stone-500 hover:text-emerald-700 rounded-xl hover:bg-stone-100 transition cursor-pointer"
                title="Attach Photo"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder={`Message ${activeConv.recipientName}...`}
                className="flex-1 text-xs px-3 py-2 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:border-emerald-600"
              />

              <button
                type="submit"
                className="p-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition cursor-pointer shadow-xs"
                title="Send Message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-stone-400 text-xs">
            Select a conversation on the left to start direct chatting.
          </div>
        )}
      </div>
    </div>
  );
};
