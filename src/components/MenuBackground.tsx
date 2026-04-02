import React, { useEffect, useRef } from 'react';

const MenuBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const smoothMouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    // Define the paths (same as the previous SVG)
    // These coordinates are based on a 375x812 reference frame (mobile)
    const pathStrings = [
        "M-50 200C50 200 100 100 250 150C400 200 450 400 350 500",
        "M-50 400C0 450 150 350 250 450C350 550 400 700 300 850",
        "M-50 600C0 550 100 650 200 600C300 550 400 500 500 600",
        "M200 -50C150 100 250 300 150 500C50 700 150 900 250 1000",
        "M350 -50C300 150 400 400 300 600C200 800 300 900 350 1000"
    ];

    const paths = pathStrings.map(p => new Path2D(p));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      // Reset transform before applying new scale
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = { 
            x: e.clientX - rect.left, 
            y: e.clientY - rect.top 
        };
    };

    const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
    };

    const render = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Smooth mouse movement for the glow effect
      smoothMouseRef.current.x = lerp(smoothMouseRef.current.x, mouseRef.current.x, 0.1);
      smoothMouseRef.current.y = lerp(smoothMouseRef.current.y, mouseRef.current.y, 0.1);

      const mx = smoothMouseRef.current.x;
      const my = smoothMouseRef.current.y;

      ctx.clearRect(0, 0, width, height);
      
      // Calculate scaling to stretch the 375x812 paths to the current screen size
      // This mimics 'preserveAspectRatio="none"' from SVG
      const scaleX = width / 375;
      const scaleY = height / 812;

      // Create a dynamic radial gradient for the stroke
      // This gradient is screen-space, so it follows the mouse regardless of line transformations
      const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 400);
      
      // Center (Mouse): Electric Blue
      gradient.addColorStop(0, 'rgba(59, 130, 246, 1)'); 
      // Mid: Fading Blue
      gradient.addColorStop(0.15, 'rgba(59, 130, 246, 0.6)');
      // Transition: White tint
      gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.15)');
      // Outer: Faint White (Base color)
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.1)');

      ctx.save();
      // Apply the scaling for the paths
      ctx.scale(scaleX, scaleY);
      
      // We must reset the stroke style scaling effect so lines don't look distortedly thick
      // But simpler is to just draw with the transform.
      // To ensure the gradient is applied correctly in screen space while paths are scaled:
      // We need to apply the inverse scale to the gradient context? 
      // Actually, Canvas gradients are coordinate-system dependent. 
      // Easier trick: Construct paths scaled, OR use setTransform inside loop.
      
      // Let's stick to the context scale. The line width will be scaled, which is actually desirable for the stretch effect.
      ctx.lineWidth = 1.5 / Math.min(scaleX, scaleY); // Try to normalize stroke width slightly
      ctx.lineCap = 'round';
      ctx.strokeStyle = gradient;

      paths.forEach(path => {
          ctx.stroke(path);
      });

      ctx.restore();

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

  return (
    <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};

export default MenuBackground;