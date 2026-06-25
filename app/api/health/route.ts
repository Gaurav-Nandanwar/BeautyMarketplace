import { NextResponse } from "next/server";
import { siteConfig } from "@/config/site";
import { isFirebaseConfigured } from "@/lib/firebase/config";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    app: siteConfig.shortName,
    version: "0.1.0",
    phase: 1,
    firebase: isFirebaseConfigured(),
    timestamp: new Date().toISOString(),
  });
}
