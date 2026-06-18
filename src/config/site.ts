export const siteConfig = {
  name: "Mumbai Beauty Marketplace",
  shortName: "BeautyBook",
  tagline: "Discover, Compare and Book the Best Beauty Services Near You.",
  description:
    "AI-powered beauty salon marketplace. Find top-rated salons, book appointments, and get personalized recommendations.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  defaultCity: "Mumbai",
  defaultLocale: "en-IN",
  currency: "INR",
  currencySymbol: "₹",
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  contact: {
    email: "hello@beautybook.in",
    phone: "+91 98765 43210",
  },
} as const;

export type SiteConfig = typeof siteConfig;
