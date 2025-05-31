"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  Search,
  Filter,
  Download,
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Globe,
  Clock,
  Users,
  Eye,
  Trash2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Send,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"

export default function NotificationsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedChannel, setSelectedChannel] = useState("all")
  const [selectedNotifications, setSelectedNotifications] = useState([])

  // Rozszerzona lista powiadomień
  const allNotifications = [
    {
      id: 1,
      type: "Strzał",
      confidence: 94,
      timestamp: "2024-01-15 14:23:15",
      location: "Centrum handlowe - Wejście główne",
      device: "Mikrofon-A1",
      channels: ["Email", "SMS"],
      recipients: [
        { name: "Jan Kowalski", email: "jan.kowalski@policja.gov.pl", phone: "+48123456789", type: "email" },
        { name: "Anna Nowak", email: "anna.nowak@ochrona.com", phone: "+48987654321", type: "sms" },
        { name: "Centrum Dowodzenia", email: "centrum@policja.gov.pl", phone: "+48555123456", type: "email" },
      ],
      status: "Dostarczono",
      deliveryTime: "2024-01-15 14:23:18",
      retryCount: 0,
      priority: "Wysoki",
    },
    {
      id: 2,
      type: "Rozbite szkło",
      confidence: 87,
      timestamp: "2024-01-15 13:45:32",
      location: "Centrum handlowe - Sklep elektroniczny",
      device: "Mikrofon-B3",
      channels: ["Email", "Push"],
      recipients: [
        { name: "Ochrona sklepu", email: "ochrona@sklep.com", type: "email" },
        { name: "Manager", email: "manager@sklep.com", type: "push" },
      ],
      status: "Dostarczono",
      deliveryTime: "2024-01-15 13:45:35",
      retryCount: 0,
      priority: "Średni",
    },
    {
      id: 3,
      type: "Krzyk",
      confidence: 76,
      timestamp: "2024-01-15 12:18:44",
      location: "Parking podziemny",
      device: "Mikrofon-C2",
      channels: ["Email"],
      recipients: [{ name: "Ochrona parkingu", email: "parking@ochrona.com", type: "email" }],
      status: "Oczekuje",
      deliveryTime: null,
      retryCount: 2,
      priority: "Niski",
    },
    {
      id: 4,
      type: "Alarm",
      confidence: 91,
      timestamp: "2024-01-15 11:30:22",
      location: "Restauracja",
      device: "Mikrofon-D1",
      channels: ["Push", "Webhook"],
      recipients: [
        { name: "System zarządzania", webhook: "https://api.restaurant.com/alerts", type: "webhook" },
        { name: "Manager restauracji", email: "manager@restaurant.com", type: "push" },
      ],
      status: "Dostarczono",
      deliveryTime: "2024-01-15 11:30:25",
      retryCount: 0,
      priority: "Wysoki",
    },
    {
      id: 5,
      type: "Strzał",
      confidence: 89,
      timestamp: "2024-01-14 16:45:11",
      location: "Centrum handlowe - Wejście główne",
      device: "Mikrofon-A1",
      channels: ["Email", "SMS"],
      recipients: [
        { name: "Jan Kowalski", email: "jan.kowalski@policja.gov.pl", phone: "+48123456789", type: "email" },
        { name: "Anna Nowak", email: "anna.nowak@ochrona.com", phone: "+48987654321", type: "sms" },
      ],
      status: "Błąd dostarczenia",
      deliveryTime: null,
      retryCount: 3,
      priority: "Wysoki",
    },
    {
      id: 6,
      type: "Wybuch",
      confidence: 95,
      timestamp: "2024-01-13 09:15:44",
      location: "Parking zewnętrzny",
      device: "Mikrofon-F1",
      channels: ["Email", "SMS", "Push", "Webhook"],
      recipients: [
        { name: "Straż Pożarna", email: "alarm@straz.gov.pl", phone: "+48112", type: "sms" },
        { name: "Policja", email: "alarm@policja.gov.pl", phone: "+48997", type: "sms" },
        { name: "Centrum Dowodzenia", email: "centrum@policja.gov.pl", type: "email" },
        { name: "System zarządzania kryzysowego", webhook: "https://api.crisis.gov.pl/alerts", type: "webhook" },
      ],
      status: "Dostarczono",
      deliveryTime: "2024-01-13 09:15:47",
      retryCount: 0,
      priority: "Krytyczny",
    },
  ]

  const anomalyTypes = ["Strzał", "Rozbite szkło", "Krzyk", "Alarm", "Wybuch"]
  const channels = ["Email", "SMS", "Push", "Webhook"]

  // Filtrowanie powiadomień
  const filteredNotifications = allNotifications.filter((notification) => {
    const matchesSearch =
      notification.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.device.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = selectedType === "all" || notification.type === selectedType
    const matchesStatus = selectedStatus === "all" || notification.status === selectedStatus
    const matchesChannel = selectedChannel === "all" || notification.channels.includes(selectedChannel)

    return matchesSearch && matchesType && matchesStatus && matchesChannel
  })

  const toggleNotificationSelection = (notificationId) => {
    setSelectedNotifications((prev) =>
      prev.includes(notificationId) ? prev.filter((id) => id !== notificationId) : [...prev, notificationId],
    )
  }

  const selectAllNotifications = () => {
    setSelectedNotifications(filteredNotifications.map((n) => n.id))
  }

  const clearSelection = () => {
    setSelectedNotifications([])
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Dostarczono":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "Oczekuje":
        return <Clock className="w-4 h-4 text-yellow-600" />
      case "Błąd dostarczenia":
        return <XCircle className="w-4 h-4 text-red-600" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case "Dostarczono":
        return "default"
      case "Oczekuje":
        return "secondary"
      case "Błąd dostarczenia":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case "Krytyczny":
        return "destructive"
      case "Wysoki":
        return "destructive"
      case "Średni":
        return "default"
      case "Niski":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getChannelIcon = (channel) => {
    switch (channel) {
      case "Email":
        return <Mail className="w-3 h-3" />
      case "SMS":
        return <MessageSquare className="w-3 h-3" />
      case "Push":
        return <Smartphone className="w-3 h-3" />
      case "Webhook":
        return <Globe className="w-3 h-3" />
      default:
        return <Bell className="w-3 h-3" />
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
              <h1 className="text-3xl font-bold text-gray-900">Wszystkie powiadomienia</h1>
              <p className="text-gray-600">Historia i szczegóły wysłanych powiadomień o anomaliach</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {selectedNotifications.length > 0 && (
              <Badge variant="outline">Wybrano: {selectedNotifications.length}</Badge>
            )}
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Ponów wysyłanie
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Eksportuj
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Łącznie powiadomień</CardTitle>
              <Bell className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{allNotifications.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Dostarczono</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {allNotifications.filter((n) => n.status === "Dostarczono").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Oczekuje</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {allNotifications.filter((n) => n.status === "Oczekuje").length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Błędy</CardTitle>
              <XCircle className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {allNotifications.filter((n) => n.status === "Błąd dostarczenia").length}
              </div>
            </CardContent>
          </Card>
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
                    {anomalyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
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
                    <SelectItem value="Dostarczono">Dostarczono</SelectItem>
                    <SelectItem value="Oczekuje">Oczekuje</SelectItem>
                    <SelectItem value="Błąd dostarczenia">Błąd dostarczenia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Kanał</Label>
                <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Wszystkie kanały</SelectItem>
                    {channels.map((channel) => (
                      <SelectItem key={channel} value={channel}>
                        {channel}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={selectAllNotifications}>
                  Zaznacz wszystkie
                </Button>
                <Button variant="outline" size="sm" onClick={clearSelection}>
                  Odznacz wszystkie
                </Button>
              </div>
              <p className="text-sm text-gray-600">
                Znaleziono {filteredNotifications.length} z {allNotifications.length} powiadomień
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle>Lista powiadomień</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedNotifications.includes(notification.id) ? "bg-blue-50 border-blue-200" : ""
                  }`}
                  onClick={() => toggleNotificationSelection(notification.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={selectedNotifications.includes(notification.id)}
                        onChange={() => toggleNotificationSelection(notification.id)}
                        className="rounded"
                      />
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
                          <Badge variant={getPriorityVariant(notification.priority)}>{notification.priority}</Badge>
                          <Badge variant={getStatusVariant(notification.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(notification.status)}
                              <span>{notification.status}</span>
                            </div>
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
                            {notification.recipients.length} odbiorców
                          </span>
                          <div className="flex items-center space-x-1">
                            {notification.channels.map((channel, index) => (
                              <div key={index} className="flex items-center space-x-1">
                                {getChannelIcon(channel)}
                                <span>{channel}</span>
                              </div>
                            ))}
                          </div>
                          {notification.retryCount > 0 && (
                            <span className="text-red-500">Ponowiono: {notification.retryCount}x</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Szczegóły
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Szczegóły powiadomienia</DialogTitle>
                            <DialogDescription>
                              Informacje o powiadomieniu dla anomalii: {notification.type}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label className="text-sm font-medium">Typ anomalii</Label>
                                <p className="text-sm">{notification.type}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Poziom pewności</Label>
                                <p className="text-sm">{notification.confidence}%</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Priorytet</Label>
                                <Badge variant={getPriorityVariant(notification.priority)}>
                                  {notification.priority}
                                </Badge>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Status</Label>
                                <Badge variant={getStatusVariant(notification.status)}>{notification.status}</Badge>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Czas wykrycia</Label>
                                <p className="text-sm">{notification.timestamp}</p>
                              </div>
                              <div>
                                <Label className="text-sm font-medium">Czas dostarczenia</Label>
                                <p className="text-sm">{notification.deliveryTime || "Nie dostarczono"}</p>
                              </div>
                            </div>

                            <div>
                              <Label className="text-sm font-medium">Lokalizacja</Label>
                              <p className="text-sm">{notification.location}</p>
                            </div>

                            <div>
                              <Label className="text-sm font-medium">Urządzenie</Label>
                              <p className="text-sm">{notification.device}</p>
                            </div>

                            <div>
                              <Label className="text-sm font-medium">Odbiorcy ({notification.recipients.length})</Label>
                              <div className="space-y-2 mt-2">
                                {notification.recipients.map((recipient, index) => (
                                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                                    <div>
                                      <p className="text-sm font-medium">{recipient.name}</p>
                                      <p className="text-xs text-gray-600">
                                        {recipient.email && `Email: ${recipient.email}`}
                                        {recipient.phone && ` | Tel: ${recipient.phone}`}
                                        {recipient.webhook && `Webhook: ${recipient.webhook}`}
                                      </p>
                                    </div>
                                    <Badge variant="outline">
                                      {getChannelIcon(recipient.type)}
                                      <span className="ml-1">{recipient.type}</span>
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      {notification.status === "Błąd dostarczenia" && (
                        <Button variant="outline" size="sm" className="text-blue-600">
                          <Send className="w-4 h-4 mr-1" />
                          Ponów
                        </Button>
                      )}

                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredNotifications.length === 0 && (
              <div className="text-center py-8">
                <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium">Nie znaleziono powiadomień</p>
                <p className="text-gray-600">Spróbuj zmienić kryteria wyszukiwania</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
