import Image from "next/image";
import Link from "next/link";
import { BriefcaseBusiness, Crown, MapPin, Search, UserRound } from "lucide-react";

const serviceColumns = [
  {
    title: "Design professionals",
    items: [
      ["Interior designers", "interior-designers"],
      ["Architects", "architects"],
      ["Turnkey studios", "turnkey-studios"],
      ["Project consultants", "project-consultants"],
    ],
  },
  {
    title: "Materials and products",
    items: [
      ["Stone and tiles", "stone-and-tiles"],
      ["Lighting", "lighting"],
      ["Hardware", "hardware"],
      ["Wood and surfaces", "wood-and-surfaces"],
    ],
  },
  {
    title: "Skilled workers",
    items: [
      ["Electricians", "electricians"],
      ["POP artists", "pop-artists"],
      ["Carpenters", "carpenters"],
      ["Fabricators", "fabricators"],
    ],
  },
];

export function MarketplaceHeader() {
  return (
    <header className="sticky top-0 z-40 shadow-sm">
      <div className="bg-[#23443d] text-white">
        <div className="mx-auto flex min-h-10 max-w-7xl items-center justify-between gap-4 px-5 text-xs sm:px-8">
          <p className="font-semibold tracking-wide text-white/90">
            India&apos;s curated interior marketplace
          </p>
          <div className="hidden items-center gap-5 text-white/82 sm:flex">
            <Link className="transition hover:text-white" href="/search">
              <MapPin className="mr-1 inline-block size-3.5" />
              Select city
            </Link>
            <Link className="transition hover:text-white" href="/login">
              <BriefcaseBusiness className="mr-1 inline-block size-3.5" />
              List your business
            </Link>
          </div>
        </div>
      </div>

      <nav className="border-b border-[#e5ded2] bg-white text-[#1b1b1d]">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5 sm:px-8">
          <Link className="flex shrink-0 items-center gap-2.5" href="/">
            <span className="relative block size-11 overflow-hidden rounded-sm bg-[#03121b] shadow-sm">
              <Image
                alt="True Designs logo"
                className="object-cover"
                fill
                priority
                sizes="44px"
                src="/true-designs-logo.jpeg"
              />
            </span>
            <span>
              <span className="block text-lg font-semibold tracking-[0.11em] text-[#23443d]">
                TRUE
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.36em] text-[#a67638]">
                Designs
              </span>
            </span>
          </Link>

          <div className="hidden h-full items-center gap-7 text-sm font-semibold lg:flex">
            <Link className="flex h-full items-center transition hover:text-[#a67638]" href="/services/interior-designers">
              Interior designers
            </Link>
            <Link className="flex h-full items-center transition hover:text-[#a67638]" href="/services/architects">
              Architects
            </Link>
            <Link className="flex h-full items-center transition hover:text-[#a67638]" href="/services/material-suppliers">
              Materials
            </Link>
            <Link className="flex h-full items-center transition hover:text-[#a67638]" href="/services/skilled-workers">
              Skilled workers
            </Link>
            <Link
              className="flex h-full items-center gap-1.5 text-[#a67638] transition hover:text-[#79521f]"
              href="/services/featured-listings"
            >
              <Crown className="size-4 fill-[#f0d8a6]" />
              Featured listings
            </Link>

            <div className="group flex h-full items-center">
              <button
                className="flex h-full items-center transition hover:text-[#a67638]"
                type="button"
              >
                Browse services
              </button>
              <div className="pointer-events-none absolute inset-x-0 top-[6.5rem] translate-y-1 border-y border-[#e5ded2] bg-white opacity-0 shadow-xl transition group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-[#eee8de]">
                  {serviceColumns.map((column) => (
                    <div className="p-7" key={column.title}>
                      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#a67638]">
                        {column.title}
                      </p>
                      <div className="mt-4 grid gap-3 text-sm font-medium text-[#554f47]">
                        {column.items.map(([label, slug]) => (
                          <Link className="transition hover:text-[#23443d]" href={`/services/${slug}`} key={slug}>
                            {label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link
              aria-label="Jump to marketplace search"
              className="grid size-10 place-items-center rounded-full text-[#35564d] transition hover:bg-[#eef3ef]"
              href="/search"
              title="Search marketplace"
            >
              <Search className="size-5" />
            </Link>
            <Link
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#23443d] px-4 text-sm font-semibold text-white transition hover:bg-[#182f2a]"
              href="/login"
            >
              <UserRound className="size-4" />
              Login
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
