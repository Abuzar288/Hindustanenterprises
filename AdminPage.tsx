
import React, { useState, FormEvent, ChangeEvent, useEffect } from 'react';
import { Product } from './types';
import ProductCard from './ProductCard'; // Import ProductCard

interface AdminPageProps {
  onAddProduct: (product: Product) => void;
  allProducts: Product[]; // New prop to receive all products
}

const PRODUCT_CATEGORIES = [
  "KITCHEN PRODUCTS", 
  "FURNITURE", 
  "HARDWARE", 
  "BATHROOM", 
  "KITCHEN & BAR", 
  "DECOR & ACCENT"
];

const AdminPage: React.FC<AdminPageProps> = ({ onAddProduct, allProducts }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState(PRODUCT_CATEGORIES[0]); // Default to the first category
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    // Cleanup object URL
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (imagePreviewUrl) {
      URL.revokeObjectURL(imagePreviewUrl);
      setImagePreviewUrl(null);
    }
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setImageFile(null);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormMessage(null);

    if (!name || !description || !price || !quantity || !category || !imageFile) {
      setFormMessage({ type: 'error', text: 'All fields, including an image, are required.' });
      return;
    }

    const priceValue = parseFloat(price);
    const quantityValue = parseInt(quantity, 10);

    if (isNaN(priceValue) || priceValue <= 0) {
      setFormMessage({ type: 'error', text: 'Please enter a valid price.' });
      return;
    }
    if (isNaN(quantityValue) || quantityValue < 0) {
      setFormMessage({ type: 'error', text: 'Please enter a valid quantity.' });
      return;
    }

    // Convert image to base64
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onloadend = () => {
      const base64ImageUrl = reader.result as string;
      
      const newProduct: Product = {
        id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`, // Unique enough for mock
        name,
        description,
        price: priceValue,
        currency: 'USD', // Assuming USD for now
        imageUrl: base64ImageUrl,
        category,
        stock: quantityValue,
      };

      onAddProduct(newProduct);
      setFormMessage({ type: 'success', text: `Product "${name}" published successfully!` });

      // Reset form
      setName('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setCategory(PRODUCT_CATEGORIES[0]); // Reset to default category
      setImageFile(null);
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
      setImagePreviewUrl(null);
      const fileInput = document.getElementById('productImage') as HTMLInputElement;
      if(fileInput) fileInput.value = "";

    };
    reader.onerror = () => {
      setFormMessage({ type: 'error', text: 'Failed to process image. Please try again.' });
    };
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-2xl mx-auto p-6 md:p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-teal-700 mb-6 text-center">Add New Product</h2>
        
        {formMessage && (
          <div className={`mb-4 p-3 rounded-md text-sm ${formMessage.type === 'success' ? 'bg-green-100 border border-green-300 text-green-700' : 'bg-red-100 border border-red-300 text-red-700'}`}>
            {formMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input type="text" id="productName" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"/>
            </div>
            <div>
              <label htmlFor="productCategory" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select 
                id="productCategory" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 bg-white"
              >
                {PRODUCT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea id="productDescription" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} required className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <div>
              <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
              <input type="number" id="productPrice" value={price} onChange={(e) => setPrice(e.target.value)} required step="0.01" min="0" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"/>
            </div>
            <div>
              <label htmlFor="productQuantity" className="block text-sm font-medium text-gray-700 mb-1">Quantity (Stock)</label>
              <input type="number" id="productQuantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required step="1" min="0" className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"/>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
            <input type="file" id="productImage" accept="image/*" onChange={handleImageChange} required className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"/>
            <p className="mt-1 text-xs text-gray-500">
              For best display, use 4:3 aspect ratio images (e.g., 400x300, 800x600 pixels).
            </p>
            {imagePreviewUrl && (
              <div className="mt-4 border rounded-md p-2 inline-block">
                <img src={imagePreviewUrl} alt="Image Preview" className="max-h-48 max-w-full object-contain rounded"/>
                <p className="text-xs text-gray-500 mt-1 text-center">Image Preview</p>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2.5 px-4 rounded-md shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-75"
          >
            Publish Product
          </button>
        </form>
      </div>

      {/* Display Published Products */}
      <div className="mt-12">
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center md:text-left">
          Currently Published Products ({allProducts.length})
        </h3>
        {allProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {allProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center py-10">No products have been published yet.</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
