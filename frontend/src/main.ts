import './style.css';
import { MODULE_INDEX, loadModuleContent } from './content/registry';
import { renderModule } from './content/render';
import { isComplete, toggleComplete, completedCount } from './progress';
import { staggerEntrance } from './animate';
import { destroyChatWidget } from './chat';

const app = document.querySelector<HTMLDivElement>('#app')!;

let sessionStart = Date.now();
let sessionTimer: ReturnType<typeof setInterval> | null = null;

// ── Routing ──────────────────────────────────────────────────

function navigate(path: string, pushState = true): void {
  if (pushState) history.pushState(null, '', path);
  window.scrollTo(0, 0);
  destroyChatWidget();
  route(path);
}

function route(path: string): void {
  if (path === '/contact') {
    renderContact();
  } else if (path.startsWith('/module/')) {
    const id = path.slice('/module/'.length);
    openModule(id);
  } else {
    renderIndex();
  }
}

window.addEventListener('popstate', () => route(location.pathname));
window.addEventListener('navigate', ((e: CustomEvent) => navigate(e.detail)) as EventListener);

// ── Index ────────────────────────────────────────────────────

function renderIndex(): void {
  stopSessionTimer();
  const total = MODULE_INDEX.length;
  const done = completedCount();

  app.innerHTML = `
    <header>
      <span class="eyebrow">DIGITAL FINANCE BOOTCAMP</span>
      <h1>Modules</h1>
      <p class="sub">Tap a module to start. They build on each other in order, but you can jump around.</p>
      <div class="progress-summary">
        <span class="progress-text">${done} / ${total} modules complete</span>
        <div class="progress-track"><div class="progress-fill" style="width:${(done / total) * 100}%"></div></div>
      </div>
      <div class="search-wrap">
        <input class="search-input" id="moduleSearch" type="text" placeholder="Search modules…" autocomplete="off" />
      </div>
      <button class="contact-link" id="contactLink">✉ Get in touch</button>
      <div class="counter-box">
        <span class="counter-label">Visits recorded</span>
        <span id="counter-value" class="counter-value">—</span>
      </div>
      <div class="session-box">
        <span class="counter-label">Session</span>
        <span id="session-value" class="counter-value session-timer">0 min</span>
      </div>
    </header>
    <div class="module-list" id="moduleList">
      ${MODULE_INDEX.map(renderIndexRow).join('')}
    </div>
  `;

  bindModuleRows();

  app.querySelector<HTMLElement>('#contactLink')!.addEventListener('click', () => navigate('/contact'));

  let glossaryTerms: string[] | null = null;
  const searchInput = app.querySelector<HTMLInputElement>('#moduleSearch')!;
  searchInput.addEventListener('input', async () => {
    const q = searchInput.value.trim().toLowerCase();
    let filtered = q
      ? MODULE_INDEX.filter(
          (m) => m.title.toLowerCase().includes(q) || m.summary.toLowerCase().includes(q)
        )
      : MODULE_INDEX;

    // Search glossary terms for 3+ char queries
    if (q.length >= 3 && !glossaryTerms) {
      const mod = await loadModuleContent('glossary');
      if (mod) {
        glossaryTerms = mod.blocks
          .filter((b) => b.kind === 'text' && 'body' in b)
          .flatMap((b) => {
            const matches = (b as { body: string }).body.match(/<b>([^<]+)<\/b>/g) ?? [];
            return matches.map((m) => m.replace(/<\/?b>/g, ''));
          });
      }
    }

    let glossaryHits: string[] = [];
    if (q.length >= 3 && glossaryTerms) {
      glossaryHits = glossaryTerms.filter((t) => t.toLowerCase().includes(q));
    }

    const list = app.querySelector<HTMLElement>('#moduleList')!;
    let html = filtered.map(renderIndexRow).join('');
    if (glossaryHits.length > 0) {
      html += `<div class="glossary-hits">
        <span class="tag">Glossary matches</span>
        ${glossaryHits.map((t) => `<div class="glossary-hit" data-id="glossary">${t}</div>`).join('')}
      </div>`;
    }
    list.innerHTML = html;
    bindModuleRows();
    list.querySelectorAll<HTMLElement>('.glossary-hit').forEach((el) => {
      el.addEventListener('click', () => navigate('/module/glossary'));
    });
  });

  recordAndShowVisit();
  startSessionTimer();

  // Animate module rows in
  staggerEntrance(app, '.module-row', 40);

  // Animate progress bar from 0
  requestAnimationFrame(() => {
    const fill = app.querySelector<HTMLElement>('.progress-fill');
    if (fill) {
      fill.style.transition = 'none';
      fill.style.width = '0%';
      requestAnimationFrame(() => {
        fill.style.transition = 'width 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        fill.style.width = `${(done / total) * 100}%`;
      });
    }
  });
}

function bindModuleRows(): void {
  app.querySelectorAll<HTMLElement>('.module-row[data-ready="true"]').forEach((row) => {
    row.addEventListener('click', () => navigate(`/module/${row.dataset.id!}`));
  });
}

