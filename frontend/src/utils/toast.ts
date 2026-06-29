let toastEl: HTMLElement | null = null;
let hideTimer: ReturnType<typeof setTimeout> | null = null;

function ensureToast(): HTMLElement {
  if (toastEl) return toastEl;
  toastEl = document.createElement('div');
  toastEl.className = 'toast';
  toastEl.setAttribute('role', 'status');
  toastEl.setAttribute('aria-live', 'polite');
  document.body.appendChild(toastEl);
  return toastEl;
}

export function showToast(message: string): void {
  const el = ensureToast();
  if (hideTimer) clearTimeout(hideTimer);
  el.textContent = message;
  el.classList.add('toast-visible');
  hideTimer = setTimeout(() => {
    el.classList.remove('toast-visible');
  }, 2000);
}
