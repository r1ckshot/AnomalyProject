# System wykrywania anomalnych dźwięków

## Struktura bazy danych

Baza danych systemu wykrywania anomalnych dźwięków składa się z następujących tabel:

### 1. Users (Użytkownicy)
- `user_id` (PK): Liczba całkowita, klucz główny
- `username`: Ciąg znaków, unikalny
- `email`: Ciąg znaków, unikalny
- `password_hash`: Ciąg znaków (hash hasła)
- `created_at`: Data i czas
- `last_login`: Data i czas
- `status`: Wyliczenie ('active', 'blocked')

### 2. API_Keys (Klucze API)
- `key_id` (PK): Liczba całkowita, klucz główny
- `user_id` (FK): Klucz obcy do tabeli Users
- `api_key`: Ciąg znaków, unikalny (hashowany klucz)
- `created_at`: Data i czas
- `is_active`: Boolean
- `description`: Ciąg znaków (opis przeznaczenia klucza)

### 3. Client_Devices (Urządzenia klienckie)
- `device_id` (PK): Liczba całkowita, klucz główny
- `user_id` (FK): Klucz obcy do tabeli Users
- `api_key_id` (FK): Klucz obcy do tabeli API_Keys
- `device_name`: Ciąg znaków (nazwa urządzenia)
- `device_identifier`: Ciąg znaków, unikalny
- `location`: Ciąg znaków (lokalizacja)
- `created_at`: Data i czas
- `last_active`: Data i czas
- `status`: Wyliczenie ('active', 'inactive')

### 4. Sound_Categories (Kategorie dźwięków)
- `category_id` (PK): Liczba całkowita, klucz główny
- `name`: Ciąg znaków, unikalny (nazwa kategorii)
- `description`: Tekst (opis kategorii)
- `is_anomaly`: Boolean (czy jest anomalią)

### 5. Detected_Anomalies (Wykryte anomalie)
- `event_id` (PK): Liczba całkowita, klucz główny
- `device_id` (FK): Klucz obcy do tabeli Client_Devices
- `category_id` (FK): Klucz obcy do tabeli Sound_Categories
- `timestamp`: Data i czas wykrycia
- `confidence_score`: Liczba dziesiętna (poziom pewności wykrycia)
- `detected_categories`: JSON (wyniki klasyfikacji dla wszystkich kategorii)
- `audio_metadata`: JSON (metadane audio bez samej zawartości)
- `notification_sent`: Boolean (czy wysłano powiadomienie)
- `processing_time`: Liczba całkowita (czas przetwarzania w ms)

### 6. Notification_Settings (Ustawienia powiadomień)
- `setting_id` (PK): Liczba całkowita, klucz główny
- `user_id` (FK): Klucz obcy do tabeli Users
- `sound_category_id` (FK): Klucz obcy do tabeli Sound_Categories
- `min_confidence`: Liczba dziesiętna (minimalny poziom pewności dla powiadomienia)
- `notification_channels`: JSON (sposoby powiadamiania)
- `is_active`: Boolean

### 7. Sent_Notifications (Wysłane powiadomienia)
- `notification_id` (PK): Liczba całkowita, klucz główny
- `event_id` (FK): Klucz obcy do tabeli Detected_Anomalies
- `user_id` (FK): Klucz obcy do tabeli Users
- `timestamp`: Data i czas wysłania powiadomienia
- `channel`: Ciąg znaków (sposób wysyłki: 'email', 'sms', 'push', 'webhook')
- `recipient`: Ciąg znaków (adres odbiorcy - email, numer telefonu, itp.)
- `status`: Ciąg znaków (status doręczenia: 'sent', 'delivered', 'failed', 'read')
- `content`: Tekst (treść wysłanego powiadomienia)
- `error_message`: Ciąg znaków (komunikat o błędzie w przypadku nieudanego wysłania, może być null)

## Relacje między tabelami

