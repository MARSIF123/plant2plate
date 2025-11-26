"use client";

import { FaTrash, FaShoppingCart } from "react-icons/fa";
import { HiHeart } from "react-icons/hi2";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { Product } from "@/context/ProductContext";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity"; // your sanity client

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source).url();
}

type ProductGridProps = {
  products: Product[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  const { cart, addToCart, removeFromCart, changeQuantity } = useCart();

  const handleRemove = (id: string) => removeFromCart(id);

  return (
    <div className="max-w-6xl mx-auto p-4 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-20">
      {products.map((product) => {
        const quantity = cart[product._id] || 0;
        const imageUrl = product.image
          ? urlFor(product.image)
          : "/placeholder.png";

        return (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-lg transition-shadow"
          >
            {/* 1. Link wraps ONLY the image */}
            <Link href={`/products/${product.slug?.current || ""}`} passHref>
              <div className="relative cursor-pointer">
                <img
                  src={imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />

                {/* 2. Wishlist button is still positioned absolutely over the image, 
                    but its click event is isolated. */}
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                  // Stop the click from propagating up to the Link
                  onClick={(e) => {
                    e.preventDefault(); // Prevent navigation
                    e.stopPropagation(); // Stop general propagation
                    console.log("Wishlist clicked!");
                    // Add actual wishlist logic here
                  }}
                >
                  <HiHeart size={24} />
                </button>
              </div>
            </Link>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                {/* 3. Link wraps ONLY the product name */}
                <Link
                  href={`/products/${product.slug?.current || ""}`}
                  passHref
                  className="hover:underline"
                >
                  <h3 className="text-lg font-semibold cursor-pointer">
                    {product.name}
                  </h3>
                </Link>

                {product.inStock !== undefined && (
                  <p className="text-gray-500 text-sm">
                    {product.inStock} in stock
                  </p>
                )}
                <p className="text-green-700 font-bold mt-2">
                  ${product.price.toFixed(2)} ea.
                </p>
              </div>

              {/* These Cart action buttons are now completely separate from the navigation Link */}
              {quantity === 0 ? (
                <button
                  onClick={() => addToCart(product._id)}
                  className="mt-4 bg-primary-green hover:bg-primary-red text-white py-2 rounded flex items-center justify-center gap-2"
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              ) : (
                <div className="mt-4 flex items-center justify-between border border-gray-200 rounded px-2">
                  {/* ... Quantity change and remove buttons ... */}
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
                    onClick={() => handleRemove(product._id)}
                    className="text-primary-green hover:text-primary-red ml-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
