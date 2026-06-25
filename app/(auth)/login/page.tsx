import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";
import { GradientBackground } from "@/components/ui/gradient-background";
import { siteConfig } from "@/config/site";

export default function LoginPage() {
  return (
    <GradientBackground>
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <div className="gradient-primary flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-lg">
            <Sparkles className="h-5 w-5" />
          </div>
          <span className="font-heading text-xl font-semibold">{siteConfig.shortName}</span>
        </Link>

        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="font-heading text-2xl">Welcome Back</CardTitle>
            <CardDescription>Sign in to book your next beauty appointment</CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </GradientBackground>
  );
}
