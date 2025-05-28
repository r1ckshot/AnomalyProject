# System wykrywania anomalnych dźwięków

## Struktura bazy danych

Baza danych systemu wykrywania anomalnych dźwięków składa się z następujących tabel:

### 1. users (Użytkownicy)
- `idusers` (PK): Liczba całkowita, klucz główny
- `username`: Ciąg znaków, unikalny
- `email`: Ciąg znaków, unikalny
- `password_hash`: Ciąg znaków (hash hasła)
- `last_login_datetime`: Data i czas
- `users_statuses_idusers_statuses` (FK): Klucz obcy do tabeli Users_Statuses
- `create_time`: Data i czas
- `update_time`: Data i czas

### 2. users_roles (Role użytkowników)
- `idusers_roles` (PK): Liczba całkowita, klucz główny
- `name`: Ciąg znaków, unikalny

### 3. users_has_users_roles (Tabela pomocnicza)
- `users_idusers` (PK): Liczba całkowita, klucz główny
- `users_roles_idusers_roles` (PK): Liczba całkowita, klucz główny

### 4. users_statuses (Statusy użytkowników)
- `idusers_statuses` (PK): Liczba całkowita, klucz główny
- `name`: Ciąg znaków ('active', 'blocked')

### 5. api_keys (Klucze API)
- `idapi_keys` (PK): Liczba całkowita, klucz główny
- `users_idusers` (FK): Klucz obcy do tabeli Users
- `api_key`: Ciąg znaków, unikalny (hashowany klucz)
- `is_active`: Boolean
- `description`: Tekst (opis przeznaczenia klucza)
- `create_time`: Data i czas
- `update_time`: Data i czas

### 6. client_devices (Urządzenia klienckie)
- `idclient_devices` (PK): Liczba całkowita, klucz główny
- `users_idusers` (FK): Klucz obcy do tabeli Users
- `api_keys_idapi_keys` (FK): Klucz obcy do tabeli API_Keys
- `device_name`: Ciąg znaków (nazwa urządzenia)
- `device_identifier`: Ciąg znaków, unikalny
- `latitude`: Liczba dziesiętna (szerokość geograficzna)
- `longitude`: Liczba dziesiętna (długość geograficzna)
- `client_devices_statuses_idclient_devices_statuses` (FK): Klucz obcy do tabeli Client_Devices_Statuses
- `create_time`: Data i czas
- `update_time`: Data i czas

### 7. client_devices_statuses (Statusy urządzeń klienckich)
- `idclient_devices_statuses` (PK): Liczba całkowita, klucz główny
- `name`: Ciąg znaków ('active', 'inactive')

### 8. sound_categories (Kategorie dźwięków)
- `idsound_categories` (PK): Liczba całkowita, klucz główny
- `name`: Ciąg znaków, unikalny (nazwa kategorii)
- `description`: Tekst (opis kategorii)
- `is_anomaly`: Boolean (czy jest anomalią)

### 9. detected_anomalies (Wykryte anomalie)
- `iddetected_anomalies` (PK): Liczba całkowita, klucz główny
- `client_devices_idclient_devices` (FK, nullable): Klucz obcy do tabeli Client_Devices
- `api_keys_idapi_keys` (FK, nullable): Klucz obcy do tabeli API_Keys (dla wgranych plików)
- `sound_categories_idsound_categories` (FK): Klucz obcy do tabeli Sound_Categories
- `timestamp`: Data i czas wykrycia
- `detected_categories`: JSON (wyniki klasyfikacji dla wszystkich kategorii)
- `audio_metadata`: JSON (metadane audio bez samej zawartości)
- `notification_sent`: Boolean (czy wysłano powiadomienie)
- `create_time`: Data i czas
- `update_time`: Data i czas

### 10. notification_settings (Ustawienia powiadomień)
- `idnotification_settings` (PK): Liczba całkowita, klucz główny
- `sound_categories_idsound_categories` (FK): Klucz obcy do tabeli Sound_Categories
- `users_idusers` (FK): Klucz obcy do tabeli Users
- `notification_channels_idnotification_channels` (FK): Klucz obcy do tabeli Notification_Channels
- `min_confidence`: Liczba dziesiętna (minimalny poziom pewności dla powiadomienia)
- `is_active`: Boolean
- `create_time`: Data i czas
- `update_time`: Data i czas

### 11. notification_channels (Kanały powiadomień)
- `idnotification_channels` (PK): Liczba całkowita, klucz główny
- `name`: Ciąg znaków ('email', 'sms', 'push', 'webhook')

### 12. sent_notifications (Wysłane powiadomienia)
- `idsent_notifications` (PK): Liczba całkowita, klucz główny
- `detected_anomalies_iddetected_anomalies` (FK): Klucz obcy do tabeli Detected_Anomalies
- `users_idusers` (FK): Klucz obcy do tabeli Users
- `notification_status_idnotification_status` (FK): Klucz obcy do tabeli Notification_Status
- `notification_channels_idnotification_channels` (FK): Klucz obcy do tabeli Notification_Channels
- `timestamp`: Data i czas wysłania powiadomienia
- `content`: Tekst (treść wysłanego powiadomienia)
- `create_time`: Data i czas
- `update_time`: Data i czas

