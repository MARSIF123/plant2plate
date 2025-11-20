import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ProductProvider } from "@/context/ProductContext";
import { VendorProvider } from "@/context/VendorContext";

const font = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlantToPlate | Fresh Local Produce",
  description:
    "Connect directly with local farmers and enjoy fresh, sustainable, and nutrient-rich products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <AuthProvider>
          <ProductProvider>
            <VendorProvider>
              <CartProvider>
                <Header />
                {children}
                <Footer />
              </CartProvider>
            </VendorProvider>
          </ProductProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
