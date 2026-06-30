import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'cbdc',
  number: '07',
  title: 'CBDCs',
  summary: 'Retail vs wholesale, and the real-world pilots.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `"CBDC" gets used as if it means one thing. In practice, retail and wholesale CBDC are built for completely different users and solve completely different problems. Conflating them is a common source of confusion in this space.`,
    },
    {
      kind: 'matrix',
      heading: 'Retail vs wholesale',
      data: {
        columns: ['Who uses it', 'Purpose', 'Design model', 'Example'],
        items: [
          { id: 'retail', label: 'Retail CBDC', color: '#5FB3A3', values: [`Consumers and businesses, directly`, `A direct, sovereign digital cash alternative for everyday payments`, `"Platform model" (central bank provides core ledger, private banks build wallets and customer interfaces) or "direct model" (central bank handles everything, including accounts)`, 'Bahamas Sand Dollar, Nigeria eNaira, digital pound (lab stage)'] },
          { id: 'wholesale', label: 'Wholesale CBDC', color: '#7AA7D9', values: [`Banks and financial institutions only`, `Settling large-value interbank and cross-border transactions on a shared ledger`, `Central bank operates the settlement layer, and participating banks interact through APIs or nodes`, 'Project Agora, mBridge'] },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'The privacy debate',
      body: `Privacy is the single biggest public concern about retail CBDCs, and it is legitimate. A CBDC creates a design choice that physical cash never forced: how much transaction data should the central bank be able to see?\n\nAt one extreme is full anonymity, the digital equivalent of handing someone a banknote. No one knows you spent it, including the government. At the other extreme is full visibility, where every transaction is logged and attributable, giving the state a complete picture of every citizen's spending. Most real proposals sit somewhere in the middle. Small transactions might be anonymous (the ECB's digital euro proposal suggests anonymity for offline, low-value payments), while larger transactions trigger identity checks for anti-money-laundering compliance.\n\nThe concern is not hypothetical. China's e-CNY system, the largest retail CBDC pilot by user count, operates with what officials call "controllable anonymity": anonymous to counterparties but visible to the central bank when legally required. Critics argue this creates a surveillance infrastructure that, once built, can be expanded by future policy changes regardless of initial intentions.`,
    },
    {
      kind: 'text',
      heading: 'Offline capability and programmable money',
      body: `Two design challenges separate serious CBDC projects from slideware. The first is offline payments: what happens when there is no internet? Physical cash works in a power outage. A purely online CBDC does not. Several pilots (including China's e-CNY and the ECB's digital euro prototype) are experimenting with NFC-based offline transactions using secure hardware elements in phones, essentially storing value locally on the device so two phones can transact without connectivity, then syncing with the central ledger when they reconnect. The unsolved problem is double-spending: without a live ledger check, how do you prevent someone from spending the same offline balance twice?\n\nThe second challenge is programmable money, meaning the ability to attach conditions to payments. A government subsidy that can only be spent on food. A corporate payment that releases automatically when goods clear customs. An expiring stimulus voucher that must be spent within 90 days. Programmability is technically possible with CBDCs in a way it is not with cash, but it opens a deep policy question: should money have conditions attached to it at all? Most central banks are proceeding cautiously, distinguishing between programmable payments (a user sets conditions on their own money) and programmable money (the issuer sets conditions), with the latter raising far more objections.`,
    },
    {
      kind: 'text',
      heading: `China’s e-CNY reclassification`,
      body: `China's e-CNY (digital yuan) is the largest retail CBDC pilot by transaction volume, with over 7 trillion yuan (~$1 trillion) in cumulative transactions by late 2025 across dozens of cities. In January 2026, the People's Bank of China reclassified e-CNY from a direct central bank liability to a deposit liability of the distributing commercial banks. Architecturally, this is significant: it means e-CNY now sits in the same regulatory and accounting category as an ordinary bank deposit rather than being equivalent to physical cash on the central bank's balance sheet. The practical effect is that commercial banks bear more of the operational risk and responsibility, and e-CNY deposits may eventually be eligible for deposit insurance, making it functionally closer to a tokenized deposit than to digital cash. This blurs the line between a CBDC and the tokenized deposits discussed in the Tokenization topic.`,
    },
    {
      kind: 'case',
      heading: 'A live, real-world retail CBDC',
      data: {
        title: 'The Bahamas Sand Dollar',
        dateRange: 'Live since October 2020',
        whatHappened: `The Sand Dollar is the oldest live retail CBDC anywhere, issued directly by the Central Bank of The Bahamas to a population of roughly 400,000 people spread across 700 islands. The geographic context matters: many outer islands have limited banking infrastructure, making digital payments a practical necessity rather than a policy experiment. Monthly transaction volume is roughly B$2 million, concentrated in island merchants and remittances within the archipelago, real but small relative to the broader payments system.`,
        whyItMatters: `It is proof that a retail CBDC can run in production, not just in a lab. But its modest scale after several years is also the honest counterpoint to any narrative that CBDCs are about to replace cash or bank deposits at speed. The Sand Dollar works for the specific problem it was built for (financial inclusion across a scattered island chain) but has not transformed payments even in a small economy.`,
        source: 'Atlantic Council CBDC Tracker; Central Bank of The Bahamas reporting',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'case',
      heading: `When adoption stalls: Nigeria's eNaira`,
      data: {
        title: 'Nigeria eNaira adoption challenges',
        dateRange: 'Launched October 2021',
        whatHappened: `Nigeria launched the eNaira in October 2021, making it one of the first major economies to deploy a retail CBDC. The government promoted it aggressively: offering discounts to taxi drivers and merchants who accepted eNaira, restricting ATM cash withdrawals to push digital adoption, and integrating it with the national identity system (NIN). Despite this, adoption remained low. By late 2023, fewer than 2% of Nigerians had used it. The central bank redesigned the wallet app, added NFC for feature phones, and expanded merchant incentives, but the fundamental challenge persisted: Nigerians already had mobile money and bank transfer apps they trusted, and saw no compelling reason to switch.`,
        whyItMatters: `The eNaira illustrates the hardest problem in retail CBDC design: you are not competing against nothing, you are competing against existing digital payment systems that already work. In Nigeria's case, bank transfers via apps like OPay and PalmPay, plus mobile money, already served the digital payments need. A CBDC must offer something those cannot, whether that is offline capability, cross-border interoperability, or government subsidy distribution, or adoption will lag regardless of government push.`,
        source: 'Central Bank of Nigeria reports; Brookings Institution CBDC analysis; Reuters reporting',
        verifiedAsOf: 'June 2026',
      },
    },
    {
      kind: 'text',
      heading: 'Where the real momentum is',
      body: `Outside the eurozone, advanced economies have generally been retreating from retail CBDC. Canada, Australia and Norway have all deprioritized it, while emerging markets are doing the opposite, partly as a direct response to dollar-backed stablecoins eroding monetary control. Wholesale infrastructure is where most serious central bank effort is now going, with mBridge in particular settling tens of billions of dollars in transaction volume. The Global CBDC atlas topic maps every major initiative by country in full. This topic was the mechanics, that one is the atlas.\n\nCBDCs and stablecoins are both new forms of money. But the same blockchain technology can also represent existing assets, such as deposits, bonds and fund units, on-chain. That's tokenization, and it's the next topic.`,
    },
    {
      kind: 'callout',
      heading: 'Practitioner view',
      data: {
        tone: 'reality',
        body: `The retail CBDC case is weakest exactly where real-time payments already work, in the UK, India and the eurozone. eNaira's sub-2% adoption against working mobile money is the clearest evidence. The stronger institutional case is wholesale settlement, where tokenised assets need a credible, central-bank-grade cash leg. If you're advising on CBDC strategy, separate the two conversations. They have different buyers, different risks and different timelines.`,
      },
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'What is the biggest unresolved design challenge for offline CBDC payments?', options: ['Making NFC work on older phones', 'Preventing double-spending without a live ledger check', 'Getting central bank approval for offline mode', 'Encrypting transaction data on the device'], correctIndex: 1, explanation: 'Without connectivity to the central ledger, there is no way to verify in real time that the same offline balance is not being spent twice. This double-spend problem is the core unsolved challenge.' },
          { question: `Why has Nigeria's eNaira seen low adoption despite government promotion?`, options: ['Nigerians do not have smartphones', 'The eNaira was too expensive to use', 'Existing digital payment systems (bank apps, mobile money) already served the need, and the eNaira offered no compelling advantage', 'The eNaira was only available in Lagos'], correctIndex: 2, explanation: 'Nigeria already had working digital payment options. The eNaira had to compete against established apps and habits, and without a unique advantage, adoption stalled below 2%.' },
          { question: 'What changed when China reclassified e-CNY in January 2026?', options: ['e-CNY was discontinued', 'It moved from a central bank liability to a commercial bank deposit liability, blurring the line with tokenized deposits', 'It became fully anonymous for all transactions', 'It was merged with the existing Alipay system'], correctIndex: 1, explanation: 'The reclassification made e-CNY functionally closer to a tokenized deposit than to digital cash, with commercial banks bearing more operational risk and responsibility.' },
        ],
      },
    },
  ],
};

export default content;
