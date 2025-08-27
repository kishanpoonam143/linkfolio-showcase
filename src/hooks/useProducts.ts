import { useState, useEffect } from 'react';
import { Product, Category } from '@/types/Product';

const PRODUCTS_KEY = 'affiliate_products';
const CATEGORIES_KEY = 'affiliate_categories';

// Sample data
const sampleCategories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics' },
  { id: '2', name: 'Fashion', slug: 'fashion' },
  { id: '3', name: 'Home & Garden', slug: 'home-garden' },
  { id: '4', name: 'Books', slug: 'books' },
  { id: '5', name: 'Sports', slug: 'sports' }
];

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones Pro',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life and superior sound quality',
    image: '/src/assets/headphones.jpg',
    affiliateLink: 'https://example.com/headphones',
    category: 'electronics',
    price: '$299',
    rating: 4.8,
    createdAt: new Date()
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor, GPS, and comprehensive health insights',
    image: '/src/assets/smartwatch.jpg',
    affiliateLink: 'https://example.com/watch',
    category: 'electronics',
    price: '$199',
    rating: 4.6,
    createdAt: new Date()
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description: 'Comfortable and sustainable organic cotton t-shirt perfect for everyday wear',
    image: '/src/assets/tshirt.jpg',
    affiliateLink: 'https://example.com/tshirt',
    category: 'fashion',
    price: '$29',
    rating: 4.5,
    createdAt: new Date()
  }
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem(PRODUCTS_KEY);
    const savedCategories = localStorage.getItem(CATEGORIES_KEY);

    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(sampleProducts);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(sampleProducts));
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(sampleCategories);
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(sampleCategories));
    }
  }, []);

  const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date()
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, ...updates } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id: string) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(updatedProducts));
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString()
    };
    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updatedCategories));
  };

  return {
    products,
    categories,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory
  };
};