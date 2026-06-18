import { cn } from "@/lib/utils";

interface GradientBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function GradientBackground({ className, children }: GradientBackgroundProps) {
  return (
    <div className={cn("relative min-h-screen overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-rose-300/30 blur-3xl dark:bg-rose-500/10" />
        <div className="absolute -right-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-purple-300/30 blur-3xl dark:bg-purple-500/10" />
        <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-pink-300/20 blur-3xl dark:bg-pink-500/10" />
      </div>
      {children}
    </div>
  );
}
