"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Key, Plus, Trash2, Copy, Eye, EyeOff, Bell, Mail, MessageSquare, Smartphone, Globe, User, Shield, CheckCircle, AlertTriangle } from 'lucide-react'
import Link from "next/link"

export default function SettingsPage() {
  const [showApiKey, setShowApiKey] = useState({})
  const [newApiKeyName, setNewApiKeyName] = useState("")
  const [newApiKeyDescription, setNewApiKeyDescription] = useState("")

  // Przykładowe dane użytkownika
  const userProfile = {
    username: "admin_user",
    email: "admin@example.com",
    lastLogin: "2024-01-15 14:30:22",
    status: "active",
    role: "Administrator"
  }

  const [profileData, setProfileData] = useState({
    username: userProfile.username,
    email: userProfile.email
  })

  // Przykładowe klucze API
  const [apiKeys, setApiKeys] = useState([
    {
      id: 1,
      name: "Klucz główny",
      description: "Do analizy dowodów policyjnych",
      key: "ak_1234567890abcdef1234567890abcdef",
      isActive: true,
      createdAt: "2024-01-10 10:00:00",
      lastUsed: "2024-01-15 14:25:00"
    },
    {
      id: 2,
      name: "Klucz testowy",
      description: "Do testów i rozwoju systemu",
      key: "ak_abcdef1234567890abcdef1234567890",
      isActive: true,
      createdAt: "2024-01-12 15:30:00",
      lastUsed: "2024-01-14 09:15:00"
    },
    {
      id: 3,
      name: "Klucz mobilny",
      description: "Do aplikacji mobilnej",
      key: "ak_567890abcdef1234567890abcdef1234",
      isActive: false,
      createdAt: "2024-01-08 12:00:00",
      lastUsed: "2024-01-13 16:45:00"
    }
  ])

  // Ustawienia powiadomień
  const [notificationSettings, setNotificationSettings] = useState([
    {
      category: "Strzał",
      minConfidence: 85,
      email: true,
      sms: true,
      push: false,
      webhook: false
    },
    {
      category: "Rozbite szkło",
      minConfidence: 75,
      email: true,
      sms: false,
      push: true,
      webhook: false
    },
    {
      category: "Krzyk",
      minConfidence: 70,
      email: true,
      sms: false,
      push: false,
      webhook: false
    },
    {
      category: "Alarm",
      minConfidence: 80,
      email: false,
      sms: false,
      push: true,
      webhook: true
    }
  ])

  const toggleApiKeyVisibility = (keyId) => {
    setShowApiKey(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }))
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  const toggleApiKeyStatus = (keyId) => {
    setApiKeys(prev => prev.map(key => 
      key.id === keyId ? { ...key, isActive: !key.isActive } : key
    ))
  }

  const deleteApiKey = (keyId) => {
    setApiKeys(prev => prev.filter(key => key.id !== keyId))
  }

  const addNewApiKey = () => {
    if (!newApiKeyName.trim()) return

    const newKey = {
      id: Date.now(),
      name: newApiKeyName,
      description: newApiKeyDescription,
      key: `ak_${Math.random().toString(36).substring(2, 34)}`,
      isActive: true,
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      lastUsed: "Nigdy"
    }

    setApiKeys(prev => [...prev, newKey])
    setNewApiKeyName("")
    setNewApiKeyDescription("")
  }

  const updateNotificationSetting = (category, field, value) => {
    setNotificationSettings(prev => prev.map(setting =>
      setting.category === category ? { ...setting, [field]: value } : setting
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Powrót do dashboardu
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Ustawienia systemu</h1>
              <p className="text-gray-600">Zarządzanie kontem, kluczami API i powiadomieniami</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profil użytkownika</TabsTrigger>
            <TabsTrigger value="api-keys">Klucze API</TabsTrigger>
            <TabsTrigger value="notifications">Powiadomienia</TabsTrigger>
            <TabsTrigger value="security">Bezpieczeństwo</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Informacje o koncie</CardTitle>
                <CardDescription>
                  Zarządzanie podstawowymi informacjami o Twoim koncie
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="username">Nazwa użytkownika</Label>
                    <Input 
                      id="username" 
                      value={profileData.username}
                      onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Adres email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Status konta</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant={userProfile.status === 'active' ? 'default' : 'secondary'}>
                        {userProfile.status === 'active' ? 'Aktywne' : 'Nieaktywne'}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Rola</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{userProfile.role}</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Ostatnie logowanie</Label>
                    <p className="text-sm text-gray-600">{userProfile.lastLogin}</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button>Zapisz zmiany</Button>
                  <Button variant="outline">Zmień hasło</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Keys Tab */}
          <TabsContent value="api-keys" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Zarządzanie kluczami API</CardTitle>
                <CardDescription>
                  Twórz i zarządzaj kluczami API do autoryzacji urządzeń i aplikacji
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add New API Key */}
                <div className="p-4 border rounded-lg bg-gray-50">
                  <h3 className="font-semibold mb-4">Dodaj nowy klucz API</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="keyName">Nazwa klucza</Label>
                      <Input 
                        id="keyName" 
                        placeholder="np. Klucz produkcyjny"
                        value={newApiKeyName}
                        onChange={(e) => setNewApiKeyName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keyDescription">Opis (opcjonalny)</Label>
                      <Input 
                        id="keyDescription" 
                        placeholder="Przeznaczenie klucza"
                        value={newApiKeyDescription}
                        onChange={(e) => setNewApiKeyDescription(e.target.value)}
                      />
                    </div>
                  </div>
                  <Button onClick={addNewApiKey} className="mt-4" disabled={!newApiKeyName.trim()}>
                    <Plus className="w-4 h-4 mr-2" />
                    Utwórz klucz API
                  </Button>
                </div>

                {/* Existing API Keys */}
                <div className="space-y-4">
                  {apiKeys.map((apiKey) => (
                    <div key={apiKey.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{apiKey.name}</h3>
                          <p className="text-sm text-gray-600">{apiKey.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={apiKey.isActive ? 'default' : 'secondary'}>
                            {apiKey.isActive ? 'Aktywny' : 'Nieaktywny'}
                          </Badge>
                          <Switch 
                            checked={apiKey.isActive}
                            onCheckedChange={() => toggleApiKeyStatus(apiKey.id)}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm">Klucz API:</Label>
                          <div className="flex items-center space-x-2 flex-1">
                            <code className="bg-gray-100 px-2 py-1 rounded text-sm flex-1">
                              {showApiKey[apiKey.id] ? apiKey.key : '••••••••••••••••••••••••••••••••'}
                            </code>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toggleApiKeyVisibility(apiKey.id)}
                            >
                              {showApiKey[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => copyToClipboard(apiKey.key)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                          <div>Utworzony: {apiKey.createdAt}</div>
                          <div>Ostatnie użycie: {apiKey.lastUsed}</div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-3">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => deleteApiKey(apiKey.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Usuń
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ustawienia powiadomień</CardTitle>
                <CardDescription>
                  Konfiguruj kanały i progi powiadomień dla różnych typów anomalii
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {notificationSettings.map((setting, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-lg">{setting.category}</h3>
                      <Badge variant="outline">
                        Próg: {setting.minConfidence}%
                      </Badge>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium">
                          Minimalny poziom pewności: {setting.minConfidence}%
                        </Label>
                        <Slider
                          value={[setting.minConfidence]}
                          onValueChange={(value) => updateNotificationSetting(setting.category, 'minConfidence', value[0])}
                          max={100}
                          min={50}
                          step={5}
                          className="mt-2"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={setting.email}
                            onCheckedChange={(checked) => updateNotificationSetting(setting.category, 'email', checked)}
                          />
                          <Mail className="w-4 h-4" />
                          <Label className="text-sm">Email</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={setting.sms}
                            onCheckedChange={(checked) => updateNotificationSetting(setting.category, 'sms', checked)}
                          />
                          <MessageSquare className="w-4 h-4" />
                          <Label className="text-sm">SMS</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={setting.push}
                            onCheckedChange={(checked) => updateNotificationSetting(setting.category, 'push', checked)}
                          />
                          <Smartphone className="w-4 h-4" />
                          <Label className="text-sm">Push</Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Switch 
                            checked={setting.webhook}
                            onCheckedChange={(checked) => updateNotificationSetting(setting.category, 'webhook', checked)}
                          />
                          <Globe className="w-4 h-4" />
                          <Label className="text-sm">Webhook</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button className="w-full">
                  Zapisz ustawienia powiadomień
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Ustawienia bezpieczeństwa</CardTitle>
                <CardDescription>
                  Zarządzanie bezpieczeństwem konta i dostępem do systemu
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Uwierzytelnianie dwuskładnikowe (2FA)</h3>
                      <p className="text-sm text-gray-600">Dodatkowa warstwa bezpieczeństwa dla Twojego konta</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">Wyłączone</Badge>
                      <Button variant="outline" size="sm">Włącz 2FA</Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Sesje aktywne</h3>
                      <p className="text-sm text-gray-600">Zarządzaj aktywnymi sesjami logowania</p>
                    </div>
                    <Button variant="outline" size="sm">Wyloguj wszystkie sesje</Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Historia logowań</h3>
                      <p className="text-sm text-gray-600">Przeglądaj ostatnie logowania do konta</p>
                    </div>
                    <Button variant="outline" size="sm">Zobacz historię</Button>
                  </div>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    Zalecamy włączenie uwierzytelniania dwuskładnikowego dla zwiększenia bezpieczeństwa konta.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
