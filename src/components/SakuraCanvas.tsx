import { useEffect, useRef } from "react";

// ────────────────────────────────────────────────────────────
//  Sakura Rain — canvas petals tuned for WHITE background
//  Petals use a deeper rose/dusty-pink tone so they're
//  visible on the light paper bg without looking bright.
// ────────────────────────────────────────────────────────────

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  angle: number;
  rotSpeed: number;
  alpha: number;
  hue: number;  // slight hue variation
}

function createPetal(canvasW: number): Petal {
  return {
    x: Math.random() * canvasW,
    y: -20 - Math.random() * 180,
    size: 5 + Math.random() * 9,
    speedY: 0.5 + Math.random() * 1.0,
    speedX: -0.4 + Math.random() * 0.8,
    angle: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.035,
    alpha: 0.12 + Math.random() * 0.20,   // subtle on white
    hue: 340 + Math.random() * 20,        // rose to pink range
  };
}

export default function SakuraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const petals    = useRef<Petal[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Seed with petals spread across the viewport
    for (let i = 0; i < 60; i++) {
      const p = createPetal(canvas.width);
      p.y = Math.random() * canvas.height;
      petals.current.push(p);
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.current.forEach((p, idx) => {
        p.x += p.speedX + Math.sin(Date.now() * 0.0007 + idx * 0.5) * 0.28;
        p.y += p.speedY;
        p.angle += p.rotSpeed;

        if (p.y > canvas.height + 30) {
          petals.current[idx] = createPetal(canvas.width);
          return;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;

        // Petal body — darker saturation so it shows on white
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size, p.size * 0.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${p.hue}, 55%, 62%)`;
        ctx.fill();

        // Inner vein highlight
        ctx.beginPath();
        ctx.moveTo(0, -p.size * 0.4);
        ctx.lineTo(0, p.size * 0.4);
        ctx.strokeStyle = `hsl(${p.hue}, 40%, 78%)`;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = p.alpha * 0.4;
        ctx.stroke();

        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}
