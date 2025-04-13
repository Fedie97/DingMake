
import React from 'react';
import { ShoppingBag, ArrowRight, X, ShoppingBasket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const CartPage = () => {
  const { cart, clearCart } = useCart();
  const { items, total } = cart;
  
  const handleCheckout = () => {
    toast.success('订单已提交', {
      description: '您的订单已成功提交，我们将尽快处理',
    });
    clearCart();
  };

  // If cart is empty, show empty state
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 pt-32 h-screen flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background border border-border mb-4">
            <ShoppingBag size={32} className="text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">您的购物车是空的</h1>
          <p className="text-muted-foreground mb-6">开始添加商品，探索我们的精选产品</p>
          <Button asChild>
            <Link to="/products">浏览商品</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-28 mb-16">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <ShoppingBag className="mr-3" size={24} />
        购物车
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items - Left Column */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h2 className="font-bold">
                已选商品 ({items.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                    <X size={16} className="mr-1" />
                    清空购物车
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>是否清空购物车？</AlertDialogTitle>
                    <AlertDialogDescription>
                      此操作将移除购物车中的所有商品，此操作不可撤销。
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>取消</AlertDialogCancel>
                    <AlertDialogAction onClick={clearCart} className="bg-red-500 text-white hover:bg-red-600">
                      确认清空
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
            
            <div className="divide-y divide-border">
              {items.map(item => (
                <CartItem key={item.product.id} item={item} />
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" asChild>
              <Link to="/products">
                继续选购
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Order Summary - Right Column */}
        <div className="sticky top-24">
          <div className="bg-card border border-border rounded-lg p-4">
            <h2 className="font-bold text-lg mb-4">订单摘要</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">商品总价</span>
                <span>¥{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">运费</span>
                <span>{total > 100 ? '免运费' : '¥20.00'}</span>
              </div>
              <div className="h-px bg-border my-3"></div>
              <div className="flex justify-between font-bold">
                <span>订单总计</span>
                <span>¥{(total > 100 ? total : total + 20).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Button className="w-full py-6 text-lg" onClick={handleCheckout}>
                结算订单
                <ArrowRight className="ml-2" size={18} />
              </Button>
              <p className="text-xs text-center text-muted-foreground mt-3">
                继续操作即表示您同意我们的条款和条件
              </p>
            </div>
          </div>
          
          <div className="mt-4 bg-card border border-border rounded-lg p-4">
            <h3 className="font-medium mb-2">订单备注</h3>
            <textarea 
              className="w-full border border-border rounded p-2 text-sm" 
              placeholder="特殊说明或配送要求..."
              rows={3}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
