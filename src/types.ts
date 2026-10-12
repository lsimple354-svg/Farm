export type Page =
  | 'home'
  | 'community'
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
  | 'about';

export type Language = 'en' | 'sw';

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  role: 'Smallholder Farmer' | 'Commercial Farmer' | 'Agronomist' | 'Agro-Dealer' | 'Extension Officer';
  county: string;
  farmSizeAcres: number;
  primaryEnterprises: string[];
  reputationPoints: number;
  badges: string[];
  joinedDate: string;
  phone?: string;
  bio?: string;
}

export interface PostComment {
  id: string;
  author: string;
  authorRole: string;
  authorAvatar: string;
  county: string;
  content: string;
  createdAt: string;
  likes: number;
  isExpertAdvice?: boolean;
}

export interface CommunityPost {
  id: string;
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  authorRole: string;
  county: string;
  tag: 'Crops' | 'Livestock' | 'SoilHealth' | 'PestAlert' | 'MarketDeal' | 'Organic' | 'Question';
  title: string;
  content: string;
  imageUrl?: string;
  imageCaption?: string;
  likes: number;
  isLiked?: boolean;
  commentsCount: number;
  comments: PostComment[];
  createdAt: string;
  solved?: boolean;
  verifiedExpertAnswer?: boolean;
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
  category: 'Certified Seeds' | 'Fertilizers & Agrochemicals' | 'Animal Feeds & Premixes' | 'Machinery Hire' | 'Irrigation Equipment' | 'Veterinary Services';
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
