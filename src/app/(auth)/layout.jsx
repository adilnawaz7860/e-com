"use client"
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import { useState , useEffect } from "react";
import { Toaster } from 'sonner';
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";





export default function RootLayout({ children }) {









  return (
   <div>
       
        {children}
   
<Toaster
  position="top-left"
  richColors
  duration={3000}
  
  expand={true}
  offset={16}
  toastOptions={{
    classNames: {
      toast: 'shadow-lg border border-gray-200 dark:border-gray-700',
      title: 'font-semibold text-base',
      description: 'text-sm text-gray-500 dark:text-gray-400',
    },
  }}
/>
     </div>
  );
}
