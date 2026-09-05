// Pizz'Wich Bellardi — interactions front

document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
});
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

// Open / closed status based on real opening hours
// Mon-Fri: 11:00-14:00 & 18:00-23:00 | Sat-Sun: 11:00-14:00 & 18:00-01:00
function computeStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const minutes = now.getHours() * 60 + now.getMinutes();

  const isWeekend = day === 0 || day === 6;
  const lunchStart = 11 * 60;
  const lunchEnd = 14 * 60;
  const dinnerStart = 18 * 60;
  const dinnerEnd = isWeekend ? 25 * 60 : 23 * 60; // 01:00 next day for weekends

  const isLunch = minutes >= lunchStart && minutes < lunchEnd;
  const isDinner = minutes >= dinnerStart && minutes < dinnerEnd;
  const isEarlyMorningWeekend = isWeekend === false && day === 1 ? false : minutes < 60 && (day === 0 || day === 6); // after midnight until 1am on Sat/Sun service

  const open = isLunch || isDinner || isEarlyMorningWeekend;

  const el = document.getElementById('openStatus');
  if (open) {
    el.textContent = isLunch ? '🟢 Ouvert — service du midi' : '🟢 Ouvert — service du soir';
  } else if (minutes < lunchStart) {
    el.textContent = `🔴 Fermé — ouvre à 11h00`;
  } else if (minutes >= lunchEnd && minutes < dinnerStart) {
    el.textContent = `🔴 Fermé — réouvre à 18h00`;
  } else {
    el.textContent = `🔴 Fermé — ouvre à 11h00`;
  }
}
computeStatus();
setInterval(computeStatus, 60000);
