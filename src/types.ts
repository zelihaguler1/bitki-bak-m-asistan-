export interface CareTask {
  id: string;
  plantId: string;
  plantName: string;
  plantImage: string;
  type: 'water' | 'fertilize' | 'mist' | 'clean' | string;
  title: string;
  description: string;
  dueDate: 'Bugün' | 'Yarın' | string;
  completed: boolean;
}

export interface CareGuide {
  watering: string;
  light: string;
  food: string;
  proTip: string;
}

export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  healthStatus: 'Sağlıklı' | 'Susuz' | 'Hasta' | 'İyi' | string;
  soilMoisture: number; // percentage
  diagnosis: string;
  emergencyAction?: string;
  careGuide: CareGuide;
  weeklyCalendar: { day: string; date: number; active?: boolean; hasAlert?: boolean }[];
}

export interface ChatMessage {
  id: string;
  sender: 'filiz' | 'user';
  text: string;
  timestamp: string;
}
