"use client";

import { useCartStore } from "@/store/useCartStore";
import { CheckCircle, ShoppingCart, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner"; // or your preferred toast library

const ProductCard = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);
  const items = useCartStore(state => state.cart);

  const isInCart = items.some(item => item._id === product._id);

  const handleAddToCart = async () => {
    console.log("Adding product to cart:", product);

    if (isInCart) return;
    
    setIsLoading(true);
    try {
      // Simulate API call or any async operation
      await new Promise(resolve => setTimeout(resolve, 500));
      addToCart({...product, quantity : 1});
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error("Failed to add item to cart");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full relative group">
      {/* Product image with better loading and error handling */}
      <div className="relative w-full h-60 mb-4 rounded-lg overflow-hidden bg-gray-50">
        <Link href={`/product/${product._id}`}>
        <div className="h-48 w-full flex items-center justify-center"> {/* Fixed-size container */}
  <img
    src={product.image}
    alt={product.name}
    className="object-contain h-full w-full" // Ensures image fits entirely
    onError={(e) => {
      e.currentTarget.src = '/placeholder-product.png';
    }}
  />
</div>
       </Link>
      </div>

      {/* Product info */}
      <div className="flex-grow">
        <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 mb-1">
          {product.name}
        </h2>
        {product.description && (
          <p className="text-gray-500 text-sm line-clamp-2 mb-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto">
          <p className="text-cyan-600 font-bold text-lg">
            ₹{product.price.toFixed(2)}
          </p>
          {product.originalPrice && (
            <p className="text-gray-400 text-sm line-through">
              ₹{product.originalPrice.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      {/* Add to cart button */}
    <button
  onClick={handleAddToCart}
  disabled={isInCart || isLoading || product?.stock <= 0}
  className={`w-full py-2 cursor-pointer rounded-lg transition-all duration-200 text-white mt-4 flex items-center justify-center gap-2
    ${
      product?.stock <= 0
        ? "bg-gray-400 cursor-not-allowed"
        : isInCart
        ? "bg-green-500 cursor-not-allowed"
        : "bg-cyan-500 hover:bg-cyan-600 active:scale-95"
    }
    ${isLoading ? "opacity-80" : ""}
  `}
  aria-label={
    product?.stock <= 0
      ? "Out of stock"
      : isInCart
      ? "Item in cart"
      : "Add to cart"
  }
>
  {product?.stock <= 0 ? (
    <>
      <span>Out of Stock</span>
    </>
  ) : isLoading ? (
    <>
      <Loader2 className="w-4 h-4 animate-spin" />
      Adding...
    </>
  ) : isInCart ? (
    <>
      <CheckCircle className="w-4 h-4" />
      Added
    </>
  ) : (
    <>
      <ShoppingCart className="w-4 h-4" />
      Add to Cart
    </>
  )}
</button>


      {/* Optional badge for special items */}
      {product.isNew && (
        <span className="absolute flex justify-center items-center top-2 right-2 bg-amber-500 text-white text-xs px-2 py-2 w-8 text-center h-8 rounded-full">
          New
        </span>
      )}
      {product.discount ? (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-2 h-8  w-8 text-center flex justify-center items-center rounded-full">
          -{product.discount}%
        </span>
      ) : ""}
    </div>
  );
};

export default ProductCard;