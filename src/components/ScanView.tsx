import React, { useState, useRef } from 'react';
import { Plant } from '../types';
import { ArrowLeft, Sparkles, Upload, FileText, Check, AlertCircle, Camera, RotateCcw } from 'lucide-react';

interface ScanViewProps {
  onAddPlantToGarden: (plant: Plant) => void;
  onNavigate: (tab: 'home' | 'scan' | 'chat' | 'garden') => void;
  onSelectPlant: (plant: Plant) => void;
}

const TEST_PLANTS = [
  {
    key: 'monstera',
    name: 'Deve Tabanı',
    scientificName: 'Monstera Deliciosa',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZIoOVYAWcOr_EDVRs1_2itmkKaZYmqIhtGwlCj19gEQbuoxhy8BT-FkqYu6Dm51clYfdSpLgC1faajurKM2u_P8DNT1GBmIGRvQpkrjJJCAgaTNmib2Ez3ynB_UNODu3Gn_BE7cZRi07UGq2GJX-w7tlSQda0FZZOi5RdhjdVpk19xG3H-AGniDWTJS1IHtbAJxo3yUDDPgA3PXg4h-H4_rxD3tHcskcQ1qkp7b5cNCX11KE1RD8aPsPToHMTGMU9RDVvCX1RSIc',
    description: 'Deve Tabanı testi yap.'
  },
  {
    key: 'snake',
    name: 'Paşa Kılıcı',
    scientificName: 'Sansevieria Trifasciata',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBovsqj-lwIDN7lCTvEPIgIn52uHsHAYvouUtiLkZR0uX1ZGN4Bl2k1uxGwqErUU78zlmP1M9xRgy_1j_d04llzswzfY8Jn6nBdQsZwQfyBTU-aGW1J5hH49aDxQQa-rWwmxoohZnkDv5Z_OGMfbCle9v3jX1RlWjV22muUvaLYNT9vavS-iMJdOHkmrUJFgQAQYFvkM-E7IEKoyCS4fjE5w7C9aOicfDUdx4n8gLeeEhTKuUx_VFTdrUfIKYnifKscuRKOMaFIu48',
    description: 'Paşa Kılıcı testi yap.'
  },
  {
    key: 'pilea',
    name: 'Para Çiçeği',
    scientificName: 'Pilea Peperomioides',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByYMuSn7Ae285LNEEJGiW4fUFS8GDxQMQd5pY_YWUIbUvHuwCPTJ1AnUAj35-oGw5wUcU-qFHMQ49BjWZw1-a_3QuYDCO0S-YECZaFIhxNAlRvDVFRBUNOHYNURM-Efny7jwR4X071X4q5C8yIGp1_H83XvE2pQEIcHcLP4HpF0TgOgEgSaGKGf4ddUpMVJmsA7QINDnic-8rXnCpBmxKeULQGoDNITeg1gVYg96LLcGVfv4NJoj1vILkNio-RzRABMGVeh0jOOZI',
    description: 'Para Çiçeği testi yap.'
  },
  {
    key: 'calathea',
    name: 'Dua Çiçeği',
    scientificName: 'Calathea Orbifolia',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFsukrLRkOyfaGSHMtwV5827TwPncowdyKf-1Vr2RVBSbWM_F4lwXtFh3s5LCZT-mWTBBzoDxQaBRyOx5Q8vOFaRwWZLyvK6pXKQBXbxZqJSgJ9Lri8qyUJ30H5w07HM_zG1DPYgf5PlyOATFBRnbKlaFKao164WEOGh99ZyCmEoU62000k0JRjL7yup-ZCYSvppeAQWn4T2DDHXybW-f0I-GK_u1e88H9XjIbkoHLOgCZ__m4G0LSnaumIFUVBpxFVpP0qokPL94',
    description: 'Dua Çiçeği testi yap.'
  }
];

