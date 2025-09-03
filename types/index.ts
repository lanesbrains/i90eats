export type I90Location =
  | "Seattle, WA"
  | "Spokane, WA"
  | "Missoula, MT"
  | "Billings, MT"
  | "Rapid City, SD"
  | "Sioux Falls, SD"
  | "Des Moines, IA"
  | "Chicago, IL"
  | "Toledo, OH"
  | "Cleveland, OH"
  | "Buffalo, NY"
  | "Albany, NY"
  | "Boston, MA";

export interface Restaurant {
  title: string;
  slug: string;
  location: I90Location;
  cuisine: string;
  address: string;
  phone: string;
  website?: string;
  description: string;
  image?: string;
  premium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Deal {
  restaurantSlug: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  active: boolean;
  premium: boolean;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPost {
  title: string;
  slug: string;
  author: string;
  publishDate: Date;
  image?: string;
  excerpt: string;
  body: string;
  tags: string[];
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subscriber {
  email: string;
  locations: I90Location[];
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  subscriptionStatus: "active" | "past_due" | "cancelled" | "unpaid";
  subscribedAt: Date;
  currentPeriodEnd: Date;
}

export interface RestaurantSubscription {
  restaurantSlug: string;
  ownerEmail: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  subscriptionTier: "basic" | "premium";
  subscriptionStatus: "active" | "past_due" | "cancelled" | "unpaid";
  subscribedAt: Date;
  currentPeriodEnd: Date;
}

export interface NewsletterData {
  subscriber: Subscriber;
  deals: Deal[];
  locations: I90Location[];
}

export interface StripeProduct {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
}

export interface LocationFilter {
  location: I90Location;
  count: number;
  active: boolean;
}

export interface CuisineFilter {
  cuisine: string;
  count: number;
  active: boolean;
}

export interface DealWithRestaurant extends Deal {
  restaurantName: string;
  restaurantLocation: I90Location;
  restaurantCuisine: string;
}
