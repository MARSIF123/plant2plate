"use client";

import { useAuth } from "@/context/AuthContext";
import { useProducts, Product } from "@/context/ProductContext";
import { useState, useEffect } from "react";
import ProductEditGrid from "@/components/ProductEditGrid";
import AddProductForm from "@/components/AddProductForm";
import { useRouter } from "next/navigation";

export default function VendorDashboard() {
  const { user, logout } = useAuth();
  const { getProductsForVendor } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  useEffect(() => {
    if (user) {
      const vendorProducts = getProductsForVendor(user.id);
      setProducts(vendorProducts);
    }
  }, [user, getProductsForVendor]);

  const handleProductAdded = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  return (
    <main className="min-h-screen p-8 bg-green-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary-green">
          Welcome, {user?.name}
        </h1>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-primary-green mb-4">
          Your Products (Editable)
        </h2>
        <ProductEditGrid products={products} setProducts={setProducts} />
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-primary-green mb-4">
          Add New Product
        </h2>
        <AddProductForm onProductAdded={handleProductAdded} />
      </section>
    </main>
  );
}
