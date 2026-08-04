import { Search, ShoppingCart, User, Heart, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartStore } from '../../store/useCartStore';
import { useAuth } from '../../context/AuthContext';

export const Navbar = () => {
  const cartItems = useCartStore((state) => state.items);
  const { isAdmin, user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="text-2xl font-black text-[#064e3b] font-display">
            CHINA<span className="text-gray-900">BAZAR</span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input type="text" placeholder="Search premium products..." className="w-full bg-gray-100 border-none rounded-full py-2 px-5 outline-none focus:ring-2 focus:ring-[#064e3b]" />
              <Search className="absolute right-4 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {isAdmin && <Link to="/admin" className="text-xs font-bold text-[#064e3b] border border-[#064e3b] px-2 py-1 rounded">ADMIN</Link>}
            <Link to="/wishlist" className="hidden sm:block"><Heart className="w-6 h-6 text-gray-600 hover:text-[#064e3b]" /></Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600 hover:text-[#064e3b]" />
              {cartItems.length > 0 && <span className="absolute -top-2 -right-2 bg-[#064e3b] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold">{cartItems.length}</span>}
            </Link>
            <Link to={user ? "/profile" : "/login"}><User className="w-6 h-6 text-gray-600 hover:text-[#064e3b]" /></Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
