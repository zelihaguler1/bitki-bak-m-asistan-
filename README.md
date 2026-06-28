🌿 Filiz - Yapay Zeka Destekli Akıllı Bitki Asistanı

Filiz, evinizdeki bitkilerin dilinden anlamanızı sağlayan, yapay zeka destekli akıllı bir bitki tanılama, bakım takibi, akıllı arama ve uzman sohbet uygulamasıdır. Yeşil dostlarınızın sağlık durumlarını analiz eder, onlara özel bakım takvimleri oluşturur ve merak ettiğiniz her konuda size rehberlik eder.

\---
👥 Geliştirici Bilgileri

 Adı Soyadı:** Zeliha Güler
 Öğrenci No:** 24010501013
 GitHub Profili: [**github.com/zelihaguler1**](https://github.com/zelihaguler1)


## ✨ Öne Çıkan Özellikler

Uygulama, bitkilerinizin tüm ihtiyaçlarını karşılamak üzere tasarlanmış modern bir bento-grid yapısına ve zengin özellik modüllerine sahiptir:

1. 🌿 Ana Sayfa (Home View):**

   * Hızlı durum paneli ve günlük tamamlanması gereken bakım görevleri listesi (Örn: sulama, gübreleme).
   * Kolay bitki ekleme sihirbazı.
   * Doğrudan bahçenizdeki bitkilere hızlı erişim kartları.
2. 📸 Akıllı Kamera Tarama (Scan View):**

   * Yapay zeka yardımıyla bitki fotoğraflarını tarayarak bitki türünü saniyeler içinde teşhis eder.
   * Bitkinin sağlık durumunu analiz eder ve yapılması gereken acil eylemleri listeler.
   * Tek tıklamayla taranan bitkiyi kişisel bahçenize ekleme imkanı sunar.
3. **💬 Yapay Zeka Destekli Sohbet (Chat View):**

   * Doğal dil işleme yeteneğiyle bitki uzmanı **Filiz** ile gerçek zamanlı sohbet edin.
   * Hazır soru çiplerini (Sulamada altın kural, Deve tabanı bakımı vb.) kullanarak hızlı yanıtlar alın.
   * Sorularınızı kapsamlı bir şekilde cevaplayan ve bitki sağlığı tavsiyeleri veren akıllı asistan.
4. 🏡 Detaylı Bahçem Paneli (My Garden View):**

   * Bitkinizin toprak nem seviyesini gösteren dinamik dairesel gösterge.
   * Günlük/Haftalık bakım ve alarm takvimi.
   * Sulama sıklığı, ışık konumu, sıvı besin rehberi ve püf noktaları.
   * Hızlı bakım kaydı (Sulama, Yaprak Temizliği, Gübreleme, Saksı Çevirme aktiviteleri).
   * Olası sorunlar için acil durum teşhis kontrol modülü.
5. 🔔 Akıllı Bildirimler Sistemi:**

    Kritik nem düşüşü alarmları, rutin saksı çevirme veya sulama hatırlatıcıları ile bitkilerinizi her zaman sağlıklı tutun.
6. 🔍 Akıllı Bitki Arama Modülü:**

   * Bahçenizdeki bitkileri isimlerine veya bilimsel Latince adlarına göre hızlıca arayıp detaylarına ulaşın.

\---





🏗️ Teknik Mimari ve Sistem Tasarımı



Uygulama, hem yerel geliştirme hem de bulut tabanlı konteyner (Cloud Run vb.) ortamları için optimize edilmiş, tek bir Node.js sürecinde (single-process) hem frontend hem backend sunan \*\*hibrit full-stack\*\* bir mimariye sahiptir.



```

┌────────────────────────────────────────────────────────┐

│                   MÜŞTERİ (CLIENT)                     │

│  React (TypeScript) + Tailwind CSS + Lucide Icons     │

└───────────────────────────┬────────────────────────────┘

&#x20;                           │ (Fetch API / JSON)

&#x20;                           ▼

┌────────────────────────────────────────────────────────┐

│                   SUNUCU (SERVER)                      │

│  Express.js (Vite Dev Server Middleware / Static API)  │

└───────────────────────────┬────────────────────────────┘

&#x20;                           │

&#x20;             ┌─────────────┴─────────────┐

&#x20;             ▼                           ▼

&#x20;   ┌──────────────────┐        ┌──────────────────┐

&#x20;   │  Yerel Statik    │        │    Google AI     │

&#x20;   │  Veriler \&       │        │  Studio SDK      │

&#x20;   │  Fallback API    │        │ (Gemini 3.5 API) │

&#x20;   └──────────────────┘        └──────────────────┘

```



 1. Sunucu Katmanı (Express.js - `server.ts`)

\*   \*\*Geliştirme Ortamı (Development Mode):\*\* Sunucu, Vite'ın kendi API modüllerini middleware olarak içeri alır (`createViteServer` ile `middlewareMode: true` ve `appType: "spa"`). Bu sayede frontend için ek bir port açmaya gerek kalmadan, tüm istekler tek port (`3000`) üzerinden proxy'siz bir şekilde çözümlenir.

\*   \*\*Canlı Ortam (Production Mode):\*\* Sunucu, derlenmiş olan istemci statik varlıklarını (`dist/` klasörü) `express.static` ile servis eder ve SPA routing uyumluluğu için tüm yönlendirmeleri (`\*`) `dist/index.html` dosyasına bağlar.

\*   \*\*Hata Toleransı (Resiliency):\*\* Gemini API anahtarının bulunmadığı veya ağ bağlantısının koptuğu durumlarda uygulamanın çökmesini engellemek için yerel akıllı Türkçe fallback algoritmaları ve önceden tanımlanmış test senaryoları entegre edilmiştir.


 2. İstemci Katmanı (React - TypeScript - `src/`)

\*   \*\*Modüler Bileşen Yapısı:\*\* Tüm arayüz mantığı devasa tek bir dosya yerine modüllere ayrılmıştır (`HomeView`, `ScanView`, `ChatView`, `MyGardenView`).

\*   \*\*Senkronize Global Durum (State Management):\*\* Ana bileşende (`App.tsx`) reaktif olarak yönetilen bitki listesi, görevler, bildirimler ve arama durumları, alt bileşenlere tek yönlü veri akışı (one-way data flow) ile iletilir.

\*   \*\*Aktivite Günlüğü Sistemi (Activity Logger):\*\* İstemci tarafında tamamlanan her bakım görevi veya anlık sulama, saksı döndürme, gübreleme aktiviteleri anında bitki profillerine yansıtılarak toprak nem seviyeleri dinamik olarak güncellenir.



\---



🛠️ Teknolojik Altyapı (Tech Stack)



 İstemci (Frontend)

\*   \*\*Kütüphane:\*\* React 18+ (TypeScript)

\*   \*\*Derleyici/Araç Zinciri:\*\* Vite

\*   \*\*Stil (CSS):\*\* Tailwind CSS (Modern v4 Yapısı)

\*   \*\*Tip Güvenliği:\*\* Katı TypeScript veri modelleri (`src/types.ts`)

\*   \*\*İkonlar:\*\* `lucide-react` (Tamamı vektörel, SVG tabanlı)



 Sunucu (Backend)

\*   \*\*Çalışma Zamanı:\*\* Node.js

\*   \*\*Web Çerçevesi:\*\* Express.js

\*   \*\*Hızlı Çalıştırıcı:\*\* `tsx` (TypeScript Execute - Geliştirme ortamında TS dosyalarını anlık çalıştırır)

\*   \*\*Üretim Paketleyicisi:\*\* `esbuild` (Sunucu TypeScript kodlarını tek dosya haline getirir)



 Yapay Zeka (AI) Entegrasyonu

\*   \*\*SDK:\*\* `@google/genai` (Resmi ve en güncel Google AI Studio SDK'sı)

\*   \*\*Model:\*\* `gemini-3.5-flash`



\---



 📂 Dizin Yapısı



```

.

├── .env.example             # Çevre değişkenleri şablonu

├── .gitignore               # Sürüme dahil edilmeyecek dosyalar (node\_modules, dist, .env vb.)

├── index.html               # Uygulama HTML ana şablonu

├── metadata.json            # AI Studio uygulama izinleri ve tanımları

├── package.json             # Bağımlılıklar, kütüphaneler ve npm betikleri

├── server.ts                # Express sunucusu, API rotaları ve Vite Middleware entegrasyonu

├── tsconfig.json            # TypeScript derleme ayarları

├── vite.config.ts           # Vite derleyici ve eklenti yapılandırmaları

└── src/

&#x20;   ├── App.tsx              # Ana uygulama denetleyicisi ve global state yönetimi

&#x20;   ├── index.css            # Küresel CSS ve Tailwind CSS v4 tema tanımları

&#x20;   ├── main.tsx             # React DOM başlangıç noktası

&#x20;   ├── types.ts             # Tüm arayüz ve veri yapılarını içeren TypeScript tipleri

&#x20;   └── components/          # Kullanıcı arayüzü modülleri

&#x20;       ├── HomeView.tsx     # Gösterge paneli ve bugünkü görevler

&#x20;       ├── ScanView.tsx     # Yapay zeka ile bitki teşhisi ve hazır test bitkileri

&#x20;       ├── ChatView.tsx     # Yapay zeka destekli uzman botanikçi sohbet ekranı

&#x20;       └── MyGardenView.tsx # Bitki bakım takvimleri, sulama takipleri ve acil teşhis modülü

```



\---


🛠️ Kullanılan Teknolojiler

* **Arayüz (Frontend):** React (TypeScript), Vite, Tailwind CSS
* **Sunucu (Backend):** Node.js, Express (Vite Middleware Entegrasyonu)
* **Yapay Zeka:** @google/genai (Gemini API)
* **Grafik ve İkonlar:** Lucide React, Tailwind CSS Animasyonları

\---



📄 Lisans

Bu proje MIT Lisansı ile lisanslanmıştır. Detaylar için lisans dosyasına göz atabilirsiniz.

