
import React from 'react';
import { User, Lock, Moon, Globe, Bell, HelpCircle, LogOut } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Settings = () => {
  return (
    <div className="page-container pb-16">
      <h1 className="page-title text-gendarmerie-blue">Paramètres</h1>
      <p className="page-subtitle mb-6">Configurez votre application</p>
      
      {/* Profil */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="h-16 w-16 rounded-full bg-gendarmerie-blue flex items-center justify-center text-white">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h2 className="font-bold">Lieutenant Mohamed</h2>
              <p className="text-sm text-gray-500">Brigade de Moroni</p>
              <Button variant="link" className="p-0 h-auto text-sm text-gendarmerie-blue">
                Modifier le profil
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Paramètres de compte */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Compte</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Lock className="h-5 w-5 mr-3 text-gendarmerie-blue" />
                    <span>Sécurité du compte</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8">
                    <span className="sr-only">Éditer</span>
                    <span className="text-sm text-gendarmerie-blue">Modifier</span>
                  </Button>
                </div>
                
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 mr-3 text-gendarmerie-blue" />
                    <span>Notifications</span>
                  </div>
                  <Switch id="notifications" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Préférences */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Préférences</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Moon className="h-5 w-5 mr-3 text-gendarmerie-blue" />
                    <span>Mode sombre</span>
                  </div>
                  <Switch id="dark-mode" />
                </div>
                
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Globe className="h-5 w-5 mr-3 text-gendarmerie-blue" />
                    <span>Langue</span>
                  </div>
                  <div className="text-sm text-gray-500">Français</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Support */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Support</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <HelpCircle className="h-5 w-5 mr-3 text-gendarmerie-blue" />
                    <span>Aide & Support</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8">
                    <span className="sr-only">Ouvrir</span>
                    <span className="text-sm text-gendarmerie-blue">Ouvrir</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Déconnexion */}
        <Button variant="destructive" className="w-full mt-8 bg-red-500">
          <LogOut className="h-4 w-4 mr-2" />
          Déconnexion
        </Button>
      </div>
    </div>
  );
};

export default Settings;
