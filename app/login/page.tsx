import { MarketplaceHeader } from "@/app/components/MarketplaceHeader";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Login | True Designs",
  description: "Login to True Designs as a customer or business.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#1b1b1d]">
      <MarketplaceHeader />
      <section className="bg-[#1e312d] px-5 py-10 text-white sm:px-8">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#d4b27a]">
            True Designs account
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
            Sign in and manage your interior journey.
          </h1>
          <p className="mt-3 max-w-3xl leading-7 text-white/72">
            Customers can manage project searches and shortlists. Businesses
            can manage services, leads, service areas, and availability.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:py-14">
        <LoginForm />
      </section>
    </main>
  );
}
