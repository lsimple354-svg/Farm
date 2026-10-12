export type Page =
  | 'home'
  | 'community'
  | 'reels'
  | 'messages'
  | 'events'
  | 'profile'
  | 'crops'
  | 'livestock'
  | 'soil-water'
  | 'pests'
  | 'weather'
  | 'calculators'
  | 'markets'
  | 'suppliers'
  | 'farm-manager'
  | 'learning'
  | 'ai-assistant'
  | 'expert'
  | 'opportunities'
  | 'farm-business'
  | 'sustainable'
  | 'admin-cms'
  | 'about'
  | 'legal'
  | 'contact';

export type Language = 'en' | 'sw' | 'fr';
export type UnitSystem = 'metric' | 'imperial';
export type CurrencyCode = 'KES' | 'USD' | 'EUR' | 'GBP' | 'NGN' | 'UGX' | 'TZS' | 'ZAR';
export type RegionCountry =
  | 'Kenya'
  | 'Uganda'
  | 'Tanzania'
  | 'Rwanda'
  | 'Nigeria'
  | 'Ghana'
  | 'South Africa'
  | 'Ethiopia'
  | 'Global';

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role:
    | 'Smallholder Farmer'
    | 'Commercial Farmer'
    | 'Agronomist'
    | 'Agro-Dealer'
    | 'Extension Officer'
    | 'Agricultural Student'
    | 'Cooperative Leader';
  county: string;
  country?: string;
  farmSizeAcres: number;
  primaryEnterprises: string[];
  reputationPoints: number;
  badges: string[];
  joinedDate: string;
  phone?: string;
  bio?: string;
  isVerified?: boolean;
  email?: string;
}

export interface CommentReply {
  id: string;
  authorId?: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  county?: string;
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  replyToAuthor?: string;
}

export interface PostComment {
  id: string;
  authorId?: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  county: string;
  content: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  isExpertAdvice?: boolean;
  replies?: CommentReply[];
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  authorRole: string;
  county: string;
  country?: string;
  tag:
    | 'Crops'
    | 'Livestock'
    | 'SoilHealth'
    | 'PestAlert'
    | 'MarketDeal'
    | 'Organic'
    | 'Question'
    | 'Regenerative'
    | 'Aquaculture'
    | 'Innovation';
  title: string;
  content: string;
  imageUrl?: string;
  images?: string[];
  videoUrl?: string;
  imageCaption?: string;
  likes: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  isReposted?: boolean;
  repostsCount?: number;
  commentsCount: number;
  comments: PostComment[];
  createdAt: string;
  solved?: boolean;
  verifiedExpertAnswer?: boolean;
  isFollowingAuthor?: boolean;
}

export interface AgriStory {
  id: string;
  authorId: string;
  authorName: string;
  authorAvatar: string;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption: string;
  county: string;
  createdAt: string;
  expiresAt: string;
  viewed?: boolean;
}

export interface AgriReel {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorHandle: string;
  creatorAvatar: string;
  creatorRole: string;
  videoUrl: string;
  thumbnail: string;
  title: string;
  description: string;
  topicTag: string;
  county: string;
  country?: string;
  likes: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  commentsCount: number;
  comments?: PostComment[];
  sharesCount: number;
  relatedResourceTitle?: string;
  relatedResourcePage?: Page;
  verifiedBadge?: boolean;
  captions?: string;
}

export interface NotificationItem {
  id: string;
  type:
    | 'reply'
    | 'like'
    | 'mention'
    | 'market_enquiry'
    | 'weather_alert'
    | 'expert_answer'
    | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  avatar?: string;
  targetPage: Page;
  targetId?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  attachmentUrl?: string;
  timestamp: string;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  recipientId: string;
  recipientName: string;
  recipientHandle: string;
  recipientAvatar: string;
  recipientRole: string;
  recipientCounty: string;
  isOnline?: boolean;
  unreadCount: number;
  isGroup?: boolean;
  groupName?: string;
  lastMessage: string;
  lastMessageTime: string;
  messages: ChatMessage[];
}

export interface MarketListing {
  id: string;
  title: string;
  category: 'Produce' | 'Livestock' | 'Seeds & Inputs' | 'Machinery' | 'Services';
  price: number;
  currency: CurrencyCode;
  unit: string;
  quantity: string;
  location: string;
  country: string;
  imageUrl: string;
  description: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerPhone: string;
  sellerRating: number;
  isVerifiedSeller: boolean;
  createdAt: string;
}

export interface AgriEvent {
  id: string;
  title: string;
  organizer: string;
  category: 'Field Day' | 'ASK Show' | 'Training Clinic' | 'Webinar' | 'Auction' | 'Baraza';
  county: string;
  location: string;
  date: string;
  time: string;
  fee: string;
  attendeesCount: number;
  isRegistered?: boolean;
  description: string;
  highlights: string[];
  contact: string;
}

export interface CropGuide {
  id: string;
  name: string;
  swahiliName: string;
  category: 'Cereals' | 'Legumes' | 'Horticulture' | 'Tubers' | 'Cash Crops' | 'Fruits';
  image: string;
  optimalAltitude: string;
  rainfall: string;
  soilType: string;
  maturityPeriod: string;
  expectedYield: string;
  spacing: string;
  seedRatePerAcre: string;
  fertilizerRegime: string;
  commonPests: string[];
  harvestingTips: string;
  marketPriceRange: string;
  tags: string[];
}

export interface LivestockGuide {
  id: string;
  name: string;
  swahiliName: string;
  category: 'Dairy Cattle' | 'Beef' | 'Poultry' | 'Goats & Sheep' | 'Pigs' | 'Aquaculture' | 'Apiculture';
  image: string;
  popularBreeds: string[];
  dailyFeedRequirement: string;
  spaceRequirement: string;
  gestationIncubationPeriod: string;
  keyVaccinations: string[];
  commonDiseases: string[];
  yieldBenchmark: string;
  managementTips: string;
}

export interface PestAlert {
  id: string;
  name: string;
  scientificName: string;
  affectedCrops: string[];
  severity: 'Critical' | 'High' | 'Moderate' | 'Seasonal';
  symptoms: string[];
  imageUrl: string;
  biologicalControl: string;
  chemicalControl: string;
  preventiveMeasures: string;
  countyPrevalence: string[];
}

export interface MarketCommodity {
  id: string;
  commodity: string;
  variety: string;
  unit: string;
  wholesalePriceKES: number;
  retailPriceKES: number;
  previousPriceKES: number;
  trend: 'up' | 'down' | 'stable';
  keyMarket: string;
  updatedDate: string;
}

export interface SupplierItem {
  id: string;
  businessName: string;
  category:
    | 'Certified Seeds'
    | 'Fertilizers & Agrochemicals'
    | 'Animal Feeds & Premixes'
    | 'Machinery Hire'
    | 'Irrigation Equipment'
    | 'Veterinary Services';
  county: string;
  town: string;
  phone: string;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  services: string[];
}

export interface FarmTask {
  id: string;
  title: string;
  plotName: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
  category: 'Planting' | 'Weeding' | 'Spraying' | 'Fertilizer' | 'Harvesting' | 'Vaccination' | 'Feeding';
}

export interface FarmRecord {
  id: string;
  date: string;
  type: 'Expense' | 'Income';
  category: 'Seed' | 'Fertilizer' | 'Labor' | 'Vet / Feeds' | 'Harvest Sale' | 'Equipment' | 'Transport';
  amount: number;
  description: string;
}
