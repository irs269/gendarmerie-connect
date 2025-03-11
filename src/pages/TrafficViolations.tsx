
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Camera, Search, Filter, Car, FileText, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

// Mock violation types
const violationTypes = [
  "Excès de vitesse",
  "Téléphone au volant",
  "Stationnement interdit",
  "Feu rouge grillé",
  "Défaut d'assurance",
  "Défaut de contrôle technique",
  "Conduite dangereuse",
  "Défaut de permis de conduire",
];

// Mock infractions data
const infractions = [
  { 
    id: 1, 
    plate: 'AB-123-CD', 
    type: 'Excès de vitesse', 
    amount: 15000, 
    date: '2023-06-15', 
    time: '10:23',
    location: 'Moroni, Avenue de la Corniche',
    status: 'pending',
    driver: 'Ali Mohammed',
    officer: 'Lt. Ibrahim Ahmed',
  },
  { 
    id: 2, 
    plate: 'EF-456-GH', 
    type: 'Stationnement interdit', 
    amount: 5000, 
    date: '2023-06-14', 
    time: '15:45',
    location: 'Moroni, Place de l\'Indépendance',
    status: 'paid',
    driver: 'Fatima Abdou',
    officer: 'Sgt. Hassan Omar',
  },
  { 
    id: 3, 
    plate: 'IJ-789-KL', 
    type: 'Téléphone au volant', 
    amount: 10000, 
    date: '2023-06-14',
    time: '09:12',
    location: 'Route nationale 2, Foumbouni',
    status: 'pending',
    driver: 'Said Ali',
    officer: 'Sgt. Mariam Ahmed',
  },
  { 
    id: 4, 
    plate: 'MN-012-OP', 
    type: 'Défaut d\'assurance', 
    amount: 25000, 
    date: '2023-06-13',
    time: '17:30',
    location: 'Mutsamudu, Route principale',
    status: 'pending',
    driver: 'Ahmed Said',
    officer: 'Cpt. Omar Hassan',
  },
  { 
    id: 5, 
    plate: 'QR-345-ST', 
    type: 'Feu rouge grillé', 
    amount: 15000, 
    date: '2023-06-12',
    time: '14:20',
    location: 'Moroni, Carrefour Volo-Volo',
    status: 'paid',
    driver: 'Aicha Omar',
    officer: 'Lt. Fatima Said',
  },
];

const TrafficViolations = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  // Filter infractions based on search query and active tab
  const filteredInfractions = infractions.filter(infraction => {
    const matchesSearch = 
      infraction.plate.toLowerCase().includes(searchQuery.toLowerCase()) || 
      infraction.driver.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pending') return matchesSearch && infraction.status === 'pending';
    if (activeTab === 'paid') return matchesSearch && infraction.status === 'paid';
    
    return matchesSearch;
  });
  
  const handleAddNew = () => {
    toast({
      title: "Nouvelle infraction",
      description: "Fonctionnalité en cours de développement",
    });
  };
  
  const handleScanPlate = () => {
    toast({
      title: "Scanner une plaque",
      description: "Fonctionnalité en cours de développement",
    });
  };

  return (
    <div className="page-container">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title animate-slide-down">Infractions Routières</h1>
          <p className="page-subtitle animate-slide-down">Gérez et suivez les infractions routières</p>
        </div>
      </div>
      
      <div className="flex gap-2 mt-6 animate-slide-up">
        <Button onClick={handleAddNew} className="flex-1">
          <Plus className="h-4 w-4 mr-2" /> Nouvelle
        </Button>
        <Button variant="outline" onClick={handleScanPlate} className="flex-1">
          <Camera className="h-4 w-4 mr-2" /> Scanner plaque
        </Button>
      </div>
      
      <div className="mt-6 animate-slide-up" style={{animationDelay: '50ms'}}>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input 
            className="pl-9 input-search"
            placeholder="Rechercher par plaque ou conducteur..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs 
        defaultValue="all" 
        className="mt-6 animate-slide-up" 
        style={{animationDelay: '100ms'}}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="pending">En attente</TabsTrigger>
          <TabsTrigger value="paid">Payées</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {filteredInfractions.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <h3 className="mt-2 font-medium">Aucune infraction trouvée</h3>
              <p className="text-sm text-muted-foreground">
                Ajoutez une nouvelle infraction ou modifiez vos filtres
              </p>
            </div>
          ) : (
            filteredInfractions.map(infraction => (
              <Card key={infraction.id} className="overflow-hidden card-hover">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className="bg-accent rounded-full p-2 h-fit">
                        <Car className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{infraction.plate}</h3>
                        <p className="text-sm text-muted-foreground">{infraction.type}</p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(infraction.date).toLocaleDateString('fr-FR')} - {infraction.time}
                        </div>
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
                  
                  <div className="mt-3 pt-3 border-t text-sm">
                    <div className="text-muted-foreground">
                      {infraction.location}
                    </div>
                    <div className="mt-1 flex justify-between text-xs">
                      <span>Conducteur: {infraction.driver}</span>
                      <span>Agent: {infraction.officer}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          {/* Same content structure as "all" tab */}
          {filteredInfractions.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <h3 className="mt-2 font-medium">Aucune infraction en attente trouvée</h3>
              <p className="text-sm text-muted-foreground">
                Toutes les amendes ont été payées ou modifiez vos filtres
              </p>
            </div>
          ) : (
            filteredInfractions.map(infraction => (
              <Card key={infraction.id} className="overflow-hidden card-hover">
                {/* Same card content structure */}
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className="bg-accent rounded-full p-2 h-fit">
                        <Car className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{infraction.plate}</h3>
                        <p className="text-sm text-muted-foreground">{infraction.type}</p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(infraction.date).toLocaleDateString('fr-FR')} - {infraction.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-medium">{infraction.amount.toLocaleString()} KMF</span>
                      <span className="status-badge status-badge-pending mt-1">
                        En attente
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t text-sm">
                    <div className="text-muted-foreground">
                      {infraction.location}
                    </div>
                    <div className="mt-1 flex justify-between text-xs">
                      <span>Conducteur: {infraction.driver}</span>
                      <span>Agent: {infraction.officer}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        
        <TabsContent value="paid" className="space-y-4">
          {/* Same content structure as "all" tab */}
          {filteredInfractions.length === 0 ? (
            <div className="text-center py-8">
              <FileText className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <h3 className="mt-2 font-medium">Aucune infraction payée trouvée</h3>
              <p className="text-sm text-muted-foreground">
                Aucun paiement enregistré ou modifiez vos filtres
              </p>
            </div>
          ) : (
            filteredInfractions.map(infraction => (
              <Card key={infraction.id} className="overflow-hidden card-hover">
                {/* Same card content structure */}
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-3">
                      <div className="bg-accent rounded-full p-2 h-fit">
                        <Car className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{infraction.plate}</h3>
                        <p className="text-sm text-muted-foreground">{infraction.type}</p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {new Date(infraction.date).toLocaleDateString('fr-FR')} - {infraction.time}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="font-medium">{infraction.amount.toLocaleString()} KMF</span>
                      <span className="status-badge status-badge-success mt-1">
                        Payée
                      </span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t text-sm">
                    <div className="text-muted-foreground">
                      {infraction.location}
                    </div>
                    <div className="mt-1 flex justify-between text-xs">
                      <span>Conducteur: {infraction.driver}</span>
                      <span>Agent: {infraction.officer}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
      
      <div className="h-16" /> {/* Bottom spacing for navigation bar */}
    </div>
  );
};

export default TrafficViolations;
