
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import FeaturedSection from '@/components/FeaturedSection';
import { products } from '@/data/products';

const Index = () => {
  const featuredProducts = products.filter(product => product.featured);
  const chefRecommended = products.filter(product => product.chefRecommended);
  const location = useLocation();
  
  useEffect(() => {
    // Check if we need to scroll to a section based on navigation state
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
        // Clean up the state to prevent scrolling on refresh
        window.history.replaceState({}, document.title);
      }, 100); // Small timeout to ensure the component is fully rendered
    }
  }, [location.state]);
  
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-background/90 via-background to-background"></div>
        
        {/* Background Image */}
        <div className="absolute inset-0 z-[-1]">
          <div className="w-full h-full bg-background">
            {/* Light mode background */}
            <div className="w-full h-full bg-gradient-to-br from-background via-background/80 to-background/90"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            探索味觉的黑白艺术
          </h1>
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-8">
            精选全球顶级食材，为您的味蕾带来极致体验
          </p>
          
          {/* Search Bar - Now disabled */}
          <div className="mt-8">
            <SearchBar />
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <p className="text-foreground/50 text-xs tracking-widest uppercase mb-2">向下滚动</p>
            <div className="w-[1px] h-8 bg-gradient-to-b from-foreground/50 to-transparent"></div>
          </div>
        </div>
      </section>
      
      {/* Featured Section - Added ID for scrolling */}
      <FeaturedSection 
        id="featured-section"
        title="今日主推" 
        description="精选顶级食材，打造专属味蕾体验"
        products={featuredProducts.slice(0, 3)} 
        showViewAll={true}
      />
      
      {/* Chef's Selection - Added ID for scrolling */}
      <FeaturedSection 
        id="chef-selection"
        title="主厨精选" 
        description="来自米其林星级主厨的专业推荐"
        products={chefRecommended.slice(0, 3)} 
        inverted={true}
        showViewAll={false}
      />
      
      {/* Philosophy Section */}
      <section className="py-20 bg-background text-foreground">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-10 md:mb-0">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <div className="w-full h-full bg-gradient-to-br from-background/50 to-background/90"></div>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 md:pl-16">
              <h2 className="text-3xl font-bold mb-6">品质与设计融合之美</h2>
              <p className="text-foreground/70 mb-6">
                我们相信，真正的奢华存在于细节之中。每一款产品都经过严格筛选，
                从源头到餐桌，追求极致纯粹的味觉体验。
              </p>
              <p className="text-foreground/70 mb-8">
                黑与白的对比不仅是视觉语言，更是我们对食材本真的追求。
                简约而不简单，每一口都是对感官的全新探索。
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-background text-foreground/60 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-foreground text-lg font-medium mb-4">关于我们</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-foreground transition-colors duration-200">品质承诺</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-200">加入我们</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-foreground text-lg font-medium mb-4">客户服务</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-foreground transition-colors duration-200">配送说明</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-200">退换政策</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-200">会员制度</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors duration-200">常见问题</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-foreground text-lg font-medium mb-4">联系我们</h3>
              <p className="mb-2">客服邮箱：service@noirgourmet.com</p>
              <p>客服热线：400-888-9999</p>
              
              <div className="mt-6">
                <p className="mb-2 text-sm">关注我们</p>
                <div className="flex space-x-4">
                  <a href="#" className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center hover:border-foreground transition-colors duration-200">
                    <span className="sr-only">微信</span>
                    W
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center hover:border-foreground transition-colors duration-200">
                    <span className="sr-only">微博</span>
                    W
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center hover:border-foreground transition-colors duration-200">
                    <span className="sr-only">Instagram</span>
                    I
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-foreground/10">
            <p className="text-center text-sm">© 2025 Noir Gourmet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
