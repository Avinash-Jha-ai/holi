import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

const SpraySVG = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="35" y="40" width="30" height="45" rx="5" fill="#334155" />
    <rect x="40" y="30" width="20" height="10" fill="#4b5563" />
    <path d="M48 20L52 20L54 30L46 30L48 20Z" fill="#94a3b8" />
    <circle cx="50" cy="15" r="3" fill="#ef4444" />
    <path d="M53 15C65 15 75 5 75 5" stroke="#d946ef" strokeWidth="2" strokeLinecap="round" opacity="0.6">
      <animate attributeName="stroke-dasharray" from="0,100" to="100,0" dur="1s" repeatCount="Infinity" />
    </path>
    <path d="M53 17C65 25 75 35 75 35" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" opacity="0.6">
      <animate attributeName="stroke-dasharray" from="0,100" to="100,0" dur="1.2s" repeatCount="Infinity" />
    </path>
  </svg>
);

const InteractiveCanvas = () => {
  const canvasRef = useRef(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isInside, setIsInside] = useState(false);

  const colors = ['#d946ef', '#eab308', '#22c55e', '#a855f7', '#f97316', '#0ea5e9'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    const draw = (e) => {
      const x = e.clientX || (e.touches && e.touches[0].clientX);
      const y = e.clientY || (e.touches && e.touches[0].clientY);

      setCursorPos({ x, y });
      setIsInside(true);

      if (!isDrawing) return;

      const color = colors[Math.floor(Math.random() * colors.length)];

      // Wide area misty spray effect
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 80; // Expanded area
        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;

        ctx.beginPath();
        ctx.arc(x + offsetX, y + offsetY, Math.random() * 5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = Math.random() * 0.4;
        ctx.fill();
      }

      // Smooth splattery trail
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.strokeStyle = color;
      ctx.lineWidth = 40; // Wider trail
      ctx.lineCap = 'round';
      ctx.globalAlpha = 0.1;
      ctx.stroke();

      lastX = x;
      lastY = y;
    };

    const handleMouseDown = (e) => {
      isDrawing = true;
      lastX = e.clientX || (e.touches && e.touches[0].clientX);
      lastY = e.clientY || (e.touches && e.touches[0].clientY);

      // Big pop on click
      confetti({
        particleCount: 80,
        spread: 120,
        origin: {
          x: lastX / window.innerWidth,
          y: lastY / window.innerHeight
        },
        colors: colors,
        startVelocity: 45,
        gravity: 0.8,
        scalar: 1.2
      });
    };

    const handleMouseUp = () => {
      isDrawing = false;
    };

    const handleResize = () => {
      // Preserve canvas content on resize by using a temporary canvas
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.drawImage(canvas, 0, 0);

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.drawImage(tempCanvas, 0, 0);
    };

    // Initial Full-Screen Splash
    window.triggerInitialSplash = () => {
      for (let i = 0; i < 40; i++) {
        setTimeout(() => {
          const x = Math.random() * window.innerWidth;
          const y = Math.random() * window.innerHeight;
          const color = colors[Math.floor(Math.random() * colors.length)];

          for (let j = 0; j < 30; j++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 150;
            const offsetX = Math.cos(angle) * radius;
            const offsetY = Math.sin(angle) * radius;

            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, Math.random() * 8, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.globalAlpha = 0.2;
            ctx.fill();
          }
        }, i * 50);
      }
    };

    const handleMouseEnter = () => setIsInside(true);
    const handleMouseLeave = () => setIsInside(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', draw);
    window.addEventListener('touchstart', handleMouseDown);
    window.addEventListener('touchend', handleMouseUp);
    window.addEventListener('touchmove', draw);
    window.addEventListener('resize', handleResize);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', draw);
      window.removeEventListener('touchstart', handleMouseDown);
      window.removeEventListener('touchend', handleMouseUp);
      window.removeEventListener('touchmove', draw);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 5
        }}
      />
      {isInside && (
        <div
          className="custom-cursor"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`
          }}
        >
          <SpraySVG />
        </div>
      )}
    </>
  );
};

export default InteractiveCanvas;