### 13. notification_status (Status powiadomień)
- `idnotification_status` (PK): Liczba całkowita, klucz główny
- `name`: Ciąg znaków ('sent', 'delivered', 'failed', 'read')

## Relacje między tabelami

1. **users_statuses → users** (jeden-do-wielu): Status może być przypisany do wielu użytkowników
2. **users ↔ users_roles** (wiele-do-wielu): Jedna rola może być przypisana do wielu użytkowników. Jeden użytkownik może mieć wiele ról.
3. **users → api_keys** (jeden-do-wielu): Użytkownik może mieć kilka kluczy API
4. **users → client_devices** (jeden-do-wielu): Użytkownik może zarejestrować kilka urządzeń
5. **api_keys → client_devices** (jeden-do-wielu): Klucz API może być używany przez kilka urządzeń
6. **api_keys → detected_anomalies** (jeden-do-wielu): Klucz API może być użyty do wgrania wielu plików z anomaliami
7. **client_devices_statuses → client_devices** (jeden-do-wielu): Status może być przypisany do wielu urządzeń
8. **client_devices → detected_anomalies** (jeden-do-wielu): Urządzenie może rejestrować wiele zdarzeń
9. **sound_categories → detected_anomalies** (jeden-do-wielu): Kategoria dźwięku może być wykryta wiele razy
10. **sound_categories → notification_settings** (jeden-do-wielu): Dla kategorii dźwięku mogą istnieć różne ustawienia powiadomień
11. **users → notification_settings** (jeden-do-wielu): Użytkownik może konfigurować powiadomienia dla różnych kategorii
12. **notification_channels → notification_settings** (jeden-do-wielu): Kanał może być użyty w różnych ustawieniach powiadomień
13. **detected_anomalies → sent_notifications** (jeden-do-wielu): Jedno zdarzenie może wywołać kilka powiadomień
14. **users → sent_notifications** (jeden-do-wielu): Użytkownik może otrzymać wiele powiadomień
15. **notification_status → sent_notifications** (jeden-do-wielu): Status może być przypisany do wielu powiadomień
16. **notification_channels → sent_notifications** (jeden-do-wielu): Kanał może być użyty w wielu powiadomieniach

## Zasada działania systemu

### 1. Rejestracja i konfiguracja

Użytkownik (organizacja lub osoba prywatna) rejestruje się w systemie, tworząc wpis w tabeli `users` z odpowiednim statusem z tabeli `users_statuses` (referencja przez `users_statuses_idusers_statuses`). Po rejestracji użytkownik otrzymuje jeden lub więcej kluczy API, które są zapisywane w tabeli `api_keys` z powiązaniem do użytkownika przez `users_idusers`. Te klucze będą używane do autoryzacji zapytań do API - zarówno dla urządzeń w czasie rzeczywistym, jak i dla wgrywania pojedynczych plików.

Następnie użytkownik rejestruje swoje urządzenia (np. specjalne mikrofony lub smartfony), które będą przesyłać dane audio. Informacje o urządzeniach są zapisywane w tabeli `client_devices` z powiązaniem do użytkownika przez `users_idusers` i klucza API przez `api_keys_idapi_keys`. Dla każdego urządzenia zapisywana jest jego nazwa, unikalny identyfikator oraz precyzyjne współrzędne geograficzne (latitude, longitude), co umożliwia mapowanie wykrytych anomalii na mapie. Status urządzenia jest określony przez referencję `client_devices_statuses_idclient_devices_statuses`.

Użytkownik konfiguruje również, które typy anomalnych dźwięków go interesują i jak chce otrzymywać powiadomienia. Te ustawienia są zapisywane w tabeli `notification_settings` z powiązaniem do użytkownika przez `users_idusers`, kategorii dźwięków przez `sound_categories_idsound_categories` oraz kanału powiadomień przez `notification_channels_idnotification_channels`.

### 2. Wykrywanie anomalii - tryb czasu rzeczywistego

Zarejestrowane urządzenia ciągle nagrywają dźwięki otoczenia i regularnie wysyłają krótkie fragmenty audio (np. po 5-10 sekund) do serwera API. Podczas wysyłania podawany jest klucz API do autoryzacji.

Serwer za pomocą modelu sztucznej inteligencji analizuje otrzymane dane audio. Jeśli wykryta zostanie anomalia (strzał, krzyk, rozbite szkło, wypadek itp.), system klasyfikuje typ anomalii i określa poziom pewności wykrycia.

