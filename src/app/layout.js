import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "LUMIÈRE | Haute Skincare",
  description: "Consciously formulated in France. Inspired by nature, perfected by science.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-background text-on-surface font-body antialiased flex flex-col">
        <Header />
        <main className="flex-1 pt-20 pb-16 md:pb-0">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
