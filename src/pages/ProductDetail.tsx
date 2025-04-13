
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '@/data/products';
import { Heart, ShoppingBag, ChevronLeft, Share2, Star, RotateCw, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-2xl font-bold mb-4">商品未找到</h1>
        <p className="mb-8 text-muted-foreground">该商品可能已下架或不存在</p>
        <Button onClick={() => navigate('/products')}>返回商品列表</Button>
      </div>
    );
  }

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    toast({
      title: "已添加到购物车",
      description: `${quantity}件 ${product.name} 已成功添加到您的购物车`,
      duration: 3000,
    });
  };

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "已移除收藏" : "已添加到收藏",
      description: isWishlisted 
        ? `已将${product.name}从收藏中移除` 
        : `已将${product.name}添加到收藏`,
      duration: 2000,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-white">
      {/* Back Button */}
      <div className="mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={16} />
          返回
        </Button>
      </div>
      
      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Images */}
        <div className="aspect-square bg-secondary/20 rounded-lg relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain"
          />
          
          {/* Image Controls */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button 
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm"
              aria-label="360度查看"
            >
              <RotateCw size={18} />
            </Button>
            <Button 
              variant="secondary"
              size="icon"
              className="rounded-full bg-white/80 backdrop-blur-sm"
              aria-label="分享商品"
            >
              <Share2 size={18} />
            </Button>
          </div>
        </div>
        
        {/* Product Info */}
        <div>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">{product.name}</h1>
              <p className="text-muted-foreground">产地：{product.origin} · 净重：{product.weight}</p>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                "rounded-full",
                isWishlisted && "text-red-500"
              )}
              onClick={handleToggleWishlist}
            >
              <Heart fill={isWishlisted ? "currentColor" : "none"} />
            </Button>
          </div>
          
          {/* Ratings */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  size={18} 
                  className={star <= 5 ? "text-amber-500 fill-amber-500" : "text-gray-300"} 
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(24条评论)</span>
          </div>
          
          {/* Price */}
          <div className="mt-6">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">¥{product.price}</span>
              <span className="text-sm text-muted-foreground">
                ¥{(product.price / parseInt(product.weight)).toFixed(2)}/克
              </span>
            </div>
          </div>
          
          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {product.chefRecommended && (
              <Badge variant="secondary" className="rounded-md">
                主厨推荐
              </Badge>
            )}
            <Badge variant="outline" className="rounded-md">
              {product.category}
            </Badge>
            <Badge variant="outline" className="rounded-md">
              限量版
            </Badge>
          </div>
          
          {/* Quantity */}
          <div className="mt-8">
            <p className="text-sm font-medium mb-2">数量</p>
            <div className="flex items-center border border-input rounded-md w-32">
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-none px-2 py-0 h-10"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </Button>
              <div className="flex-1 text-center">{quantity}</div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-none px-2 py-0 h-10"
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
              >
                <Plus size={16} />
              </Button>
            </div>
          </div>
          
          {/* Add to Cart */}
          <div className="mt-8 flex gap-4">
            <Button 
              className="flex-1 gap-2" 
              size="lg"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={18} />
              加入购物车
            </Button>
            <Button variant="secondary" size="lg" className="flex-1">
              立即购买
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">商品详情</TabsTrigger>
            <TabsTrigger value="specs">规格参数</TabsTrigger>
            <TabsTrigger value="reviews">用户评价</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6 text-muted-foreground">
            <h3 className="text-lg font-medium text-foreground mb-2">产品介绍</h3>
            <p className="mb-4">
              {product.description}
            </p>
            <p className="mb-4">
              采用冷压榨工艺，保留了天然橄榄油的所有营养成分，加入了意大利顶级黑松露，赋予了这款橄榄油独特的香气和口感。适合用于各种高级料理，如意面、沙拉或直接蘸面包食用。
            </p>
            <h3 className="text-lg font-medium text-foreground mb-2 mt-6">使用方式</h3>
            <p>
              建议冷食使用，可直接滴几滴在成品料理上，或作为高级调味油蘸料。避免高温烹饪，以保留松露的香气和橄榄油的营养成分。
            </p>
          </TabsContent>
          <TabsContent value="specs" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex justify-between p-3 bg-secondary/20 rounded">
                <span className="text-sm font-medium">净含量</span>
                <span className="text-sm">{product.weight}</span>
              </div>
              <div className="flex justify-between p-3 bg-secondary/20 rounded">
                <span className="text-sm font-medium">产地</span>
                <span className="text-sm">{product.origin}</span>
              </div>
              <div className="flex justify-between p-3 bg-secondary/20 rounded">
                <span className="text-sm font-medium">保质期</span>
                <span className="text-sm">24个月</span>
              </div>
              <div className="flex justify-between p-3 bg-secondary/20 rounded">
                <span className="text-sm font-medium">储存方式</span>
                <span className="text-sm">避光、阴凉处保存</span>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="text-center py-12">
              <p className="text-muted-foreground">该商品暂无评价</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
