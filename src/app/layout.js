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
    
        {children}
   

      </body>
    </html>
  );
}
