import type { Salon, Review, Service } from "@/types";
import { MUMBAI_LOCALITIES } from "@/constants/localities";
import { SERVICE_CATEGORIES } from "@/constants/services";
import { slugify } from "@/lib/format";
import { getSalonPlaceholder, getDefaultAvatarUrl } from "@/lib/images";

const SALON_PREFIXES = [
  "Glamour Studio",
  "Luxe Hair & Spa",
  "Bella Beauty Lounge",
  "Radiance Salon",
  "Serenity Spa",
  "Elite Grooming",
  "Bliss Beauty Bar",
  "Chic Cuts",
  "Royal Touch",
  "Glow & Grace",
  "Vanity Vault",
  "The Beauty Room",
  "Style Studio",
  "Pure Pamper",
  "Aura Aesthetics",
  "Mirror Mirror",
  "Silk & Shears",
  "Velvet Touch",
  "Bloom Beauty",
  "Prestige Salon",
  "Divine Looks",
  "Urban Chic",
  "Pearl & Polish",
  "Lavish Locks",
  "Zen Spa",
];

const AMENITIES = [
  "Free WiFi",
  "Air Conditioned",
  "Card Payment",
  "Parking Available",
  "Wheelchair Access",
  "Kids Friendly",
  "Organic Products",
  "Complimentary Tea",
];

const REVIEW_COMMENTS = [
  "Absolutely loved my experience here! The staff was professional and the results were amazing.",
  "Great ambiance and skilled stylists. Will definitely come back for my next appointment.",
  "Best salon in the area. Fair pricing and excellent service quality.",
  "Had a wonderful bridal makeup session. They understood exactly what I wanted.",
  "Quick service without compromising on quality. Highly recommend the hair spa treatment.",
  "Clean, hygienic, and friendly staff. My go-to salon for regular grooming.",
  "The facial was rejuvenating. Felt refreshed and glowing for days!",
  "Premium experience worth every rupee. The luxury package is a must-try.",
];

const LOCALITY_COORDS: Record<string, { lat: number; lng: number }> = {
  Bandra: { lat: 19.0596, lng: 72.8295 },
  Andheri: { lat: 19.1136, lng: 72.8697 },
  Juhu: { lat: 19.1075, lng: 72.8263 },
  Powai: { lat: 19.1176, lng: 72.906 },
  Colaba: { lat: 18.9067, lng: 72.8147 },
  Worli: { lat: 19.0178, lng: 72.8178 },
  "Lower Parel": { lat: 19.005, lng: 72.83 },
  Malad: { lat: 19.186, lng: 72.848 },
  Borivali: { lat: 19.2307, lng: 72.8567 },
  Thane: { lat: 19.2183, lng: 72.9781 },
  Goregaon: { lat: 19.1663, lng: 72.8526 },
  Khar: { lat: 19.075, lng: 72.8365 },
  "Santa Cruz": { lat: 19.0825, lng: 72.8419 },
  Chembur: { lat: 19.0522, lng: 72.8999 },
  Dadar: { lat: 19.0178, lng: 72.8478 },
  Churchgate: { lat: 18.9322, lng: 72.8267 },
  Versova: { lat: 19.1283, lng: 72.8127 },
  Lokhandwala: { lat: 19.144, lng: 72.8238 },
  Kandivali: { lat: 19.2038, lng: 72.8593 },
  "Navi Mumbai": { lat: 19.033, lng: 73.0297 },
};

const DEFAULT_HOURS = {
  monday: { open: "10:00", close: "20:00" },
  tuesday: { open: "10:00", close: "20:00" },
  wednesday: { open: "10:00", close: "20:00" },
  thursday: { open: "10:00", close: "20:00" },
  friday: { open: "10:00", close: "21:00" },
  saturday: { open: "09:00", close: "21:00" },
  sunday: { open: "10:00", close: "18:00" },
};

const CUSTOMER_NAMES = [
  "Priya Sharma",
  "Rahul Mehta",
  "Ananya Patel",
  "Vikram Singh",
  "Neha Kapoor",
  "Arjun Desai",
  "Kavya Reddy",
  "Rohan Gupta",
  "Simran Kaur",
  "Aditya Joshi",
];

function seededValue(index: number, seed: number): number {
  return ((index * 9301 + seed * 49297) % 233280) / 233280;
}

