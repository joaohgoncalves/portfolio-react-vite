import React, { useEffect, useRef } from 'react';

const BackgroundReveal: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const smoothMouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Configuration: Abstract Organic Waves
    const lineCount = 24; // Reduced count for cleaner look
    const lines = Array.from({ length: lineCount }, (_, i) => ({
      yPercent: (i + 0.5) / lineCount,
      baseColor: 'rgba(255, 255, 255, 0.03)',
      speed: 0.002 + Math.random() * 0.004,
      phase: Math.random() * Math.PI * 2,
      amplitude: 20 + Math.random() * 40,
      frequency: 0.001 + Math.random() * 0.002,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor;
    };

    const render = () => {
      timeRef.current += 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Smooth mouse
      smoothMouseRef.current.x = lerp(smoothMouseRef.current.x, mouseRef.current.x, 0.08);
      smoothMouseRef.current.y = lerp(smoothMouseRef.current.y, mouseRef.current.y, 0.08);

      const mx = smoothMouseRef.current.x;
      const my = smoothMouseRef.current.y;

      ctx.clearRect(0, 0, width, height);

      lines.forEach((line) => {
        const baseY = height * line.yPercent;

        ctx.beginPath();

        // Dynamic styling based on mouse proximity to the "row"
        const distToMouseY = Math.abs(my - baseY);
        const verticalThreshold = 150;
        let intensity = 0;

        if (distToMouseY < verticalThreshold) {
          intensity = 1 - distToMouseY / verticalThreshold;
        }

        // Gradient construction
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        const ratio = Math.max(0, Math.min(1, mx / width));

        // Subtle base state
        gradient.addColorStop(0, line.baseColor);

        // Active highlight state (if near mouse Y)
        if (intensity > 0) {
          const glow = `rgba(59, 130, 246, ${0.4 * intensity})`; // Brand accent
          const spread = 0.2;
          gradient.addColorStop(Math.max(0, ratio - spread), line.baseColor);
          gradient.addColorStop(ratio, glow);
          gradient.addColorStop(Math.min(1, ratio + spread), line.baseColor);
        } else {
          gradient.addColorStop(1, line.baseColor);
        }

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1 + intensity;

        // Draw the wave
        const segmentWidth = 15;
        let started = false;

        for (let x = -50; x <= width + 50; x += segmentWidth) {
          // 1. Natural Organic Movement (Sine waves)
          const time = timeRef.current * line.speed;
          const waveOffset = Math.sin(x * line.frequency + time + line.phase) * line.amplitude;
          const secondaryWave =
            Math.cos(x * (line.frequency * 2.5) - time) * (line.amplitude * 0.3);

          // 2. Mouse Interaction (Disturbance)
          const dx = x - mx;
          const dy = baseY - my; // Distance to original line height
          const distSq = dx * dx + dy * dy;
          const interactionRadius = 350;
          const interactionRadiusSq = interactionRadius * interactionRadius;

          let mouseOffset = 0;

          if (distSq < interactionRadiusSq) {
            const force = Math.pow(1 - distSq / interactionRadiusSq, 2);
            // Repel/Distort effect: Push lines vertically based on X distance
            mouseOffset = Math.sin(dx * 0.01) * 60 * force;
          }

          const finalY = baseY + waveOffset + secondaryWave + mouseOffset;

          if (!started) {
            ctx.moveTo(x, finalY);
            started = true;
          } else {
            ctx.lineTo(x, finalY);
          }
        }

        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    resize();
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default BackgroundReveal;
