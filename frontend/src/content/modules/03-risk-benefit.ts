import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'risk-benefit',
  number: '03',
  title: 'Who actually carries the risk',
  summary: 'The same instrument looks different to a customer, a bank, and a central bank.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `So far we've shown what each instrument is. This module asks who actually cares, and why — because a stablecoin and a CBDC sit in very different positions depending on whether you're a customer, a commercial bank, a central bank, or an entire economy. Positions below are illustrative, not measured data — the point is the relative pattern, not the exact coordinates. Tap each stakeholder to read their specific concern.`,
    },
    {
      kind: 'scatter',
      heading: 'Stablecoins, by stakeholder',
      data: {
        axisX: '\u2190 LOWER RISK TO THIS STAKEHOLDER          HIGHER RISK \u2192',
        axisY: 'benefit to this stakeholder \u2191',
        points: [
          {
            key: 'customer', label: 'Customer', x: 55, y: 80, color: '#E8A33D',
            detail: { tag: 'Customer', title: 'Gets convenience, loses a safety net', fields: [
              { k: 'Benefit', v: '24/7 settlement, easy cross-border/dollar access' },
              { k: 'Risk', v: 'No deposit insurance \u2014 your claim is on a private company' },
            ] },
          },
          {
            key: 'bank', label: 'Commercial bank', x: 80, y: 25, color: '#7AA7D9',
            detail: { tag: 'Commercial bank', title: 'Funding risk, modest upside', fields: [
              { k: 'Benefit', v: 'Some fee income if it offers stablecoin access itself' },
              { k: 'Risk', v: 'Deposits leaving the balance sheet means less to lend' },
            ] },
          },
          {
            key: 'centralbank', label: 'Central bank', x: 85, y: 10, color: '#5FB3A3',
            detail: { tag: 'Central bank', title: 'Loses visibility and control', fields: [
              { k: 'Benefit', v: 'Minimal \u2014 it is not the issuer' },
              { k: 'Risk', v: 'Reduced visibility into money supply and payment flows; part of why MiCA caps "significant" tokens' },
            ] },
          },
          {
            key: 'economy', label: 'Economy', x: 90, y: 15, color: '#E0726B',
            detail: { tag: 'Economy / country', title: 'Dollarization risk in smaller economies', fields: [
              { k: 'Benefit', v: 'Faster remittances, dollar access where local currency is unstable' },
              { k: 'Risk', v: 'A foreign stablecoin becoming the de facto medium of exchange is functional dollarization \u2014 a real loss of monetary sovereignty' },
            ] },
          },
        ],
      },
    },
    {
      kind: 'scatter',
      heading: 'CBDC, by stakeholder',
      data: {
        axisX: '\u2190 LOWER RISK TO THIS STAKEHOLDER          HIGHER RISK \u2192',
        axisY: 'benefit to this stakeholder \u2191',
        points: [
          {
            key: 'customer', label: 'Customer', x: 15, y: 75, color: '#E8A33D',
            detail: { tag: 'Customer', title: 'Zero counterparty risk, less privacy than cash', fields: [
              { k: 'Benefit', v: 'Direct central bank claim, no counterparty risk at all' },
              { k: 'Risk', v: 'Potentially less private than cash \u2014 the issuer can see transaction activity' },
            ] },
          },
          {
            key: 'bank', label: 'Commercial bank', x: 65, y: 20, color: '#7AA7D9',
            detail: { tag: 'Commercial bank', title: 'The fast-bank-run risk, deliberately capped', fields: [
              { k: 'Benefit', v: 'Minimal direct benefit' },
              { k: 'Risk', v: 'A CBDC with no caps could drain deposits fast \u2014 exactly why pilots like the Bank of England\u2019s Digital Pound Lab discuss holding caps (\u00a310,000\u2013\u00a320,000 range under discussion)' },
            ] },
          },
          {
            key: 'centralbank', label: 'Central bank', x: 20, y: 80, color: '#5FB3A3',
            detail: { tag: 'Central bank', title: 'A new rail, on its own terms', fields: [
              { k: 'Benefit', v: 'A direct, programmable retail payment rail; monetary sovereignty stays intact' },
              { k: 'Risk', v: 'Takes on real operational and political weight running consumer-facing infrastructure' },
            ] },
          },
          {
            key: 'economy', label: 'Economy', x: 20, y: 70, color: '#E0726B',
            detail: { tag: 'Economy / country', title: 'Reinforces sovereignty, if well designed', fields: [
              { k: 'Benefit', v: 'Strengthens monetary sovereignty \u2014 the opposite effect of a foreign stablecoin\u2019s dollarization risk' },
              { k: 'Risk', v: 'Design matters a lot \u2014 a poorly designed CBDC can still destabilize deposits domestically' },
            ] },
          },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'Why this matters going forward',
      body: `Notice the pattern: stablecoins push risk toward banks/central banks/economies while concentrating benefit on the customer; a well-designed CBDC tends to do the opposite. Every regulation you'll meet later \u2014 MiCA's reserve rules, transaction caps on "significant" tokens, the GENIUS Act's licensing requirements \u2014 is one of these four stakeholders trying to protect their own position. Once you can name which stakeholder a rule is protecting, the rule stops looking arbitrary.`,
    },
  ],
};

export default content;
