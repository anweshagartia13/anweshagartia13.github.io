const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

const counters = document.querySelectorAll(".counter");
const animateCounter = (node) => {
  const target = Number(node.dataset.target || 0);
  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.floor(progress * target);
    node.textContent = `${value}+`;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      node.textContent = `${target}+`;
    }
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target);
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.5 }
);

counters.forEach((counter) => counterObserver.observe(counter));
