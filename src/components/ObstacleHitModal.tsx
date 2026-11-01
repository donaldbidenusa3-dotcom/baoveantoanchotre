import React from 'react';
import { RotateCcw, ArrowLeft, ShieldAlert } from 'lucide-react';
import { sounds } from '../utils/audio';

interface ObstacleHitModalProps {
  obstacleType: 'cactus' | 'crab';
  onRetry: () => void;
  onReturnToMap: () => void;
}

export const ObstacleHitModal: React.FC<ObstacleHitModalProps> = ({
  obstacleType,
  onRetry,
  onReturnToMap
}) => {
  const obstacleInfo = obstacleType === 'cactus'
    ? { name: 'Cây Xương Rồng Gai Nhọn 🌵', desc: 'Gai xương rồng hơi nhọn một chút, bé hãy nhảy thật cao qua nhé!' }
    : { name: 'Chú Cua Nghịch Ngợm 🦀', desc: 'Chú cua kẹp càng giơ cao trên đường, bé hãy bấm phím NHẢY (Space) để bay qua chú cua nhé!' };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-md bg-white border-4 border-amber-400 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col items-center text-center gap-4 text-slate-900">
        {/* Animated Icon */}
        <div className="w-24 h-24 rounded-3xl bg-amber-100 border-4 border-amber-400 flex items-center justify-center text-5xl shadow-lg animate-cute-bounce">
          {obstacleType === 'cactus' ? '🌵' : '🦀'}
        </div>

        <div>
          <span className="px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 font-black text-xs font-game uppercase tracking-wider inline-flex items-center gap-1">
            <span>⚠️</span> VA PHẢI CHƯỚNG NGẠI VẬT!
          </span>
          <h3 className="text-2xl font-black font-game text-slate-900 mt-2">
            ỐI CHÀ! BÉ CHẠM PHẢI {obstacleType === 'cactus' ? 'XƯƠNG RỒNG' : 'CHÚ CUA'} RỒI!
          </h3>
          <p className="text-xs md:text-sm text-slate-600 mt-1 font-semibold leading-relaxed">
            {obstacleInfo.desc}
          </p>
        </div>

        {/* Mascot Tip */}
        <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-xs text-slate-700 font-medium text-left flex items-start gap-2.5 w-full">
          <span className="text-2xl shrink-0">🦉</span>
          <div>
            <p className="font-bold font-game text-amber-900">Mẹo từ Bé Cú:</p>
            <p>Quan sát đường chạy phía trước, khi thấy xương rồng hoặc chú cua tới gần thì bấm ngay <strong>phím Space</strong> hoặc nút <strong>NHẢY</strong> trên màn hình nhé!</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex flex-col gap-2.5 pt-1">
          <button
            onClick={() => {
              sounds.playClick();
              onRetry();
            }}
            className="w-full py-4 rounded-2xl btn-candy-amber text-slate-950 font-black font-game text-base flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <RotateCcw className="w-5 h-5 stroke-[3]" />
            <span>THỬ LẠI MÀN NÀY NGAY!</span>
          </button>

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