function generateSalons(): Salon[] {
  return Array.from({ length: 50 }, (_, i) => {
    const prefix = SALON_PREFIXES[i % SALON_PREFIXES.length];
    const locality = MUMBAI_LOCALITIES[i % MUMBAI_LOCALITIES.length];
    const name = `${prefix} ${locality}`;
    const slug = slugify(name);
    const coords = LOCALITY_COORDS[locality] ?? { lat: 19.076, lng: 72.8777 };
    const offset = seededValue(i, 1) * 0.02 - 0.01;
    const priceRanges = ["budget", "mid", "luxury"] as const;
    const priceRange = priceRanges[Math.floor(seededValue(i, 2) * 3)];
    const genders = ["unisex", "women", "men"] as const;
    const gender = genders[Math.floor(seededValue(i, 3) * 3)];
    const rating = Math.round((3.5 + seededValue(i, 4) * 1.5) * 10) / 10;
    const reviewCount = Math.floor(20 + seededValue(i, 5) * 280);
    const catCount = 3 + Math.floor(seededValue(i, 6) * 4);
    const categories = SERVICE_CATEGORIES.slice(i % 5, (i % 5) + catCount).map(
      (c) => c.slug
    );
    const imgBase = i % 5;
    const images = [
      getSalonPlaceholder(imgBase),
      getSalonPlaceholder(imgBase + 1),
      getSalonPlaceholder(imgBase + 2),
      getSalonPlaceholder(imgBase + 3),
    ];

    return {
      id: `salon-${i + 1}`,
      ownerId: `owner-${i + 1}`,
      name,
      slug,
      description: `${name} is a ${priceRange === "luxury" ? "premium" : "trusted"} ${gender === "men" ? "men's grooming" : gender === "women" ? "women's beauty" : "unisex"} salon in ${locality}, Mumbai. We offer expert services including ${categories.slice(0, 3).join(", ").replace(/-/g, " ")} with trained professionals and a relaxing ambiance.`,
      city: "Mumbai",
      locality,
      address: `${Math.floor(1 + seededValue(i, 7) * 200)}, ${locality} Main Road, Mumbai`,
      lat: coords.lat + offset,
      lng: coords.lng + offset,
      phone: `+91 ${90000 + i}${1000 + Math.floor(seededValue(i, 8) * 9000)}`,
      email: `${slug}@beautybook.in`,
      images,
      coverImage: images[0],
      rating,
      reviewCount,
      priceRange,
      gender,
      homeService: seededValue(i, 9) > 0.4,
      isLuxury: priceRange === "luxury",
      isVerified: seededValue(i, 10) > 0.2,
      isApproved: true,
      isFeatured: i < 8,
      categories,
      openingHours: DEFAULT_HOURS,
      amenities: AMENITIES.slice(0, 4 + Math.floor(seededValue(i, 11) * 4)),
      policies: [
        "Free cancellation up to 2 hours before appointment",
        "Late arrivals may result in shortened service time",
      ],
      faqs: [
        {
          question: "Do you accept walk-ins?",
          answer: "Yes, subject to availability. We recommend booking in advance.",
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept cash, UPI, and all major credit/debit cards.",
        },
      ],
      viewCount: Math.floor(100 + seededValue(i, 12) * 5000),
      bookingCount: Math.floor(10 + seededValue(i, 13) * 500),
      createdAt: "2024-01-15T00:00:00.000Z",
      updatedAt: "2025-06-01T00:00:00.000Z",
    };
  });
}

function generateReviews(salons: Salon[]): Review[] {
  const reviews: Review[] = [];
  salons.forEach((salon, salonIndex) => {
    const count = Math.min(5, Math.max(2, Math.floor(salon.reviewCount / 50)));
    for (let j = 0; j < count; j++) {
      const idx = salonIndex * 5 + j;
      reviews.push({
        id: `review-${idx + 1}`,
        salonId: salon.id,
        customerId: `customer-${idx + 1}`,
        customerName: CUSTOMER_NAMES[idx % CUSTOMER_NAMES.length],
        customerPhoto: getDefaultAvatarUrl(),
        rating: Math.min(5, Math.max(3, Math.round(salon.rating + (seededValue(idx, 14) - 0.5)))),
        comment: REVIEW_COMMENTS[idx % REVIEW_COMMENTS.length],
        isVerified: seededValue(idx, 15) > 0.3,
        helpfulVotes: Math.floor(seededValue(idx, 16) * 30),
        createdAt: new Date(2025, idx % 6, (idx % 28) + 1).toISOString(),
      });
    }
  });
  return reviews;
}

function generateServices(salons: Salon[]): Service[] {
  const services: Service[] = [];
  salons.forEach((salon, i) => {
    const serviceNames = [
      { name: "Haircut & Styling", category: "haircut", price: 499, duration: 45 },
      { name: "Deep Cleansing Facial", category: "facial", price: 899, duration: 60 },
      { name: "Hair Spa Treatment", category: "hair-spa", price: 1299, duration: 90 },
      { name: "Bridal Makeup", category: "bridal-makeup", price: 8999, duration: 180 },
      { name: "Manicure & Pedicure", category: "manicure", price: 699, duration: 75 },
    ];
    serviceNames.forEach((svc, j) => {
      if (salon.categories.includes(svc.category) || j < 3) {
        services.push({
          id: `service-${i}-${j}`,
          salonId: salon.id,
          name: svc.name,
          slug: slugify(svc.name),
          category: svc.category,
          price: Math.round(svc.price * (salon.priceRange === "luxury" ? 1.5 : salon.priceRange === "budget" ? 0.7 : 1)),
          duration: svc.duration,
          gender: salon.gender,
          isPopular: j === 0,
          isHomeService: salon.homeService && j < 2,
          createdAt: "2024-01-15T00:00:00.000Z",
          updatedAt: "2025-06-01T00:00:00.000Z",
        });
      }
    });
  });
  return services;
}

export const SALONS = generateSalons();
export const REVIEWS = generateReviews(SALONS);
export const SERVICES = generateServices(SALONS);

export function getSalonBySlug(slug: string): Salon | undefined {
  return SALONS.find((s) => s.slug === slug);
}

export function getSalonById(id: string): Salon | undefined {
  return SALONS.find((s) => s.id === id);
}

export function getReviewsForSalon(salonId: string): Review[] {
  return REVIEWS.filter((r) => r.salonId === salonId);
}

export function getServicesForSalon(salonId: string): Service[] {
  return SERVICES.filter((s) => s.salonId === salonId);
}

export function getFeaturedSalons(count = 6): Salon[] {
  return SALONS.filter((s) => s.isFeatured).slice(0, count);
}
