
import { useState } from 'react';
import { Bell, Calendar, AlertTriangle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeTab, setActiveTab] = useState("taches");
  
  // Données simulées pour le tableau de bord
  const taches = [
    { id: 1, titre: "Patrouille secteur Moroni centre", priorite: "haute", heure: "08:00" },
    { id: 2, titre: "Contrôle routier RN2", priorite: "moyenne", heure: "10:30" },
    { id: 3, titre: "Rapport quotidien", priorite: "normale", heure: "16:00" },
  ];
  
  const infractions = [
    { id: 1, plaque: "111 A 73", infraction: "Excès de vitesse", montant: "15000 KMF", date: "Aujourd'hui" },
    { id: 2, plaque: "222 B 71", infraction: "Stationnement interdit", montant: "5000 KMF", date: "Hier" },
  ];
  
  const alertes = [
    { id: 1, type: "urgent", message: "Accident sur la RN1, intervention requise", temps: "Il y a 20 min" },
    { id: 2, type: "info", message: "Nouvelle personne ajoutée aux avis de recherche", temps: "Il y a 1h" },
  ];

  return (
    <div className="page-container pb-16">
      {/* En-tête de la page */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title text-gendarmerie-blue">Tableau de bord</h1>
          <p className="page-subtitle">
            Bienvenue sur Gendarmerie Comores Digital
          </p>
        </div>
        <div className="relative">
          <Bell className="h-6 w-6 text-gendarmerie-blue" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gendarmerie-red text-[10px] text-white">
            3
          </span>
        </div>
      </div>

      {/* Logo central */}
      <div className="flex justify-center my-4">
        <img 
          src="/lovable-uploads/2155518e-ce15-4618-826c-6ce0acf92093.png" 
          alt="Gendarmerie des Comores" 
          className="h-20 w-20" 
        />
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Card className="bg-gradient-to-br from-gendarmerie-blue to-gendarmerie-blue-light text-white">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <img 
              src="/lovable-uploads/2155518e-ce15-4618-826c-6ce0acf92093.png" 
              alt="Gendarmerie des Comores" 
              className="h-8 w-8 mb-2" 
            />
            <p className="text-sm font-medium">Infractions</p>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs opacity-80">aujourd'hui</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-gendarmerie-red to-red-500 text-white">
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <AlertTriangle className="h-8 w-8 mb-2" />
            <p className="text-sm font-medium">Recherchés</p>
            <p className="text-2xl font-bold">8</p>
            <p className="text-xs opacity-80">en attente</p>
          </CardContent>
        </Card>
      </div>

      {/* Onglets pour le contenu principal */}
      <div className="mt-6">
        <Tabs defaultValue="taches" className="w-full" 
          onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="taches">Tâches</TabsTrigger>
            <TabsTrigger value="infractions">Infractions</TabsTrigger>
            <TabsTrigger value="alertes">Alertes</TabsTrigger>
          </TabsList>
          
          {/* Contenu des tâches */}
          <TabsContent value="taches" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-gendarmerie-blue" />
                  Tâches du jour
                </CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString('fr-FR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {taches.map(tache => (
                    <div key={tache.id} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{tache.titre}</p>
                        <p className="text-sm text-gray-500">{tache.heure}</p>
                      </div>
                      <Badge className={
                        tache.priorite === "haute" ? "bg-red-500" : 
                        tache.priorite === "moyenne" ? "bg-amber-500" : 
                        "bg-green-500"
                      }>
                        {tache.priorite}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-gendarmerie-blue">
                  Voir toutes les tâches
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Contenu des infractions */}
          <TabsContent value="infractions" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Infractions récentes</CardTitle>
                <CardDescription>
                  Les dernières infractions enregistrées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {infractions.map(infraction => (
                    <div key={infraction.id} className="border rounded-lg p-3">
                      <div className="flex justify-between">
                        <p className="font-bold text-gendarmerie-blue">{infraction.plaque}</p>
                        <p className="text-sm text-gray-500">{infraction.date}</p>
                      </div>
                      <p className="text-sm mt-1">{infraction.infraction}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="font-semibold">{infraction.montant}</p>
                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-gendarmerie-blue">
                  Voir toutes les infractions
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Contenu des alertes */}
          <TabsContent value="alertes" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Alertes & Notifications</CardTitle>
                <CardDescription>
                  Restez informé des derniers événements
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alertes.map(alerte => (
                    <div key={alerte.id} className="flex items-start gap-3 border-b pb-3">
                      <div className={`rounded-full p-2 ${alerte.type === 'urgent' ? 'bg-red-100' : 'bg-blue-100'}`}>
                        <AlertTriangle className={`h-4 w-4 ${alerte.type === 'urgent' ? 'text-red-500' : 'text-blue-500'}`} />
                      </div>
                      <div>
                        <p className="font-medium">{alerte.message}</p>
                        <p className="text-xs text-gray-500">{alerte.temps}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-gendarmerie-blue">
                  Voir toutes les alertes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Accès rapides */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-3">Accès rapides</h2>
        <div className="grid grid-cols-2 gap-4">
          <Button className="h-auto py-4 flex flex-col items-center bg-gendarmerie-blue hover:bg-gendarmerie-blue-light">
            <img 
              src="/lovable-uploads/2155518e-ce15-4618-826c-6ce0acf92093.png" 
              alt="Gendarmerie des Comores" 
              className="h-6 w-6 mb-2" 
            />
            <span>Nouvelle Infraction</span>
          </Button>
          <Button className="h-auto py-4 flex flex-col items-center bg-gendarmerie-blue hover:bg-gendarmerie-blue-light">
            <AlertTriangle className="h-6 w-6 mb-2" />
            <span>Avis de Recherche</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
