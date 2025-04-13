
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { CakeSlice, UtensilsCrossed } from 'lucide-react';

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  const [hovering, setHovering] = useState(false);

  return (
    <div 
      className={cn("logo-container relative flex items-center", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="w-[120px] h-[60px] flex items-center justify-center relative">
        <div className={cn(
          "flex items-center gap-1.5 transition-all duration-300", 
          hovering ? "scale-105" : ""
        )}>
          <CakeSlice size={22} className="text-blanc" />
          <span className="text-blanc font-bold text-xl tracking-wide">Ding Make</span>
          <UtensilsCrossed size={18} className="text-blanc opacity-80" />
        </div>
        
        {hovering && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-noir-50/10 to-transparent animate-pulse-subtle" />
        )}
      </div>
    </div>
  );
};

export default Logo;
