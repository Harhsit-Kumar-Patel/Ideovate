import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ideovate",
  description: "Generate business and college project roadmaps from raw ideas.",
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
