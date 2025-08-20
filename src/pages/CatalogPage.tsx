import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Grid, List, Filter, Search, Star, Heart } from 'lucide-react';
import { posters } from '../data/mockData';
import { useWishlist } from '../contexts/WishlistContext';

const CatalogPage = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popularity');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 200 });
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const searchQuery = searchParams.get('search') || '';
  
  // Filter and sort posters
  const filteredPosters = posters.filter(poster => {
    const matchesCategory = !category || poster.category.toLowerCase() === category.toLowerCase();
    const matchesSearch = !searchQuery || 
      poster.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      poster.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = poster.price >= priceRange.min && poster.price <= priceRange.max;
    const matchesSize = selectedSizes.length === 0 || selectedSizes.some(size => poster.sizes.includes(size));
    
    return matchesCategory && matchesSearch && matchesPrice && matchesSize;
  });

  const sortedPosters = [...filteredPosters].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return b.rating - a.rating; // popularity
    }
  });

  const categories = ['Abstract', 'Movies', 'Sports', 'Motivational', 'Nature', 'Music', 'Art'];
  const sizes = ['A5', 'A4', 'A3', 'A2', 'A1'];

  const handleSizeToggle = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleWishlistToggle = (poster: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(poster.id)) {
      removeFromWishlist(poster.id);
    } else {
      addToWishlist(poster);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Posters` : 'All Posters'}
            {searchQuery && ` - "${searchQuery}"`}
          </h1>
          <p className="text-gray-600">{sortedPosters.length} posters found</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm' : ''}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow-sm' : ''}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="popularity">Most Popular</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
            <option value="newest">Newest First</option>
          </select>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              <Link
                to="/catalog"
                className={`block p-2 rounded hover:bg-gray-100 transition-colors ${!category ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
              >
                All Categories
              </Link>
              {categories.map(cat => (
                <Link
                  key={cat}
                  to={`/catalog/${cat.toLowerCase()}`}
                  className={`block p-2 rounded hover:bg-gray-100 transition-colors ${
                    category === cat.toLowerCase() ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Min Price</label>
                <input
                  type="number"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Max Price</label>
                <input
                  type="number"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-900 mb-4">Sizes</h3>
            <div className="space-y-2">
              {sizes.map(size => (
                <label key={size} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => handleSizeToggle(size)}
                    className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-700">{size}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className="flex-1">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedPosters.map(poster => (
                <Link
                  key={poster.id}
                  to={`/product/${poster.id}`}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={poster.image}
                      alt={poster.title}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => handleWishlistToggle(poster, e)}
                      className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    >
                      <Heart 
                        className={`w-5 h-5 ${isInWishlist(poster.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                      />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {poster.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{poster.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">${poster.price}</span>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-gray-600 text-sm ml-1">{poster.rating}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {sortedPosters.map(poster => (
                <Link
                  key={poster.id}
                  to={`/product/${poster.id}`}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex"
                >
                  <div className="relative w-48 h-32 overflow-hidden">
                    <img
                      src={poster.image}
                      alt={poster.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 p-6 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                        {poster.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">{poster.category}</p>
                      <div className="flex items-center text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-gray-600 text-sm ml-1">{poster.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-2xl font-bold text-gray-900">${poster.price}</span>
                      <button
                        onClick={(e) => handleWishlistToggle(poster, e)}
                        className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        <Heart 
                          className={`w-5 h-5 ${isInWishlist(poster.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                        />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {sortedPosters.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No posters found</h3>
              <p className="text-gray-600">Try adjusting your filters or search terms</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;