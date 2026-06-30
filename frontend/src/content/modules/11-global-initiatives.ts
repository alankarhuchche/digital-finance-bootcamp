import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'global-initiatives',
  number: '11',
  title: 'Global initiatives map',
  summary: 'Who is doing what, where, right now.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `The CBDC topic covered CBDC mechanics. This topic is the atlas \u2014 a real, sourced map of who's actually live, piloting, researching, or has deliberately deprioritized a CBDC, plus the major cross-border and consortium projects running alongside them. Tap a pin for that country's status.`,
    },
    {
      kind: 'map',
      data: {
        initiatives: [
          { country: 'Bahamas', region: 'Americas', status: 'live', name: 'Sand Dollar (since 2020)' },
          { country: 'Jamaica', region: 'Americas', status: 'live', name: 'JAM-DEX' },
          { country: 'Nigeria', region: 'Middle East & Africa', status: 'live', name: 'eNaira (since 2021)' },
          { country: 'China', region: 'Asia-Pacific', status: 'pilot', name: 'e-CNY \u2014 reclassified as deposit liability, Jan 2026' },
          { country: 'India', region: 'Asia-Pacific', status: 'pilot', name: 'e-Rupee (Digital Rupee) — UPI already handles 14B+ transactions/month, reducing retail CBDC urgency' },
          { country: 'Brazil', region: 'Americas', status: 'pilot', name: 'Drex \u2014 wholesale tokenized credit' },
          { country: 'Russia', region: 'Europe', status: 'pilot', name: 'Digital ruble' },
          { country: 'South Korea', region: 'Asia-Pacific', status: 'pilot', name: 'Hangang Project' },
          { country: 'Singapore', region: 'Asia-Pacific', status: 'pilot', name: 'Project Guardian — institutional DeFi and tokenized asset pilots with MAS' },
          { country: 'Ghana', region: 'Middle East & Africa', status: 'pilot', name: 'eCedi' },
          { country: 'Eurozone', region: 'Europe', status: 'pilot', name: 'Digital euro \u2014 decision phase, 2026', coords: [463.5, 175] },
          { country: 'United Kingdom', region: 'Europe', status: 'research', name: 'Digital pound (Lab) \u2014 no decision to build taken' },
          { country: 'Sweden', region: 'Europe', status: 'research', name: 'e-krona' },
          { country: 'Japan', region: 'Asia-Pacific', status: 'research', name: 'Digital yen' },
          { country: 'Australia', region: 'Asia-Pacific', status: 'none', name: 'Retail deprioritized \u2014 wholesale research continues' },
          { country: 'United States of America', region: 'Americas', status: 'none', name: 'Retail CBDC banned under GENIUS Act (2025) \u2014 wholesale research via Project Agor\u00e1 continues' },
        ],
        crossBorderProjects: [
          { name: 'mBridge', description: 'Multi-CBDC wholesale cross-border settlement platform, the fastest-growing CBDC project globally. e-CNY makes up the large majority of settlement volume, with publicly reported cumulative settlement volume in the tens of billions of dollars as of 2026.', participants: 'BIS + multiple central banks (China, Hong Kong, Thailand, UAE, Saudi Arabia and others)' },
          { name: 'Project Agor\u00e1', description: 'Wholesale cross-border tokenization research led by the BIS and New York Fed \u2014 the main channel for continued US involvement despite the retail CBDC ban.', participants: 'BIS + 7 major central banks' },
          { name: 'RLN (formerly GBTD)', description: 'Shared ledger testing tokenized deposits across banks \u2014 the private-sector wholesale alternative to a central-bank-issued token.', participants: 'BNY, Citi, HSBC, Mastercard, Visa, Wells Fargo' },
          { name: 'Project Guardian', description: 'MAS-led initiative exploring institutional DeFi \u2014 permissioned pools for tokenized bonds and FX, testing how regulated institutions can interact with DeFi protocols within compliance boundaries. Over 15 industry partners including JPMorgan, DBS, and Standard Chartered.', participants: 'Monetary Authority of Singapore + 15+ financial institutions' },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'India\'s UPI: the elephant in the room',
      body: `India's Unified Payments Interface processes over 14 billion transactions per month (as of 2026), making it the world's most successful real-time payment system. UPI already provides instant, free, interoperable digital payments to over 300 million users. This success actually reduces the urgency for a retail CBDC in India. The e-Rupee pilot has seen limited adoption precisely because UPI already solves most of the problems a retail CBDC would address. The lesson is that a well-designed existing payment system can make a CBDC redundant for domestic retail payments.`,
    },
    {
      kind: 'text',
      heading: 'The BIS Innovation Hub portfolio',
      body: `The BIS Innovation Hub runs far more than mBridge and Agora. Its broader portfolio includes Project Tourbillon (privacy-preserving CBDC), Project Sela (CBDC cybersecurity), Project Mariana (automated FX markets using AMMs for CBDCs), and Project Mandala (compliance automation for cross-border payments). These projects collectively explore every layer of the digital money stack, from privacy to compliance to market making.`,
    },
    {
      kind: 'text',
      heading: 'The pattern across this map',
      body: `Notice where activity concentrates: advanced economies outside the eurozone (Canada, Australia, Norway) have generally deprioritized retail CBDC, while emerging markets are pushing harder \u2014 often explicitly as a defensive response to dollar-backed stablecoins eroding local monetary control (the dollarization risk from the risk topic). Wholesale infrastructure, not retail, is where the most serious institutional money and effort is concentrated right now.

Several initiatives have evolved significantly since launch. China's e-CNY was reclassified as a deposit liability in January 2026, moving it closer to tokenized deposits than a pure CBDC. Brazil's Drex has pivoted heavily toward wholesale tokenized credit rather than retail payments. The trend across all projects: wholesale and institutional use cases are gaining traction, while retail CBDC adoption remains stubbornly low everywhere it has launched.

You now know who's building what, where. The next topic looks at how people actually access all of this: exchanges, custody, and market structure.`,
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'Why has India\'s retail CBDC (e-Rupee) seen limited adoption despite being in pilot?', options: ['The Reserve Bank of India canceled the program', 'India\'s UPI already processes 14B+ transactions/month and provides instant, free digital payments, solving most problems a retail CBDC would address', 'Indian banks refused to participate in the pilot', 'The technology failed during initial testing'], correctIndex: 1, explanation: 'India\'s UPI already processes 14B+ transactions/month and provides instant, free digital payments, solving most problems a retail CBDC would address.' },
          { question: 'What is Project Guardian?', options: ['A BIS cybersecurity initiative for CBDC networks', 'A Monetary Authority of Singapore-led initiative exploring institutional DeFi through permissioned pools for tokenized bonds and FX, with over 15 financial institution partners', 'A US Federal Reserve wholesale settlement project', 'A European Central Bank retail CBDC pilot'], correctIndex: 1, explanation: 'Project Guardian is a Monetary Authority of Singapore-led initiative exploring institutional DeFi through permissioned pools for tokenized bonds and FX, with over 15 financial institution partners.' },
          { question: 'How has China\'s e-CNY evolved from its original CBDC design?', options: ['It was abandoned in favor of a private stablecoin', 'It was reclassified as a deposit liability in January 2026, moving it closer to tokenized deposits than a pure central bank-issued digital currency', 'It was merged with Hong Kong\'s digital dollar', 'It remained unchanged since its 2022 pilot launch'], correctIndex: 1, explanation: 'China\'s e-CNY was reclassified as a deposit liability in January 2026, moving it closer to tokenized deposits than a pure central bank-issued digital currency.' },
        ],
      },
    },
  ],
};

export default content;
