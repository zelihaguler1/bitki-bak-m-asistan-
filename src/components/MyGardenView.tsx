import React, { useState } from 'react';
import { Plant, CareTask } from '../types';
import { ArrowLeft, Bell, Droplet, Sun, Sprout, Info, Lightbulb, AlertTriangle, Plus, Check, ChevronRight } from 'lucide-react';

interface MyGardenViewProps {
  plants: Plant[];
  onBackToHome: () => void;
  selectedPlant: Plant | null;
  onSelectPlant: (plant: Plant | null) => void;
  onLogActivity: (plantId: string, activityType: string) => void;
  onBellClick?: () => void;
}

export default function MyGardenView({
  plants,
  onBackToHome,
  selectedPlant,
  onSelectPlant,
  onLogActivity,
  onBellClick,
}: MyGardenViewProps) {
  const [activeDay, setActiveDay] = useState<number>(12);
  const [showLogSheet, setShowLogSheet] = useState(false);
  const [completedActions, setCompletedActions] = useState<Record<string, boolean>>({});
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);

  const handleActionComplete = (actionId: string, label: string) => {
    setCompletedActions(prev => ({ ...prev, [actionId]: !prev[actionId] }));
    if (selectedPlant && !completedActions[actionId]) {
      onLogActivity(selectedPlant.id, label);
    }
  };

  const handleResolveEmergency = (solutionLabel: string) => {
    if (selectedPlant) {
      onLogActivity(selectedPlant.id, `Acil Çözüm Uygulandı: ${solutionLabel} 🌟`);
    }
    setShowEmergencyModal(false);
  };

  // If no specific plant is selected, display the list of all plants in their garden
  if (!selectedPlant) {
    return (
      <div className="animate-fade-in pb-24">
        {/* Top App Bar */}
        <header className="fixed top-0 left-0 w-full z-40 bg-[#fbf9f5]/95 backdrop-blur-md h-16 flex justify-between items-center px-5 border-b border-[#efeeea]">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBackToHome}
              className="hover:opacity-80 active:scale-95 p-1 rounded-full text-[#154212]"
            >
              <ArrowLeft size={24} />
            </button>
            <h1 className="font-headline text-2xl font-bold text-[#154212] tracking-tight">Bahçem</h1>
          </div>
          <button 
            onClick={onBellClick}
            className="p-2 rounded-full text-[#154212] hover:bg-[#eae8e4]/50 active:scale-95 transition-all"
          >
            <Bell size={22} />
          </button>
        </header>

        <main className="pt-20 px-5 max-w-lg mx-auto space-y-6">
          <div className="text-center py-4">
            <h2 className="font-headline text-2xl font-semibold text-[#154212] mb-1">Yeşil Dostların</h2>
            <p className="text-sm text-[#42493e]">Bakımını üstlendiğin bitkilerin listesi.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {plants.map(plant => (
              <div 
                key={plant.id}
                onClick={() => onSelectPlant(plant)}
                className="bg-white rounded-[32px] silk-border botanical-shadow p-4 flex flex-col items-center text-center cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <div className="w-full aspect-square squircle bg-[#f5f3ef] mb-3 overflow-hidden">
                  <img 
                    src={plant.image} 
                    alt={plant.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="font-headline font-semibold text-base text-[#1b1c1a] truncate w-full">{plant.name}</h3>
                <p className="font-sans text-xs text-[#72796e] italic truncate w-full mt-0.5">{plant.scientificName}</p>
                <div className="mt-3 flex items-center gap-1.5">
                  <Droplet size={14} className="text-[#2d5a27]" />
                  <span className="font-sans text-xs font-semibold text-[#1b1c1a]">%{plant.soilMoisture} Nem</span>
                </div>
                <span className={`mt-2.5 text-[10px] font-bold px-3 py-1 rounded-full ${
                  plant.healthStatus === 'Susuz' 
                    ? 'bg-[#ffdad3] text-[#802918]' 
                    : 'bg-[#91f78e]/30 text-[#006e1c]'
                }`}>
                  {plant.healthStatus}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // Circular progress stroke dash array offset calculator
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (selectedPlant.soilMoisture / 100) * circumference;

  return (
    <div className="animate-fade-in pb-24">
      {/* Top App Bar for Details */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#fbf9f5]/95 backdrop-blur-md h-16 flex justify-between items-center px-5 border-b border-[#efeeea]">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => onSelectPlant(null)}
            className="hover:opacity-80 active:scale-95 p-1 rounded-full text-[#154212]"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-headline text-2xl font-bold text-[#154212] tracking-tight">{selectedPlant.name}</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onBellClick}
            className="p-2 rounded-full text-[#154212] hover:bg-[#eae8e4]/50 active:scale-95 transition-all"
          >
            <Bell size={22} />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#eae8e4] overflow-hidden border border-[#efeeea]">
            <img 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA5y_hkaNY--cDWQTEVoNs6KvaVuJvJhUbvSqVOn9XvGsCTa4cemjUOlcEv2CQNeKkcchQ4dgDnFwEeGoE26rKnawR6z1ReMQTroNxWi9DiWd7sQMK1vR5NCsxkGkZKmkR0Zjux4mWnVittqkB_TYHrmnhflm71GYf6W6yVicBlieg8lRnsRII8PustUQok9w_NEKF7EIyJ0PmCyPjP3ioLRDOYM5dsHXSQmoWCFIx-hUXuCxO12jwsD8WY1dDEU7hLUcOTD5Ub9hA" 
              alt="Profile"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </header>

      <main className="pt-20 px-5 max-w-lg mx-auto space-y-6">
        {/* Plant Hero Card */}
        <section className="relative w-full aspect-[4/3] squircle overflow-hidden botanical-shadow mt-2">
          <img 
            className="w-full h-full object-cover" 
            src={selectedPlant.image} 
            alt={selectedPlant.name}
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-4 left-4 right-4 p-5 bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 shadow-md">
            <h2 className="font-headline text-xl font-bold text-[#154212]">{selectedPlant.name} Bakım Rehberi</h2>
            <p className="font-sans text-xs text-[#42493e] italic mt-0.5">{selectedPlant.scientificName}</p>
          </div>
        </section>

        {/* Circular Progress & Health Grid */}
        <section className="grid grid-cols-2 gap-4">
          {/* Circular moisture */}
          <div className="bg-white p-5 rounded-3xl border border-[#efeeea] botanical-shadow flex flex-col items-center">
            <div className="relative w-20 h-20">
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  className="text-[#efeeea]" 
                  cx="40" 
                  cy="40" 
                  fill="transparent" 
                  r={radius} 
                  stroke="currentColor" 
                  strokeWidth="7"
                />
                <circle 
                  className="text-[#154212] transition-all duration-1000" 
                  cx="40" 
                  cy="40" 
                  fill="transparent" 
                  r={radius} 
                  stroke="currentColor" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeLinecap="round" 
                  strokeWidth="7"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-headline text-lg font-bold text-[#154212]">{selectedPlant.soilMoisture}%</span>
              </div>
            </div>
            <span className="font-sans font-semibold text-xs text-[#42493e] mt-3">Toprak Nemi</span>
          </div>

          {/* Plant status */}
          <div className="bg-white p-5 rounded-3xl border border-[#efeeea] botanical-shadow flex flex-col justify-between">
            <div>
              <Sprout size={22} className="text-[#006e1c]" />
              <h3 className="font-sans font-semibold text-xs text-[#154212] mt-2">Bitki Durumu</h3>
            </div>
            <p className={`font-headline text-lg font-bold ${
              selectedPlant.healthStatus === 'Susuz' ? 'text-[#802918]' : 'text-[#006e1c]'
            }`}>
              {selectedPlant.healthStatus === 'Susuz' ? 'Susuz / Bakım Gerekli' : 'Sağlıklı'}
            </p>
            <div className="h-1.5 w-full bg-[#eae8e4] rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-1000 ${
                selectedPlant.healthStatus === 'Susuz' ? 'bg-[#802918] w-1/3' : 'bg-[#006e1c] w-full'
              }`}></div>
            </div>
          </div>
        </section>

        {/* Weekly Calendar */}
        <section className="bg-white p-5 rounded-3xl border border-[#efeeea] botanical-shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-headline font-semibold text-sm text-[#154212]">Haftalık Takvim</h3>
            <span className="font-sans text-xs text-[#72796e]">Haziran, Hafta 2</span>
          </div>
          
          <div className="flex justify-between overflow-x-auto hide-scrollbar pb-1">
            {selectedPlant.weeklyCalendar.map((day) => (
              <button 
                key={day.date}
                onClick={() => setActiveDay(day.date)}
                className={`flex flex-col items-center p-2.5 rounded-full min-w-[48px] transition-all ${
                  activeDay === day.date 
                    ? 'bg-[#2d5a27] text-white shadow-md' 
                    : 'bg-[#fbf9f5] text-[#42493e] border border-[#efeeea]'
                }`}
              >
                <span className="text-[10px] font-medium opacity-80 mb-0.5">{day.day}</span>
                <span className="font-headline text-sm font-bold">{day.date}</span>
                {day.hasAlert && (
                  <div className="w-1.5 h-1.5 bg-[#8d3220] rounded-full mt-1"></div>
                )}
                {day.active && !day.hasAlert && (
                  <div className="w-1.5 h-1.5 bg-[#91f78e] rounded-full mt-1"></div>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Care Details */}
        <section className="space-y-4">
          {/* Sulama */}
          <div className="bg-white p-5 rounded-2xl border border-[#efeeea] botanical-shadow flex gap-4 items-start">
            <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
              <Droplet size={20} className="fill-blue-600" />
            </div>
            <div className="flex-grow min-w-0">
              <h4 className="font-sans font-bold text-sm text-[#154212]">Sulama Sıklığı</h4>
              <p className="text-xs text-[#42493e] mt-1 leading-relaxed">
                {selectedPlant.careGuide.watering}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2 flex-shrink-0">
              <span className="text-[10px] font-bold px-2 py-0.5 bg-[#91f78e]/30 text-[#00731e] rounded-full">Bugün</span>
              <button 
                onClick={() => handleActionComplete('watering', 'Sulandı 💧')}
                className={`p-1.5 rounded-full transition-colors ${
                  completedActions['watering'] ? 'text-[#006e1c] bg-[#91f78e]/20' : 'text-[#72796e] hover:bg-[#f5f3ef]'
                }`}
              >
                <Check size={18} className={completedActions['watering'] ? 'stroke-[3.5px]' : 'stroke-[2px]'} />
              </button>
            </div>
          </div>

          {/* Isik */}
          <div className="bg-white p-5 rounded-2xl border border-[#efeeea] botanical-shadow flex gap-4 items-start">
            <div className="w-11 h-11 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 text-amber-600">
              <Sun size={20} className="fill-amber-600" />
            </div>
            <div className="flex-grow min-w-0">
              <h4 className="font-sans font-bold text-sm text-[#154212]">Işık ve Konumlandırma</h4>
              <p className="text-xs text-[#42493e] mt-1 leading-relaxed">
                {selectedPlant.careGuide.light}
              </p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 bg-[#78dc77]/20 text-[#005313] rounded flex-shrink-0">Sabah</span>
          </div>

          {/* Besin */}
          <div className="bg-white p-5 rounded-2xl border border-[#efeeea] botanical-shadow flex gap-4 items-start">
            <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 text-green-600">
              <Sprout size={20} />
            </div>
            <div className="flex-grow min-w-0">
              <h4 className="font-sans font-bold text-sm text-[#154212]">Besin / Gübreleme</h4>
              <p className="text-xs text-[#42493e] mt-1 leading-relaxed">
                {selectedPlant.careGuide.food}
              </p>
            </div>
            <button 
              onClick={() => setShowInfoModal(true)}
              className="text-[#2d5a27] hover:text-[#154212] bg-[#f5f3ef] p-1.5 rounded-full hover:scale-105 active:scale-95 transition-all flex-shrink-0"
            >
              <Info size={18} />
            </button>
          </div>

          {/* Puf Noktasi (Pro Tip in Dark Green) */}
          <div className="bg-[#2d5a27] text-white p-5 rounded-2xl botanical-shadow flex gap-4 items-start">
            <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0 text-[#9dd090]">
              <Lightbulb size={20} className="fill-[#9dd090]/20" />
            </div>
            <div className="flex-grow">
              <h4 className="font-sans font-bold text-sm text-[#9dd090]">Püf Noktası</h4>
              <p className="text-xs text-white/95 mt-1 leading-relaxed">
                {selectedPlant.careGuide.proTip}
              </p>
            </div>
          </div>
        </section>

        {/* Urgent Action request button */}
        <section className="pt-2">
          <button 
            onClick={() => setShowEmergencyModal(true)}
            className="w-full py-4 border-2 border-[#8d3220] text-[#8d3220] font-headline font-bold rounded-2xl hover:bg-[#8d3220] hover:text-white active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <AlertTriangle size={18} />
            <span>Acil Bakım İhtiyacı</span>
          </button>
        </section>
      </main>

      {/* Floating Action Button (FAB) + Log Activity List */}
      <div className="fixed right-6 bottom-24 z-40">
        {showLogSheet && (
          <div className="absolute bottom-16 right-0 bg-white border border-[#efeeea] rounded-2xl p-2.5 shadow-2xl flex flex-col gap-1 min-w-[150px] animate-fade-in">
            <button 
              onClick={() => { onLogActivity(selectedPlant.id, 'Sulandı 💧'); setShowLogSheet(false); }}
              className="px-3 py-2 text-left text-xs font-sans font-semibold text-[#1b1c1a] hover:bg-[#f5f3ef] rounded-lg"
            >
              💧 Sulama Günlüğü
            </button>
            <button 
              onClick={() => { onLogActivity(selectedPlant.id, 'Yaprakları Silindi 🍃'); setShowLogSheet(false); }}
              className="px-3 py-2 text-left text-xs font-sans font-semibold text-[#1b1c1a] hover:bg-[#f5f3ef] rounded-lg"
            >
              🍃 Yaprak Temizliği
            </button>
            <button 
              onClick={() => { onLogActivity(selectedPlant.id, 'Gübrelendi 🧪'); setShowLogSheet(false); }}
              className="px-3 py-2 text-left text-xs font-sans font-semibold text-[#1b1c1a] hover:bg-[#f5f3ef] rounded-lg"
            >
              🧪 Sıvı Besin Verildi
            </button>
            <button 
              onClick={() => { onLogActivity(selectedPlant.id, 'Saksı Döndürüldü 🔄'); setShowLogSheet(false); }}
              className="px-3 py-2 text-left text-xs font-sans font-semibold text-[#1b1c1a] hover:bg-[#f5f3ef] rounded-lg"
            >
              🔄 Saksı Çevrildi
            </button>
          </div>
        )}
        <button 
          onClick={() => setShowLogSheet(!showLogSheet)}
          className="w-14 h-14 bg-[#154212] hover:bg-[#2d5a27] text-white rounded-2xl shadow-xl flex items-center justify-center active:scale-90 transition-transform"
        >
          <Plus size={28} className={`transition-transform duration-300 ${showLogSheet ? 'rotate-45' : ''}`} />
        </button>
      </div>

      {/* Info / Fertilizer Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 bg-[#1b1c1a]/60 backdrop-blur-sm z-50 flex items-center justify-center p-5">
          <div className="bg-white rounded-[40px] p-6 max-w-sm w-full space-y-4 shadow-2xl animate-fade-in relative border border-[#efeeea]">
            <h3 className="font-headline text-lg font-bold text-[#154212]">🧪 Bitki Besini Bilgisi</h3>
            <p className="text-xs text-[#42493e] leading-relaxed">
              Bitkilerinizin sağlıklı büyümesi ve yeni yapraklar vermesi için azot (N), fosfor (P) ve potasyum (K) dengeli sıvı gübreler kullanmalısınız.
            </p>
            <div className="bg-[#f5f3ef] p-4 rounded-2xl text-xs text-[#154212] space-y-2">
              <p><strong>Dönem:</strong> İlkbahar ve Yaz aylarında 15-30 günde bir.</p>
              <p><strong>Uygulama:</strong> Nemli toprağa sulama suyuna karıştırarak verin (Asla kuru toprağa direkt dökmeyin).</p>
            </div>
            <button 
              onClick={() => {
                setShowInfoModal(false);
                onLogActivity(selectedPlant.id, 'Gübreleme Bilgisi Okundu 🧪');
              }}
              className="w-full py-3 bg-[#2d5a27] text-white font-headline font-bold rounded-full text-sm hover:bg-[#154212]"
            >
              Anladım ve Kaydet
            </button>
          </div>
        </div>
      )}

      {/* Emergency Diagnostic advice modal */}
      {showEmergencyModal && (
        <div className="fixed inset-0 bg-[#1b1c1a]/60 backdrop-blur-sm z-50 flex items-center justify-center p-5">
          <div className="bg-white rounded-[40px] p-6 max-w-sm w-full space-y-5 shadow-2xl animate-fade-in relative border border-[#efeeea]">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-[#ffdad3] text-[#802918] flex items-center justify-center mx-auto mb-2">
                <AlertTriangle size={24} />
              </div>
              <h3 className="font-headline text-lg font-bold text-[#802918]">Acil Durum Teşhis Kontrolü</h3>
              <p className="text-xs text-[#72796e]">{selectedPlant.name} için acil çözümler</p>
            </div>

            <div className="space-y-3">
              <button 
                onClick={() => handleResolveEmergency('Acil Sulama Yapıldı')}
                className="w-full py-2.5 px-4 bg-blue-50 text-blue-800 text-xs font-semibold rounded-xl text-left border border-blue-200 hover:bg-blue-100 flex justify-between items-center"
              >
                <span>💧 Alt Toprak Aşırı Kuru (Hemen Sula)</span>
                <ChevronRight size={14} />
              </button>
              <button 
                onClick={() => handleResolveEmergency('Konumu Değiştirildi')}
                className="w-full py-2.5 px-4 bg-amber-50 text-amber-800 text-xs font-semibold rounded-xl text-left border border-amber-200 hover:bg-amber-100 flex justify-between items-center"
              >
                <span>☀️ Yaprakta Yanık / Sararma Var (Gölgeye Al)</span>
                <ChevronRight size={14} />
              </button>
              <button 
                onClick={() => handleResolveEmergency('Nem Takviyesi Yapıldı')}
                className="w-full py-2.5 px-4 bg-teal-50 text-teal-800 text-xs font-semibold rounded-xl text-left border border-teal-200 hover:bg-teal-100 flex justify-between items-center"
              >
                <span>🍃 Yapraklar Sönük ve Kıvrık (Yaprakları Spreyle)</span>
                <ChevronRight size={14} />
              </button>
            </div>

            <button 
              onClick={() => setShowEmergencyModal(false)}
              className="w-full py-2.5 text-center text-xs font-bold text-[#72796e] hover:text-[#1b1c1a]"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
