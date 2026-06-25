import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import { siteConfig } from "@/config/site";
import { defaultCity } from "@/config/cities";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto grid gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-heading text-lg font-semibold">{siteConfig.shortName}</p>
          <p className="text-muted-foreground mt-2 text-sm">{siteConfig.tagline}</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold">Quick Links</p>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link href="/home" className="text-muted-foreground hover:text-foreground">
              Explore Salons
            </Link>
            <Link href="/login" className="text-muted-foreground hover:text-foreground">
              Sign In
            </Link>
            <Link href="/signup" className="text-muted-foreground hover:text-foreground">
              Create Account
            </Link>
          </nav>
        </div>

        <div>
          <p className="mb-3 text-sm font-semibold">Contact</p>
          <div className="text-muted-foreground flex flex-col gap-2 text-sm">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              {defaultCity.name}, India
            </span>
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              {siteConfig.contact.email}
            </span>
            <span className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              {siteConfig.contact.phone}
            </span>
          </div>
        </div>
      </div>

      <div className="text-muted-foreground border-t py-4 text-center text-xs">
        © {new Date().getFullYear()} {siteConfig.shortName}. All rights reserved.
      </div>
    </footer>
  );
}
