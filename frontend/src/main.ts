import './style.css';
import { MODULE_INDEX, loadModuleContent } from './content/registry';
import { renderModule } from './content/render';
import { isComplete, toggleComplete, completedCount } from './progress';
import { staggerEntrance } from './animate';
import { destroyChatWidget } from './chat';

const app = document.querySelector<HTMLDivElement>('#app')!;
const sidebar = document.querySelector<HTMLElement>('#sidebar')!;
const hamburger = document.querySelector<HTMLElement>('#hamburger')!;
const overlay = document.querySelector<HTMLElement>('#sidebarOverlay')!;

let sessionStart = Date.now();

// ── Topic categories ─────────────────────────────────────────

interface Category {
  label: string;
  ids: string[];
}

const CATEGORIES: Category[] = [
  { label: 'Foundations', ids: ['existing-rails', 'forms-of-money', 'risk-benefit', 'dlt-basics'] },
  { label: 'Instruments', ids: ['crypto-assets', 'stablecoins', 'cbdc', 'tokenization'] },
  { label: 'Markets & infrastructure', ids: ['defi', 'market-sizing', 'global-initiatives', 'market-structure', 'settlement'] },
  { label: 'Regulation & strategy', ids: ['regulation', 'bank-strategy', 'failure-modes'] },
  { label: 'Reference', ids: ['glossary'] },
];

// ── Routing ──────────────────────────────────────────────────

function navigate(path: string, pushState = true): void {
  if (pushState) history.pushState(null, '', path);
  window.scrollTo(0, 0);
  destroyChatWidget();
  closeSidebar();
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
  updateSidebarActive(path);
}

window.addEventListener('popstate', () => route(location.pathname));
window.addEventListener('navigate', ((e: CustomEvent) => navigate(e.detail)) as EventListener);

// ── Sidebar ──────────────────────────────────────────────────

