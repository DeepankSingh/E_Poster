import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, ZoomIn, Minus, Plus, Share2, ArrowLeft } from 'lucide-react';
import { posters } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const [selectedSize, setSelectedSize] = useState('A4');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  
  const poster = posters.find(p => p.id === Number(id));
  const relatedPosters = posters.filter(p => p.category === poster?.category && p.id !== poster?.id).slice(0, 4);
  
  if (!poster) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Poster not found</h1>
        <Link to="/catalog" className="text-blue-600 hover:text-blue-700 mt-4 inline-block">
          Back to catalog
        </Link>
      </div>
    );
  }

  const sizePrices = {
    'A5': poster.price * 0.5,
    'A4': poster.price,
    'A3': poster.price * 1.5,
    'A2': poster.price * 2,
    'A1': poster.price * 3
  };

  const currentPrice = sizePrices[selectedSize as keyof typeof sizePrices];
  const isWishlisted = isInWishlist(poster.id);

  const handleAddToCart = () => {
    addToCart({
      ...poster,
      size: selectedSize,
      price: currentPrice
    }, quantity);
  };

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(poster.id);
    } else {
      addToWishlist(poster);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-blue-600">Catalog</Link>
          <span>/</span>
          <Link to={`/catalog/${poster.category.toLowerCase()}`} className="hover:text-blue-600">
            {poster.category}
          </Link>
          <span>/</span>
          <span className="text-gray-900">{poster.title}</span>
        </div>
      </nav>

      {/* Back Button */}
      <Link
        to="/catalog"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to catalog
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative">
            <div 
              className={`relative overflow-hidden rounded-lg ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <img
                src={poster.image}
                alt={poster.title}
                className={`w-full h-96 object-cover transition-transform duration-300 ${
                  isZoomed ? 'transform scale-150' : ''
                }`}
              />
              <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-lg">
                <ZoomIn className="w-5 h-5" />
              </div>
            </div>
          </div>
          
          {/* Room Preview */}
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Preview in Room</h3>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Room preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 p-2 rounded shadow-lg">
                  <img
                    src={poster.image}
                    alt={poster.title}
                    className="w-24 h-32 object-cover rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <span>{poster.category}</span>
              <span>•</span>
              <span>In Stock</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{poster.title}</h1>
            
            {/* Rating */}
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.floor(poster.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">({poster.rating}) • 124 reviews</span>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-gray-900 mb-6">
              ${currentPrice.toFixed(2)}
              {selectedSize !== 'A4' && (
                <span className="text-lg text-gray-600 font-normal ml-2">
                  (${poster.price} for A4)
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">
              This premium quality poster features high-resolution printing on professional-grade paper. 
              Perfect for decorating your home, office, or as a gift for art enthusiasts. Each poster 
              is carefully printed with fade-resistant inks to ensure long-lasting vibrancy.
            </p>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(sizePrices).map(([size, price]) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`p-3 border-2 rounded-lg text-center transition-colors ${
                    selectedSize === size
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-medium">{size}</div>
                  <div className="text-sm text-gray-600">${price.toFixed(2)}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="text-xl font-medium min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart - ${(currentPrice * quantity).toFixed(2)}
            </button>
            
            <div className="flex space-x-3">
              <button
                onClick={handleWishlistToggle}
                className={`flex-1 flex items-center justify-center px-6 py-3 border-2 font-semibold rounded-lg transition-colors ${
                  isWishlisted
                    ? 'border-red-500 text-red-500 bg-red-50 hover:bg-red-100'
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                <Heart className={`w-5 h-5 mr-2 ${isWishlisted ? 'fill-current' : ''}`} />
                {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </button>
              
              <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div className="border-t pt-6">
            <h3 className="font-semibold text-gray-900 mb-4">Product Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Material:</span>
                <span className="font-medium">Premium Photo Paper</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Finish:</span>
                <span className="font-medium">Matte</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-medium">200gsm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-medium">2-3 Business Days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedPosters.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedPosters.map(relatedPoster => (
              <Link
                key={relatedPoster.id}
                to={`/product/${relatedPoster.id}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={relatedPoster.image}
                    alt={relatedPoster.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                    {relatedPoster.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${relatedPoster.price}</span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-gray-600 text-sm ml-1">{relatedPoster.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;