"use client"
import { useCartStore } from '@/store/useCartStore';
import { motion } from 'framer-motion';
import { X ,Trash2, ArrowBigRight} from 'lucide-react';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function CartDrawer({ isOpen, onClose }) {
  const cart = useCartStore(state => state.cart);
  const removeFromCart = useCartStore(state => state.removeFromCart);

  useEffect(() => {
    cart.length === 0 && (
        onClose(),
        toast.success("Your cart is empty")
    )
  },[cart.length])

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: isOpen ? 0 : '100%' }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-0 right-0 h-full w-100 bg-white shadow-lg z-50 p-6 overflow-y-auto"
    >
      <div className="flex  justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Your Cart</h2>
        <button className='cursor-pointer' onClick={onClose}><X /></button>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map(item => (
            <li key={item.id} className="flex justify-between items-center border-b pb-2">
              <div className='w-12 h-12'>
                <img className='object-contain' src={item.image}/>
              </div>
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <button
                className="text-red-500 hover:rotate-60 transition transform ease-in-out cursor-pointer text-sm"
                onClick={() => removeFromCart(item.id)}
              >
                <Trash2/>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* <div className='absolute cursor-pointer p-2 right-0 bottom-0 '>
        <ArrowBigRight fontSize={40} className='text-6xl text-cyan-600'/>
      </div> */}
    </motion.div>
  );
}
