"use client"
import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { accessories } from '@/data/accessorees';
import { useParams } from 'next/navigation';

const ProductsPage = () => {

 const [filters, setFilters] = useState({
  categories: [], // now an array
  priceSort: '',  // 'low-high' or 'high-low'
});

const params = useParams();

useEffect(() => {
  if (params?.product) {
    setFilters({
      categories: [params.product], // assuming `params.product` is a category slug like "mice"
      priceSort: '',
    });
  }
}, [params?.product]);


  // Get unique categories
  const categories = [...new Set(accessories.map(product => product.category))];

  // Filter and sort products
 const filteredProducts = accessories
  .filter(product =>
    filters?.categories?.length === 0 || filters?.categories?.includes(product.category)
  )
  .sort((a, b) => {
    if (filters.priceSort === 'low-high') return a.price - b.price;
    if (filters.priceSort === 'high-low') return b.price - a.price;
    return 0;
  });


  const clearFilters = () => {
    setFilters({
      category: '',
      priceSort: ''
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8  p-4">
      {/* Filter Sidebar */}
      <div className="w-full md:w-64 bg-white p-4 ">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Filters</h2>
          {/* <button 
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:underline"
          >
            Clear all
          </button> */}
        </div>

        <div className="space-y-6">
          {/* Category Filter */}
         
<div className='space-y-4'>
  <h3 className="font-medium mb-6">Category</h3>
  <div className="space-y-6">
    {categories.map(category => (
     <div key={category}  className="flex items-center">
  <input
    type="checkbox"
    id={`category-${category}`}
    value={category}
    checked={filters?.categories?.includes(category)}
    onChange={(e) => {
      const value = e.target.value;
      const isChecked = e.target.checked;
      setFilters(prev => ({
        ...prev,
        categories: isChecked
          ? [...prev.categories, value]
          : prev.categories.filter(cat => cat !== value),
      }));
    }}
    className="hidden" // Hide the default checkbox
  />
  <label
    htmlFor={`category-${category}`}
    className="flex items-center cursor-pointer"
  >
    {/* Custom checkbox */}
    <div className={`w-4 h-4 border border-gray-300 rounded flex items-center justify-center ${filters?.categories?.includes(category) ? 'bg-cyan-400 border-cyan-400' : ''}`}>
      {filters?.categories?.includes(category) && (
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
    <span className="ml-2 text-sm text-gray-700 capitalize">
      {category.toLowerCase()}
    </span>
  </label>
</div>
    ))}
  </div>
</div>


          {/* Price Sorting */}
          <div className='space-y-4'>
            <h3 className="font-medium mb-6">Sort by Price</h3>
      <div className="space-y-3">
  {/* Custom Radio Component */}
  {[
    { id: 'price-default', value: '', label: 'Default' },
    { id: 'price-low-high', value: 'low-high', label: 'Low to High' },
    { id: 'price-high-low', value: 'high-low', label: 'High to Low' }
  ].map((option) => (
    <div key={option.id} className="flex items-center">
      <input
        type="radio"
        id={option.id}
        name="priceSort"
        checked={filters.priceSort === option.value}
        onChange={() => setFilters(prev => ({ ...prev, priceSort: option.value }))}
        className="hidden"
      />
      <label htmlFor={option.id} className="flex items-center cursor-pointer">
        {/* Custom radio circle */}
        <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center mr-3 
          ${filters.priceSort === option.value ? 'border-cyan-400' : 'border-gray-300'}`}
        >
          {filters.priceSort === option.value && (
            <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
          )}
        </div>
        <span className="text-sm font-medium text-gray-700">{option.label}</span>
      </label>
    </div>
  ))}
</div>
          
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-600">{filteredProducts.length} products found</p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No products match your filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;