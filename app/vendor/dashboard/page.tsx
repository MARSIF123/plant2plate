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
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [user, router]);

  // Load products once user is ready
  useEffect(() => {
    if (user?._id) {
      const vendorProducts = getProductsForVendor(user._id);
      setProducts(vendorProducts || []);
    }
  }, [user, getProductsForVendor]);

  const handleProductAdded = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  if (loading) return <p className="p-8 text-center">Loading...</p>;

  return (
    <main className="min-h-screen p-8 bg-green-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary-green">
          Welcome, {user?.name}
        </h1>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-primary-green mb-4">
          Your Products
        </h2>
        {products.length > 0 ? (
          <ProductEditGrid products={products} setProducts={setProducts} />
        ) : (
          <p className="text-gray-500">You have no products yet.</p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-primary-green mb-4">
          Add New Product
        </h2>
        <AddProductForm
          onProductAdded={handleProductAdded}
          defaultCategoryId="fruits"
        />
      </section>
    </main>
  );
}
