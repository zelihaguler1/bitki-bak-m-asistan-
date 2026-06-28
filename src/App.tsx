import React, { useState, useEffect } from 'react';
import { Plant, CareTask, ChatMessage } from './types';
import HomeView from './components/HomeView';
import ScanView from './components/ScanView';
import ChatView from './components/ChatView';
import MyGardenView from './components/MyGardenView';
import { Home, Camera, MessageCircle, Leaf, Plus, X, Sparkles, Search, Bell } from 'lucide-react';

const INITIAL_PLANTS: Plant[] = [
  {
    id: '1',
    name: 'Deve Tabanı',
    scientificName: 'Monstera Deliciosa',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZIoOVYAWcOr_EDVRs1_2itmkKaZYmqIhtGwlCj19gEQbuoxhy8BT-FkqYu6Dm51clYfdSpLgC1faajurKM2u_P8DNT1GBmIGRvQpkrjJJCAgaTNmib2Ez3ynB_UNODu3Gn_BE7cZRi07UGq2GJX-w7tlSQda0FZZOi5RdhjdVpk19xG3H-AGniDWTJS1IHtbAJxo3yUDDPgA3PXg4h-H4_rxD3tHcskcQ1qkp7b5cNCX11KE1RD8aPsPToHMTGMU9RDVvCX1RSIc',
    healthStatus: 'Susuz',
    soilMoisture: 35,
    diagnosis: 'Alt yapraklarda hafif kıvrılma ve toprak kuruluğu gözlemlendi. Bitkiniz terleme yoluyla kaybettiği nemi geri kazanamıyor.',
    emergencyAction: 'Hemen su verin ve yapraklarını nemlendirin.',
    careGuide: {
      watering: 'Haftada 1 kez, toprak üstten 2cm kuruduğunda.',
      light: 'Yarı gölge, direkt güneş almayan aydınlık köşe.',
      food: 'Yaz mevsimi olduğu için ayda bir sıvı gübre.',
      proTip: 'Yapraklarını nemli bir bezle silmek nefes almasını sağlar.'
    },
    weeklyCalendar: [
      { day: 'Pzt', date: 12, active: true, hasAlert: true },
      { day: 'Sal', date: 13 },
      { day: 'Çar', date: 14, hasAlert: true },
      { day: 'Per', date: 15 },
      { day: 'Cum', date: 16 },
      { day: 'Cmt', date: 17 },
      { day: 'Paz', date: 18 }
    ]
  },
  {
    id: '2',
    name: 'Para Çiçeği',
    scientificName: 'Pilea Peperomioides',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByYMuSn7Ae285LNEEJGiW4fUFS8GDxQMQd5pY_YWUIbUvHuwCPTJ1AnUAj35-oGw5wUcU-qFHMQ49BjWZw1-a_3QuYDCO0S-YECZaFIhxNAlRvDVFRBUNOHYNURM-Efny7jwR4X071X4q5C8yIGp1_H83XvE2pQEIcHcLP4HpF0TgOgEgSaGKGf4ddUpMVJmsA7QINDnic-8rXnCpBmxKeULQGoDNITeg1gVYg96LLcGVfv4NJoj1vILkNio-RzRABMGVeh0jOOZI',
    healthStatus: 'Sağlıklı',
    soilMoisture: 72,
    diagnosis: 'Yuvarlak yapraklar canlı, yeşil ve simetrik. Gövde direnci yüksek ve yeni sürgünler gözlemleniyor. Çok mutlu bir bitki!',
    careGuide: {
      watering: 'Haftada 1 kez, toprağın üst kısmı hafifçe kuruduğunda sulayın.',
      light: 'Aydınlık ama direkt güneş ışığı almayan filtreli ışığı çok sever.',
      food: 'Aktif büyüme mevsiminde (İlkbahar-Yaz) ayda bir kez sıvı gübre verin.',
      proTip: 'Yapraklarının her yöne eşit uzaması için saksıyı her hafta 90 derece döndürün.'
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
  },
  {
    id: '3',
    name: 'Dua Çiçeği',
    scientificName: 'Calathea Orbifolia',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFsukrLRkOyfaGSHMtwV5827TwPncowdyKf-1Vr2RVBSbWM_F4lwXtFh3s5LCZT-mWTBBzoDxQaBRyOx5Q8vOFaRwWZLyvK6pXKQBXbxZqJSgJ9Lri8qyUJ30H5w07HM_zG1DPYgf5PlyOATFBRnbKlaFKao164WEOGh99ZyCmEoU62000k0JRjL7yup-ZCYSvppeAQWn4T2DDHXybW-f0I-GK_u1e88H9XjIbkoHLOgCZ__m4G0LSnaumIFUVBpxFVpP0qokPL94',
    healthStatus: 'Sağlıklı',
    soilMoisture: 80,
    diagnosis: 'Görkemli gümüşi yeşil çizgili yapraklar mükemmel durumda. Nem oranı yüksek, yaprak uçlarında kuruma gözlemlenmiyor.',
    careGuide: {
      watering: 'Toprağı her zaman hafif nemli tutun ancak çamurlaştırmayın.',
      light: 'Doğrudan güneş ışığı yapraklarını yakar; yarı gölge/gölge alanlar idealdir.',
      food: 'İlkbahar ve yaz boyunca 2 haftada bir çok seyreltilmiş sıvı besin verin.',
      proTip: 'Nemi çok sever. Saksı altına çakıl taşlı su tepsisi koymak neme çok katkı sağlar.'
    },
    weeklyCalendar: [
      { day: 'Pzt', date: 12 },
      { day: 'Sal', date: 13, active: true },
      { day: 'Çar', date: 14 },
      { day: 'Per', date: 15 },
      { day: 'Cum', date: 16 },
      { day: 'Cmt', date: 17 },
      { day: 'Paz', date: 18 }
    ]
  }
];

const INITIAL_TASKS: CareTask[] = [
  {
    id: 't1',
    plantId: 'temp_pasa',
    plantName: 'Paşa Kılıcı',
    plantImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBovsqj-lwIDN7lCTvEPIgIn52uHsHAYvouUtiLkZR0uX1ZGN4Bl2k1uxGwqErUU78zlmP1M9xRgy_1j_d04llzswzfY8Jn6nBdQsZwQfyBTU-aGW1J5hH49aDxQQa-rWwmxoohZnkDv5Z_OGMfbCle9v3jX1RlWjV22muUvaLYNT9vavS-iMJdOHkmrUJFgQAQYFvkM-E7IEKoyCS4fjE5w7C9aOicfDUdx4n8gLeeEhTKuUx_VFTdrUfIKYnifKscuRKOMaFIu48',
    type: 'water',
    title: 'Su zamanı geldi',
    description: 'Paşa kılıcı az sulama sever, kontrol edin.',
    dueDate: 'Bugün',
    completed: false
  },
  {
    id: 't2',
    plantId: '1', // Deve tabani
    plantName: 'Deve Tabanı',
    plantImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBO6zy2IOSdyXqoKeaXt4wnPfMVREemZX-KY-gkb-8Wdhss0iX6mxl4EffsMQC-S77t-NfELPHHPvKoTmnu1rNO-Dt8691M4mdVuBLQl-gJXKkJPrqWvvLC2hmuz5myatE_oNjJpIe-02T_eGUo1_PU4A_h-BFERSQXi-kSnWVZkSEvRVVglQgQAnNvjuTjWMCeO5y30Lb1cHA_I15pjQv_fg5jwtBfqEYt97Dnot1ggcMctc6dFN0CEPijXA-7hyJDEisXEZJO3G0',
    type: 'fertilize',
    title: 'Gübreleme zamanı',
    description: 'Yaz mevsimi olduğu için sıvı besin verin.',
    dueDate: 'Bugün',
    completed: false
  }
];

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm1',
    sender: 'filiz',
    text: 'Merhaba! Ben Filiz. Bitkilerin hakkında her şeyi bana sorabilirsin. 🌿 Bugün sana nasıl yardımcı olabilirim?',
    timestamp: '10:24'
  },
  {
    id: 'm2',
    sender: 'user',
    text: 'Barış çiçeğimin yaprakları neden sarkıyor?',
    timestamp: '10:25'
  }
];

