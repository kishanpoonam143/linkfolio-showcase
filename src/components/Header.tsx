import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { ShoppingBag, Settings, LogOut } from 'lucide-react';

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            AffiliateHub
          </h1>
        </div>
        
        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" asChild>
                <a href="/">Products</a>
              </Button>
              <Button variant="ghost" asChild>
                <a href="/admin">
                  <Settings className="w-4 h-4 mr-2" />
                  Admin
                </a>
              </Button>
              <Button variant="outline" onClick={logout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
           <span></span>
          )}
        </nav>
      </div>
    </header>
  );
};