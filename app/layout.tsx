import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://afterhours-coffee-kitchen.ratman4ik.chatgpt.site"),
  title: "AFTERHOURS — Coffee & Kitchen",
  description: "A fictional late-night coffee and kitchen concept in Dublin.",
  openGraph: {
    title: "AFTERHOURS — Coffee & Kitchen",
    description: "Good coffee. Late nights. A fictional Dublin café concept.",
    images: ["/images/afterhours-hero.webp"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
