import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/context/CartContext";

const font = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title:
    "Junk Removal | Santa Clarita • Los Angeles • Antelope • Orange County | Goodbye Junk",
  description:
    "Same-day junk removal made easy. Goodbye Junk offers fast, affordable, and friendly service across Southern California. Call, text, or upload photos 24/7 for your free quote!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
