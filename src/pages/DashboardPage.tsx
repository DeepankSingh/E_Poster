import React, { useState } from 'react';
import { useSearchParams, Navigate } from 'react-router-dom';
import { User, ShoppingBag, Heart, MapPin, Settings, LogOut, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'profile';

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'wishlist', label: 'Wishlist', icon: Heart },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 89.97,
      items: [
        { name: 'Abstract Wave Poster', size: 'A3', quantity: 2, price: 24.99 },
        { name: 'Mountain Landscape', size: 'A2', quantity: 1, price: 39.99 }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-20',
      status: 'Processing',
      total: 34.99,
      items: [
        { name: 'Vintage Movie Poster', size: 'A4', quantity: 1, price: 19.99 },
      ]
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  value={user.name}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="Add phone number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Update Profile
              </button>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                Change Password
              </button>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
            
            {mockOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Order {order.id}</h3>
                    <p className="text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <div>
                        <span className="text-gray-900 font-medium">{item.name}</span>
                        <span className="text-gray-600 text-sm ml-2">({item.size})</span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-900">Qty: {item.quantity}</span>
                        <span className="text-gray-600 ml-4">${item.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    Total: ${order.total}
                  </span>
                  <div className="space-x-2">
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                      View Details
                    </button>
                    {order.status === 'Delivered' && (
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'wishlist':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">My Wishlist</h2>
            
            {wishlistItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
                <p className="text-gray-600">Save your favorite posters to keep track of them</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistItems.map((poster) => (
                  <div key={poster.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative">
                      <img
                        src={poster.image}
                        alt={poster.title}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => removeFromWishlist(poster.id)}
                        className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      >
                        <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                      </button>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-1">{poster.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{poster.category}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">${poster.price}</span>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="text-gray-600 text-sm ml-1">{poster.rating}</span>
                        </div>
                      </div>
                      <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 'addresses':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Saved Addresses</h2>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                Add New Address
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">Home</h3>
                    <p className="text-gray-600 mt-1">
                      123 Main Street<br />
                      New York, NY 10001<br />
                      United States
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">Edit</button>
                    <button className="text-red-600 hover:text-red-700 font-medium">Delete</button>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-gray-900">Office</h3>
                    <p className="text-gray-600 mt-1">
                      456 Business Ave<br />
                      New York, NY 10005<br />
                      United States
                    </p>
                  </div>
                  <div className="space-x-2">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">Edit</button>
                    <button className="text-red-600 hover:text-red-700 font-medium">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b">
                <div>
                  <h3 className="font-semibold text-gray-900">Email Notifications</h3>
                  <p className="text-gray-600 text-sm">Receive updates about orders and promotions</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              </div>
              
              <div className="flex items-center justify-between py-4 border-b">
                <div>
                  <h3 className="font-semibold text-gray-900">SMS Notifications</h3>
                  <p className="text-gray-600 text-sm">Get text messages about order updates</p>
                </div>
                <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              </div>
              
              <div className="flex items-center justify-between py-4 border-b">
                <div>
                  <h3 className="font-semibold text-gray-900">Marketing Emails</h3>
                  <p className="text-gray-600 text-sm">Receive emails about new products and sales</p>
                </div>
                <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              </div>
              
              <div className="pt-4">
                <button
                  onClick={logout}
                  className="flex items-center px-4 py-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-white font-bold text-xl">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900">{user.name}</h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
            </div>
            
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSearchParams({ tab: tab.id })}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;