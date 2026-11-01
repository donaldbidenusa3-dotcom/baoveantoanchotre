import React, { useState, useEffect } from 'react';
import { X, Volume2, VolumeX, Shield, Phone, Sparkles, BookOpen, Award, Heart, Star, CheckCircle, Music } from 'lucide-react';
import { GAME_WORLDS } from '../data/levels';
import { sounds } from '../utils/audio';
import { speech } from '../utils/speech';
import { bgm } from '../utils/bgm';

interface HandbookModalProps {
  onClose: () => void;
  unlockedBadges: number[];
}

export const HandbookModal: React.FC<HandbookModalProps> = ({ onClose, unlockedBadges }) => {
  const [activeTab, setActiveTab] = useState<'5fingers' | 'swimsuit' | '3steps' | 'helpline' | 'badges'>('5fingers');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(() => bgm.isMusicPlaying());

  // Stop speech when modal closes
  useEffect(() => {
    return () => {
      speech.stop();
    };
  }, []);

  const handleTabChange = (tab: typeof activeTab) => {
    sounds.playClick();
    speech.stop();
    setSpeakingId(null);
    setActiveTab(tab);
  };

  const handleClose = () => {
    sounds.playClick();
    speech.stop();
    setSpeakingId(null);
    onClose();
  };

  const toggleSpeak = (id: string, text: string) => {
    sounds.playClick();
    if (speakingId === id) {
      speech.stop();
      setSpeakingId(null);
    } else {
      speech.stop();
      setSpeakingId(id);
      speech.speak(text, 0.92, () => {
        setSpeakingId(current => (current === id ? null : current));
      });
    }
  };

  const fingerRules = [
    {
      id: 'finger-1',
      finger: '1. Ngón Cái (Gần Nhất)',
      title: 'Ôm & Chăm Sóc Yêu Thương',
      target: 'Bố mẹ, người giám hộ, anh chị em ruột sống cùng nhà.',
      desc: 'Được ôm hôn, chăm sóc và tắm rửa khi còn nhỏ.',
      speechText: 'Ngón cái gần nhất: Ôm và chăm sóc yêu thương. Dành cho bố mẹ, người giám hộ, anh chị em ruột sống cùng nhà. Được ôm hôn, chăm sóc và tắm rửa khi còn nhỏ.',
      color: 'bg-amber-50 border-amber-300 text-amber-950',
      badge: 'bg-amber-500 text-white',
      icon: '👍'
    },
    {
      id: 'finger-2',
      finger: '2. Ngón Trỏ',
      title: 'Nắm Tay & Khoác Vai',
      target: 'Ông bà, cô dì chú bác, thầy cô giáo thân thiết.',
      desc: 'Được nắm tay dẫn qua đường hoặc khoác vai động viên.',
      speechText: 'Ngón trỏ: Nắm tay và khoác vai. Dành cho ông bà, cô dì chú bác, thầy cô giáo thân thiết. Được nắm tay dẫn qua đường hoặc khoác vai động viên.',
      color: 'bg-blue-50 border-blue-300 text-blue-950',
      badge: 'bg-blue-500 text-white',
      icon: '☝️'
    },
    {
      id: 'finger-3',
      finger: '3. Ngón Giữa',
      title: 'Bắt Tay & Đập Tay High-Five',
      target: 'Bạn bè cùng trang lứa, bạn cùng lớp, người quen.',
      desc: 'Chỉ bắt tay, đập tay chúc mừng khi học tập, chơi đùa.',
      speechText: 'Ngón giữa: Bắt tay và đập tay chúc mừng. Dành cho bạn bè cùng trang lứa, bạn cùng lớp và người quen. Chỉ bắt tay hoặc đập tay high-five khi học tập và chơi đùa.',
      color: 'bg-emerald-50 border-emerald-300 text-emerald-950',
      badge: 'bg-emerald-500 text-white',
      icon: '🤝'
    },
    {
      id: 'finger-4',
      finger: '4. Ngón Áp Út',
      title: 'Vẫy Tay Chào Lễ Phép',
      target: 'Hàng xóm mới quen, người bạn của bố mẹ.',
      desc: 'Đứng cách xa 2 mét, mỉm cười và vẫy tay chào lịch sự.',
      speechText: 'Ngón áp út: Vẫy tay chào lịch sự. Dành cho hàng xóm mới quen và người bạn của bố mẹ. Đứng cách xa hai mét, mỉm cười và vẫy tay chào lễ phép.',
      color: 'bg-purple-50 border-purple-300 text-purple-950',
      badge: 'bg-purple-500 text-white',
      icon: '👋'
    },
    {
      id: 'finger-5',
      finger: '5. Ngón Út (Xa Nhất)',
      title: 'Xua Tay & Bỏ Chạy & Kêu Cứu!',
      target: 'Người hoàn toàn xa lạ hoặc người làm em sợ hãi.',
      desc: 'Tuyệt đối không lại gần, không nhận quà, không đi theo. Nếu họ chạm vào -> Hét to và bỏ chạy ngay!',
      speechText: 'Ngón út xa nhất: Xua tay, bỏ chạy và kêu cứu! Dành cho người hoàn toàn xa lạ hoặc người làm em sợ hãi. Tuyệt đối không lại gần, không nhận quà bánh, không đi theo. Nếu họ cố tình chạm vào, hãy hét to và bỏ chạy ngay!',
      color: 'bg-rose-50 border-rose-300 text-rose-950',
      badge: 'bg-rose-500 text-white',
      icon: '🚫'
    }
  ];

  // Full page reading texts per tab
  const getFullPageSpeechText = () => {
    switch (activeTab) {
      case '5fingers':
        return 'Sổ tay an toàn: Quy tắc 5 ngón tay. 5 vòng tròn khoảng cách an toàn. Ngón cái: Ôm và chăm sóc yêu thương cho bố mẹ và anh chị em ruột. Ngón trỏ: Nắm tay và khoác vai cho ông bà, thầy cô, họ hàng. Ngón giữa: Bắt tay và đập tay cho bạn bè cùng lớp. Ngón áp út: Vẫy tay chào lịch sự cho hàng xóm và người quen. Ngón út: Xua tay, bỏ chạy và kêu cứu khi gặp người lạ nguy hiểm!';
      case 'swimsuit':
        return 'Sổ tay an toàn: Quy tắc đồ bơi và 4 vùng thiêng liêng bất khả xâm phạm. Vùng 1: Miệng, không ai được tùy tiện hôn hoặc ép em hôn. Vùng 2: Ngực, luôn được che kín bằng áo lót hoặc đồ bơi. Vùng 3: Phần giữa hai đùi, bộ phận sinh dục tuyệt đối cấm sờ. Vùng 4: Mông, phía sau đồ bơi, không ai được sờ hoặc véo. Ngoại lệ duy nhất vì sức khỏe: Chỉ có Bác sĩ khi khám bệnh có bố mẹ chứng kiến, hoặc bố mẹ chăm sóc lúc em còn nhỏ mới được chạm vào.';
      case '3steps':
        return 'Sổ tay an toàn: 3 bước tự vệ khi gặp nguy hiểm. Bước 1: Nói KHÔNG thật to dứt khoát! Bước 2: Bỏ chạy thật nhanh đến nơi sáng, đông người hoặc chú bảo vệ gần nhất! Bước 3: Kể ngay với bố mẹ, thầy cô hoặc gọi Tổng đài 111. Lời khuyên vàng: Mọi lời đe dọa ép em giữ bí mật đều là giả dối! Em không có lỗi gì cả.';
      case 'helpline':
        return 'Sổ tay an toàn: Tổng đài Quốc gia 111 - Bảo vệ trẻ em Việt Nam. Gọi miễn phí 100%, trực 24/7 cả ngày lẫn đêm trên toàn quốc. Khi gặp nguy hiểm, hãy nhấc máy gọi 111. Ngoài ra, gọi 113 cho Công an khẩn cấp và gọi 115 cho Cấp cứu y tế.';
      case 'badges':
        return `Sổ tay an toàn: Bộ sưu tập 7 huy hiệu Hiệp sĩ An toàn. Em đã mở khóa được ${unlockedBadges.length} trên 7 huy hiệu. Hãy hoàn thành tất cả các màn chơi để trở thành Hiệp sĩ An toàn xuất sắc!`;
      default:
        return '';
    }
  };

  const isFullPageSpeaking = speakingId === `page-${activeTab}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/70 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white border-4 border-amber-400 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between px-5 md:px-6 py-3.5 border-b-2 border-slate-100 bg-amber-50/80">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-2xl shadow-sm shrink-0">
              📖
            </span>
            <div>
              <h3 className="text-xl md:text-2xl font-black font-game text-slate-900 leading-tight">
                SỔ TAY HIỆP SĨ AN TOÀN
              </h3>
              <p className="text-[11px] md:text-xs text-slate-600 font-semibold">
                Cẩm nang vui học bảo vệ cơ thể & kỹ năng sống an toàn
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Global Page Read Aloud Button */}
            <button
              onClick={() => toggleSpeak(`page-${activeTab}`, getFullPageSpeechText())}
              className={`flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-2xl font-black font-game text-xs md:text-sm cursor-pointer shadow-sm transition-all ${
                isFullPageSpeaking
                  ? 'bg-rose-500 text-white animate-pulse'
                  : 'btn-candy-amber text-slate-950 hover:scale-105 active:scale-95'
              }`}
              title="Nghe đọc toàn bộ trang này"
            >
              {isFullPageSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Dừng đọc ⏹️</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe đọc trang này 📢</span>
                </>
              )}
            </button>

            {/* BGM Toggle Button */}
            <button
              onClick={() => {
                sounds.playClick();
                const next = bgm.toggle();
                setIsMusicPlaying(next);
              }}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border font-black font-game text-xs md:text-sm cursor-pointer shadow-xs transition-all ${
                isMusicPlaying
                  ? 'bg-amber-100 hover:bg-amber-200 border-amber-400 text-amber-900'
                  : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-500'
              }`}
              title="Bật/Tắt nhạc nền khi xem sổ tay"
            >
              <Music className="w-4 h-4" />
              <span className="hidden sm:inline">{isMusicPlaying ? 'Nhạc: BẬT 🎵' : 'Tắt nhạc 🔇'}</span>
            </button>

            <button
              onClick={handleClose}
              className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              title="Đóng sổ tay"
            >
              <X className="w-5 h-5 stroke-[3]" />
            </button>
          </div>
        </div>

        {/* Candy Navigation Tabs */}
        <div className="flex items-center gap-2 p-2.5 md:p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto text-xs md:text-sm font-black font-game scrollbar-none">
          <button
            onClick={() => handleTabChange('5fingers')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === '5fingers' ? 'btn-candy-amber text-slate-950 shadow-md' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>🖐️ Quy tắc 5 Ngón Tay</span>
          </button>

          <button
            onClick={() => handleTabChange('swimsuit')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'swimsuit' ? 'btn-candy-amber text-slate-950 shadow-md' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>🩱 4 Vùng Riêng Tư</span>
          </button>

          <button
            onClick={() => handleTabChange('3steps')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === '3steps' ? 'btn-candy-amber text-slate-950 shadow-md' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>⚡ 3 Bước Tự Vệ</span>
          </button>

          <button
            onClick={() => handleTabChange('helpline')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'helpline' ? 'btn-candy-amber text-slate-950 shadow-md' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>📞 Tổng Đài 111 Cứu Trợ</span>
          </button>

          <button
            onClick={() => handleTabChange('badges')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl whitespace-nowrap transition-all cursor-pointer ${
              activeTab === 'badges' ? 'btn-candy-amber text-slate-950 shadow-md' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>🏆 Bộ Sưu Tập Huy Hiệu</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-5">
          {/* TAB 1: 5 FINGERS */}
          {activeTab === '5fingers' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-base md:text-lg font-black text-amber-900 font-game mb-1">
                    🖐️ 5 Vòng Tròn Khoảng Cách An Toàn
                  </h4>
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                    Bàn tay của em có 5 ngón, tương ứng với 5 mức độ tiếp xúc với những người xung quanh. Càng ra ngón xa, khoảng cách càng an toàn!
                  </p>
                </div>
                <button
                  onClick={() => toggleSpeak('finger-intro', 'Quy tắc 5 ngón tay: Bàn tay của em có 5 ngón, tương ứng với 5 mức độ tiếp xúc với những người xung quanh. Càng ra ngón xa, khoảng cách càng an toàn!')}
                  className="shrink-0 p-2.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-950 text-xs font-black font-game flex items-center gap-1 cursor-pointer transition-all"
                  title="Nghe giới thiệu"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Nghe đọc</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {fingerRules.map((rule) => {
                  const isSpeakingThis = speakingId === rule.id;
                  return (
                    <div
                      key={rule.id}
                      className={`p-4 rounded-2xl border-2 flex flex-col justify-between gap-2.5 shadow-sm transition-all ${
                        isSpeakingThis ? 'ring-4 ring-amber-400 bg-amber-100/90' : rule.color
                      }`}
                    >
                      <div className="flex gap-3.5">
                        <div className="text-4xl shrink-0 p-2 rounded-2xl bg-white shadow-xs flex items-center justify-center h-16 w-16">
                          {rule.icon}
                        </div>
                        <div className="space-y-1 flex-1">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black font-game uppercase tracking-wide ${rule.badge}`}>
                            {rule.finger}
                          </span>
                          <h5 className="text-base font-black font-game">{rule.title}</h5>
                          <p className="text-xs font-bold text-slate-800">Đối tượng: {rule.target}</p>
                          <p className="text-xs leading-relaxed font-medium">{rule.desc}</p>
                        </div>
                      </div>

                      {/* Card Voice Button */}
                      <div className="flex justify-end pt-1 border-t border-slate-200/60">
                        <button
                          onClick={() => toggleSpeak(rule.id, rule.speechText)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black font-game cursor-pointer transition-all ${
                            isSpeakingThis
                              ? 'bg-rose-500 text-white animate-pulse'
                              : 'bg-white hover:bg-amber-100 text-slate-800 border border-slate-300 shadow-xs'
                          }`}
                        >
                          {isSpeakingThis ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5" />
                              <span>Dừng đọc ⏹️</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                              <span>Nghe đọc 🔊</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: SWIMSUIT RULE */}
          {activeTab === 'swimsuit' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-300 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-base md:text-lg font-black text-blue-900 font-game mb-1">
                    🩱 Quy Tắc Đồ Bơi & 4 Vùng Thiêng Liêng Bất Khả Xâm Phạm
                  </h4>
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                    Khi mặc đồ bơi, những phần nào được che kín? Đó chính là những vùng thiêng liêng nhất của cơ thể em. Không ai được phép chạm vào!
                  </p>
                </div>
                <button
                  onClick={() => toggleSpeak('swim-intro', 'Quy tắc đồ bơi: Khi mặc đồ bơi, những phần nào được che kín, đó chính là những vùng thiêng liêng nhất của cơ thể em. Không ai được phép chạm vào!')}
                  className="shrink-0 p-2.5 rounded-xl bg-blue-200 hover:bg-blue-300 text-blue-950 text-xs font-black font-game flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Nghe đọc</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
                {[
                  { id: 'zone-1', name: '1. Miệng', desc: 'Không ai được tùy tiện hôn miệng em hoặc ép em hôn.', speech: 'Vùng số 1: Miệng. Không ai được tùy tiện hôn miệng em hoặc ép em hôn.', icon: '👄', color: 'bg-pink-50 border-pink-300' },
                  { id: 'zone-2', name: '2. Ngực', desc: 'Vùng ngực luôn được che kín bằng áo lót hoặc đồ bơi.', speech: 'Vùng số 2: Ngực. Vùng ngực luôn được che kín bằng áo lót hoặc đồ bơi.', icon: '👕', color: 'bg-blue-50 border-blue-300' },
                  { id: 'zone-3', name: '3. Giữa Hai Đùi', desc: 'Bộ phận sinh dục của em. Tuyệt đối cấm sờ!', speech: 'Vùng số 3: Giữa hai đùi. Đây là bộ phận sinh dục của em. Tuyệt đối cấm người khác sờ vào!', icon: '🩲', color: 'bg-emerald-50 border-emerald-300' },
                  { id: 'zone-4', name: '4. Mông', desc: 'Phía sau đồ bơi. Không ai được sờ, vỗ hoặc véo.', speech: 'Vùng số 4: Mông. Phía sau đồ bơi. Không ai được sờ, vỗ hoặc véo!', icon: '🛡️', color: 'bg-amber-50 border-amber-300' }
                ].map((item) => {
                  const isSpeakingThis = speakingId === item.id;
                  return (
                    <div key={item.id} className={`p-4 rounded-2xl border-2 text-center flex flex-col justify-between gap-2 shadow-xs transition-all ${
                      isSpeakingThis ? 'ring-4 ring-blue-400 bg-blue-100' : item.color
                    }`}>
                      <div className="space-y-1.5">
                        <div className="text-5xl">{item.icon}</div>
                        <h5 className="font-black text-slate-900 font-game text-base">{item.name}</h5>
                        <p className="text-xs text-slate-600 font-medium leading-relaxed">{item.desc}</p>
                      </div>

                      <button
                        onClick={() => toggleSpeak(item.id, item.speech)}
                        className={`mt-2 py-1.5 px-3 rounded-xl text-xs font-black font-game flex items-center justify-center gap-1 cursor-pointer transition-all ${
                          isSpeakingThis
                            ? 'bg-rose-500 text-white animate-pulse'
                            : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300'
                        }`}
                      >
                        {isSpeakingThis ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>Dừng ⏹️</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>Nghe 🔊</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Exception Note Card with Speech */}
              <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-950 text-xs md:text-sm space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black font-game text-base text-rose-700 flex items-center gap-1.5">
                    <span>⚠️</span> Ngoại lệ duy nhất vì sức khỏe:
                  </p>
                  <button
                    onClick={() => toggleSpeak('swim-exception', 'Ngoại lệ duy nhất vì sức khỏe: Chỉ có Bác sĩ khi khám bệnh có bố mẹ ở cạnh chứng kiến, hoặc Bố mẹ khi tắm rửa chăm sóc lúc em còn nhỏ mới được chạm vào. Bác sĩ luôn giải thích rõ trước khi khám!')}
                    className="p-1.5 px-3 rounded-xl bg-white text-rose-900 font-black text-xs font-game border border-rose-300 hover:bg-rose-100 flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe giải thích</span>
                  </button>
                </div>
                <p className="font-medium leading-relaxed">
                  Chỉ có <strong>Bác sĩ</strong> khi khám bệnh (có bố mẹ ở cạnh chứng kiến) hoặc <strong>Bố mẹ</strong> khi tắm rửa lúc em còn nhỏ mới được chạm vào để chăm sóc. Bác sĩ luôn giải thích rõ trước khi khám!
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: 3 STEPS */}
          {activeTab === '3steps' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    id: 'step-1',
                    step: 'BƯỚC 1',
                    action: 'NÓI "KHÔNG!" THẬT TO',
                    desc: 'Nhìn thẳng vào đối phương, nói to dứt khoát: "KHÔNG! Cháu không thích! Dừng lại ngay!".',
                    speech: 'Bước 1: Nói KHÔNG thật to dứt khoát! Nhìn thẳng vào đối phương, nói to: KHÔNG! Cháu không thích! Dừng lại ngay!',
                    color: 'bg-amber-50 border-amber-300',
                    icon: '🗣️'
                  },
                  {
                    id: 'step-2',
                    step: 'BƯỚC 2',
                    action: 'BỎ CHẠY THẬT NHANH',
                    desc: 'Chạy ngay đến chỗ sáng có đông người qua lại, chú bảo vệ hoặc cửa hàng tiện lợi gần nhất.',
                    speech: 'Bước 2: Bỏ chạy thật nhanh! Chạy ngay đến chỗ sáng có đông người qua lại, chú bảo vệ hoặc cửa hàng tiện lợi gần nhất.',
                    color: 'bg-blue-50 border-blue-300',
                    icon: '🏃'
                  },
                  {
                    id: 'step-3',
                    step: 'BƯỚC 3',
                    action: 'KỂ NGAY VỚI NGƯỜI LỚN',
                    desc: 'Kể ngay với bố mẹ, thầy cô hoặc gọi Tổng đài 111. Hãy kể cho đến khi có người tin và bảo vệ em!',
                    speech: 'Bước 3: Kể ngay với người lớn! Kể ngay với bố mẹ, thầy cô hoặc gọi Tổng đài 111. Hãy kiên trì kể cho đến khi có người tin và bảo vệ em!',
                    color: 'bg-emerald-50 border-emerald-300',
                    icon: '🫂'
                  }
                ].map((item) => {
                  const isSpeakingThis = speakingId === item.id;
                  return (
                    <div key={item.id} className={`p-5 rounded-3xl border-3 flex flex-col justify-between gap-3 shadow-md transition-all ${
                      isSpeakingThis ? 'ring-4 ring-amber-400 bg-amber-100' : item.color
                    }`}>
                      <div className="space-y-2">
                        <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-black text-xs font-game inline-block">
                          {item.step}
                        </span>
                        <div className="text-5xl pt-1">{item.icon}</div>
                        <h5 className="text-xl font-black text-slate-900 font-game">{item.action}</h5>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">{item.desc}</p>
                      </div>

                      <button
                        onClick={() => toggleSpeak(item.id, item.speech)}
                        className={`w-full py-2 rounded-xl text-xs font-black font-game flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                          isSpeakingThis
                            ? 'bg-rose-500 text-white animate-pulse'
                            : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 shadow-xs'
                        }`}
                      >
                        {isSpeakingThis ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>Dừng đọc ⏹️</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                            <span>Nghe đọc bước này 🔊</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Golden Tip Card */}
              <div className="p-4 rounded-2xl bg-amber-100 border-2 border-amber-400 text-amber-950 text-xs md:text-sm space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black font-game text-base flex items-center gap-1.5">
                    <span>💡</span> Lời khuyên vàng cho bé:
                  </p>
                  <button
                    onClick={() => toggleSpeak('golden-tip', 'Lời khuyên vàng cho bé: Nếu ai đó đe dọa ép em giữ bí mật, lời đe dọa đó hoàn toàn là giả dối! Em không làm gì sai cả. Người làm sai mới là người phải chịu trách nhiệm trước pháp luật.')}
                    className="p-1.5 px-3 rounded-xl bg-white text-amber-950 font-black text-xs font-game border border-amber-300 hover:bg-amber-200 flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Nghe lời khuyên</span>
                  </button>
                </div>
                <p className="font-medium leading-relaxed">
                  Nếu ai đó đe dọa ép em giữ bí mật: <strong>Lời đe dọa đó hoàn toàn là giả dối!</strong> Em không làm gì sai cả. Người làm sai mới là người phải chịu trách nhiệm trước pháp luật.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: HELPLINE 111 */}
          {activeTab === 'helpline' && (
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white shadow-xl space-y-4">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3.5">
                    <span className="text-5xl animate-bounce">📞</span>
                    <div>
                      <h4 className="text-2xl md:text-3xl font-black font-game drop-shadow-md">
                        TỔNG ĐÀI QUỐC GIA 111
                      </h4>
                      <p className="text-xs md:text-sm font-bold text-emerald-100">
                        Tổng đài Điện thoại Quốc gia Bảo vệ Trẻ em Việt Nam
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSpeak('hl-111-full', 'Tổng đài Quốc gia 111. Tổng đài điện thoại quốc gia bảo vệ trẻ em Việt Nam. Gọi miễn phí 100%, phục vụ 24/7 cả ngày lẫn đêm trên tất cả 63 tỉnh thành. Khi gặp nguy hiểm, hãy nhấc máy gọi 111 ngay!')}
                    className="p-2.5 px-4 rounded-2xl bg-white text-emerald-950 font-black font-game text-xs md:text-sm shadow-md hover:scale-105 active:scale-95 cursor-pointer transition-all flex items-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                    <span>Nghe về 111 📢</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-center">
                    <p className="text-xs font-bold text-white/90">Cước gọi</p>
                    <p className="text-lg font-black font-game text-yellow-300">MIỄN PHÍ 100%</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-center">
                    <p className="text-xs font-bold text-white/90">Thời gian trực</p>
                    <p className="text-lg font-black font-game text-yellow-300">24/7 (Cả ngày & đêm)</p>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-center">
                    <p className="text-xs font-bold text-white/90">Phạm vi hỗ trợ</p>
                    <p className="text-lg font-black font-game text-yellow-300">Tất cả 63 tỉnh thành</p>
                  </div>
                </div>

                <p className="text-xs md:text-sm leading-relaxed font-medium">
                  Bất cứ khi nào em hoặc bạn bè bị bạo lực, bắt nạt, xâm hại, đe dọa hoặc cảm thấy không an toàn, chỉ cần nhấc máy bấm số <strong>111</strong>. Các cô chú chuyên gia luôn lắng nghe và cử đội cứu trợ bảo vệ em ngay!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-red-50 border-2 border-red-300 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-red-500 text-white flex items-center justify-center font-black text-2xl font-game shadow-md shrink-0">
                      113
                    </div>
                    <div>
                      <h5 className="font-black text-slate-900 font-game text-base">CÔNG AN KHẨN CẤP</h5>
                      <p className="text-xs text-slate-600 font-medium">Báo tin trộm cắp, bắt cóc, đe dọa bạo lực nguy hiểm</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSpeak('hl-113', 'Số 113: Công an khẩn cấp. Báo tin khi có trộm cắp, bắt cóc hoặc đe dọa bạo lực nguy hiểm.')}
                    className="p-2 rounded-xl bg-white text-red-700 font-black text-xs font-game border border-red-200 hover:bg-red-100 shrink-0 cursor-pointer shadow-xs"
                    title="Nghe về 113"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50 border-2 border-blue-300 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-black text-2xl font-game shadow-md shrink-0">
                      115
                    </div>
                    <div>
                      <h5 className="font-black text-slate-900 font-game text-base">CẤP CỨU Y TẾ</h5>
                      <p className="text-xs text-slate-600 font-medium">Xe cứu thương khi có người bị thương nặng</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleSpeak('hl-115', 'Số 115: Cấp cứu y tế. Gọi xe cứu thương khi có người bị thương nặng hoặc nguy cấp.')}
                    className="p-2 rounded-xl bg-white text-blue-700 font-black text-xs font-game border border-blue-200 hover:bg-blue-100 shrink-0 cursor-pointer shadow-xs"
                    title="Nghe về 115"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BADGES */}
          {activeTab === 'badges' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-base md:text-lg font-black text-amber-900 font-game mb-1">
                    🏆 Bộ Sưu Tập Huy Hiệu Hiệp Sĩ An Toàn
                  </h4>
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                    Em đã mở khóa được <strong>{unlockedBadges.length} / 7</strong> huy hiệu danh giá. Vượt qua từng thế giới để hoàn thành bộ sưu tập nhé!
                  </p>
                </div>

                <button
                  onClick={() => toggleSpeak('badges-info', `Bộ sưu tập huy hiệu an toàn. Em đã mở khóa được ${unlockedBadges.length} trên 7 huy hiệu. Hãy vượt qua tất cả các thế giới để trở thành Hiệp sĩ An toàn xuất sắc!`)}
                  className="shrink-0 p-2.5 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-950 text-xs font-black font-game flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Volume2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Nghe đọc</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                {GAME_WORLDS.map((world) => {
                  const isUnlocked = unlockedBadges.includes(world.id);
                  const isSpeakingThis = speakingId === `badge-${world.id}`;
                  return (
                    <div
                      key={world.id}
                      className={`p-4 rounded-2xl border-2 flex flex-col justify-between gap-2 shadow-sm transition-all ${
                        isSpeakingThis
                          ? 'ring-4 ring-amber-400 bg-amber-100'
                          : isUnlocked
                          ? 'bg-amber-50 border-amber-400 text-slate-900 ring-1 ring-amber-300'
                          : 'bg-slate-100 border-slate-200 text-slate-400 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-3xl p-2 rounded-2xl bg-white shadow-xs shrink-0">
                          {isUnlocked ? world.badgeIcon : '🔒'}
                        </span>
                        <div>
                          <p className="text-[10px] font-black uppercase text-amber-600 font-game">Level {world.id}</p>
                          <h5 className="text-sm font-black font-game text-slate-900 line-clamp-1">{world.badgeName}</h5>
                          <p className="text-xs font-semibold text-slate-500">
                            {isUnlocked ? 'Đã thu thập ✨' : 'Chưa mở khóa'}
                          </p>
                        </div>
                      </div>

                      {isUnlocked && (
                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => toggleSpeak(`badge-${world.id}`, `Huy hiệu Level ${world.id}: ${world.badgeName}. Em đã mở khóa thành công!`)}
                            className="p-1 px-2.5 rounded-lg bg-white text-slate-800 text-[11px] font-black font-game border border-slate-300 hover:bg-amber-100 cursor-pointer flex items-center gap-1"
                          >
                            <Volume2 className="w-3 h-3 text-amber-600" />
                            <span>Nghe</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 md:px-6 py-3 border-t-2 border-slate-100 bg-slate-50 flex items-center justify-between text-xs font-bold text-slate-600">
          <span className="hidden sm:inline">Quyền trẻ em là thiêng liêng và bất khả xâm phạm</span>
          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-2xl btn-candy-amber text-slate-950 font-black font-game text-sm cursor-pointer shadow-md"
          >
            ĐÓNG SỔ TAY
          </button>
        </div>
      </div>
    </div>
  );
};
