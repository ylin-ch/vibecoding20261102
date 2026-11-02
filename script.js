const countElement = document.querySelector('#signal-count');
const signalButton = document.querySelector('#signal-button');
const sparkleField = document.querySelector('#sparkle-field');
const copyButton = document.querySelector('#copy-link');
const copyStatus = document.querySelector('#copy-status');
const storageKey = 'small-corner-signals';

let count = 0;
try {
  const saved = Number(localStorage.getItem(storageKey));
  if (Number.isSafeInteger(saved) && saved >= 0) count = saved;
} catch { /* Browser storage may be disabled. */ }
countElement.textContent = String(count);
document.querySelector('#year').textContent = String(new Date().getFullYear());

signalButton.addEventListener('click', () => {
  count += 1;
  countElement.textContent = String(count);
  try { localStorage.setItem(storageKey, String(count)); } catch { /* Keep the in-page count. */ }
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    for (let i = 0; i < 7; i += 1) {
      const sparkle = document.createElement('span');
      sparkle.className = 'sparkle';
      sparkle.style.left = `${15 + Math.random() * 75}%`;
      sparkle.style.top = `${40 + Math.random() * 50}%`;
      sparkle.style.animationDelay = `${Math.random() * 0.15}s`;
      sparkleField.appendChild(sparkle);
      sparkle.addEventListener('animationend', () => sparkle.remove(), { once: true });
    }
  }
});

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    copyStatus.textContent = 'Link copied!';
  } catch {
    copyStatus.textContent = `Copy this URL: ${window.location.href}`;
  }
});
