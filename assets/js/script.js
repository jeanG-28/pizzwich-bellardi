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
// Mon-Fri: 11:30-14:30 & 18:00-02:00 | Sat-Sun: 18:00-02:00 only (no lunch service)
function computeStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const minutes = now.getHours() * 60 + now.getMinutes();

  const isWeekend = day === 0 || day === 6;
  const lunchStart = 11 * 60 + 30;
  const lunchEnd = 14 * 60 + 30;
  const dinnerStart = 18 * 60;
  const dinnerEnd = 26 * 60; // 02:00 next day

  const isLunch = !isWeekend && minutes >= lunchStart && minutes < lunchEnd;
  const isDinner = minutes >= dinnerStart && minutes < dinnerEnd;
  const isAfterMidnight = minutes < 2 * 60; // service continues from previous evening until 2am

  const open = isLunch || isDinner || isAfterMidnight;

  const el = document.getElementById('openStatus');
  if (open) {
    el.textContent = isLunch ? '🟢 Ouvert — service du midi' : '🟢 Ouvert — service du soir';
  } else if (!isWeekend && minutes < lunchStart) {
    el.textContent = `🔴 Fermé — ouvre à 11h30`;
  } else if ((isWeekend && minutes < dinnerStart) || (!isWeekend && minutes >= lunchEnd && minutes < dinnerStart)) {
    el.textContent = `🔴 Fermé — réouvre à 18h00`;
  } else {
    el.textContent = `🔴 Fermé`;
  }
}
computeStatus();
setInterval(computeStatus, 60000);
