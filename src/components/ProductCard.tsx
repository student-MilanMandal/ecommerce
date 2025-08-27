import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiShoppingCart } from 'react-icons/fi';
import type { Product } from '../data/products';
import {
  addToCart,
  removeFromCart,
  decreaseQuantity,
} from '../store/cartSlice';
import type { RootState } from '../store/store';

interface ProductCardProps {
  product: Product;
}

const ProductCardComponent = ({ product }: ProductCardProps) => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.id === product.id)
  );

  // Event handlers with simple, readable names
  const handleAddToCart = () => {
    dispatch(addToCart(product));
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

  // Clean, readable styles - responsive card height
  const cardStyles = {
    minHeight: '320px', // Further reduced for mobile
    maxWidth: '100%',
  };

  const imageStyles = {
    height: '180px', // Reduced for mobile
    borderRadius: '16px 16px 0 0',
  };

  return (
    <div
      className="card-container bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:border-blue-400 dark:hover:border-blue-500 transform group w-full flex flex-col"
      style={cardStyles}
    >
      {/* Product Image Link */}
      <Link
        to={`/product/${product.id}`}
        className="block relative flex-shrink-0"
        style={{ height: imageStyles.height }}
      >
        <div className="relative w-full h-full overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-t-2xl">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          {/* Featured Badge */}
          {product.featured && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg backdrop-blur-sm border border-white/20">
              ⭐ Featured
            </div>
          )}

          {/* Discount Badge */}
          {product.discount && product.discount > 0 && (
            <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
              -{product.discount}%
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        </div>
      </Link>

      <div className="card-body p-2 sm:p-3 md:p-4 flex flex-col flex-grow justify-between">
        <div className="content-section space-y-2 sm:space-y-3">
          <Link to={`/product/${product.id}`} className="block">
            <h3
              className="product-title text-sm sm:text-base font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-snug line-clamp-2"
              style={{
                minHeight: '40px',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.name}
            </h3>
          </Link>

          <div className="category-badge">
            <span className="inline-block bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 text-xs px-2 sm:px-3 py-1 sm:py-1.5 rounded-full capitalize border border-blue-200 dark:border-blue-700 font-medium tracking-wide">
              {product.category}
            </span>
          </div>
        </div>

        <div className="bottom-section space-y-2 sm:space-y-3 mt-3 sm:mt-4">
          <div className="price-rating-section flex justify-between items-center">
            <div className="price-container">
              <div className="current-price text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </div>
              {product.oldPrice && (
                <div className="old-price text-xs text-gray-500 line-through">
                  Was ${product.oldPrice.toFixed(2)}
                </div>
              )}
            </div>

            <div className="rating-section flex flex-col items-end">
              {product.rating && (
                <div className="rating-badge flex items-center bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-yellow-900/20 dark:to-amber-900/20 px-2 py-1 rounded-full border border-yellow-200 dark:border-yellow-700 shadow-sm">
                  <span className="rating-text text-yellow-700 dark:text-yellow-300 font-medium mr-1 text-xs">
                    {product.rating}
                  </span>
                  <span className="star-icon text-yellow-500 text-xs">★</span>
                </div>
              )}
            </div>
          </div>

          <div className="action-section pt-2">
            {!cartItem ? (
              <button
                onClick={handleAddToCart}
                className="add-to-cart-btn w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-2 sm:py-2.5 px-3 sm:px-4 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 font-semibold shadow-lg text-xs sm:text-sm"
              >
                <FiShoppingCart className="cart-icon w-3 h-3 sm:w-4 sm:h-4" />
                <span>Add to Cart</span>
              </button>
            ) : (
              <div className="cart-controls-horizontal flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg p-1 sm:p-1.5 shadow-sm border border-gray-200 dark:border-gray-600">
                {/* Quantity Controls - Mobile Responsive */}
                <div className="quantity-controls-inline flex items-center bg-white dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm">
                  <button
                    onClick={handleDecreaseQuantity}
                    className="decrease-btn-inline flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 text-gray-600 dark:text-gray-300 hover:text-red-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 rounded-l-md font-bold text-sm sm:text-lg"
                  >
                    -
                  </button>
                  <div className="quantity-display-inline px-2 sm:px-3 py-1 sm:py-1.5 font-bold text-gray-800 dark:text-white text-xs sm:text-sm bg-gray-50 dark:bg-gray-800 border-x border-gray-300 dark:border-gray-600 min-w-[30px] sm:min-w-[40px] text-center">
                    {cartItem.quantity}
                  </div>
                  <button
                    onClick={handleIncreaseQuantity}
                    className="increase-btn-inline flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 text-gray-600 dark:text-gray-300 hover:text-green-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 rounded-r-md font-bold text-sm sm:text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Remove Link - Mobile Responsive */}
                <button
                  onClick={handleRemoveFromCart}
                  className="remove-link text-red-500 hover:text-red-700 text-xs sm:text-sm font-medium transition-colors duration-200 hover:bg-red-50 dark:hover:bg-red-900/20 px-1 sm:px-2 py-1 rounded"
                >
                  remove
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Export with memo for performance optimization
export const ProductCard = memo(ProductCardComponent);
