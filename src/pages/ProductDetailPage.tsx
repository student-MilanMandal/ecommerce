import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiShoppingCart, FiHeart, FiShare2, FiTruck, FiShield, FiRefreshCw, FiStar, FiChevronLeft, FiPlus, FiMinus } from 'react-icons/fi';
import { products } from '../data/products';
import { addToCart, removeFromCart, decreaseQuantity } from '../store/cartSlice';
import type { RootState } from '../store/store';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  const product = products.find(p => p.id === parseInt(id || '0'));
  const cartItem = useSelector((state: RootState) => 
    state.cart.items.find(item => item.id === product?.id)
  );

  // Related products (same category)
  const relatedProducts = products.filter(p => 
    p.category === product?.category && p.id !== product?.id
  ).slice(0, 4);

  const productImages = product ? [
    product.imageUrl,
    product.imageUrl, // In a real app, you'd have multiple images
    product.imageUrl,
    product.imageUrl
  ] : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Product not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiChevronLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
    setQuantity(1);
  };

  const handleIncreaseQuantity = () => {
    dispatch(addToCart(product));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(product.id));
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
  };

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    // Here you would typically save to localStorage or backend
  };

  const handleShare = () => {
    setShowShareMenu(!showShareMenu);
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        setIsShared(true);
        setTimeout(() => setIsShared(false), 2000);
      });
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <div className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-gray-50 dark:bg-gray-800 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Home
              </Link>
              <span className="text-gray-500 dark:text-gray-400">/</span>
              <Link to="/products" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                Products
              </Link>
              <span className="text-gray-500 dark:text-gray-400">/</span>
              <span className="text-gray-900 dark:text-white font-medium capitalize">
                {product.category}
              </span>
              <span className="text-gray-500 dark:text-gray-400">/</span>
              <span className="text-gray-900 dark:text-white font-medium truncate">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Product Detail */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden shadow-xl border-2 border-gray-200 dark:border-gray-600">
                <img
                  src={productImages[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 cursor-zoom-in"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&crop=center";
                  }}
                />
              </div>
              
              {/* Image Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-xl overflow-hidden transition-all duration-300 border-3 ${
                      selectedImage === index
                        ? 'border-blue-500 shadow-xl transform scale-105 ring-4 ring-blue-200 dark:ring-blue-800'
                        : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-lg hover:scale-105'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center";
                      }}
                    />
                  </button>
                ))}
              </div>
              
              {/* Image Navigation Info */}
              <div className="text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedImage + 1} of {productImages.length} images
                </p>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm px-3 py-1 rounded-full capitalize font-medium">
                    {product.category}
                  </span>
                  {product.featured && (
                    <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                      ⭐ Featured
                    </span>
                  )}
                </div>
                
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {product.name}
                </h1>
                
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <FiStar
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating || 0)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {product.rating}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      (324 reviews)
                    </span>
                  </div>
                )}
                
                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-2xl text-gray-500 line-through">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                  {product.discount && (
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-3 py-1 rounded-full text-sm font-medium">
                      Save {product.discount}%
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Product Description
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Cart Actions */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 space-y-4">
                {!cartItem ? (
                  <div>
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 mb-4">
                      <label className="text-lg font-semibold text-gray-900 dark:text-white">
                        Quantity:
                      </label>
                      <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg border border-gray-300 dark:border-gray-600">
                        <button
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors rounded-l-lg"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="px-6 py-3 font-semibold text-lg min-w-[60px] text-center">
                          {quantity}
                        </span>
                        <button
                          onClick={() => setQuantity(quantity + 1)}
                          className="p-3 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors rounded-r-lg"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-3"
                    >
                      <FiShoppingCart className="w-6 h-6" />
                      Add {quantity > 1 ? `${quantity} Items` : 'Item'} to Cart
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="text-center py-3 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg font-semibold">
                      ✓ Item in cart ({cartItem.quantity} items)
                    </div>
                    
                    {/* Cart Controls */}
                    <div className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-lg p-3 border border-gray-300 dark:border-gray-600">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={handleDecreaseQuantity}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors text-red-600"
                        >
                          <FiMinus className="w-5 h-5" />
                        </button>
                        <span className="font-bold text-xl min-w-[40px] text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={handleIncreaseQuantity}
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors text-green-600"
                        >
                          <FiPlus className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <button
                        onClick={handleRemoveFromCart}
                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors font-medium"
                      >
                        Remove All
                      </button>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={handleWishlistToggle}
                    className={`flex items-center justify-center gap-3 py-4 px-4 border-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                      isWishlisted 
                        ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 shadow-lg' 
                        : 'border-gray-300 dark:border-gray-600 hover:border-pink-400 dark:hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/10 hover:text-pink-600 dark:hover:text-pink-400'
                    }`}
                  >
                    <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                    <span className="text-base">{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                  </button>
                  
                  <div className="relative">
                    <button 
                      onClick={handleShare}
                      className={`w-full flex items-center justify-center gap-3 py-4 px-4 border-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                        isShared 
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 shadow-lg' 
                          : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/10 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      <FiShare2 className="w-5 h-5" />
                      <span className="text-base">{isShared ? 'Link Copied!' : 'Share Product'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <FiTruck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      Free Shipping
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs">
                      On orders over $50
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <FiShield className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      Warranty
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs">
                      2 year warranty
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <FiRefreshCw className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      Easy Returns
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs">
                      30-day returns
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <div className="mt-16">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="flex space-x-8">
                {[
                  { id: 'description', label: 'Description' },
                  { id: 'specifications', label: 'Specifications' },
                  { id: 'reviews', label: 'Reviews (324)' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-lg transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-8">
              {activeTab === 'description' && (
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                    {product.description}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mt-4">
                    This high-quality product is designed to meet your needs with premium materials and expert craftsmanship. 
                    Whether you're looking for durability, style, or functionality, this item delivers on all fronts.
                  </p>
                </div>
              )}
              
              {activeTab === 'specifications' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                      General
                    </h4>
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">Category:</dt>
                        <dd className="text-gray-900 dark:text-white capitalize">{product.category}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">Brand:</dt>
                        <dd className="text-gray-900 dark:text-white">EcoShop</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">SKU:</dt>
                        <dd className="text-gray-900 dark:text-white">ESH-{product.id.toString().padStart(4, '0')}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                      Details
                    </h4>
                    <dl className="space-y-3">
                      <div className="flex justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">Rating:</dt>
                        <dd className="text-gray-900 dark:text-white">{product.rating}/5 stars</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">Availability:</dt>
                        <dd className="text-green-600 dark:text-green-400">In Stock</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600 dark:text-gray-400">Shipping:</dt>
                        <dd className="text-gray-900 dark:text-white">2-3 business days</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              )}
              
              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="text-center py-12">
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      Customer reviews feature coming soon!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Related Products
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(relatedProduct => (
                  <ProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
