import { useState, useEffect, useMemo, useCallback } from 'react';
import { ProductCard } from '../components/ProductCard';
import {
  fetchProducts,
  fetchCategories,
  type Product,
} from '../services/productService';
import { FiSearch, FiLoader } from 'react-icons/fi';
import { usePerformanceMonitor } from '../hooks/useOptimizedPerformance';

export const HomePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Performance monitoring
  usePerformanceMonitor();

  useEffect(() => {
    console.log('HomePage component mounted, starting data load...');
    const loadData = async () => {
      try {
        console.log('Fetching products and categories...');
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        console.log('Products loaded:', productsData.length);
        console.log('Categories loaded:', categoriesData);
        setProducts(productsData);
        setCategories(['all', ...categoriesData]);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        console.log('Loading complete, setting loading to false');
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMinPrice =
        !minPrice || product.price >= parseFloat(minPrice);
      const matchesMaxPrice =
        !maxPrice || product.price <= parseFloat(maxPrice);
      return (
        matchesCategory && matchesSearch && matchesMinPrice && matchesMaxPrice
      );
    });
  }, [products, selectedCategory, searchQuery, minPrice, maxPrice]);

  // Optimized event handlers with useCallback
  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('all');
    setMinPrice('');
    setMaxPrice('');
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
        <FiLoader className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      {/* Add top padding to account for fixed navbar */}
      <div className="pt-16">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12 sm:py-16 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557821552-17105176677c')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg">
                Welcome to EcoShop
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 text-gray-100">
                Discover Premium Quality at Unbeatable Prices
              </p>
              <div className="max-w-lg mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 rounded-full text-gray-900 bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 pl-10 sm:pl-12 text-sm sm:text-lg shadow-xl"
                  />
                  <FiSearch className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-600 w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Search and Filters Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 transition-colors duration-300 border border-gray-200 dark:border-gray-700">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Discover Amazing Products
            </h2>

            {/* Main Search and Filter Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              {/* Search Bar */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by title or description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 pl-8 sm:pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200 text-sm shadow-sm"
                  />
                  <FiSearch className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200 text-sm shadow-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all'
                        ? 'All Categories'
                        : category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Min Price
                </label>
                <input
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200 text-sm shadow-sm"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Max Price
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="flex-1 px-3 sm:px-4 py-2 sm:py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200 text-sm shadow-sm"
                    min="0"
                  />
                  <button
                    onClick={resetFilters}
                    className="px-3 sm:px-4 py-2 sm:py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 text-xs sm:text-sm font-medium shadow-sm whitespace-nowrap"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-6 flex justify-between items-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showing{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {filteredProducts.length}
                </span>{' '}
                of <span className="font-semibold">{products.length}</span>{' '}
                products
              </p>
              {(searchQuery ||
                selectedCategory !== 'all' ||
                minPrice ||
                maxPrice) && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-gray-500 dark:text-gray-400">
                    Active filters:
                  </span>
                  {searchQuery && (
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full">
                      "{searchQuery}"
                    </span>
                  )}
                  {selectedCategory !== 'all' && (
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 px-2 py-1 rounded-full">
                      {selectedCategory}
                    </span>
                  )}
                  {(minPrice || maxPrice) && (
                    <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded-full">
                      ${minPrice || '0'} - ${maxPrice || '∞'}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
          <div className="bg-gray-50/50 dark:bg-gray-800/30 rounded-xl p-4 sm:p-6 backdrop-blur-sm transition-colors duration-300">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {selectedCategory === 'all'
                  ? 'All Products'
                  : selectedCategory.charAt(0).toUpperCase() +
                    selectedCategory.slice(1)}
              </h2>
              <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full">
                {filteredProducts.length} products
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12 sm:py-16">
                <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
                  No products found. Try adjusting your search or category.
                </p>
              </div>
            ) : (
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 grid-performance"
                style={{ 
                  willChange: 'scroll-position',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)'
                }}
              >
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id}
                    className="optimized-render"
                    style={{ containIntrinsicSize: '320px' }}
                  >
                    <ProductCard
                      product={{
                        id: product.id,
                        name: product.title,
                        price: product.price,
                        description: product.description,
                        imageUrl: product.image,
                        category: product.category,
                        featured: product.rating?.rate
                          ? product.rating.rate > 4
                          : false,
                        rating: product.rating?.rate,
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
