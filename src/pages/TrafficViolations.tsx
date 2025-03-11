
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Camera, Search, Filter, Car, FileText, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';

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
    plate: '111 A 73', 
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
    plate: '225 B 42', 
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
    plate: '337 C 89', 
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
    plate: '442 D 15', 
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
    plate: '553 E 67', 
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
  const [showNewViolationDialog, setShowNewViolationDialog] = useState(false);
  const [newViolation, setNewViolation] = useState({
    plate: '',
    type: 'Excès de vitesse',
    driver: '',
    location: '',
    amount: '',
  });
  const [allInfractions, setAllInfractions] = useState(infractions);
  const [selectedInfraction, setSelectedInfraction] = useState<null | typeof infractions[0]>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Filter infractions based on search query and active tab
  const filteredInfractions = allInfractions.filter(infraction => {
    const matchesSearch = 
      infraction.plate.toLowerCase().includes(searchQuery.toLowerCase()) || 
      infraction.driver.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'pending') return matchesSearch && infraction.status === 'pending';
    if (activeTab === 'paid') return matchesSearch && infraction.status === 'paid';
    
    return matchesSearch;
  });
  
  const handleAddNew = () => {
    setShowNewViolationDialog(true);
  };
  
  const handleScanPlate = () => {
    toast({
      title: "Scanner une plaque",
      description: "Fonctionnalité activée pour la démonstration",
    });
    
    // Simulate a successful scan
    setTimeout(() => {
      setNewViolation(prev => ({
        ...prev,
        plate: '777 F 21'
      }));
      setShowNewViolationDialog(true);
    }, 1500);
  };

  const handleSubmitNewViolation = () => {
    // Validate form
    if (!newViolation.plate || !newViolation.driver || !newViolation.location || !newViolation.amount) {
      toast({
        title: "Erreur de saisie",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
      });
      return;
    }

    // Create new infraction
    const newInfraction = {
      id: allInfractions.length + 1,
      plate: newViolation.plate,
      type: newViolation.type,
      amount: parseInt(newViolation.amount),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      location: newViolation.location,
      status: 'pending',
      driver: newViolation.driver,
      officer: 'Agent Connecté',
    };

    // Add to list
    setAllInfractions(prev => [newInfraction, ...prev]);
    
    // Reset form and close dialog
    setNewViolation({
      plate: '',
      type: 'Excès de vitesse',
      driver: '',
      location: '',
      amount: '',
    });
    setShowNewViolationDialog(false);
    
    toast({
      title: "Infraction ajoutée",
      description: "L'infraction a été enregistrée avec succès",
    });
  };
  
  const handleInfractionClick = (infraction: typeof infractions[0]) => {
    setSelectedInfraction(infraction);
    navigate(`/vehicle-search?plate=${infraction.plate}`);
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
              <Card 
                key={infraction.id} 
                className="overflow-hidden card-hover"
                onClick={() => handleInfractionClick(infraction)}
              >
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
              <Card 
                key={infraction.id} 
                className="overflow-hidden card-hover"
                onClick={() => handleInfractionClick(infraction)}
              >
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
              <Card 
                key={infraction.id} 
                className="overflow-hidden card-hover"
                onClick={() => handleInfractionClick(infraction)}
              >
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
      
      {/* Add New Violation Dialog */}
      <Dialog open={showNewViolationDialog} onOpenChange={setShowNewViolationDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Ajouter une nouvelle infraction</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="plate">Numéro d'immatriculation</Label>
              <Input 
                id="plate" 
                placeholder="ex: 111 A 73" 
                value={newViolation.plate}
                onChange={(e) => setNewViolation(prev => ({...prev, plate: e.target.value}))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="driver">Nom du conducteur</Label>
              <Input 
                id="driver" 
                placeholder="Nom et prénom" 
                value={newViolation.driver}
                onChange={(e) => setNewViolation(prev => ({...prev, driver: e.target.value}))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type">Type d'infraction</Label>
              <Select 
                value={newViolation.type}
                onValueChange={(value) => setNewViolation(prev => ({...prev, type: value}))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner le type d'infraction" />
                </SelectTrigger>
                <SelectContent>
                  {violationTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Lieu</Label>
              <Input 
                id="location" 
                placeholder="Lieu de l'infraction" 
                value={newViolation.location}
                onChange={(e) => setNewViolation(prev => ({...prev, location: e.target.value}))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Montant (KMF)</Label>
              <Input 
                id="amount" 
                type="number" 
                placeholder="ex: 15000" 
                value={newViolation.amount}
                onChange={(e) => setNewViolation(prev => ({...prev, amount: e.target.value}))}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewViolationDialog(false)}>Annuler</Button>
            <Button onClick={handleSubmitNewViolation}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="h-16" /> {/* Bottom spacing for navigation bar */}
    </div>
  );
};

export default TrafficViolations;
