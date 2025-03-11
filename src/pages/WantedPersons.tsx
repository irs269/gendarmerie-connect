
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Camera, Plus, User, MapPin, AlertTriangle, Clock, Calendar, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Mock wanted persons data
const wantedPersonsData = [
  {
    id: 1,
    name: 'Ahmed Mohamed Said',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    id_number: 'ID-12345-678',
    age: 35,
    reason: 'Vol avec effraction',
    priority: 'high',
    status: 'wanted',
    last_seen: 'Moroni, près du marché',
    last_seen_date: '2023-06-10',
    description: 'Homme de taille moyenne, environ 1m75, cheveux courts noirs, cicatrice au niveau de la joue droite.',
    contact: 'Lieutenant Ibrahim - 333-4444'
  },
  {
    id: 2,
    name: 'Fatima Ali Omar',
    photo: 'https://randomuser.me/api/portraits/women/42.jpg',
    id_number: 'ID-87654-321',
    age: 28,
    reason: 'Fraude financière',
    priority: 'medium',
    status: 'wanted',
    last_seen: 'Mutsamudu, quartier Bandrani',
    last_seen_date: '2023-06-05',
    description: 'Femme mince, environ 1m65, cheveux longs généralement attachés.',
    contact: 'Capitaine Hassan - 555-6666'
  },
  {
    id: 3,
    name: 'Ibrahim Abdallah',
    photo: 'https://randomuser.me/api/portraits/men/44.jpg',
    id_number: 'ID-13579-246',
    age: 42,
    reason: 'Trafic de drogue',
    priority: 'high',
    status: 'wanted',
    last_seen: 'Fomboni, près du port',
    last_seen_date: '2023-05-28',
    description: 'Homme corpulent, environ 1m80, barbe épaisse, tatouage sur l\'avant-bras droit.',
    contact: 'Sergent Aisha - 777-8888'
  },
  {
    id: 4,
    name: 'Said Mohamed',
    photo: 'https://randomuser.me/api/portraits/men/57.jpg',
    id_number: 'ID-24680-135',
    age: 31,
    reason: 'Vol à main armée',
    priority: 'medium',
    status: 'caught',
    last_seen: 'Moroni, arrêté le 12/06/2023',
    last_seen_date: '2023-06-12',
    description: 'Homme de taille moyenne, environ 1m72, cheveux courts, cicatrice sur le front.',
    contact: 'Lieutenant Mariam - 999-0000'
  },
  {
    id: 5,
    name: 'Aisha Hassan',
    photo: 'https://randomuser.me/api/portraits/women/33.jpg',
    id_number: 'ID-97531-864',
    age: 25,
    reason: 'Escroquerie',
    priority: 'low',
    status: 'wanted',
    last_seen: 'Mitsamiouli, zone commerciale',
    last_seen_date: '2023-06-08',
    description: 'Femme de petite taille, environ 1m60, cheveux courts, porte souvent des lunettes.',
    contact: 'Capitaine Omar - 111-2222'
  },
];

