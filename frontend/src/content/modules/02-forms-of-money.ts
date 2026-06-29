import type { ModuleContent } from '../types';

const content: ModuleContent = {
  id: 'forms-of-money',
  number: '02',
  title: 'Forms of money',
  summary: 'Cash, deposits, CBDC, stablecoins, tokenized deposits \u2014 one map.',
  ready: true,
  blocks: [
    {
      kind: 'text',
      body: `Every \u201Cform of money\u201D in digital finance can be compared on the same three questions: who issued it, what backs it, and if it fails \u2014 who\u2019s on the hook? Tap any card below to see the full breakdown. We now include six forms, adding e-money (the balances you hold at fintechs like Revolut or PayPal), which sits between traditional deposits and stablecoins in the risk spectrum.`,
    },
    {
      kind: 'money-cards',
      heading: 'Six forms, compared',
      data: {
        cards: [
          {
            key: 'cash', label: 'Cash', color: '#E8A33D',
            riskLevel: 8, riskLabel: 'Minimal risk', riskColor: '#5FB3A3',
            fields: [
              { k: 'Issuer', v: 'Central bank' },
              { k: 'Backing', v: 'Sovereign promise' },
              { k: 'Your claim', v: 'Legal tender' },
            ],
            detail: 'Physical cash is a direct central bank liability. No counterparty risk, no intermediary, no deposit insurance needed. The trade-off: zero yield and limited to in-person use. If you lose a banknote, it\u2019s gone \u2014 there\u2019s no recourse mechanism. But there\u2019s also no one who can freeze it, reverse it, or devalue your specific note. Physical cash settles instantly and finally, which is why it remains the benchmark that digital alternatives are measured against.',
          },
          {
            key: 'deposit', label: 'Bank deposit', color: '#7AA7D9',
            riskLevel: 22, riskLabel: 'Low risk', riskColor: '#7AA7D9',
            fields: [
              { k: 'Issuer', v: 'Commercial bank' },
              { k: 'Backing', v: 'Loans & reserves' },
              { k: 'Your claim', v: 'Insured deposit' },
            ],
            detail: 'Your deposit is a claim on the bank, not the central bank. Deposit insurance (e.g. FSCS, FDIC) covers you up to a limit. The bank earns a spread by lending your deposit out \u2014 fractional reserve in action. If your bank fails, the deposit insurance scheme (FSCS in the UK up to \u00A385,000, FDIC in the US up to $250,000) pays you out \u2014 typically within 7 working days in the UK. Above those limits, you become an unsecured creditor in the bank\u2019s insolvency.',
          },
          {
            key: 'cbdc', label: 'CBDC', color: '#5FB3A3',
            riskLevel: 8, riskLabel: 'Minimal risk', riskColor: '#5FB3A3',
            fields: [
              { k: 'Issuer', v: 'Central bank' },
              { k: 'Backing', v: 'Sovereign promise' },
              { k: 'Your claim', v: 'Direct liability' },
            ],
            detail: 'A digital version of cash \u2014 a direct central bank liability, just like physical notes. No deposit insurance needed because the issuer is the sovereign itself. Still mostly in pilot or research phase globally. Most designs use a two-tier model: the central bank issues the CBDC but distribution happens through commercial banks or payment service providers, so you wouldn\u2019t hold an account at the Bank of England directly. Holding limits (\u00A310,000\u2013\u00A320,000 range under discussion in the UK) are designed to prevent rapid deposit flight from commercial banks.',
          },
          {
            key: 'tokdep', label: 'Tokenized deposit', color: '#C792E8',
            riskLevel: 25, riskLabel: 'Low risk', riskColor: '#7AA7D9',
            fields: [
              { k: 'Issuer', v: 'Commercial bank' },
              { k: 'Backing', v: 'Same as a deposit' },
              { k: 'Your claim', v: 'Insured deposit' },
            ],
            detail: 'Identical to a regular bank deposit in legal terms \u2014 same insurance, same claim on the bank. The only difference is the record lives on blockchain rails instead of the bank\u2019s internal ledger, enabling programmability and faster settlement. The key legal point: because it remains a deposit, it\u2019s covered by existing deposit insurance and banking regulation. The bank still holds reserves, still reports to the regulator, and still owes you the face value. The blockchain rail is an implementation detail, not a change in legal substance.',
          },
          {
            key: 'emoney', label: 'E-money', color: '#9B8EC4',
            riskLevel: 35, riskLabel: 'Moderate risk', riskColor: '#E8A33D',
            fields: [
              { k: 'Issuer', v: 'Licensed e-money institution' },
              { k: 'Backing', v: 'Safeguarded funds (ring-fenced)' },
              { k: 'Your claim', v: 'Regulated, not deposit-insured' },
            ],
            detail: 'E-money is the balance in your Revolut, PayPal, or Wise account. The issuer must \u201Csafeguard\u201D your funds \u2014 hold them in a segregated account at a bank or invest in secure liquid assets \u2014 but this is not the same as deposit insurance. If the e-money institution fails, you rank ahead of general creditors because the funds are ring-fenced, but there\u2019s no government-backed guarantee of repayment. E-money is regulated under the E-Money Directive (EMD2) in the EU and the Electronic Money Regulations 2011 in the UK. This category is enormous: Revolut alone holds over \u00A315B in customer funds.',
          },
          {
            key: 'stable', label: 'Stablecoin', color: '#E0726B',
            riskLevel: 65, riskLabel: 'Higher risk', riskColor: '#E0726B',
            fields: [
              { k: 'Issuer', v: 'Private company' },
              { k: 'Backing', v: 'T-bills / cash reserves' },
              { k: 'Your claim', v: 'Unsecured' },
            ],
            detail: 'Your claim is on a private company (Tether, Circle), not a bank or sovereign. No deposit insurance. If the issuer\u2019s reserves don\u2019t match their liabilities, or if they refuse redemptions, you bear the loss. The trade-off: accessible globally, usable in DeFi, and available 24/7. Redemption works differently from a bank withdrawal: you submit tokens to the issuer, who (if operating correctly) sells reserve assets and wires you fiat \u2014 a process that can take 1\u20133 business days. Under MiCA in the EU and the proposed GENIUS Act in the US, issuers must hold 1:1 reserves in high-quality liquid assets and submit to regular audits. Tether (USDT) has ~$120B in circulation; Circle (USDC) has ~$35B (as of Q4 2024).',
          },
        ],
      },
    },
    {
      kind: 'text',
      heading: 'The singleness of money',
      body: `The BIS uses the phrase \u201Csingleness of money\u201D to describe a critical property: all forms of money within a currency should be exchangeable at par \u2014 \u00A31 in your bank account equals \u00A31 in cash equals \u00A31 in CBDC, always. This sounds obvious but it\u2019s not automatic. Stablecoins have broken par (USDT traded at $0.95 during the May 2022 Terra/Luna collapse; USDC dipped to $0.87 in March 2023 when Silicon Valley Bank failed and markets feared Circle\u2019s reserves were trapped there). Maintaining singleness requires institutional infrastructure: central bank backstops, deposit insurance, reserve requirements, and regulatory oversight. The concern with proliferating new money forms is that singleness could fracture, creating a world where different \u201Cpounds\u201D trade at different values depending on who issued them.`,
    },
    {
      kind: 'text',
      heading: 'What happens when you try to spend each one',
      body: `Cash: hand it over, done \u2014 instant, final, no intermediary. Bank deposit: your bank debits your account and sends a payment instruction (Faster Payments, CHAPS, card scheme); the merchant receives funds in their bank account after clearing. CBDC (proposed): similar UX to a bank payment, but settlement happens on the central bank\u2019s infrastructure rather than through interbank clearing. Tokenized deposit: the bank transfers a token on its blockchain rail; the receiving bank recognizes it as a deposit claim and credits the recipient. E-money: the e-money institution debits your e-wallet and instructs its safeguarding bank to pay the merchant\u2019s bank \u2014 an extra intermediary compared to a bank deposit. Stablecoin: you transfer tokens on-chain; the recipient can hold them as tokens or redeem them for fiat through the issuer \u2014 a process that takes 1\u20133 days and requires the recipient to have an account with the issuer or an exchange.`,
    },
    {
      kind: 'text',
      heading: 'The pattern worth keeping',
      body: `Every form trades off the same three things: who\u2019s on the hook if it fails, whether you earn anything for holding it, and how freely you can move it. Nothing on this map is free of all three risks at once \u2014 and almost every \u201Cwhich is safer\u201D question in later topics comes back to that tradeoff.`,
    },
    {
      kind: 'quiz',
      heading: 'Knowledge check',
      data: {
        questions: [
          { question: 'What does \u201Csingleness of money\u201D mean?', options: ['All money should be issued by a single central bank', 'All forms of money within a currency should be exchangeable at par', 'Each person should hold only one form of money', 'Money supply should be fixed at a single quantity'], correctIndex: 1, explanation: 'The BIS\u2019s singleness of money principle means \u00A31 in any form (cash, deposit, CBDC) should always equal \u00A31 in any other form.' },
          { question: 'How does e-money protection differ from deposit insurance?', options: ['E-money has stronger government guarantees', 'E-money funds are safeguarded (ring-fenced) but not covered by deposit insurance schemes like FSCS/FDIC', 'E-money is backed by central bank reserves', 'There is no difference \u2014 both offer the same protection'], correctIndex: 1, explanation: 'E-money issuers must safeguard funds in segregated accounts, but this ring-fencing is not the same as the government-backed guarantee of deposit insurance.' },
          { question: 'What happened to USDC\u2019s peg in March 2023?', options: ['It appreciated above $1 due to high demand', 'It depegged to ~$0.87 when SVB failed and markets feared Circle\u2019s reserves were trapped', 'It was permanently frozen by regulators', 'Nothing \u2014 USDC maintained its peg throughout'], correctIndex: 1, explanation: 'When Silicon Valley Bank failed, Circle had ~$3.3B of USDC reserves held there. USDC traded as low as $0.87 before recovering after the FDIC backstopped SVB deposits.' },
        ],
      },
    },
  ],
};

export default content;
