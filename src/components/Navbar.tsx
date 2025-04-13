import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, ShoppingBag, User, X } from 'lucide-react';
import Logo from './Logo';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/context/AuthContext';
import UserMenu from './UserMenu';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { isAuthenticated } = useAuth();

  const scrollToSection = (sectionId: string) => {
    setMenuOpen(false); // Always close mobile menu
    
    // If we're already on the homepage
    if (location.pathname === '/') {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If we're on another page, navigate to homepage first
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  const goToHomePage = () => {
    setMenuOpen(false);
    
    // If already on home page, don't do anything
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // Navigate to home page
      navigate('/');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-noir/90 backdrop-blur-md border-b border-noir-50/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <button 
            className="mr-4 lg:hidden" 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X size={20} className="text-blanc" />
            ) : (
              <Menu size={20} className="text-blanc" />
            )}
          </button>
          
          <Link to="/" onClick={goToHomePage}>
            <Logo className="text-blanc" />
          </Link>
        </div>
        
        <div className="hidden lg:flex items-center space-x-8">
          <NavLink to="/" onClick={(e) => {
            e.preventDefault();
            goToHomePage();
          }}>探索</NavLink>
          
          <NavLink to="/products">商品</NavLink>
          
          <NavLink 
            to="/" 
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('chef-selection');
            }}
          >
            主厨精选
          </NavLink>
        </div>
        
        <div className="flex items-center space-x-5">
          {/* Search button temporarily disabled */}
          
          {isAuthenticated ? (
            <UserMenu />
          ) : (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/login')}
              className="hover:text-noir-100 transition-colors duration-200"
            >
              <User size={20} className="text-blanc" />
            </Button>
          )}
          
          <Link to="/cart" className="hover:text-noir-100 transition-colors duration-200 relative">
            <ShoppingBag size={20} className="text-blanc" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-blanc text-noir text-[10px] font-bold rounded-full flex items-center justify-center">
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-noir-900 border-b border-noir-300/20">
          <div className="container mx-auto py-4 px-4 flex flex-col space-y-4">
            <MobileNavLink 
              to="/" 
              onClick={(e) => {
                e.preventDefault();
                goToHomePage();
              }}
            >
              探索
            </MobileNavLink>
            
            <MobileNavLink to="/products" onClick={() => setMenuOpen(false)}>商品</MobileNavLink>
            
            <MobileNavLink 
              to="/" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('chef-selection');
              }}
            >
              主厨精选
            </MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
};

const NavLink = ({ to, children, onClick }: NavLinkProps) => {
  return (
    <Link 
      to={to} 
      className="text-blanc hover:text-noir-100 text-sm uppercase tracking-wider font-medium transition-colors duration-200"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

const MobileNavLink = ({ to, children, onClick }: NavLinkProps) => {
  return (
    <Link 
      to={to} 
      className="text-blanc hover:text-noir-100 text-base py-2 border-b border-noir-300/10 block"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;
