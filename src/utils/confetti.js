/**
 * High-performance Canvas Confetti Particle System
 * Triggers colorful celebration bursts on lesson completions.
 */

export function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  
  // Set dimensions matching window
  let width = window.innerWidth;
  let height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  ctx.scale(dpr, dpr);

  const colors = [
    '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
    '#8b5cf6', '#ec4899', '#06b6d4', '#f43f5e'
  ];

  const particles = [];
  const particleCount = 120;

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: width / 2 + (Math.random() - 0.5) * 60,
      y: height + 20,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedX: (Math.random() - 0.5) * 12,
      speedY: -Math.random() * 15 - 10,
      gravity: 0.35,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }

  let animationFrameId;

  function update() {
    ctx.clearRect(0, 0, width, height);

    let activeParticles = 0;

    particles.forEach(p => {
      if (p.opacity <= 0) return;

      p.x += p.speedX;
      p.y += p.speedY;
      p.speedY += p.gravity;
      p.rotation += p.rotationSpeed;
      p.opacity -= 0.012;

      if (p.y > height + 20) p.opacity = 0;

      if (p.opacity > 0) {
        activeParticles++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        
        // Draw piece
        if (Math.random() > 0.5) {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    });

    if (activeParticles > 0) {
      animationFrameId = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, width, height);
      cancelAnimationFrame(animationFrameId);
    }
  }

  // Handle window resizing
  function handleResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }
  
  window.addEventListener('resize', handleResize);

  update();

  // Cleanup resize listener after completion
  setTimeout(() => {
    window.removeEventListener('resize', handleResize);
  }, 10000);
}