function renderIndexRow(m: (typeof MODULE_INDEX)[number]): string {
  const done = m.ready && isComplete(m.id);
  let trailing = '<span class="badge-soon">Coming soon</span>';
  if (m.ready) {
    trailing = done ? '<span class="module-check">✓</span>' : '<span class="module-go">▸</span>';
  }
  return `
    <div class="module-row anim-stagger ${done ? 'module-row-done' : ''}" data-id="${m.id}" data-ready="${m.ready}">
      <span class="module-num">${m.number}</span>
      <div class="module-info">
        <h3>${m.title}</h3>
        <p>${m.summary}</p>
      </div>
      ${trailing}
    </div>
  `;
}

// ── Module view ──────────────────────────────────────────────

async function openModule(id: string): Promise<void> {
  const content = await loadModuleContent(id);
  if (!content) {
    navigate('/');
    return;
  }
  await renderModule(app, content);
  app.querySelector<HTMLElement>('#backBtn')!.addEventListener('click', () => navigate('/'));

  const footer = document.createElement('div');
  footer.className = 'complete-footer';
  app.appendChild(footer);
  renderCompleteButton(footer, id);
}

function renderCompleteButton(footer: HTMLElement, moduleId: string): void {
  const done = isComplete(moduleId);
  footer.innerHTML = `
    <button class="complete-btn ${done ? 'complete-btn-done' : ''}" id="completeBtn">
      ${done ? '✓ Completed — tap to unmark' : 'Mark module complete'}
    </button>
  `;
  footer.querySelector<HTMLButtonElement>('#completeBtn')!.addEventListener('click', () => {
    toggleComplete(moduleId);
    renderCompleteButton(footer, moduleId);
  });
}

// ── Contact ──────────────────────────────────────────────────

function renderContact(): void {
  app.innerHTML = `
    <button class="back-btn" id="backBtn">← All modules</button>
    <div class="module-header">
      <span class="eyebrow">CONTACT</span>
      <h1>Get in touch</h1>
      <p class="sub">Found a bug, have a suggestion, or just want to say hi? This goes straight to my inbox.</p>
    </div>
    <form id="contactForm" class="contact-form">
      <label class="field-label" for="cf-name">Name</label>
      <input class="field-input" id="cf-name" name="name" type="text" autocomplete="name" />

      <label class="field-label" for="cf-email">Email <span class="optional">(optional, so I can reply)</span></label>
      <input class="field-input" id="cf-email" name="email" type="email" autocomplete="email" />

      <label class="field-label" for="cf-message">Message *</label>
      <textarea class="field-input field-textarea" id="cf-message" name="message" rows="5" required></textarea>

      <!-- Honeypot: hidden from real users via CSS, bots often fill it anyway -->
      <input class="hp-field" id="cf-hp" name="honeypot" type="text" tabindex="-1" autocomplete="off" />

      <button class="submit-btn" type="submit">Send message</button>
      <div id="contactStatus" class="contact-status"></div>
    </form>
  `;

  app.querySelector<HTMLElement>('#backBtn')!.addEventListener('click', () => navigate('/'));

  const form = app.querySelector<HTMLFormElement>('#contactForm')!;
  const statusEl = app.querySelector<HTMLElement>('#contactStatus')!;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector<HTMLButtonElement>('.submit-btn')!;
    submitBtn.disabled = true;
    statusEl.textContent = '';
    statusEl.className = 'contact-status';

    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
      honeypot: (form.elements.namedItem('honeypot') as HTMLInputElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.status === 'ok') {
        statusEl.textContent = 'Sent — thanks, I’ll get back to you.';
        statusEl.className = 'contact-status status-ok';
        form.reset();
      } else {
        statusEl.textContent = data.error ?? 'Something went wrong — try again in a moment.';
        statusEl.className = 'contact-status status-error';
      }
    } catch (err) {
      console.error('Contact form submission failed:', err);
      statusEl.textContent = 'Could not reach the server — try again in a moment.';
      statusEl.className = 'contact-status status-error';
    } finally {
      submitBtn.disabled = false;
    }
  });
}

// ── Visit counter ────────────────────────────────────────────

async function recordAndShowVisit(): Promise<void> {
  const counterEl = document.querySelector<HTMLSpanElement>('#counter-value');
  if (!counterEl) return;
  try {
    const res = await fetch('/api/visits', { method: 'POST' });
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data = await res.json();
    counterEl.textContent = String(data.count);
  } catch (err) {
    counterEl.textContent = 'unavailable';
    console.error('Visit counter request failed:', err);
  }
}

// ── Session timer ────────────────────────────────────────────

function startSessionTimer(): void {
  updateSessionDisplay();
  sessionTimer = setInterval(updateSessionDisplay, 60_000);
}

function stopSessionTimer(): void {
  if (sessionTimer) {
    clearInterval(sessionTimer);
    sessionTimer = null;
  }
}

function updateSessionDisplay(): void {
  const el = document.querySelector<HTMLSpanElement>('#session-value');
  if (!el) return;
  const mins = Math.floor((Date.now() - sessionStart) / 60_000);
  el.textContent = mins < 1 ? '<1 min' : `${mins} min`;
}

// ── Boot ─────────────────────────────────────────────────────

route(location.pathname);
