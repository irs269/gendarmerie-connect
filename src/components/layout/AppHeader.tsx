
import React from 'react';
import { Shield, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from 'react-router-dom';

const AppHeader = () => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Accueil", path: "/" },
    { name: "Infractions Routières", path: "/traffic-violations" },
    { name: "Recherche de Véhicules", path: "/vehicle-search" },
    { name: "Avis de Recherche", path: "/wanted-persons" },
    { name: "Paiement d'Amendes", path: "/payment-options" },
    { name: "Paramètres", path: "/settings" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-gendarmerie-blue to-gendarmerie-blue-light text-white shadow-md">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <Shield className="h-8 w-8 mr-2 text-gendarmerie-gold" />
          <div>
            <h1 className="text-base font-bold leading-tight tracking-wider">GENDARMERIE</h1>
            <p className="text-[10px] text-white/80 tracking-wide">COMORES DIGITAL</p>
          </div>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[250px] bg-white">
            <SheetHeader>
              <SheetTitle className="flex items-center">
                <Shield className="h-6 w-6 mr-2 text-gendarmerie-blue" />
                <span>Gendarmerie Digital</span>
              </SheetTitle>
            </SheetHeader>
            <Separator className="my-4" />
            <div className="flex flex-col space-y-1 mt-4">
              {menuItems.map((item) => (
                <Button
                  key={item.path}
                  variant="ghost"
                  onClick={() => {
                    navigate(item.path);
                  }}
                  className="justify-start text-gendarmerie-blue hover:bg-gendarmerie-blue-lighter"
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default AppHeader;
