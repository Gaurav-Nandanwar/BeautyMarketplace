"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { FirebaseProvider } from "@/components/providers/firebase-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FirebaseProvider>
          {children}
          <Toaster richColors position="top-center" closeButton />
        </FirebaseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
