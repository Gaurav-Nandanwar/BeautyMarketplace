"use client";

import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { GlassCard } from "@/components/ui/glass-card";
import { MUMBAI_LOCALITIES } from "@/constants/localities";
import { SERVICE_CATEGORIES, PRICE_RANGES } from "@/constants/services";
import type { SearchFilters } from "@/types";

interface FilterPanelProps {
  filters: SearchFilters;
  onChange: (filters: SearchFilters) => void;
  onClear: () => void;
}

const SORT_OPTIONS = [
  { value: "distance", label: "Nearest" },
  { value: "rating", label: "Top Rated" },
  { value: "popularity", label: "Most Popular" },
  { value: "price", label: "Price: Low to High" },
] as const;

export function FilterPanel({ filters, onChange, onClear }: FilterPanelProps) {
  function togglePriceRange(range: "budget" | "mid" | "luxury") {
    const current = filters.priceRange ?? [];
    const next = current.includes(range)
      ? current.filter((r) => r !== range)
      : [...current, range];
    onChange({ ...filters, priceRange: next.length ? next : undefined });
  }

  function toggleGender(gender: "unisex" | "women" | "men") {
    const current = filters.gender ?? [];
    const next = current.includes(gender)
      ? current.filter((g) => g !== gender)
      : [...current, gender];
    onChange({ ...filters, gender: next.length ? next : undefined });
  }

  const activeCount = [
    filters.locality,
    filters.priceRange?.length,
    filters.minRating,
    filters.service,
    filters.gender?.length,
    filters.homeService,
    filters.luxury,
  ].filter(Boolean).length;

  return (
    <GlassCard className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="font-semibold">Filters</span>
          {activeCount > 0 && (
            <Badge variant="secondary">{activeCount}</Badge>
          )}
        </div>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            <X className="mr-1 h-3 w-3" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Label>Sort By</Label>
        <div className="flex flex-wrap gap-2">
          {SORT_OPTIONS.map((opt) => (
            <Button
              key={opt.value}
              type="button"
              size="sm"
              variant={filters.sortBy === opt.value || (!filters.sortBy && opt.value === "distance") ? "default" : "outline"}
              className={
                filters.sortBy === opt.value || (!filters.sortBy && opt.value === "distance")
                  ? "gradient-primary border-0"
                  : ""
              }
              onClick={() => onChange({ ...filters, sortBy: opt.value })}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Locality</Label>
        <select
          value={filters.locality ?? ""}
          onChange={(e) =>
            onChange({ ...filters, locality: e.target.value || undefined })
          }
          className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
        >
          <option value="">All Localities</option>
          {MUMBAI_LOCALITIES.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Price Range</Label>
        <div className="space-y-2">
          {PRICE_RANGES.map((range) => (
            <label key={range.value} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={filters.priceRange?.includes(range.value) ?? false}
                onCheckedChange={() => togglePriceRange(range.value)}
              />
              {range.label}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Minimum Rating</Label>
        <select
          value={filters.minRating ?? ""}
          onChange={(e) =>
            onChange({
              ...filters,
              minRating: e.target.value ? Number(e.target.value) : undefined,
            })
          }
          className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
        >
          <option value="">Any Rating</option>
          <option value="4">4+ Stars</option>
          <option value="4.5">4.5+ Stars</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label>Service</Label>
        <select
          value={filters.service ?? ""}
          onChange={(e) =>
            onChange({ ...filters, service: e.target.value || undefined })
          }
          className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
        >
          <option value="">All Services</option>
          {SERVICE_CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label>Gender</Label>
        <div className="space-y-2">
          {(["unisex", "women", "men"] as const).map((g) => (
            <label key={g} className="flex items-center gap-2 text-sm capitalize">
              <Checkbox
                checked={filters.gender?.includes(g) ?? false}
                onCheckedChange={() => toggleGender(g)}
              />
              {g}
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={filters.homeService ?? false}
            onCheckedChange={(checked) =>
              onChange({ ...filters, homeService: checked ? true : undefined })
            }
          />
          Home Service Available
        </label>
        <label className="flex items-center gap-2 text-sm">
          <Checkbox
            checked={filters.luxury ?? false}
            onCheckedChange={(checked) =>
              onChange({ ...filters, luxury: checked ? true : undefined })
            }
          />
          Luxury Salons Only
        </label>
      </div>
    </GlassCard>
  );
}
