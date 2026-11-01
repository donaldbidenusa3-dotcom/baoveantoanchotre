import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { TitleScreen } from './components/TitleScreen';
import { CharacterSelect } from './components/CharacterSelect';
import { WorldSelectMap } from './components/WorldSelectMap';
import { GameCanvas, HazardType } from './components/GameCanvas';
import { QuestionModal } from './components/QuestionModal';
import { HandbookModal } from './components/HandbookModal';
import { QuizBankModal } from './components/QuizBankModal';
import { CertificateModal } from './components/CertificateModal';
import { LevelClearModal } from './components/LevelClearModal';
import { ObstacleHitModal } from './components/ObstacleHitModal';

import { GAME_WORLDS, GameWorld } from './data/levels';
import { CHARACTERS, CAPE_OPTIONS, CharacterProfile, CapeOption } from './data/characters';
import { QUESTIONS_BANK, QuestionItem } from './data/questions';
import { sounds } from './utils/audio';
import { bgm } from './utils/bgm';
import { speech } from './utils/speech';

import {
  Volume2,
  VolumeX,
  Music,
  Pause,
  Play,
  RotateCcw,
  BookOpen,
  ArrowLeft,
  Shield,
  Star,
  Award
} from 'lucide-react';

type GameScreen = 'TITLE' | 'CHARACTER_SELECT' | 'WORLD_MAP' | 'PLAYING';

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('TITLE');

  const [selectedChar, setSelectedChar] = useState<CharacterProfile>(CHARACTERS[0]);
  const [selectedCape, setSelectedCape] = useState<CapeOption>(CAPE_OPTIONS[0]);

  const [currentWorld, setCurrentWorld] = useState<GameWorld>(GAME_WORLDS[0]);
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [completedWorlds, setCompletedWorlds] = useState<number[]>([]);
  const [unlockedBadges, setUnlockedBadges] = useState<number[]>([]);

  const [totalScore, setTotalScore] = useState<number>(0);
  const [levelScore, setLevelScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  // 10 questions / 10 monsters per level
  const [levelQuestions, setLevelQuestions] = useState<QuestionItem[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [isQuestionActive, setIsQuestionActive] = useState<boolean>(false);
  const [triggerBlast, setTriggerBlast] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // 3 Hearts protection system for easy child-friendly gameplay
  const [hearts, setHearts] = useState<number>(3);
  const [invincibleMode, setInvincibleMode] = useState<boolean>(false);

  // Collision hit state (Cactus / Crab)
  const [hitObstacle, setHitObstacle] = useState<HazardType | null>(null);

  const [showHandbook, setShowHandbook] = useState<boolean>(false);
  const [showQuizBank, setShowQuizBank] = useState<boolean>(false);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [showLevelClear, setShowLevelClear] = useState<boolean>(false);

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isBgmPlaying, setIsBgmPlaying] = useState<boolean>(false);

  // Initialize 10 monsters & questions for level
  const initLevelQuestions = useCallback((world: GameWorld) => {
    let qForWorld = QUESTIONS_BANK.filter(q => q.levelId === world.id);
    if (qForWorld.length < 10) {
      const otherQ = QUESTIONS_BANK.filter(q => q.levelId !== world.id);
      qForWorld = [...qForWorld, ...otherQ];
    }
    // Take exactly 10 questions for the 10 monsters in this world
    const selected10 = [...qForWorld].slice(0, 10);
    setLevelQuestions(selected10);
    setCurrentQIndex(0);
    setLevelScore(0);
    setHearts(3);
    setIsQuestionActive(false);
    setHitObstacle(null);
  }, []);

  const handleStartGame = () => {
    setScreen('CHARACTER_SELECT');
    if (!isBgmPlaying) {
      bgm.start();
      setIsBgmPlaying(true);
    }
  };

  const handleConfirmCharacter = () => {
    setScreen('WORLD_MAP');
  };

  const handleSelectWorld = (world: GameWorld) => {
    setCurrentWorld(world);
    initLevelQuestions(world);
    setScreen('PLAYING');
    setIsPaused(false);
    setHitObstacle(null);
    sounds.playClick();
  };

  // Called when reaching a monster on the road
  const handleEncounterQuestion = useCallback(() => {
    if (!isQuestionActive && levelQuestions.length > 0) {
      setIsQuestionActive(true);
    }
  }, [isQuestionActive, levelQuestions.length]);

  // Called when player touches a cactus or crab on the track: Absorbs with hearts!
  const handleObstacleHit = useCallback((type: HazardType) => {
    if (invincibleMode) return;
    setHearts(prev => {
      const next = prev - 1;
      if (next <= 0) {
        setHitObstacle(type);
        return 0;
      }
      return next;
    });
  }, [invincibleMode]);

  const handleRetryAfterHit = () => {
    setHitObstacle(null);
    initLevelQuestions(currentWorld);
  };

  // Correct answer callback: blasts monster, vaults over barrier
  const handleAnswerCorrect = () => {
    setTriggerBlast(true);
    setTimeout(() => setTriggerBlast(false), 600);

    const bonus = 100 + streak * 20;
    setLevelScore(s => s + bonus);
    setTotalScore(s => s + bonus);
    setStreak(s => s + 1);

    setIsQuestionActive(false);

    // If 10th monster defeated -> Level cleared!
    if (currentQIndex + 1 >= 10 || currentQIndex + 1 >= levelQuestions.length) {
      setTimeout(() => {
        sounds.playLevelClear();
        setCompletedWorlds(prev => Array.from(new Set([...prev, currentWorld.id])));
        setUnlockedBadges(prev => Array.from(new Set([...prev, currentWorld.id])));
        if (currentWorld.id >= unlockedLevel && unlockedLevel < 7) {
          setUnlockedLevel(currentWorld.id + 1);
        }
        setShowLevelClear(true);
      }, 700);
    } else {
      setCurrentQIndex(i => i + 1);
    }
  };

  const handleAnswerRetry = () => {
    setStreak(0);
  };

  const handleNextWorld = () => {
    setShowLevelClear(false);
    const nextWorld = GAME_WORLDS.find(w => w.id === currentWorld.id + 1);
    if (nextWorld) {
      handleSelectWorld(nextWorld);
    } else {
      setShowCertificate(true);
    }
  };

  const handleReturnToMap = () => {
    setShowLevelClear(false);
    setHitObstacle(null);
    setScreen('WORLD_MAP');
  };

  const handleToggleSound = () => {
    const muted = sounds.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleBgm = () => {
    const playing = bgm.toggle();
    setIsBgmPlaying(playing);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && screen === 'PLAYING' && !isQuestionActive && !showLevelClear && !hitObstacle) {
        setIsPaused(p => !p);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [screen, isQuestionActive, showLevelClear, hitObstacle]);

  const activeQuestion = levelQuestions[currentQIndex] || levelQuestions[0];
  const progressPercent = levelQuestions.length > 0 ? (currentQIndex / 10) * 100 : 0;

  return (
    <div
      id="app-scroll-container"
      className={`relative w-full bg-slate-900 text-slate-100 font-sans select-none ${
        screen === 'PLAYING' ? 'h-screen overflow-hidden' : 'min-h-screen overflow-y-auto overflow-x-hidden'
      }`}
    >
      {/* 1. TITLE SCREEN */}
      {screen === 'TITLE' && (
        <TitleScreen
          onStart={handleStartGame}
          onOpenHandbook={() => setShowHandbook(true)}
          isMuted={isMuted}
          onToggleSound={handleToggleSound}
          isBgmPlaying={isBgmPlaying}
          onToggleBgm={handleToggleBgm}
        />
      )}

      {/* 2. CHARACTER SELECTION */}
      {screen === 'CHARACTER_SELECT' && (
        <CharacterSelect
          selectedChar={selectedChar}
          selectedCape={selectedCape}
          onSelectChar={setSelectedChar}
          onSelectCape={setSelectedCape}
          onConfirm={handleConfirmCharacter}
        />
      )}

      {/* 3. WORLD SELECTION MAP */}
      {screen === 'WORLD_MAP' && (
        <WorldSelectMap
          character={selectedChar}
          cape={selectedCape}
          unlockedLevel={unlockedLevel}
          completedWorlds={completedWorlds}
          onSelectWorld={handleSelectWorld}
          onOpenHandbook={() => setShowHandbook(true)}
          onOpenQuizBank={() => setShowQuizBank(true)}
          onChangeCharacter={() => setScreen('CHARACTER_SELECT')}
          totalScore={totalScore}
          isBgmPlaying={isBgmPlaying}
          onToggleBgm={handleToggleBgm}
        />
      )}

      {/* 4. ACTIVE PLAYING CANVAS & LIVELY HUD */}
      {screen === 'PLAYING' && (
        <div className="relative w-full h-full flex flex-col justify-between">
          {/* Top In-Game Perimeter HUD */}
          <header className="absolute top-0 inset-x-0 z-30 flex items-center justify-between px-4 md:px-8 py-3 bg-white/95 backdrop-blur-md border-b-2 border-amber-300 shadow-md text-slate-900 pointer-events-auto">
            {/* Left Zone: Back & Level title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  sounds.playClick();
                  setScreen('WORLD_MAP');
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-xs font-black font-game text-slate-900 transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 stroke-[3]" />
                <span className="hidden sm:inline">Bản đồ</span>
              </button>

              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-2xl bg-amber-100 border-2 border-amber-400 flex items-center justify-center text-xl shadow-xs">
                  {currentWorld.monsterIcon}
                </span>
                <div>
                  <h3 className="text-sm font-black font-game text-slate-900 flex items-center gap-1.5">
                    <span>{currentWorld.name}</span>
                    <span className="text-xs font-extrabold text-amber-600">({currentWorld.subtitle})</span>
                  </h3>
                  <div className="w-28 sm:w-40 h-2.5 rounded-full bg-slate-200 overflow-hidden mt-0.5 border border-slate-300">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-300 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Zone: Score, Hearts, and Tools */}
            <div className="flex items-center gap-2">
              {/* 3 Hearts Indicator */}
              <div
                className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-rose-50 border-2 border-rose-300 text-sm shadow-xs"
                title={`Còn ${hearts} tim bảo vệ`}
              >
                <span>{hearts >= 3 ? '❤️❤️❤️' : hearts === 2 ? '❤️❤️🤍' : hearts === 1 ? '❤️🤍🤍' : '🤍🤍🤍'}</span>
              </div>

              {/* Easy / Invincible Shield Mode Toggle */}
              <button
                onClick={() => {
                  sounds.playClick();
                  setInvincibleMode(m => !m);
                }}
                className={`px-3 py-1.5 rounded-2xl border-2 text-xs font-black font-game transition-all cursor-pointer ${
                  invincibleMode
                    ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-sm scale-105'
                    : 'bg-white text-slate-700 hover:bg-amber-50 border-slate-300'
                }`}
                title="Bật/Tắt chế độ Khiên Bất Tử siêu dễ cho bé nhỏ"
              >
                {invincibleMode ? '🛡️ Khiên Bất Tử: BẬT' : '🛡️ Dễ (3 Tim)'}
              </button>

              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-xs font-black font-game shadow-xs hidden sm:flex">
                <span className="text-amber-700">★ {totalScore}</span>
                {streak > 1 && (
                  <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                    x{streak} 🔥
                  </span>
                )}
                <span className="text-rose-600 font-extrabold">
                  👹 {currentQIndex + 1}/10
                </span>
              </div>

              {/* Handbook Button */}
              <button
                onClick={() => {
                  sounds.playClick();
                  setShowHandbook(true);
                }}
                className="p-2.5 rounded-2xl bg-amber-400 text-slate-950 font-bold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer border border-amber-500"
                title="Mở Sổ Tay Hiệp Sĩ"
              >
                <BookOpen className="w-4 h-4" />
              </button>

              {/* Sound toggle */}
              <button
                onClick={() => {
                  sounds.playClick();
                  handleToggleSound();
                }}
                className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 transition-all cursor-pointer"
                title="Bật/Tắt âm thanh"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-amber-500" />}
              </button>

              {/* BGM Toggle */}
              <button
                onClick={() => {
                  sounds.playClick();
                  handleToggleBgm();
                }}
                className={`px-3 py-2 rounded-2xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isBgmPlaying ? 'bg-amber-100 hover:bg-amber-200 border-amber-400 text-amber-900 shadow-xs' : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-500'
                }`}
                title="Bật hoặc Tắt nhạc nền"
              >
                <Music className="w-4 h-4" />
                <span className="text-[11px] font-black font-game hidden md:inline">
                  {isBgmPlaying ? 'Nhạc: BẬT 🎵' : 'Tắt nhạc 🔇'}
                </span>
              </button>

              {/* Pause Toggle */}
              <button
                onClick={() => {
                  sounds.playClick();
                  setIsPaused(p => !p);
                }}
                className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 transition-all cursor-pointer"
                title="Tạm dừng"
              >
                {isPaused ? <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" /> : <Pause className="w-4 h-4 stroke-[3]" />}
              </button>
            </div>
          </header>

          {/* 60FPS Game Canvas with 10 Monsters and Cactus/Crab Obstacles */}
          <div className="relative w-full h-full flex-1">
            <GameCanvas
              world={currentWorld}
              character={selectedChar}
              cape={selectedCape}
              onEncounterQuestion={handleEncounterQuestion}
              onObstacleHit={handleObstacleHit}
              isQuestionActive={isQuestionActive || isPaused || hitObstacle !== null}
              score={totalScore}
              streak={streak}
              progressPercent={progressPercent}
              triggerBlast={triggerBlast}
              onCollectStar={() => setTotalScore(s => s + 10)}
              currentMonsterNum={currentQIndex + 1}
              totalMonsters={10}
              hearts={hearts}
              invincibleMode={invincibleMode}
            />
          </div>

          {/* Pause Modal */}
          {isPaused && (
            <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
              <div className="p-8 rounded-3xl bg-white border-4 border-amber-400 text-center space-y-4 max-w-sm w-full shadow-2xl text-slate-900">
                <span className="text-5xl animate-bounce">☕</span>
                <h4 className="text-2xl font-black font-game text-slate-900">TRÒ CHƠI TẠM DỪNG</h4>
                <p className="text-xs text-slate-600 font-medium">
                  Uống một ngụm nước và thư giãn một chút trước khi tiếp tục hành trình nhé!
                </p>

                <div className="flex flex-col gap-2.5 pt-2">
                  <button
                    onClick={() => setIsPaused(false)}
                    className="w-full py-3.5 rounded-2xl btn-candy-amber text-slate-950 font-black font-game text-sm shadow-md cursor-pointer"
                  >
                    TIẾP TỤC CHẠY NGAY
                  </button>

                  <button
                    onClick={() => {
                      setIsPaused(false);
                      initLevelQuestions(currentWorld);
                    }}
                    className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black font-game text-xs transition-colors cursor-pointer"
                  >
                    CHƠI LẠI MÀN NÀY
                  </button>

                  <button
                    onClick={() => {
                      setIsPaused(false);
                      setScreen('WORLD_MAP');
                    }}
                    className="w-full py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black font-game text-xs transition-colors cursor-pointer"
                  >
                    QUAY VỀ BẢN ĐỒ THẾ GIỚI
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Obstacle Collision Modal (Hit Cactus or Crab -> Retry) */}
          {hitObstacle && (
            <ObstacleHitModal
              obstacleType={hitObstacle}
              onRetry={handleRetryAfterHit}
              onReturnToMap={handleReturnToMap}
            />
          )}

          {/* Interactive Monster Question Encounter Modal (10 Monsters per level) */}
          {isQuestionActive && activeQuestion && (
            <QuestionModal
              question={activeQuestion}
              world={currentWorld}
              questionNumber={currentQIndex + 1}
              totalInLevel={10}
              onAnswerCorrect={handleAnswerCorrect}
              onAnswerRetry={handleAnswerRetry}
            />
          )}

          {/* Level Complete Modal */}
          {showLevelClear && (
            <LevelClearModal
              world={currentWorld}
              character={selectedChar}
              levelScore={levelScore}
              totalScore={totalScore}
              isLastWorld={currentWorld.id === 7}
              onNextWorld={handleNextWorld}
              onReturnToMap={handleReturnToMap}
              onViewCertificate={() => {
                setShowLevelClear(false);
                setShowCertificate(true);
              }}
            />
          )}
        </div>
      )}

      {/* Sổ Tay Hiệp Sĩ Modal */}
      {showHandbook && (
        <HandbookModal
          onClose={() => setShowHandbook(false)}
          unlockedBadges={unlockedBadges}
        />
      )}

      {/* Chế Độ Luyện Tập 100 Câu Hỏi */}
      {showQuizBank && (
        <QuizBankModal
          onClose={() => setShowQuizBank(false)}
        />
      )}

      {/* Safety Hero Certificate Final Modal */}
      {showCertificate && (
        <CertificateModal
          character={selectedChar}
          totalScore={totalScore}
          onRestart={() => {
            setShowCertificate(false);
            setScreen('TITLE');
          }}
          onClose={() => {
            setShowCertificate(false);
            setScreen('WORLD_MAP');
          }}
        />
      )}
    </div>
  );
}
