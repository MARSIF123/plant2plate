"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useProducts, Product } from "@/context/ProductContext";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source).url();
}

interface ProductDetailProps {
  slug: string; // use slug instead of ID
}

export default function ProductDetail({ slug }: ProductDetailProps) {
  console.log("ProductDetail received slug:", slug);
  const { cart, addToCart, removeFromCart, changeQuantity } = useCart();
  const { products } = useProducts(); // get all products from context

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const p = products.find((p) => p.slug.current === slug);
    if (p) setProduct(p);
    console.log("Found product:", p);
  }, [slug, products]);

  if (!product) return <p className="p-4">Loading product...</p>;

  const quantity = cart[product._id] || 0;
  const imageUrl = product.image ? urlFor(product.image) : "/placeholder.png";

  return (
    <main className="min-h-screen px-6 md:px-20 py-8 mx-auto">
      <img
        src={imageUrl}
        alt={product.name}
        className="w-[50%] h-64 object-cover rounded-xl mx-auto"
      />

      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>

      {product.inStock !== undefined && (
        <p className="text-gray-500">In stock: {product.inStock}</p>
      )}

      <p className="text-green-700 font-bold text-xl mt-2">
        ${product.price.toFixed(2)}
      </p>

      {quantity === 0 ? (
        <button
          onClick={() => addToCart(product._id)}
          className="mt-4 bg-primary-green hover:bg-primary-red text-white py-2 px-4 rounded flex items-center justify-center gap-2"
        >
          Add to Cart
        </button>
      ) : (
        <div className="mt-4 flex items-center gap-3 border border-gray-200 rounded px-3 py-2 w-fit">
          <button
            onClick={() => changeQuantity(product._id, -1)}
            className="px-2 text-lg font-bold"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => changeQuantity(product._id, 1)}
            className="px-2 text-lg font-bold"
          >
            +
          </button>
          <button
            onClick={() => removeFromCart(product._id)}
            className="text-primary-green hover:text-primary-red ml-2"
          >
            Remove
          </button>
        </div>
      )}

      {product.description && (
        <div className="mt-6 text-gray-700">
          {product.description.map((block, idx) => (
            <p key={idx}>{block.children?.[0]?.text}</p>
          ))}
        </div>
      )}
    </main>
  );
}
