
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Search, CheckCircle, Calendar, Clock, CreditCard, 
  Smartphone, DollarSign, Receipt, FileText, Car 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock payment data
const paymentsData = [
  {
    id: 1,
    plate: 'AB-123-CD',
    driver: 'Ali Mohammed',
    amount: 15000,
    date: '2023-06-15',
    time: '14:25',
    method: 'Mvola',
    reference: 'MV-98765',
    status: 'completed',
    infraction: 'Excès de vitesse'
  },
  {
    id: 2,
    plate: 'EF-456-GH',
    driver: 'Fatima Abdou',
    amount: 5000,
    date: '2023-06-14',
    time: '11:10',
    method: 'Espèces',
    reference: 'CA-54321',
    status: 'completed',
    infraction: 'Stationnement interdit'
  },
  {
    id: 3,
    plate: 'QR-345-ST',
    driver: 'Aicha Omar',
    amount: 15000,
    date: '2023-06-12',
    time: '16:40',
    method: 'Huri Money',
    reference: 'HM-12345',
    status: 'completed',
    infraction: 'Feu rouge grillé'
  },
];

// Mock pending payments data
const pendingPaymentsData = [
  {
    id: 101,
    plate: 'IJ-789-KL',
    driver: 'Said Ali',
    amount: 10000,
    date: '2023-06-14',
    infraction: 'Téléphone au volant'
  },
  {
    id: 102,
    plate: 'MN-012-OP',
    driver: 'Ahmed Said',
    amount: 25000,
    date: '2023-06-13',
    infraction: 'Défaut d\'assurance'
  },
];

