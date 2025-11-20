"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductContext"; // <-- import hook
import type { Product } from "@/context/ProductContext";

interface ProductDetailProps {
  productId: number;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const { cart, addToCart, removeFromCart, changeQuantity } = useCart();
  const { getProductById } = useProducts(); // <-- get from context

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const p = getProductById(productId); // use context instead of prop
    if (p) setProduct(p);
  }, [productId, getProductById]);

  if (!product) return <p className="p-4">Loading product...</p>;

  const quantity = cart[product.id] || 0;

  return (
    <main className="min-h-screen px-6 md:px-20 py-8 mx-auto">
      <img
        src={product.image}
        alt={product.name}
        className="w-[50%] h-64 object-cover rounded-xl mx-auto"
      />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      {product.unit && <p className="text-gray-500">{product.unit}</p>}
      <p className="text-green-700 font-bold text-xl">
        ${product.price.toFixed(2)}
      </p>

      {quantity === 0 ? (
        <button
          onClick={() => addToCart(product.id)}
          className="mt-4 bg-primary-green hover:bg-primary-red text-white py-2 px-4 rounded flex items-center justify-center gap-2"
        >
          Add to Cart
        </button>
      ) : (
        <div className="mt-4 flex items-center gap-3 border border-gray-200 rounded px-3 py-2 w-fit">
          <button
            onClick={() => changeQuantity(product.id, -1)}
            className="px-2 text-lg font-bold"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => changeQuantity(product.id, 1)}
            className="px-2 text-lg font-bold"
          >
            +
          </button>
          <button
            onClick={() => removeFromCart(product.id)}
            className="text-primary-green hover:text-primary-red ml-2"
          >
            Remove
          </button>
        </div>
      )}
    </main>
  );
}
