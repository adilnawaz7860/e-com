"use client"
import HeroSection from '@/components/HeroSection';
import FeaturedAccessories from '@/components/FeaturedAccessories';

export default function HomePage() {

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-white">
    <main className="p-8 text-center min-h-screen">
      <div className='hidden md:block'>
         <HeroSection/>
      </div>
       <FeaturedAccessories/>
     </main>
     </div>
  );
}
