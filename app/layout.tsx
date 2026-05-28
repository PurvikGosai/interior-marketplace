import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maison Market | Premium Interior Marketplace",
  description:
    "A curated marketplace for interior studios, luxury furniture, architectural lighting, and trade-ready materials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
