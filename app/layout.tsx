import type { Metadata } from "next";
import "./globals.css";

const isProduction = process.env.NODE_ENV === "production";
const siteUrl = isProduction
  ? "https://ratman4ik.github.io/afterhours-cafe/"
  : "http://localhost:3000/";
const imageUrl = isProduction
  ? "https://ratman4ik.github.io/afterhours-cafe/images/afterhours-hero.webp"
  : "http://localhost:3000/images/afterhours-hero.webp";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AFTERHOURS — Coffee & Kitchen",
  description: "A fictional late-night coffee and kitchen concept in Dublin.",
  openGraph: {
    title: "AFTERHOURS — Coffee & Kitchen",
    description: "Good coffee. Late nights. A fictional Dublin café concept.",
    url: siteUrl,
    images: [imageUrl],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
