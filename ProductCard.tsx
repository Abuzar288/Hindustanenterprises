
import React from 'react';
import { Product } from './types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1"
      aria-labelledby={`product-name-${product.id}`}
    >
      <div className="relative w-full h-56">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-full object-cover" 
        />
        {product.category && (
           <span className="absolute top-2 left-2 bg-teal-600 text-white text-xs font-semibold px-2 py-1 rounded">
            {product.category}
          </span>
        )}
      </div>
      <div className="p-5 flex-grow flex flex-col">
        <h3 id={`product-name-${product.id}`} className="text-lg md:text-xl font-semibold text-gray-800 mb-2 truncate" title={product.name}>
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 flex-grow min-h-[40px]">
          {product.description.substring(0, 70)}{product.description.length > 70 ? '...' : ''}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <p className="text-lg font-bold text-teal-700">
            {product.currency}{product.price.toFixed(2)}
          </p>
          {product.rating && (
            <div className="flex items-center text-sm text-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-current mr-1" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {product.rating.toFixed(1)}
            </div>
          )}
        </div>
        <button 
          className="mt-4 w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-75"
          onClick={() => alert(`Viewing details for ${product.name}`)}
          aria-label={`View details for ${product.name}`}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
