export interface CityConfig {
  id: string;
  name: string;
  slug: string;
  title: string;
  tagline: string;
  center: { lat: number; lng: number };
  timezone: string;
}

export const cities: CityConfig[] = [
  {
    id: "mumbai",
    name: "Mumbai",
    slug: "mumbai",
    title: "Mumbai Beauty Marketplace",
    tagline: "Discover, Compare and Book the Best Beauty Services Near You.",
    center: { lat: 19.076, lng: 72.8777 },
    timezone: "Asia/Kolkata",
  },
  {
    id: "bangalore",
    name: "Bangalore",
    slug: "bangalore",
    title: "Bangalore Luxury Salon Finder",
    tagline: "Premium grooming experiences across Bengaluru.",
    center: { lat: 12.9716, lng: 77.5946 },
    timezone: "Asia/Kolkata",
  },
  {
    id: "delhi",
    name: "Delhi",
    slug: "delhi",
    title: "Delhi Bridal Beauty Booking",
    tagline: "Bridal makeup, hair, and spa — curated for your big day.",
    center: { lat: 28.6139, lng: 77.209 },
    timezone: "Asia/Kolkata",
  },
  {
    id: "pune",
    name: "Pune",
    slug: "pune",
    title: "Pune Home Salon Service",
    tagline: "Salon-quality beauty at your doorstep.",
    center: { lat: 18.5204, lng: 73.8567 },
    timezone: "Asia/Kolkata",
  },
  {
    id: "hyderabad",
    name: "Hyderabad",
    slug: "hyderabad",
    title: "Hyderabad Grooming Platform",
    tagline: "Top-rated salons and grooming services in Hyderabad.",
    center: { lat: 17.385, lng: 78.4867 },
    timezone: "Asia/Kolkata",
  },
];

export const defaultCity =
  cities.find((c) => c.id === (process.env.NEXT_PUBLIC_DEFAULT_CITY ?? "mumbai")) ??
  cities[0];

export function getCityBySlug(slug: string): CityConfig | undefined {
  return cities.find((c) => c.slug === slug);
}