Wyniki analizy zapisywane są w tabeli `detected_anomalies`, gdzie wskazywane jest urządzenie przez `client_devices_idclient_devices`, które zarejestrowało dźwięk, oraz kategoria dźwięku przez `sound_categories_idsound_categories`. Pole `api_keys_idapi_keys_upload` pozostaje puste (NULL), ponieważ anomalia została wykryta przez urządzenie, a nie wgrany plik. Przy tym same pliki audio nie są przechowywane, tylko metadane w polu `audio_metadata` i wyniki analizy w `detected_categories`. Zapisywana jest także informacja o tym, czy zostało wysłane powiadomienie (`notification_sent`).

### 3. Wykrywanie anomalii - analiza wgranych plików

Użytkownik może również wgrać pojedynczy plik audio do analizy przez interfejs webowy lub API. W tym przypadku:

1. **Wgranie i autoryzacja**: Użytkownik wgrywa plik używając jednego ze swoich kluczy API (z tabeli `api_keys`)
2. **Analiza**: System ekstraktuje cechy audio i przepuszcza je przez ten sam model AI, który analizuje dane z urządzeń
3. **Zapis rezultatów**: Jeśli wykryta zostanie anomalia, tworzony jest wpis w tabeli `detected_anomalies` z następującymi wartościami:
   - `client_devices_idclient_devices` = NULL (ponieważ to nie dane z urządzenia)
   - `api_keys_idapi_keys` = ID klucza API użytego do wgrania pliku
   - `sound_categories_idsound_categories` = ID wykrytej kategorii anomalii
   - `timestamp` = czas przeprowadzenia analizy
   - Pozostałe pola wypełniane standardowo
4. **Brak anomalii**: Jeśli w pliku nie zostanie wykryta żadna anomalia, żaden wpis nie jest tworzony w bazie danych

### 4. Wysyłanie powiadomień

Po wykryciu anomalii system sprawdza ustawienia powiadomień użytkownika w tabeli `notification_settings`. Jeśli typ wykrytego dźwięku i poziom pewności odpowiadają ustawieniom (porównywane z `min_confidence`), system wysyła powiadomienie przez odpowiednie kanały.

Informacje o każdym wysłanym powiadomieniu zapisywane są w tabeli `sent_notifications` z powiązaniem do:
- Zdarzenia przez `detected_anomalies_iddetected_anomalies`
- Użytkownika przez `users_idusers`
- Statusu powiadomienia przez `notification_status_idnotification_status`
- Kanału powiadomienia przez `notification_channels_idnotification_channels`

Pozwala to śledzić, czy powiadomienia zostały skutecznie dostarczone do użytkownika i przez jaki kanał.

### 5. Monitoring i analiza

Użytkownik może przeglądać historię wykrytych anomalii przez interfejs webowy/aplikację mobilną/(..., Co wybierzemy) .Widzi:
- **Anomalie z urządzeń**: gdzie `client_devices_idclient_devices` nie jest NULL - pokazywane z lokalizacją na mapie dzięki współrzędnym geograficznym
- **Anomalie z wgranych plików**: gdzie `api_keys_idapi_keys_upload` nie jest NULL - pokazywane jako rezultaty analizy plików
- **Szczegóły każdej anomalii**: typ dźwięku, poziom pewności, czas wykrycia

System pozwala na rozróżnienie źródła anomalii - czy pochodzi z monitoringu na żywo, czy z analizy wgranego pliku. Użytkownik może również przeglądać historię wysłanych powiadomień i ich statusy, co pomaga ocenić skuteczność systemu monitorowania.

## Praktyczne przykłady użycia

### Przykład 1: Monitoring centrum handlowego (czas rzeczywisty)

Firma ochroniarska:
1. Rejestruje się w systemie (wpis w `users`) i otrzymuje klucz API (wpis w `api_keys`)
2. Rejestruje 20 urządzeń w `client_devices` z precyzyjnymi współrzędnymi GPS
3. Konfiguruje powiadomienia o strzałach, krzykach i rozbitym szkle
4. Urządzenia stale wysyłają audio do analizy

Gdy zostanie rozbite szkło, system tworzy wpis w `detected_anomalies` z wypełnionym `client_devices_idclient_devices` i pustym `api_keys_idapi_keys_upload`, wysyła powiadomienia i pokazuje lokalizację na mapie.

### Przykład 2: Analiza dowodów przez policję (wgrany plik)

Komisariat policji:
1. Ma konto w systemie z kluczem API do analizy materiałów dowodowych
2. Funkcjonariusz wgrywa nagranie z miejsca zdarzenia używając klucza API
3. System wykrywa w nagraniu strzał (00:15, 92%), krzyk (00:18, 87%) i rozbite szkło (00:22, 78%)
4. Każda anomalia zapisywana jest w `detected_anomalies` z wypełnionym `api_keys_idapi_keys_upload` i pustym `client_devices_idclient_devices`
5. Funkcjonariusz widzi chronologiczną listę wykrytych anomalii z dokładnymi znacznikami czasu
