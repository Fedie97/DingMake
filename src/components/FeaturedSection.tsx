
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { Product } from '../data/products';
import { Link } from 'react-router-dom';

type FeaturedSectionProps = {
  title: string;
  description?: string;
  products: Product[];
  inverted?: boolean;
  showViewAll?: boolean;
  id?: string; // Add an optional ID prop for scrolling
};

const FeaturedSection = ({ 
  title, 
  description,
  products,
  inverted = false,
  showViewAll = true,
  id // Use the ID if provided
}: FeaturedSectionProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  return (
    <section id={id} className={`py-16 ${inverted ? 'bg-background text-foreground' : 'bg-background text-foreground'}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
            {description && (
              <p className="text-sm md:text-base opacity-70">{description}</p>
            )}
          </div>
          
          {showViewAll && (
            <Link 
              to="/products" 
              className={`
                mt-4 md:mt-0 inline-flex items-center text-sm font-medium
                ${inverted ? 'hover:text-foreground/70' : 'hover:text-foreground/70'}
                transition-colors duration-200
              `}
            >
              查看全部 
              <ArrowRight size={16} className="ml-2" />
            </Link>
          )}
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id}
              product={product}
              className={`
                transition-all duration-500 
                ${hoveredIndex !== null && hoveredIndex !== index ? 'opacity-60' : 'opacity-100'}
              `}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
