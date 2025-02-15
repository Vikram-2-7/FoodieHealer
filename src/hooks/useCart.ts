import { useState, useEffect } from 'react';
import CartStore from '../store/CartStore';

export function useCart() {
  const [cartItems, setCartItems] = useState(CartStore.getItems());

  useEffect(() => {
    const unsubscribe = CartStore.subscribe(() => {
      setCartItems(CartStore.getItems());
    });
    return unsubscribe;
  }, []);

  const getCartTotal = () => CartStore.getTotal();

  return {
    cartItems,
    addToCart: (item: any) => CartStore.addItem(item),
    removeFromCart: (itemId: string) => CartStore.removeItem(itemId),
    updateQuantity: (itemId: string, quantity: number) => 
      CartStore.updateQuantity(itemId, quantity),
    totalAmount: getCartTotal(),
  };
} 