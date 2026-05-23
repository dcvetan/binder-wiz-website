import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "BinderWiz — The #1 Pokémon TCG App for Card Prices, Portfolio & Color Matching",
    template: "%s | BinderWiz",
  },
  description:
    "Track Pokémon card prices from TCGPlayer & Cardmarket, build your portfolio, manage graded cards (PSA+), and find perfect cards with AI color matching. The ultimate Pokémon TCG app.",
  openGraph: {
    title: "BinderWiz — The #1 Pokémon TCG App",
    description:
      "Track Pokémon card prices, build your portfolio, manage graded cards, and find perfect cards with AI color matching.",
    type: "website",
    locale: "en_US",
    siteName: "BinderWiz",
  },
  twitter: {
    card: "summary_large_image",
    title: "BinderWiz — The #1 Pokémon TCG App",
    description:
      "Track Pokémon card prices, build your portfolio, manage graded cards, and find perfect cards with AI color matching.",
  },
  keywords: [
    "Pokemon TCG App",
    "Pokemon Card Prices",
    "Pokemon Portfolio",
    "TCG App",
    "Card Color Matching",
    "Pokemon binder",
    "TCGPlayer",
    "Cardmarket",
    "PSA graded cards",
    "Pokemon collection tracker",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
