import React from 'react';

export type MonsterState = 'idle' | 'attack' | 'hurt';

interface MonsterVisualProps {
  worldId: number;
  size?: number;
  state?: MonsterState;
  className?: string;
  animate?: boolean;
}

/**
 * High-Fidelity Realistic & Stylized Monster Visual for Safe Adventure
 * Detailed, menacing, educational, and character-driven illustrations
 */
export const MonsterVisual: React.FC<MonsterVisualProps> = ({
  worldId,
  size = 140,
  state = 'idle',
  className = '',
  animate = true
}) => {
  const isHurt = state === 'hurt';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        className={`w-full h-full transition-transform duration-300 drop-shadow-xl ${
          animate && !isHurt ? 'animate-pulse' : ''
        } ${isHurt ? 'rotate-12 scale-90 filter hue-rotate-90' : ''}`}
      >
        <defs>
          {/* Universal Shadow & Glow Filters */}
          <filter id={`monster-glow-${worldId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Gradients */}
          <linearGradient id="grad-hand-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4c1d95" />
            <stop offset="60%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#2e1065" />
          </linearGradient>

          <linearGradient id="grad-golem-iron" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="50%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          <linearGradient id="grad-secret-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#312e81" />
            <stop offset="50%" stopColor="#581c87" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="grad-cyber-glitch" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" />
            <stop offset="50%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>

          <linearGradient id="grad-toxic-fiend" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#be123c" />
            <stop offset="60%" stopColor="#e11d48" />
            <stop offset="100%" stopColor="#4c0519" />
          </linearGradient>

          <linearGradient id="grad-stalker-wolf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="grad-supreme-overlord" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#581c87" />
            <stop offset="40%" stopColor="#d97706" />
            <stop offset="80%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#18181b" />
          </linearGradient>
        </defs>

        {/* 1. QUÁI VẬT BÀN TAY XẤU (THE BAD HAND PHANTOM) */}
        {worldId === 1 && (
          <g>
            {/* Dark Purple Aura Mist */}
            <circle cx="100" cy="115" r="70" fill="#7c3aed" opacity="0.25" filter={`url(#monster-glow-${worldId})`} />
            <path d="M 40 140 Q 30 180 80 180 Q 130 180 160 140 Q 140 100 40 140 Z" fill="#2e1065" opacity="0.6" />

            {/* Arm / Wrist Base */}
            <path d="M 75 185 C 80 145 70 120 70 120 L 130 120 C 130 120 120 145 125 185 Z" fill="url(#grad-hand-dark)" />
            {/* Spiked Wrist Cuff with Warning Symbol */}
            <rect x="68" y="150" width="64" height="14" rx="4" fill="#fbbf24" stroke="#78350f" strokeWidth="2" />
            <path d="M 75 157 L 125 157" stroke="#dc2626" strokeWidth="3" strokeDasharray="4 3" />

            {/* Palm of the Bad Hand */}
            <ellipse cx="100" cy="105" rx="38" ry="32" fill="url(#grad-hand-dark)" stroke="#c084fc" strokeWidth="3" />

            {/* 5 Menacing Claws / Fingers */}
            {/* Thumb */}
            <path d="M 68 115 C 48 112 36 95 40 85 C 43 78 52 82 60 92 C 64 97 68 105 70 110 Z" fill="url(#grad-hand-dark)" stroke="#c084fc" strokeWidth="2" />
            <polygon points="38,82 43,87 35,90" fill="#fbbf24" /> {/* Claw nail */}

            {/* Index Finger */}
            <path d="M 74 88 C 65 60 62 42 70 36 C 76 32 82 45 84 62 C 85 72 84 82 82 88 Z" fill="url(#grad-hand-dark)" stroke="#c084fc" strokeWidth="2" />
            <polygon points="69,32 75,38 67,42" fill="#fbbf24" />

            {/* Middle Finger */}
            <path d="M 92 82 C 90 48 94 28 100 24 C 106 28 108 48 106 82 Z" fill="url(#grad-hand-dark)" stroke="#c084fc" strokeWidth="2" />
            <polygon points="100,20 105,27 95,27" fill="#fbbf24" />

            {/* Ring Finger */}
            <path d="M 116 88 C 122 55 126 38 132 42 C 136 46 130 62 124 88 Z" fill="url(#grad-hand-dark)" stroke="#c084fc" strokeWidth="2" />
            <polygon points="134,38 136,46 128,45" fill="#fbbf24" />

            {/* Pinky Finger */}
            <path d="M 132 105 C 148 88 158 75 164 80 C 168 85 158 98 140 115 Z" fill="url(#grad-hand-dark)" stroke="#c084fc" strokeWidth="2" />
            <polygon points="166,77 167,86 159,85" fill="#fbbf24" />

            {/* Creepy Warning Eye in Center Palm */}
            <ellipse cx="100" cy="108" rx="16" ry="11" fill="#fef08a" stroke="#450a0a" strokeWidth="2" />
            <ellipse cx="100" cy="108" rx="6" ry="10" fill="#dc2626" />
            <line x1="100" y1="100" x2="100" y2="116" stroke="#000000" strokeWidth="2" />
            <circle cx="98" cy="105" r="2" fill="#ffffff" />

            {/* Dark Energy Sparks */}
            <path d="M 35 60 L 45 68 L 38 72 Z" fill="#fde047" />
            <path d="M 160 55 L 152 65 L 163 68 Z" fill="#fde047" />
          </g>
        )}

        {/* 2. QUÁI VẬT KẺ KIỂM SOÁT (BOUNDARY CRUSHER GOLEM) */}
        {worldId === 2 && (
          <g>
            {/* Iron Molten Body */}
            <path d="M 60 160 L 50 110 L 80 85 L 120 85 L 150 110 L 140 160 Z" fill="url(#grad-golem-iron)" stroke="#78350f" strokeWidth="3" />

            {/* Heavy Spiked Pauldrons */}
            <polygon points="40,110 20,95 45,85 65,95" fill="#9a3412" stroke="#451a03" strokeWidth="2" />
            <polygon points="160,110 180,95 155,85 135,95" fill="#9a3412" stroke="#451a03" strokeWidth="2" />
            <polygon points="25,92 10,78 30,86" fill="#f59e0b" />
            <polygon points="175,92 190,78 170,86" fill="#f59e0b" />

            {/* Heavy Iron Jaw & Head */}
            <rect x="75" y="48" width="50" height="42" rx="10" fill="#431407" stroke="#ea580c" strokeWidth="2" />
            <polygon points="85,48 70,25 90,40" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
            <polygon points="115,48 130,25 110,40" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />

            {/* Molten Orange Eyes Under Heavy Brow */}
            <rect x="70" y="48" width="60" height="10" rx="3" fill="#292524" />
            <ellipse cx="86" cy="65" rx="7" ry="5" fill="#fde047" />
            <ellipse cx="114" cy="65" rx="7" ry="5" fill="#fde047" />
            <circle cx="86" cy="65" r="3" fill="#ea580c" />
            <circle cx="114" cy="65" r="3" fill="#ea580c" />

            {/* Heavy Octagonal STOP CHESTPLATE (Ranh Giới Bị Ép) */}
            <polygon points="85,100 115,100 128,113 128,135 115,148 85,148 72,135 72,113" fill="#dc2626" stroke="#ffffff" strokeWidth="3" />
            <text x="100" y="130" fill="#ffffff" fontSize="16" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">STOP</text>

            {/* Heavy Clenched Stone Fists with Broken Chains */}
            <circle cx="45" cy="145" r="16" fill="#78350f" stroke="#451a03" strokeWidth="2" />
            <circle cx="155" cy="145" r="16" fill="#78350f" stroke="#451a03" strokeWidth="2" />
            <path d="M 40 155 Q 35 175 48 185" stroke="#94a3b8" strokeWidth="4" fill="none" strokeDasharray="6 3" />
            <path d="M 160 155 Q 165 175 152 185" stroke="#94a3b8" strokeWidth="4" fill="none" strokeDasharray="6 3" />
          </g>
        )}

        {/* 3. QUÁI VẬT BÍ MẬT ĐEN & CÁI BẪY (DARK SECRET & SWEET TRAP BEAST) */}
        {worldId === 3 && (
          <g>
            {/* Smoky Shadow Cloak */}
            <path d="M 50 170 C 40 120 60 70 100 70 C 140 70 160 120 150 170 C 125 185 75 185 50 170 Z" fill="url(#grad-secret-dark)" stroke="#8b5cf6" strokeWidth="2" />

            {/* Big Heavy Iron Padlock Body Plate */}
            <rect x="75" y="105" width="50" height="42" rx="8" fill="#4c1d95" stroke="#fbbf24" strokeWidth="3" />
            <path d="M 85 105 V 88 C 85 78 115 78 115 88 V 105" fill="none" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" />
            {/* Glowing Golden Keyhole Eye */}
            <circle cx="100" cy="120" r="5" fill="#fde047" />
            <polygon points="98,122 102,122 104,133 96,133" fill="#fde047" />

            {/* Sinister Hood & Glowing Cat Eyes */}
            <path d="M 70 65 C 75 35 125 35 130 65 C 115 75 85 75 70 65 Z" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2" />
            <ellipse cx="88" cy="55" rx="8" ry="4" fill="#fbbf24" transform="rotate(-10 88 55)" />
            <ellipse cx="112" cy="55" rx="8" ry="4" fill="#fbbf24" transform="rotate(10 112 55)" />
            <circle cx="89" cy="55" r="2" fill="#78350f" />
            <circle cx="111" cy="55" r="2" fill="#78350f" />

            {/* Anglerfish-Style Tempting Candy Lure Stalk */}
            <path d="M 100 35 C 95 10 140 5 145 25" fill="none" stroke="#a855f7" strokeWidth="3" strokeLinecap="round" />
            {/* Sparkling Sweet Lollipop Lure */}
            <circle cx="145" cy="27" r="14" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" />
            <circle cx="145" cy="27" r="9" fill="#fde047" />
            <circle cx="145" cy="27" r="4" fill="#3b82f6" />
            <circle cx="145" cy="27" r="20" fill="none" stroke="#fbbf24" strokeWidth="1" strokeDasharray="3 3" opacity="0.8" />
            <text x="145" y="22" fontSize="9" textAnchor="middle">✨</text>

            {/* Bramble Vine Trap Tentacles at Base */}
            <path d="M 45 155 Q 25 140 30 120" stroke="#7e22ce" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M 155 155 Q 175 140 170 120" stroke="#7e22ce" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        )}

        {/* 4. QUÁI VẬT MẶT NẠ ẢO & INTERNET (CYBER PHANTOM MASK) */}
        {worldId === 4 && (
          <g>
            {/* Cyber Glitch Grid Aura */}
            <circle cx="100" cy="100" r="72" fill="#0891b2" opacity="0.2" />
            <path d="M 30 90 H 170" stroke="#22d3ee" strokeWidth="1" opacity="0.4" strokeDasharray="5 5" />
            <path d="M 30 110 H 170" stroke="#22d3ee" strokeWidth="1" opacity="0.4" strokeDasharray="5 5" />

            {/* Cyber Body Mantle */}
            <path d="M 60 175 C 55 125 70 100 100 100 C 130 100 145 125 140 175 Z" fill="url(#grad-cyber-glitch)" stroke="#06b6d4" strokeWidth="2" />

            {/* Split Theater / Cyber Mask Face */}
            {/* Friendly Left Half (Deceptive Smile) */}
            <path d="M 100 40 C 70 40 60 70 65 105 C 70 125 90 135 100 138 Z" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
            <path d="M 75 75 Q 85 70 93 76" stroke="#475569" strokeWidth="3" fill="none" strokeLinecap="round" />
            <ellipse cx="84" cy="85" rx="5" ry="6" fill="#334155" />
            <circle cx="82" cy="83" r="2" fill="#ffffff" />
            <path d="M 78 115 Q 88 126 98 118" stroke="#e11d48" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="74" cy="98" r="4" fill="#fca5a5" opacity="0.6" /> {/* Fake blush */}

            {/* Malicious Right Half (Cyber Glitch / Robot Red Eye) */}
            <path d="M 100 40 C 130 40 140 70 135 105 C 130 125 110 135 100 138 Z" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" />
            {/* Circuit traces */}
            <path d="M 105 55 H 125 V 70 H 132" stroke="#22d3ee" strokeWidth="2" fill="none" />
            <path d="M 105 120 H 122 V 105" stroke="#22d3ee" strokeWidth="2" fill="none" />
            {/* Sinister Red Camera / Spy Lens */}
            <circle cx="116" cy="85" r="9" fill="#7f1d1d" stroke="#ef4444" strokeWidth="2" />
            <circle cx="116" cy="85" r="5" fill="#f87171" />
            <circle cx="116" cy="85" r="2" fill="#ffffff" />
            <line x1="100" y1="40" x2="100" y2="138" stroke="#e11d48" strokeWidth="2.5" strokeDasharray="4 2" />

            {/* Glitching Smartphone in Hand */}
            <rect x="135" y="115" width="30" height="50" rx="5" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" transform="rotate(-15 135 115)" />
            <rect x="139" y="120" width="22" height="38" rx="2" fill="#0284c7" transform="rotate(-15 135 115)" />
            <text x="148" y="145" fontSize="14" textAnchor="middle" fill="#ffffff" transform="rotate(-15 135 115)">⚠️</text>
          </g>
        )}

        {/* 5. QUÁI VẬT LỜI NÓI ĐỘC (TOXIC WORD & BULLY DEMON) */}
        {worldId === 5 && (
          <g>
            {/* Spiky Crimson Storm Aura */}
            <circle cx="100" cy="100" r="70" fill="#e11d48" opacity="0.25" filter={`url(#monster-glow-${worldId})`} />

            {/* Main Spiky Body */}
            <path d="M 50 160 L 40 120 L 25 100 L 45 85 L 55 60 L 75 65 L 100 45 L 125 65 L 145 60 L 155 85 L 175 100 L 160 120 L 150 160 Z" fill="url(#grad-toxic-fiend)" stroke="#881337" strokeWidth="3" />

            {/* Megaphone Horn Spikes */}
            <polygon points="55,60 25,35 60,45" fill="#9f1239" stroke="#fda4af" strokeWidth="1.5" />
            <polygon points="145,60 175,35 140,45" fill="#9f1239" stroke="#fda4af" strokeWidth="1.5" />

            {/* Angry Slanted Eyebrows & Flaming Eyes */}
            <polygon points="65,75 95,85 65,82" fill="#4c0519" />
            <polygon points="135,75 105,85 135,82" fill="#4c0519" />
            <ellipse cx="80" cy="90" rx="9" ry="6" fill="#fde047" transform="rotate(15 80 90)" />
            <ellipse cx="120" cy="90" rx="9" ry="6" fill="#fde047" transform="rotate(-15 120 90)" />
            <circle cx="82" cy="90" r="3" fill="#450a0a" />
            <circle cx="118" cy="90" r="3" fill="#450a0a" />

            {/* Gaping Jagged Toxic Maw with Fangs */}
            <path d="M 68 120 Q 100 110 132 120 Q 100 155 68 120 Z" fill="#0f172a" stroke="#fda4af" strokeWidth="2" />
            {/* Top Teeth */}
            <polygon points="75,118 80,128 85,118" fill="#ffffff" />
            <polygon points="90,117 95,129 100,117" fill="#ffffff" />
            <polygon points="105,117 110,129 115,117" fill="#ffffff" />
            <polygon points="120,118 125,128 130,118" fill="#ffffff" />
            {/* Bottom Fangs */}
            <polygon points="82,138 88,126 94,138" fill="#ffffff" />
            <polygon points="108,138 114,126 120,138" fill="#ffffff" />

            {/* Dripping Toxic Slime Droplets */}
            <path d="M 98 140 Q 100 158 97 165 Q 103 158 102 140" fill="#22c55e" />
            <circle cx="97" cy="172" r="3" fill="#22c55e" />

            {/* Spiky Speech Bubble Shards */}
            <path d="M 145 95 L 180 85 L 165 110 Z" fill="#fbbf24" stroke="#78350f" strokeWidth="1.5" />
            <text x="166" y="102" fontSize="9" fontWeight="900" fill="#451a03">#$!</text>
          </g>
        )}

        {/* 6. QUÁI VẬT BÓNG ĐÊM MÊ CUNG (STALKING PHANTOM WOLF) */}
        {worldId === 6 && (
          <g>
            {/* Shadow Smoke Mist */}
            <ellipse cx="100" cy="165" rx="65" ry="20" fill="#020617" opacity="0.6" filter={`url(#monster-glow-${worldId})`} />

            {/* Sleek Beast Body */}
            <path d="M 60 170 C 45 135 65 90 95 85 L 105 85 C 135 90 155 135 140 170 Z" fill="url(#grad-stalker-wolf)" stroke="#475569" strokeWidth="2" />

            {/* Sharp Wolf / Stalker Ears */}
            <polygon points="65,85 50,45 80,70" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
            <polygon points="135,85 150,45 120,70" fill="#0f172a" stroke="#64748b" strokeWidth="2" />
            <polygon points="63,78 55,55 75,70" fill="#dc2626" opacity="0.6" />
            <polygon points="137,78 145,55 125,70" fill="#dc2626" opacity="0.6" />

            {/* Sleek Menacing Predator Head */}
            <polygon points="75,80 100,60 125,80 115,120 85,120" fill="#1e293b" stroke="#334155" strokeWidth="2" />

            {/* Piercing Glowing Amber Predator Eyes */}
            <polygon points="80,88 95,94 85,98" fill="#f59e0b" />
            <polygon points="120,88 105,94 115,98" fill="#f59e0b" />
            <line x1="88" y1="90" x2="88" y2="97" stroke="#451a03" strokeWidth="2" />
            <line x1="112" y1="90" x2="112" y2="97" stroke="#451a03" strokeWidth="2" />

            {/* Snarl & Sharp Fangs */}
            <polygon points="100,105 95,100 105,100" fill="#020617" />
            <path d="M 90 115 Q 100 122 110 115" stroke="#94a3b8" strokeWidth="2" fill="none" />
            <polygon points="92,115 94,122 96,115" fill="#ffffff" />
            <polygon points="104,115 106,122 108,115" fill="#ffffff" />

            {/* Ghostly Smoke Claws & Trail */}
            <path d="M 45 160 C 25 145 35 180 55 175" stroke="#38bdf8" strokeWidth="3" fill="none" opacity="0.7" />
            <path d="M 155 160 C 175 145 165 180 145 175" stroke="#38bdf8" strokeWidth="3" fill="none" opacity="0.7" />
          </g>
        )}

        {/* 7. BÓNG ĐÊM NGUY HIỂM TỐI CAO (SUPREME SHADOW OVERLORD) */}
        {worldId === 7 && (
          <g>
            {/* Grand Wing Spans */}
            <path d="M 100 100 C 50 60 10 30 5 80 C 2 110 35 125 55 120 C 70 115 85 105 100 100 Z" fill="#3b0764" stroke="#a855f7" strokeWidth="2" />
            <path d="M 100 100 C 150 60 190 30 195 80 C 198 110 165 125 145 120 C 130 115 115 105 100 100 Z" fill="#3b0764" stroke="#a855f7" strokeWidth="2" />

            {/* Overlord Armored Body */}
            <path d="M 65 175 L 60 115 L 80 85 L 120 85 L 140 115 L 135 175 Z" fill="url(#grad-supreme-overlord)" stroke="#f59e0b" strokeWidth="3" />

            {/* Dark Spiky Obsidian Crown */}
            <polygon points="70,65 60,30 80,45 100,18 120,45 140,30 130,65" fill="#18181b" stroke="#f59e0b" strokeWidth="2.5" />
            {/* Glowing Eye of Chaos in Crown */}
            <circle cx="100" cy="38" r="6" fill="#dc2626" stroke="#fef08a" strokeWidth="1.5" />
            <circle cx="100" cy="38" r="2" fill="#ffffff" />

            {/* Sinister Shadow Visor & Twin Piercing Crimson Eyes */}
            <polygon points="78,72 122,72 115,92 85,92" fill="#09090b" stroke="#7c3aed" strokeWidth="2" />
            <polygon points="85,80 97,83 88,88" fill="#ef4444" />
            <polygon points="115,80 103,83 112,88" fill="#ef4444" />

            {/* Royal Obsidian Chest Sigil */}
            <polygon points="100,105 118,122 100,140 82,122" fill="#4c0519" stroke="#f59e0b" strokeWidth="2" />
            <text x="100" y="127" fill="#fbbf24" fontSize="14" fontWeight="bold" textAnchor="middle">★</text>

            {/* Swirling Violet Dark Flame Tendrils */}
            <path d="M 40 170 Q 25 145 45 130" stroke="#c084fc" strokeWidth="3" fill="none" opacity="0.8" />
            <path d="M 160 170 Q 175 145 155 130" stroke="#c084fc" strokeWidth="3" fill="none" opacity="0.8" />
          </g>
        )}
      </svg>
    </div>
  );
};
