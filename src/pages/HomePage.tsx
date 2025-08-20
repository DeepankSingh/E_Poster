import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp, Percent } from 'lucide-react';
import { posters } from '../data/mockData';

const HomePage = () => {
  const featuredPosters = posters.slice(0, 4);
  const trendingPosters = posters.slice(4, 8);
  const categories = [
    { name: 'Abstract', image: 'https://images.pexels.com/photos/1020315/pexels-photo-1020315.jpeg?auto=compress&cs=tinysrgb&w=600', count: '50+ Posters' },
    { name: 'Movies', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600', count: '200+ Posters' },
    { name: 'Sports', image: 'https://images.pexels.com/photos/358042/pexels-photo-358042.jpeg?auto=compress&cs=tinysrgb&w=600', count: '75+ Posters' },
    { name: 'Nature', image: 'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=600', count: '100+ Posters' },
    { name: 'Music', image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=600', count: '60+ Posters' },
    { name: 'Art', image: 'https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=600', count: '120+ Posters' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Transform Your Space with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">
                Premium Posters
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Discover thousands of high-quality posters across all categories. From abstract art to movie classics, 
              find the perfect piece to express your style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/catalog"
                className="inline-flex items-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/catalog/trending"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-200"
              >
                View Trending
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-1/2 h-full opacity-20">
          <img
            src="https://images.pexels.com/photos/1579708/pexels-photo-1579708.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Hero"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Posters</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Hand-picked selections from our most popular and highest-rated posters
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredPosters.map((poster) => (
              <Link
                key={poster.id}
                to={`/product/${poster.id}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={poster.image}
                    alt={poster.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Star className="w-3 h-3 mr-1" fill="currentColor" />
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {poster.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{poster.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">${poster.price}</span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-gray-600 text-sm ml-1">{poster.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our diverse collection organized by themes and styles
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={`/catalog/${category.name.toLowerCase()}`}
                className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                  <p className="text-gray-200 text-sm">{category.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Trending Now</h2>
              <p className="text-gray-600 text-lg">Most popular posters this week</p>
            </div>
            <Link
              to="/catalog?sort=trending"
              className="hidden md:flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trendingPosters.map((poster, index) => (
              <Link
                key={poster.id}
                to={`/product/${poster.id}`}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={poster.image}
                    alt={poster.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      #{index + 1}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {poster.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{poster.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">${poster.price}</span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-gray-600 text-sm ml-1">{poster.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 md:hidden">
            <Link
              to="/catalog?sort=trending"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
            >
              View All Trending <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <Percent className="w-8 h-8 mr-3" />
                <span className="text-lg font-semibold">Limited Time Offer</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Get 25% Off on Your First Order
              </h2>
              <p className="text-xl text-orange-100 mb-8 leading-relaxed">
                Start your poster collection with amazing savings. Use code FIRST25 at checkout.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/catalog"
                  className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <div className="flex items-center px-8 py-4 border-2 border-white/50 rounded-lg">
                  <span className="text-lg font-mono font-bold">FIRST25</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1579708/pexels-photo-1579708.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Special Offer"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;