const PaymentOptions = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPayment, setSelectedPayment] = useState<typeof pendingPaymentsData[0] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const { toast } = useToast();
  
  // Filter payments based on search query
  const filteredPendingPayments = pendingPaymentsData.filter(payment => {
    return (
      payment.plate.toLowerCase().includes(searchQuery.toLowerCase()) || 
      payment.driver.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  const filteredCompletedPayments = paymentsData.filter(payment => {
    return (
      payment.plate.toLowerCase().includes(searchQuery.toLowerCase()) || 
      payment.driver.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
  
  const handleSelectPayment = (payment: typeof pendingPaymentsData[0]) => {
    setSelectedPayment(payment);
  };
  
  const handleBackToList = () => {
    setSelectedPayment(null);
    setPaymentMethod('');
  };
  
  const handleSelectPaymentMethod = (method: string) => {
    setPaymentMethod(method);
  };
  
  const handleProcessPayment = () => {
    if (!selectedPayment) return;
    
    if (!paymentMethod) {
      toast({
        title: "Méthode de paiement requise",
        description: "Veuillez sélectionner une méthode de paiement",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate payment processing
    toast({
      title: "Paiement traité avec succès",
      description: `Paiement de ${selectedPayment.amount.toLocaleString()} KMF reçu par ${paymentMethod}`,
    });
    
    // Reset selection after successful payment
    setSelectedPayment(null);
    setPaymentMethod('');
  };
  
  const handleGenerateReceipt = (paymentId: number) => {
    toast({
      title: "Reçu généré",
      description: "Le reçu a été généré et peut être partagé",
    });
  };

  return (
    <div className="page-container">
      {!selectedPayment ? (
        <>
          <h1 className="page-title animate-slide-down">Paiement d'Amendes</h1>
          <p className="page-subtitle animate-slide-down">Gérez les paiements d'amendes routières</p>
          
          <div className="mt-6 animate-slide-up">
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
            defaultValue="pending" 
            className="mt-6 animate-slide-up" 
            style={{animationDelay: '50ms'}}
            onValueChange={setActiveTab}
          >
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="pending">En attente</TabsTrigger>
              <TabsTrigger value="completed">Complétés</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending" className="space-y-4">
              {filteredPendingPayments.length === 0 ? (
                <div className="text-center py-8">
                  <DollarSign className="mx-auto h-10 w-10 text-muted-foreground/50" />
                  <h3 className="mt-2 font-medium">Aucun paiement en attente</h3>
                  <p className="text-sm text-muted-foreground">
                    Toutes les amendes ont été payées ou modifiez vos filtres
                  </p>
                </div>
              ) : (
                filteredPendingPayments.map(payment => (
                  <Card 
                    key={payment.id} 
                    className="overflow-hidden card-hover"
                    onClick={() => handleSelectPayment(payment)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                          <div className="bg-accent rounded-full p-2 h-fit">
                            <Car className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{payment.plate}</h3>
                              <span className="status-badge status-badge-pending ml-2">
                                En attente
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{payment.driver}</p>
                            <p className="text-xs text-muted-foreground mt-1">{payment.infraction}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-medium">{payment.amount.toLocaleString()} KMF</span>
                          <span className="text-xs text-muted-foreground mt-1">
                            {new Date(payment.date).toLocaleDateString('fr-FR')}
                          </span>
                          <Button size="sm" variant="outline" className="mt-2">
                            Payer
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="space-y-4">
              {filteredCompletedPayments.length === 0 ? (
                <div className="text-center py-8">
                  <Receipt className="mx-auto h-10 w-10 text-muted-foreground/50" />
                  <h3 className="mt-2 font-medium">Aucun paiement complété</h3>
                  <p className="text-sm text-muted-foreground">
                    Aucun paiement n'a été enregistré ou modifiez vos filtres
                  </p>
                </div>
              ) : (
                filteredCompletedPayments.map(payment => (
                  <Card key={payment.id} className="overflow-hidden card-hover">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex gap-3">
                          <div className="bg-accent rounded-full p-2 h-fit">
                            <CheckCircle className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{payment.plate}</h3>
                              <span className="status-badge status-badge-success ml-2">
                                Payée
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">{payment.driver}</p>
                            <div className="flex items-center mt-1 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3 mr-1" />
                              {new Date(payment.date).toLocaleDateString('fr-FR')} - {payment.time}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-medium">{payment.amount.toLocaleString()} KMF</span>
                          <span className="text-xs text-muted-foreground mt-1">
                            Via {payment.method}
                          </span>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="mt-2"
                            onClick={() => handleGenerateReceipt(payment.id)}
                          >
                            <Receipt className="h-3 w-3 mr-1" />
                            Reçu
                          </Button>
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
          
          <Card className="glass-card mb-6">
            <CardContent className="p-4">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Détails de l'amende</h2>
                <span className="status-badge status-badge-pending">
                  En attente de paiement
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-y-3 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Plaque d'immatriculation</p>
                  <p className="font-medium">{selectedPayment.plate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Conducteur</p>
                  <p className="font-medium">{selectedPayment.driver}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Infraction</p>
                  <p className="font-medium">{selectedPayment.infraction}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="font-medium">{new Date(selectedPayment.date).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
              
              <div className="bg-accent p-4 rounded-md flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Montant à payer</p>
                  <p className="text-2xl font-bold">{selectedPayment.amount.toLocaleString()} KMF</p>
                </div>
                <Button variant="default" className="bg-primary">
                  Payer maintenant
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <h2 className="section-title">Choisir une méthode de paiement</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
            <Card 
              className={`overflow-hidden card-hover ${paymentMethod === 'Mvola' ? 'border-primary' : ''}`}
              onClick={() => handleSelectPaymentMethod('Mvola')}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-orange-100 rounded-full p-2">
                  <Smartphone className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium">Mvola</h3>
                  <p className="text-sm text-muted-foreground">Paiement mobile</p>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`overflow-hidden card-hover ${paymentMethod === 'Huri Money' ? 'border-primary' : ''}`}
              onClick={() => handleSelectPaymentMethod('Huri Money')}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Huri Money</h3>
                  <p className="text-sm text-muted-foreground">Transfert électronique</p>
                </div>
              </CardContent>
            </Card>
            
            <Card 
              className={`overflow-hidden card-hover ${paymentMethod === 'Espèces' ? 'border-primary' : ''}`}
              onClick={() => handleSelectPaymentMethod('Espèces')}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <div className="bg-green-100 rounded-full p-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Espèces</h3>
                  <p className="text-sm text-muted-foreground">Paiement au comptant</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {paymentMethod && (
            <div className="animate-fade-in">
              <Card className="glass-card mb-6">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Instructions de paiement {paymentMethod}</h3>
                  
                  {paymentMethod === 'Mvola' && (
                    <div className="space-y-2">
                      <p className="text-sm">1. Ouvrez l'application Mvola sur votre téléphone</p>
                      <p className="text-sm">2. Sélectionnez "Payer une facture"</p>
                      <p className="text-sm">3. Entrez le numéro: <span className="font-medium">3456789</span></p>
                      <p className="text-sm">4. Entrez le montant: <span className="font-medium">{selectedPayment.amount.toLocaleString()} KMF</span></p>
                      <p className="text-sm">5. Confirmez le paiement avec votre code PIN</p>
                    </div>
                  )}
                  
                  {paymentMethod === 'Huri Money' && (
                    <div className="space-y-2">
                      <p className="text-sm">1. Connectez-vous à votre compte Huri Money</p>
                      <p className="text-sm">2. Sélectionnez "Transfert" ou "Paiement"</p>
                      <p className="text-sm">3. Entrez le compte: <span className="font-medium">GND-78901</span></p>
                      <p className="text-sm">4. Entrez le montant: <span className="font-medium">{selectedPayment.amount.toLocaleString()} KMF</span></p>
                      <p className="text-sm">5. Utilisez la référence: <span className="font-medium">AMN-{selectedPayment.id}</span></p>
                    </div>
                  )}
                  
                  {paymentMethod === 'Espèces' && (
                    <div className="space-y-2">
                      <p className="text-sm">1. Rendez-vous à un poste de gendarmerie</p>
                      <p className="text-sm">2. Présentez-vous au comptoir des paiements</p>
                      <p className="text-sm">3. Indiquez le numéro d'infraction: <span className="font-medium">INF-{selectedPayment.id}</span></p>
                      <p className="text-sm">4. Payez le montant de <span className="font-medium">{selectedPayment.amount.toLocaleString()} KMF</span></p>
                      <p className="text-sm">5. Conservez votre reçu de paiement</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <div className="flex gap-3">
                <Button onClick={handleProcessPayment} className="flex-1">
                  Confirmer le paiement
                </Button>
                <Button variant="outline" onClick={handleBackToList} className="flex-1">
                  Annuler
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="h-16" /> {/* Bottom spacing for navigation bar */}
    </div>
  );
};

export default PaymentOptions;
