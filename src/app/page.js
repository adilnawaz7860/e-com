"use client"
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import HeroSection from '@/components/HeroSection';
import FeaturedAccessories from '@/components/FeaturedAccessories';

export default function HomePage() {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
     
      

      <main className="p-8 text-center min-h-screen">
       <HeroSection/>
       <FeaturedAccessories/>
     
       
      
      </main>

      
    </div>
  );
}
