export function observeEntrance(container: HTMLElement, selector: string, className = 'entered'): void {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add(className);
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  container.querySelectorAll(selector).forEach((el) => observer.observe(el));
}

export function staggerEntrance(container: HTMLElement, selector: string, delayMs = 80): void {
  const elements = container.querySelectorAll<HTMLElement>(selector);
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = Array.from(elements).indexOf(e.target as HTMLElement);
          (e.target as HTMLElement).style.transitionDelay = `${idx * delayMs}ms`;
          e.target.classList.add('entered');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  elements.forEach((el) => observer.observe(el));
}

export function countUp(el: HTMLElement, target: number, durationMs = 800, format?: (v: number) => string): void {
  const start = performance.now();
  const fmt = format ?? ((v: number) => String(Math.round(v)));

  function tick(now: number) {
    const progress = Math.min((now - start) / durationMs, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = fmt(target * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

export function animateIn(el: HTMLElement, delayMs = 0): void {
  el.classList.add('anim-pre');
  setTimeout(() => {
    requestAnimationFrame(() => el.classList.add('anim-in'));
  }, delayMs);
}
