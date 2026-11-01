import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GameWorld } from '../data/levels';
import { CharacterProfile, CapeOption } from '../data/characters';
import { sounds } from '../utils/audio';

export type HazardType = 'cactus' | 'crab';

interface PhysicalHazard {
  id: number;
  type: HazardType;
  x: number; // world x
  passed: boolean;
}

interface GameCanvasProps {
  world: GameWorld;
  character: CharacterProfile;
  cape: CapeOption;
  onEncounterQuestion: () => void;
  onObstacleHit: (type: HazardType) => void;
  isQuestionActive: boolean;
  score: number;
  streak: number;
  progressPercent: number;
  triggerBlast: boolean;
  onCollectStar?: () => void;
  currentMonsterNum: number;
  totalMonsters: number;
  hearts: number;
  invincibleMode?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  life: number;
}

interface CollectibleStar {
  x: number;
  y: number;
  size: number;
  collected: boolean;
  angle: number;
}

interface CuteFlower {
  x: number;
  color: string;
  size: number;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  world,
  character,
  cape,
  onEncounterQuestion,
  onObstacleHit,
  isQuestionActive,
  score,
  streak,
  progressPercent,
  triggerBlast,
  onCollectStar,
  currentMonsterNum,
  totalMonsters,
  hearts,
  invincibleMode = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Gameplay state refs for 60fps render loop
  const animFrameId = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const distanceRef = useRef<number>(0);
  const nextCheckpointDist = useRef<number>(850); // Far, relaxed spacing between monsters

  // Player physics: Floaty, gentle, child-friendly
  const playerYRef = useRef<number>(0);
  const playerVyRef = useRef<number>(0);
  const isGroundedRef = useRef<boolean>(true);
  const runCycleRef = useRef<number>(0);

  // Invulnerability timer after taking a hit
  const invincibleTimerRef = useRef<number>(0);

  // Mascot companion physics
  const mascotHoverRef = useRef<number>(0);

  // Monster state
  const monsterXRef = useRef<number>(70);
  const monsterRecoilRef = useRef<number>(0);

  // Hazards: Cacti & Crabs (well-spaced, maximum 1 per segment)
  const hazardsRef = useRef<PhysicalHazard[]>([]);

  // Particles & collectibles
  const particlesRef = useRef<Particle[]>([]);
  const starsRef = useRef<CollectibleStar[]>([]);
  const flowersRef = useRef<CuteFlower[]>([]);
  const beamEffectRef = useRef<{ active: boolean; progress: number }>({ active: false, progress: 0 });

  // Initialize hazards: Only 1 single obstacle per checkpoint interval placed far away!
  const populateHazardsForCheckpoint = useCallback((baseDist: number) => {
    // Only place 1 single obstacle at comfortable midway point: baseDist + 420
    // Sometimes 30% chance no obstacle at all, purely open star path!
    if (Math.random() > 0.25) {
      const hType: HazardType = Math.random() > 0.5 ? 'cactus' : 'crab';
      hazardsRef.current.push({
        id: Math.random(),
        type: hType,
        x: baseDist + 420,
        passed: false
      });
    }
  }, []);

  // Reset or initialize level run
  useEffect(() => {
    distanceRef.current = 0;
    nextCheckpointDist.current = 850;
    hazardsRef.current = [];
    invincibleTimerRef.current = 0;
    populateHazardsForCheckpoint(0);

    starsRef.current = [];
    for (let i = 0; i < 8; i++) {
      starsRef.current.push({
        x: 450 + i * 220,
        y: 60 + Math.sin(i * 1.5) * 35,
        size: 16,
        collected: false,
        angle: Math.random() * Math.PI
      });
    }

    flowersRef.current = [];
    const flowerColors = ['#f43f5e', '#ec4899', '#f59e0b', '#3b82f6', '#a855f7'];
    for (let i = 0; i < 25; i++) {
      flowersRef.current.push({
        x: i * 70,
        color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
        size: Math.random() * 4 + 7
      });
    }
  }, [world.id, populateHazardsForCheckpoint]);

