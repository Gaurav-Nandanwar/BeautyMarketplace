import { Star, BadgeCheck, ThumbsUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { formatRelativeTime } from "@/lib/format";
import type { Review } from "@/types";

interface ReviewListProps {
  reviews: Review[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className="text-muted-foreground py-8 text-center text-sm">
        No reviews yet. Be the first to review!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <GlassCard key={review.id} className="space-y-3">
          <div className="flex items-start gap-3">
            <Avatar>
              <AvatarImage src={review.customerPhoto} />
              <AvatarFallback>
                {review.customerName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium">{review.customerName}</span>
                {review.isVerified && (
                  <Badge variant="secondary" className="gap-1 text-xs">
                    <BadgeCheck className="h-3 w-3" />
                    Verified
                  </Badge>
                )}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-muted-foreground text-xs">
                  {formatRelativeTime(review.createdAt)}
                </span>
              </div>
            </div>
          </div>
          <p className="text-sm leading-relaxed">{review.comment}</p>
          {review.helpfulVotes > 0 && (
            <div className="text-muted-foreground flex items-center gap-1 text-xs">
              <ThumbsUp className="h-3 w-3" />
              {review.helpfulVotes} found this helpful
            </div>
          )}
        </GlassCard>
      ))}
    </div>
  );
}
