import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Heart, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartItems } = useCart();
  const { user, logout } = useAuth();
  const { wishlistItems } = useWishlist();
  const navigate = useNavigate();

  const categories = [
    'Abstract', 'Movies', 'Sports', 'Motivational', 'Nature', 'Music', 'Art'
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="text-2xl font-bold text-gray-800">PosterHub</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search posters..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </form>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors">
                  <User className="w-5 h-5" />
                  <span className="hidden lg:inline">{user.name}</span>
                </button>
                <div className="absolute right-0 top-8 bg-white shadow-lg rounded-lg py-2 min-w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to="/dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Dashboard</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-600 transition-colors">
                <User className="w-5 h-5" />
              </Link>
            )}

            <Link to="/dashboard?tab=wishlist" className="relative text-gray-700 hover:text-blue-600 transition-colors">
              <Heart className="w-5 h-5" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            <Link to="/cart" className="relative text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Categories Navigation - Desktop */}
        <nav className="hidden md:flex py-2 border-t border-gray-100">
          <Link to="/catalog" className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">
            All Posters
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              to={`/catalog/${category.toLowerCase()}`}
              className="px-4 py-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {category}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            {/* Search Bar - Mobile */}
            <form onSubmit={handleSearch} className="p-4 border-b border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posters..."
                  className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </form>

            {/* Categories - Mobile */}
            <nav className="py-2">
              <Link
                to="/catalog"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:text-blue-600 font-medium"
              >
                All Posters
              </Link>
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/catalog/${category.toLowerCase()}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600"
                >
                  {category}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;