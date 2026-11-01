import React, { useEffect } from 'react';
import { Play, BookOpen, Volume2, VolumeX, Music, Shield, Sparkles, Heart, Star, Compass } from 'lucide-react';
import { sounds } from '../utils/audio';

interface TitleScreenProps {
  onStart: () => void;
  onOpenHandbook: () => void;
  isMuted: boolean;
  onToggleSound: () => void;
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
}

export const TitleScreen: React.FC<TitleScreenProps> = ({
  onStart,
  onOpenHandbook,
  isMuted,
  onToggleSound,
  isBgmPlaying,
  onToggleBgm
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault();
        sounds.playClick();
        onStart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onStart]);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-sky-500 via-indigo-600 to-purple-800 text-slate-100 flex flex-col justify-between items-center p-4 md:p-8 select-none overflow-hidden">
      {/* Playful Floating Sky Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft puffy clouds */}
        <div className="absolute top-10 left-8 text-white/40 text-7xl animate-cloud-drift select-none">☁️</div>
        <div className="absolute top-24 right-14 text-white/35 text-8xl animate-cloud-drift delay-1000 select-none">☁️</div>
        <div className="absolute top-1/2 -left-6 text-white/30 text-6xl animate-cloud-drift delay-700 select-none">☁️</div>
        <div className="absolute bottom-28 right-8 text-white/30 text-7xl animate-cloud-drift delay-500 select-none">☁️</div>

        {/* Twinkling stars & floating emojis */}
        <div className="absolute top-20 left-1/4 text-yellow-300 text-2xl animate-bounce delay-300">⭐</div>
        <div className="absolute top-36 right-1/3 text-pink-300 text-3xl animate-pulse">💖</div>
        <div className="absolute bottom-40 left-16 text-emerald-300 text-3xl animate-bounce delay-500">🍀</div>
        <div className="absolute top-1/3 right-12 text-yellow-300 text-3xl animate-spin">✨</div>
        <div className="absolute bottom-32 right-1/4 text-cyan-300 text-2xl animate-pulse delay-700">🌟</div>

        {/* Rainbow Arc Glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-pink-400/20 via-yellow-300/20 to-cyan-400/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Top Header Bar */}
      <div className="relative z-10 w-full max-w-5xl flex items-center justify-between">
        {/* Cute Mascot Pill */}
        <div className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 shadow-lg shadow-black/10 border-2 border-amber-300 text-slate-800 text-xs md:text-sm font-bold font-game">
          <span className="text-xl animate-bounce">🦉</span>
          <span>Bé Cú Thông Thái: "Chào đón hiệp sĩ nhí!"</span>
        </div>

        {/* Audio Toggles */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sounds.playClick();
              onToggleSound();
            }}
            className="p-3 rounded-2xl bg-white/90 hover:bg-white text-slate-800 shadow-md border-2 border-amber-300 hover:scale-105 active:scale-95 transition-all"
            title={isMuted ? "Bật âm thanh" : "Tắt âm thanh"}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-slate-400" /> : <Volume2 className="w-5 h-5 text-amber-500" />}
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onToggleBgm();
            }}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl shadow-md border-2 transition-all active:scale-95 text-xs font-bold font-game ${
              isBgmPlaying
                ? 'bg-amber-400 border-amber-500 text-slate-950'
                : 'bg-white/90 border-slate-300 text-slate-700 hover:bg-white'
            }`}
          >
            <Music className={`w-4 h-4 ${isBgmPlaying ? 'animate-bounce text-slate-950' : 'text-slate-500'}`} />
            <span>{isBgmPlaying ? 'Nhạc: BẬT 🎵' : 'Nhạc: TẮT'}</span>
          </button>
        </div>
      </div>

      {/* Center Hero Card */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-3xl my-auto space-y-6">
        {/* Adorable Chibi Hero Trio & Shield */}
        <div className="relative flex items-center justify-center gap-2 animate-cute-bounce">
          {/* Boy Character Preview */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-blue-100 border-4 border-blue-400 shadow-xl flex items-center justify-center text-5xl md:text-6xl -rotate-6 transform hover:rotate-0 transition-transform">
            👦
          </div>

          {/* Central Golden Super Shield */}
          <div className="relative z-10 w-28 h-28 md:w-36 md:h-36 rounded-3xl bg-gradient-to-tr from-yellow-400 via-amber-300 to-yellow-100 border-4 border-amber-500 shadow-2xl shadow-amber-400/50 flex items-center justify-center text-6xl md:text-7xl">
            🛡️
            <div className="absolute -top-3 -right-2 px-3 py-1 rounded-full bg-rose-500 text-white font-extrabold text-xs font-game border-2 border-white shadow-md animate-pulse">
              100 CÂU HỎI
            </div>
          </div>

          {/* Girl Character Preview */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-pink-100 border-4 border-pink-400 shadow-xl flex items-center justify-center text-5xl md:text-6xl rotate-6 transform hover:rotate-0 transition-transform">
            👧
          </div>
        </div>

        {/* Title Lockup with Bright Friendly Typography */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 text-purple-700 border-2 border-yellow-300 shadow-md text-xs md:text-sm font-extrabold font-game">
            <span>✨ HÀNH TRÌNH TỰ VỆ THÔNG THÁI DÀNH CHO TRẺ EM ✨</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-game tracking-tight text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]">
            SAFE ADVENTURE
          </h1>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-game text-yellow-300 drop-shadow-md">
            HÀNH TRÌNH BẢO VỆ BẢN THÂN
          </h2>

          <p className="text-sm md:text-base text-sky-100 max-w-xl mx-auto leading-relaxed font-medium drop-shadow-sm">
            Cùng <strong className="text-yellow-300">Minh Anh</strong> và <strong className="text-pink-300">Bảo An</strong> vượt qua 7 thế giới kỳ thú, học cách nhận biết vùng riêng tư, dũng cảm nói <strong className="text-rose-300">KHÔNG</strong> và lướt mạng thật an toàn!
          </p>
        </div>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <span className="px-3 py-1.5 rounded-2xl bg-white/80 text-blue-900 font-bold font-game text-xs shadow-sm flex items-center gap-1">
            <span>🛡️</span> Quy tắc 5 Ngón Tay
          </span>
          <span className="px-3 py-1.5 rounded-2xl bg-white/80 text-emerald-900 font-bold font-game text-xs shadow-sm flex items-center gap-1">
            <span>🩱</span> 4 Vùng Riêng Tư
          </span>
          <span className="px-3 py-1.5 rounded-2xl bg-white/80 text-purple-900 font-bold font-game text-xs shadow-sm flex items-center gap-1">
            <span>💻</span> An Toàn Internet
          </span>
          <span className="px-3 py-1.5 rounded-2xl bg-white/80 text-rose-900 font-bold font-game text-xs shadow-sm flex items-center gap-1">
            <span>📞</span> Tổng Đài 111
          </span>
        </div>

        {/* Big 3D Candy Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full max-w-md">
          <button
            onClick={() => {
              sounds.playClick();
              onStart();
            }}
            className="w-full py-4 px-8 rounded-3xl btn-candy-amber text-slate-950 font-black text-xl font-game flex items-center justify-center gap-3 cursor-pointer"
          >
            <Play className="w-6 h-6 fill-slate-950" />
            <span>BẮT ĐẦU CHƠI NGAY!</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              onOpenHandbook();
            }}
            className="w-full sm:w-auto py-4 px-6 rounded-3xl btn-candy-blue text-white font-extrabold text-base font-game flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <BookOpen className="w-5 h-5" />
            <span>SỔ TAY HIỆP SĨ</span>
          </button>
        </div>

        <p className="text-xs text-sky-200 font-semibold drop-shadow">
          Nhấn phím <kbd className="px-2 py-0.5 rounded-lg bg-white/20 text-yellow-300 font-mono text-xs">Space</kbd> hoặc <kbd className="px-2 py-0.5 rounded-lg bg-white/20 text-yellow-300 font-mono text-xs">Enter</kbd> để xuất phát
        </p>
      </div>

      {/* Bottom Footer Info */}
      <div className="relative z-10 w-full max-w-3xl flex flex-wrap items-center justify-center gap-4 py-2.5 text-xs text-sky-100 font-semibold bg-slate-900/40 backdrop-blur-md rounded-2xl border border-white/20 px-4">
        <span>Tổng đài Quốc gia Bảo vệ Trẻ em: <strong className="text-yellow-300 font-bold">111 (Miễn phí 24/7)</strong></span>
        <span>•</span>
        <span>Công an: <strong className="text-cyan-300 font-bold">113</strong></span>
        <span>•</span>
        <span>Cấp cứu: <strong className="text-pink-300 font-bold">115</strong></span>
      </div>
    </div>
  );
};
