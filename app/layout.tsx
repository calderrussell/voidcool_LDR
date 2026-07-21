import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://voidcool.space"),
  title: "VoidCool | Modular Liquid Droplet Radiators",
  description:
    "VoidCool is developing modular, mass-manufacturable liquid droplet radiators for high-power space infrastructure.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "VoidCool",
    description:
      "Modular liquid droplet radiators for the next generation of sun-powered space infrastructure.",
    url: "https://voidcool.space",
    siteName: "VoidCool",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "VoidCool modular liquid droplet radiators in orbit",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VoidCool",
    description:
      "Modular liquid droplet radiators for high-power space infrastructure.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
