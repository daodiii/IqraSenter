import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Iqra Læring og Aktivitetssenter — Læring for hele familien",
    template: "%s | Iqra Senter",
  },
  description:
    "Et trygt og inkluderende fellesskap med læring, fritidsaktiviteter og sosialt samvær for barn, unge og familier i Oslo.",
  keywords: [
    "Iqra",
    "læring",
    "aktivitetssenter",
    "Oslo",
    "helgeskole",
    "fritidsaktiviteter",
    "kurs",
    "fellesskap",
    "barn",
    "unge",
    "familier",
  ],
  openGraph: {
    title: "Iqra Læring og Aktivitetssenter",
    description:
      "Læring, fellesskap og muligheter — for hele familien i Oslo.",
    url: "https://www.iqrasenter.net",
    siteName: "Iqra Senter",
    locale: "nb_NO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <body
        className={`${plusJakarta.variable} ${inter.variable} antialiased`}
      >
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
