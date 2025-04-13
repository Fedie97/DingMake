
import { createContext, useReducer, ReactNode, useEffect } from 'react';
import { Product } from '@/data/products';
import { toast } from 'sonner';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  total: number;
};

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

type CartContextType = {
  cart: CartState;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartCount: () => number;
};

const initialState: CartState = {
  items: [],
  total: 0,
};

// Try to load cart from localStorage
const loadCartFromStorage = (): CartState => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Failed to load cart from localStorage:', error);
  }
  return initialState;
};

// Calculate total price of cart
const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
};

// Cart reducer function
const cartReducer = (state: CartState, action: CartAction): CartState => {
  let updatedItems: CartItem[] = [];
  
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.items.findIndex(item => item.product.id === action.payload.id);
      
      if (existingItemIndex > -1) {
        // Item already exists, increase quantity
        updatedItems = state.items.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // New item, add to cart
        updatedItems = [...state.items, { product: action.payload, quantity: 1 }];
      }
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
      
    case 'REMOVE_ITEM':
      updatedItems = state.items.filter(item => item.product.id !== action.payload);
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
      
    case 'UPDATE_QUANTITY':
      updatedItems = state.items.map(item => 
        item.product.id === action.payload.id 
          ? { ...item, quantity: action.payload.quantity } 
          : item
      ).filter(item => item.quantity > 0); // Remove items with 0 quantity
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
      
    case 'CLEAR_CART':
      return initialState;
      
    default:
      return state;
  }
};

// Create the context
export const CartContext = createContext<CartContextType | undefined>(undefined);

// Create the context provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState, loadCartFromStorage);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  // Function to add an item to the cart
  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    toast.success('已添加到购物车', {
      description: `${product.name} 已成功添加到购物车`,
    });
  };
  
  // Function to remove an item from the cart
  const removeFromCart = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast.info('商品已从购物车中移除');
  };
  
  // Function to update the quantity of an item
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity >= 0) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };
  
  // Function to clear the cart
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.info('购物车已清空');
  };
  
  // Function to get the total count of items in the cart
  const getCartCount = () => {
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  };
  
  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount
  };
  
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
