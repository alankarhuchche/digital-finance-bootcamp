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
        <p class="prose">I'm Alankar Huchche, a banking technology practitioner working across payments platforms and digital assets. I built this as a practitioner reference, not a course or a vendor guide.</p>
        <p class="prose"><a href="https://www.linkedin.com/in/alankar-huchche" target="_blank" rel="noopener" class="about-link">LinkedIn profile</a></p>
      </section>

      <section class="about-section">
        <h2 class="block-heading">Why this exists</h2>
        <p class="prose">Most writing on DLT, CBDCs and stablecoins treats them as a separate world from existing payment rails. They aren't. The interesting question is where SWIFT, RTGS, cards and correspondent banking actually fall short, and where tokenised settlement closes a real operational gap rather than just moving the same problem onto a different ledger.</p>
        <p class="prose">The aim is to make payment rails, settlement models, tokenised money and digital finance trade-offs easier to compare in one place, written by someone who reasons about rulebooks, liability models and reconciliation for a living, not by a journalist or an academic.</p>
      </section>

      <section class="about-section">
        <h2 class="block-heading">Methodology</h2>
        <p class="prose">Content draws on public research, regulatory publications, market data and operational experience with payment rail mechanics. Sources are cited within each topic. Case studies include verification dates so readers can judge how current the evidence is.</p>
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
