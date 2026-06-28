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
      body: `Module 07 covered CBDC mechanics. This module is the atlas \u2014 a real, sourced map of who's actually live, piloting, researching, or has deliberately deprioritized a CBDC, plus the major cross-border and consortium projects running alongside them. Tap a pin for that country's status.`,
    },
    {
      kind: 'map',
      data: {
        initiatives: [
          { country: 'Bahamas', region: 'Americas', status: 'live', name: 'Sand Dollar (since 2020)' },
          { country: 'Jamaica', region: 'Americas', status: 'live', name: 'JAM-DEX' },
          { country: 'Nigeria', region: 'Middle East & Africa', status: 'live', name: 'eNaira (since 2021)' },
          { country: 'China', region: 'Asia-Pacific', status: 'pilot', name: 'e-CNY \u2014 reclassified as deposit liability, Jan 2026' },
          { country: 'India', region: 'Asia-Pacific', status: 'pilot', name: 'e-Rupee (Digital Rupee)' },
          { country: 'Brazil', region: 'Americas', status: 'pilot', name: 'Drex \u2014 wholesale tokenized credit' },
          { country: 'Russia', region: 'Europe', status: 'pilot', name: 'Digital ruble' },
          { country: 'South Korea', region: 'Asia-Pacific', status: 'pilot', name: 'Hangang Project' },
          { country: 'Ghana', region: 'Middle East & Africa', status: 'pilot', name: 'eCedi' },
          { country: 'Eurozone', region: 'Europe', status: 'pilot', name: 'Digital euro \u2014 decision phase, 2026', coords: [463.5, 175] },
          { country: 'United Kingdom', region: 'Europe', status: 'research', name: 'Digital pound (Lab) \u2014 no decision to build taken' },
          { country: 'Sweden', region: 'Europe', status: 'research', name: 'e-krona' },
          { country: 'Japan', region: 'Asia-Pacific', status: 'research', name: 'Digital yen' },
          { country: 'Australia', region: 'Asia-Pacific', status: 'none', name: 'Retail deprioritized \u2014 wholesale research continues' },
          { country: 'United States of America', region: 'Americas', status: 'none', name: 'Retail CBDC banned under GENIUS Act (2025) \u2014 wholesale research via Project Agor\u00e1 continues' },
        ],
        crossBorderProjects: [
          { name: 'mBridge', description: 'Multi-CBDC wholesale cross-border settlement platform \u2014 the fastest-growing CBDC project globally; e-CNY makes up the large majority of settlement volume, which surged to roughly $55B as of 2026.', participants: 'BIS + multiple central banks (China, Hong Kong, Thailand, UAE, Saudi Arabia and others)' },
          { name: 'Project Agor\u00e1', description: 'Wholesale cross-border tokenization research led by the BIS and New York Fed \u2014 the main channel for continued US involvement despite the retail CBDC ban.', participants: 'BIS + 7 major central banks' },
          { name: 'RLN (formerly GBTD)', description: 'Shared ledger testing tokenized deposits across banks \u2014 the private-sector wholesale alternative to a central-bank-issued token.', participants: 'BNY, Citi, HSBC, Mastercard, Visa, Wells Fargo' },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'The pattern across this map',
      body: `Notice where activity concentrates: advanced economies outside the eurozone (Canada, Australia, Norway) have generally deprioritized retail CBDC, while emerging markets are pushing harder \u2014 often explicitly as a defensive response to dollar-backed stablecoins eroding local monetary control (the dollarization risk from Module 03). Wholesale infrastructure, not retail, is where the most serious institutional money and effort is concentrated right now.`,
    },
  ],
};

export default content;
