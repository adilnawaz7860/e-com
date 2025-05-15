"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import { useState } from "react";
import { Toaster } from 'sonner';
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export default function RootLayout({ children }) {
const [cartOpen, setCartOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
