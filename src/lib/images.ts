/**
 * Image helpers — no Firebase Storage required.
 * Salon, review, and profile images are stored as URL strings in Firestore.
 */

const SALON_PLACEHOLDERS = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
  "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80",
  "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&q=80",
  "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&q=80",
  "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80",
] as const;

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80";

export function getSalonPlaceholder(index = 0): string {
  return SALON_PLACEHOLDERS[index % SALON_PLACEHOLDERS.length];
}

export function getDefaultAvatarUrl(): string {
  return DEFAULT_AVATAR;
}

export function normalizeImageUrl(url: string): string {
  return url.trim();
}

export function isValidImageUrl(url: string): boolean {
  try {
    const parsed = new URL(url.trim());
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

/** Use when saving salon gallery — falls back to placeholders if URLs are empty. */
export function resolveSalonImages(urls: string[]): string[] {
  const valid = urls.map(normalizeImageUrl).filter(isValidImageUrl);
  if (valid.length > 0) return valid;
  return [getSalonPlaceholder(0), getSalonPlaceholder(1)];
}

/** Profile/review photos: store a URL string directly (paste link or use Google avatar). */
export function resolveProfilePhotoUrl(url?: string | null): string {
  if (url && isValidImageUrl(url)) return normalizeImageUrl(url);
  return getDefaultAvatarUrl();
}
