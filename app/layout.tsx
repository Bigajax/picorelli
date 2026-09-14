import type { Metadata } from "next";
import { Cinzel, Manrope } from "next/font/google";
import { site } from "@/data/site.config";
import "./globals.css";

/* A romana da logo (Cinzel) para o nome, a manchete e os títulos, em
   caixa alta e entreletra aberta; a Manrope faz o corpo e os botões. */
const display = Cinzel({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--fonte-display",
  display: "swap",
});

const corpo = Manrope({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--fonte-corpo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Picorelli Premium — Roupas, tênis, perfumes e correntes",
    template: "%s · Picorelli Premium",
  },
  description:
    "Tênis, camisetas, camisas de futebol, perfumes importados e correntes. Você escolhe no site e fecha pelo WhatsApp. Entrega em São Paulo e envio para o Brasil.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Picorelli Premium",
    url: site.url,
    title: "Picorelli Premium — Roupas, tênis, perfumes e correntes",
    description: site.posicionamento,
    images: [{ url: "/og/site.jpg", width: 1200, height: 630, alt: "Picorelli Premium" }],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${corpo.variable} antialiased`}>{children}</body>
    </html>
  );
}
