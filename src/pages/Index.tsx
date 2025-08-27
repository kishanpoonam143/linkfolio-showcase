import { useProducts } from '@/hooks/useProducts';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';

const Index = () => {
  const { products, categories } = useProducts();

  return (
    <div className="min-h-screen bg-gradient-secondary">
      <Header />
      
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
            
            <ProductGrid products={products} categories={categories} />
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
  );
};

export default Index;
