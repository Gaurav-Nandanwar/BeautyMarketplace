"use client";

import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SearchBar } from "@/components/salon/search-bar";
import { FilterPanel } from "@/components/salon/filter-panel";
import { SalonCard } from "@/components/salon/salon-card";
import { PageSkeleton } from "@/components/shared/loading-skeletons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SALONS } from "@/data/salons";
import { filterSalons } from "@/lib/salons";
import { defaultCity } from "@/config/cities";
import type { SearchFilters } from "@/types";

export function SalonListingContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilters>({ sortBy: "distance" });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const service = searchParams.get("service");
    if (service) {
      setFilters((prev) => ({ ...prev, service }));
    }
  }, [searchParams]);

  const filteredSalons = useMemo(() => {
    return filterSalons(SALONS, { ...filters, query: query || undefined });
  }, [query, filters]);

  function clearFilters() {
    setFilters({ sortBy: "distance" });
    setQuery("");
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="gradient-primary/5 border-b py-10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto max-w-2xl space-y-4 text-center"
            >
              <h1 className="font-heading text-3xl font-bold md:text-4xl">
                Explore Salons in {defaultCity.name}
              </h1>
              <p className="text-muted-foreground">
                {SALONS.length} salons · Search, filter, and find your perfect match
              </p>
              <SearchBar value={query} onChange={setQuery} />
            </motion.div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 flex items-center justify-between">
            <Badge variant="secondary">{filteredSalons.length} salons found</Badge>
            <Button
              variant="outline"
              size="sm"
              className="lg:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
            <aside className={`${showFilters ? "block" : "hidden"} lg:block`}>
              <div className="sticky top-20">
                <FilterPanel
                  filters={filters}
                  onChange={setFilters}
                  onClear={clearFilters}
                />
              </div>
            </aside>

            {filteredSalons.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-muted-foreground text-lg">No salons match your filters.</p>
                <Button variant="outline" className="mt-4" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredSalons.map((salon, i) => (
                  <motion.div
                    key={salon.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.03, 0.5) }}
                  >
                    <SalonCard salon={salon} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export { PageSkeleton as SalonListingFallback };
