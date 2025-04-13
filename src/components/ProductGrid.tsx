
import { useState } from 'react';
import { ChevronDown, Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../data/products';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem 
} from './ui/dropdown-menu';
import { 
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from './ui/collapsible';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

type ProductGridProps = {
  products: Product[];
};

type SortOption = 'featured' | 'price-asc' | 'price-desc';

const ProductGrid = ({ products }: ProductGridProps) => {
  const [sortOption, setSortOption] = useState<SortOption>('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Get unique categories from products
  const categories = Array.from(new Set(products.map(product => product.category)));

  // Handle sorting
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === 'price-asc') {
      return a.price - b.price;
    } else if (sortOption === 'price-desc') {
      return b.price - a.price;
    }
    return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
  });

  // Handle filtering
  const filteredProducts = selectedCategory 
    ? sortedProducts.filter(product => product.category === selectedCategory)
    : sortedProducts;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header with sort and filter controls */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">精选商品</h1>
        
        <div className="flex items-center space-x-3">
          {/* Filter trigger - mobile */}
          <Button 
            variant="outline" 
            size="sm" 
            className="md:hidden flex items-center"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <Filter size={16} className="mr-2" />
            筛选
          </Button>
          
          {/* Sort dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
                <ArrowUpDown size={14} className="mr-2" />
                {sortOption === 'featured' && '推荐排序'}
                {sortOption === 'price-asc' && '价格低到高'}
                {sortOption === 'price-desc' && '价格高到低'}
                <ChevronDown size={14} className="ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortOption('featured')}>
                推荐排序
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('price-asc')}>
                价格低到高
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption('price-desc')}>
                价格高到低
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Filter button - desktop */}
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex items-center"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <SlidersHorizontal size={16} className="mr-2" />
            高级筛选
          </Button>
        </div>
      </div>
      
      {/* Filter panel (collapsible) */}
      <Collapsible open={isFilterOpen} onOpenChange={setIsFilterOpen} className="mb-6">
        <CollapsibleContent>
          <div className="p-4 bg-secondary/50 rounded-lg mb-6">
            <h2 className="text-sm font-medium mb-3">分类筛选</h2>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={selectedCategory === null ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                全部
              </Badge>
              {categories.map(category => (
                <Badge 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Product grid with waterfall layout */}
      <div className={cn(
        "grid gap-6 transition-all duration-300",
        "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      )}>
        {filteredProducts.map((product, index) => (
          <ProductCard 
            key={product.id} 
            product={product}
            className={cn(
              "transition-all duration-500",
              hoveredIndex !== null && hoveredIndex !== index ? "opacity-70" : "opacity-100"
            )}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>
      
      {/* Empty state */}
      {filteredProducts.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 mb-4 opacity-30">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3L4 9V21H20V9L12 3Z" />
              <path d="M9 21V17C9 15.8954 9.89543 15 11 15H13C14.1046 15 15 15.8954 15 17V21" />
            </svg>
          </div>
          <h3 className="text-lg font-medium mb-2">暂无相关商品</h3>
          <p className="text-muted-foreground">请尝试其他筛选条件</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => {
              setSelectedCategory(null);
              setSortOption('featured');
            }}
          >
            重置筛选
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
