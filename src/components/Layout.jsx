// components/Layout.jsx
"use client"
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart,
  Menu,
  Facebook,
  Twitter,
  Instagram,
  X,
} from 'lucide-react';
import Link from 'next/link';

const navLinks = ['Home', 'Products', 'Deals', 'Support', 'Contact'];

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(3); // Replace with actual logic

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}

    
  


      {/* Main content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <motion.footer
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 text-white mt-8"
      >
        <div className="container mx-auto px-4 py-10 grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-2">About ElectroStore</h3>
            <p className="text-sm text-gray-400">
              The latest gadgets at unbeatable prices. Trusted by thousands of tech lovers.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="text-sm text-gray-400 space-y-2">
              {navLinks.map(link => (
                <li key={link}>
                  <Link href={`/${link.toLowerCase()}`} className="hover:text-cyan-400">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4 text-cyan-400 mt-2">
              <Facebook className="hover:text-white cursor-pointer" />
              <Twitter className="hover:text-white cursor-pointer" />
              <Instagram className="hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-700">
          © {new Date().getFullYear()} ElectroStore. All rights reserved.
        </div>
      </motion.footer>
    </div>
  );
}
