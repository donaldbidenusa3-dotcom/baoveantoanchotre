import React from 'react';
import { GameWorld } from '../data/levels';
import { CharacterProfile } from '../data/characters';
import { Award, Star, ArrowRight, MapPin, Sparkles } from 'lucide-react';
import { sounds } from '../utils/audio';

interface LevelClearModalProps {
  world: GameWorld;
  character: CharacterProfile;
  levelScore: number;
  totalScore: number;
  isLastWorld: boolean;
  onNextWorld: () => void;
  onReturnToMap: () => void;
  onViewCertificate: () => void;
}

export const LevelClearModal: React.FC<LevelClearModalProps> = ({
  world,
  character,
  levelScore,
  totalScore,
  isLastWorld,
  onNextWorld,
  onReturnToMap,
  onViewCertificate
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-lg bg-white border-4 border-amber-400 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col items-center text-center gap-5 text-slate-900">
        {/* Animated Celebration Badge */}
        <div className="relative animate-cute-bounce">
          <div className="w-26 h-26 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-yellow-100 border-4 border-amber-500 flex items-center justify-center text-6xl shadow-2xl shadow-amber-400/50">
            {world.badgeIcon}
          </div>
          <div className="absolute -top-3 -right-3 text-3xl animate-spin">
            ✨
          </div>
        </div>

        <div>
          <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 font-black text-xs font-game uppercase tracking-wider inline-flex items-center gap-1">
            <span>🎉</span> CHIẾN THẮNG THẾ GIỚI {world.id}
          </span>
          <h3 className="text-2xl md:text-3xl font-black font-game text-slate-950 mt-1.5">
            HOÀN THÀNH {world.name.toUpperCase()}!
          </h3>
          <p className="text-xs md:text-sm text-slate-600 mt-1 font-semibold">
            Hiệp sĩ {character.name} đã dùng Khiên Ánh Sáng đẩy lùi {world.monsterName}!
          </p>
        </div>

        {/* 3 Golden Stars */}
        <div className="flex gap-2 p-2 rounded-2xl bg-amber-50 border-2 border-amber-200 shadow-sm">
          {[1, 2, 3].map((s) => (
            <Star key={s} className="w-8 h-8 text-amber-400 fill-amber-400 drop-shadow-sm" />
          ))}
        </div>

        {/* Unlocked Badge Card */}
        <div className="w-full p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border-2 border-amber-300 flex items-center gap-3.5 text-left shadow-xs">
          <span className="text-4xl p-2 rounded-2xl bg-white shadow-xs shrink-0">
            {world.badgeIcon}
          </span>
          <div>
            <p className="text-[10px] font-black uppercase tracking-wider text-amber-700 font-game">
              ĐÃ THU THẬP HUY HIỆU MỚI:
            </p>
            <h5 className="text-base font-black font-game text-slate-900">{world.badgeName}</h5>
            <p className="text-xs text-slate-600 font-medium">Huy hiệu đã được cất vào Sổ Tay Hiệp Sĩ</p>
          </div>
        </div>

        {/* Scores */}
        <div className="flex items-center justify-around w-full py-2.5 border-y-2 border-slate-100 text-xs md:text-sm">
          <div>
            <p className="text-slate-500 font-bold">Điểm màn này</p>
            <p className="text-xl font-black text-emerald-600 font-game">+{levelScore}</p>
          </div>
          <div className="w-0.5 h-8 bg-slate-200" />
          <div>
            <p className="text-slate-500 font-bold">Tổng điểm</p>
            <p className="text-xl font-black text-amber-600 font-game">{totalScore} ★</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="w-full flex flex-col gap-3 pt-1">
          {isLastWorld ? (
            <button
              onClick={() => {
                sounds.playClick();
                onViewCertificate();
              }}
              className="w-full py-4 rounded-2xl btn-candy-amber text-slate-950 font-black font-game text-base shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Award className="w-5 h-5 stroke-[2.5]" />
              <span>NHẬN BẰNG KHEN SAFETY HERO TỐI CAO! 🏆</span>
            </button>
          ) : (
            <button
              onClick={() => {
                sounds.playClick();
                onNextWorld();
              }}
              className="w-full py-4 rounded-2xl btn-candy-green text-white font-black font-game text-base shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>TIẾN VÀO THẾ GIỚI TIẾP THEO</span>
              <ArrowRight className="w-5 h-5 stroke-[3]" />
            </button>
          )}

          <button
            onClick={() => {
              sounds.playClick();
              onReturnToMap();
            }}
            className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black font-game text-sm transition-colors cursor-pointer"
          >
            QUAY VỀ BẢN ĐỒ THẾ GIỚI
          </button>
        </div>
      </div>
    </div>
  );
};
