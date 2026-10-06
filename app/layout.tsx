import type { Metadata } from "next";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vitaloop",
  description: "Detects. Alerts. Guides.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <SmoothScrollProvider />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
