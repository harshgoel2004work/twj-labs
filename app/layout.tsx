import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "Best Web Development Agency | TWJ Labs",
    template: "%s | TWJ Labs",
  },
  description: "We provide top-notch web development services tailored to your business needs.",
  twitter: {
    card: "summary_large_image"
  },
  publisher: "The Walking Jumbo",
  keywords: [
    "web development",
    "web design",
    "frontend development",
    "backend development",
    "full-stack development",
    "e-commerce solutions",
    "custom web applications",
    "responsive design",
    "SEO optimization",
    "digital marketing",
    "web development agency in india",
    "best web development company",
    "website maintenance",
    "UI/UX design",
    "mobile app development",
  ],
  openGraph:{
    description: "We provide top-notch web development services tailored to your business needs.",
    title: "Best Web Development Agency | TWJ Labs",
    siteName: "TWJ Labs",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
