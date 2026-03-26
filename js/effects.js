/* ============================================
   SHARED EFFECTS ENGINE
   "We put the FUN in dysFUNctional"
   ============================================ */

// === SPARKLE CURSOR TRAIL ===
const sparkleEmojis = ['✨', '⭐', '💫', '🌟', '✴️', '🔥', '💖', '⚡'];
let sparkleThrottle = 0;

document.addEventListener('mousemove', (e) => {
  sparkleThrottle++;
  if (sparkleThrottle % 3 !== 0) return;

  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
  sparkle.style.left = (e.clientX + (Math.random() - 0.5) * 20) + 'px';
  sparkle.style.top = (e.clientY + (Math.random() - 0.5) * 20) + 'px';
  sparkle.style.fontSize = (12 + Math.random() * 16) + 'px';
  document.body.appendChild(sparkle);

  setTimeout(() => sparkle.remove(), 800);
});

// === SNOWFALL (but make it emojis) ===
const snowEmojis = ['❄️', '🌸', '⭐', '✨', '🦋', '🌈', '💎', '🎀', '🍕'];

function createSnowflake() {
  const flake = document.createElement('div');
  flake.className = 'snowflake';
  flake.textContent = snowEmojis[Math.floor(Math.random() * snowEmojis.length)];
  flake.style.left = Math.random() * 100 + 'vw';
  flake.style.fontSize = (14 + Math.random() * 20) + 'px';
  flake.style.animationDuration = (4 + Math.random() * 6) + 's';
  flake.style.opacity = 0.4 + Math.random() * 0.6;
  document.body.appendChild(flake);

  setTimeout(() => flake.remove(), 10000);
}

setInterval(createSnowflake, 600);

// === FLOATING EMOJIS FROM BOTTOM ===
const floatEmojis = ['🚀', '🔥', '💯', '🎉', '🤖', '🧠', '💰', '⚡', '🎸', '👾'];

function createFloatingEmoji() {
  const emoji = document.createElement('div');
  emoji.className = 'floating-emoji';
  emoji.textContent = floatEmojis[Math.floor(Math.random() * floatEmojis.length)];
  emoji.style.left = Math.random() * 100 + 'vw';
  emoji.style.animationDuration = (4 + Math.random() * 4) + 's';
  document.body.appendChild(emoji);

  setTimeout(() => emoji.remove(), 8000);
}

setInterval(createFloatingEmoji, 2000);

// === EYES THAT FOLLOW MOUSE ===
function initEyes() {
  const eyes = document.querySelectorAll('.eye');

  document.addEventListener('mousemove', (e) => {
    eyes.forEach(eye => {
      const pupil = eye.querySelector('.pupil');
      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const maxDist = 10;
      const dist = Math.min(
        Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 10,
        maxDist
      );

      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist;

      pupil.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    });
  });
}

// === VISITOR COUNTER (FAKE, obviously) ===
function initVisitorCounter() {
  const counter = document.getElementById('visitor-count');
  if (!counter) return;

  // Generate a convincingly fake number
  let count = 48173 + Math.floor(Math.random() * 1000);
  const digits = counter.querySelectorAll('.odo-digit');

  function updateCounter() {
    count += Math.floor(Math.random() * 3);
    const str = count.toString().padStart(digits.length, '0');
    digits.forEach((d, i) => {
      d.textContent = str[i];
    });
  }

  updateCounter();
  setInterval(updateCounter, 3000 + Math.random() * 5000);
}

// === DANCING LETTERS ===
function initDancingLetters() {
  document.querySelectorAll('.dance-text').forEach(el => {
    const text = el.textContent;
    el.textContent = '';
    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.className = 'dance-letter';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = (i * 0.08) + 's';
      // Random colors per letter
      const colors = ['#ff0000', '#ff7700', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'];
      span.style.color = colors[i % colors.length];
      el.appendChild(span);
    });
  });
}

// === DISCO BACKGROUND ===
function initDiscoBackground() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const discoColors = [
    '#ff00ff', '#00ffff', '#ffff00', '#ff0066',
    '#6600ff', '#00ff66', '#ff6600', '#ff0099',
    '#0099ff', '#99ff00', '#ff3399', '#33ccff'
  ];

  // Grid of disco tiles
  const tileSize = 60;
  let time = 0;

  function draw() {
    time += 0.02;
    const cols = Math.ceil(canvas.width / tileSize) + 1;
    const rows = Math.ceil(canvas.height / tileSize) + 1;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const wave = Math.sin(c * 0.3 + time) + Math.cos(r * 0.3 + time * 0.7);
        const brightness = (wave + 2) / 4; // normalize 0-1
        const colorIdx = Math.floor((c + r + Math.floor(time * 2)) % discoColors.length);
        const color = discoColors[colorIdx];

        ctx.globalAlpha = 0.15 + brightness * 0.25;
        ctx.fillStyle = color;
        ctx.fillRect(c * tileSize, r * tileSize, tileSize - 2, tileSize - 2);
      }
    }

    // Disco ball spotlight sweep
    const spotX = canvas.width / 2 + Math.cos(time * 0.8) * canvas.width * 0.4;
    const spotY = canvas.height / 3 + Math.sin(time * 0.6) * canvas.height * 0.2;
    const gradient = ctx.createRadialGradient(spotX, spotY, 0, spotX, spotY, 300);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.globalAlpha = 1;
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    requestAnimationFrame(draw);
  }

  draw();

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// === SCROLL "OBSESSED" POPUP ===
function initScrollPopup() {
  const popup = document.createElement('div');
  popup.className = 'scroll-popup';
  popup.innerHTML = `
    <span class="scroll-popup-emoji">💅</span>
    <div class="scroll-popup-text">why are you so<br>obsessed with me</div>
    <button class="scroll-popup-close" onclick="this.parentElement.classList.remove('visible')">I can't help it</button>
  `;
  document.body.appendChild(popup);

  let hasShown = false;
  let scrollTimeout = null;

  window.addEventListener('scroll', () => {
    if (hasShown) return;

    // Show after scrolling past 40% of the page
    const scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (scrollPct > 0.4) {
      // Small delay so it feels reactive, not instant
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          popup.classList.add('visible');
          hasShown = true;

          // Auto-dismiss after 5 seconds
          setTimeout(() => {
            popup.classList.remove('visible');
          }, 5000);
        }, 300);
      }
    }
  });
}

// === INIT ALL EFFECTS ===
document.addEventListener('DOMContentLoaded', () => {
  initEyes();
  initVisitorCounter();
  initDancingLetters();
  initDiscoBackground();
  initScrollPopup();
});
