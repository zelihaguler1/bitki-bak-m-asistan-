import React from 'react';
import { Plant, CareTask } from '../types';
import { Bell, Sprout, ChevronRight, CheckCircle, Plus, AlertTriangle, Play } from 'lucide-react';

interface HomeViewProps {
  plants: Plant[];
  tasks: CareTask[];
  onCompleteTask: (taskId: string) => void;
  onSelectPlant: (plant: Plant) => void;
  onNavigate: (tab: 'home' | 'scan' | 'chat' | 'garden') => void;
  onAddPlantOpen: () => void;
  onBellClick?: () => void;
}

export default function HomeView({
  plants,
  tasks,
  onCompleteTask,
  onSelectPlant,
  onNavigate,
  onAddPlantOpen,
  onBellClick,
}: HomeViewProps) {
  const pendingTasks = tasks.filter(t => !t.completed);

  return (
    <div className="animate-fade-in">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#fbf9f5]/95 backdrop-blur-md flex justify-between items-center px-5 h-16 border-b border-[#efeeea]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#2d5a27] flex items-center justify-center text-white">
            <Sprout size={20} className="text-[#9dd090]" />
          </div>
          <h1 className="font-headline text-2xl font-bold text-[#154212] tracking-tight">Filiz</h1>
        </div>
        <button 
          onClick={onBellClick}
          className="p-2 rounded-full text-[#154212] hover:bg-[#eae8e4]/50 active:scale-95 transition-all relative"
        >
          <Bell size={22} />
          {pendingTasks.length > 0 && (
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full"></span>
          )}
        </button>
      </header>

      <div className="pt-20 pb-24 px-5 max-w-lg mx-auto space-y-7">
        {/* Welcome Section */}
        <div>
          <h2 className="font-headline text-2xl font-semibold text-[#1b1c1a]">Günaydın!</h2>
          <p className="text-[#42493e] font-sans text-base mt-1">
            Bitkilerin bugün harika görünüyor.
          </p>
        </div>

        {/* Quick Diagnosis / AI Scan Bento Card */}
        <div 
          onClick={() => onNavigate('scan')}
          className="bg-[#2d5a27] text-[#9dd090] p-6 rounded-[32px] botanical-shadow flex items-center justify-between cursor-pointer active:scale-[0.98] transition-transform group"
        >
          <div className="flex-1 pr-4">
            <h3 className="font-headline text-xl font-semibold text-white mb-1.5">Hızlı Teşhis</h3>
            <p className="font-sans text-sm text-[#9dd090]/90 leading-relaxed">
              Yapay zeka ile bitkinin sorununu saniyeler içinde öğren.
            </p>
          </div>
          <div className="bg-[#bcf0ae] text-[#002201] p-4 rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <Play size={24} className="fill-[#002201] translate-x-[1px]" />
          </div>
        </div>

        {/* Emergency Banner */}
        <div 
          onClick={() => {
            // Pick a dehydrated plant and view it, or go to scan
            const dehydrated = plants.find(p => p.healthStatus === 'Susuz');
            if (dehydrated) {
              onSelectPlant(dehydrated);
            } else {
              onNavigate('scan');
            }
          }}
          className="bg-[#ffdad3] text-[#3e0500] p-5 rounded-2xl border border-[#ffb4a5] flex items-center gap-4 cursor-pointer active:scale-[0.98] transition-transform"
        >
          <div className="bg-[#802918]/10 p-3 rounded-full text-[#802918]">
            <AlertTriangle size={22} />
          </div>
          <div className="flex-1">
            <h4 className="font-sans font-semibold text-sm">Bitkim neden ölüyor?</h4>
            <p className="text-xs text-[#802918] opacity-90 mt-0.5">
              Acil bakım rehberini hemen incele.
            </p>
          </div>
          <ChevronRight size={20} className="text-[#802918]" />
        </div>

        {/* Today's Care Tasks */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-headline text-xl font-semibold text-[#154212]">Bugünkü Bakım</h3>
            {tasks.some(t => t.completed) && (
              <span className="text-xs text-[#006e1c] font-semibold bg-[#91f78e]/30 px-2.5 py-1 rounded-full">
                {tasks.filter(t => t.completed).length}/{tasks.length} Tamamlandı
              </span>
            )}
          </div>
          
          <div className="space-y-3">
            {tasks.map(task => (
              <div 
                key={task.id}
                className={`p-4 rounded-2xl bg-white silk-border botanical-shadow flex items-center gap-4 transition-all duration-300 ${
                  task.completed ? 'opacity-65 scale-[0.99] border-[#91f78e]/40' : ''
                }`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#f5f3ef] overflow-hidden flex-shrink-0">
                  <img 
                    src={task.plantImage} 
                    alt={task.plantName} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-sans font-semibold text-sm text-[#1b1c1a] truncate">{task.plantName}</p>
                  <p className="text-xs text-[#42493e] mt-0.5">{task.title}</p>
                </div>
                {task.completed ? (
                  <div className="flex items-center gap-1 text-[#006e1c] font-sans font-medium text-xs py-1.5 px-3 bg-[#91f78e]/20 rounded-full">
                    <CheckCircle size={14} className="text-[#006e1c]" />
                    <span>Yapıldı</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => onCompleteTask(task.id)}
                    className="bg-[#91f78e] text-[#00731e] hover:bg-[#78dc77] active:scale-95 transition-all px-4 py-2 rounded-full font-sans font-semibold text-xs"
                  >
                    Tamamla
                  </button>
                )}
              </div>
            ))}
            {tasks.length === 0 && (
              <p className="text-sm text-[#42493e]/70 text-center py-4">Bugün için planlanmış bakım görevi bulunmuyor.</p>
            )}
          </div>
        </div>

        {/* Bahçem (My Garden carousel) */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-headline text-xl font-semibold text-[#154212]">Bahçem</h3>
            <button 
              onClick={() => onNavigate('garden')}
              className="text-[#154212] font-sans text-xs font-semibold hover:underline"
            >
              Yönet
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto hide-scrollbar -mx-5 px-5 pb-4">
            {plants.map(plant => (
              <div 
                key={plant.id}
                onClick={() => onSelectPlant(plant)}
                className="min-w-[150px] max-w-[150px] bg-white rounded-[32px] silk-border botanical-shadow p-3 flex flex-col items-center text-center cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <div className="w-full aspect-square squircle bg-[#f5f3ef] mb-3 overflow-hidden">
                  <img 
                    src={plant.image} 
                    alt={plant.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="font-sans font-semibold text-sm text-[#1b1c1a] truncate w-full">{plant.name}</p>
                <p className="font-sans text-xs text-[#42493e] italic truncate w-full mt-0.5">{plant.scientificName}</p>
                {plant.healthStatus === 'Susuz' ? (
                  <span className="mt-2 text-[10px] font-semibold text-[#802918] bg-[#ffdad3] px-2 py-0.5 rounded-full">
                    {plant.healthStatus}
                  </span>
                ) : (
                  <span className="mt-2 text-[10px] font-semibold text-[#00731e] bg-[#91f78e]/30 px-2 py-0.5 rounded-full">
                    {plant.healthStatus}
                  </span>
                )}
              </div>
            ))}

            {/* Add New Plant Card */}
            <div 
              onClick={onAddPlantOpen}
              className="min-w-[150px] max-w-[150px] border-2 border-dashed border-[#c2c9bb] rounded-[32px] p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:border-[#2d5a27] active:scale-[0.98] transition-all min-h-[210px]"
            >
              <div className="w-12 h-12 rounded-full bg-[#efeeea] flex items-center justify-center mb-2.5 text-[#154212]">
                <Plus size={24} />
              </div>
              <p className="font-sans font-semibold text-sm text-[#42493e]">Yeni Ekle</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
