import React, { useState } from 'react';
import { CHARACTERS, CAPE_OPTIONS, CharacterProfile, CapeOption } from '../data/characters';
import { sounds } from '../utils/audio';
import { Check, Shield, ArrowRight, Sparkles, Heart, Star, Music } from 'lucide-react';
import { bgm } from '../utils/bgm';

interface CharacterSelectProps {
  selectedChar: CharacterProfile;
  selectedCape: CapeOption;
  onSelectChar: (char: CharacterProfile) => void;
  onSelectCape: (cape: CapeOption) => void;
  onConfirm: () => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({
  selectedChar,
  selectedCape,
  onSelectChar,
  onSelectCape,
  onConfirm
}) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(() => bgm.isMusicPlaying());

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-sky-400 via-indigo-500 to-purple-700 text-slate-100 flex flex-col justify-between items-center p-4 md:p-8 select-none overflow-y-auto">
      {/* Decorative Cloud Shapes */}
      <div className="absolute top-6 left-6 text-white/30 text-7xl pointer-events-none animate-cloud-drift select-none">☁️</div>
      <div className="absolute top-20 right-10 text-white/30 text-8xl pointer-events-none animate-cloud-drift delay-1000 select-none">☁️</div>

      {/* Top Right BGM Control */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => {
            sounds.playClick();
            const next = bgm.toggle();
            setIsMusicPlaying(next);
          }}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl border font-black font-game text-xs cursor-pointer shadow-md transition-all ${
            isMusicPlaying
              ? 'bg-amber-100 hover:bg-amber-200 border-amber-400 text-amber-900'
              : 'bg-white/80 hover:bg-white border-slate-300 text-slate-700'
          }`}
          title="Bật hoặc Tắt nhạc nền"
        >
          <Music className="w-4 h-4" />
          <span className="hidden sm:inline">{isMusicPlaying ? 'Nhạc: BẬT 🎵' : 'Tắt nhạc 🔇'}</span>
        </button>
      </div>

      {/* Header */}
      <div className="text-center max-w-xl mx-auto pt-2 relative z-10">
        <span className="px-4 py-1.5 rounded-full bg-white/90 text-purple-700 font-extrabold text-xs md:text-sm font-game shadow-md inline-flex items-center gap-1.5">
          <span>🌟</span> BƯỚC 1: CHUẨN BỊ TRANG PHỤC HIỆP SĨ
        </span>
        <h2 className="text-3xl md:text-5xl font-black font-game text-white mt-2 drop-shadow-md">
          CHỌN BẠN ĐỒNG HÀNH
        </h2>
        <p className="text-xs md:text-sm text-sky-100 mt-1 font-medium">
          Chọn bé trai hoặc bé gái cùng chiếc áo choàng năng lượng em thích nhất nhé!
        </p>
      </div>

      {/* Main Selection Area */}
      <div className="w-full max-w-4xl my-auto py-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center relative z-10">
        {/* Left Column: Character Cards & Capes */}
        <div className="flex flex-col gap-4">
          <p className="text-xs font-extrabold text-yellow-300 uppercase tracking-wider drop-shadow-sm flex items-center gap-1.5">
            <span>✨</span> 1. Chọn bạn nhỏ:
          </p>

          <div className="grid grid-cols-2 gap-3.5">
            {CHARACTERS.map((char) => {
              const isSelected = selectedChar.id === char.id;
              const isBoy = char.id === 'boy';
              return (
                <button
                  key={char.id}
                  onClick={() => {
                    sounds.playClick();
                    onSelectChar(char);
                  }}
                  className={`p-5 rounded-3xl border-4 text-left transition-all flex flex-col items-center text-center gap-3 relative cursor-pointer ${
                    isSelected
                      ? isBoy
                        ? 'bg-blue-50 border-blue-500 shadow-2xl scale-[1.03] text-slate-900 ring-4 ring-blue-300'
                        : 'bg-pink-50 border-pink-500 shadow-2xl scale-[1.03] text-slate-900 ring-4 ring-pink-300'
                      : 'bg-white/80 border-white hover:bg-white text-slate-800 shadow-md opacity-85'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center text-xs font-black shadow-md border-2 border-white">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}

                  <div
                    className="w-22 h-22 rounded-3xl flex items-center justify-center text-6xl shadow-lg border-2"
                    style={{
                      backgroundColor: isBoy ? '#dbeafe' : '#fce7f3',
                      borderColor: isBoy ? '#60a5fa' : '#f472b6'
                    }}
                  >
                    {isBoy ? '👦' : '👧'}
                  </div>

                  <div>
                    <h3 className="text-xl font-black font-game text-slate-900">{char.name}</h3>
                    <p className={`text-xs font-extrabold font-game ${isBoy ? 'text-blue-600' : 'text-pink-600'}`}>
                      {char.title}
                    </p>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug font-medium">{char.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Cape Selector */}
          <div className="pt-2">
            <p className="text-xs font-extrabold text-yellow-300 uppercase tracking-wider mb-2 drop-shadow-sm flex items-center gap-1.5">
              <span>🦹</span> 2. Chọn Áo Choàng Năng Lượng:
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {CAPE_OPTIONS.map((cape) => {
                const isSelected = selectedCape.id === cape.id;
                return (
                  <button
                    key={cape.id}
                    onClick={() => {
                      sounds.playClick();
                      onSelectCape(cape);
                    }}
                    className={`flex items-center gap-2.5 p-3 rounded-2xl border-2 transition-all text-left cursor-pointer ${
                      isSelected
                        ? 'bg-white text-slate-950 font-bold border-amber-400 shadow-md ring-2 ring-amber-300'
                        : 'bg-white/70 hover:bg-white border-transparent text-slate-800'
                    }`}
                  >
                    <span
                      className="w-5 h-5 rounded-full shrink-0 shadow-md border border-white"
                      style={{ backgroundColor: cape.color }}
                    />
                    <span className="text-xs font-extrabold font-game truncate">{cape.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Hero Preview Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-white/95 text-slate-900 border-4 border-amber-400 shadow-2xl flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-extrabold font-game">
            <span>✨</span> HIỆP SĨ SẴN SÀNG XUẤT TRẬN
          </div>

          {/* Large Hero Mascot Preview */}
          <div className="relative my-2 animate-cute-wobble">
            <div
              className="w-40 h-40 rounded-3xl flex items-center justify-center text-8xl shadow-2xl border-4"
              style={{
                borderColor: selectedCape.color,
                backgroundColor: selectedChar.id === 'boy' ? '#eff6ff' : '#fdf2f8'
              }}
            >
              {selectedChar.id === 'boy' ? '👦' : '👧'}
            </div>

            {/* Glowing Shield badge */}
            <div className="absolute -bottom-3 -right-3 p-3 rounded-2xl bg-amber-400 border-2 border-white text-slate-950 shadow-xl text-2xl">
              🛡️
            </div>
          </div>

          <div>
            <h4 className="text-3xl font-black font-game text-slate-900">
              {selectedChar.name}
            </h4>
            <p className="text-sm font-extrabold font-game text-amber-600">
              {selectedCape.name}
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-slate-700 w-full leading-relaxed font-medium">
            "Cơ thể của mình là của chính mình. Mình luôn tự tin, dũng cảm và sẵn sàng vượt qua mọi thử thách!"
          </div>

          {/* Big CTA */}
          <button
            onClick={() => {
              sounds.playClick();
              onConfirm();
            }}
            className="w-full py-4 rounded-3xl btn-candy-amber text-slate-950 font-black font-game text-lg flex items-center justify-center gap-2 cursor-pointer mt-1"
          >
            <span>XÁC NHẬN & TIẾN VÀO SAFE WORLD</span>
            <ArrowRight className="w-5 h-5 stroke-[3]" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center text-xs text-sky-100 font-semibold pb-2">
        Mỗi bạn nhỏ đều là một Hiệp Sĩ An Toàn dũng cảm!
      </div>
    </div>
  );
};