const WantedPersons = () => {
  const [activeTab, setActiveTab] = useState('wanted');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPerson, setSelectedPerson] = useState<typeof wantedPersonsData[0] | null>(null);
  const { toast } = useToast();
  
  // Filter persons based on search query and active tab
  const filteredPersons = wantedPersonsData.filter(person => {
    const matchesSearch = 
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      person.id_number.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'wanted') return matchesSearch && person.status === 'wanted';
    if (activeTab === 'caught') return matchesSearch && person.status === 'caught';
    
    return matchesSearch;
  });
  
  const handleAddNew = () => {
    toast({
      title: "Ajouter un avis de recherche",
      description: "Fonctionnalité en cours de développement",
    });
  };
  
  const handleScanID = () => {
    toast({
      title: "Scanner une pièce d'identité",
      description: "Fonctionnalité en cours de développement",
    });
  };
  
  const handlePersonClick = (person: typeof wantedPersonsData[0]) => {
    setSelectedPerson(person);
  };
  
  const handleBackToList = () => {
    setSelectedPerson(null);
  };

  return (
    <div className="page-container">
      {!selectedPerson ? (
        <>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="page-title animate-slide-down">Avis de Recherche</h1>
              <p className="page-subtitle animate-slide-down">Personnes recherchées par la Gendarmerie</p>
            </div>
          </div>
          
          <div className="flex gap-2 mt-6 animate-slide-up">
            <Button onClick={handleAddNew} className="flex-1">
              <Plus className="h-4 w-4 mr-2" /> Nouveau
            </Button>
            <Button variant="outline" onClick={handleScanID} className="flex-1">
              <Camera className="h-4 w-4 mr-2" /> Scanner ID
            </Button>
          </div>
          
          <div className="mt-6 animate-slide-up" style={{animationDelay: '50ms'}}>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                className="pl-9 input-search"
                placeholder="Rechercher par nom ou numéro d'ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs 
            defaultValue="wanted" 
            className="mt-6 animate-slide-up" 
            style={{animationDelay: '100ms'}}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="all">Tous</TabsTrigger>
              <TabsTrigger value="wanted">Recherchés</TabsTrigger>
              <TabsTrigger value="caught">Arrêtés</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {filteredPersons.length === 0 ? (
                <div className="text-center py-8">
                  <User className="mx-auto h-10 w-10 text-muted-foreground/50" />
                  <h3 className="mt-2 font-medium">Aucune personne trouvée</h3>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez un nouvel avis de recherche ou modifiez vos filtres
                  </p>
                </div>
              ) : (
                filteredPersons.map(person => (
                  <Card 
                    key={person.id} 
                    className="overflow-hidden card-hover"
                    onClick={() => handlePersonClick(person)}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="h-16 w-16 rounded-full overflow-hidden bg-muted">
                          <img 
                            src={person.photo} 
                            alt={person.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {person.priority === 'high' && (
                          <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1">
                            <AlertTriangle className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{person.name}</h3>
                            <p className="text-sm text-muted-foreground">{person.id_number}</p>
                          </div>
                          <Badge variant={person.status === 'wanted' ? 'destructive' : 'outline'}>
                            {person.status === 'wanted' ? 'Recherché' : 'Arrêté'}
                          </Badge>
                        </div>
                        
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {person.last_seen}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="wanted" className="space-y-4">
              {/* Same structure as "all" tab, but filtered for wanted persons */}
              {filteredPersons.length === 0 ? (
                <div className="text-center py-8">
                  <User className="mx-auto h-10 w-10 text-muted-foreground/50" />
                  <h3 className="mt-2 font-medium">Aucune personne recherchée trouvée</h3>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez un nouvel avis de recherche ou modifiez vos filtres
                  </p>
                </div>
              ) : (
                filteredPersons.map(person => (
                  <Card 
                    key={person.id} 
                    className="overflow-hidden card-hover"
                    onClick={() => handlePersonClick(person)}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="h-16 w-16 rounded-full overflow-hidden bg-muted">
                          <img 
                            src={person.photo} 
                            alt={person.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {person.priority === 'high' && (
                          <div className="absolute -top-1 -right-1 bg-red-500 rounded-full p-1">
                            <AlertTriangle className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{person.name}</h3>
                            <p className="text-sm text-muted-foreground">{person.id_number}</p>
                          </div>
                          <Badge variant="destructive">Recherché</Badge>
                        </div>
                        
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {person.last_seen}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="caught" className="space-y-4">
              {/* Same structure as "all" tab, but filtered for caught persons */}
              {filteredPersons.length === 0 ? (
                <div className="text-center py-8">
                  <User className="mx-auto h-10 w-10 text-muted-foreground/50" />
                  <h3 className="mt-2 font-medium">Aucune personne arrêtée trouvée</h3>
                  <p className="text-sm text-muted-foreground">
                    Aucune arrestation enregistrée ou modifiez vos filtres
                  </p>
                </div>
              ) : (
                filteredPersons.map(person => (
                  <Card 
                    key={person.id} 
                    className="overflow-hidden card-hover"
                    onClick={() => handlePersonClick(person)}
                  >
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="h-16 w-16 rounded-full overflow-hidden bg-muted">
                          <img 
                            src={person.photo} 
                            alt={person.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">{person.name}</h3>
                            <p className="text-sm text-muted-foreground">{person.id_number}</p>
                          </div>
                          <Badge variant="outline">Arrêté</Badge>
                        </div>
                        
                        <div className="mt-2 flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {person.last_seen}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <div className="animate-fade-in">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleBackToList}
            className="mb-4 -ml-2"
          >
            ← Retour à la liste
          </Button>
          
          <div className="bg-primary text-white rounded-lg p-4 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-3xl"></div>
            <div className="flex items-center gap-4">
              <div className="h-20 w-20 rounded-full overflow-hidden bg-white/20 border-2 border-white">
                <img 
                  src={selectedPerson.photo} 
                  alt={selectedPerson.name} 
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div>
                <h1 className="text-xl font-bold">{selectedPerson.name}</h1>
                <p className="text-primary-foreground/80">{selectedPerson.id_number}</p>
                
                <div className="flex items-center gap-2 mt-2">
                  <Badge 
                    className={`${
                      selectedPerson.status === 'wanted' 
                        ? 'bg-red-600 hover:bg-red-600' 
                        : 'bg-emerald-600 hover:bg-emerald-600'
                    } text-white border-none`}
                  >
                    {selectedPerson.status === 'wanted' ? 'Recherché' : 'Arrêté'}
                  </Badge>
                  
                  {selectedPerson.priority === 'high' && (
                    <Badge className="bg-amber-500 hover:bg-amber-500 text-white border-none">
                      Prioritaire
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <Card className="glass-card mb-6">
            <CardContent className="p-4 space-y-4">
              <div>
                <h2 className="font-semibold mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-destructive" />
                  Motif de recherche
                </h2>
                <p>{selectedPerson.reason}</p>
              </div>
              
              <div className="pt-2 border-t">
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-sm">{selectedPerson.description}</p>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Card className="glass-card">
              <CardContent className="p-4">
                <h2 className="font-semibold mb-2 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-primary" />
                  Dernière localisation
                </h2>
                <p className="text-sm">{selectedPerson.last_seen}</p>
                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  Le {new Date(selectedPerson.last_seen_date).toLocaleDateString('fr-FR')}
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardContent className="p-4">
                <h2 className="font-semibold mb-2 flex items-center">
                  <User className="h-4 w-4 mr-2 text-primary" />
                  Informations personnelles
                </h2>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Âge:</span>
                  <span>{selectedPerson.age} ans</span>
                  <span className="text-muted-foreground">Contact:</span>
                  <span>{selectedPerson.contact}</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex gap-3 mb-8">
            {selectedPerson.status === 'wanted' ? (
              <Button className="flex-1 bg-green-600 hover:bg-green-700">
                Marquer comme arrêté
              </Button>
            ) : (
              <Button variant="outline" className="flex-1">
                Voir le rapport d'arrestation
              </Button>
            )}
            
            <Button variant="outline" className="flex-1">
              Mettre à jour l'avis
            </Button>
          </div>
        </div>
      )}
      
      <div className="h-16" /> {/* Bottom spacing for navigation bar */}
    </div>
  );
};

export default WantedPersons;
