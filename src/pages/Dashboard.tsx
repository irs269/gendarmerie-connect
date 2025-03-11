
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, User, Clock, AlertTriangle, ArrowRight, Car, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  // Mock data for statistics
  const todayViolations = 12;
  const pendingPayments = 8;
  const wantedPersons = 5;
  
  // Mock recent infractions
  const recentInfractions = [
    { id: 1, plate: 'AB-123-CD', type: 'Excès de vitesse', date: '2023-06-15', status: 'pending' },
    { id: 2, plate: 'EF-456-GH', type: 'Stationnement interdit', date: '2023-06-14', status: 'paid' },
    { id: 3, plate: 'IJ-789-KL', type: 'Téléphone au volant', date: '2023-06-14', status: 'pending' },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title animate-slide-down">Bienvenue</h1>
      <p className="page-subtitle animate-slide-down">Tableau de bord de la Gendarmerie Comores Digital</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <Card className="glass-card animate-slide-up" style={{animationDelay: '50ms'}}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2 text-primary" />
              Infractions du jour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{todayViolations}</div>
            <p className="text-xs text-muted-foreground mt-1">+3 depuis hier</p>
            <Link to="/violations">
              <Button variant="ghost" size="sm" className="mt-2 w-full justify-between">
                Voir tout <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="glass-card animate-slide-up" style={{animationDelay: '100ms'}}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <CreditCard className="h-4 w-4 mr-2 text-primary" />
              Paiements en attente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{pendingPayments}</div>
            <p className="text-xs text-muted-foreground mt-1">2 paiements aujourd'hui</p>
            <Link to="/payments">
              <Button variant="ghost" size="sm" className="mt-2 w-full justify-between">
                Gérer <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card className="glass-card animate-slide-up" style={{animationDelay: '150ms'}}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <User className="h-4 w-4 mr-2 text-primary" />
              Personnes recherchées
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{wantedPersons}</div>
            <p className="text-xs text-muted-foreground mt-1">Dont 2 prioritaires</p>
            <Link to="/wanted-persons">
              <Button variant="ghost" size="sm" className="mt-2 w-full justify-between">
                Consulter <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="section-title mt-8 animate-slide-up" style={{animationDelay: '200ms'}}>Infractions récentes</h2>
      <div className="space-y-3 animate-slide-up" style={{animationDelay: '250ms'}}>
        {recentInfractions.map((infraction) => (
          <Card key={infraction.id} className="overflow-hidden card-hover">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-accent rounded-full p-2">
                  <Car className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">{infraction.plate}</h3>
                  <p className="text-sm text-muted-foreground">{infraction.type}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-muted-foreground">
                  {new Date(infraction.date).toLocaleDateString('fr-FR')}
                </span>
                <span className={`status-badge ${
                  infraction.status === 'pending' 
                    ? 'status-badge-pending' 
                    : 'status-badge-success'
                } mt-1`}>
                  {infraction.status === 'pending' ? 'En attente' : 'Payée'}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <h2 className="section-title mt-8 animate-slide-up" style={{animationDelay: '300ms'}}>Alertes</h2>
      <Card className="glass-card border-red-100 dark:border-red-900/50 animate-slide-up" style={{animationDelay: '350ms'}}>
        <CardContent className="p-4">
          <div className="flex gap-3">
            <div className="bg-red-100 dark:bg-red-900/30 rounded-full p-2 h-fit">
              <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="font-medium">Alerte prioritaire</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Suspect recherché dans la région de Ngazidja. Témoin signalé à Moroni.
              </p>
              <Button variant="outline" size="sm" className="mt-3">
                Voir les détails
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="h-8" /> {/* Bottom spacing for navigation bar */}
    </div>
  );
};

export default Dashboard;
