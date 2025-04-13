
import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/useCart';

type CartItemProps = {
  item: CartItemType;
};

const CartItem = ({ item }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;
  
  const handleIncrease = () => updateQuantity(product.id, quantity + 1);
  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };
  const handleRemove = () => removeFromCart(product.id);

  return (
    <div className="flex items-center gap-4 py-4 border-b border-border">
      {/* Product Image */}
      <div className="w-24 h-24 bg-muted rounded overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
      </div>
      
      {/* Product Details */}
      <div className="flex-grow">
        <h3 className="font-bold text-base">{product.name}</h3>
        <p className="text-xs opacity-70">{product.origin} · {product.weight}</p>
        <p className="text-sm font-medium mt-1">¥{product.price}</p>
      </div>
      
      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleDecrease}
          className="h-8 w-8 rounded-full"
        >
          <Minus size={16} />
        </Button>
        
        <span className="w-8 text-center font-medium">{quantity}</span>
        
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleIncrease}
          className="h-8 w-8 rounded-full"
        >
          <Plus size={16} />
        </Button>
      </div>
      
      {/* Subtotal */}
      <div className="w-24 text-right font-bold">
        ¥{(product.price * quantity).toFixed(2)}
      </div>
      
      {/* Remove Button */}
      <Button 
        variant="ghost" 
        size="icon"
        onClick={handleRemove}
        className="text-red-500 hover:text-red-700 hover:bg-red-50"
      >
        <Trash2 size={18} />
      </Button>
    </div>
  );
};

export default CartItem;
