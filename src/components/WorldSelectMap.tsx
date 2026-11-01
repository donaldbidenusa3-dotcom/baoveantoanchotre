import React from 'react';
import { GAME_WORLDS, GameWorld } from '../data/levels';
import { CharacterProfile, CapeOption } from '../data/characters';
import { sounds } from '../utils/audio';
import { MonsterVisual } from './MonsterVisual';
import { Lock, Star, Play, BookOpen, Target, Sparkles, ChevronRight, Award, Music, Volume2, VolumeX } from 'lucide-react';

interface WorldSelectMapProps {
  character: CharacterProfile;
  cape: CapeOption;
  unlockedLevel: number;
  completedWorlds: number[];
  onSelectWorld: (world: GameWorld) => void;
  onOpenHandbook: () => void;
  onOpenQuizBank: () => void;
  onChangeCharacter: () => void;
  totalScore: number;
  isBgmPlaying: boolean;
  onToggleBgm: () => void;
}

export const WorldSelectMap: React.FC<WorldSelectMapProps> = ({
  character,
  cape,
  unlockedLevel,
  completedWorlds,
  onSelectWorld,
  onOpenHandbook,
  onOpenQuizBank,
  onChangeCharacter,
  totalScore,
  isBgmPlaying,
  onToggleBgm
}) => {
  const scrollToWorld = (worldId: number) => {
    sounds.playClick();
    const el = document.getElementById(`world-card-${worldId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('ring-4', 'ring-amber-400');
      setTimeout(() => {
        el.classList.remove('ring-4', 'ring-amber-400');
      }, 1200);
    }
  };

  const scrollToBottom = () => {
    sounds.playClick();
    const scroller = document.getElementById('app-scroll-container');
    if (scroller) {
      scroller.scrollTo({ top: scroller.scrollHeight, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    sounds.playClick();
    const scroller = document.getElementById('app-scroll-container');
    if (scroller) {
      scroller.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-sky-400 via-indigo-500 to-purple-800 text-slate-100 flex flex-col select-none pb-20">
      {/* Decorative floating sky elements */}
      <div className="absolute top-12 left-10 text-white/30 text-7xl pointer-events-none animate-cloud-drift select-none">☁️</div>
      <div className="absolute top-28 right-16 text-white/30 text-8xl pointer-events-none animate-cloud-drift delay-1000 select-none">☁️</div>
      <div className="absolute top-1/2 left-4 text-white/20 text-6xl pointer-events-none animate-cloud-drift delay-500 select-none">☁️</div>

      {/* Top Bar Navigation */}
      <header className="sticky top-0 z-30 flex flex-col bg-white/95 backdrop-blur-md border-b-2 border-amber-300 shadow-md text-slate-900">
        <div className="flex items-center justify-between px-4 md:px-8 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sounds.playClick();
                onChangeCharacter();
              }}
              className="flex items-center gap-2 p-1.5 pr-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              title="Đổi nhân vật hoặc trang phục"
            >
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-md border"
                style={{ backgroundColor: character.id === 'boy' ? '#dbeafe' : '#fce7f3', borderColor: character.avatarColor }}
              >
                {character.id === 'boy' ? '👦' : '👧'}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-black text-slate-900 font-game">{character.name}</p>
                <p className="text-[10px] text-amber-700 font-bold">{cape.name}</p>
              </div>
            </button>
          </div>

          {/* Center Title */}
          <div className="text-center">
            <h1 className="text-lg md:text-2xl font-black font-game text-amber-600 tracking-wide flex items-center gap-2 justify-center drop-shadow-sm">
              <span>🗺️</span>
              <span>BẢN ĐỒ THẾ GIỚI SAFE WORLD</span>
            </h1>
            <p className="text-[11px] text-slate-600 font-semibold hidden sm:block">
              Khám phá 7 vùng đất diệu kỳ để nhận danh hiệu SAFETY HERO
            </p>
          </div>

          {/* Right Tools */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                onOpenHandbook();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl btn-candy-amber text-slate-950 font-black font-game text-xs md:text-sm cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>Sổ Tay</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                onOpenQuizBank();
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl btn-candy-blue text-white font-black font-game text-xs md:text-sm cursor-pointer"
            >
              <Target className="w-4 h-4" />
              <span className="hidden md:inline">100 Câu Hỏi</span>
              <span className="md:hidden">Ôn tập</span>
            </button>

            {/* BGM Toggle Button */}
            <button
              onClick={() => {
                sounds.playClick();
                onToggleBgm();
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border-2 font-black font-game text-xs cursor-pointer transition-all ${
                isBgmPlaying
                  ? 'bg-amber-100 hover:bg-amber-200 border-amber-400 text-amber-900 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-500'
              }`}
              title="Bật hoặc Tắt nhạc nền phiêu lưu"
            >
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">{isBgmPlaying ? 'Nhạc: BẬT 🎵' : 'Nhạc: TẮT 🔇'}</span>
            </button>

            <div className="px-3 py-1.5 rounded-2xl bg-amber-400 text-slate-950 text-xs font-black font-game shadow-sm border border-amber-500">
              ★ {totalScore}
            </div>
          </div>
        </div>

        {/* Sticky Quick Level Navigation Strip */}
        <div className="flex items-center justify-between gap-2 px-4 md:px-8 py-2 bg-amber-50/90 border-t border-amber-200 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 text-xs font-black font-game shrink-0">
            <span className="text-amber-900 font-extrabold flex items-center gap-1 shrink-0">
              <span>⚡</span> Nhảy đến Màn:
            </span>
            {GAME_WORLDS.map((w) => {
              const isUnlocked = w.id <= unlockedLevel;
              const isCompleted = completedWorlds.includes(w.id);
              return (
                <button
                  key={w.id}
                  onClick={() => scrollToWorld(w.id)}
                  className={`px-3 py-1 rounded-xl whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 shadow-xs border ${
                    isCompleted
                      ? 'bg-emerald-500 text-white border-emerald-600 hover:bg-emerald-600'
                      : isUnlocked
                      ? 'bg-white hover:bg-amber-100 text-amber-900 border-amber-300'
                      : 'bg-slate-200 text-slate-400 border-slate-300'
                  }`}
                >
                  <span>{w.monsterIcon}</span>
                  <span>Màn {w.id}</span>
                  {isCompleted && <span className="text-[10px]">✓</span>}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 shrink-0 pl-2">
            <button
              onClick={scrollToBottom}
              className="px-2.5 py-1 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-900 font-black text-xs font-game cursor-pointer flex items-center gap-1 transition-all"
              title="Cuộn xuống các màn cuối"
            >
              <span>👇 Xem màn 4-7</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Map Journey Container */}
      <main className="flex-1 max-w-5xl mx-auto w-full p-4 md:p-8 flex flex-col gap-6 relative z-10">
        {/* Colorful Welcome Banner */}
        <div className="relative p-6 rounded-3xl bg-white/95 text-slate-900 border-4 border-amber-400 shadow-2xl overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-extrabold text-xs font-game inline-flex items-center gap-1">
                <span>🌈</span> BẢN ĐỒ PHIÊU LƯU DIỆU KỲ
              </span>
              <h2 className="text-2xl md:text-3xl font-black font-game text-slate-900 mt-1">
                Xin chào hiệp sĩ nhí {character.name}!
              </h2>
              <p className="text-xs md:text-sm text-slate-600 mt-1 max-w-xl font-medium leading-relaxed">
                Mỗi thế giới sẽ có một quái vật nghịch ngợm tượng trưng cho những mối nguy hiểm. Hãy trả lời đúng các câu hỏi để phóng ra <strong>Khiên Ánh Sáng</strong> đẩy lùi chúng nhé!
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3 p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-sm">
              <span className="text-4xl animate-bounce">🏆</span>
              <div>
                <p className="text-xs font-bold text-slate-600">Tiến trình thế giới:</p>
                <p className="text-lg font-black text-amber-700 font-game">
                  {completedWorlds.length} / 7 ĐÃ HOÀN THÀNH
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 7 Colorful World Island Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {GAME_WORLDS.map((world) => {
            const isUnlocked = world.id <= unlockedLevel;
            const isCompleted = completedWorlds.includes(world.id);

            // Colorful Theme styles per world
            const worldColors: Record<number, { bg: string; border: string; text: string; headerBg: string }> = {
              1: { bg: 'bg-emerald-50', border: 'border-emerald-400', text: 'text-emerald-900', headerBg: 'bg-emerald-100' },
              2: { bg: 'bg-amber-50', border: 'border-amber-400', text: 'text-amber-900', headerBg: 'bg-amber-100' },
              3: { bg: 'bg-purple-50', border: 'border-purple-400', text: 'text-purple-900', headerBg: 'bg-purple-100' },
              4: { bg: 'bg-cyan-50', border: 'border-cyan-400', text: 'text-cyan-900', headerBg: 'bg-cyan-100' },
              5: { bg: 'bg-pink-50', border: 'border-pink-400', text: 'text-pink-900', headerBg: 'bg-pink-100' },
              6: { bg: 'bg-teal-50', border: 'border-teal-400', text: 'text-teal-900', headerBg: 'bg-teal-100' },
              7: { bg: 'bg-yellow-50', border: 'border-yellow-400', text: 'text-yellow-900', headerBg: 'bg-yellow-100' },
            };

            const colors = worldColors[world.id] || worldColors[1];

            return (
              <div
                key={world.id}
                id={`world-card-${world.id}`}
                className={`relative rounded-3xl border-4 transition-all overflow-hidden flex flex-col justify-between shadow-xl ${
                  isUnlocked
                    ? `${colors.bg} ${colors.border} hover:scale-[1.02] cursor-pointer`
                    : 'bg-slate-900/60 border-slate-800 opacity-60 text-slate-400'
                }`}
              >
                {/* World Header */}
                <div className="p-5 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div
                      className="w-18 h-18 rounded-3xl flex items-center justify-center overflow-hidden shrink-0 shadow-md border-2 bg-slate-900/90"
                      style={{
                        borderColor: world.monsterColor
                      }}
                    >
                      <MonsterVisual worldId={world.id} size={64} state="idle" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black uppercase tracking-wider font-game ${isUnlocked ? 'text-amber-600' : 'text-slate-400'}`}>
                          {world.subtitle}
                        </span>
                        {isCompleted && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-black font-game shadow-sm">
                            ĐÃ VƯỢT QUA ✨
                          </span>
                        )}
                      </div>

                      <h3 className={`text-xl font-black font-game ${isUnlocked ? colors.text : 'text-slate-300'}`}>
                        {world.name}
                      </h3>
                      <p className="text-xs font-semibold text-slate-500 mt-0.5">
                        Đối thủ nghịch ngợm: <span className="font-bold text-slate-800">{world.monsterName}</span>
                      </p>
                    </div>
                  </div>

                  {/* Stars / Lock */}
                  <div>
                    {isUnlocked ? (
                      <div className="flex gap-1 bg-white/80 p-1.5 rounded-xl shadow-xs">
                        {[1, 2, 3].map(s => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${
                              isCompleted
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="p-2.5 rounded-2xl bg-slate-800 text-slate-400">
                        <Lock className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Description & Badge Preview */}
                <div className="px-5 pb-4 space-y-3">
                  <p className="text-xs font-medium text-slate-600 leading-relaxed">
                    {world.description}
                  </p>

                  <div className="flex items-center justify-between text-xs p-3 rounded-2xl bg-white border border-slate-200 text-slate-700 shadow-sm">
                    <span className="flex items-center gap-2">
                      <span className="text-xl">{world.badgeIcon}</span>
                      <span className="font-bold font-game">{world.badgeName}</span>
                    </span>
                    <span className="font-extrabold text-amber-600 font-game">
                      {world.requiredQuestions} thử thách
                    </span>
                  </div>
                </div>

                {/* Card CTA Action */}
                <div className="p-4 pt-0">
                  {isUnlocked ? (
                    <button
                      onClick={() => {
                        sounds.playClick();
                        onSelectWorld(world);
                      }}
                      className="w-full py-3.5 rounded-2xl btn-candy-amber text-slate-950 font-black font-game text-base flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Play className="w-4 h-4 fill-slate-950" />
                      <span>{isCompleted ? 'CHƠI LẠI THẾ GIỚI NÀY' : 'BẮT ĐẦU CHẠY NGAY!'}</span>
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full py-3 rounded-2xl bg-slate-800 text-slate-500 font-bold font-game text-xs flex items-center justify-center gap-2 cursor-not-allowed"
                    >
                      <Lock className="w-4 h-4" />
                      <span>VƯỢT LEVEL {world.id - 1} ĐỂ MỞ KHÓA</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer Hotlines */}
      <footer className="p-4 bg-white/95 text-slate-700 border-t-2 border-amber-300 text-center text-xs font-bold font-game flex flex-wrap items-center justify-center gap-4">
        <span>Tổng đài Quốc gia Bảo vệ Trẻ em: <strong className="text-emerald-600 text-sm">111 (Miễn phí 24/7)</strong></span>
        <span>•</span>
        <span>Công an khẩn cấp: <strong className="text-blue-600 text-sm">113</strong></span>
        <span>•</span>
        <span>Cấp cứu y tế: <strong className="text-rose-600 text-sm">115</strong></span>
      </footer>

      {/* Floating Scroll Navigation Pills (Always accessible on bottom right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2.5 pointer-events-auto">
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full bg-white/95 text-slate-800 border-2 border-amber-300 shadow-xl hover:bg-amber-100 hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center font-black text-sm"
          title="Lên đầu trang"
        >
          <span>⬆️</span>
        </button>
        <button
          onClick={scrollToBottom}
          className="p-3 rounded-full btn-candy-amber text-slate-950 shadow-xl hover:scale-110 active:scale-95 transition-all cursor-pointer flex items-center justify-center font-black text-sm"
          title="Cuộn xuống các màn cuối"
        >
          <span>⬇️</span>
        </button>
      </div>
    </div>
  );
};
