import Link from "next/link";
import Image from "next/image";
import { MapPin, Star, Home, BadgeCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { formatRating } from "@/lib/format";
import { getPriceRangeLabel } from "@/lib/salons";
import type { Salon } from "@/types";

interface SalonCardProps {
  salon: Salon;
}

export function SalonCard({ salon }: SalonCardProps) {
  return (
    <Link href={`/salon/${salon.slug}`}>
      <GlassCard hover className="group h-full overflow-hidden p-0">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={salon.coverImage}
            alt={salon.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {salon.isFeatured && (
            <Badge className="gradient-primary absolute top-3 left-3 border-0">
              Featured
            </Badge>
          )}
          {salon.isVerified && (
            <Badge variant="secondary" className="absolute top-3 right-3 gap-1">
              <BadgeCheck className="h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>

        <div className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-1 font-semibold">{salon.name}</h3>
            <div className="flex shrink-0 items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-medium">{formatRating(salon.rating)}</span>
              <span className="text-muted-foreground">({salon.reviewCount})</span>
            </div>
          </div>

          <p className="text-muted-foreground flex items-center gap-1 text-sm">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            {salon.locality}, Mumbai
          </p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            <Badge variant="outline" className="text-xs">
              {getPriceRangeLabel(salon.priceRange)}
            </Badge>
            <Badge variant="outline" className="text-xs capitalize">
              {salon.gender}
            </Badge>
            {salon.homeService && (
              <Badge variant="outline" className="gap-1 text-xs">
                <Home className="h-3 w-3" />
                Home Service
              </Badge>
            )}
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
