
function startFireworks() {
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  const particles = [];

  function createParticle() {
    const x = canvas.width / 2;
    const y = canvas.height / 2;
    const color = 'hsl(' + Math.random() * 360 + ', 100%, 60%)';
    for (let i = 0; i < 100; i++) {
      particles.push({
        x,
        y,
        radius: Math.random() * 3 + 2,
        color,
        angle: Math.random() * 2 * Math.PI,
        speed: Math.random() * 4 + 1,
        alpha: 1,
      });
    }
  }

  function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= 0.01;
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      if (p.alpha <= 0) particles.splice(i, 1);
    });
    ctx.globalAlpha = 1;
    if (particles.length < 10) createParticle();
    requestAnimationFrame(updateParticles);
  }

  createParticle();
  updateParticles();
}
