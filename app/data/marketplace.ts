export type ServiceSlug =
  | "interior-designers"
  | "architects"
  | "material-suppliers"
  | "skilled-workers"
  | "featured-listings"
  | "turnkey-studios"
  | "project-consultants"
  | "stone-and-tiles"
  | "lighting"
  | "hardware"
  | "wood-and-surfaces"
  | "electricians"
  | "pop-artists"
  | "carpenters"
  | "fabricators";

export type MarketplaceService = {
  slug: ServiceSlug;
  title: string;
  eyebrow: string;
  description: string;
  image: string;
  tags: string[];
};

export const primaryServices: MarketplaceService[] = [
  {
    slug: "interior-designers",
    title: "Interior Designers",
    eyebrow: "Design professionals",
    description:
      "Browse studios for apartment interiors, renovations, kitchens, wardrobes, and complete home styling.",
    image: "/marketplace/interior-living.png",
    tags: ["Turnkey homes", "Renovation", "Space planning"],
  },
  {
    slug: "architects",
    title: "Architects",
    eyebrow: "Planning and drawings",
    description:
      "Find architects for layouts, approvals, facades, BOQs, and execution-ready technical documentation.",
    image: "/marketplace/architect-studio.png",
    tags: ["Floor plans", "Approvals", "Working drawings"],
  },
  {
    slug: "material-suppliers",
    title: "Material Suppliers",
    eyebrow: "Products and finishes",
    description:
      "Source stone, tiles, lighting, hardware, wood surfaces, and trade-ready interior materials.",
    image: "/marketplace/material-library.png",
    tags: ["Stone and tiles", "Hardware", "Lighting"],
  },
  {
    slug: "skilled-workers",
    title: "Skilled Workers",
    eyebrow: "Site execution",
    description:
      "Connect with electricians, POP artists, carpenters, painters, fabricators, and specialist teams.",
    image: "/marketplace/skilled-worker.png",
    tags: ["Electricians", "POP artists", "Fabricators"],
  },
];

export const secondaryServices: MarketplaceService[] = [
  {
    slug: "turnkey-studios",
    title: "Turnkey Studios",
    eyebrow: "Design and build",
    description: "One team for concepts, sourcing, site management, and handover.",
    image: "/marketplace/portfolio-kitchen.png",
    tags: ["Full home", "Project management", "Handover"],
  },
  {
    slug: "project-consultants",
    title: "Project Consultants",
    eyebrow: "Independent guidance",
    description: "Specialists for budgets, BOQs, vendor comparisons, and execution planning.",
    image: "/marketplace/architect-studio.png",
    tags: ["Budget review", "BOQs", "Vendor review"],
  },
  {
    slug: "stone-and-tiles",
    title: "Stone and Tiles",
    eyebrow: "Material category",
    description: "Explore marble, granite, quartz, porcelain, mosaics, and cladding.",
    image: "/marketplace/material-library.png",
    tags: ["Natural stone", "Tiles", "Cladding"],
  },
  {
    slug: "lighting",
    title: "Lighting",
    eyebrow: "Material category",
    description: "Discover architectural, decorative, profile, and smart lighting suppliers.",
    image: "/interior-marketplace-hero.png",
    tags: ["Pendant lights", "Profiles", "Smart lighting"],
  },
  {
    slug: "hardware",
    title: "Hardware",
    eyebrow: "Material category",
    description: "Find handles, hinges, locks, wardrobe systems, and premium fittings.",
    image: "/marketplace/material-library.png",
    tags: ["Handles", "Hinges", "Fittings"],
  },
  {
    slug: "wood-and-surfaces",
    title: "Wood and Surfaces",
    eyebrow: "Material category",
    description: "Browse plywood, veneers, laminates, fluted panels, and wall finishes.",
    image: "/marketplace/portfolio-bedroom.png",
    tags: ["Veneer", "Laminates", "Wall panels"],
  },
  {
    slug: "electricians",
    title: "Electricians",
    eyebrow: "Skilled workers",
    description: "Hire workers for wiring, lighting installation, repairs, and smart-home prep.",
    image: "/marketplace/skilled-worker.png",
    tags: ["Wiring", "Lighting", "Smart home"],
  },
  {
    slug: "pop-artists",
    title: "POP Artists",
    eyebrow: "Skilled workers",
    description: "Find teams for ceiling details, mouldings, wall features, and finishing.",
    image: "/marketplace/portfolio-bedroom.png",
    tags: ["False ceiling", "Mouldings", "Wall details"],
  },
  {
    slug: "carpenters",
    title: "Carpenters",
    eyebrow: "Skilled workers",
    description: "Connect with carpenters for furniture, wardrobes, kitchens, and site joinery.",
    image: "/marketplace/portfolio-kitchen.png",
    tags: ["Wardrobes", "Kitchens", "Furniture"],
  },
  {
    slug: "fabricators",
    title: "Fabricators",
    eyebrow: "Skilled workers",
    description: "Hire fabrication teams for partitions, railings, frames, and custom metalwork.",
    image: "/marketplace/skilled-worker.png",
    tags: ["Metalwork", "Partitions", "Railings"],
  },
];

export const featuredService: MarketplaceService = {
  slug: "featured-listings",
  title: "Featured Listings",
  eyebrow: "True Select",
  description:
    "Discover highly visible studios, suppliers, and execution teams selected for exceptional work and complete profiles.",
  image: "/marketplace/interior-living.png",
  tags: ["True Select", "Complete portfolios", "Popular profiles"],
};

export const allServices = [
  ...primaryServices,
  ...secondaryServices,
  featuredService,
];

export const portfolioProjects = [
  {
    title: "A calm city kitchen",
    location: "Bengaluru",
    studio: "Studio Vistara",
    image: "/marketplace/portfolio-kitchen.png",
  },
  {
    title: "Soft layers for a restful bedroom",
    location: "Mumbai",
    studio: "Aaranya Atelier",
    image: "/marketplace/portfolio-bedroom.png",
  },
  {
    title: "Stone, light, and a quieter bath",
    location: "Hyderabad",
    studio: "Casa Mehr Studio",
    image: "/marketplace/portfolio-bath.png",
  },
];

export const workerCategories = [
  "Electricians",
  "POP artists",
  "Wall artists",
  "Painters",
  "Carpenters",
  "Plumbers",
  "Tiles and stone masons",
  "Marble polishers",
  "Texture painters",
  "AC installers",
  "Smart home technicians",
  "CCTV installers",
  "Lining Works",
  "Fabricators",
  "Waterproofing teams",
  "Wooden flooring installers",
  "Epoxy flooring teams",
  "Core cutting workers",
  "Pest control technicians",
  "Solar panel installers",
];

export function getService(slug: string) {
  return allServices.find((service) => service.slug === slug);
}
