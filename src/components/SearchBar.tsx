
import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);

  // Note: SearchBar component is temporarily non-functional
  // Will be updated in future implementation
  return (
    <div 
      className={`
        glass px-4 py-3 rounded-full flex items-center transition-all duration-300 w-full max-w-lg mx-auto
        ${isFocused ? 'ring-1 ring-white/50' : 'hover:ring-1 hover:ring-white/30'}
      `}
    >
      <Search size={20} className="text-white mr-3 opacity-80" />
      <input
        type="text"
        placeholder="搜索甜品、美食、厨师推荐..."
        className="bg-transparent text-white placeholder-white/50 outline-none w-full"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        // Input disabled temporarily
        disabled={true}
      />
    </div>
  );
};

export default SearchBar;
