import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import "./globals.css";

/**
 * Cross-platform stand-in for SF Pro Rounded, which can't be served as a
 * webfont under Apple's license. Sits behind the Apple stack in
 * --font-sans, so Apple devices get the real thing and everyone else
 * gets a rounded face rather than falling back to a flat system sans.
 */
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Vitaloop",
  description: "Detects. Alerts. Guides.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${nunito.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SmoothScrollProvider />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
