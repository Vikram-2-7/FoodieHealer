import { EventEmitter } from '../utils/EventEmitter';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: any;
  quantity: number;
}

class CartStore {
  private static instance: CartStore;
  private items: CartItem[] = [];
  private emitter = new EventEmitter();

  private constructor() {}

  static getInstance(): CartStore {
    if (!CartStore.instance) {
      CartStore.instance = new CartStore();
    }
    return CartStore.instance;
  }

  getItems(): CartItem[] {
    return [...this.items]; // Return a copy to prevent direct mutations
  }

  addItem(item: CartItem) {
    const existingItem = this.items.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
      this.items = [...this.items]; // Create new array to trigger updates
    } else {
      this.items = [...this.items, { ...item, quantity: 1 }];
    }
    this.emitter.emit('cartUpdated');
  }

  removeItem(itemId: string) {
    this.items = this.items.filter(item => item.id !== itemId);
    this.emitter.emit('cartUpdated');
  }

  updateQuantity(itemId: string, quantity: number) {
    this.items = this.items.map(item =>
      item.id === itemId ? { ...item, quantity } : item
    );
    this.emitter.emit('cartUpdated');
  }

  getTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  subscribe(callback: () => void): () => void {
    return this.emitter.on('cartUpdated', callback);
  }
}

export default CartStore.getInstance(); 