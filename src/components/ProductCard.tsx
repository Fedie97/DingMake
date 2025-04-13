import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, RotateCw } from 'lucide-react';
import { Product } from '../data/products';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useCart } from '@/hooks/useCart';

type ProductCardProps = {
  product: Product;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const ProductCard = ({ 
  product, 
  className, 
  onMouseEnter, 
  onMouseLeave 
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  const location = useLocation();
  
  // Use contrast-based styling depending on the image
  const isDarkImage = product.darkImage;
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  // Handle product click based on current location
  const handleProductClick = (e: React.MouseEvent) => {
    // If on home page, scroll to featured section
    if (location.pathname === '/') {
      e.preventDefault();
      const featuredSection = document.getElementById('featured-section');
      if (featuredSection) {
        featuredSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Otherwise, default link behavior will navigate to product detail
  };

  return (
    <div 
      className={cn(
        "product-card group overflow-hidden rounded-lg relative transition-all duration-300",
        "border border-border hover:shadow-lg hover:-translate-y-1",
        isDarkImage ? "bg-background" : "bg-background",
        className
      )}
      onMouseEnter={() => {
        setIsHovered(true);
        onMouseEnter?.();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onMouseLeave?.();
      }}
    >
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Overlay Actions */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        )}>
          {/* Origin Info (appears on hover) */}
          <div className={cn(
            "absolute bottom-2 left-2 right-2 text-white text-xs px-2 py-1 rounded-md bg-black/60",
            "opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
          )}>
            <div className="flex justify-between">
              <span>产地：{product.origin}</span>
              <span>净重：{product.weight}</span>
            </div>
          </div>
        </div>
        
        {/* Wishlist Button */}
        <button 
          onClick={handleWishlist}
          className={cn(
            "absolute top-2 left-2 w-8 h-8 rounded-full flex items-center justify-center",
            "bg-white/80 hover:bg-white text-foreground transition-all duration-200",
            "opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0",
            isWishlisted && "text-red-500"
          )}
          aria-label={isWishlisted ? "从收藏中移除" : "添加到收藏"}
        >
          <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
        
        {/* 3D Rotate Button */}
        <button 
          className={cn(
            "absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center",
            "bg-white/80 hover:bg-white text-foreground transition-all duration-200",
            "opacity-0 group-hover:opacity-100 transform -translate-y-2 group-hover:translate-y-0"
          )}
          aria-label="360度查看商品"
        >
          <RotateCw size={16} />
        </button>
      </div>
      
      {/* Product Info */}
      <div className={cn(
        "p-4",
        isDarkImage ? "text-foreground" : "text-foreground"
      )}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg tracking-tight line-clamp-2">{product.name}</h3>
            <p className="text-xs opacity-70 mt-1">{product.origin} · {product.weight}</p>
          </div>
          <div className="text-right">
            <p className="font-bold">¥{product.price}</p>
            <p className="text-xs opacity-70">¥{(product.price / parseInt(product.weight)).toFixed(2)}/克</p>
          </div>
        </div>
        
        {/* Tags Section */}
        <div className="mt-3 flex flex-wrap gap-1">
          {product.chefRecommended && (
            <Badge variant="outline" className="text-xs bg-foreground/5">
              主厨推荐
            </Badge>
          )}
          <Badge variant="outline" className="text-xs bg-foreground/5">
            {product.category}
          </Badge>
        </div>
      </div>
      
      {/* Quick Purchase Button */}
      <Button 
        onClick={handleAddToCart}
        className={cn(
          "absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center p-0",
          "bg-foreground text-background",
          "opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0",
          "transition-all duration-300 hover:bg-foreground/90"
        )}
        aria-label={`快速购买${product.name}`}
      >
        <ShoppingBag size={16} />
      </Button>
      
      {/* Product Link - covers the entire card with custom click handler */}
      <Link 
        to={`/product/${product.id}`} 
        className="absolute inset-0 z-10"
        aria-label={`查看${product.name}详情`}
        onClick={handleProductClick}
      />
    </div>
  );
};

export default ProductCard;
