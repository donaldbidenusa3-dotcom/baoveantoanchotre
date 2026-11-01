export interface GameWorld {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  themeColor: string;
  bgGradient: string;
  monsterName: string;
  monsterDescription: string;
  monsterColor: string;
  monsterIcon: string;
  environment: 'forest' | 'city' | 'castle' | 'cyber' | 'village' | 'mountain' | 'kingdom';
  requiredQuestions: number; // 10 monsters per level as requested
  badgeName: string;
  badgeIcon: string;
}

export const GAME_WORLDS: GameWorld[] = [
  {
    id: 1,
    name: "Khu Rừng Cơ Thể",
    subtitle: "LEVEL 1 – MY BODY",
    description: "Nhận biết các vùng riêng tư, quy tắc đồ bơi và làm chủ cơ thể kỳ diệu của mình.",
    themeColor: "from-emerald-500 to-teal-600",
    bgGradient: "bg-gradient-to-b from-sky-400 via-emerald-200 to-emerald-600",
    monsterName: "Quái Vật Bàn Tay Xấu",
    monsterDescription: "Thích chạm lén vào ranh giới người khác. Hãy dùng khiên ánh sáng đẩy lùi nó!",
    monsterColor: "#8b5cf6",
    monsterIcon: "✋",
    environment: "forest",
    requiredQuestions: 10,
    badgeName: "Huy Hiệu Cơ Thể Bất Khả Xâm Phạm",
    badgeIcon: "🛡️"
  },
  {
    id: 2,
    name: "Thành Phố Ranh Giới",
    subtitle: "LEVEL 2 – BODY BOUNDARIES",
    description: "Học cách thiết lập ranh giới cá nhân, tôn trọng người khác và dũng cảm nói KHÔNG.",
    themeColor: "from-amber-500 to-orange-600",
    bgGradient: "bg-gradient-to-b from-amber-300 via-orange-200 to-amber-600",
    monsterName: "Quái Vật Kẻ Kiểm Soát",
    monsterDescription: "Thường ép buộc và không chịu lắng nghe khi người khác nói 'Dừng lại'.",
    monsterColor: "#ea580c",
    monsterIcon: "🛑",
    environment: "city",
    requiredQuestions: 10,
    badgeName: "Huy Hiệu Tiếng Nói Dũng Khí (Nói KHÔNG)",
    badgeIcon: "🗣️"
  },
  {
    id: 3,
    name: "Lâu Đài Bí Mật",
    subtitle: "LEVEL 3 – SAFE OR UNSAFE",
    description: "Nhận diện hành vi xâm hại, phân biệt bí mật an toàn và phá vỡ bẫy dụ dỗ của kẻ xấu.",
    themeColor: "from-indigo-600 to-purple-800",
    bgGradient: "bg-gradient-to-b from-indigo-900 via-purple-700 to-indigo-950",
    monsterName: "Quái Vật Bí Mật Đen & Cái Bẫy",
    monsterDescription: "Luôn bảo 'Giữ bí mật nhé' và dùng quà bánh để dụ dỗ các bạn nhỏ.",
    monsterColor: "#7c3aed",
    monsterIcon: "🤫",
    environment: "castle",
    requiredQuestions: 10,
    badgeName: "Huy Hiệu Ngọn Đèn Chân Lý",
    badgeIcon: "🔦"
  },
  {
    id: 4,
    name: "Thành Phố Internet",
    subtitle: "LEVEL 4 – ONLINE SAFETY",
    description: "Khám phá không gian mạng thông minh, phòng tránh tài khoản giả mạo, lừa đảo và tin nhắn độc.",
    themeColor: "from-cyan-500 to-blue-600",
    bgGradient: "bg-gradient-to-b from-slate-900 via-cyan-900 to-blue-950",
    monsterName: "Quái Vật Mặt Nạ & Chiếc Điện Thoại",
    monsterDescription: "Ẩn mình sau ảnh đại diện giả, đòi ảnh riêng tư và dụ em bấm link lạ.",
    monsterColor: "#06b6d4",
    monsterIcon: "🎭",
    environment: "cyber",
    requiredQuestions: 10,
    badgeName: "Huy Hiệu Hiệp Sĩ Không Gian Mạng",
    badgeIcon: "💻"
  },
  {
    id: 5,
    name: "Ngôi Làng Tình Bạn",
    subtitle: "LEVEL 5 – STOP BULLYING",
    description: "Nói không với bạo lực học đường, chống cô lập, tôn trọng sự khác biệt và giúp đỡ bạn bè.",
    themeColor: "from-rose-500 to-pink-600",
    bgGradient: "bg-gradient-to-b from-rose-300 via-pink-200 to-amber-200",
    monsterName: "Quái Vật Lời Nói Độc",
    monsterDescription: "Thích dùng biệt danh xấu xí, xúc phạm và đe dọa để làm bạn khác khóc.",
    monsterColor: "#e11d48",
    monsterIcon: "💬",
    environment: "village",
    requiredQuestions: 10,
    badgeName: "Huy Hiệu Trái Tim Nhân Ái & Tôn Trọng",
    badgeIcon: "💖"
  },
  {
    id: 6,
    name: "Con Đường An Toàn",
    subtitle: "LEVEL 6 – ESCAPE AND PROTECT",
    description: "Kỹ năng xử lý tình huống khẩn cấp, thoát hiểm khi bị bám theo và kết nối Tổng đài 111.",
    themeColor: "from-emerald-600 to-green-700",
    bgGradient: "bg-gradient-to-b from-sky-300 via-emerald-100 to-emerald-700",
    monsterName: "Quái Vật Bóng Đêm Mê Cung",
    monsterDescription: "Lợi dụng bóng tối và sự bối rối khi bị lạc. Ánh sáng dũng cảm sẽ xua tan nó!",
    monsterColor: "#334155",
    monsterIcon: "🌌",
    environment: "mountain",
    requiredQuestions: 10,
    badgeName: "Huy Hiệu Bậc Thầy Thoát Hiểm 111",
    badgeIcon: "📞"
  },
  {
    id: 7,
    name: "Vương Quốc Safety Hero",
    subtitle: "LEVEL 7 – SAFETY HERO",
    description: "Đại thử thách toàn diện! Vượt qua 10 quái vật tối cao để trở thành Hiệp Sĩ An Toàn vĩ đại.",
    themeColor: "from-amber-400 via-yellow-500 to-orange-500",
    bgGradient: "bg-gradient-to-b from-amber-400 via-indigo-600 to-purple-900",
    monsterName: "Bóng Đêm Nguy Hiểm Tối Cao",
    monsterDescription: "Tổng hợp các mối đe dọa xã hội. Hãy kích hoạt Khiên Ánh Sáng Vĩnh Cửu!",
    monsterColor: "#f59e0b",
    monsterIcon: "👑",
    environment: "kingdom",
    requiredQuestions: 10,
    badgeName: "HUY CHƯƠNG VÀNG SAFETY HERO TOÀN NĂNG",
    badgeIcon: "🏆"
  }
];
