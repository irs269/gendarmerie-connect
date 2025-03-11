
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Menu, Bell, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

// Map of routes to their display names
const routeTitles: Record<string, string> = {
  '/': 'Accueil',
  '/violations': 'Infractions Routières',
  '/vehicle-search': 'Rechercher un Véhicule',
  '/wanted-persons': 'Avis de Recherche',
  '/payments': 'Paiement d\'Amendes',
  '/settings': 'Paramètres',
};

const Header = () => {
  const location = useLocation();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  const { toast } = useToast();
  
  // Get the current page title based on route
  const pageTitle = routeTitles[location.pathname] || 'Gendarmerie Comores';
  
  // Toggle between light and dark mode
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
  };
  
  // Set initial theme from localStorage
  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);
  
  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "Vous n'avez pas de nouvelles notifications",
    });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <img 
              src="https://flagcdn.com/km.svg" 
              alt="Drapeau des Comores" 
              className="w-6 h-4 object-cover rounded"
            />
            <h1 className="text-lg font-semibold tracking-tight">{pageTitle}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleNotificationClick} 
            className="relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-gendarmerie-red rounded-full"></span>
          </Button>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === 'light' ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
