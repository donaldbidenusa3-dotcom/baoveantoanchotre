import React, { useState } from 'react';
import { QUESTIONS_BANK, QuestionItem } from '../data/questions';
import { X, Volume2, CheckCircle2, RotateCcw, Filter, Search, Award, Sparkles, Music } from 'lucide-react';
import { sounds } from '../utils/audio';
import { speech } from '../utils/speech';
import { bgm } from '../utils/bgm';

interface QuizBankModalProps {
  onClose: () => void;
}

export const QuizBankModal: React.FC<QuizBankModalProps> = ({ onClose }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(() => bgm.isMusicPlaying());

  const topics = [
    { id: 0, name: '🌈 Tất Cả 100 Câu' },
    { id: 1, name: '1. Nhận Biết Cơ Thể' },
    { id: 2, name: '2. Ranh Giới & Nói Không' },
    { id: 3, name: '3. Nhận Diện Xâm Hại' },
    { id: 4, name: '4. Bí Mật & Dụ Dỗ' },
    { id: 5, name: '5. An Toàn Internet' },
    { id: 6, name: '6. Phòng Chống Bắt Nạt' },
    { id: 7, name: '7. An Toàn Ngoài Xã Hội' },
    { id: 8, name: '8. Cảm Xúc & Trợ Giúp' },
    { id: 9, name: '9. Quyền Riêng Tư' },
    { id: 10, name: '10. Thử Thách Safety Hero' }
  ];

  const filteredQuestions = selectedTopicId === 0
    ? QUESTIONS_BANK
    : QUESTIONS_BANK.filter(q => q.topicId === selectedTopicId);

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  const cleanExplanationText = (text: string) => {
    return text.replace(/^(Rất chuẩn!|Đúng rồi!|Chính xác!|Hoàn toàn chính xác!|Chuẩn luôn!|Rất tốt!|Tuyệt vời!|Đúng vậy!|Rất chính xác!)\s*/i, '');
  };

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const cleanExp = cleanExplanationText(currentQ.explanation);

    if (idx === currentQ.correctIndex) {
      sounds.playCorrect();
      setScore(s => s + 100);
      speech.speak(`Tuyệt vời! Em trả lời đúng rồi! ${cleanExp}`);
    } else {
      sounds.playWrong();
      speech.speak(`Chưa đúng rồi. Em hãy ghi nhớ nhé: ${cleanExp}`);
    }
  };

  const handleNext = () => {
    sounds.playClick();
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handleReadAloud = () => {
    const text = `${currentQ.question}. Đáp án A: ${currentQ.options[0]}. Đáp án B: ${currentQ.options[1]}. Đáp án C: ${currentQ.options[2]}.`;
    speech.speak(text);
  };

  const optionThemes = [
    { bg: 'bg-blue-50 hover:bg-blue-100', border: 'border-blue-400', badge: 'bg-blue-500 text-white', text: 'text-blue-950' },
    { bg: 'bg-emerald-50 hover:bg-emerald-100', border: 'border-emerald-400', badge: 'bg-emerald-500 text-white', text: 'text-emerald-950' },
    { bg: 'bg-amber-50 hover:bg-amber-100', border: 'border-amber-400', badge: 'bg-amber-500 text-white', text: 'text-amber-950' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/70 backdrop-blur-md select-none animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white border-4 border-amber-400 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b-2 border-slate-100 bg-amber-50">
          <div>
            <h3 className="text-xl md:text-2xl font-black font-game text-slate-900 flex items-center gap-2">
              <span className="text-2xl animate-bounce">🎯</span>
              <span>LUYỆN TẬP 100 CÂU HỎI AN TOÀN CHO BÉ</span>
            </h3>
            <p className="text-xs text-slate-600 font-semibold">Tự tin trang bị kiến thức tự bảo vệ bản thân và gia đình</p>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="px-4 py-2 rounded-2xl bg-amber-400 text-slate-950 font-black font-game text-sm shadow-sm border border-amber-500">
              Điểm: {score}
            </div>

            {/* BGM Toggle Button */}
            <button
              onClick={() => {
                sounds.playClick();
                const next = bgm.toggle();
                setIsMusicPlaying(next);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border font-black font-game text-xs cursor-pointer shadow-xs transition-all ${
                isMusicPlaying
                  ? 'bg-amber-100 hover:bg-amber-200 border-amber-400 text-amber-900'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-500'
              }`}
              title="Bật hoặc Tắt nhạc nền"
            >
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">{isMusicPlaying ? 'Nhạc: BẬT 🎵' : 'Tắt nhạc 🔇'}</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                speech.stop();
                onClose();
              }}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Topic filter bar */}
        <div className="flex items-center gap-2 p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto text-xs font-black font-game">
          {topics.map(t => (
            <button
              key={t.id}
              onClick={() => {
                sounds.playClick();
                setSelectedTopicId(t.id);
                setCurrentIndex(0);
                setSelectedOption(null);
                setIsAnswered(false);
              }}
              className={`px-3.5 py-2 rounded-2xl whitespace-nowrap transition-all cursor-pointer ${
                selectedTopicId === t.id
                  ? 'btn-candy-amber text-slate-950 shadow-sm'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>

        {/* Question Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500">
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              Câu {currentIndex + 1} / {filteredQuestions.length} (Mã câu: #{currentQ.id})
            </span>
            <div className="flex items-center gap-2">
              <span className="text-amber-700 font-extrabold">{currentQ.topicName}</span>
              <button
                onClick={handleReadAloud}
                className="flex items-center gap-1.5 text-blue-700 hover:text-blue-800 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 cursor-pointer font-game"
              >
                <Volume2 className="w-4 h-4" />
                <span>Nghe đọc 📢</span>
              </button>
            </div>
          </div>

          {/* Question Text */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 shadow-sm">
            <h4 className="text-lg md:text-2xl font-black font-game text-slate-950 leading-relaxed">
              {currentQ.question}
            </h4>
          </div>

          {/* 3 Choices */}
          <div className="flex flex-col gap-2.5">
            {currentQ.options.map((opt, idx) => {
              const letter = ['A', 'B', 'C'][idx];
              const theme = optionThemes[idx];

              let cardClass = `${theme.bg} ${theme.border} ${theme.text}`;
              let badgeClass = theme.badge;

              if (isAnswered) {
                if (idx === currentQ.correctIndex) {
                  cardClass = "bg-emerald-100 border-emerald-500 text-emerald-950 ring-4 ring-emerald-300";
                  badgeClass = "bg-emerald-600 text-white";
                } else if (idx === selectedOption) {
                  cardClass = "bg-rose-100 border-rose-400 text-rose-950 opacity-90";
                  badgeClass = "bg-rose-600 text-white";
                } else {
                  cardClass = "bg-slate-100 border-slate-200 text-slate-400 opacity-50";
                  badgeClass = "bg-slate-400 text-white";
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(idx)}
                  className={`flex items-start gap-3.5 p-3.5 md:p-4 rounded-2xl border-3 text-left transition-all shadow-xs cursor-pointer ${cardClass}`}
                >
                  <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-base shrink-0 font-game ${badgeClass}`}>
                    {letter}
                  </span>
                  <span className="text-sm md:text-base font-bold pt-1">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {isAnswered && (
            <div className={`p-4 md:p-5 rounded-2xl border-3 space-y-2 animate-fade-in shadow-md ${
              selectedOption === currentQ.correctIndex
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                : 'bg-amber-50 border-amber-400 text-amber-950'
            }`}>
              <div className="flex items-center gap-2 font-black font-game text-base md:text-lg">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>{selectedOption === currentQ.correctIndex ? 'Chính xác! Bé được +100 điểm ⭐' : 'Giải thích bài học:'}</span>
              </div>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">{currentQ.explanation}</p>
              <div className="text-xs text-amber-800 font-extrabold pt-1 border-t border-amber-200">
                🛡️ {currentQ.ruleTip}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-6 py-4 border-t-2 border-slate-100 bg-slate-50 flex items-center justify-between">
          <button
            onClick={() => {
              if (currentIndex > 0) {
                setCurrentIndex(i => i - 1);
                setSelectedOption(null);
                setIsAnswered(false);
              }
            }}
            disabled={currentIndex === 0}
            className="px-5 py-2.5 rounded-2xl bg-slate-200 hover:bg-slate-300 disabled:opacity-40 text-slate-800 text-xs md:text-sm font-black font-game transition-colors cursor-pointer"
          >
            ← CÂU TRƯỚC
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-3 rounded-2xl btn-candy-amber text-slate-950 font-black font-game text-sm shadow-md cursor-pointer"
          >
            {isAnswered ? 'CÂU TIẾP THEO →' : 'BỎ QUA / CÂU TIẾP →'}
          </button>
        </div>
      </div>
    </div>
  );
};