export default function ScanView({ onAddPlantToGarden, onNavigate, onSelectPlant }: ScanViewProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [diagnosis, setDiagnosis] = useState<Plant | null>(null);
  const [added, setAdded] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTestPlantClick = async (plant: typeof TEST_PLANTS[0]) => {
    setSelectedImage(plant.image);
    setAnalyzing(true);
    setDiagnosis(null);
    setAdded(false);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plantKey: plant.key }),
      });
      const data = await response.json();
      
      // Artificial slight delay to let scanning laser look gorgeous
      setTimeout(() => {
        setDiagnosis({
          id: Math.random().toString(),
          name: data.name,
          scientificName: data.scientificName,
          image: plant.image,
          healthStatus: data.healthStatus,
          soilMoisture: data.soilMoisture,
          diagnosis: data.diagnosis,
          emergencyAction: data.emergencyAction,
          careGuide: data.careGuide,
          weeklyCalendar: [
            { day: 'Pzt', date: 12, active: true },
            { day: 'Sal', date: 13 },
            { day: 'Çar', date: 14, hasAlert: data.healthStatus === 'Susuz' },
            { day: 'Per', date: 15 },
            { day: 'Cum', date: 16 },
            { day: 'Cmt', date: 17 },
            { day: 'Paz', date: 18 }
          ]
        });
        setAnalyzing(false);
      }, 2000);
    } catch (e) {
      console.error(e);
      setAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      setSelectedImage(base64);
      setAnalyzing(true);
      setDiagnosis(null);
      setAdded(false);

      try {
        const response = await fetch('/api/diagnose', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64 }),
        });
        const data = await response.json();

        setTimeout(() => {
          setDiagnosis({
            id: Math.random().toString(),
            name: data.name || "Saksı Bitkisi",
            scientificName: data.scientificName || "Flora Sp.",
            image: base64,
            healthStatus: data.healthStatus || "Sağlıklı",
            soilMoisture: data.soilMoisture || 70,
            diagnosis: data.diagnosis || "Bitki analizi başarıyla tamamlandı.",
            emergencyAction: data.emergencyAction,
            careGuide: data.careGuide || {
              watering: "Haftalık düzenli kontrol.",
              light: "Aydınlık, dolaylı ışık.",
              food: "Büyüme döneminde destek.",
              proTip: "Nem dengesini koruyun."
            },
            weeklyCalendar: [
              { day: 'Pzt', date: 12, active: true },
              { day: 'Sal', date: 13 },
              { day: 'Çar', date: 14 },
              { day: 'Per', date: 15 },
              { day: 'Cum', date: 16 },
              { day: 'Cmt', date: 17 },
              { day: 'Paz', date: 18 }
            ]
          });
          setAnalyzing(false);
        }, 2200);
      } catch (err) {
        console.error(err);
        setAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleAddToPlan = () => {
    if (diagnosis) {
      onAddPlantToGarden(diagnosis);
      setAdded(true);
      setTimeout(() => {
        // Go to My Garden or select plant detail
        onSelectPlant(diagnosis);
      }, 1000);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setDiagnosis(null);
    setAdded(false);
  };

  return (
    <div className="animate-fade-in pb-24">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#fbf9f5]/95 backdrop-blur-md h-16 flex justify-between items-center px-5 border-b border-[#efeeea]">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate('home')}
            className="hover:opacity-80 active:scale-95 p-1 rounded-full text-[#154212]"
          >
            <ArrowLeft size={24} />
          </button>
          <span className="font-headline text-2xl font-bold text-[#154212] tracking-tight">Filiz</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#e4e2de] overflow-hidden border border-[#efeeea]">
          <img 
            className="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQ6eYhdvnLuh8PLubWVTgv2rc3YBdDxOQPzZlAVFPHZNvmZ2AJicrrSerewupRXkPKyB1Ywb9R-lPmbrUh0Qg8E3Svo231GckCgHKg_YOEb4zBEEHc3tZO6GPWXDZ61LaTfk9Y0oQwZT2NyAxxoyrF7FNEbnwRKa9lhnl15ivvqitcvDYswo2MRlG-C9zYtwz3rMjNw4Ox6XwK-PPe_ZrtOUvurspuErb9wmxQMhsXb5n1xyVGln96qFtmDClgluTyg5lNQSscxiI" 
            alt="Expert profile"
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      <main className="pt-20 px-5 max-w-lg mx-auto space-y-6">
        {/* If no image selected, show landing scanner interface */}
        {!selectedImage ? (
          <div className="space-y-6">
            <div className="text-center py-4">
              <h2 className="font-headline text-2xl font-semibold text-[#154212] mb-1">Yapay Zeka Teşhisi</h2>
              <p className="text-sm text-[#42493e]">Bitkinizin resmini çekin veya yükleyin.</p>
            </div>

            {/* Custom drag & drop upload box */}
            <div 
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-3 border-dashed rounded-[40px] p-8 text-center flex flex-col items-center justify-center gap-4 cursor-pointer transition-all min-h-[280px] ${
                dragOver 
                  ? 'border-[#2d5a27] bg-[#91f78e]/10 text-[#2d5a27]' 
                  : 'border-[#c2c9bb] bg-white hover:border-[#2d5a27] text-[#42493e]'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden" 
              />
              <div className="w-16 h-16 rounded-full bg-[#f5f3ef] flex items-center justify-center text-[#2d5a27]">
                <Camera size={32} />
              </div>
              <div>
                <p className="font-sans font-semibold text-base text-[#1b1c1a]">Fotoğraf Çek veya Yükle</p>
                <p className="text-xs text-[#72796e] mt-1">Sürükleyip bırakabilir veya tıklayabilirsiniz</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#91f78e]/30 text-[#00731e] rounded-full text-xs font-semibold">
                <Sparkles size={12} />
                Yapay Zeka Destekli
              </span>
            </div>

            {/* Predefined plant testing */}
            <div className="space-y-3">
              <h3 className="font-headline font-semibold text-lg text-[#154212]">Hazır Test Bitkileri</h3>
              <p className="text-xs text-[#72796e] -mt-1">AI analizini anında test etmek için bir bitki seçin:</p>
              
              <div className="grid grid-cols-2 gap-3">
                {TEST_PLANTS.map(plant => (
                  <button 
                    key={plant.key}
                    onClick={() => handleTestPlantClick(plant)}
                    className="p-3 bg-white rounded-2xl silk-border botanical-shadow flex items-center gap-3 text-left hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#f5f3ef] overflow-hidden flex-shrink-0">
                      <img 
                        src={plant.image} 
                        alt={plant.name} 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="font-sans font-semibold text-xs text-[#1b1c1a] truncate">{plant.name}</p>
                      <p className="text-[10px] text-[#72796e] truncate italic">{plant.scientificName}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Analysis screen */
          <div className="space-y-6">
            {/* AI Diagnosis Hero Image Section */}
            <div className="relative aspect-[4/5] w-full overflow-hidden squircle botanical-shadow group">
              <img 
                className="w-full h-full object-cover" 
                src={selectedImage} 
                alt="Diagnosis plant"
                referrerPolicy="no-referrer"
              />
              {/* Reset button */}
              <button 
                onClick={handleReset}
                className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-2 rounded-full text-[#154212] hover:bg-white active:scale-95 transition-transform duration-200 shadow-md flex items-center gap-1.5 text-xs font-semibold"
              >
                <RotateCcw size={16} />
                <span>Yeniden Seç</span>
              </button>

              {/* Confidence Overlay */}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-1.5 border border-white/50 shadow-md">
                <Check size={18} className="text-[#006e1c] stroke-[3px]" />
                <span className="font-sans font-semibold text-xs text-[#154212]">
                  {analyzing ? "%-- Doğruluk" : "%95 Doğruluk"}
                </span>
              </div>

              {/* Scanning Animation Laser Effect */}
              {analyzing && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="w-full h-1 bg-[#78dc77] absolute top-0 animate-scan shadow-[0_0_12px_#78dc77]"></div>
                </div>
              )}
            </div>

            {analyzing ? (
              /* Scanning state feedback */
              <div className="bg-white p-6 rounded-3xl silk-border botanical-shadow text-center space-y-4">
                <div className="inline-flex gap-1.5 justify-center items-center py-2 px-4 rounded-full bg-[#91f78e]/20 text-[#00731e] font-sans font-semibold text-xs animate-pulse">
                  <Sparkles size={14} className="animate-spin" />
                  <span>Yapay Zeka Teşhis Ediyor...</span>
                </div>
                <h3 className="font-headline text-xl font-semibold text-[#154212]">Bitkiniz İnceleniyor</h3>
                <p className="text-sm text-[#42493e] leading-relaxed">
                  Görseldeki yaprak desenleri, renk tonları ve toprak yapısı taranarak botanik kütüphanemizle karşılaştırılıyor. Lütfen bekleyin.
                </p>
              </div>
            ) : (
              /* Diagnosis Result Card */
              diagnosis && (
                <div className="space-y-6">
                  <div className="bg-white silk-border botanical-shadow p-6 rounded-3xl space-y-6 relative overflow-hidden">
                    {/* Decorative leaf design */}
                    <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none">
                      <Sparkles size={150} className="text-[#154212]" />
                    </div>

                    {/* Header info */}
                    <div className="space-y-1">
                      <p className="font-sans text-[10px] text-[#72796e] uppercase tracking-wider font-bold">Bitki Adı</p>
                      <h1 className="font-headline text-2xl font-bold text-[#154212]">{diagnosis.name}</h1>
                      <p className="font-sans text-xs text-[#42493e] italic">({diagnosis.scientificName})</p>
                    </div>

                    <div className="h-px bg-[#c2c9bb]/30 w-full"></div>

                    {/* Status & Diagnosis Bento */}
                    <div className="space-y-5">
                      {/* Health Status banner */}
                      <div className="flex items-center gap-4 bg-[#f5f3ef] p-4 rounded-2xl">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          diagnosis.healthStatus === 'Susuz' ? 'bg-[#ffdad3] text-[#802918]' : 'bg-[#91f78e]/30 text-[#006e1c]'
                        }`}>
                          <Sparkles size={24} />
                        </div>
                        <div>
                          <p className="font-sans text-[10px] text-[#72796e] font-semibold">Sağlık Durumu</p>
                          <p className={`font-headline text-lg font-bold ${
                            diagnosis.healthStatus === 'Susuz' ? 'text-[#802918]' : 'text-[#006e1c]'
                          }`}>{diagnosis.healthStatus}</p>
                        </div>
                      </div>

                      {/* Detailed Diagnosis text */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-[#154212] font-semibold text-sm">
                          <AlertCircle size={18} />
                          <span>Teşhis</span>
                        </div>
                        <p className="text-[#42493e] text-sm leading-relaxed font-sans bg-[#fbf9f5] p-3 rounded-xl">
                          {diagnosis.diagnosis}
                        </p>
                      </div>

                      {/* Emergency Action */}
                      {diagnosis.emergencyAction && (
                        <div className="bg-[#ffdad3]/50 border border-[#ffdad3] p-4 rounded-2xl space-y-1.5">
                          <div className="flex items-center gap-2 text-[#802918] font-bold text-sm">
                            <AlertCircle size={18} />
                            <span>Acil Aksiyon</span>
                          </div>
                          <p className="text-[#3e0500] font-medium text-sm leading-relaxed">
                            {diagnosis.emergencyAction}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Primary Action Button */}
                  <button 
                    onClick={handleAddToPlan}
                    disabled={added}
                    className={`w-full py-4 rounded-full font-headline text-base font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2.5 ${
                      added 
                        ? 'bg-[#006e1c] text-white' 
                        : 'bg-[#2d5a27] text-white hover:bg-[#154212]'
                    }`}
                  >
                    <Check size={20} className={added ? 'stroke-[3px]' : ''} />
                    <span>{added ? 'Bakım Planına Eklendi!' : 'Bakım Planına Ekle'}</span>
                  </button>

                  {/* Expert Advice Note */}
                  <div className="flex gap-3 px-4 py-2 bg-[#eae8e4]/30 rounded-2xl border border-[#efeeea]">
                    <Sparkles size={20} className="text-[#006e1c] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-[#42493e]/90 font-sans italic leading-relaxed">
                      Uzman Notu: {diagnosis.careGuide.proTip}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </main>
    </div>
  );
}
