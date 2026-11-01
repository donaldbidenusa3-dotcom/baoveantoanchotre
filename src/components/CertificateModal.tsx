import React, { useRef } from 'react';
import { Award, Star, Printer, RotateCcw, Share2, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { CharacterProfile } from '../data/characters';
import { sounds } from '../utils/audio';

interface CertificateModalProps {
  character: CharacterProfile;
  totalScore: number;
  onRestart: () => void;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  character,
  totalScore,
  onRestart,
  onClose
}) => {
  const certRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const skillsLearned = [
    "Hiểu rõ về cơ thể và 4 vùng riêng tư bất khả xâm phạm.",
    "Thuần thục quy tắc 5 ngón tay & dũng cảm nói KHÔNG.",
    "Nhận diện hành vi xâm hại và tình huống nguy hiểm.",
    "Phân biệt bí mật an toàn & đập tan bẫy dụ dỗ.",
    "Bảo vệ mật khẩu và an toàn trên không gian mạng.",
    "Nói không với bạo lực học đường & bắt nạt trên mạng.",
    "Thành thạo 3 bước tự vệ & ghi nhớ Tổng đài Quốc gia 111."
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in select-none">
      <div className="relative w-full max-w-3xl bg-white border-4 border-amber-400 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-6 text-slate-900 my-auto">
        {/* Certificate Card Printable Area */}
        <div
          ref={certRef}
          className="relative p-6 md:p-8 rounded-3xl bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100 border-4 border-amber-500 text-slate-900 shadow-xl flex flex-col items-center text-center space-y-4 print:p-12 print:border-8 print:border-amber-600"
        >
          {/* Top Floating Trophy */}
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-yellow-100 border-4 border-amber-600 flex items-center justify-center text-5xl md:text-6xl shadow-xl shadow-amber-500/40 animate-cute-bounce">
            🏆
          </div>

          <div>
            <span className="px-4 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs md:text-sm font-black font-game uppercase tracking-widest shadow-sm inline-flex items-center gap-1.5">
              <span>🌟</span> BẰNG KHEN DANH DỰ VINH DANH
            </span>
            <h2 className="text-2xl md:text-4xl font-black font-game text-slate-950 mt-2">
              CHÚC MỪNG! BẠN ĐÃ TRỞ THÀNH SAFETY HERO!
            </h2>
            <p className="text-sm md:text-base font-bold text-slate-700 mt-1">
              Trao tặng cho Hiệp Sĩ Nhí Xuất Sắc: <span className="text-amber-800 font-black text-xl md:text-2xl font-game underline decoration-amber-500">{character.name}</span>
            </p>
          </div>

          {/* Core Skills Learned List */}
          <div className="p-4 md:p-5 rounded-2xl bg-white/90 border-2 border-amber-300 w-full max-w-xl shadow-sm text-left space-y-2">
            <p className="text-xs font-black text-amber-800 uppercase tracking-wide font-game flex items-center gap-1.5">
              <span>🌈</span> Những kỹ năng tuyệt vời bé đã rèn luyện:
            </p>
            <ul className="text-xs md:text-sm text-slate-800 space-y-1.5 font-medium">
              {skillsLearned.map((skill, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-black">✔</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* The Final Golden Message Banner */}
          <div className="p-4 rounded-2xl bg-amber-400 text-slate-950 border-2 border-amber-600 font-game font-black text-base md:text-xl text-center shadow-md">
            "CƠ THỂ CỦA BẠN LÀ CỦA BẠN. BẠN CÓ QUYỀN ĐƯỢC TÔN TRỌNG, ĐƯỢC AN TOÀN VÀ ĐƯỢC BẢO VỆ."
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-around w-full max-w-md pt-2 text-xs md:text-sm border-t-2 border-amber-200 font-bold text-slate-700">
            <div>
              <span>Tổng Điểm: </span>
              <strong className="text-amber-700 font-black text-lg font-game">{totalScore} ★</strong>
            </div>
            <div>
              <span>Danh hiệu: </span>
              <strong className="text-amber-700 font-black text-base font-game">SAFETY HERO</strong>
            </div>
            <div>
              <span>Đường dây nóng: </span>
              <strong className="text-emerald-700 font-black text-base font-game">111 (24/7)</strong>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl btn-candy-blue text-white font-black text-sm transition-all font-game cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>IN CHỨNG NHẬN CHO BÉ 🖨️</span>
          </button>

          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl btn-candy-amber text-slate-950 font-black text-sm shadow-md transition-all font-game cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>CHƠI LẠI TỪ ĐẦU</span>
          </button>

          <button
            onClick={onClose}
            className="px-6 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-sm transition-colors font-game cursor-pointer"
          >
            QUAY VỀ BẢN ĐỒ
          </button>
        </div>
      </div>
    </div>
  );
};
