/** Root layout: sets global metadata + wraps the app with smooth-scroll provider. */
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Modi Hospital — Palanpur",
    template: "%s — Modi Hospital",
  },
  description:
    "Modi Hospital in Palanpur, Gujarat — Orthopaedics and patient-first care by Dr. Milankumar Ratilal Modi and Dr. Nilam Modi.",
  // Why: avoids hard-coding a production domain; works in local dev by default.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  applicationName: "Modi Hospital",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Modi Hospital — Palanpur",
    description:
      "Open 24 hours • Near Aroma Circle, Highway, Palanpur, Gujarat 385001 • +91 98259 65458",
    type: "website",
  },
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
