import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LNX - Portfólio",
  description: "Portfólio profissional de LNX",
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
