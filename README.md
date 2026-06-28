🌿 Filiz - Yapay Zeka Destekli Akıllı Bitki Asistanı
Filiz, evinizdeki bitkilerin dilinden anlamanızı sağlayan, yapay zeka destekli akıllı bir bitki tanılama, bakım takibi, akıllı arama ve uzman sohbet uygulamasıdır. Yeşil dostlarınızın sağlık durumlarını analiz eder, onlara özel bakım takvimleri oluşturur ve merak ettiğiniz her konuda size rehberlik eder.
---
👥 Geliştirici Bilgileri
Adı Soyadı: Zeliha Güler
Öğrenci No: 24010501013
**GitHub Profili:** [github.com/zelihaguler1](https://github.com/zelihaguler1)

✨ Öne Çıkan Özellikler
Uygulama, bitkilerinizin tüm ihtiyaçlarını karşılamak üzere tasarlanmış modern bir bento-grid yapısına ve zengin özellik modüllerine sahiptir:
🌿 Ana Sayfa (Home View):
Hızlı durum paneli ve günlük tamamlanması gereken bakım görevleri listesi (Örn: sulama, gübreleme).
Kolay bitki ekleme sihirbazı.
Doğrudan bahçenizdeki bitkilere hızlı erişim kartları.
📸 Akıllı Kamera Tarama (Scan View):
Yapay zeka yardımıyla bitki fotoğraflarını tarayarak bitki türünü saniyeler içinde teşhis eder.
Bitkinin sağlık durumunu analiz eder ve yapılması gereken acil eylemleri listeler.
Tek tıklamayla taranan bitkiyi kişisel bahçenize ekleme imkanı sunar.
💬 Yapay Zeka Destekli Sohbet (Chat View):
Doğal dil işleme yeteneğiyle bitki uzmanı Filiz ile gerçek zamanlı sohbet edin.
Hazır soru çiplerini (Sulamada altın kural, Deve tabanı bakımı vb.) kullanarak hızlı yanıtlar alın.
Sorularınızı kapsamlı bir şekilde cevaplayan ve bitki sağlığı tavsiyeleri veren akıllı asistan.
🏡 Detaylı Bahçem Paneli (My Garden View):
Bitkinizin toprak nem seviyesini gösteren dinamik dairesel gösterge.
Günlük/Haftalık bakım ve alarm takvimi.
Sulama sıklığı, ışık konumu, sıvı besin rehberi ve püf noktaları.
Hızlı bakım kaydı (Sulama, Yaprak Temizliği, Gübreleme, Saksı Çevirme aktiviteleri).
Olası sorunlar için acil durum teşhis kontrol modülü.
🔔 Akıllı Bildirimler Sistemi:
Kritik nem düşüşü alarmları, rutin saksı çevirme veya sulama hatırlatıcıları ile bitkilerinizi her zaman sağlıklı tutun.
🔍 Akıllı Bitki Arama Modülü:
Bahçenizdeki bitkileri isimlerine veya bilimsel Latince adlarına göre hızlıca arayıp detaylarına ulaşın.
---
🛠️ Kullanılan Teknolojiler
Arayüz (Frontend): React (TypeScript), Vite, Tailwind CSS
Sunucu (Backend): Node.js, Express (Vite Middleware Entegrasyonu)
Yapay Zeka: @google/genai (Gemini API)
Grafik ve İkonlar: Lucide React, Tailwind CSS Animasyonları
---
🚀 Kurulum ve Çalıştırma
Projeyi yerel bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edebilirsiniz:
1. Depoyu Klonlayın
```bash
git clone https://github.com/zelihaguler/filiz-plant-app.git
cd filiz-plant-app
```
2. Bağımlılıkları Yükleyin
```bash
npm install
```
3. Çevre Değişkenlerini Ayarlayın
Kök dizinde yer alan `.env.example` dosyasını referans alarak `.env` dosyası oluşturun ve Gemini API anahtarınızı ekleyin:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
4. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```
Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışacaktır.
5. Üretim Sürümü İçin Derleme (Build)
```bash
npm run build
npm start
```
---
📄 Lisans
Bu proje MIT Lisansı ile lisanslanmıştır. Detaylar için lisans dosyasına göz atabilirsiniz.
