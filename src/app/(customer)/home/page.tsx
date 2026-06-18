import { Suspense } from "react";
import {
  SalonListingContent,
  SalonListingFallback,
} from "./salon-listing-content";

export default function SalonListingPage() {
  return (
    <Suspense fallback={<SalonListingFallback />}>
      <SalonListingContent />
    </Suspense>
  );
}
