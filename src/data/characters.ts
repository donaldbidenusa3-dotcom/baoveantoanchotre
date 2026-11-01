export interface CharacterProfile {
  id: 'boy' | 'girl';
  name: string;
  title: string;
  description: string;
  avatarColor: string;
  hairColor: string;
  shirtColor: string;
  capeColor: string;
}

export const CHARACTERS: CharacterProfile[] = [
  {
    id: 'boy',
    name: "Minh Anh",
    title: "Hiệp Sĩ Năng Động",
    description: "Nhanh nhẹn, dũng cảm và luôn sẵn lòng bảo vệ các bạn nhỏ xung quanh.",
    avatarColor: "#3b82f6",
    hairColor: "#1e293b",
    shirtColor: "#2563eb",
    capeColor: "#ef4444"
  },
  {
    id: 'girl',
    name: "Bảo An",
    title: "Hiệp Sĩ Thông Thái",
    description: "Nhạy bén, quyết đoán và luôn thấu hiểu sâu sắc các quy tắc an toàn.",
    avatarColor: "#ec4899",
    hairColor: "#451a03",
    shirtColor: "#db2777",
    capeColor: "#f59e0b"
  }
];

export interface CapeOption {
  id: string;
  name: string;
  color: string;
  glow: string;
}

export const CAPE_OPTIONS: CapeOption[] = [
  { id: 'red', name: 'Áo Choàng Dũng Khí', color: '#ef4444', glow: 'rgba(239, 68, 68, 0.4)' },
  { id: 'gold', name: 'Áo Choàng Ánh Sáng', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' },
  { id: 'blue', name: 'Áo Choàng Kiên Cường', color: '#0284c7', glow: 'rgba(2, 132, 199, 0.4)' },
  { id: 'emerald', name: 'Áo Choàng Trí Tuệ', color: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' }
];
