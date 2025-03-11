
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Camera, Car, Clock, MapPin, User, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock vehicles data
const vehiclesData = [
  {
    id: 1,
    plate: 'AB-123-CD',
    make: 'Toyota',
    model: 'Corolla',
    color: 'Blanc',
    owner: 'Ali Mohammed',
    owner_id: 'ID-12345',
    registration_date: '2020-03-15',
    infractions: [
      { id: 101, type: 'Excès de vitesse', date: '2023-06-15', amount: 15000, status: 'pending' },
      { id: 102, type: 'Stationnement interdit', date: '2023-05-22', amount: 5000, status: 'paid' },
    ]
  },
  {
    id: 2,
    plate: 'EF-456-GH',
    make: 'Honda',
    model: 'Civic',
    color: 'Noir',
    owner: 'Fatima Abdou',
    owner_id: 'ID-67890',
    registration_date: '2019-11-10',
    infractions: [
      { id: 201, type: 'Stationnement interdit', date: '2023-06-14', amount: 5000, status: 'paid' },
    ]
  },
  {
    id: 3,
    plate: 'IJ-789-KL',
    make: 'Renault',
    model: 'Clio',
    color: 'Rouge',
    owner: 'Said Ali',
    owner_id: 'ID-24680',
    registration_date: '2021-05-28',
    infractions: [
      { id: 301, type: 'Téléphone au volant', date: '2023-06-14', amount: 10000, status: 'pending' },
      { id: 302, type: 'Défaut de ceinture', date: '2023-04-05', amount: 7500, status: 'paid' },
      { id: 303, type: 'Excès de vitesse', date: '2023-02-18', amount: 15000, status: 'paid' },
    ]
  },
];

const VehicleSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof vehiclesData>([]);
  const [selectedVehicle, setSelectedVehicle] = useState<typeof vehiclesData[0] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { toast } = useToast();
  
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Recherche vide",
        description: "Veuillez entrer un numéro de plaque",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      const results = vehiclesData.filter(vehicle => 
        vehicle.plate.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSearchResults(results);
      setSelectedVehicle(results.length > 0 ? results[0] : null);
      setIsSearching(false);
      
      if (results.length === 0) {
        toast({
          title: "Aucun résultat",
          description: "Aucun véhicule trouvé avec cette plaque d'immatriculation",
        });
      }
    }, 1000);
  };
  
  const handleScanPlate = () => {
    toast({
      title: "Scanner une plaque",
      description: "Fonctionnalité en cours de développement",
    });
  };
  
  // Count pending infractions
  const pendingInfractions = selectedVehicle?.infractions.filter(inf => inf.status === 'pending').length || 0;
  
  // Calculate total amount due
  const totalAmountDue = selectedVehicle?.infractions
    .filter(inf => inf.status === 'pending')
    .reduce((sum, inf) => sum + inf.amount, 0) || 0;

  return (
    <div className="page-container">
      <h1 className="page-title animate-slide-down">Rechercher un Véhicule</h1>
      <p className="page-subtitle animate-slide-down">Vérifiez les informations et infractions d'un véhicule</p>
      
      <div className="mt-6 space-y-4 animate-slide-up">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9 input-search"
              placeholder="Numéro de plaque..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? 'Recherche...' : 'Rechercher'}
          </Button>
        </div>
        
        <Button variant="outline" onClick={handleScanPlate} className="w-full">
          <Camera className="h-4 w-4 mr-2" /> Scanner la plaque
        </Button>
      </div>
      
      {selectedVehicle && (
        <div className="mt-8 space-y-6 animate-fade-in">
          <Card className="glass-card overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-primary p-4 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold">{selectedVehicle.plate}</h2>
                    <p className="text-primary-foreground/80">
                      {selectedVehicle.make} {selectedVehicle.model} • {selectedVehicle.color}
                    </p>
                  </div>
                  <div className="bg-primary-foreground/20 p-2 rounded-lg">
                    <Car className="h-8 w-8" />
                  </div>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Propriétaire:</span>
                  </div>
                  <span className="text-sm">{selectedVehicle.owner}</span>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">ID:</span>
                  </div>
                  <span className="text-sm">{selectedVehicle.owner_id}</span>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Date d'immatriculation:</span>
                  </div>
                  <span className="text-sm">
                    {new Date(selectedVehicle.registration_date).toLocaleDateString('fr-FR')}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <h3 className="text-sm font-medium text-muted-foreground">Infractions en attente</h3>
                <p className="text-3xl font-bold mt-1">{pendingInfractions}</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-4 text-center">
                <h3 className="text-sm font-medium text-muted-foreground">Montant dû</h3>
                <p className="text-3xl font-bold mt-1">{totalAmountDue.toLocaleString()} KMF</p>
              </CardContent>
            </Card>
          </div>
          
          <h2 className="section-title">Historique des infractions</h2>
          <div className="space-y-3">
            {selectedVehicle.infractions.length > 0 ? (
              selectedVehicle.infractions.map(infraction => (
                <Card key={infraction.id} className="overflow-hidden card-hover">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{infraction.type}</h3>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(infraction.date).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-medium">{infraction.amount.toLocaleString()} KMF</span>
                        <span className={`status-badge ${
                          infraction.status === 'pending' 
                            ? 'status-badge-pending' 
                            : 'status-badge-success'
                        } mt-1`}>
                          {infraction.status === 'pending' ? 'En attente' : 'Payée'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText className="mx-auto h-10 w-10 text-muted-foreground/50" />
                <h3 className="mt-2 font-medium">Aucune infraction</h3>
                <p className="text-sm text-muted-foreground">
                  Ce véhicule n'a pas d'infractions enregistrées
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {searchResults.length === 0 && searchQuery && !isSearching && !selectedVehicle && (
        <div className="mt-16 text-center animate-fade-in">
          <Car className="mx-auto h-16 w-16 text-muted-foreground/50" />
          <h2 className="mt-4 text-xl font-medium">Aucun véhicule trouvé</h2>
          <p className="mt-2 text-muted-foreground">
            Aucun véhicule ne correspond à cette plaque d'immatriculation
          </p>
          <Button variant="outline" className="mt-4">
            Ajouter un nouveau véhicule
          </Button>
        </div>
      )}
      
      <div className="h-16" /> {/* Bottom spacing for navigation bar */}
    </div>
  );
};

export default VehicleSearch;
