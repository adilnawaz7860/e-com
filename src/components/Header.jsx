"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X, ChevronDown, Sun, Moon } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

const navLinks = ['Home', 'Products', 'Contact'];

export default function Header({ setCartOpen }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false); // mobile
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
const [filters, setFilters] = useState({ categories: [] });

  const totalItems = useCartStore(state => state.totalItems());

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const baseAccessories = [
 
  {
    id: "1",
    name: "Wireless Bluetooth Mouse",
    isNew: true,
    discount: 5,
    image: "https://www.bhphotovideo.com/images/images1000x1000/dell_pxk14_wm123_optical_mouse_1135878.jpg",
    price: 39,
    originalPrice: 45,
    description: "Compact wireless mouse with Bluetooth 5.0 connectivity",
    features: [
      "2.4GHz wireless & Bluetooth",
      "12 months battery life",
      "Silent clicks",
      "Portable design"
    ],
    stock: 42,
    rating: 4.3,
    reviews: 86,
    category: "mouse",
    brand: "Dell"
  },
  {
    id: "2",
    name: "Mechanical Gaming Keyboard",
    isNew: true,
    discount: 5,
    image: "https://th.bing.com/th/id/OIP.rOPB8zwx14GQjoe9sURbcwHaEK?cb=iwp2&rs=1&pid=ImgDetMain",
    price: 99,
    originalPrice: 109,
    description: "Full-size mechanical keyboard with customizable RGB backlighting",
    features: [
      "Cherry MX Red switches",
      "Anti-ghosting",
      "Detachable wrist rest",
      "USB passthrough"
    ],
    stock: 18,
    rating: 4.8,
    reviews: 215,
    category: "keyboards",
    brand: "HyperX"
  },
  {
    id: "3",
    name: "7-in-1 USB-C Hub",
    isNew: true,
    image: "https://th.bing.com/th/id/OIP.OROc6OGlOvuXemziSfJFTwHaHa?cb=iwp2&rs=1&pid=ImgDetMain",
    price: 49,
    originalPrice: 59,
    description: "Compact USB-C hub with multiple connectivity options",
    features: [
      "4K HDMI output",
      "3 USB 3.0 ports",
      "SD/TF card readers",
      "100W PD charging"
    ],
    stock: 30,
    rating: 4.5,
    reviews: 97,
    category: "adapters",
    brand: "Anker"
  },
 
  {
    id: "4",
    name: "Noise Cancelling Headphones",
    isNew: false,
    discount: 20,
    image : "https://techstory.in/wp-content/uploads/2020/02/01LW4049122-HeroSquare-f670a23de42e4206b42e87a61fe486fe.jpg"
,   price: 199,
    originalPrice: 249,
    description: "Premium over-ear headphones with active noise cancellation",
    features: [
      "40mm drivers",
      "30-hour battery",
      "Touch controls",
      "Built-in mic"
    ],
    stock: 8,
    rating: 4.9,
    reviews: 312,
    category: "audio",
    brand: "Sony"
  }
];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black text-white shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-cyan-400">
          ElectroStore
        </Link>

        {/* Search Bar */}
      <div className="hidden md:flex flex-1 justify-center mx-6 relative">
  {/* <div className="relative w-full max-w-md">
    <input
      type="text"
      placeholder="Search products..."
      value={searchQuery}
      onChange={(e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        // Filter products and update category filters
        if (query.length > 0) {
          const matchingProducts = products.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase())
          );
          
          // Get unique categories from matching products
          const matchingCategories = [...new Set(
            matchingProducts.map(product => product.category)
          )];
          
          // Update filters to show these categories
          setFilters(prev => ({
            ...prev,
            categories: matchingCategories
          }));
          
          // Optional: Scroll to products section
          document.getElementById('products-section')?.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }}
      className="w-full bg-white outline-none px-4 py-3 pr-10 rounded-full text-black placeholder-gray-500 border border-gray-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all shadow-sm"
    />
    
    {/* Search icon */}
    {/* <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div> */}
    
    {/* Clear button (visible when typing) */}
    {/* {searchQuery && (
      <button
        onClick={() => {
          setSearchQuery('');
          setFilters(prev => ({ ...prev, categories: [] }));
        }}
        className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    )} */}
  {/* </div> */}
</div> 

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 relative">
          {navLinks.map(link => {
            if (link === 'Products') {
              return (
                <div key={link} className="relative group">
                  <span className="flex items-center hover:text-cyan-400 transition cursor-pointer">
                    {link}
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  </span>
                  <div className="absolute left-0 mt-6 bg-white text-black  group-hover:rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 z-10 w-40">
                    {baseAccessories.map((item,idx) => {
                      return (
                         <Link
                         key={idx}
                      href={`/products/${item.category}`}
                      className="block rounded-xl capitalize px-4 py-2 hover:bg-cyan-100"
                    >
                      {item.category}
                    </Link>
                      )
                    })}
                   
                    
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link}
                href={link.toLocaleLowerCase() === "home" ? "/" :`/${link.toLowerCase()}`}
                className="hover:text-cyan-400 transition capitalize"
              >
                {link}
              </Link>
            );
          })}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center ml-4 space-x-4">
          {/* Theme Toggle */}
          {/* <button onClick={toggleTheme} className="text-white hover:text-cyan-400 hidden md:block">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button> */}

          {/* Cart Icon */}
          <div className="relative cursor-pointer" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="hover:text-cyan-400" />
            {totalItems  > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1">
                {totalItems}
              </span>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden bg-gray-900 px-4 pb-4 space-y-2"
        >
          {navLinks.map(link => {
            if (link === 'Products') {
              return (
                <div key={link}>
                  <button
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className="flex items-center justify-between w-full py-2 text-white font-semibold"
                  >
                    <span>{link}</span>
                    <ChevronDown
                      className={`ml-2 h-4 w-4 transform transition-transform duration-300 ${
                        isProductsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isProductsOpen && (
                    <div className="pl-4 space-y-1">
                      <Link
                        href="/products/computers"
                        className="block text-white hover:text-cyan-400"
                      >
                        Computers
                      </Link>
                      <Link
                        href="/products/laptops"
                        className="block text-white hover:text-cyan-400"
                      >
                        Laptops
                      </Link>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link}
                href={`/${link.toLowerCase()}`}
                className="block py-2 text-white hover:text-cyan-400 border-b border-gray-700"
              >
                {link}
              </Link>
            );
          })}

          {/* Mobile Theme Toggle */}
          {/* <button onClick={toggleTheme} className="text-white hover:text-cyan-400 flex items-center pt-2">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span className="ml-2">Toggle Theme</span>
          </button> */}
        </motion.div>
      )}
    </motion.header>
  );
}
