import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lawyer Daily Digest",
  description: "Mock dashboard and Slack digest proof of concept.",
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
