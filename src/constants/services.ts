export const SERVICE_CATEGORIES = [
  { id: "haircut", name: "Haircut", slug: "haircut", icon: "Scissors" },
  { id: "hair-spa", name: "Hair Spa", slug: "hair-spa", icon: "Sparkles" },
  { id: "hair-color", name: "Hair Color", slug: "hair-color", icon: "Palette" },
  { id: "bridal-makeup", name: "Bridal Makeup", slug: "bridal-makeup", icon: "Heart" },
  { id: "facial", name: "Facial", slug: "facial", icon: "Smile" },
  { id: "threading", name: "Threading", slug: "threading", icon: "Eye" },
  { id: "waxing", name: "Waxing", slug: "waxing", icon: "Flower2" },
  { id: "nail-art", name: "Nail Art", slug: "nail-art", icon: "Paintbrush" },
  { id: "manicure", name: "Manicure", slug: "manicure", icon: "Hand" },
  { id: "pedicure", name: "Pedicure", slug: "pedicure", icon: "Footprints" },
  { id: "massage", name: "Massage", slug: "massage", icon: "Waves" },
  { id: "beard-styling", name: "Beard Styling", slug: "beard-styling", icon: "User" },
  { id: "shaving", name: "Shaving", slug: "shaving", icon: "Sparkle" },
  { id: "spa", name: "Spa", slug: "spa", icon: "Bath" },
  { id: "skin-treatment", name: "Skin Treatment", slug: "skin-treatment", icon: "Sun" },
  { id: "home-services", name: "Home Services", slug: "home-services", icon: "Home" },
] as const;

export const POPULAR_SERVICES = [
  "Haircut",
  "Facial",
  "Bridal Makeup",
  "Hair Spa",
  "Manicure",
  "Beard Styling",
  "Waxing",
  "Massage",
];

export const OCCASIONS = [
  "Wedding",
  "Party",
  "Interview",
  "Date Night",
  "Festival",
  "Corporate Event",
  "Photoshoot",
  "Everyday",
];

export const PRICE_RANGES = [
  { value: "budget", label: "Budget", max: 500 },
  { value: "mid", label: "Mid-Range", max: 2000 },
  { value: "luxury", label: "Luxury", max: 10000 },
] as const;
