"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  Scissors,
  Sparkles,
  Shield,
  Clock,
  Users,
  Palette,
  Heart,
  Smile,
  Eye,
  Flower2,
  Paintbrush,
  Hand,
  Footprints,
  Waves,
  User,
  Sparkle,
  Bath,
  Sun,
  Home,
} from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GlassCard } from "@/components/ui/glass-card";
import { GradientBackground } from "@/components/ui/gradient-background";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SalonCard } from "@/components/salon/salon-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { defaultCity } from "@/config/cities";
import { SERVICE_CATEGORIES } from "@/constants/services";
import { TESTIMONIALS, LANDING_STATS } from "@/data/testimonials";
import { getFeaturedSalons } from "@/data/salons";

const TRUST_FEATURES = [
  {
    icon: Shield,
    title: "Verified Salons",
    description: "Every listing is reviewed and verified for quality and hygiene.",
  },
  {
    icon: Clock,
    title: "Easy Booking",
    description: "Book appointments in seconds with real-time availability.",
  },
  {
    icon: Users,
    title: "Trusted Reviews",
    description: "Read honest reviews from real customers before you book.",
  },
];

const CATEGORY_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Scissors,
  Sparkles,
  Palette,
  Heart,
  Smile,
  Eye,
  Flower2,
  Paintbrush,
  Hand,
  Footprints,
  Waves,
  User,
  Sparkle,
  Bath,
  Sun,
  Home,
};

function CategoryIcon({ name }: { name: string }) {
  const Icon = CATEGORY_ICONS[name] ?? Scissors;
  return <Icon className="h-5 w-5" />;
}

export default function LandingPage() {
  const featuredSalons = getFeaturedSalons(6);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <GradientBackground className="flex-1">
        {/* Hero */}
        <section className="container mx-auto px-4 py-20 text-center md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl space-y-6"
          >
            <Badge variant="outline" className="mx-auto gap-1">
              <Sparkles className="h-3.5 w-3.5" />
              {defaultCity.name}&apos;s #1 Beauty Marketplace
            </Badge>

            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="gradient-text">{defaultCity.title}</span>
            </h1>

            <p className="text-muted-foreground mx-auto max-w-xl text-lg">
              {siteConfig.tagline}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/home"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gradient-primary border-0 shadow-lg"
                )}
              >
                Explore Salons
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/signup"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                Get Started Free
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-4 md:grid-cols-4"
          >
            {LANDING_STATS.map((stat) => (
              <GlassCard key={stat.label} className="text-center">
                <p className="gradient-text text-2xl font-bold">{stat.value}</p>
                <p className="text-muted-foreground text-sm">{stat.label}</p>
              </GlassCard>
            ))}
          </motion.div>
        </section>

        {/* Categories */}
        <section className="container mx-auto px-4 py-16">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold">Browse by Category</h2>
            <p className="text-muted-foreground mt-2">
              From haircuts to bridal makeup — find the perfect service
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
            {SERVICE_CATEGORIES.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link href={`/home?service=${cat.slug}`}>
                  <GlassCard
                    hover
                    className="flex flex-col items-center gap-2 p-4 text-center"
                  >
                    <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl text-white">
                      <CategoryIcon name={cat.icon} />
                    </div>
                    <span className="text-xs font-medium">{cat.name}</span>
                  </GlassCard>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Salons */}
        <section className="container mx-auto px-4 py-16">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-heading text-3xl font-bold">Featured Salons</h2>
              <p className="text-muted-foreground mt-2">
                Top-rated salons handpicked for you
              </p>
            </div>
            <Link
              href="/home"
              className={cn(buttonVariants({ variant: "ghost" }), "hidden sm:inline-flex")}
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSalons.map((salon) => (
              <SalonCard key={salon.id} salon={salon} />
            ))}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link href="/home" className={buttonVariants({ variant: "outline" })}>
              View All Salons
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Trust Features */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid gap-6 md:grid-cols-3">
            {TRUST_FEATURES.map((feature) => (
              <GlassCard key={feature.title} hover className="text-center">
                <div className="gradient-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="container mx-auto px-4 py-16">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-3xl font-bold">What Our Customers Say</h2>
            <p className="text-muted-foreground mt-2">
              Real stories from people who love BeautyBook
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {TESTIMONIALS.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <GlassCard className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar size="lg">
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>
                        {testimonial.name.split(" ").map((n) => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {testimonial.role} · {testimonial.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-16">
          <GlassCard className="gradient-primary/10 overflow-hidden text-center">
            <div className="relative space-y-4 py-12">
              <h2 className="font-heading text-3xl font-bold">
                Ready to Look Your Best?
              </h2>
              <p className="text-muted-foreground mx-auto max-w-md">
                Join thousands of happy customers discovering the best beauty services in Mumbai.
              </p>
              <Link
                href="/signup"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "gradient-primary border-0 shadow-lg"
                )}
              >
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </GlassCard>
        </section>
      </GradientBackground>

      <Footer />
    </div>
  );
}
