import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { Send, Sprout, Bell, Search, AlertCircle } from 'lucide-react';

interface ChatViewProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  typing: boolean;
  onBellClick?: () => void;
  onSearchClick?: () => void;
}

const CHIP_SUGGESTIONS = [
  "Sulamada altın kural nedir? 💧",
  "Deve tabanı bakımı nasıl yapılır? 🌿",
  "Işık ve güneş ihtiyacı nasıl olmalı? ☀️",
  "Barış çiçeği yaprakları neden sarkıyor? 🌸"
];

export default function ChatView({ messages, onSendMessage, typing, onBellClick, onSearchClick }: ChatViewProps) {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() || typing) return;
    onSendMessage(inputText);
    setInputText('');
  };

  const handleChipClick = (suggestion: string) => {
    if (typing) return;
    onSendMessage(suggestion);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  return (
    <div className="animate-fade-in pb-24 h-full flex flex-col">
      {/* Top App Bar */}
      <header className="fixed top-0 left-0 w-full z-40 bg-[#fbf9f5]/95 backdrop-blur-md h-16 flex justify-between items-center px-5 border-b border-[#efeeea]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#2d5a27] flex items-center justify-center text-white">
            <Sprout size={18} className="text-[#9dd090]" />
          </div>
          <h1 className="font-headline text-2xl font-bold text-[#154212] tracking-tight">Filiz</h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onSearchClick}
            className="p-2 rounded-full text-[#154212] hover:bg-[#eae8e4]/50 active:scale-95 transition-all"
          >
            <Search size={22} />
          </button>
          <button 
            onClick={onBellClick}
            className="p-2 rounded-full text-[#154212] hover:bg-[#eae8e4]/50 active:scale-95 transition-all"
          >
            <Bell size={22} />
          </button>
        </div>
      </header>

      {/* Main chat viewport */}
      <main className="pt-20 px-5 max-w-lg mx-auto w-full flex-1 flex flex-col space-y-6">
        {/* Welcome Section */}
        <div className="text-center pt-4 pb-2 animate-fade-in-up">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#91f78e]/30 text-[#00731e] mb-3">
            <Sprout size={14} className="animate-pulse" />
            <span className="font-sans font-bold text-xs uppercase tracking-wider">Yapay Zeka Destekli</span>
          </div>
          <h2 className="font-headline text-2xl font-bold text-[#154212] mb-1">Bitki Uzmanın Burada</h2>
          <p className="text-sm text-[#42493e] font-sans">Senin için bugün neler yapabilirim?</p>
        </div>

        {/* Suggestion Chips */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 justify-center animate-fade-in-up delay-100">
            {CHIP_SUGGESTIONS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip)}
                disabled={typing}
                className="text-xs font-semibold text-[#154212] bg-[#f5f3ef] hover:bg-[#eae8e4] active:scale-95 transition-all px-3 py-2 rounded-full border border-[#efeeea] cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>
        )}

        {/* Conversation List */}
        <div className="space-y-4 flex-1 overflow-y-auto pr-1">
          {messages.map((msg) => {
            const isFiliz = msg.sender === 'filiz';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 animate-fade-in-up ${isFiliz ? 'justify-start' : 'justify-end flex-row-reverse'}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border ${
                  isFiliz ? 'bg-[#2d5a27] text-white border-[#9dd090]/20' : 'bg-[#e4e2de] border-[#efeeea]'
                }`}>
                  {isFiliz ? (
                    <Sprout size={16} className="text-[#9dd090]" />
                  ) : (
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhO-TYt8IQaVUXsNdqInxJ-iDEDTuupVA0qwdiN8wB_NwQZvLAjgyh2KKgksMlXbnXDINZywfyw5FYIXw4B2SDIyDVIXjJf0vH-lQVmm-5RElX3yx1JbMywc21pQZPyowltAYpoaJUO5stnXe0Li00VQkMgUxZqELBorOBN3mF5J2G80CmTiMPSEV1ouhGq3zWWEXtDdmztYyT3ewa79-RHpi5Yz1FXJeAkoAwTPoQIeKjDAsle8QkEJmY44QTA0V1Yz3oKAXW-CA"
                      alt="User avatar"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  )}
                </div>

                {/* Bubble */}
                <div className={`max-w-[85%] rounded-2xl p-4 botanical-shadow ${
                  isFiliz 
                    ? 'bg-white silk-border rounded-tl-none text-[#1b1c1a]' 
                    : 'bg-[#2d5a27] text-white rounded-tr-none'
                }`}>
                  <p className="text-sm font-sans leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <span className={`block mt-1.5 text-[9px] text-right font-medium ${
                    isFiliz ? 'text-[#72796e]' : 'text-white/60'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {typing && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-full bg-[#2d5a27] flex-shrink-0 flex items-center justify-center border border-[#9dd090]/20">
                <Sprout size={16} className="text-[#9dd090]" />
              </div>
              <div className="flex gap-1.5 px-4 py-3 bg-white silk-border rounded-full botanical-shadow">
                <div className="w-1.5 h-1.5 bg-[#2d5a27]/40 rounded-full animate-bounce [animation-delay:0ms]"></div>
                <div className="w-1.5 h-1.5 bg-[#2d5a27]/40 rounded-full animate-bounce [animation-delay:200ms]"></div>
                <div className="w-1.5 h-1.5 bg-[#2d5a27]/40 rounded-full animate-bounce [animation-delay:400ms]"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Sticky Bottom Input Bar */}
      <footer className="fixed bottom-16 left-0 w-full bg-[#fbf9f5]/90 backdrop-blur-md py-3 px-5 border-t border-[#efeeea] z-40">
        <form onSubmit={handleSend} className="max-w-lg mx-auto flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={typing}
            placeholder="Filiz'e sorun..."
            className="flex-1 px-4 py-3 rounded-2xl bg-white silk-border font-sans text-sm text-[#1b1c1a] focus:outline-none focus:border-[#2d5a27] focus:ring-1 focus:ring-[#2d5a27] transition-all disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || typing}
            className="bg-[#2d5a27] text-white p-3 rounded-2xl hover:bg-[#154212] active:scale-95 transition-all disabled:opacity-40 disabled:scale-100 flex items-center justify-center flex-shrink-0 shadow-sm"
          >
            <Send size={18} />
          </button>
        </form>
      </footer>
    </div>
  );
}
