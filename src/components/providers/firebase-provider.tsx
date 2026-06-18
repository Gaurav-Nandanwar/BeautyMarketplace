"use client";

import { useEffect } from "react";
import { isFirebaseConfigured } from "@/lib/firebase/config";
import { initFirebaseAnalytics } from "@/lib/firebase/analytics";

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (isFirebaseConfigured()) {
      void initFirebaseAnalytics();
    }
  }, []);

  return <>{children}</>;
}
