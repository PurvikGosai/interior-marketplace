import Link from "next/link";
import { X } from "lucide-react";
import { SearchExplorer } from "./SearchExplorer";

export const metadata = {
  title: "Search | True Designs",
  description: "Search interior designers, architects, materials, and skilled workers.",
};

export default function SearchPage() {
  return (
    <main className="relative min-h-screen bg-white px-5 py-8 text-[#1b1b1d] sm:px-8">
      <Link
        aria-label="Close search"
        className="grid size-11 place-items-center rounded-full text-[#70695f] transition hover:bg-[#f5f1eb] hover:text-[#171716]"
        href="/"
        title="Close search"
      >
        <X className="size-7" />
      </Link>

      <section className="mx-auto max-w-5xl pt-10 sm:pt-14">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#a67638]">
            True Designs marketplace
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Everything you need to create your dream space.
          </h1>
          <p className="mt-2 text-lg text-[#605b52]">
            Search professionals, materials, skilled workers, portfolios, and cities.
          </p>
        </div>

        <div className="mt-8">
          <SearchExplorer />
        </div>
      </section>

      <div className="absolute inset-x-0 bottom-10 text-center">
        <p className="text-lg font-semibold uppercase tracking-[0.22em] text-[#23443d]">
          True Designs
        </p>
        <p className="mt-2 text-sm text-[#8a8277]">
          India&apos;s curated interior marketplace.
        </p>
      </div>
    </main>
  );
}
