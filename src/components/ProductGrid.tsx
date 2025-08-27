import { useState } from 'react';
import { Product, Category } from '@/types/Product';
import { ProductCard } from './ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export const ProductGrid = ({ products, categories, selectedCategory, onCategorySelect }: ProductGridProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    // Check if selected category is a parent category
    if (selectedCategory !== 'all') {
      const selectedCat = categories.find(cat => cat.slug === selectedCategory);
      if (selectedCat?.isParent) {
        // If parent category is selected, show products from all child categories
        const childCategories = categories.filter(cat => cat.parentId === selectedCat.id);
        matchesCategory = childCategories.some(child => child.slug === product.category);
      }
    }
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8">
      {/* Search Only */}
      <div className="flex justify-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-background/50 border-border/50 focus:border-primary"
          />
        </div>
      </div>

      {/* Results Count */}
      <div className="text-muted-foreground">
        {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No products found matching your criteria.</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchTerm('');
              onCategorySelect('all');
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};