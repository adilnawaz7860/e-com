const baseAccessories = [
  {
    id: "1",
    name: "Ergonomic Optical Mouse",
    isNew: true,
    discount: 10,
    image: "https://th.bing.com/th/id/OIP.3rqEqIvkwO-VI7LL2xwBAAHaGk?cb=iwp2&rs=1&pid=ImgDetMain",
    price: 79,
    originalPrice: 89,
    description: "Precision optical mouse with ergonomic design for comfortable all-day use",
    features: [
      "4000 DPI optical sensor",
      "6 programmable buttons",
      "Braided cable",
      "RGB lighting"
    ],
    stock: 25,
    rating: 4.7,
    reviews: 128,
    category: "mouse",
    brand: "TechPro"
  },
  {
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
    name: "Wireless Mechanical Keyboard",
    isNew: true,
    discount: 15,
    image: "https://i.pcmag.com/imagery/roundups/007y4PjTbtgMMDz5SnUq9Em-1.jpg",
    price: 59,
    originalPrice: 69,
    description: "Slim wireless keyboard with tactile mechanical switches",
    features: [
      "Bluetooth 5.1",
      "Type-C charging",
      "15-hour battery life",
      "Multi-device pairing"
    ],
    stock: 12,
    rating: 4.6,
    reviews: 143,
    category: "keyboards",
    brand: "Logitech"
  },
  {
    id: "6",
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

function generateProducts(baseProducts, count) {
  const generatedProducts = [...baseProducts];
  
  for (let i = baseProducts.length + 1; i <= count; i++) {
    const baseProduct = baseProducts[Math.floor(Math.random() * baseProducts.length)];
    
    const newProduct = {
      ...baseProduct,
      id: String(i), // New unique ID
      price: Math.max(10, Math.round(baseProduct.price * (0.9 + Math.random() * 0.2))), // ±10% price variation
      originalPrice: Math.max(15, Math.round(baseProduct.originalPrice * (0.9 + Math.random() * 0.2))),
      stock: Math.floor(Math.random() * 50) + 5, // Random stock (5-54)
      rating: (4 + Math.random()).toFixed(1), // Rating between 4.0-5.0
      reviews: Math.floor(Math.random() * 500), // Random reviews (0-499)
      isNew: Math.random() > 0.7, // 30% chance of being new
      discount: Math.random() > 0.6 ? Math.floor(Math.random() * 20) + 5 : 2 // 40% chance of 5-25% discount
    };
    
    generatedProducts.push(newProduct);
  }
  
  return generatedProducts;
}

 export const accessories = generateProducts(baseAccessories, 50);