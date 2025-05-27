"use client"
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import { useState , useEffect } from "react";
import { Toaster } from 'sonner';
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";





export default function RootLayout({ children }) {
const router = useRouter();
const [cartOpen, setCartOpen] = useState(false);
const [loading ,setLoading] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      router.replace("/login");
    } else {
      setLoading(false);
    }
  }, []);



  const Loader = () => {
   
    return (
      <div className="flex justify-center items-center">
        <div className="w-20 h-20 border-4 border-cyan-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  

}

  if (loading) {
    return <div className="h-screen flex items-center justify-center"><Loader/></div>; // Full-screen loader
  }

  return (
   <div>
       <Header setCartOpen={setCartOpen} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        {children}
        <Footer />
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
