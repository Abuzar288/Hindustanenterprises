
import { Product, ContentItem, WelcomeContent } from './types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod_001',
    name: 'Artisan Wooden Bowl',
    description: 'Hand-carved from sustainable mango wood, perfect for salads or as a decorative piece.',
    price: 45.99,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/product1/400/300',
    category: 'Kitchen Products',
    rating: 4.5,
    stock: 25,
  },
  {
    id: 'prod_002',
    name: 'Rustic Oak Coffee Table',
    description: 'Solid oak coffee table with a distressed finish, bringing a touch of country charm.',
    price: 299.50,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/product2/400/300',
    category: 'Furniture',
    rating: 4.8,
    stock: 10,
  },
  {
    id: 'prod_003',
    name: 'Brass Cabinet Knobs (Set of 6)',
    description: 'Elegant brushed brass cabinet knobs to upgrade your kitchen or bathroom furniture.',
    price: 22.00,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/product3/400/300',
    category: 'Hardware',
    rating: 4.2,
    stock: 100,
  },
  {
    id: 'prod_004',
    name: 'Ceramic Spice Jar Set',
    description: 'Set of three airtight ceramic jars, ideal for keeping your spices fresh and organized.',
    price: 35.75,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/product4/400/300',
    category: 'Kitchen & Bar',
    rating: 4.6,
    stock: 40,
  },
  {
    id: 'prod_005',
    name: 'Hand-Painted Decorative Vase',
    description: 'A beautiful ceramic vase, hand-painted with traditional motifs. Adds an artistic touch.',
    price: 60.00,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/product5/400/300',
    category: 'Decor & Accent',
  },
  {
    id: 'prod_006',
    name: 'Modern Stainless Steel Sink',
    description: 'Durable and stylish stainless steel sink for contemporary bathrooms.',
    price: 150.00,
    currency: 'USD',
    imageUrl: 'https://picsum.photos/seed/product6/400/300',
    category: 'Bathroom',
    stock: 15,
  }
];

const MOCK_CONTENT_ITEMS: ContentItem[] = [
  {
    id: 'news_001',
    type: 'news',
    title: 'New Collection Launch: Spring Craftsmanship',
    snippet: 'Discover our latest handcrafted items, inspired by the vibrant colors of spring. Available now!',
    imageUrl: 'https://picsum.photos/seed/news1/400/200',
    publishDate: '2024-05-10T10:00:00Z',
    author: 'Hindustan Enterprises Team',
  },
  {
    id: 'blog_001',
    type: 'blog',
    title: 'The Art of Wood Selection in Furniture Making',
    snippet: 'Learn about the different types of wood we use and why choosing the right material is crucial for quality.',
    publishDate: '2024-05-02T14:30:00Z',
    author: 'Our Master Craftsman',
  },
  {
    id: 'ann_001',
    type: 'announcement',
    title: 'Upcoming Workshop: Pottery Basics',
    snippet: 'Join us for a hands-on pottery workshop next month. Limited spots available, sign up today!',
    imageUrl: 'https://picsum.photos/seed/ann1/400/200',
    publishDate: '2024-04-25T09:00:00Z',
  }
];

const MOCK_WELCOME_CONTENT: WelcomeContent = {
  title: "Welcome to Hindustan Enterprises",
  mainParagraph: "Discover a world of exquisite craftsmanship. At Hindustan Enterprises, we pride ourselves on offering high-quality, handcrafted products that bring beauty and tradition into your home.",
  secondaryParagraph: "Explore our diverse collections, from elegant kitchenware and bespoke furniture to intricate decor accents. Each piece tells a story of skill and dedication.",
  callToAction: {
    text: "Explore Our Collections",
    href: "#products",
  }
};

// Simulate API call delay
const _NETWORK_DELAY = 800; // ms

export const fetchProducts = (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Return a copy to prevent direct mutation of MOCK_PRODUCTS by other parts if they were to hold a reference
      resolve([...MOCK_PRODUCTS]);
    }, _NETWORK_DELAY);
  });
};

export const fetchContentItems = (): Promise<ContentItem[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_CONTENT_ITEMS);
    }, _NETWORK_DELAY);
  });
};

export const fetchWelcomeContent = (): Promise<WelcomeContent> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_WELCOME_CONTENT);
    }, _NETWORK_DELAY - 200); // Faster load for welcome
  });
};

// Example of fetching a single product (for future product detail page)
export const fetchProductById = (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_PRODUCTS.find(p => p.id === id));
    }, _NETWORK_DELAY / 2);
  });
};