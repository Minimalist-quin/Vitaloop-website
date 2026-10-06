import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import "./globals.css";

/**
 * Cross-platform face behind the Apple stack in --font-sans, since
 * SF Pro Rounded can't be served as a webfont under Apple's license.
 * This is what Chrome and non-Apple platforms actually render.
 */
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Vitaloop",
  description: "Detects. Alerts. Guides.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SmoothScrollProvider />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
