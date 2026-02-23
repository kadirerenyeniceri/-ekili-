/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, Sparkles, RefreshCw } from 'lucide-react';

const TURKISH_NAMES = [
  "Ahmet Yılmaz", "Mehmet Demir", "Ayşe Kaya", "Fatma Çelik", "Mustafa Şahin",
  "Emine Yıldız", "Ali Öztürk", "Hatice Aydın", "Hüseyin Özdemir", "Zeynep Arslan",
  "Murat Doğan", "Elif Kılıç", "İbrahim Aslan", "Meryem Çetin", "Hasan Kara",
  "Zehra Koç", "Osman Kurt", "Özlem Özkan", "Yusuf Şimşek", "Arzu Polat",
  "Ömer Çakır", "Dilek Erdem", "Ramazan Aksoy", "Filiz Yavuz", "Halil Uzun",
  "Sibel Bulut", "Süleyman Günay", "Ebru Aktaş", "İsmail Güneş", "Yasemin Işık",
  "Caner Tekin", "Selin Yılmaz", "Burak Deniz", "Gizem Akçay", "Mert Soylu"
];

const WINNER_NAME = "Kadir Eren Yeniçeri";

export default function App() {
  const [currentName, setCurrentName] = useState<string>("Çekiliş Bekleniyor...");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);

  const startRaffle = useCallback(() => {
    if (isRunning) return;

    setIsRunning(true);
    setWinner(null);
    
    let duration = 3000; // 3 seconds
    let intervalTime = 80;
    let startTime = Date.now();

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * TURKISH_NAMES.length);
      setCurrentName(TURKISH_NAMES[randomIndex]);

      // Speed up or slow down effect could be added here, but simple is fine
      if (Date.now() - startTime > duration) {
        clearInterval(interval);
        setCurrentName(WINNER_NAME);
        setWinner(WINNER_NAME);
        setIsRunning(false);
        
        // Trigger Confetti
        const end = Date.now() + (3 * 1000);
        const colors = ['#f43f5e', '#10b981', '#3b82f6', '#f59e0b'];

        (function frame() {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
          });

          if (Date.now() < end) {
            requestAnimationFrame(frame);
          }
        }());
      }
    }, intervalTime);
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] font-sans selection:bg-emerald-100 flex flex-col items-center justify-center p-6">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-200 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl bg-white border border-[#e7e5e4] rounded-[32px] shadow-2xl shadow-black/5 overflow-hidden"
      >
        {/* Header */}
        <div className="p-8 border-b border-[#f5f5f4] flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Büyük Çekiliş</h1>
            <p className="text-sm text-[#78716c] mt-1">Şanslı kazananı belirlemek için butona basın.</p>
          </div>
          <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
            <Trophy size={24} />
          </div>
        </div>

        {/* Display Area */}
        <div className="p-12 flex flex-col items-center justify-center min-h-[300px] bg-gradient-to-b from-white to-[#fafaf9]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentName}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -10 }}
              transition={{ duration: 0.1 }}
              className={`text-4xl md:text-6xl font-bold text-center tracking-tighter ${
                winner ? 'text-emerald-600' : 'text-[#1c1917]'
              }`}
            >
              {currentName}
            </motion.div>
          </AnimatePresence>

          {winner && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
            >
              <Sparkles size={16} />
              Tebrikler! Kazanan Belirlendi
            </motion.div>
          )}
        </div>

        {/* Action Area */}
        <div className="p-8 bg-white border-t border-[#f5f5f4] flex justify-center">
          <button
            onClick={startRaffle}
            disabled={isRunning}
            className={`
              relative group px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center gap-3
              ${isRunning 
                ? 'bg-[#f5f5f4] text-[#a8a29e] cursor-not-allowed' 
                : 'bg-[#1c1917] text-white hover:bg-black hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-black/10'
              }
            `}
          >
            {isRunning ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                Çekiliş Yapılıyor...
              </>
            ) : (
              <>
                {winner ? 'Tekrar Çek' : 'Çekilişi Başlat'}
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Footer Info */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-xs text-[#a8a29e] uppercase tracking-[0.2em] font-medium"
      >
        © 2026 LİMONSOFT ÖZEL ÇEKİLİŞ SİSTEMİ
      </motion.p>
    </div>
  );
}
