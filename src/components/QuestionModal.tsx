import React, { useState, useEffect } from 'react';
import { QuestionItem } from '../data/questions';
import { GameWorld } from '../data/levels';
import { sounds } from '../utils/audio';
import { speech } from '../utils/speech';
import { MonsterVisual } from './MonsterVisual';
import { Volume2, VolumeX, CheckCircle, ArrowRight, RotateCcw, ShieldCheck, Sparkles, Heart } from 'lucide-react';

interface QuestionModalProps {
  question: QuestionItem;
  world: GameWorld;
  questionNumber: number;
  totalInLevel: number;
  onAnswerCorrect: () => void;
  onAnswerRetry: () => void;
}

export const QuestionModal: React.FC<QuestionModalProps> = ({
  question,
  world,
  questionNumber,
  totalInLevel,
  onAnswerCorrect,
  onAnswerRetry
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  useEffect(() => {
    setSelectedIndex(null);
    setIsAnswered(false);
    const fullText = `${question.question}. Đáp án A: ${question.options[0]}. Đáp án B: ${question.options[1]}. Đáp án C: ${question.options[2]}.`;
    speech.speak(fullText);
    setIsSpeaking(true);

    return () => {
      speech.stop();
    };
  }, [question]);

  const handleToggleVoice = () => {
    if (isSpeaking) {
      speech.stop();
      setIsSpeaking(false);
    } else {
      const fullText = `${question.question}. Lựa chọn A: ${question.options[0]}. Lựa chọn B: ${question.options[1]}. Lựa chọn C: ${question.options[2]}.`;
      speech.speak(fullText);
      setIsSpeaking(true);
    }
  };

  const cleanExplanationText = (text: string) => {
    return text.replace(/^(Rất chuẩn!|Đúng rồi!|Chính xác!|Hoàn toàn chính xác!|Chuẩn luôn!|Rất tốt!|Tuyệt vời!|Đúng vậy!|Rất chính xác!)\s*/i, '');
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedIndex(index);
    setIsAnswered(true);

    const cleanExp = cleanExplanationText(question.explanation);

    if (index === question.correctIndex) {
      sounds.playCorrect();
      speech.speak(`Tuyệt vời! Em trả lời đúng rồi! ${cleanExp}`);
    } else {
      sounds.playWrong();
      speech.speak(`Chưa đúng rồi. Em hãy ghi nhớ nhé: ${cleanExp}`);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isAnswered) {
        if (e.key === '1' || e.key === 'a' || e.key === 'A') handleSelectOption(0);
        if (e.key === '2' || e.key === 'b' || e.key === 'B') handleSelectOption(1);
        if (e.key === '3' || e.key === 'c' || e.key === 'C') handleSelectOption(2);
      } else {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (selectedIndex === question.correctIndex) {
            onAnswerCorrect();
          } else {
            handleRetry();
          }
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, selectedIndex, question, onAnswerCorrect]);

  const handleRetry = () => {
    setSelectedIndex(null);
    setIsAnswered(false);
    speech.speak("Hãy thử lại nào! Em hoàn toàn có thể làm được.");
    onAnswerRetry();
  };

  const isCorrect = selectedIndex === question.correctIndex;

  // Candy styling colors for options
  const optionThemes = [
    { bg: 'bg-blue-50 hover:bg-blue-100', border: 'border-blue-400', badge: 'bg-blue-500 text-white', text: 'text-blue-950' },
    { bg: 'bg-emerald-50 hover:bg-emerald-100', border: 'border-emerald-400', badge: 'bg-emerald-500 text-white', text: 'text-emerald-950' },
    { bg: 'bg-amber-50 hover:bg-amber-100', border: 'border-amber-400', badge: 'bg-amber-500 text-white', text: 'text-amber-950' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-2xl bg-white border-4 border-amber-400 rounded-3xl p-5 md:p-8 shadow-2xl text-slate-900 flex flex-col gap-4 md:gap-5 overflow-hidden">
        {/* Monster Confrontation Banner with Realistic Visual */}
        <div className="flex items-center justify-between border-b-2 border-slate-100 pb-3 gap-3">
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-slate-900 border-2 border-amber-400 flex items-center justify-center overflow-hidden shrink-0 shadow-md">
              <MonsterVisual
                worldId={world.id}
                size={76}
                state={isAnswered ? (isCorrect ? 'hurt' : 'attack') : 'idle'}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-xs font-game">
                  THỬ THÁCH {questionNumber}/{totalInLevel}
                </span>
                <span className="text-xs font-bold text-slate-500">{world.name}</span>
              </div>
              <h4 className="text-sm md:text-base font-black font-game text-rose-700 mt-1 flex items-center gap-1.5">
                <span>{world.monsterIcon}</span>
                <span>{world.monsterName}</span>
              </h4>
              <p className="text-[11px] md:text-xs text-slate-600 italic font-medium mt-0.5 max-w-md">
                {isAnswered
                  ? isCorrect
                    ? '✨ "Á á á! Ánh sáng ranh giới và kiến thức của bé làm ta tan biến rồi!"'
                    : '😈 "Ha ha! Chưa đúng rồi! Bé hãy suy nghĩ kỹ và trả lời lại xem nào!"'
                  : `⚠️ ${world.monsterDescription}`}
              </p>
            </div>
          </div>

          <button
            onClick={handleToggleVoice}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold font-game transition-colors border border-amber-300 cursor-pointer shrink-0"
            title="Đọc câu hỏi bằng tiếng Việt"
          >
            {isSpeaking ? <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            <span className="hidden sm:inline">{isSpeaking ? 'Đang đọc...' : 'Nghe đọc 📢'}</span>
          </button>
        </div>

        {/* Question Prompt Card */}
        <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 rounded-2xl p-4 md:p-5 border-2 border-amber-300 shadow-sm">
          <p className="text-lg md:text-2xl font-black font-game text-slate-950 leading-relaxed">
            {question.question}
          </p>
        </div>

        {/* 3 Colorful Candy Choice Buttons */}
        <div className="flex flex-col gap-2.5 md:gap-3">
          {question.options.map((option, idx) => {
            const letter = ['A', 'B', 'C'][idx];
            const theme = optionThemes[idx];

            let cardClass = `${theme.bg} ${theme.border} ${theme.text}`;
            let badgeClass = theme.badge;

            if (isAnswered) {
              if (idx === question.correctIndex) {
                cardClass = "bg-emerald-100 border-emerald-500 text-emerald-950 ring-4 ring-emerald-300 scale-[1.01]";
                badgeClass = "bg-emerald-600 text-white";
              } else if (idx === selectedIndex) {
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
                className={`flex items-start gap-3.5 p-3.5 md:p-4 rounded-2xl border-3 text-left transition-all shadow-sm cursor-pointer ${cardClass} active:scale-[0.99]`}
              >
                <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-base shrink-0 font-game shadow-xs ${badgeClass}`}>
                  {letter}
                </span>
                <span className="text-sm md:text-base font-bold leading-relaxed pt-1">
                  {option}
                </span>
              </button>
            );
          })}
        </div>

        {/* Immediate Result Card */}
        {isAnswered && (
          <div className={`p-4 md:p-5 rounded-2xl border-3 flex flex-col gap-2 shadow-md animate-fade-in ${
            isCorrect
              ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
              : 'bg-amber-50 border-amber-400 text-amber-950'
          }`}>
            <div className="flex items-center gap-2 font-black font-game text-base md:text-lg">
              {isCorrect ? (
                <>
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span className="text-emerald-700">Chính xác tuyệt đối! Bé giỏi quá! ⭐ (+100 Điểm)</span>
                </>
              ) : (
                <>
                  <RotateCcw className="w-6 h-6 text-amber-600 shrink-0" />
                  <span className="text-amber-800">Đừng lo lắng! Hãy cùng học cách xử lý đúng nhé:</span>
                </>
              )}
            </div>

            <p className="text-xs md:text-sm leading-relaxed text-slate-700 font-medium">
              {question.explanation}
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs md:text-sm text-amber-800 font-bold border-t border-amber-200 mt-1">
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{question.ruleTip}</span>
            </div>
          </div>
        )}

        {/* Bottom Action Button */}
        {isAnswered && (
          <div className="flex justify-end pt-1">
            {isCorrect ? (
              <button
                onClick={onAnswerCorrect}
                className="w-full py-4 rounded-2xl btn-candy-green text-white font-black text-lg font-game flex items-center justify-center gap-2 cursor-pointer shadow-xl"
              >
                <span>BẬT KHIÊN ÁNH SÁNG & BỨT TỐC! ⚡</span>
                <ArrowRight className="w-6 h-6 stroke-[3]" />
              </button>
            ) : (
              <button
                onClick={handleRetry}
                className="w-full py-3.5 rounded-2xl btn-candy-amber text-slate-950 font-black text-base font-game flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <RotateCcw className="w-5 h-5 stroke-[3]" />
                <span>BÉ THỬ LẠI CÂU NÀY NÀO!</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
