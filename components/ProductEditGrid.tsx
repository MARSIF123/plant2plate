"use client";

import { useState } from "react";
import { Product, useProducts } from "@/context/ProductContext";
import { FaTrash } from "react-icons/fa";
import { urlFor } from "@/lib/sanity"; // Sanity image helper

type ProductEditGridProps = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export default function ProductEditGrid({
  products,
  setProducts,
}: ProductEditGridProps) {
  const { addProduct, updateProduct, deleteProduct } = useProducts();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>({});

  const startEditing = (product: Product) => {
    setEditingId(product._id);
    setEditedProduct({ ...product });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedProduct({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedProduct({
      ...editedProduct,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const saveProduct = async () => {
    if (!editingId) return;

    try {
      const updated = await updateProduct(editingId, editedProduct);
      setProducts((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
      cancelEditing();
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting product");
    }
  };

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto p-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-2"
        >
          {editingId === product._id ? (
            <>
              <input
                type="text"
                name="name"
                value={editedProduct.name || ""}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
                placeholder="Product Name"
              />
              <input
                type="number"
                name="price"
                value={editedProduct.price || ""}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
                placeholder="Price"
              />
              <input
                type="text"
                name="image"
                value={
                  editedProduct.image
                    ? editedProduct.image.asset?._ref || ""
                    : ""
                }
                onChange={handleChange}
                className="border px-2 py-1 rounded"
                placeholder="Image _ref"
              />
              <div className="flex gap-2 mt-2">
                <button
                  onClick={saveProduct}
                  className="bg-green-600 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="bg-gray-400 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <img
                src={product.image ? urlFor(product.image) : "/placeholder.png"}
                alt={product.name}
                className="w-full h-32 object-cover rounded"
              />
              <h3 className="font-semibold">{product.name}</h3>
              <p>${product.price.toFixed(2)}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => startEditing(product)}
                  className="bg-blue-600 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
