
import { Home, Car, Search, User, CreditCard } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const AppBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const navItems = [
    { icon: Home, label: 'Accueil', path: '/' },
    { icon: Car, label: 'Infractions', path: '/traffic-violations' },
    { icon: Search, label: 'Véhicules', path: '/vehicle-search' },
    { icon: User, label: 'Recherchés', path: '/wanted-persons' },
    { icon: CreditCard, label: 'Paiements', path: '/payment-options' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white shadow-lg py-2 z-40">
      <nav className="flex justify-around">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          // Use the logo for the home button
          const IconComponent = item.path === '/' ? null : item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex flex-col items-center justify-center p-1 rounded-lg transition-colors w-16",
                isActive ? "text-gendarmerie-blue" : "text-gray-500"
              )}
            >
              {item.path === '/' ? (
                <div className="h-5 w-5 mb-1">
                  <img 
                    src="/lovable-uploads/2155518e-ce15-4618-826c-6ce0acf92093.png" 
                    alt="Home" 
                    className={cn(
                      "h-5 w-5",
                      isActive && "border-gendarmerie-blue border rounded-full"
                    )}
                  />
                </div>
              ) : (
                <IconComponent className={cn(
                  "h-5 w-5 mb-1",
                  isActive && "text-gendarmerie-blue"
                )} />
              )}
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default AppBottomNav;
