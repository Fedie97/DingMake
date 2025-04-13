
import { products } from '@/data/products';
import ProductGrid from '@/components/ProductGrid';
import { cn } from '@/lib/utils';

const ProductsPage = () => {
  return (
    <div className={cn(
      "container mx-auto px-4 py-8",
      "min-h-screen bg-white text-black"
    )}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          我们的精选商品
        </h1>
        <p className="text-muted-foreground mt-2">
          发现来自全球的顶级食材和厨房珍品
        </p>
      </div>
      
      <ProductGrid products={products} />
    </div>
  );
};

export default ProductsPage;
