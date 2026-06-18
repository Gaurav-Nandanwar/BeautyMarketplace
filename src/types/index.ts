export type UserRole = "customer" | "salon_owner" | "admin";

export interface User {
  id: string;
  email: string;
  displayName: string;
  phone?: string;
  photoURL?: string;
  role: UserRole;
  city?: string;
  gender?: "male" | "female" | "other";
  addresses?: Address[];
  preferences?: UserPreferences;
  createdAt: string;
  updatedAt: string;
}

export interface UserPreferences {
  budget?: "budget" | "mid" | "luxury";
  preferredServices?: string[];
  homeService?: boolean;
  notifications?: boolean;
}

export interface Address {
  id: string;
  label: string;
  line1: string;
  line2?: string;
  locality: string;
  city: string;
  pincode: string;
  lat?: number;
  lng?: number;
  isDefault?: boolean;
}

export interface Salon {
  id: string;
  ownerId: string;
  name: string;
  slug: string;
  description: string;
  city: string;
  locality: string;
  address: string;
  lat: number;
  lng: number;
  phone: string;
  email?: string;
  images: string[];
  coverImage: string;
  rating: number;
  reviewCount: number;
  priceRange: "budget" | "mid" | "luxury";
  gender: "unisex" | "women" | "men";
  homeService: boolean;
  isLuxury: boolean;
  isVerified: boolean;
  isApproved: boolean;
  isFeatured: boolean;
  categories: string[];
  openingHours: OpeningHours;
  amenities?: string[];
  policies?: string[];
  faqs?: FAQ[];
  viewCount: number;
  bookingCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface OpeningHours {
  [day: string]: { open: string; close: string; closed?: boolean };
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  salonId: string;
  name: string;
  slug: string;
  category: string;
  description?: string;
  price: number;
  duration: number;
  gender?: "unisex" | "women" | "men";
  isPopular?: boolean;
  isHomeService?: boolean;
  discount?: number;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Staff {
  id: string;
  salonId: string;
  name: string;
  role: string;
  photoURL?: string;
  specialties: string[];
  rating: number;
  isAvailable: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  customerId: string;
  salonId: string;
  serviceIds: string[];
  staffId?: string;
  date: string;
  slot: string;
  status: "pending" | "confirmed" | "rejected" | "cancelled" | "completed";
  totalAmount: number;
  paymentMethod: "cash" | "upi" | "card";
  paymentStatus: "pending" | "paid" | "refunded";
  address?: Address;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  salonId: string;
  customerId: string;
  customerName: string;
  customerPhoto?: string;
  bookingId?: string;
  rating: number;
  comment: string;
  photos?: string[];
  isVerified: boolean;
  helpfulVotes: number;
  createdAt: string;
}

export interface Offer {
  id: string;
  salonId?: string;
  title: string;
  description: string;
  discount: number;
  code?: string;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  image?: string;
  createdAt: string;
}

export interface Favorite {
  id: string;
  userId: string;
  salonId: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: "booking" | "offer" | "promotion" | "reminder" | "system";
  title: string;
  message: string;
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface Availability {
  id: string;
  salonId: string;
  staffId?: string;
  date: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Transaction {
  id: string;
  bookingId: string;
  salonId: string;
  customerId: string;
  amount: number;
  status: "pending" | "completed" | "failed" | "refunded";
  method: string;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description?: string;
}

export interface SearchFilters {
  query?: string;
  locality?: string;
  priceRange?: ("budget" | "mid" | "luxury")[];
  minRating?: number;
  service?: string;
  gender?: ("unisex" | "women" | "men")[];
  homeService?: boolean;
  luxury?: boolean;
  discount?: boolean;
  occasion?: string;
  availability?: string;
  sortBy?: "distance" | "price" | "rating" | "popularity";
}

export interface AIRecommendationInput {
  budget?: string;
  location?: string;
  occasion?: string;
  preferredService?: string;
  preferences?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
