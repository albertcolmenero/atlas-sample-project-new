import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { LandingHero } from "@/components/marketing/landing-hero";
import { LandingPricing } from "@/components/marketing/landing-pricing";
import { LandingFooter } from "@/components/marketing/landing-footer";

export default async function LandingPage() {
  const user = await currentUser();

  if (user) {
    redirect("/features");
  }

  return (
    <div className="min-h-screen bg-white">
      <LandingHero />
      <LandingPricing />
      <LandingFooter />
    </div>
  );
}
