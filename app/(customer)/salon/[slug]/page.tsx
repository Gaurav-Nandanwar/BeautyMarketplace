import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Star,
  Clock,
  Home,
  BadgeCheck,
  ArrowLeft,
  Calendar,
} from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SalonGallery } from "@/components/salon/salon-gallery";
import { ReviewList } from "@/components/salon/review-list";
import { SalonMapDynamic } from "@/components/salon/salon-map-dynamic";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { formatCurrency, formatRating } from "@/lib/format";
import { getPriceRangeLabel } from "@/lib/salons";
import {
  getSalonBySlug,
  getReviewsForSalon,
  getServicesForSalon,
} from "@/data/salons";

interface SalonDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function SalonDetailPage({ params }: SalonDetailPageProps) {
  const { slug } = await params;
  const salon = getSalonBySlug(slug);

  if (!salon) notFound();

  const reviews = getReviewsForSalon(salon.id);
  const services = getServicesForSalon(salon.id);

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/home"
            className="text-muted-foreground mb-6 inline-flex items-center gap-1 text-sm hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Salons
          </Link>

          <SalonGallery images={salon.images} name={salon.name} />

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="space-y-8">
              <div>
                <div className="flex flex-wrap items-start gap-3">
                  <h1 className="font-heading text-3xl font-bold">{salon.name}</h1>
                  {salon.isVerified && (
                    <Badge variant="secondary" className="gap-1">
                      <BadgeCheck className="h-3.5 w-3.5" />
                      Verified
                    </Badge>
                  )}
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    <span className="text-lg font-semibold">{formatRating(salon.rating)}</span>
                    <span className="text-muted-foreground">({salon.reviewCount} reviews)</span>
                  </div>
                  <span className="text-muted-foreground flex items-center gap-1 text-sm">
                    <MapPin className="h-4 w-4" />
                    {salon.locality}, Mumbai
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline">{getPriceRangeLabel(salon.priceRange)}</Badge>
                  <Badge variant="outline" className="capitalize">{salon.gender}</Badge>
                  {salon.homeService && (
                    <Badge variant="outline" className="gap-1">
                      <Home className="h-3 w-3" />
                      Home Service
                    </Badge>
                  )}
                  {salon.isLuxury && <Badge className="gradient-primary border-0">Luxury</Badge>}
                </div>

                <p className="text-muted-foreground mt-4 leading-relaxed">{salon.description}</p>
              </div>

              <section>
                <h2 className="mb-4 text-xl font-semibold">Services & Pricing</h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {services.map((service) => (
                    <GlassCard key={service.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-muted-foreground text-sm">{service.duration} min</p>
                      </div>
                      <p className="font-semibold">{formatCurrency(service.price)}</p>
                    </GlassCard>
                  ))}
                </div>
              </section>

              {salon.amenities && salon.amenities.length > 0 && (
                <section>
                  <h2 className="mb-4 text-xl font-semibold">Amenities</h2>
                  <div className="flex flex-wrap gap-2">
                    {salon.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </section>
              )}

              <section>
                <h2 className="mb-4 text-xl font-semibold">Reviews</h2>
                <ReviewList reviews={reviews} />
              </section>

              <section>
                <h2 className="mb-4 text-xl font-semibold">Location</h2>
                <p className="text-muted-foreground mb-3 text-sm">{salon.address}</p>
                <SalonMapDynamic lat={salon.lat} lng={salon.lng} name={salon.name} />
              </section>
            </div>

            <aside className="space-y-4">
              <GlassCard className="sticky top-20 space-y-4">
                <Link
                  href="/login"
                  className={cn(buttonVariants({ size: "lg" }), "gradient-primary w-full border-0")}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                </Link>

                <Separator />

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone className="text-muted-foreground h-4 w-4" />
                    <a href={`tel:${salon.phone}`} className="hover:underline">
                      {salon.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
                    <span>{salon.address}</span>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-semibold">
                    <Clock className="h-4 w-4" />
                    Opening Hours
                  </h3>
                  <div className="space-y-1.5 text-sm">
                    {days.map((day) => {
                      const hours = salon.openingHours[day];
                      return (
                        <div key={day} className="flex justify-between capitalize">
                          <span className="text-muted-foreground">{day}</span>
                          <span>
                            {hours?.closed
                              ? "Closed"
                              : `${hours?.open ?? "10:00"} – ${hours?.close ?? "20:00"}`}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </GlassCard>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
