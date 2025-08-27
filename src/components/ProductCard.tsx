import { Product } from '@/types/Product';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:shadow-glow hover:border-primary/50 hover:-translate-y-1">
      <CardHeader className="relative p-0">
        <div className="aspect-video overflow-hidden bg-gradient-secondary">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-primary/20 text-primary-foreground border-primary/30">
            {product.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-3">
        <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </CardTitle>
        
        <p className="text-muted-foreground text-sm line-clamp-3">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          {product.price && (
            <span className="text-xl font-bold text-primary">
              {product.price}
            </span>
          )}
          
          {product.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{product.rating}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="default"
          className="w-full group/btn bg-gradient-primary hover:shadow-glow"
          asChild
        >
          <a href={product.affiliateLink} target="_blank" rel="noopener noreferrer">
            View Product
            <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};