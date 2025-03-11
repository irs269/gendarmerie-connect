
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Car, Search, User, CreditCard, Settings } from 'lucide-react';

const BottomNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t py-2 px-3">
      <div className="grid grid-cols-5 max-w-md mx-auto">
        <NavLink to="/" className={({ isActive }) => 
          `nav-item ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`
        } end>
          <Home className="nav-icon" />
          <span>Accueil</span>
        </NavLink>
        
        <NavLink to="/violations" className={({ isActive }) => 
          `nav-item ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`
        }>
          <Car className="nav-icon" />
          <span>Infractions</span>
        </NavLink>
        
        <NavLink to="/vehicle-search" className={({ isActive }) => 
          `nav-item ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`
        }>
          <Search className="nav-icon" />
          <span>Véhicules</span>
        </NavLink>
        
        <NavLink to="/wanted-persons" className={({ isActive }) => 
          `nav-item ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`
        }>
          <User className="nav-icon" />
          <span>Recherchés</span>
        </NavLink>
        
        <NavLink to="/payments" className={({ isActive }) => 
          `nav-item ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`
        }>
          <CreditCard className="nav-icon" />
          <span>Paiements</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavigation;
