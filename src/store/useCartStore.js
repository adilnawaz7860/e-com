import { create } from 'zustand';

export const useCartStore = create((set, get) => {
  // Load cart from localStorage if available
  const loadedCart = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart')) : [];

  return {
    cart: loadedCart || [],

addToCart: (product) => {
  // Get current state safely
  const currentCart = get().cart;
  
  // Ensure product has at least quantity 1
  const quantityToAdd = Math.max(product.quantity || 1, 1);
  
  // Check if product exists in cart
  const existingItemIndex = currentCart.findIndex(item => item.id === product.id);

  let updatedCart;
  
  if (existingItemIndex >= 0) {
    // Product exists - update quantity
    updatedCart = currentCart.map((item, index) => 
      index === existingItemIndex
        ? { 
            ...item, 
            quantity: item.quantity + quantityToAdd,
            // Preserve other existing properties
          }
        : item
    );
  } else {
    // Product doesn't exist - add new item
    updatedCart = [
      ...currentCart, 
      { 
        ...product, 
        quantity: quantityToAdd,
        // Ensure minimum required fields
        id: product.id, // Required
        price: product.price, // Required
        name: product.name || 'Unnamed Product' // Recommended
      }
    ];
  }

  // Update state
  set({ cart: updatedCart });

  // Persist to localStorage (with error handling)
  try {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  } catch (error) {
    console.error('Failed to save cart to localStorage:', error);
    // Optional: Show user warning about cart not being saved
  }
},


    removeFromCart: (id) => {
      const cart = get().cart.filter(item => item.id !== id);
      set({ cart });
      
      // Save cart to localStorage after removing
      localStorage.setItem('cart', JSON.stringify(cart));
    },

    clearCart: () => {
      set({ cart: [] });

      // Clear cart in localStorage
      localStorage.removeItem('cart');
    },

totalItems: () => get().cart.length,
  };
});
