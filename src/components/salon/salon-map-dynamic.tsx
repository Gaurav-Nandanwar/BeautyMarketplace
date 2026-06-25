"use client";

import dynamic from "next/dynamic";

const SalonMapInner = dynamic(
  () => import("./salon-map").then((m) => m.SalonMap),
  {
    ssr: false,
    loading: () => (
      <div className="bg-muted h-64 animate-pulse rounded-2xl md:h-80" />
    ),
  }
);

interface SalonMapDynamicProps {
  lat: number;
  lng: number;
  name: string;
}

export function SalonMapDynamic(props: SalonMapDynamicProps) {
  return <SalonMapInner {...props} />;
}