  // Blast trigger effect when question is answered correctly
  useEffect(() => {
    if (triggerBlast) {
      beamEffectRef.current = { active: true, progress: 0 };
      monsterRecoilRef.current = 170;
      sounds.playShield();

      const canvas = canvasRef.current;
      if (canvas) {
        const groundY = canvas.height - 90;
        const playerX = 260;
        const candyColors = ['#f43f5e', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4'];
        for (let i = 0; i < 50; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 10 + 4;
          particlesRef.current.push({
            x: playerX,
            y: groundY - 45,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 7 + 4,
            color: candyColors[Math.floor(Math.random() * candyColors.length)],
            alpha: 1,
            life: 1.2
          });
        }
      }
    }
  }, [triggerBlast]);

  // Jump handler: Super floaty and high, so kids clear with huge margin!
  const handleJump = useCallback(() => {
    if (isGroundedRef.current && !isQuestionActive) {
      playerVyRef.current = -14.6; // High gentle float
      isGroundedRef.current = false;
      sounds.playJump();

      const canvas = canvasRef.current;
      if (canvas) {
        const groundY = canvas.height - 90;
        for (let i = 0; i < 10; i++) {
          particlesRef.current.push({
            x: 260 + (Math.random() - 0.5) * 24,
            y: groundY - 5,
            vx: -Math.random() * 4 - 2,
            vy: -Math.random() * 3,
            size: Math.random() * 5 + 3,
            color: ['#fde047', '#67e8f9', '#f472b6'][Math.floor(Math.random() * 3)],
            alpha: 0.9,
            life: 0.7
          });
        }
      }
    }
  }, [isQuestionActive]);

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        handleJump();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleJump]);

  // 60FPS Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        const width = parent.clientWidth;
        const height = parent.clientHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    lastTimeRef.current = performance.now();

    const loop = (now: number) => {
      const rawDt = (now - lastTimeRef.current) / 1000;
      lastTimeRef.current = now;
      const dt = Math.min(rawDt, 0.05);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;
      const groundY = height - 90;

      // Update positions if active
      if (!isQuestionActive) {
        // Gentle, relaxed running speed (175 instead of 260) so kids have plenty of time!
        const runSpeed = 175 * dt;
        distanceRef.current += runSpeed;
        runCycleRef.current += dt * 10;
        mascotHoverRef.current += dt * 3.5;

        // Floaty jump gravity (22 instead of 34)
        playerYRef.current += playerVyRef.current;
        playerVyRef.current += 22 * dt;

        if (playerYRef.current >= 0) {
          playerYRef.current = 0;
          playerVyRef.current = 0;
          isGroundedRef.current = true;
        }

        if (invincibleTimerRef.current > 0) {
          invincibleTimerRef.current -= dt;
        }

        // Monster creeping closer
        if (monsterRecoilRef.current > 0) {
          monsterRecoilRef.current = Math.max(0, monsterRecoilRef.current - 190 * dt);
        }
        monsterXRef.current = Math.max(50, 95 - monsterRecoilRef.current);

        // Checkpoint encounter trigger (10 monsters)
        if (distanceRef.current >= nextCheckpointDist.current) {
          distanceRef.current = nextCheckpointDist.current;
          nextCheckpointDist.current += 850;
          populateHazardsForCheckpoint(distanceRef.current);
          onEncounterQuestion();
        }

        // --- FORGIVING HAZARD COLLISION CHECKING ---
        const playerScreenX = 260;
        if (!invincibleMode && invincibleTimerRef.current <= 0) {
          for (let i = 0; i < hazardsRef.current.length; i++) {
            const hz = hazardsRef.current[i];
            const hzScreenX = playerScreenX + (hz.x - distanceRef.current);

            // Very small, tight horizontal hitbox (only 24px)
            if (Math.abs(hzScreenX - playerScreenX) < 14) {
              const playerHeightOffGround = -playerYRef.current;

              // If player has jumped even 10px off the ground, they safely clear it!
              if (playerHeightOffGround < 10) {
                sounds.playBump();
                invincibleTimerRef.current = 2.0; // 2 seconds safety grace
                onObstacleHit(hz.type);
                break;
              }
            }
          }
        }

        // Collectibles movement
        starsRef.current.forEach(star => {
          star.x -= runSpeed;
          star.angle += dt * 3.5;

          if (star.x < -40) {
            star.x = width + Math.random() * 200;
            star.y = 50 + Math.random() * 60;
            star.collected = false;
          }

          const starActualY = groundY - 70 - star.y;
          const playerActualY = groundY - 45 + playerYRef.current;

          if (!star.collected && Math.abs(star.x - playerScreenX) < 40 && Math.abs(starActualY - playerActualY) < 55) {
            star.collected = true;
            sounds.playCoin();
            if (onCollectStar) onCollectStar();

            for (let i = 0; i < 14; i++) {
              particlesRef.current.push({
                x: star.x,
                y: starActualY,
                vx: (Math.random() - 0.5) * 7,
                vy: (Math.random() - 0.5) * 7,
                size: Math.random() * 5 + 3,
                color: ['#fbbf24', '#f472b6', '#38bdf8'][Math.floor(Math.random() * 3)],
                alpha: 1,
                life: 0.6
              });
            }
          }
        });
      }

      // Beam animation
      if (beamEffectRef.current.active) {
        beamEffectRef.current.progress += dt * 3.5;
        if (beamEffectRef.current.progress >= 1) {
          beamEffectRef.current.active = false;
        }
      }

      // Clear
      ctx.clearRect(0, 0, width, height);

      // --- 1. RENDER PARALLAX SKY & ENVIRONMENT ---
      renderCuteSkyAndEnvironment(ctx, width, height, groundY, world.environment, distanceRef.current, now);

      // --- 2. RENDER GROUND WITH WILD FLOWERS ---
      renderCuteGround(ctx, width, height, groundY, world.environment, distanceRef.current, flowersRef.current);

      // --- 3. RENDER PHYSICAL OBSTACLES (CACTI & CRABS) WITH CUTE JUMP HINT ---
      const playerScreenX = 260;
      hazardsRef.current.forEach(hz => {
        const hzScreenX = playerScreenX + (hz.x - distanceRef.current);
        if (hzScreenX > -80 && hzScreenX < width + 80) {
          if (hz.type === 'cactus') {
            drawCuteCactus(ctx, hzScreenX, groundY);
          } else {
            drawCuteCrab(ctx, hzScreenX, groundY, now);
          }

          // Cute "NHẢY! 🦘" alert indicator hovering over obstacle when within 250px!
          if (hzScreenX > playerScreenX && hzScreenX - playerScreenX < 240) {
            drawJumpAlert(ctx, hzScreenX, groundY - (hz.type === 'cactus' ? 65 : 45), now);
          }
        }
      });

      // --- 4. RENDER COLLECTIBLE STARS ---
      starsRef.current.forEach(star => {
        if (!star.collected) {
          const starY = groundY - 70 - star.y;
          drawCuteStar(ctx, star.x, starY, star.size, star.angle);
        }
      });

      // --- 5. RENDER MONSTER GUARDIAN STATION (Yêu Quái Đứng Chặn Đường) ---
      const checkpointOffset = nextCheckpointDist.current - distanceRef.current;
      const barrierX = playerScreenX + checkpointOffset;
      if (barrierX > -120 && barrierX < width + 120) {
        drawCuteMonsterStation(
          ctx,
          barrierX,
          groundY,
          world,
          now,
          isQuestionActive,
          currentMonsterNum,
          totalMonsters
        );
      }

      // --- 6. RENDER SUPER SHIELD RAINBOW BEAM BLAST ---
      if (beamEffectRef.current.active) {
        const p = beamEffectRef.current.progress;
        const mX = monsterXRef.current + 30;
        const py = groundY - 45 + playerYRef.current;

        ctx.save();
        const beamGrad = ctx.createLinearGradient(playerScreenX, py, mX, py);
        beamGrad.addColorStop(0, '#38bdf8');
        beamGrad.addColorStop(0.25, '#34d399');
        beamGrad.addColorStop(0.5, '#fde047');
        beamGrad.addColorStop(0.75, '#fb923c');
        beamGrad.addColorStop(1, '#f43f5e');

        ctx.strokeStyle = beamGrad;
        ctx.lineWidth = Math.sin(p * Math.PI) * 44;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(playerScreenX, py);
        ctx.lineTo(mX, py);
        ctx.stroke();

        for (let r = 0; r < 5; r++) {
          const rx = playerScreenX - (playerScreenX - mX) * ((p + r * 0.2) % 1);
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(rx, py, Math.sin(p * Math.PI) * 22, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      // --- 7. RENDER CHASING CARTOON MONSTER AT REAR ---
      drawCuteMonster(
        ctx,
        monsterXRef.current,
        groundY,
        world,
        now,
        monsterRecoilRef.current > 0
      );

      // --- 8. RENDER PLAYER HERO ---
      const playerY = groundY - 45 + playerYRef.current;
      const isInvulnerable = invincibleTimerRef.current > 0;
      drawCuteHero(
        ctx,
        playerScreenX,
        playerY,
        character,
        cape,
        runCycleRef.current,
        isGroundedRef.current,
        isQuestionActive,
        isInvulnerable
      );

      // --- 9. RENDER MASCOT COMPANION ---
      drawCuteMascotCompanion(
        ctx,
        playerScreenX - 42,
        playerY - 55 + Math.sin(mascotHoverRef.current) * 8
      );

      // --- 10. RENDER PARTICLES ---
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const pt = particlesRef.current[i];
        pt.x += pt.vx;
        pt.y += pt.vy;
        pt.life -= dt * 1.5;
        pt.alpha = Math.max(0, pt.life);

        if (pt.life <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = pt.alpha;
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [world, character, cape, isQuestionActive, onEncounterQuestion, onObstacleHit, onCollectStar, currentMonsterNum, totalMonsters, populateHazardsForCheckpoint, invincibleMode]);

  return (
    <div className="relative w-full h-full overflow-hidden select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-pointer"
        onClick={handleJump}
      />

      {/* Touch Jump Button */}
      <div className="absolute bottom-5 right-6 flex items-center gap-3 pointer-events-auto">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleJump();
          }}
          className="flex items-center gap-2.5 px-6 py-4 rounded-3xl btn-candy-amber text-slate-950 font-black text-lg shadow-2xl font-game cursor-pointer"
        >
          <span className="text-2xl animate-bounce">🦘</span>
          <span>NHẢY LÊN! (Phím Space)</span>
        </button>
      </div>

      {/* Floating Gentle Helper Hint */}
      <div className="absolute top-16 left-6 flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/95 border-2 border-amber-300 shadow-lg text-xs md:text-sm font-bold font-game text-slate-800">
        <span className="text-lg">🦉</span>
        <span>
          Đường chạy rất rộng rãi! Khi thấy biển <strong>"NHẢY! 🦘"</strong>, bé chỉ cần nhấn Space hoặc chạm nút Nhảy nhé!
        </span>
      </div>
    </div>
  );
};

// --- CUTE CANVAS RENDERERS ---

function drawJumpAlert(ctx: CanvasRenderingContext2D, x: number, y: number, timeMs: number) {
  ctx.save();
  const bounce = Math.sin(timeMs * 0.008) * 4;
  ctx.translate(x, y + bounce);

  // Little glowing candy pill
  ctx.fillStyle = '#fde047';
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(-30, -12, 60, 24, 12);
  ctx.fill();
  ctx.stroke();

  // Text
  ctx.fillStyle = '#78350f';
  ctx.font = 'bold 11px "Baloo 2", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('NHẢY! 🦘', 0, 1);

  ctx.restore();
}

function drawCuteCactus(ctx: CanvasRenderingContext2D, x: number, groundY: number) {
  ctx.save();
  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.beginPath();
  ctx.ellipse(x, groundY + 2, 16, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cactus body (smaller, super easy to clear)
  ctx.fillStyle = '#22c55e';
  ctx.beginPath();
  ctx.roundRect(x - 8, groundY - 36, 16, 36, 8);
  ctx.fill();

  // Left arm
  ctx.beginPath();
  ctx.roundRect(x - 18, groundY - 26, 11, 7, 3);
  ctx.roundRect(x - 18, groundY - 31, 7, 11, 3);
  ctx.fill();

  // Right arm
  ctx.beginPath();
  ctx.roundRect(x + 7, groundY - 22, 11, 7, 3);
  ctx.roundRect(x + 11, groundY - 27, 7, 11, 3);
  ctx.fill();

  // Pink cute flower on top
  ctx.fillStyle = '#f43f5e';
  ctx.beginPath();
  ctx.arc(x, groundY - 38, 4.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawCuteCrab(ctx: CanvasRenderingContext2D, x: number, groundY: number, timeMs: number) {
  ctx.save();
  // Shadow
  ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
  ctx.beginPath();
  ctx.ellipse(x, groundY + 2, 18, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  const waddle = Math.sin(timeMs * 0.012) * 2;
  const cy = groundY - 12 + waddle;

  // Crab red body
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.ellipse(x, cy, 15, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  // Scuttling legs
  ctx.strokeStyle = '#dc2626';
  ctx.lineWidth = 2;
  for (let l = -1; l <= 1; l++) {
    ctx.beginPath();
    ctx.moveTo(x - 10, cy + l * 3);
    ctx.lineTo(x - 18, cy + 6 + l * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x + 10, cy + l * 3);
    ctx.lineTo(x + 18, cy + 6 + l * 2);
    ctx.stroke();
  }

  // Claws
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(x - 14, cy - 8, 5, 0, Math.PI * 2);
  ctx.arc(x + 14, cy - 8, 5, 0, Math.PI * 2);
  ctx.fill();

  // Cartoon eyes
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(x - 4, cy - 14, 4, 0, Math.PI * 2);
  ctx.arc(x + 4, cy - 14, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(x - 4, cy - 14, 2, 0, Math.PI * 2);
  ctx.arc(x + 4, cy - 14, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function drawRealisticMonsterCanvas(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  worldId: number,
  timeMs: number,
  scale: number = 1.0,
  isRecoiling: boolean = false
) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);

  const breath = Math.sin(timeMs * 0.005) * 4;

  if (isRecoiling) {
    ctx.rotate(0.35);
    ctx.fillStyle = '#fde047';
    ctx.font = 'bold 16px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('💫', -20, -50 + Math.sin(timeMs * 0.02) * 5);
    ctx.fillText('✨', 20, -55 + Math.cos(timeMs * 0.02) * 5);
  }

  // Base shadow pool
  ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
  ctx.beginPath();
  ctx.ellipse(0, 52, 38, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  switch (worldId) {
    case 1: {
      // 1. QUÁI VẬT BÀN TAY XẤU (Bad Hand with claws and palm eye)
      ctx.fillStyle = 'rgba(124, 58, 237, 0.25)';
      ctx.beginPath();
      ctx.arc(0, 0, 48, 0, Math.PI * 2);
      ctx.fill();

      // Wrist base
      ctx.fillStyle = '#4c1d95';
      ctx.beginPath();
      ctx.moveTo(-16, 45);
      ctx.lineTo(16, 45);
      ctx.lineTo(20, 20);
      ctx.lineTo(-20, 20);
      ctx.closePath();
      ctx.fill();

      // Warning wristband
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(-18, 30, 36, 8);
      ctx.fillStyle = '#dc2626';
      ctx.fillRect(-14, 32, 28, 4);

      // Palm
      ctx.fillStyle = '#581c87';
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.ellipse(0, 5 + breath, 28, 24, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // 5 Claws / Fingers
      const fingerFills = '#6b21a8';
      ctx.fillStyle = fingerFills;
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2;

      // Thumb
      ctx.beginPath();
      ctx.moveTo(-22, 10 + breath);
      ctx.quadraticCurveTo(-38, 0, -34, -12);
      ctx.lineTo(-24, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Claw nail
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(-34, -12, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Fingers
      const fingerOffsets = [
        { x: -16, topX: -20, topY: -38 },
        { x: -5, topX: -5, topY: -45 },
        { x: 8, topX: 10, topY: -42 },
        { x: 20, topX: 25, topY: -30 }
      ];

      fingerOffsets.forEach(f => {
        ctx.fillStyle = fingerFills;
        ctx.beginPath();
        ctx.moveTo(f.x - 4, -5 + breath);
        ctx.lineTo(f.topX, f.topY + breath);
        ctx.lineTo(f.x + 5, -5 + breath);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#fbbf24';
        ctx.beginPath();
        ctx.moveTo(f.topX - 3, f.topY + breath);
        ctx.lineTo(f.topX, f.topY - 6 + breath);
        ctx.lineTo(f.topX + 3, f.topY + breath);
        ctx.closePath();
        ctx.fill();
      });

      // Palm Eye (Evil watchful red-yellow eye)
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.ellipse(0, 6 + breath, 12, 8, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#450a0a';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.ellipse(0, 6 + breath, 4.5, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-1.5, 4 + breath, 1.5, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 2: {
      // 2. QUÁI VẬT KẺ KIỂM SOÁT (Iron/Stone Golem with STOP plate)
      ctx.fillStyle = '#78350f';
      ctx.strokeStyle = '#ea580c';
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.roundRect(-36, -20 + breath, 72, 45, 8);
      ctx.fill();
      ctx.stroke();

      // Spiked Pauldrons
      ctx.fillStyle = '#9a3412';
      ctx.beginPath();
      ctx.moveTo(-36, -10 + breath);
      ctx.lineTo(-50, -22 + breath);
      ctx.lineTo(-30, -25 + breath);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(36, -10 + breath);
      ctx.lineTo(50, -22 + breath);
      ctx.lineTo(30, -25 + breath);
      ctx.closePath();
      ctx.fill();

      // Head / Horns
      ctx.fillStyle = '#451a03';
      ctx.fillRect(-18, -44 + breath, 36, 26);
      ctx.strokeStyle = '#f97316';
      ctx.strokeRect(-18, -44 + breath, 36, 26);

      // Molten Eyes
      ctx.fillStyle = '#fde047';
      ctx.fillRect(-12, -34 + breath, 8, 5);
      ctx.fillRect(4, -34 + breath, 8, 5);

      // STOP Chestplate
      ctx.fillStyle = '#dc2626';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      const stR = 16;
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4 + Math.PI / 8;
        const px = Math.cos(a) * stR;
        const py = 5 + breath + Math.sin(a) * stR;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('STOP', 0, 5 + breath);

      // Clenched Fists with Chains
      ctx.fillStyle = '#78350f';
      ctx.beginPath();
      ctx.arc(-36, 15 + breath, 10, 0, Math.PI * 2);
      ctx.arc(36, 15 + breath, 10, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 3: {
      // 3. QUÁI VẬT BÍ MẬT ĐEN & CÁI BẪY (Padlock body with Angler Candy Lure)
      ctx.fillStyle = '#312e81';
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-28, 42);
      ctx.quadraticCurveTo(-32, 0 + breath, 0, -25 + breath);
      ctx.quadraticCurveTo(32, 0 + breath, 28, 42);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Padlock Body
      ctx.fillStyle = '#4c1d95';
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(-18, 0 + breath, 36, 30, 6);
      ctx.fill();
      ctx.stroke();

      // Padlock Shackle
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0 + breath, 12, Math.PI, 0);
      ctx.stroke();

      // Golden Keyhole Eye
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(0, 10 + breath, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(-2, 10 + breath);
      ctx.lineTo(2, 10 + breath);
      ctx.lineTo(3.5, 20 + breath);
      ctx.lineTo(-3.5, 20 + breath);
      ctx.closePath();
      ctx.fill();

      // Eyes in hood
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.ellipse(-10, -12 + breath, 5, 2.5, -0.2, 0, Math.PI * 2);
      ctx.ellipse(10, -12 + breath, 5, 2.5, 0.2, 0, Math.PI * 2);
      ctx.fill();

      // Angler Lure Candy on Stalk!
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(0, -25 + breath);
      ctx.bezierCurveTo(0, -50 + breath, 35, -55 + breath, 32, -35 + breath);
      ctx.stroke();

      // Deceptive Swirl Lollipop Candy
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.arc(32, -35 + breath, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.arc(32, -35 + breath, 6, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 4: {
      // 4. QUÁI VẬT MẶT NẠ ẢO & INTERNET (Split theater mask / cyber skull)
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#06b6d4';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-24, 0 + breath, 48, 42, 8);
      ctx.fill();
      ctx.stroke();

      // Left Half: White smiling porcelain mask
      ctx.fillStyle = '#f8fafc';
      ctx.beginPath();
      ctx.arc(0, -15 + breath, 24, Math.PI * 0.5, Math.PI * 1.5);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(-11, -16 + breath, 5, 0.2, Math.PI * 0.8);
      ctx.stroke();
      ctx.fillStyle = '#fca5a5';
      ctx.beginPath();
      ctx.arc(-12, -8 + breath, 4, 0, Math.PI * 2);
      ctx.fill();

      // Right Half: Dark robotic skull with cyan circuits
      ctx.fillStyle = '#020617';
      ctx.beginPath();
      ctx.arc(0, -15 + breath, 24, -Math.PI * 0.5, Math.PI * 0.5);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, -32 + breath);
      ctx.lineTo(12, -32 + breath);
      ctx.lineTo(12, -22 + breath);
      ctx.lineTo(20, -22 + breath);
      ctx.stroke();

      // Red camera lens eye
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(11, -16 + breath, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(10, -17 + breath, 2, 0, Math.PI * 2);
      ctx.fill();

      // Divider line
      ctx.strokeStyle = '#e11d48';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -39 + breath);
      ctx.lineTo(0, 9 + breath);
      ctx.stroke();

      // Holding smartphone
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(22, 5 + breath, 14, 24, 3);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 8px sans-serif';
      ctx.fillText('⚠️', 25, 20 + breath);
      break;
    }

    case 5: {
      // 5. QUÁI VẬT LỜI NÓI ĐỘC (Spiky Crimson Demon with gaping maw and toxic drops)
      ctx.fillStyle = '#be123c';
      ctx.strokeStyle = '#fda4af';
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.moveTo(-28, 40);
      ctx.lineTo(-38, 15 + breath);
      ctx.lineTo(-24, 0 + breath);
      ctx.lineTo(-32, -20 + breath);
      ctx.lineTo(-12, -25 + breath);
      ctx.lineTo(0, -38 + breath);
      ctx.lineTo(12, -25 + breath);
      ctx.lineTo(32, -20 + breath);
      ctx.lineTo(24, 0 + breath);
      ctx.lineTo(38, 15 + breath);
      ctx.lineTo(28, 40);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Fierce Slanted Red Eyes
      ctx.fillStyle = '#fde047';
      ctx.beginPath();
      ctx.ellipse(-11, -12 + breath, 7, 4, 0.3, 0, Math.PI * 2);
      ctx.ellipse(11, -12 + breath, 7, 4, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#4c0519';
      ctx.beginPath();
      ctx.arc(-11, -12 + breath, 2.5, 0, Math.PI * 2);
      ctx.arc(11, -12 + breath, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Gaping Tooth Maw
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.ellipse(0, 8 + breath, 18, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#fda4af';
      ctx.stroke();

      // Sharp White Teeth
      ctx.fillStyle = '#ffffff';
      [-12, -4, 4, 12].forEach(tx => {
        ctx.beginPath();
        ctx.moveTo(tx - 2, 2 + breath);
        ctx.lineTo(tx, 7 + breath);
        ctx.lineTo(tx + 2, 2 + breath);
        ctx.closePath();
        ctx.fill();
      });

      // Dripping Green Slime
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(0, 16 + breath, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 24 + breath, 2, 0, Math.PI * 2);
      ctx.fill();
      break;
    }

    case 6: {
      // 6. QUÁI VẬT BÓNG ĐÊM MÊ CUNG (Stalking Phantom Wolf)
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 10 + breath, 26, 32, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Sharp Wolf Ears
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.moveTo(-22, -15 + breath);
      ctx.lineTo(-28, -42 + breath);
      ctx.lineTo(-10, -25 + breath);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(22, -15 + breath);
      ctx.lineTo(28, -42 + breath);
      ctx.lineTo(10, -25 + breath);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Glowing Amber Predator Eyes
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.ellipse(-11, -8 + breath, 7, 4, -0.2, 0, Math.PI * 2);
      ctx.ellipse(11, -8 + breath, 7, 4, 0.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.ellipse(-11, -8 + breath, 2, 4, 0, 0, Math.PI * 2);
      ctx.ellipse(11, -8 + breath, 2, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Snout with Fangs
      ctx.fillStyle = '#020617';
      ctx.beginPath();
      ctx.ellipse(0, 4 + breath, 12, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(-5, 4 + breath);
      ctx.lineTo(-3, 10 + breath);
      ctx.lineTo(-1, 4 + breath);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(1, 4 + breath);
      ctx.lineTo(3, 10 + breath);
      ctx.lineTo(5, 4 + breath);
      ctx.closePath();
      ctx.fill();
      break;
    }

    case 7: {
      // 7. BÓNG ĐÊM NGUY HIỂM TỐI CAO (Supreme Overlord Titan)
      ctx.fillStyle = '#2e1065';
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.moveTo(-20, 0 + breath);
      ctx.lineTo(-58, -30 + breath);
      ctx.lineTo(-44, 5 + breath);
      ctx.lineTo(-52, 25 + breath);
      ctx.lineTo(-18, 20 + breath);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(20, 0 + breath);
      ctx.lineTo(58, -30 + breath);
      ctx.lineTo(44, 5 + breath);
      ctx.lineTo(52, 25 + breath);
      ctx.lineTo(18, 20 + breath);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Armor Body
      ctx.fillStyle = '#0f172a';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.roundRect(-24, -10 + breath, 48, 52, 10);
      ctx.fill();
      ctx.stroke();

      // Spiky Crown
      ctx.fillStyle = '#18181b';
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-18, -25 + breath);
      ctx.lineTo(-24, -48 + breath);
      ctx.lineTo(-8, -35 + breath);
      ctx.lineTo(0, -55 + breath);
      ctx.lineTo(8, -35 + breath);
      ctx.lineTo(24, -48 + breath);
      ctx.lineTo(18, -25 + breath);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Eye of Chaos in Crown
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(0, -36 + breath, 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Glowing Visor Crimson Eyes
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(-14, -20 + breath, 10, 4);
      ctx.fillRect(4, -20 + breath, 10, 4);

      // Star Sigil on Chest
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('★', 0, 16 + breath);
      break;
    }

    default: {
      ctx.fillStyle = '#7c3aed';
      ctx.beginPath();
      ctx.arc(0, 0 + breath, 30, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

function drawCuteMonsterStation(
  ctx: CanvasRenderingContext2D,
  x: number,
  groundY: number,
  world: GameWorld,
  timeMs: number,
  isPaused: boolean,
  currentMonsterNum: number,
  totalMonsters: number
) {
  ctx.save();

  // 1. Glowing ground encounter portal
  const pulse = Math.sin(timeMs * 0.006) * 4;
  ctx.fillStyle = 'rgba(239, 68, 68, 0.22)';
  ctx.beginPath();
  ctx.ellipse(x, groundY - 5, 55 + pulse, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2;
  ctx.setLineDash([6, 4]);
  ctx.beginPath();
  ctx.ellipse(x, groundY - 5, 60 + pulse, 15, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);

  // 2. The REAL realistic monster standing across the track!
  drawRealisticMonsterCanvas(ctx, x, groundY - 60, world.id, timeMs, 1.25, false);

  // 3. Menacing Floating Title Header over monster
  ctx.fillStyle = '#0f172a';
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x - 85, groundY - 148, 170, 30, 10);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#fde047';
  ctx.font = 'bold 12px "Baloo 2", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`🛑 ${world.monsterName.toUpperCase()}`, x, groundY - 134);

  // Sub-badge: "THỬ THÁCH X/10"
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.roundRect(x - 55, groundY - 176, 110, 22, 8);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 10px sans-serif';
  ctx.fillText(`CỬA ẢI ${currentMonsterNum}/${totalMonsters}`, x, groundY - 165);

  ctx.restore();
}

function renderCuteSkyAndEnvironment(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  groundY: number,
  env: string,
  dist: number,
  timeMs: number
) {
  const skyGrad = ctx.createLinearGradient(0, 0, 0, groundY);
  if (env === 'forest') {
    skyGrad.addColorStop(0, '#38bdf8');
    skyGrad.addColorStop(0.6, '#a7f3d0');
    skyGrad.addColorStop(1, '#ecfdf5');
  } else if (env === 'city') {
    skyGrad.addColorStop(0, '#f59e0b');
    skyGrad.addColorStop(0.5, '#fed7aa');
    skyGrad.addColorStop(1, '#fef3c7');
  } else if (env === 'castle') {
    skyGrad.addColorStop(0, '#6366f1');
    skyGrad.addColorStop(0.5, '#c084fc');
    skyGrad.addColorStop(1, '#fae8ff');
  } else if (env === 'cyber') {
    skyGrad.addColorStop(0, '#0284c7');
    skyGrad.addColorStop(0.6, '#38bdf8');
    skyGrad.addColorStop(1, '#cffafe');
  } else if (env === 'village') {
    skyGrad.addColorStop(0, '#f472b6');
    skyGrad.addColorStop(0.5, '#fde047');
    skyGrad.addColorStop(1, '#fef9c3');
  } else {
    skyGrad.addColorStop(0, '#818cf8');
    skyGrad.addColorStop(0.5, '#f472b6');
    skyGrad.addColorStop(1, '#fef08a');
  }
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, groundY);

  const sunX = width - 90;
  const sunY = 70;
  ctx.save();
  ctx.fillStyle = '#fde047';
  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 18;
  ctx.beginPath();
  ctx.arc(sunX, sunY, 32, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.arc(sunX - 10, sunY - 4, 3.5, 0, Math.PI * 2);
  ctx.arc(sunX + 10, sunY - 4, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(sunX, sunY + 6, 7, 0.1, Math.PI * 0.9);
  ctx.stroke();

  ctx.fillStyle = 'rgba(244, 63, 94, 0.5)';
  ctx.beginPath();
  ctx.arc(sunX - 16, sunY + 4, 4, 0, Math.PI * 2);
  ctx.arc(sunX + 16, sunY + 4, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  const l1Offset = (dist * 0.2) % 360;
  ctx.fillStyle = env === 'cyber' ? '#7dd3fc' : '#86efac';
  for (let x = -l1Offset - 180; x < width + 260; x += 260) {
    ctx.beginPath();
    ctx.moveTo(x, groundY);
    ctx.quadraticCurveTo(x + 130, groundY - 110, x + 260, groundY);
    ctx.fill();
  }

  const l2Offset = (dist * 0.5) % 220;
  for (let x = -l2Offset - 80; x < width + 180; x += 180) {
    if (env === 'forest' || env === 'village' || env === 'mountain') {
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(x + 40, groundY - 60, 32, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(x + 30, groundY - 68, 4, 0, Math.PI * 2);
      ctx.arc(x + 48, groundY - 55, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#92400e';
      ctx.fillRect(x + 35, groundY - 30, 10, 30);
    } else {
      ctx.fillStyle = '#fde68a';
      ctx.fillRect(x + 20, groundY - 80, 60, 80);
      ctx.fillStyle = '#f43f5e';
      ctx.beginPath();
      ctx.moveTo(x + 15, groundY - 80);
      ctx.lineTo(x + 50, groundY - 110);
      ctx.lineTo(x + 85, groundY - 80);
      ctx.fill();
    }
  }

  ctx.fillStyle = '#ffffff';
  const cloudOffset = (dist * 0.1) % (width + 300);
  for (let c = 0; c < 3; c++) {
    const cx = (c * 340 - cloudOffset + width + 400) % (width + 300) - 100;
    const cy = 40 + c * 26;
    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, Math.PI * 2);
    ctx.arc(cx + 26, cy - 8, 34, 0, Math.PI * 2);
    ctx.arc(cx + 56, cy, 24, 0, Math.PI * 2);
    ctx.fill();
  }
}

function renderCuteGround(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  groundY: number,
  env: string,
  dist: number,
  flowers: CuteFlower[]
) {
  const groundGrad = ctx.createLinearGradient(0, groundY, 0, height);
  if (env === 'cyber') {
    groundGrad.addColorStop(0, '#0284c7');
    groundGrad.addColorStop(0.3, '#0369a1');
    groundGrad.addColorStop(1, '#075985');
  } else {
    groundGrad.addColorStop(0, '#4ade80');
    groundGrad.addColorStop(0.18, '#22c55e');
    groundGrad.addColorStop(0.4, '#15803d');
    groundGrad.addColorStop(1, '#78350f');
  }
  ctx.fillStyle = groundGrad;
  ctx.fillRect(0, groundY, width, height - groundY);

  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(width, groundY);
  ctx.stroke();

  flowers.forEach((fl, idx) => {
    const fx = (fl.x - (dist * 1.0) % (flowers.length * 70) + width + 300) % (width + 300) - 50;
    const fy = groundY + 18 + (idx % 3) * 16;

    ctx.fillStyle = fl.color;
    ctx.beginPath();
    ctx.arc(fx - 4, fy, 4, 0, Math.PI * 2);
    ctx.arc(fx + 4, fy, 4, 0, Math.PI * 2);
    ctx.arc(fx, fy - 4, 4, 0, Math.PI * 2);
    ctx.arc(fx, fy + 4, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(fx, fy, 3, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawCuteStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, size: number, angle: number) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);

  ctx.shadowColor = '#f59e0b';
  ctx.shadowBlur = 14;

  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  const spikes = 5;
  const outer = size;
  const inner = size * 0.48;

  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (i * Math.PI) / spikes;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#78350f';
  ctx.beginPath();
  ctx.arc(-3, -2, 1.5, 0, Math.PI * 2);
  ctx.arc(3, -2, 1.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(0, 2, 2.5, 0, Math.PI);
  ctx.stroke();

  ctx.restore();
}

function drawCuteMonster(
  ctx: CanvasRenderingContext2D,
  x: number,
  groundY: number,
  world: GameWorld,
  timeMs: number,
  isRecoiling: boolean
) {
  const floatY = Math.sin(timeMs * 0.006) * 10;
  const my = groundY - 65 + floatY;
  drawRealisticMonsterCanvas(ctx, x, my, world.id, timeMs, 1.05, isRecoiling);
}

function drawCuteHero(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  character: CharacterProfile,
  cape: CapeOption,
  runCycle: number,
  isGrounded: boolean,
  isPaused: boolean,
  isInvulnerable: boolean
) {
  ctx.save();
  ctx.translate(x, y);

  // If invulnerable (flash effect)
  if (isInvulnerable) {
    ctx.globalAlpha = Math.sin(Date.now() * 0.02) > 0 ? 0.9 : 0.4;
  }

  ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.beginPath();
  ctx.ellipse(0, 42, 28, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  const legAngle = isGrounded && !isPaused ? Math.sin(runCycle) * 0.75 : 0;
  const bounceY = isGrounded && !isPaused ? Math.abs(Math.sin(runCycle)) * 4 : 0;

  // Cape
  ctx.save();
  ctx.fillStyle = cape.color;
  ctx.beginPath();
  ctx.moveTo(-12, -10 - bounceY);
  const capeWave = Math.sin(runCycle * 1.6) * 14;
  ctx.quadraticCurveTo(-42 + capeWave, 8, -46 + capeWave, 28);
  ctx.lineTo(-12, 18);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Left leg
  ctx.fillStyle = '#1e293b';
  ctx.save();
  ctx.translate(-7, 16 - bounceY);
  ctx.rotate(legAngle);
  ctx.fillRect(-4, 0, 8, 22);
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(-5, 18, 14, 8);
  ctx.restore();

  // Right leg
  ctx.save();
  ctx.fillStyle = '#1e293b';
  ctx.translate(7, 16 - bounceY);
  ctx.rotate(-legAngle);
  ctx.fillRect(-4, 0, 8, 22);
  ctx.fillStyle = '#f43f5e';
  ctx.fillRect(-3, 18, 14, 8);
  ctx.restore();

  // Body
  ctx.fillStyle = character.shirtColor;
  ctx.beginPath();
  ctx.roundRect(-15, -12 - bounceY, 30, 28, 8);
  ctx.fill();

  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(0, 0 - bounceY, 6, 0, Math.PI * 2);
  ctx.fill();

  // Head
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(0, -28 - bounceY, 20, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = character.hairColor;
  if (character.id === 'boy') {
    ctx.beginPath();
    ctx.arc(0, -34 - bounceY, 20, Math.PI, Math.PI * 2);
    ctx.lineTo(18, -26 - bounceY);
    ctx.lineTo(10, -22 - bounceY);
    ctx.lineTo(-10, -22 - bounceY);
    ctx.lineTo(-18, -26 - bounceY);
    ctx.closePath();
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(0, -32 - bounceY, 21, Math.PI * 0.9, Math.PI * 2.1);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-20, -30 - bounceY, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f43f5e';
    ctx.beginPath();
    ctx.arc(-18, -38 - bounceY, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(5, -28 - bounceY, 3.5, 0, Math.PI * 2);
  ctx.arc(14, -28 - bounceY, 3.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(4, -29 - bounceY, 1.5, 0, Math.PI * 2);
  ctx.arc(13, -29 - bounceY, 1.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.arc(9, -22 - bounceY, 4.5, 0.1, Math.PI * 0.9);
  ctx.stroke();

  ctx.fillStyle = 'rgba(244, 63, 94, 0.45)';
  ctx.beginPath();
  ctx.arc(2, -24 - bounceY, 4, 0, Math.PI * 2);
  ctx.arc(17, -24 - bounceY, 4, 0, Math.PI * 2);
  ctx.fill();

  // Shield
  ctx.save();
  ctx.translate(20, 2 - bounceY);
  ctx.rotate(0.1);

  const shieldGrad = ctx.createLinearGradient(-12, -18, 12, 18);
  shieldGrad.addColorStop(0, '#60a5fa');
  shieldGrad.addColorStop(0.5, '#3b82f6');
  shieldGrad.addColorStop(1, '#1d4ed8');
  ctx.fillStyle = shieldGrad;
  ctx.beginPath();
  ctx.moveTo(0, -22);
  ctx.lineTo(16, -10);
  ctx.lineTo(12, 16);
  ctx.lineTo(0, 24);
  ctx.lineTo(-12, 16);
  ctx.lineTo(-16, -10);
  ctx.closePath();
  ctx.fill();

  ctx.strokeStyle = '#fde047';
  ctx.lineWidth = 3;
  ctx.stroke();

  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.arc(0, 0, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Glowing bubble if question is active or if invulnerable
  if (isPaused || isInvulnerable) {
    ctx.strokeStyle = isInvulnerable ? '#fde047' : '#38bdf8';
    ctx.lineWidth = 4;
    ctx.shadowColor = isInvulnerable ? '#fde047' : '#38bdf8';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(0, -10 - bounceY, 52, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.restore();
}

function drawCuteMascotCompanion(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();
  ctx.translate(x, y);

  ctx.shadowColor = '#fde047';
  ctx.shadowBlur = 10;

  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.ellipse(0, 0, 12, 15, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.ellipse(0, 3, 7, 9, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.ellipse(-10, 0, 4, 8, -0.4, 0, Math.PI * 2);
  ctx.ellipse(10, 0, 4, 8, 0.4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(-4, -4, 4, 0, Math.PI * 2);
  ctx.arc(4, -4, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(-4, -4, 2, 0, Math.PI * 2);
  ctx.arc(4, -4, 2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.moveTo(0, -1);
  ctx.lineTo(-2, 2);
  ctx.lineTo(2, 2);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(-6, -15, 12, 4);
  ctx.beginPath();
  ctx.moveTo(0, -18);
  ctx.lineTo(-8, -15);
  ctx.lineTo(0, -12);
  ctx.lineTo(8, -15);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}
