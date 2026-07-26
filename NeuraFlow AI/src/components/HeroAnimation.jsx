import React, { useEffect, useRef } from 'react';
import { Cpu, Zap, Activity, Database, Sparkles } from 'lucide-react';

export default function HeroAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle nodes
    const particleCount = 40;
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1.5,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        color: i % 3 === 0 ? '#06B6D4' : i % 2 === 0 ? '#2563EB' : '#7C3AED'
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(37, 99, 235, ${1 - dist / 120 * 0.8})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl glass-card border border-white/15 overflow-hidden shadow-2xl bg-slate-900/80">
      
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Floating Interactive UI Overlay Cards */}
      <div className="absolute top-6 left-6 p-3.5 rounded-2xl glass-card border border-white/15 bg-slate-900/90 shadow-glow-primary animate-float flex items-center space-x-3">
        <div className="p-2 rounded-xl bg-blue-600/20 text-cyan-400 border border-blue-500/30">
          <Activity className="w-5 h-5 animate-pulse" />
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Neural Throughput</span>
          <span className="text-sm font-extrabold text-white font-heading">142,800 req/sec</span>
        </div>
      </div>

      <div className="absolute bottom-8 right-6 p-3.5 rounded-2xl glass-card border border-white/15 bg-slate-900/90 shadow-glow-secondary animate-float [animation-delay:2s] flex items-center space-x-3">
        <div className="p-2 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <span className="text-[10px] text-slate-400 block uppercase font-bold">Model Precision</span>
          <span className="text-sm font-extrabold text-emerald-400 font-heading">99.94% Accuracy</span>
        </div>
      </div>

      {/* Central Glowing Core Node */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-blue-600 via-purple-600 to-cyan-400 p-[3px] shadow-glow-primary animate-spin-slow">
          <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center">
            <Cpu className="w-10 h-10 text-cyan-400 animate-pulse" />
          </div>
        </div>
        <div className="mt-3 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 shadow-lg flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>NEURAFLOW v4.8 ENGINE ACTIVE</span>
        </div>
      </div>

    </div>
  );
}
