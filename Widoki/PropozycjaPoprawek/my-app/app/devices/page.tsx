"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  ArrowLeft,
  Plus,
  Smartphone,
  Wifi,
  Battery,
  Settings,
  Trash2,
  Edit,
  MapPin,
  Activity,
  AlertTriangle,
  CheckCircle,
  Signal,
} from "lucide-react"
import Link from "next/link"

export default function DevicesPage() {
  const [devices, setDevices] = useState([
    {
      id: 1,
      name: "Mikrofon-A1",
      status: "active",
      location: "Wejście główne",
      lastPing: "2 min temu",
      ipAddress: "192.168.1.101",
      batteryLevel: 85,
      signalStrength: 92,
      firmware: "v2.1.3",
      installDate: "2024-01-10",
      anomaliesDetected: 15,
      coordinates: { lat: 52.2297, lng: 21.0122 },
    },
    {
      id: 2,
      name: "Mikrofon-B3",
      status: "active",
      location: "Sklep elektroniczny",
      lastPing: "1 min temu",
      ipAddress: "192.168.1.102",
      batteryLevel: 92,
      signalStrength: 88,
      firmware: "v2.1.3",
      installDate: "2024-01-12",
      anomaliesDetected: 8,
      coordinates: { lat: 52.2298, lng: 21.0125 },
    },
    {
      id: 3,
      name: "Mikrofon-C2",
      status: "active",
      location: "Parking podziemny",
      lastPing: "3 min temu",
      ipAddress: "192.168.1.103",
      batteryLevel: 67,
      signalStrength: 75,
      firmware: "v2.1.2",
      installDate: "2024-01-08",
      anomaliesDetected: 12,
      coordinates: { lat: 52.2295, lng: 21.012 },
    },
    {
      id: 4,
      name: "Mikrofon-D1",
      status: "inactive",
      location: "Restauracja",
      lastPing: "15 min temu",
      ipAddress: "192.168.1.104",
      batteryLevel: 23,
      signalStrength: 45,
      firmware: "v2.1.1",
      installDate: "2024-01-05",
      anomaliesDetected: 3,
      coordinates: { lat: 52.23, lng: 21.0118 },
    },
  ])

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newDevice, setNewDevice] = useState({
    name: "",
    location: "",
    ipAddress: "",
    description: "",
    deviceType: "microphone",
    sensitivity: 75,
  })

  const addNewDevice = () => {
    if (!newDevice.name || !newDevice.location) return

    const device = {
      id: Date.now(),
      name: newDevice.name,
      status: "active",
      location: newDevice.location,
      lastPing: "Teraz",
      ipAddress: newDevice.ipAddress || `192.168.1.${100 + devices.length + 1}`,
      batteryLevel: 100,
      signalStrength: 85,
      firmware: "v2.1.3",
      installDate: new Date().toISOString().split("T")[0],
      anomaliesDetected: 0,
      coordinates: { lat: 52.2299, lng: 21.0123 },
      deviceType: newDevice.deviceType,
      sensitivity: newDevice.sensitivity,
      description: newDevice.description,
    }

    setDevices((prev) => [...prev, device])
    setNewDevice({
      name: "",
      location: "",
      ipAddress: "",
      description: "",
      deviceType: "microphone",
      sensitivity: 75,
    })
    setIsAddDialogOpen(false)
  }

  const toggleDeviceStatus = (deviceId) => {
    setDevices((prev) =>
      prev.map((device) =>
        device.id === deviceId ? { ...device, status: device.status === "active" ? "inactive" : "active" } : device,
      ),
    )
  }

  const deleteDevice = (deviceId) => {
    setDevices((prev) => prev.filter((device) => device.id !== deviceId))
  }

  const getBatteryColor = (level) => {
    if (level > 60) return "text-green-600"
    if (level > 30) return "text-yellow-600"
    return "text-red-600"
  }

  const getSignalColor = (strength) => {
    if (strength > 80) return "text-green-600"
    if (strength > 50) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
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
              <h1 className="text-3xl font-bold text-gray-900">Zarządzanie urządzeniami</h1>
              <p className="text-gray-600">Dodawaj, konfiguruj i monitoruj urządzenia audio</p>
            </div>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Dodaj urządzenie
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Dodaj nowe urządzenie</DialogTitle>
                <DialogDescription>Wprowadź informacje o nowym urządzeniu monitorującym dźwięk</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deviceName">Nazwa urządzenia *</Label>
                    <Input
                      id="deviceName"
                      placeholder="np. Mikrofon-E1"
                      value={newDevice.name}
                      onChange={(e) => setNewDevice((prev) => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deviceType">Typ urządzenia</Label>
                    <Select
                      value={newDevice.deviceType}
                      onValueChange={(value) => setNewDevice((prev) => ({ ...prev, deviceType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="microphone">Mikrofon</SelectItem>
                        <SelectItem value="sensor">Sensor dźwięku</SelectItem>
                        <SelectItem value="camera-audio">Kamera z audio</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deviceLocation">Lokalizacja *</Label>
                  <Input
                    id="deviceLocation"
                    placeholder="np. Korytarz główny, Sala konferencyjna A"
                    value={newDevice.location}
                    onChange={(e) => setNewDevice((prev) => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deviceIP">Adres IP</Label>
                    <Input
                      id="deviceIP"
                      placeholder="192.168.1.105"
                      value={newDevice.ipAddress}
                      onChange={(e) => setNewDevice((prev) => ({ ...prev, ipAddress: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sensitivity">Czułość (%)</Label>
                    <Input
                      id="sensitivity"
                      type="number"
                      min="1"
                      max="100"
                      placeholder="75"
                      value={newDevice.sensitivity}
                      onChange={(e) =>
                        setNewDevice((prev) => ({ ...prev, sensitivity: Number.parseInt(e.target.value) || 75 }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deviceDescription">Opis i uwagi</Label>
                  <Textarea
                    id="deviceDescription"
                    placeholder="Dodatkowe informacje o urządzeniu, specjalne instrukcje instalacji, itp."
                    value={newDevice.description}
                    onChange={(e) => setNewDevice((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Instrukcje instalacji:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Upewnij się, że urządzenie jest podłączone do sieci</li>
                    <li>• Skonfiguruj adres IP w ustawieniach urządzenia</li>
                    <li>• Przetestuj połączenie przed zapisaniem</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Anuluj
                </Button>
                <Button onClick={addNewDevice} disabled={!newDevice.name || !newDevice.location}>
                  <Plus className="w-4 h-4 mr-2" />
                  Dodaj urządzenie
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Łącznie urządzeń</CardTitle>
              <Smartphone className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{devices.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Aktywne</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {devices.filter((d) => d.status === "active").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nieaktywne</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {devices.filter((d) => d.status === "inactive").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Średni sygnał</CardTitle>
              <Signal className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(devices.reduce((acc, d) => acc + d.signalStrength, 0) / devices.length)}%
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Devices List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista urządzeń</CardTitle>
            <CardDescription>Szczegółowe informacje o wszystkich urządzeniach monitorujących</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {devices.map((device) => (
                <div key={device.id} className="p-6 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-3 rounded-full ${device.status === "active" ? "bg-green-100" : "bg-gray-100"}`}
                      >
                        <Smartphone
                          className={`w-6 h-6 ${device.status === "active" ? "text-green-600" : "text-gray-400"}`}
                        />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{device.name}</h3>
                        <p className="text-gray-600">{device.location}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <span>IP: {device.ipAddress}</span>
                          <span>Firmware: {device.firmware}</span>
                          <span>Zainstalowano: {device.installDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={device.status === "active" ? "default" : "secondary"}>
                        {device.status === "active" ? "Aktywne" : "Nieaktywne"}
                      </Badge>
                      <Switch
                        checked={device.status === "active"}
                        onCheckedChange={() => toggleDeviceStatus(device.id)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <Battery className={`w-4 h-4 ${getBatteryColor(device.batteryLevel)}`} />
                      <span className="text-sm">Bateria: {device.batteryLevel}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Wifi className={`w-4 h-4 ${getSignalColor(device.signalStrength)}`} />
                      <span className="text-sm">Sygnał: {device.signalStrength}%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">Anomalie: {device.anomaliesDetected}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-sm">Ostatni sygnał: {device.lastPing}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-1" />
                        Konfiguruj
                      </Button>
                      <Button variant="outline" size="sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        Pokaż na mapie
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edytuj
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteDevice(device.id)}
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
      </div>
    </div>
  )
}
