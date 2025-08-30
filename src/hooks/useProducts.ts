import { useState, useEffect } from 'react';
import { Product, Category } from '@/types/Product';
import { addProductApi,updateProductApi,deleteProductApi, fetchProducts } from "./../service/api";

const PRODUCTS_KEY = 'affiliate_products';
const CATEGORIES_KEY = 'affiliate_categories';

// Sample data
const sampleCategories: Category[] = [
  { id: '1', name: 'Electronics', slug: 'electronics', isParent: true },
  { id: '2', name: 'Smartphones', slug: 'smartphones', parentId: '1' },
  { id: '3', name: 'Laptops', slug: 'laptops', parentId: '1' },
  { id: '4', name: 'Clothing', slug: 'clothing', isParent: true },
  { id: '5', name: 'Men', slug: 'men', parentId: '4' },
  { id: '6', name: 'Women', slug: 'women', parentId: '4' },
  { id: '7', name: 'Home & Garden', slug: 'home-garden', isParent: true },
  { id: '8', name: 'Books', slug: 'books', isParent: true },
  { id: '9', name: 'Sports', slug: 'sports', isParent: true },
  { id: '10', name: 'Tablets', slug: 'tablets', parentId: '1' },
  { id: '11', name: 'Tvs', slug: 'tvs', parentId: '1' },
  { id: '12', name: 'Beauty', slug: 'beauty', isParent: true },
  { id: '13', name: 'Fitness', slug: 'fitness', isParent: true },
];

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const savedCategories = localStorage.getItem(CATEGORIES_KEY);
    
    loadProducts();

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    } else {
      setCategories(sampleCategories);
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(sampleCategories));
    }
  }, []);

  const addProduct = (product: Omit<Product, 'id' | 'createdAt'>) => {

    addProductToDb(product);
    loadProducts();
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    updateProductToDb(id,updates);
    loadProducts();
  };

  const deleteProduct = (id: string) => {
    deleteProductFromDb(id);
    loadProducts();
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

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };
    const addProductToDb = async (product) => {
    const data = await addProductApi(product);
  };
    const updateProductToDb= async (string,updates) => {
    const data = await updateProductApi(string,updates);
  };
    const deleteProductFromDb = async (string) => {
    const data = await deleteProductApi(string);
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