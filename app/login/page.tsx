import Link from "next/link";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Login | Maison Market",
  description: "Login to Maison Market as a customer or business.",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#f8f5ef] px-5 py-8 text-[#1b1b1d] sm:px-8">
      <div className="mx-auto max-w-6xl">
        <nav className="flex items-center justify-between">
          <Link
            className="text-sm font-semibold uppercase tracking-[0.28em]"
            href="/"
          >
            Maison Market
          </Link>
          <Link
            className="rounded-full border border-[#bdb3a2] px-4 py-2 text-sm font-semibold transition hover:border-[#171716] hover:bg-white"
            href="/"
          >
            Back home
          </Link>
        </nav>

        <section className="py-14 lg:py-20">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6b675f]">
              Account access
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight text-[#171716] sm:text-6xl">
              Choose how you want to login.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[#605b52]">
              Customers can manage project searches and shortlists. Businesses
              can manage their services, leads, service areas, and availability.
            </p>
          </div>

          <LoginForm />
        </section>
      </div>
    </main>
  );
}
