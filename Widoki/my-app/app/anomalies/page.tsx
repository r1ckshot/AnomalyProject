"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, Search, Filter, Download, CalendarIcon, Volume2, Clock, Smartphone, MapPin, Eye, Trash2, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import Link from "next/link"
import { format } from "date-fns"
import { pl } from "date-fns/locale"

export default function AnomaliesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedDevice, setSelectedDevice] = useState("all")
  const [dateFrom, setDateFrom] = useState(null)
  const [dateTo, setDateTo] = useState(null)
  const [selectedAnomalies, setSelectedAnomalies] = useState([])

  // Rozszerzona lista anomalii
  const allAnomalies = [
    {
      id: 1,
      type: "Strzał",
      confidence: 94,
      timestamp: "2024-01-15 14:23:15",
      device: "Mikrofon-A1",
      location: "Centrum handlowe - Wejście główne",
      status: "Powiadomienie wysłane",
      coordinates: { lat: 52.2297, lng: 21.0122 },
      audioFile: "audio_001.wav",
      duration: "00:00:03"
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
      audioFile: "audio_002.wav",
      duration: "00:00:05"
    },
    {
      id: 3,
      type: "Krzyk",
      confidence: 76,
      timestamp: "2024-01-15 12:18:44",
      device: "Mikrofon-C2",
      location: "Parking podziemny",
      status: "Oczekuje na weryfikację",
      coordinates: { lat: 52.2295, lng: 21.0120 },
      audioFile: "audio_003.wav",
      duration: "00:00:02"
    },
    {
      id: 4,
      type: "Alarm",
      confidence: 91,
      timestamp: "2024-01-15 11:30:22",
      device: "Mikrofon-D1",
      location: "Restauracja",
      status: "Fałszywy alarm",
      coordinates: { lat: 52.2300, lng: 21.0118 },
      audioFile: "audio_004.wav",
      duration: "00:00:08"
    },
    {
      id: 5,
      type: "Strzał",
      confidence: 89,
      timestamp: "2024-01-14 16:45:11",
      device: "Mikrofon-A1",
      location: "Centrum handlowe - Wejście główne",
      status: "Powiadomienie wysłane",
      coordinates: { lat: 52.2297, lng: 21.0122 },
      audioFile: "audio_005.wav",
      duration: "00:00:04"
    },
    {
      id: 6,
      type: "Krzyk",
      confidence: 82,
      timestamp: "2024-01-14 15:22:33",
      device: "Mikrofon-E2",
      location: "Korytarz główny",
      status: "Zweryfikowane",
      coordinates: { lat: 52.2299, lng: 21.0123 },
      audioFile: "audio_006.wav",
      duration: "00:00:03"
    },
    {
      id: 7,
      type: "Rozbite szkło",
      confidence: 78,
      timestamp: "2024-01-14 14:10:55",
      device: "Mikrofon-B3",
      location: "Centrum handlowe - Sklep elektroniczny",
      status: "Oczekuje na weryfikację",
      coordinates: { lat: 52.2298, lng: 21.0125 },
      audioFile: "audio_007.wav",
      duration: "00:00:06"
    },
    {
      id: 8,
      type: "Wybuch",
      confidence: 95,
      timestamp: "2024-01-13 09:15:44",
      device: "Mikrofon-F1",
      location: "Parking zewnętrzny",
      status: "Powiadomienie wysłane",
      coordinates: { lat: 52.2294, lng: 21.0127 },
      audioFile: "audio_008.wav",
      duration: "00:00:02"
    }
  ]

  const devices = [
    "Mikrofon-A1", "Mikrofon-B3", "Mikrofon-C2", "Mikrofon-D1", "Mikrofon-E2", "Mikrofon-F1"
  ]

  const anomalyTypes = ["Strzał", "Rozbite szkło", "Krzyk", "Alarm", "Wybuch"]

  // Filtrowanie anomalii
  const filteredAnomalies = allAnomalies.filter(anomaly => {
    const matchesSearch = anomaly.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         anomaly.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         anomaly.device.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = selectedType === "all" || anomaly.type === selectedType
    const matchesStatus = selectedStatus === "all" || anomaly.status === selectedStatus
    const matchesDevice = selectedDevice === "all" || anomaly.device === selectedDevice
    
    return matchesSearch && matchesType && matchesStatus && matchesDevice
  })

  const toggleAnomalySelection = (anomalyId) => {
    setSelectedAnomalies(prev => 
      prev.includes(anomalyId) 
        ? prev.filter(id => id !== anomalyId)
        : [...prev, anomalyId]
    )
  }

  const selectAllAnomalies = () => {
    setSelectedAnomalies(filteredAnomalies.map(a => a.id))
  }

  const clearSelection = () => {
    setSelectedAnomalies([])
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Powiadomienie wysłane":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Oczekuje na weryfikację":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "Fałszywy alarm":
        return <XCircle className="w-4 h-4 text-red-600" />
      case "Zweryfikowane":
        return <CheckCircle className="w-4 h-4 text-blue-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case "Powiadomienie wysłane":
        return "default"
      case "Oczekuje na weryfikację":
        return "secondary"
      case "Fałszywy alarm":
        return "destructive"
      case "Zweryfikowane":
        return "outline"
      default:
        return "secondary"
    }
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
              <h1 className="text-3xl font-bold text-gray-900">Wszystkie anomalie</h1>
              <p className="text-gray-600">Przeglądaj i zarządzaj wykrytymi anomaliami dźwiękowymi</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {selectedAnomalies.length > 0 && (
              <Badge variant="outline">
                Wybrano: {selectedAnomalies.length}
              </Badge>
            )}
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Eksportuj
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filtry</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Wyszukaj</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Lokalizacja, typ, urządzenie..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Typ anomalii</Label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie typy</SelectItem>
                    {anomalyTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Status</Label>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie statusy</SelectItem>
                    <SelectItem value="Powiadomienie wysłane">Powiadomienie wysłane</SelectItem>
                    <SelectItem value="Oczekuje na weryfikację">Oczekuje na weryfikację</SelectItem>
                    <SelectItem value="Zweryfikowane">Zweryfikowane</SelectItem>
                    <SelectItem value="Fałszywy alarm">Fałszywy alarm</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Urządzenie</Label>
                <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie urządzenia</SelectItem>
                    {devices.map(device => (
                      <SelectItem key={device} value={device}>{device}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={selectAllAnomalies}>
                  Zaznacz wszystkie
                </Button>
                <Button variant="outline" size="sm" onClick={clearSelection}>
                  Odznacz wszystkie
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                Znaleziono {filteredAnomalies.length} z {allAnomalies.length} anomalii
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Anomalies List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista anomalii</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredAnomalies.map((anomaly) => (
                <div 
                  key={anomaly.id} 
                  className={`p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedAnomalies.includes(anomaly.id) ? 'bg-blue-50 border-blue-200' : ''
                  }`}
                  onClick={() => toggleAnomalySelection(anomaly.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedAnomalies.includes(anomaly.id)}
                        onChange={() => toggleAnomalySelection(anomaly.id)}
                        className="rounded"
                      />
                      <div className="p-2 bg-red-100 rounded-full">
                        <Volume2 className="w-4 h-4 text-red-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold">{anomaly.type}</h3>
                          <Badge variant={anomaly.confidence > 90 ? "destructive" : anomaly.confidence > 80 ? "default" : "secondary"}>
                            {anomaly.confidence}%
                          </Badge>
                          <Badge variant={getStatusVariant(anomaly.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(anomaly.status)}
                              <span>{anomaly.status}</span>
                            </div>
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
                          <span className="flex items-center">
                            <Volume2 className="w-3 h-3 mr-1" />
                            {anomaly.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        Szczegóły
                      </Button>
                      <Button variant="outline" size="sm">
                        <MapPin className="w-4 h-4 mr-1" />
                        Mapa
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredAnomalies.length === 0 && (
              <div className="text-center py-8">
                <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium">Nie znaleziono anomalii</p>
                <p className="text-gray-600">Spróbuj zmienić kryteria wyszukiwania</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
