import './style.css';
import { MODULE_INDEX, loadModuleContent } from './content/registry';
import { renderModule } from './content/render';
import { isComplete, toggleComplete, completedCount } from './progress';

const app = document.querySelector<HTMLDivElement>('#app')!;

function renderIndex(): void {
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
      <button class="contact-link" id="contactLink">\u2709 Get in touch</button>
      <div class="counter-box">
        <span class="counter-label">Visits recorded</span>
        <span id="counter-value" class="counter-value">\u2014</span>
      </div>
    </header>
    <div class="module-list">
      ${MODULE_INDEX.map(renderIndexRow).join('')}
    </div>
  `;

  app.querySelectorAll<HTMLElement>('.module-row[data-ready="true"]').forEach((row) => {
    row.addEventListener('click', () => openModule(row.dataset.id!));
  });

  app.querySelector<HTMLElement>('#contactLink')!.addEventListener('click', renderContact);

  recordAndShowVisit();
}

function renderIndexRow(m: (typeof MODULE_INDEX)[number]): string {
  const done = m.ready && isComplete(m.id);
  let trailing = '<span class="badge-soon">Coming soon</span>';
  if (m.ready) {
    trailing = done ? '<span class="module-check">\u2713</span>' : '<span class="module-go">\u25b8</span>';
  }
  return `
    <div class="module-row ${done ? 'module-row-done' : ''}" data-id="${m.id}" data-ready="${m.ready}">
      <span class="module-num">${m.number}</span>
      <div class="module-info">
        <h3>${m.title}</h3>
        <p>${m.summary}</p>
      </div>
      ${trailing}
    </div>
  `;
}

async function openModule(id: string): Promise<void> {
  const content = await loadModuleContent(id);
  if (!content) {
    renderIndex();
    return;
  }
  await renderModule(app, content);
  app.querySelector<HTMLElement>('#backBtn')!.addEventListener('click', renderIndex);

  // Completion toggle, appended after the module's own content.
  const footer = document.createElement('div');
  footer.className = 'complete-footer';
  app.appendChild(footer);
  renderCompleteButton(footer, id);
}

function renderCompleteButton(footer: HTMLElement, moduleId: string): void {
  const done = isComplete(moduleId);
  footer.innerHTML = `
    <button class="complete-btn ${done ? 'complete-btn-done' : ''}" id="completeBtn">
      ${done ? '\u2713 Completed \u2014 tap to unmark' : 'Mark module complete'}
    </button>
  `;
  footer.querySelector<HTMLButtonElement>('#completeBtn')!.addEventListener('click', () => {
    toggleComplete(moduleId);
    renderCompleteButton(footer, moduleId);
  });
}

function renderContact(): void {
  app.innerHTML = `
    <button class="back-btn" id="backBtn">\u2190 All modules</button>
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

  app.querySelector<HTMLElement>('#backBtn')!.addEventListener('click', renderIndex);

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
        statusEl.textContent = 'Sent \u2014 thanks, I\u2019ll get back to you.';
        statusEl.className = 'contact-status status-ok';
        form.reset();
      } else {
        statusEl.textContent = data.error ?? 'Something went wrong \u2014 try again in a moment.';
        statusEl.className = 'contact-status status-error';
      }
    } catch (err) {
      console.error('Contact form submission failed:', err);
      statusEl.textContent = 'Could not reach the server \u2014 try again in a moment.';
      statusEl.className = 'contact-status status-error';
    } finally {
      submitBtn.disabled = false;
    }
  });
}

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

renderIndex();
