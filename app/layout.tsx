import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Social Agent",
  description: "A Solana-native editorial copilot for X.",
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
