"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
}

const COLORS = ["#4f9ae0", "#e8b656", "#3ac48c", "#ffffff", "#ea6161"];
const DURATION_MS = 10000;

export default function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    function handleResize() {
      width = canvas!.width = window.innerWidth;
      height = canvas!.height = window.innerHeight;
    }
    window.addEventListener("resize", handleResize);

    let particles: Particle[] = [];
    const startTime = Date.now();
    let lastLaunch = 0;
    let rafId: number;

    function launchFirework() {
      const x = Math.random() * width;
      const y = Math.random() * height * 0.5;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];
      const count = 40 + Math.floor(Math.random() * 20);
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 2 + Math.random() * 3;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color,
        });
      }
    }

    function tick(now: number) {
      const elapsed = Date.now() - startTime;
      const stillSpawning = elapsed < DURATION_MS;

      ctx!.clearRect(0, 0, width, height);

      if (stillSpawning && now - lastLaunch > 500 + Math.random() * 400) {
        launchFirework();
        lastLaunch = now;
      }

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.03;
        p.alpha -= 0.015;
      }
      particles = particles.filter((p) => p.alpha > 0);

      for (const p of particles) {
        ctx!.globalAlpha = Math.max(p.alpha, 0);
        ctx!.fillStyle = p.color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      if (stillSpawning || particles.length > 0) {
        rafId = requestAnimationFrame(tick);
      }
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0"
      aria-hidden="true"
    />
  );
}
