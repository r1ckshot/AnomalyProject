"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileAudio, CheckCircle, AlertTriangle, Clock, Volume2, BarChart3, ArrowLeft } from 'lucide-react'
import Link from "next/link"

export default function FileUploadPage() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)
  const [selectedApiKey, setSelectedApiKey] = useState("")
  const [dragActive, setDragActive] = useState(false)

  // Przykładowe klucze API użytkownika
  const apiKeys = [
    { id: 1, name: "Klucz główny", description: "Do analizy dowodów", key: "ak_1234...abcd" },
    { id: 2, name: "Klucz testowy", description: "Do testów systemu", key: "ak_5678...efgh" },
    { id: 3, name: "Klucz mobilny", description: "Do aplikacji mobilnej", key: "ak_9012...ijkl" }
  ]

  // Przykładowe wyniki analizy
  const mockAnalysisResults = {
    timestamp: "2024-01-15 15:30:22",
    duration: "00:02:15",
    fileSize: "2.3 MB",
    format: "WAV, 44.1kHz, 16-bit",
    detectedAnomalies: [
      { category: "Strzał", confidence: 94, timestamp: "00:00:15", description: "Pojedynczy strzał z broni palnej" },
      { category: "Krzyk", confidence: 87, timestamp: "00:00:18", description: "Krzyk osoby w stresie" },
      { category: "Rozbite szkło", confidence: 78, timestamp: "00:00:22", description: "Dźwięk tłuczonego szkła" }
    ],
    allCategories: [
      { name: "Strzał", confidence: 94, isAnomaly: true },
      { name: "Krzyk", confidence: 87, isAnomaly: true },
      { name: "Rozbite szkło", confidence: 78, isAnomaly: true },
      { name: "Alarm", confidence: 23, isAnomaly: false },
      { name: "Wypadek samochodowy", confidence: 12, isAnomaly: false },
      { name: "Wybuch", confidence: 8, isAnomaly: false },
      { name: "Syrena", confidence: 5, isAnomaly: false }
    ]
  }

  const handleDrag = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('audio/')) {
        setUploadedFile(file)
      }
    }
  }, [])

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const analyzeFile = async () => {
    if (!uploadedFile || !selectedApiKey) return
    
    setIsAnalyzing(true)
    
    // Symulacja analizy
    setTimeout(() => {
      setAnalysisResults(mockAnalysisResults)
      setIsAnalyzing(false)
    }, 3000)
  }

  const resetUpload = () => {
    setUploadedFile(null)
    setAnalysisResults(null)
    setIsAnalyzing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
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
              <h1 className="text-3xl font-bold text-gray-900">Analiza plików audio</h1>
              <p className="text-gray-600">Wgraj plik audio do analizy przez system AI</p>
            </div>
          </div>
        </div>

        {!analysisResults ? (
          <div className="space-y-6">
            {/* API Key Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Wybierz klucz API</CardTitle>
                <CardDescription>
                  Wybierz klucz API, który będzie użyty do autoryzacji analizy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={selectedApiKey} onValueChange={setSelectedApiKey}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz klucz API" />
                  </SelectTrigger>
                  <SelectContent>
                    {apiKeys.map((key) => (
                      <SelectItem key={key.id} value={key.id.toString()}>
                        <div className="flex flex-col">
                          <span className="font-medium">{key.name}</span>
                          <span className="text-sm text-gray-500">{key.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* File Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Wgraj plik audio</CardTitle>
                <CardDescription>
                  Obsługiwane formaty: WAV, MP3, FLAC, AAC (max 50MB)
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!uploadedFile ? (
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Przeciągnij plik tutaj lub kliknij, aby wybrać
                    </p>
                    <p className="text-gray-600 mb-4">
                      Maksymalny rozmiar pliku: 50MB
                    </p>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload">
                      <Button variant="outline" className="cursor-pointer">
                        Wybierz plik
                      </Button>
                    </label>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileAudio className="w-8 h-8 text-blue-600" />
                        <div>
                          <p className="font-medium">{uploadedFile.name}</p>
                          <p className="text-sm text-gray-600">
                            {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" onClick={resetUpload}>
                        Usuń
                      </Button>
                    </div>

                    {isAnalyzing ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-blue-600 animate-spin" />
                          <span className="text-sm font-medium">Analizowanie pliku...</span>
                        </div>
                        <Progress value={66} className="w-full" />
                        <p className="text-sm text-gray-600">
                          Przetwarzanie może potrwać kilka minut w zależności od długości pliku
                        </p>
                      </div>
                    ) : (
                      <Button 
                        onClick={analyzeFile} 
                        disabled={!selectedApiKey}
                        className="w-full"
                      >
                        <Volume2 className="w-4 h-4 mr-2" />
                        Rozpocznij analizę
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Info Alert */}
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Pliki audio nie są przechowywane w systemie. Analizowane są tylko metadane i wyniki klasyfikacji.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          /* Analysis Results */
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span>Analiza zakończona</span>
                    </CardTitle>
                    <CardDescription>
                      Plik: {uploadedFile.name} • Czas analizy: {analysisResults.timestamp}
                    </CardDescription>
                  </div>
                  <Button onClick={resetUpload} variant="outline">
                    Analizuj kolejny plik
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Czas trwania</p>
                    <p className="font-semibold">{analysisResults.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Rozmiar pliku</p>
                    <p className="font-semibold">{analysisResults.fileSize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Format</p>
                    <p className="font-semibold">{analysisResults.format}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Wykryte anomalie</p>
                    <p className="font-semibold text-red-600">{analysisResults.detectedAnomalies.length}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="anomalies" className="space-y-6">
              <TabsList>
                <TabsTrigger value="anomalies">Wykryte anomalie</TabsTrigger>
                <TabsTrigger value="all-results">Wszystkie wyniki</TabsTrigger>
              </TabsList>

              <TabsContent value="anomalies">
                <Card>
                  <CardHeader>
                    <CardTitle>Wykryte anomalie dźwiękowe</CardTitle>
                    <CardDescription>
                      Anomalie wykryte z poziomem pewności powyżej progu
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {analysisResults.detectedAnomalies.length > 0 ? (
                      <div className="space-y-4">
                        {analysisResults.detectedAnomalies.map((anomaly, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="p-2 bg-red-100 rounded-full">
                                <Volume2 className="w-4 h-4 text-red-600" />
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <h3 className="font-semibold">{anomaly.category}</h3>
                                  <Badge variant="destructive">{anomaly.confidence}%</Badge>
                                </div>
                                <p className="text-sm text-gray-600">{anomaly.description}</p>
                                <p className="text-xs text-gray-500">Znacznik czasu: {anomaly.timestamp}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                        <p className="text-lg font-medium">Nie wykryto anomalii</p>
                        <p className="text-gray-600">Plik audio nie zawiera podejrzanych dźwięków</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="all-results">
                <Card>
                  <CardHeader>
                    <CardTitle>Kompletne wyniki klasyfikacji</CardTitle>
                    <CardDescription>
                      Poziomy pewności dla wszystkich kategorii dźwięków
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {analysisResults.allCategories.map((category, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="font-medium">{category.name}</span>
                            {category.isAnomaly && (
                              <Badge variant="destructive" className="text-xs">Anomalia</Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="w-32">
                              <Progress value={category.confidence} className="h-2" />
                            </div>
                            <span className="text-sm font-medium w-12 text-right">
                              {category.confidence}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
