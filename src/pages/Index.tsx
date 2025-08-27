import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { AppSidebar } from '@/components/AppSidebar';
import { useProducts } from '@/hooks/useProducts';
import { useState } from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

const Index = () => {
  const { products, categories } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar 
          categories={categories} 
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />
        
        <div className="flex-1 bg-gradient-secondary">
          <header className="h-16 flex items-center border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarTrigger className="ml-4" />
            <div className="flex-1">
              <Header />
            </div>
          </header>
          
          <main>
            <Hero />
            
            <section id="products" className="py-16 px-4">
              <div className="container mx-auto">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold mb-4 bg-gradient-accent bg-clip-text text-transparent">
                    Featured Products
                  </h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Discover handpicked products across all categories with our smart filtering system
                  </p>
                </div>
                
                <ProductGrid 
                  products={products} 
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategorySelect={setSelectedCategory}
                />
              </div>
            </section>
          </main>
          
          <footer className="border-t border-border/40 py-8 px-4">
            <div className="container mx-auto text-center">
              <p className="text-muted-foreground">
                © 2024 AffiliateHub. Built with React & Tailwind CSS.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;