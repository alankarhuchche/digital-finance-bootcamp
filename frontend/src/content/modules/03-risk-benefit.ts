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
      body: `So far we\u2019ve shown what each instrument is. This topic asks who actually cares, and why \u2014 because a stablecoin and a CBDC sit in very different positions depending on whether you\u2019re a customer, a commercial bank, a central bank, or an entire economy. The two matrices below map benefits and risks by stakeholder for stablecoins and CBDCs respectively.`,
    },
    {
      kind: 'matrix',
      heading: 'Stablecoins: risk and benefit by stakeholder',
      data: {
        columns: ['Primary benefit', 'Primary risk', 'Magnitude'],
        items: [
          {
            id: 'sc-customer',
            label: 'Customer',
            color: '#E8A33D',
            values: [
              '24/7 access, easy cross-border and dollar access, DeFi yield',
              'No deposit insurance \u2014 claim on a private company. USDC depegged to $0.87 in March 2023',
              'High benefit / moderate risk',
            ],
          },
          {
            id: 'sc-bank',
            label: 'Commercial bank',
            color: '#7AA7D9',
            values: [
              'Some fee income if it offers stablecoin services; potential new payment rails',
              'Deposit disintermediation \u2014 funds leave the balance sheet. Retail deposits are ~60\u201370% of a typical retail bank\u2019s funding; even 10\u201315% outflow would force expensive wholesale funding',
              'Low benefit / high risk',
            ],
          },
          {
            id: 'sc-central',
            label: 'Central bank',
            color: '#5FB3A3',
            values: [
              'Minimal \u2014 not the issuer',
              'Reduced visibility into money supply and payment flows. A USD stablecoin circulating globally is dollar liquidity the Fed didn\u2019t create and can\u2019t directly control',
              'Minimal benefit / high risk',
            ],
          },
          {
            id: 'sc-economy',
            label: 'Economy / country',
            color: '#E0726B',
            values: [
              'Faster remittances, dollar access where local currency is unstable',
              'Functional dollarization \u2014 if a foreign stablecoin becomes the de facto medium of exchange, the country loses monetary policy transmission. Already visible in Turkey, Argentina, Nigeria',
              'Moderate benefit / very high risk for smaller economies',
            ],
          },
        ],
      },
    },
    {
      kind: 'matrix',
      heading: 'CBDC: risk and benefit by stakeholder',
      data: {
        columns: ['Primary benefit', 'Primary risk', 'Magnitude'],
        items: [
          {
            id: 'cb-customer',
            label: 'Customer',
            color: '#E8A33D',
            values: [
              'Direct central bank claim \u2014 zero counterparty risk. Digital equivalent of holding cash',
              'Privacy concerns: the issuer could see transaction activity. Holding caps (\u00A310k\u2013\u00A320k discussed in UK) limit utility as a savings vehicle',
              'High benefit / moderate risk',
            ],
          },
          {
            id: 'cb-bank',
            label: 'Commercial bank',
            color: '#7AA7D9',
            values: [
              'Potential for faster interbank settlement; could reduce correspondent banking costs',
              'Deposit drainage \u2014 the \u201Cdigital bank run\u201D risk. If uncapped, customers could move deposits to CBDC instantly. Even with caps, structural shift of deposits to CBDC would raise bank funding costs by an estimated 20\u201340 basis points',
              'Low benefit / high risk',
            ],
          },
          {
            id: 'cb-central',
            label: 'Central bank',
            color: '#5FB3A3',
            values: [
              'A programmable retail payment rail under sovereign control; preserves monetary sovereignty against foreign stablecoins',
              'Operational burden of running consumer-facing infrastructure. Political risk: CBDC perceived as government surveillance tool (a major factor in US resistance)',
              'High benefit / moderate risk',
            ],
          },
          {
            id: 'cb-economy',
            label: 'Economy / country',
            color: '#E0726B',
            values: [
              'Reinforces monetary sovereignty \u2014 the direct counter to stablecoin dollarization risk. Financial inclusion for unbanked populations',
              'A poorly designed CBDC can still destabilize deposits domestically. If banks can\u2019t lend because deposits migrated to CBDC, credit availability contracts',
              'High benefit / moderate risk if well-designed',
            ],
          },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'The disintermediation problem in numbers',
      body: `The concern that dominates central bank thinking is disintermediation: what happens if a significant share of retail deposits moves to CBDC or stablecoins? For a typical retail bank, deposits fund 60\u201370% of lending. The Bank of England\u2019s modelling suggests that even a \u00A320,000 per-person CBDC cap could shift \u00A3100\u2013\u00A3165 billion out of the banking system (roughly 8\u201313% of total UK household deposits). Banks would need to replace this funding with wholesale markets \u2014 which are more expensive, more volatile, and less sticky. The macroeconomic fear is straightforward: higher bank funding costs mean higher lending rates, which mean less credit, which means slower growth. This is why every serious CBDC proposal includes holding limits, remuneration caps (zero or negative interest on CBDC), and gradual rollout.`,
    },
    {
      kind: 'text',
      heading: 'The narrow banking concern',
      body: `Take the disintermediation worry to its logical extreme and you get \u2018narrow banking.\u2019 If everyone holds CBDC instead of bank deposits, commercial banks become pure intermediaries that borrow wholesale and lend retail \u2014 they no longer create money through lending in the way they do today. The fractional reserve model, where banks lend out most of what\u2019s deposited and thereby expand the money supply, would shrink or disappear. Central banks could step in to provide alternative funding to banks (the Bank of England has proposed a \u2018Bank of England Levy\u2019 facility), but this changes the fundamental architecture of the financial system. Whether this is a feature or a bug depends on your view of fractional reserve banking \u2014 but it\u2019s not a small change either way.`,
    },
    {
      kind: 'text',
      heading: 'Why this matters going forward',
      body: `Notice the pattern: stablecoins push risk toward banks/central banks/economies while concentrating benefit on the customer; a well-designed CBDC tends to do the opposite. Every regulation you\u2019ll meet later \u2014 MiCA\u2019s reserve rules, transaction caps on \u201Csignificant\u201D tokens, the GENIUS Act\u2019s licensing requirements \u2014 is one of these four stakeholders trying to protect their own position. Once you can name which stakeholder a rule is protecting, the rule stops looking arbitrary.\n\nThe next question is: what technology makes these alternatives possible? The next topic covers distributed ledger technology \u2014 the infrastructure underneath stablecoins, CBDCs, and tokenized deposits.`,
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          {
            question: 'What percentage of a typical retail bank\u2019s funding comes from deposits?',
            options: ['10\u201320%', '30\u201340%', '60\u201370%', '90\u201395%'],
            correctIndex: 2,
            explanation: 'Retail deposits typically fund 60\u201370% of a retail bank\u2019s lending, which is why deposit outflows to CBDC or stablecoins are an existential concern for the banking model.',
          },
          {
            question: 'What is the \u201Cnarrow banking\u201D concern with CBDC?',
            options: [
              'CBDC would only be usable at a narrow range of merchants',
              'If deposits migrate to CBDC, banks can no longer create money through fractional reserve lending',
              'CBDC would restrict monetary policy to a narrow set of tools',
              'Only a narrow group of customers would benefit from CBDC',
            ],
            correctIndex: 1,
            explanation: 'If everyone holds CBDC instead of deposits, banks lose their deposit base and can no longer expand the money supply through lending \u2014 the core mechanism of fractional reserve banking.',
          },
          {
            question: 'Why is stablecoin dollarization a bigger risk for smaller economies?',
            options: [
              'Smaller economies have weaker internet infrastructure',
              'Their currencies are more likely to be unstable, making a dollar-pegged stablecoin attractive as a replacement medium of exchange',
              'Stablecoin issuers specifically target smaller markets',
              'Smaller economies have fewer banks to distribute stablecoins',
            ],
            correctIndex: 1,
            explanation: 'In countries with high inflation or currency instability (Turkey, Argentina, Nigeria), citizens are more likely to adopt dollar stablecoins as a store of value and medium of exchange, undermining local monetary sovereignty.',
          },
        ],
      },
    },
  ],
};

export default content;
