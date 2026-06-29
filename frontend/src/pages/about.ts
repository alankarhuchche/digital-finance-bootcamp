export function renderAboutPage(
  app: HTMLElement,
  navigate: (path: string) => void
): void {
  document.title = 'About — Banking Rails to Digital Finance';

  app.innerHTML = `
    <button class="back-btn" id="backBtn">← All topics</button>
    <div class="topic-header">
      <span class="eyebrow">About</span>
      <h1>Banking Rails to Digital Finance</h1>
    </div>

    <div class="about-body">
      <section class="about-section">
        <h2 class="block-heading">Who wrote this</h2>
        <p class="prose">This reference is written from the perspective of a banking technology practitioner working across payments platforms and digital assets.</p>
        <p class="prose" style="color: var(--text-dim); font-style: italic;">LinkedIn profile to be added before public launch.</p>
      </section>

      <section class="about-section">
        <h2 class="block-heading">Why this exists</h2>
        <p class="prose">There is a lot of content on DLT, CBDCs and crypto markets. There is less that explains how these ideas compare with the operational reality of cards, real-time payments, SWIFT, correspondent banking, settlement, controls and reconciliation.</p>
        <p class="prose">This reference bridges that gap — combining public research, regulatory material and market data with the perspective of someone who works with payment rails and digital asset infrastructure day to day.</p>
      </section>

      <section class="about-section">
        <h2 class="block-heading">Methodology</h2>
        <p class="prose">The content combines public research, regulatory material, market data, real-world payment rail mechanics and practitioner judgement. Sources are cited within each topic. Case studies include verification dates.</p>
      </section>

      <section class="about-section">
        <h2 class="block-heading">Data snapshot</h2>
        <p class="prose">Content accurate as of <strong>June 2026</strong>. Market data, regulatory milestones and project statuses carry individual "as of" dates. Intended for quarterly refresh.</p>
      </section>

      <section class="about-section">
        <h2 class="block-heading">Get in touch</h2>
        <p class="prose">Found something wrong, have a suggestion, or want to discuss? <a href="/contact" class="about-link" id="aboutContact">Send a message</a>.</p>
      </section>
    </div>
  `;

  app.querySelector<HTMLElement>('#backBtn')!.addEventListener('click', () => navigate('/'));
  app.querySelector<HTMLElement>('#aboutContact')!.addEventListener('click', (e) => {
    e.preventDefault();
    navigate('/contact');
  });
}
