import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'existing-rails',
  number: '01',
  title: 'The existing rails',
  summary: 'SWIFT, RTGS, correspondent banking — the baseline this is all responding to.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      heading: 'Why start here',
      body: `Almost everything in digital finance gets pitched as solving a problem with today's payment rails. That pitch only makes sense if you know what today's rails actually do — and where they're genuinely slow, costly, or fragile. This module is the "before" picture.`,
    },
    {
      kind: 'flow',
      heading: 'How a cross-border payment moves today',
      data: {
        viewBox: '0 0 320 200',
        boxes: [
          { id: 'payer', x: 10, y: 10, w: 130, h: 44, caption: 'PAYER\'S BANK', value: 'Sends instruction' },
          { id: 'benef', x: 180, y: 10, w: 130, h: 44, caption: 'BENEFICIARY\'S BANK', value: 'Credits account' },
          { id: 'swift', x: 95, y: 95, w: 130, h: 44, caption: 'SWIFT MESSAGE', value: 'Via correspondents', valueColor: '#7AA7D9' },
        ],
        paths: [
          { d: 'M75,54 L75,117 L160,117', animated: true, dotColor: '#E8A33D' },
          { d: 'M245,54 L245,117 L225,117' },
        ],
        caption: 'No money actually "travels" in the SWIFT message — it carries instructions. Settlement happens through a chain of correspondent banks\' own accounts with each other, often more than one hop.',
      },
    },
    {
      kind: 'matrix',
      heading: 'Comparing the major rail types',
      data: {
        columns: ['Typical speed', 'Operating hours', 'Cross-border?', 'Settlement finality'],
        items: [
          { id: 'swift', label: 'SWIFT / correspondent', color: '#7AA7D9', values: ['1\u20133 business days', 'Bank hours, cut-offs apply', 'Yes \u2014 core use case', 'Final, but multi-hop'] },
          { id: 'rtgs', label: 'Domestic RTGS (e.g. CHAPS)', color: '#5FB3A3', values: ['Same day, near real-time', 'Extended, not 24/7', 'No \u2014 domestic only', 'Immediate, irrevocable'] },
          { id: 'card', label: 'Card networks', color: '#E8A33D', values: ['Seconds (auth), T+1\u20132 (settle)', '24/7 authorization', 'Yes, with FX markup', 'Auth fast, settlement delayed'] },
          { id: 'ach', label: 'ACH / Faster Payments', color: '#C792E8', values: ['Seconds to next-day', 'Mostly 24/7 (newer schemes)', 'Limited, scheme-dependent', 'Final once cleared'] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'The friction points worth remembering',
      body: `Five things to keep in your head as you go through later modules, because almost every "why bother" question comes back to one of these: <b>speed</b> (multi-day settlement for cross-border), <b>cost</b> (multiple correspondent fees plus FX spread), <b>operating hours</b> (cut-off times, weekends, holidays), <b>reconciliation</b> (every bank in the chain keeps its own ledger, reconciled after the fact), and <b>finality</b> (a payment can be "sent" without being truly final for some time). Later modules on settlement and DvP come back to this exact list.`,
    },
  ],
};

export default content;
