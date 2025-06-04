
import React, { useState, useEffect } from 'react';
import Header from './Header';
import ProductCard from './ProductCard';
import ContentCard from './ContentCard';
import LoginForm from './LoginForm';
import AdminPage from './AdminPage'; // New import
import { Product, ContentItem, WelcomeContent } from './types';
import { fetchProducts as fetchInitialProducts, fetchContentItems, fetchWelcomeContent } from './api';
import { useAuth } from './AuthContext';

type AuthView = 'none' | 'login'; // Removed 'register'

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [welcomeContent, setWelcomeContent] = useState<WelcomeContent | null>(null);
  
  const [productsLoading, setProductsLoading] = useState<boolean>(true);
  const [contentLoading, setContentLoading] = useState<boolean>(true);
  const [welcomeLoading, setWelcomeLoading] = useState<boolean>(true);

  const [productsError, setProductsError] = useState<string | null>(null);
  const [contentError, setContentError] = useState<string | null>(null);
  const [welcomeError, setWelcomeError] = useState<string | null>(null);

  const [authView, setAuthView] = useState<AuthView>('none');
  const { currentUser, isLoading: authIsLoading } = useAuth();

  useEffect(() => {
    const loadPublicData = () => {
      setWelcomeLoading(true);
      fetchWelcomeContent()
        .then(data => setWelcomeContent(data))
        .catch(() => setWelcomeError('Failed to load welcome message.'))
        .finally(() => setWelcomeLoading(false));

      setProductsLoading(true);
      fetchInitialProducts() 
        .then(data => setProducts(data))
        .catch(() => setProductsError('Failed to load products. Please try again later.'))
        .finally(() => setProductsLoading(false));

      setContentLoading(true);
      fetchContentItems()
        .then(data => setContentItems(data))
        .catch(() => setContentError('Failed to load latest updates.'))
        .finally(() => setContentLoading(false));
    };
    
    if (!currentUser && authView === 'none') {
      loadPublicData();
    } else if (currentUser) { // If admin is logged in
       // Load initial products if not already loaded, for admin to see
       if (products.length === 0 && !productsLoading && !productsError) { 
            setProductsLoading(true);
            fetchInitialProducts()
            .then(data => setProducts(data))
            .catch(() => setProductsError('Failed to load initial products for admin.'))
            .finally(() => setProductsLoading(false));
       }
    }
  }, [authView, currentUser, products.length, productsLoading, productsError]); // Added productsError to dependency

  useEffect(() => {
    if (currentUser && authView === 'login') {
      setAuthView('none'); 
    }
  }, [currentUser, authView]);

  const handleAddNewProduct = (newProduct: Product) => {
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  };

  const showLogin = () => setAuthView('login');
  const showHome = () => {
    setAuthView('none');
    if(!currentUser) {
        window.scrollTo({ top: 0, behavior: 'smooth'});
    }
  }

  const renderLoadingState = (item: string) => (
    <div className="text-center py-10">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading {item}...</p>
    </div>
  );

  const renderErrorState = (error: string | null, item: string) => (
    <div className="text-center py-10 px-4">
      <p className="text-red-600 bg-red-100 p-4 rounded-md border border-red-300">
        Error: {error || `Could not load ${item}.`}
      </p>
    </div>
  );

  const renderMainSiteContent = () => (
    <>
      <section id="home" className="mb-12 text-center bg-white p-6 md:p-10 rounded-lg shadow-sm pt-16 -mt-16">
        {welcomeLoading && renderLoadingState('welcome message')}
        {welcomeError && renderErrorState(welcomeError, 'welcome message')}
        {welcomeContent && !welcomeLoading && !welcomeError && (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-teal-700 mb-4">{welcomeContent.title}</h1>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-3">{welcomeContent.mainParagraph}</p>
            {welcomeContent.secondaryParagraph && (
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">{welcomeContent.secondaryParagraph}</p>
            )}
            {welcomeContent.callToAction && (
              <a 
                href={welcomeContent.callToAction.href}
                onClick={(e) => {
                    e.preventDefault();
                    const targetId = welcomeContent.callToAction?.href.substring(1);
                    const targetElement = document.getElementById(targetId!);
                    if (targetElement) {
                         targetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
                className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              >
                {welcomeContent.callToAction.text}
              </a>
            )}
          </>
        )}
      </section>

      <section id="about" className="mb-12 pt-16 -mt-16"></section>
      <section id="kitchen-products" className="mb-12 pt-16 -mt-16"></section>
      <section id="furniture" className="mb-12 pt-16 -mt-16"></section>
      <section id="hardware" className="mb-12 pt-16 -mt-16"></section>
      <section id="bathroom" className="mb-12 pt-16 -mt-16"></section>
      <section id="kitchen-bar" className="mb-12 pt-16 -mt-16"></section>
      <section id="decor" className="mb-12 pt-16 -mt-16"></section>
      <section id="contact" className="mb-12 pt-16 -mt-16"></section>

      <section id="products" className="mb-12 pt-16 -mt-16">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center md:text-left">Our Products</h2>
        {(productsLoading && products.length === 0) && renderLoadingState('products')}
        {(productsError && products.length === 0) && renderErrorState(productsError, 'products')}
        {!productsError && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
         {!productsLoading && !productsError && products.length === 0 && (
          <p className="text-gray-600 text-center py-5">No products available at the moment.</p>
        )}
      </section>

      <section id="latest-updates" className="mb-12 pt-16 -mt-16">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center md:text-left">Latest Updates</h2>
        {contentLoading && renderLoadingState('updates')}
        {contentError && renderErrorState(contentError, 'updates')}
        {!contentLoading && !contentError && contentItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {contentItems.map(item => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        )}
        {!contentLoading && !contentError && contentItems.length === 0 && (
           <p className="text-gray-600 text-center py-5">No updates available at the moment.</p>
        )}
      </section>
    </>
  );

  const renderContent = () => {
    if (authIsLoading) {
      return renderLoadingState('authentication status');
    }
    if (currentUser) { 
        if (authView === 'login') return <LoginForm onLoginSuccess={showHome} />; 
        // Pass the current products list to AdminPage
        return <AdminPage onAddProduct={handleAddNewProduct} allProducts={products} />;
    }

    switch (authView) {
      case 'login':
        return <LoginForm onLoginSuccess={showHome} />;
      case 'none':
      default:
        return renderMainSiteContent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header 
        onShowLogin={showLogin} 
        onShowHome={showHome} 
      />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        {renderContent()}
      </main>
      <footer className="bg-gray-800 text-gray-300 text-center p-6 mt-auto">
        <p>&copy; {new Date().getFullYear()} Hindustan Enterprises. All Rights Reserved.</p>
        <p className="text-sm mt-1">{currentUser ? 'Admin Control Panel' : 'House of Crafts - Bringing Tradition to Your Home'}</p>
      </footer>
    </div>
  );
};

export default App;