export default function App() {
  const [plants, setPlants] = useState<Plant[]>(INITIAL_PLANTS);
  const [tasks, setTasks] = useState<CareTask[]>(INITIAL_TASKS);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [activeTab, setActiveTab] = useState<'home' | 'scan' | 'chat' | 'garden'>('home');
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [typing, setTyping] = useState(false);

  // New plant form state
  const [isAddingPlant, setIsAddingPlant] = useState(false);
  const [newPlantName, setNewPlantName] = useState('');
  const [newPlantScientific, setNewPlantScientific] = useState('');
  const [newPlantStatus, setNewPlantStatus] = useState('Sağlıklı');

  // Completed care log notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCompleteTask = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        // If it is the Deve Tabanı task, we also update the soil moisture and health status!
        if (t.plantId === '1') {
          setPlants(pList => pList.map(p => {
            if (p.id === '1') {
              return { ...p, healthStatus: 'Sağlıklı', soilMoisture: 82 };
            }
            return p;
          }));
        }
        showToast(`"${t.plantName}" görevi başarıyla tamamlandı! 💚`);
        return { ...t, completed: true };
      }
      return t;
    }));
  };

  const handleSendMessage = async (text: string) => {
    const timeString = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text,
      timestamp: timeString
    };

    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    try {
      // Build basic history structure for the context API
      const historyContext = messages.map(m => ({
        sender: m.sender,
        text: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: historyContext }),
      });
      const data = await response.json();

      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: 'filiz',
        text: data.text,
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, {
        id: Math.random().toString(),
        sender: 'filiz',
        text: 'Bitki ağlarında küçük bir bağlantı sorunu var. Lütfen sulama yapıp tekrar dene! 🌿',
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setTyping(false);
    }
  };

  const handleAddPlantToGarden = (newPlant: Plant) => {
    // Check if plant with same name already exists to avoid duplication
    if (plants.some(p => p.name === newPlant.name)) {
      showToast(`"${newPlant.name}" zaten bahçende var!`);
      return;
    }
    setPlants(prev => [newPlant, ...prev]);
    showToast(`"${newPlant.name}" başarıyla bahçene eklendi! 🌿`);
  };

  const handleLogActivity = (plantId: string, activityLabel: string) => {
    // Increase soil moisture slightly if they watered it
    if (activityLabel.includes('Sulan') || activityLabel.includes('Su')) {
      setPlants(prev => prev.map(p => {
        if (p.id === plantId) {
          return { ...p, soilMoisture: Math.min(p.soilMoisture + 15, 95), healthStatus: 'Sağlıklı' };
        }
        return p;
      }));
    }
    showToast(`Etkinlik Kaydedildi: ${activityLabel}`);
  };

  const handleCreateCustomPlant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlantName.trim()) return;

    const customPlant: Plant = {
      id: Math.random().toString(),
      name: newPlantName,
      scientificName: newPlantScientific || 'Plantae',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByYMuSn7Ae285LNEEJGiW4fUFS8GDxQMQd5pY_YWUIbUvHuwCPTJ1AnUAj35-oGw5wUcU-qFHMQ49BjWZw1-a_3QuYDCO0S-YECZaFIhxNAlRvDVFRBUNOHYNURM-Efny7jwR4X071X4q5C8yIGp1_H83XvE2pQEIcHcLP4HpF0TgOgEgSaGKGf4ddUpMVJmsA7QINDnic-8rXnCpBmxKeULQGoDNITeg1gVYg96LLcGVfv4NJoj1vILkNio-RzRABMGVeh0jOOZI',
      healthStatus: newPlantStatus,
      soilMoisture: newPlantStatus === 'Susuz' ? 30 : 75,
      diagnosis: 'Yeni eklenen özel bitki kaydı.',
      careGuide: {
        watering: 'Haftada bir toprak kontrol edilerek.',
        light: 'Kendi doğal ortamında dolaylı parlak ışık.',
        food: 'Mevsimine göre sıvı bitki besini.',
        proTip: 'Yapraklarını tozlardan temiz tutun.'
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
    };

    handleAddPlantToGarden(customPlant);
    setIsAddingPlant(false);
    setNewPlantName('');
    setNewPlantScientific('');
    setNewPlantStatus('Sağlıklı');
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#1b1c1a] font-sans relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#2d5a27] text-white py-3 px-6 rounded-full font-sans font-semibold text-sm shadow-2xl animate-fade-in flex items-center gap-2 border border-[#9dd090]/30">
          <Sparkles size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main View Manager */}
      <div className="h-full">
        {activeTab === 'home' && (
          <HomeView
            plants={plants}
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            onSelectPlant={(plant) => {
              setSelectedPlant(plant);
              setActiveTab('garden');
            }}
            onNavigate={(tab) => {
              setActiveTab(tab);
              if (tab !== 'garden') setSelectedPlant(null);
            }}
            onAddPlantOpen={() => setIsAddingPlant(true)}
            onBellClick={() => setShowNotifications(true)}
          />
        )}

        {activeTab === 'scan' && (
          <ScanView
            onAddPlantToGarden={handleAddPlantToGarden}
            onNavigate={(tab) => {
              setActiveTab(tab);
              if (tab !== 'garden') setSelectedPlant(null);
            }}
            onSelectPlant={(plant) => {
              setSelectedPlant(plant);
              setActiveTab('garden');
            }}
          />
        )}

        {activeTab === 'chat' && (
          <ChatView
            messages={messages}
            onSendMessage={handleSendMessage}
            typing={typing}
            onBellClick={() => setShowNotifications(true)}
            onSearchClick={() => setShowSearch(true)}
          />
        )}

        {activeTab === 'garden' && (
          <MyGardenView
            plants={plants}
            selectedPlant={selectedPlant}
            onBackToHome={() => {
              setActiveTab('home');
              setSelectedPlant(null);
            }}
            onSelectPlant={setSelectedPlant}
            onLogActivity={handleLogActivity}
            onBellClick={() => setShowNotifications(true)}
          />
        )}
      </div>

      {/* Custom plant addition modal */}
      {isAddingPlant && (
        <div className="fixed inset-0 bg-[#1b1c1a]/60 backdrop-blur-sm z-50 flex items-center justify-center p-5">
          <div className="bg-white rounded-[40px] p-6 max-w-sm w-full space-y-5 shadow-2xl animate-fade-in relative border border-[#efeeea]">
            <button 
              onClick={() => setIsAddingPlant(false)}
              className="absolute top-4 right-4 text-[#72796e] hover:text-[#1b1c1a] p-1 rounded-full hover:bg-[#f5f3ef]"
            >
              <X size={20} />
            </button>
            <div className="text-center">
              <h3 className="font-headline text-xl font-bold text-[#154212]">Yeni Bitki Ekle</h3>
              <p className="text-xs text-[#72796e]">Bahçene özel veya yeni aldığın bir bitki ekle.</p>
            </div>

            <form onSubmit={handleCreateCustomPlant} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#154212] mb-1">Bitki Adı *</label>
                <input
                  type="text"
                  required
                  value={newPlantName}
                  onChange={e => setNewPlantName(e.target.value)}
                  placeholder="Örn: Paşa Kılıcı, Barış Çiçeği"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#fbf9f5] border border-[#c2c9bb] text-sm focus:outline-none focus:border-[#2d5a27]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#154212] mb-1">Bilimsel Adı</label>
                <input
                  type="text"
                  value={newPlantScientific}
                  onChange={e => setNewPlantScientific(e.target.value)}
                  placeholder="Örn: Sansevieria trifasciata"
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#fbf9f5] border border-[#c2c9bb] text-sm focus:outline-none focus:border-[#2d5a27]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#154212] mb-1">Sağlık Durumu</label>
                <select
                  value={newPlantStatus}
                  onChange={e => setNewPlantStatus(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#fbf9f5] border border-[#c2c9bb] text-sm focus:outline-none focus:border-[#2d5a27]"
                >
                  <option value="Sağlıklı">Sağlıklı 💚</option>
                  <option value="Susuz">Susuz 💧</option>
                  <option value="Hasta">Bakım Gerekli ⚠️</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#2d5a27] text-white font-headline font-bold rounded-full hover:bg-[#154212] active:scale-95 transition-all text-sm mt-2"
              >
                Bahçeme Kaydet
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Global Sticky Bottom Navigation Tab Bar */}
      <nav className="fixed bottom-0 left-0 w-full z-40 bg-[#efeeea]/90 backdrop-blur-md flex justify-around items-center px-4 py-2.5 rounded-t-[28px] shadow-[0_-4px_16px_rgba(45,90,37,0.06)] border-t border-[#efeeea]">
        {/* Home */}
        <button
          onClick={() => { setActiveTab('home'); setSelectedPlant(null); }}
          className={`flex flex-col items-center justify-center gap-1 py-1.5 transition-all duration-300 rounded-full px-5 ${
            activeTab === 'home' 
              ? 'bg-[#2d5a27] text-white font-sans font-bold scale-105 shadow-sm' 
              : 'text-[#42493e] hover:bg-[#eae8e4]/50'
          }`}
        >
          <Home size={20} className={activeTab === 'home' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
          <span className="text-[10px] tracking-wide">Ana Sayfa</span>
        </button>

        {/* Scan */}
        <button
          onClick={() => { setActiveTab('scan'); setSelectedPlant(null); }}
          className={`flex flex-col items-center justify-center gap-1 py-1.5 transition-all duration-300 rounded-full px-5 ${
            activeTab === 'scan' 
              ? 'bg-[#2d5a27] text-white font-sans font-bold scale-105 shadow-sm' 
              : 'text-[#42493e] hover:bg-[#eae8e4]/50'
          }`}
        >
          <Camera size={20} className={activeTab === 'scan' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
          <span className="text-[10px] tracking-wide">Tarama</span>
        </button>

        {/* Chat */}
        <button
          onClick={() => { setActiveTab('chat'); setSelectedPlant(null); }}
          className={`flex flex-col items-center justify-center gap-1 py-1.5 transition-all duration-300 rounded-full px-5 ${
            activeTab === 'chat' 
              ? 'bg-[#2d5a27] text-white font-sans font-bold scale-105 shadow-sm' 
              : 'text-[#42493e] hover:bg-[#eae8e4]/50'
          }`}
        >
          <MessageCircle size={20} className={activeTab === 'chat' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
          <span className="text-[10px] tracking-wide">Sohbet</span>
        </button>

        {/* My Garden */}
        <button
          onClick={() => { setActiveTab('garden'); setSelectedPlant(null); }}
          className={`flex flex-col items-center justify-center gap-1 py-1.5 transition-all duration-300 rounded-full px-5 ${
            activeTab === 'garden' 
              ? 'bg-[#2d5a27] text-white font-sans font-bold scale-105 shadow-sm' 
              : 'text-[#42493e] hover:bg-[#eae8e4]/50'
          }`}
        >
          <Leaf size={20} className={activeTab === 'garden' ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
          <span className="text-[10px] tracking-wide">Bahçem</span>
        </button>
      </nav>

      {/* Search Overlay */}
      {showSearch && (
        <div className="fixed inset-0 bg-[#1b1c1a]/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-[#fbf9f5] rounded-[32px] p-6 max-w-md w-full max-h-[75vh] flex flex-col gap-4 shadow-2xl animate-fade-in border border-[#efeeea]">
            <div className="flex justify-between items-center">
              <h3 className="font-headline text-lg font-bold text-[#154212]">Bitki Arama</h3>
              <button 
                onClick={() => { setShowSearch(false); setSearchQuery(''); }}
                className="text-[#72796e] hover:text-[#1b1c1a] text-sm font-semibold"
              >
                Kapat
              </button>
            </div>
            
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Bitki adı veya bilimsel adı ara..."
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white border border-[#c2c9bb] text-sm focus:outline-none focus:border-[#2d5a27]"
                autoFocus
              />
              <Search size={18} className="absolute left-3.5 top-3.5 text-[#72796e]" />
            </div>

            <div className="overflow-y-auto flex-1 pr-1 space-y-2.5">
              {plants
                .filter(p => 
                  p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  p.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map(plant => (
                  <div
                    key={plant.id}
                    onClick={() => {
                      setSelectedPlant(plant);
                      setActiveTab('garden');
                      setShowSearch(false);
                      setSearchQuery('');
                    }}
                    className="flex gap-3 p-2.5 bg-white rounded-2xl border border-[#efeeea] cursor-pointer hover:bg-[#f5f3ef] transition-all"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#f5f3ef] overflow-hidden flex-shrink-0">
                      <img src={plant.image} alt={plant.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-sans font-bold text-sm text-[#1b1c1a] truncate">{plant.name}</h4>
                      <p className="font-sans text-xs text-[#72796e] italic truncate">{plant.scientificName}</p>
                    </div>
                    <div className="ml-auto self-center">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        plant.healthStatus === 'Susuz' ? 'bg-[#ffdad3] text-[#802918]' : 'bg-[#91f78e]/30 text-[#006e1c]'
                      }`}>
                        {plant.healthStatus}
                      </span>
                    </div>
                  </div>
                ))}
              {plants.filter(p => 
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                p.scientificName.toLowerCase().includes(searchQuery.toLowerCase())
              ).length === 0 && (
                <p className="text-center py-6 text-xs text-[#72796e]">Aradığınız kriterlere uygun bitki bulunamadı.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notifications Overlay */}
      {showNotifications && (
        <div className="fixed inset-0 bg-[#1b1c1a]/60 backdrop-blur-sm z-50 flex items-start justify-center pt-20 px-4">
          <div className="bg-white rounded-[32px] p-6 max-w-md w-full max-h-[80vh] flex flex-col gap-4 shadow-2xl animate-fade-in border border-[#efeeea]">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bell size={20} className="text-[#154212]" />
                <h3 className="font-headline text-lg font-bold text-[#154212]">Bildirimler</h3>
              </div>
              <button 
                onClick={() => setShowNotifications(false)}
                className="text-[#72796e] hover:text-[#1b1c1a] text-sm font-semibold"
              >
                Kapat
              </button>
            </div>

            <div className="overflow-y-auto space-y-3">
              {/* Alert 1 */}
              <div className="p-3 bg-[#ffdad3]/40 border border-[#ffdad3] rounded-2xl flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-sans font-bold text-xs text-[#802918]">🔴 Kritik Nem Seviyesi!</h4>
                    <p className="text-xs text-[#5c3e38] mt-0.5 leading-relaxed">
                      <strong>Deve Tabanı</strong> nem oranı kritik seviyeye (%35) düştü. Hemen sulama önerilir.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogActivity(plants[0]?.id || '1', 'Sulandı 💧');
                    setShowNotifications(false);
                    showToast('Deve Tabanı sulandı ve nem dengelendi!');
                  }}
                  className="w-full py-2 bg-[#802918] hover:bg-[#681f11] text-white text-xs font-semibold rounded-xl active:scale-95 transition-all text-center"
                >
                  Şimdi Sula 💧
                </button>
              </div>

              {/* Alert 2 */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex flex-col gap-2">
                <div>
                  <h4 className="font-sans font-bold text-xs text-amber-800">🟡 Rutin Bakım Zamanı</h4>
                  <p className="text-xs text-amber-900 mt-0.5 leading-relaxed">
                    <strong>Para Çiçeği</strong> dengeli güneş alabilmek için 90° döndürülmelidir.
                  </p>
                </div>
                <button
                  onClick={() => {
                    handleLogActivity(plants[2]?.id || '3', 'Saksı Döndürüldü 🔄');
                    setShowNotifications(false);
                    showToast('Para Çiçeği başarıyla çevrildi!');
                  }}
                  className="w-full py-2 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-xl active:scale-95 transition-all text-center"
                >
                  Saksıyı Çevir 🔄
                </button>
              </div>

              {/* Alert 3 */}
              <div className="p-3 bg-[#91f78e]/20 border border-[#91f78e]/40 rounded-2xl">
                <h4 className="font-sans font-bold text-xs text-[#006e1c]">🟢 Durum Güncellemesi</h4>
                <p className="text-xs text-[#204022] mt-0.5 leading-relaxed">
                  <strong>Dua Çiçeği</strong> harika durumda! Yaprak nemini korumak için spreylemeye devam edebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
