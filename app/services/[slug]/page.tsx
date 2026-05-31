import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Crown, MapPin, Star } from "lucide-react";
import { MarketplaceHeader } from "@/app/components/MarketplaceHeader";
import {
  allServices,
  featuredService,
  getService,
  portfolioProjects,
  primaryServices,
  workerCategories,
} from "@/app/data/marketplace";

const listingNames = [
  "Aaranya Atelier",
  "Studio Vistara",
  "Nivasa Design House",
  "Casa Mehr Studio",
  "Lumen & Lime Interiors",
  "Axis Courtyard Works",
];

const listingCities = [
  "Mumbai",
  "Bengaluru",
  "Delhi NCR",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
];

const listingImages = [
  "/marketplace/interior-living.png",
  "/marketplace/portfolio-kitchen.png",
  "/marketplace/portfolio-bedroom.png",
  "/marketplace/material-library.png",
  "/marketplace/portfolio-bath.png",
  "/marketplace/skilled-worker.png",
];

const workerRoutes: Record<string, string> = {
  Carpenters: "carpenters",
  Electricians: "electricians",
  Fabricators: "fabricators",
  "POP artists": "pop-artists",
};

export function generateStaticParams() {
  return allServices.map((service) => ({ slug: service.slug }));
}

export default async function ServicePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ city?: string }>;
}) {
  const { slug } = await params;
  const { city } = await searchParams;
  const service = getService(slug);

  if (!service) {
    notFound();
  }

  const isFeatured = service.slug === featuredService.slug;

  return (
    <main className="min-h-screen bg-[#f8f5ef] text-[#1b1b1d]">
      <MarketplaceHeader />

      <section className="relative min-h-[360px] overflow-hidden text-white">
        <Image
          alt={service.title}
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src={service.image}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,29,26,0.92)_0%,rgba(16,29,26,0.67)_52%,rgba(16,29,26,0.22)_100%)]" />
        <div className="relative mx-auto flex min-h-[360px] max-w-7xl items-end px-5 py-12 sm:px-8">
          <div className="max-w-3xl">
            <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#e0c38e]">
              {isFeatured ? <Crown className="size-5 fill-[#e0c38e]" /> : null}
              {service.eyebrow}
            </p>
            <h1 className="mt-3 text-5xl font-semibold sm:text-6xl">
              {service.title}
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/84">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#e5ded2] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-5 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                className="rounded-full border border-[#d8cbb8] bg-[#fbfaf7] px-3 py-2 text-sm text-[#554f47]"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="flex items-center gap-2 text-sm font-semibold text-[#35564d]">
            <MapPin className="size-4" />
            Showing results for {city || "All India"}
          </p>
        </div>
      </section>

      {service.slug === "skilled-workers" ? (
        <section className="border-b border-[#e5ded2] bg-[#fbfaf7] px-5 py-14 sm:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a67638]">
              Worker categories
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              Choose the skilled worker your site needs
            </h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {workerCategories.map((worker, index) => (
                <Link
                  className="group overflow-hidden rounded-lg border border-[#e5ded2] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  href={`/services/${workerRoutes[worker] ?? "skilled-workers"}?worker=${encodeURIComponent(worker)}`}
                  key={worker}
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      alt={worker}
                      className="object-cover transition duration-500 group-hover:scale-105"
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      src={index % 3 === 0 ? "/marketplace/skilled-worker.png" : index % 3 === 1 ? "/marketplace/portfolio-kitchen.png" : "/marketplace/portfolio-bedroom.png"}
                    />
                  </div>
                  <p className="p-4 text-base font-semibold">{worker}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a67638]">
              Curated listings
            </p>
            <h2 className="mt-2 text-3xl font-semibold">
              Explore trusted {service.title.toLowerCase()}
            </h2>
          </div>
          <Link className="text-sm font-semibold text-[#35564d]" href="/search">
            Change your search
          </Link>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {listingNames.map((name, index) => (
            <article
              className="overflow-hidden rounded-lg border border-[#e5ded2] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              key={name}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  alt={`${name} portfolio`}
                  className="object-cover"
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  src={listingImages[index]}
                />
                {index < 2 ? (
                  <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[#a67638] px-3 py-1.5 text-xs font-semibold text-white">
                    <Crown className="size-3.5 fill-white" />
                    Featured
                  </span>
                ) : null}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold">{name}</h3>
                  <span className="flex items-center gap-1 rounded-full bg-[#eef3ef] px-2.5 py-1 text-xs font-semibold text-[#35564d]">
                    <Star className="size-3.5 fill-[#a67638] text-[#a67638]" />
                    {(4.7 + (index % 3) / 10).toFixed(1)}
                  </span>
                </div>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-[#70695f]">
                  <MapPin className="size-4" />
                  {city || listingCities[index]}
                </p>
                <p className="mt-4 text-sm leading-6 text-[#605b52]">
                  Complete profile, portfolio images, service details, and
                  enquiry support for your project.
                </p>
                <button
                  className="mt-5 w-full rounded-full bg-[#23443d] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#182f2a]"
                  type="button"
                >
                  View profile
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-white px-5 py-14 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a67638]">
            Real portfolio work
          </p>
          <h2 className="mt-2 text-3xl font-semibold">
            Finished spaces from the marketplace
          </h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {portfolioProjects.map((project) => (
              <article
                className="overflow-hidden rounded-lg border border-[#e5ded2] bg-[#fbfaf7]"
                key={project.title}
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    alt={project.title}
                    className="object-cover"
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    src={project.image}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-2 text-sm text-[#70695f]">
                    {project.studio} | {project.location}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#a67638]">
          More services
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          {primaryServices
            .filter((item) => item.slug !== service.slug)
            .map((item) => (
              <Link
                className="rounded-full border border-[#d8cbb8] bg-white px-4 py-3 text-sm font-semibold text-[#35564d] transition hover:border-[#35564d]"
                href={`/services/${item.slug}`}
                key={item.slug}
              >
                {item.title}
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