function renderSidebar(): void {
  const total = MODULE_INDEX.filter(m => m.id !== 'orientation').length;
  const done = completedCount();

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <p class="sidebar-brand">Digital Finance</p>
      <h2 class="sidebar-title">Knowledge Base</h2>
    </div>
    <div class="sidebar-search">
      <input class="search-input" id="sidebarSearch" type="text" placeholder="Search topics…" autocomplete="off" />
    </div>
    <div class="progress-row">
      <span class="progress-label">${done}/${total}</span>
      <div class="progress-track-sm"><div class="progress-fill-sm" style="width:${(done / total) * 100}%"></div></div>
    </div>
    <nav class="sidebar-nav" id="sidebarNav">
      ${CATEGORIES.map(cat => `
        <div class="nav-category">${cat.label}</div>
        ${cat.ids.map(id => {
          const m = MODULE_INDEX.find(x => x.id === id);
          if (!m) return '';
          const checked = isComplete(m.id);
          return `<div class="nav-item" data-id="${m.id}" data-path="/module/${m.id}">
            <span>${m.title}</span>
            ${checked ? '<span class="nav-item-check">✓</span>' : ''}
          </div>`;
        }).join('')}
      `).join('')}
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-stats">
        <span>Session: <span id="sessionTime">&lt;1 min</span></span>
        <span id="visitCount"></span>
      </div>
      <a id="sidebarContact">Contact</a>
    </div>
  `;

  sidebar.querySelectorAll<HTMLElement>('.nav-item').forEach(item => {
    item.addEventListener('click', () => navigate(item.dataset.path!));
  });

  sidebar.querySelector<HTMLElement>('#sidebarContact')!.addEventListener('click', () => navigate('/contact'));

  const searchInput = sidebar.querySelector<HTMLInputElement>('#sidebarSearch')!;
  searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    sidebar.querySelectorAll<HTMLElement>('.nav-item').forEach(item => {
      const m = MODULE_INDEX.find(x => x.id === item.dataset.id);
      if (!m) return;
      const match = !q || m.title.toLowerCase().includes(q) || m.summary.toLowerCase().includes(q);
      item.style.display = match ? '' : 'none';
    });
    sidebar.querySelectorAll<HTMLElement>('.nav-category').forEach(cat => {
      const next = cat.nextElementSibling;
      if (!next) return;
      let hasVisible = false;
      let el = next as HTMLElement | null;
      while (el && el.classList.contains('nav-item')) {
        if (el.style.display !== 'none') hasVisible = true;
        el = el.nextElementSibling as HTMLElement | null;
      }
      cat.style.display = hasVisible || !q ? '' : 'none';
    });
  });

  startSessionTimer();
  recordVisitCount();
}

function updateSidebarActive(path: string): void {
  sidebar.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', (item as HTMLElement).dataset.path === path);
  });
}

function closeSidebar(): void {
  sidebar.classList.remove('open');
  overlay.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  overlay.classList.toggle('open');
});
overlay.addEventListener('click', closeSidebar);

// ── Index ────────────────────────────────────────────────────

function renderIndex(): void {
  app.innerHTML = `
    <div class="landing-header">
      <span class="eyebrow">Digital Finance Guide</span>
      <h1>Knowledge Base</h1>
      <p class="landing-intro">A structured guide to digital finance — CBDCs, stablecoins, DeFi, tokenization, and the infrastructure connecting them. Built to give you a clear mental model of the space, whether you're new to it or filling gaps.</p>
    </div>
    <div id="topicIndex">
      ${renderCategoryIndex('')}
    </div>
  `;

  bindTopicCards();
  staggerEntrance(app, '.topic-card', 30);

  // Re-render sidebar to update progress
  renderSidebar();
}

function renderCategoryIndex(query: string): string {
  return CATEGORIES.map(cat => {
    const topics = cat.ids
      .map(id => MODULE_INDEX.find(x => x.id === id))
      .filter((m): m is (typeof MODULE_INDEX)[number] => {
        if (!m) return false;
        if (!query) return true;
        return m.title.toLowerCase().includes(query) || m.summary.toLowerCase().includes(query);
      });

    if (topics.length === 0) return '';

    return `
      <div class="category-section">
        <div class="category-label">${cat.label}</div>
        <div class="topic-grid">
          ${topics.map(renderTopicCard).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function renderTopicCard(m: (typeof MODULE_INDEX)[number]): string {
  const done = m.ready && isComplete(m.id);
  return `
    <div class="topic-card anim-stagger ${done ? 'topic-card-done' : ''}" data-id="${m.id}" data-ready="${m.ready}">
      <div class="topic-info">
        <h3>${m.title}</h3>
        <p>${m.summary}</p>
      </div>
      ${done ? '<span class="topic-check">✓</span>' : '<span class="topic-go">▸</span>'}
    </div>
  `;
}

function bindTopicCards(): void {
  app.querySelectorAll<HTMLElement>('.topic-card[data-ready="true"]').forEach(card => {
    card.addEventListener('click', () => navigate(`/module/${card.dataset.id!}`));
  });
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
      ${done ? '✓ Explored — tap to unmark' : 'Mark as explored'}
    </button>
  `;
  footer.querySelector<HTMLButtonElement>('#completeBtn')!.addEventListener('click', () => {
    toggleComplete(moduleId);
    renderCompleteButton(footer, moduleId);
    renderSidebar();
    updateSidebarActive(location.pathname);
  });
}

// ── Contact ──────────────────────────────────────────────────

function renderContact(): void {
  app.innerHTML = `
    <button class="back-btn" id="backBtn">← All topics</button>
    <div class="module-header">
      <span class="eyebrow">Contact</span>
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

async function recordVisitCount(): Promise<void> {
  const el = sidebar.querySelector<HTMLSpanElement>('#visitCount');
  if (!el) return;
  try {
    const res = await fetch('/api/visits', { method: 'POST' });
    if (!res.ok) return;
    const data = await res.json();
    el.textContent = `${data.count} visits`;
  } catch {
    // silent
  }
}

// ── Session timer ────────────────────────────────────────────

function startSessionTimer(): void {
  updateSessionDisplay();
  setInterval(updateSessionDisplay, 60_000);
}

function updateSessionDisplay(): void {
  const el = sidebar.querySelector<HTMLSpanElement>('#sessionTime');
  if (!el) return;
  const mins = Math.floor((Date.now() - sessionStart) / 60_000);
  el.textContent = mins < 1 ? '<1 min' : `${mins} min`;
}

// ── Boot ─────────────────────────────────────────────────────

renderSidebar();
route(location.pathname);
