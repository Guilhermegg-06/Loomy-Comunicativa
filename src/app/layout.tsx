import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const spaceGrotesk = localFont({
  src: "../../public/fonts/space-grotesk-latin.woff2",
  variable: "--font-space",
  display: "swap",
  weight: "300 700",
});

export const metadata: Metadata = {
  title: "Loomy | Produção, design e marketing",
  description: "Uma agência alagoana de produção, design e marketing. Conheça o universo criativo da Loomy e vamos conversar sobre sua marca.",
  applicationName: "Loomy",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Loomy | Ideias em movimento",
    description: "Produção, design e marketing com personalidade. De Alagoas para novas conexões.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#111211", colorScheme: "dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={spaceGrotesk.variable}>{children}</body></html>;
}
