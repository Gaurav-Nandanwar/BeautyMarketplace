import type { Salon, SearchFilters } from "@/types";
import { calculateDistance } from "@/lib/format";
import { defaultCity } from "@/config/cities";

export function filterSalons(
  salons: Salon[],
  filters: SearchFilters,
  userLat = defaultCity.center.lat,
  userLng = defaultCity.center.lng
): Salon[] {
  let result = [...salons];

  if (filters.query) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.locality.toLowerCase().includes(q) ||
        s.categories.some((c) => c.includes(q)) ||
        s.description.toLowerCase().includes(q)
    );
  }

  if (filters.locality) {
    result = result.filter((s) => s.locality === filters.locality);
  }

  if (filters.priceRange?.length) {
    result = result.filter((s) => filters.priceRange!.includes(s.priceRange));
  }

  if (filters.minRating) {
    result = result.filter((s) => s.rating >= filters.minRating!);
  }

  if (filters.service) {
    result = result.filter((s) => s.categories.includes(filters.service!));
  }

  if (filters.gender?.length) {
    result = result.filter((s) => filters.gender!.includes(s.gender));
  }

  if (filters.homeService) {
    result = result.filter((s) => s.homeService);
  }

  if (filters.luxury) {
    result = result.filter((s) => s.isLuxury);
  }

  switch (filters.sortBy) {
    case "rating":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "popularity":
      result.sort((a, b) => b.bookingCount - a.bookingCount);
      break;
    case "price":
      result.sort((a, b) => {
        const order = { budget: 0, mid: 1, luxury: 2 };
        return order[a.priceRange] - order[b.priceRange];
      });
      break;
    case "distance":
    default:
      result.sort(
        (a, b) =>
          calculateDistance(userLat, userLng, a.lat, a.lng) -
          calculateDistance(userLat, userLng, b.lat, b.lng)
      );
      break;
  }

  return result;
}

export function getPriceRangeLabel(range: Salon["priceRange"]): string {
  switch (range) {
    case "budget":
      return "Budget";
    case "mid":
      return "Mid-Range";
    case "luxury":
      return "Luxury";
  }
}
