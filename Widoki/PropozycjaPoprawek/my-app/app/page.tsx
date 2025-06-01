"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  AlertTriangle,
  MapPin,
  Volume2,
  Shield,
  Bell,
  Users,
  Smartphone,
  Activity,
  Clock,
  CheckCircle,
  XCircle,
  Upload,
  Settings,
} from "lucide-react"
import Link from "next/link"

export default function SoundAnomalyDashboard() {
  const [selectedAnomaly, setSelectedAnomaly] = useState(null)

  // Przykładowe dane
  const recentAnomalies = [
    {
      id: 1,
      type: "Strzał",
      confidence: 94,
      timestamp: "2024-01-15 14:23:15",
      device: "Mikrofon-A1",
      location: "Centrum handlowe - Wejście główne",
      status: "Powiadomienie wysłane",
      coordinates: { lat: 52.2297, lng: 21.0122 },
    },
    {
      id: 2,
      type: "Rozbite szkło",
      confidence: 87,
      timestamp: "2024-01-15 13:45:32",
      device: "Mikrofon-B3",
      location: "Centrum handlowe - Sklep elektroniczny",
      status: "Powiadomienie wysłane",
      coordinates: { lat: 52.2298, lng: 21.0125 },
    },
    {
      id: 3,
      type: "Krzyk",
      confidence: 76,
      timestamp: "2024-01-15 12:18:44",
      device: "Mikrofon-C2",
      location: "Parking podziemny",
      status: "Oczekuje na weryfikację",
      coordinates: { lat: 52.2295, lng: 21.012 },
    },
  ]

  const devices = [
    { id: 1, name: "Mikrofon-A1", status: "active", location: "Wejście główne", lastPing: "2 min temu" },
    { id: 2, name: "Mikrofon-B3", status: "active", location: "Sklep elektroniczny", lastPing: "1 min temu" },
    { id: 3, name: "Mikrofon-C2", status: "active", location: "Parking podziemny", lastPing: "3 min temu" },
    { id: 4, name: "Mikrofon-D1", status: "inactive", location: "Restauracja", lastPing: "15 min temu" },
  ]

  const stats = {
    totalAnomalies: 127,
    todayAnomalies: 8,
    activeDevices: 15,
    totalDevices: 18,
    avgConfidence: 85,
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">System Wykrywania Anomalnych Dźwięków</h1>
            <p className="text-gray-600">Monitoring w czasie rzeczywistym i analiza plików audio</p>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/upload">
              <Button variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Wgraj plik audio
              </Button>
            </Link>
            <Link href="/settings">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Ustawienia
              </Button>
            </Link>
            <Avatar>
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Anomalie dzisiaj</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.todayAnomalies}</div>
              <p className="text-xs text-muted-foreground">+2 od wczoraj</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Łącznie anomalii</CardTitle>
              <Activity className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAnomalies}</div>
              <p className="text-xs text-muted-foreground">Ostatnie 30 dni</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktywne urządzenia</CardTitle>
              <Smartphone className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stats.activeDevices}/{stats.totalDevices}
              </div>
              <Progress value={(stats.activeDevices / stats.totalDevices) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Średnia pewność</CardTitle>
              <Shield className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgConfidence}%</div>
              <p className="text-xs text-muted-foreground">Wykrycia AI</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Status systemu</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Online</div>
              <p className="text-xs text-muted-foreground">Wszystko działa</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="anomalies" className="space-y-6">
          <TabsList>
            <TabsTrigger value="anomalies">Wykryte anomalie</TabsTrigger>
            <TabsTrigger value="devices">Urządzenia</TabsTrigger>
            <TabsTrigger value="map">Mapa</TabsTrigger>
            <TabsTrigger value="notifications">Powiadomienia</TabsTrigger>
          </TabsList>

          <TabsContent value="anomalies" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Wykryte anomalie</CardTitle>
                    <CardDescription>
                      Lista ostatnich anomalii wykrytych przez system w czasie rzeczywistym i z wgranych plików
                    </CardDescription>
                  </div>
                  <Link href="/anomalies">
                    <Button>
                      <Activity className="w-4 h-4 mr-2" />
                      Szczegółowy widok
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAnomalies.map((anomaly) => (
                    <div
                      key={anomaly.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-red-100 rounded-full">
                          <Volume2 className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{anomaly.type}</h3>
                            <Badge
                              variant={
                                anomaly.confidence > 90
                                  ? "destructive"
                                  : anomaly.confidence > 80
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {anomaly.confidence}% pewności
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{anomaly.location}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {anomaly.timestamp}
                            </span>
                            <span className="flex items-center">
                              <Smartphone className="w-3 h-3 mr-1" />
                              {anomaly.device}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={anomaly.status === "Powiadomienie wysłane" ? "default" : "secondary"}>
                          {anomaly.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          Pokaż na mapie
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="devices" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Zarządzanie urządzeniami</CardTitle>
                    <CardDescription>Status i konfiguracja urządzeń monitorujących</CardDescription>
                  </div>
                  <Link href="/devices">
                    <Button>
                      <Activity className="w-4 h-4 mr-2" />
                      Szczegółowy widok
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {devices.map((device) => (
                    <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-full ${device.status === "active" ? "bg-green-100" : "bg-gray-100"}`}
                        >
                          <Smartphone
                            className={`w-4 h-4 ${device.status === "active" ? "text-green-600" : "text-gray-400"}`}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold">{device.name}</h3>
                          <p className="text-sm text-gray-600">{device.location}</p>
                          <p className="text-xs text-gray-500">Ostatni sygnał: {device.lastPing}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={device.status === "active" ? "default" : "secondary"}>
                          {device.status === "active" ? "Aktywne" : "Nieaktywne"}
                        </Badge>
                        <Button variant="outline" size="sm">
                          Konfiguruj
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Mapa anomalii</CardTitle>
                <CardDescription>Wizualizacja wykrytych anomalii na mapie z lokalizacją urządzeń</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Mapa zostanie załadowana tutaj</p>
                    <p className="text-sm text-gray-500">Integracja z Google Maps lub OpenStreetMap</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Ostatnie powiadomienia</CardTitle>
                    <CardDescription>Lista ostatnio wysłanych powiadomień o wykrytych anomaliach</CardDescription>
                  </div>
                  <Link href="/notifications">
                    <Button>
                      <Bell className="w-4 h-4 mr-2" />
                      Wszystkie powiadomienia
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      id: 1,
                      type: "Strzał",
                      confidence: 94,
                      timestamp: "2024-01-15 14:23:15",
                      location: "Centrum handlowe - Wejście główne",
                      channels: ["Email", "SMS"],
                      recipients: 3,
                      status: "Dostarczono",
                      device: "Mikrofon-A1",
                    },
                    {
                      id: 2,
                      type: "Rozbite szkło",
                      confidence: 87,
                      timestamp: "2024-01-15 13:45:32",
                      location: "Centrum handlowe - Sklep elektroniczny",
                      channels: ["Email", "Push"],
                      recipients: 2,
                      status: "Dostarczono",
                      device: "Mikrofon-B3",
                    },
                    {
                      id: 3,
                      type: "Krzyk",
                      confidence: 76,
                      timestamp: "2024-01-15 12:18:44",
                      location: "Parking podziemny",
                      channels: ["Email"],
                      recipients: 1,
                      status: "Oczekuje",
                      device: "Mikrofon-C2",
                    },
                    {
                      id: 4,
                      type: "Alarm",
                      confidence: 91,
                      timestamp: "2024-01-15 11:30:22",
                      location: "Restauracja",
                      channels: ["Push", "Webhook"],
                      recipients: 4,
                      status: "Dostarczono",
                      device: "Mikrofon-D1",
                    },
                  ].map((notification) => (
                    <div
                      key={notification.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-blue-100 rounded-full">
                          <Bell className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold">{notification.type}</h3>
                            <Badge
                              variant={
                                notification.confidence > 90
                                  ? "destructive"
                                  : notification.confidence > 80
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {notification.confidence}%
                            </Badge>
                            <Badge variant={notification.status === "Dostarczono" ? "default" : "secondary"}>
                              {notification.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{notification.location}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <span className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {notification.timestamp}
                            </span>
                            <span className="flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              {notification.recipients} odbiorców
                            </span>
                            <span>Kanały: {notification.channels.join(", ")}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Szczegóły
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ustawienia powiadomień</CardTitle>
                <CardDescription>Szybki podgląd konfiguracji kanałów powiadomień</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Strzały</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Próg pewności:</span>
                        <Badge>85%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email:</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">SMS:</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Push:</span>
                        <XCircle className="w-4 h-4 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Rozbite szkło</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Próg pewności:</span>
                        <Badge>75%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email:</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">SMS:</span>
                        <XCircle className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Push:</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Krzyki</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Próg pewności:</span>
                        <Badge>70%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Email:</span>
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">SMS:</span>
                        <XCircle className="w-4 h-4 text-gray-400" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Push:</span>
                        <XCircle className="w-4 h-4 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-6">
                  <Link href="/settings">
                    <Button variant="outline" className="w-full">
                      <Settings className="w-4 h-4 mr-2" />
                      Przejdź do szczegółowych ustawień powiadomień
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
