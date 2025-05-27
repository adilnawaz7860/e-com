'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import userService from '@/services/userService';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import AdminService from '@/services/adminService';

export default function Header({ setCartOpen }) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [products ,setProducts] = useState([]);
  const totalItems = useCartStore((state) => state.totalItems());

  const navLinks = ['Home', 'Products', 'Contact'];
  if (formData?.isAdmin) navLinks.push('Admin');

  const baseAccessories = [
    { id: '1', category: 'mouse' },
    { id: '2', category: 'keyboards' },
    { id: '3', category: 'adapters' },
    { id: '4', category: 'audio' },
  ];

  const getUser = async () => {
    const res = await userService.getUser();
    setFormData(res);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    toast.success('User Logged Out');
    setTimeout(() => {
      router.push('/login');
    }, 1000);
  };

  useEffect(() => {
    getUser();
  }, []);

  

  const getProducts = async () => {
  const res = await AdminService.getAllProducts();
  setProducts(res ?? [])
}

useEffect(() => {
  getProducts()
},[])

  const categories = useMemo(() => {
    const uniqueCategories = new Set();
    products.forEach(product => {
      if (product.category) {
        uniqueCategories.add(product.category);
      }
    });
    return Array.from(uniqueCategories);
  }, [products]);

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
          IT Solutions.
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 relative">
          {navLinks.map((link) => {
            if (link === 'Products') {
              return (
                <div key={link} className="relative group">
                  <span className="flex items-center hover:text-cyan-400 cursor-pointer">
                    {link}
                    <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform" />
                  </span>
                  <div className="absolute left-0 mt-6 rounded-md bg-white text-black shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 z-10 w-40">
                    {categories.map((item, idx) => (
                      <Link
                        key={idx}
                        href={`/products/${item.toLowerCase()}`}
                        className="block hover:rounded-md px-4 py-2 capitalize hover:bg-cyan-100"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            if (link === 'Admin') {
              return (
                <div key={link} className="relative group">
                  <span className="flex items-center hover:text-cyan-400 cursor-pointer">
                    {link}
                    <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform" />
                  </span>
                  <div className="absolute flex flex-col left-0 mt-6 rounded-md bg-white text-black shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 z-10 w-40">
                    <Link href="/userlist" className="block px-4 py-2 capitalize hover:bg-cyan-100">User List</Link>
                    <Link href="/productlist" className="block px-4 py-2 capitalize hover:bg-cyan-100">Product List</Link>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={link}
                href={link.toLowerCase() === 'home' ? '/' : `/${link.toLowerCase()}`}
                className="hover:text-cyan-400 capitalize"
              >
                {link}
              </Link>
            );
          })}

          {formData?.name && (
            <div className="relative group">
              <span className="flex items-center hover:text-cyan-400 cursor-pointer">
                {formData.name}
                <ChevronDown className="ml-1 h-4 w-4 group-hover:rotate-180 transition-transform" />
              </span>
              <div className="absolute flex flex-col left-0 mt-6 rounded-md bg-white text-black shadow-lg opacity-0 group-hover:opacity-100 transition duration-300 z-10 w-40">
                <Link href="/profile" className="block px-4 py-2 capitalize hover:bg-cyan-100">Profile</Link>
                <div onClick={handleLogout} className="block cursor-pointer px-4 py-2 capitalize hover:bg-cyan-100">Log Out</div>
              </div>
            </div>
          )}
        </nav>

        {/* Right Icons */}
        <div className="flex items-center ml-4 space-x-4">
          <div className="relative cursor-pointer" onClick={() => setCartOpen(true)}>
            <ShoppingCart className="hover:text-cyan-400" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-1">
                {totalItems}
              </span>
            )}
          </div>

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
          {navLinks.map((link) => {
            if (link === 'Products') {
              return (
                <div key={link}>
                  <button
                    onClick={() => setIsProductsOpen(!isProductsOpen)}
                    className="flex items-center justify-between w-full py-2 text-white font-semibold"
                  >
                    <span>{link}</span>
                    <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isProductsOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isProductsOpen && (
                    <div className="space-y-1">
                      {baseAccessories.map((item, idx) => (
                        <Link
                          key={idx}
                          onClick={() => setIsMenuOpen(false)}
                          href={`/products/${item.category}`}
                          className="block rounded-xl capitalize py-2 hover:bg-cyan-100"
                        >
                          {item.category}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (link === 'Admin') {
              return (
                <div key={link}>
                  <button
                    onClick={() => setIsAdminOpen(!isAdminOpen)}
                    className="flex items-center justify-between w-full py-2 text-white font-semibold"
                  >
                    <span>{link}</span>
                    <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isAdminOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isAdminOpen && (
                    <div className="space-y-3 flex flex-col">
                      <Link href="/userlist" className="hover:underline">User List</Link>
                      <Link href="/productlist" className="hover:underline">Product List</Link>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link}
                onClick={() => setIsMenuOpen(false)}
                href={link.toLowerCase() === 'home' ? '/' : `/${link.toLowerCase()}`}
                className="block py-2 text-white hover:text-cyan-400 border-b border-gray-700"
              >
                {link}
              </Link>
            );
          })}

          {formData?.name && (
            <div>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center justify-between w-full py-2 text-white font-semibold"
              >
                <span>{formData?.name}</span>
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>
              {isProfileOpen && (
                <div className="space-y-3 flex flex-col">
                  <Link href="/profile" className="hover:underline">Profile</Link>
                  <div onClick={handleLogout} className="cursor-pointer hover:underline">Log Out</div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </motion.header>
  );
}
