import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LNX - AI Artist",
  description: "AI Artist specializing in advanced post-production and workflow solutions for premium brands. São Paulo, Brazil.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
