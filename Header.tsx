import React, { useState } from 'react';
import { NAVIGATION_LINKS, NavLink, PRODUCT_CATEGORY_NAV_LABELS } from './constants'; // Import PRODUCT_CATEGORY_NAV_LABELS
import InstagramIcon from './InstagramIcon';
import FacebookIcon from './FacebookIcon';
import WhatsAppIcon from './WhatsAppIcon';
import MenuIcon from './MenuIcon';
import CloseIcon from './CloseIcon';
import { useAuth } from './AuthContext';

const HindustanLogo: React.FC<{ svgClassName?: string }> = ({ svgClassName = "w-20 h-20" }) => (
  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={svgClassName} aria-hidden="true">
    <title>Hindustan Enterprises Logo</title>
    <defs>
      <linearGradient id="hornGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor: '#4e342e', stopOpacity: 1}} />
        <stop offset="30%" style={{stopColor: '#6d4c41', stopOpacity: 1}} />
        <stop offset="70%" style={{stopColor: '#a1887f', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#d7ccc8', stopOpacity: 1}} />
      </linearGradient>
      <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style={{stopColor: '#795548', stopOpacity: 1}} />
        <stop offset="20%" style={{stopColor: '#5d4037', stopOpacity: 1}} />
        <stop offset="40%" style={{stopColor: '#a1887f', stopOpacity: 1}} />
        <stop offset="60%" style={{stopColor: '#6d4c41', stopOpacity: 1}} />
        <stop offset="80%" style={{stopColor: '#5d4037', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#795548', stopOpacity: 1}} />
      </linearGradient>
      <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{stopColor: '#ffab00', stopOpacity: 1}} />
        <stop offset="100%" style={{stopColor: '#ffd54f', stopOpacity: 1}} />
      </linearGradient>
      <filter id="dropshadow" height="130%" x="-15%" y="-15%" width="130%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="alphablur"/>
        <feOffset in="alphablur" dx="1.5" dy="1.5" result="offsetblur"/>
        <feComponentTransfer in="offsetblur" result="opacityFiltered">
          <feFuncA type="linear" slope="0.5"/>
        </feComponentTransfer>
        <feMerge>
          <feMergeNode in="opacityFiltered"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <g filter="url(#dropshadow)">
      <path d="M14 85 C10 60 12 30 18 15 L26 15 C20 30 22 60 29 85 Z" fill="url(#hornGradient)" />
      <path d="M86 85 C90 60 88 30 82 15 L74 15 C80 30 78 60 71 85 Z" fill="url(#hornGradient)" />
      <rect x="27" y="42.5" width="46" height="15" rx="3" fill="url(#woodGradient)" />
    </g>
    <text 
      x="50" 
      y="50.25"
      dominantBaseline="middle" 
      textAnchor="middle" 
      fontFamily="'Montserrat', sans-serif" 
      fontSize="8.5"
      fill="#FFFDE7"
      fontWeight="600"
      letterSpacing="0.25"
    >
      ENTERPRISE
    </text>
    <path d="M20 10 Q50 -5 80 10" stroke="url(#arcGradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
    <path d="M20 90 Q50 105 80 90" stroke="url(#arcGradient)" strokeWidth="3" fill="none" strokeLinecap="round"/>
  </svg>
);

interface HeaderProps {
  onShowLogin: () => void;
  onShowHome: () => void;
  onSelectCategory: (categoryName: string | null) => void; // New prop
}

const Header: React.FC<HeaderProps> = ({ onShowLogin, onShowHome, onSelectCategory }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleLogoClick = () => {
    if (isMenuOpen) setIsMenuOpen(false);
    onShowHome(); 
    if (!currentUser) { 
        // onShowHome already calls onSelectCategory(null), so scrolling handled by App.tsx
    }
  }

  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | React.MouseEvent<HTMLButtonElement, MouseEvent>, 
    navItem: NavLink // Pass the whole NavLink item
  ) => {
    if (isMenuOpen) setIsMenuOpen(false);
    e.preventDefault(); // Prevent default for all handled links

    const { href, label } = navItem;

    if (label === "HOME") {
        onShowHome(); // This will also call onSelectCategory(null) in App.tsx
    } else if (PRODUCT_CATEGORY_NAV_LABELS.includes(label) && !currentUser) {
        // This is a product category link, and user is not admin
        onSelectCategory(label);
    } else if (href.startsWith("#") && !currentUser) { 
        // For other anchor links like #about, #contact when not admin
        onShowHome(); // Ensure main site view
        setTimeout(() => {
            const elementId = href.substring(1);
            const element = document.getElementById(elementId);
            if (element) {
                const headerOffset = document.querySelector('header')?.offsetHeight || 0;
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        }, 0);
    } else if (href === "login") {
        onShowLogin();
    } else if (href === "logout") {
        logout();
        onShowHome(); 
    }
    // For external links or other cases, allow default if not prevented.
    // Currently, all are prevented and handled.
  };

  const authButtonClass = "hover:text-amber-400 transition-colors duration-300 py-2 px-3 text-sm font-medium relative group";
  const mobileAuthButtonClass = "block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-gray-700 hover:text-amber-300 w-full text-center transition-colors duration-300";

  return (
    <header className="shadow-md sticky top-0 z-50 bg-white">
      {/* Top Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 sm:p-4 md:px-8 md:py-5">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
           <div 
             className="flex items-center space-x-2 sm:space-x-3 cursor-pointer" 
             onClick={handleLogoClick}
             role="button" 
             tabIndex={0} 
             onKeyPress={(e) => e.key === 'Enter' && handleLogoClick()}
             aria-label="Hindustan Enterprises Home"
           >
            <HindustanLogo svgClassName="w-14 h-14 sm:w-16 md:w-20" />
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-teal-700 tracking-tight">
                Hindustan Enterprises
              </h1>
              <p className="text-[10px] sm:text-xs md:text-sm text-amber-600 font-medium">
                {currentUser ? 'Admin Panel' : 'House of Crafts'}
              </p>
            </div>
          </div>

          <div className="mt-2 sm:mt-3 md:mt-0 flex flex-col items-end space-y-1 sm:space-y-2">
             <a 
              href="mailto:Info@hindustanenterprises.in" 
              className="text-[11px] sm:text-xs md:text-sm text-teal-600 hover:text-teal-800 hover:underline transition-colors duration-300"
            >
              Info@hindustanenterprises.in
            </a>
            <div className="hidden md:flex items-center space-x-2 text-gray-800">
              {currentUser ? (
                <>
                  <span className="text-sm font-medium mr-2" aria-live="polite">Welcome, {currentUser.username}!</span>
                  <button onClick={(e) => handleNavLinkClick(e, {label: 'Logout', href: 'logout'})} className={`${authButtonClass} border border-amber-500 rounded hover:bg-amber-500 hover:text-white`}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button onClick={(e) => handleNavLinkClick(e, {label: 'Login', href: 'login'})} className={`${authButtonClass} border border-teal-500 rounded hover:bg-teal-500 hover:text-white`}>
                    Admin Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {!currentUser && (
        <nav className="bg-black text-white">
          <div className="container mx-auto px-4 md:px-8 flex justify-between items-center h-14 md:h-16">
            <div className="hidden md:flex space-x-5 lg:space-x-7 items-center">
              {NAVIGATION_LINKS.map((link: NavLink) => (
                <a
                  key={link.label}
                  href={link.href} // href is still useful for context / right-click open
                  onClick={(e) => handleNavLinkClick(e, link)}
                  className="hover:text-amber-400 transition-colors duration-300 py-2 text-sm font-medium relative group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" aria-hidden="true"></span>
                </a>
              ))}
            </div>

            <div className="hidden md:flex space-x-4 items-center">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-amber-400 transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-amber-400 transition-colors">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-amber-400 transition-colors">
                <WhatsAppIcon className="w-5 h-5" />
              </a>
            </div>

            <div className="md:hidden flex items-center space-x-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-amber-400 transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-amber-400 transition-colors">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:text-amber-400 transition-colors">
                <WhatsAppIcon className="w-5 h-5" />
              </a>
              <button 
                onClick={toggleMenu} 
                aria-label={isMenuOpen ? "Close menu" : "Open menu"} 
                aria-expanded={isMenuOpen}
                className="text-white focus:outline-none p-1 -mr-1"
              >
                {isMenuOpen ? <CloseIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
              </button>
            </div>
          </div>
          
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black bg-opacity-95 backdrop-blur-sm shadow-lg z-40 pb-5">
              <div className="container mx-auto px-4 pt-2 pb-3 space-y-1 flex flex-col items-center" role="menu" aria-orientation="vertical">
                {NAVIGATION_LINKS.map((link: NavLink) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavLinkClick(e, link)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-200 hover:bg-gray-700 hover:text-amber-300 w-full text-center transition-colors duration-300"
                    role="menuitem"
                  >
                    {link.label}
                  </a>
                ))}
                <hr className="w-4/5 border-gray-700 my-2" />
                {!currentUser && (
                    <button onClick={(e) => handleNavLinkClick(e, {label: 'Login', href: 'login'})} className={mobileAuthButtonClass} role="menuitem">
                        Admin Login
                    </button>
                )}
                {currentUser && ( // Should not happen if nav is hidden, but for completeness
                     <button onClick={(e) => handleNavLinkClick(e, {label: 'Logout', href: 'logout'})} className={mobileAuthButtonClass} role="menuitem">
                        Logout
                    </button>
                )}
              </div>
            </div>
          )}
        </nav>
      )}
       {currentUser && (
        <div className="bg-black text-white h-14 md:h-16 flex items-center justify-center">
            <p className="text-sm font-medium">Admin Product Management</p>
        </div>
       )}
    </header>
  );
};

export default Header;
