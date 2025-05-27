
"use client"
import ProductCard from '@/components/ProductCard';
import { accessories } from '@/data/accessorees';
import AdminService from '@/services/adminService';
import { useCartStore } from "@/store/useCartStore";
import { Loader2 } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from "sonner"; // or your preferred toast library




export default function ProductPage() {
    const [isLoading ,setIsLoading] = useState(false);
    const addToCart = useCartStore(state => state.addToCart);
    const params = useParams();
    const [product ,setProduct] = useState({});
     const [products ,setProducts] = useState([]);

    const [quantity, setQuantity] = useState(1);

    console.log("params.id:", params.id, typeof params.id);
console.log("product.category:", product.category);
console.log("products:", products);


      const handleIncrement = () => {
    if (quantity < product?.stock) {
      setQuantity(quantity + 1);
    }
  };
      const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };


  const getSingleProduct = async () => {
    console.log(params.id , "iddi")
    const res = await AdminService.productById(params.id)
    console.log(res , "response")
    setProduct(res ?? {})
  }

  useEffect(() => {
    getSingleProduct()
  },[product.stock])

  const handleAddToCart = async (product) => {
    console.log(product, "id")
    setIsLoading(true);
    
    try {
      // Simulate API call or any async operation
      await new Promise(resolve => setTimeout(resolve, 500));
      addToCart(product);
      toast.success(`${product?.name} added to cart!`);
    } catch (error) {
      toast.error("Failed to add item to cart");
    } finally {
        setIsLoading(false);
        setQuantity(1)
    }
  };
  
  if (!product) {
    return notFound();
  }

    const getProducts = async () => {
    const res = await AdminService.getAllProducts();
    setProducts(res ?? [])
  }
  
  useEffect(() => {
    getProducts()
  },[])

  // Get related products (excluding current product)
const relatedProducts = product?.category
  ? products
      .filter(
        (p) =>
          String(p._id) !== String(params.id) &&
          p.category?.toLowerCase() === product.category.toLowerCase()
      )
      .slice(0, 4)
  : [];



  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image Gallery */}
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
            <img
              src={product?.image}
              alt={product?.name}
              className="w-full h-full object-contain p-8"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-product?.png';
              }}
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[product?.image, product?.image, product?.image, product?.image].map((img, i) => (
              <div key={i} className="bg-gray-100 rounded-md aspect-square cursor-pointer">
                <img
                  src={img}
                  alt={`${product?.name} thumbnail ${i + 1}`}
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-product?.png';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product?.isNew && (
                <span className="bg-amber-500 dark:text-black text-white text-xs px-2 py-2 w-8 h-8 text-center flex justify-center items-center rounded-full">
                  New
                </span>
              )}
              {product?.discount ?(
                <span className="bg-red-500 text-white text-xs px-2 py-2 w-8 h-8 flex justify-center items-center rounded-full">
                  -{product?.discount}%
                </span>
              ) : ""}
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{product?.name}</h1>
            {/* <div className="flex items-center mt-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(product?.rating) ? 'fill-current' : 'stroke-current fill-none'}`}
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-500 ml-2">
                {product?.rating} ({product?.reviews} reviews)
              </span>
            </div> */}
          </div>

          <div className="space-y-4">
            {product?.originalPrice && (
              <p className="text-gray-500 line-through">
                ₹{product?.originalPrice.toFixed(2)}
              </p>
            )}
            <p className="text-3xl font-bold text-gray-900">
              ₹{product?.price?.toFixed(2)}
            </p>
            <p className={`${product?.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product?.stock > 0 ? `In Stock (${product?.stock} available)` : 'Out of Stock'}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-gray-700">{product?.description}</p>
          </div>

          {product?.features && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Features</h2>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                {product?.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex space-x-4 pt-4">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button 
               onClick={handleDecrement}
                disabled={quantity <= 1}
               className="px-4 py-2 bg-gray-100 hover:bg-gray-200">
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
               onClick={handleIncrement}
                disabled={quantity >= product?.stock}
               className="px-4 py-2 bg-gray-100 hover:bg-gray-200">
                +
              </button>
            </div>
            <button 
            onClick={() =>handleAddToCart({...product , quantity})}
            
              className={`flex-1 cursor-pointer py-2 px-6 rounded-lg font-medium ${
                product?.stock > 0 
                  ? 'bg-cyan-600 hover:bg-cyan-700 text-white' 
                  : 'bg-gray-300 cursor-not-allowed text-gray-500'
              }`}
              disabled={product?.stock === 0}
            >
              { isLoading ?  ( <div className='flex justify-center gap-4 items-center'>
            <Loader2 className="w-4 h-4 animate-spin" />
            Adding...
          </div>) : (product?.stock > 0 ? 'Add to Cart' : 'Out of Stock')}
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product?._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}