1. **Users → API_Keys** (jeden-do-wielu): Użytkownik może mieć kilka kluczy API
2. **Users → Client_Devices** (jeden-do-wielu): Użytkownik może zarejestrować kilka urządzeń
3. **API_Keys → Client_Devices** (jeden-do-wielu): Klucz API może być używany przez kilka urządzeń
4. **Client_Devices → Detected_Anomalies** (jeden-do-wielu): Urządzenie może rejestrować wiele zdarzeń
5. **Sound_Categories → Detected_Anomalies** (jeden-do-wielu): Kategoria dźwięku może być wykryta wiele razy
6. **Users → Notification_Settings** (jeden-do-wielu): Użytkownik może konfigurować powiadomienia dla różnych kategorii
7. **Sound_Categories → Notification_Settings** (jeden-do-wielu): Dla kategorii dźwięku mogą istnieć różne ustawienia powiadomień
8. **Detected_Anomalies → Sent_Notifications** (jeden-do-wielu): Jedno zdarzenie może wywołać kilka powiadomień
9. **Users → Sent_Notifications** (jeden-do-wielu): Użytkownik może otrzymać wiele powiadomień

## Zasada działania systemu

### 1. Rejestracja i konfiguracja

Użytkownik (organizacja lub osoba prywatna) rejestruje się w systemie, tworząc wpis w tabeli `users`. Po rejestracji użytkownik otrzymuje klucz API, który jest zapisywany w tabeli `api_keys`. Ten klucz będzie używany do autoryzacji zapytań do API.

Następnie użytkownik rejestruje swoje urządzenia (np. specjalne mikrofony lub smartfony), które będą przesyłać dane audio. Informacje o urządzeniach są zapisywane w tabeli `client_devices` z powiązaniem do użytkownika i klucza API.

Użytkownik konfiguruje również, które typy anomalnych dźwięków go interesują i jak chce otrzymywać powiadomienia. Te ustawienia są zapisywane w tabeli `notification_settings` z powiązaniem do użytkownika i kategorii dźwięków z tabeli `sound_categories`.

### 2. Wykrywanie anomalii

Zarejestrowane urządzenia ciągle nagrywają dźwięki otoczenia i regularnie wysyłają krótkie fragmenty audio (np. po 5-10 sekund) do serwera API. Podczas wysyłania podawany jest klucz API do autoryzacji.

Serwer za pomocą modelu sztucznej inteligencji analizuje otrzymane dane audio. Jeśli wykryta zostanie anomalia (strzał, krzyk, rozbite szkło, wypadek itp.), system klasyfikuje typ anomalii i określa poziom pewności wykrycia.

Wyniki analizy zapisywane są w tabeli `detected_anomalies`, gdzie wskazywane jest urządzenie, które zarejestrowało dźwięk, kategoria dźwięku i poziom pewności. Przy tym same pliki audio nie są przechowywane, tylko metadane i wyniki analizy.

### 3. Wysyłanie powiadomień

Po wykryciu anomalii system sprawdza ustawienia powiadomień użytkownika w tabeli `notification_settings`. Jeśli typ wykrytego dźwięku i poziom pewności odpowiadają ustawieniom, system wysyła powiadomienie.

Informacje o każdym wysłanym powiadomieniu zapisywane są w tabeli `sent_notifications`, w tym sposób wysyłki (email, SMS, powiadomienie push) i status doręczenia. Pozwala to śledzić, czy powiadomienia zostały skutecznie dostarczone do użytkownika.

### 4. Monitoring i analiza

Użytkownik może przeglądać historię wykrytych anomalii przez interfejs webowy lub aplikację mobilną. Widzi, które urządzenia, kiedy i jakie dźwięki zarejestrowały.

Użytkownik może również przeglądać historię wysłanych powiadomień i ich statusy, co pomaga ocenić skuteczność systemu monitorowania.

## Praktyczny przykład użycia

Wyobraźmy sobie firmę ochroniarską, która zainstalowała urządzenia w centrum handlowym:

1. Firma ochroniarska rejestruje się w systemie i otrzymuje klucz API
2. Rejestruje 20 urządzeń, umieszczonych w różnych częściach centrum handlowego
3. Konfiguruje powiadomienia o strzałach, krzykach i rozbitym szkle z wysokim priorytetem
4. Urządzenia stale wysyłają fragmenty audio do analizy

Gdy w jednej z części centrum handlowego zostanie rozbite szkło, najbliższe urządzenie rejestruje ten dźwięk i wysyła go na serwer. System klasyfikuje dźwięk jako "rozbite szkło" z pewnością 85%, tworzy wpis w `detected_anomalies` i, po sprawdzeniu ustawień, wysyła powiadomienie na telefony ochrony. Informacja o wysłanym powiadomieniu zapisywana jest w `sent_notifications`.

Taka architektura zapewnia efektywne działanie systemu wykrywania anomalnych dźwięków bez konieczności przechowywania samych plików audio i bez przeciążania bazy danych informacjami o każdym zapytaniu do API.