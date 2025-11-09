"use client";
import { useAuth } from "@/context/AuthContext";
import ProductGrid from "@/components/ProductGrid";

export default function VendorDashboard() {
  const { user, logout } = useAuth();

  if (!user) return <p>Loading...</p>; // optional: redirect logic

  return (
    <main className="min-h-screen p-8 bg-green-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary-green">
          Welcome, {user.name}
        </h1>
        <button
          onClick={logout}
          className="bg-primary-green hover:bg-primary-red text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <section>
        <h2 className="text-2xl font-semibold text-primary-green mb-4">
          Your Products
        </h2>
        <ProductGrid />
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-primary-green mb-4">
          Add New Product (placeholder)
        </h2>
        {/* You can later add a form here to upload new product images, name, price etc */}
      </section>
    </main>
  );
}
