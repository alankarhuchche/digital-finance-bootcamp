// routes.ts — "Pick the payment model": an operating-model selector.
//
// The reader describes the payment. Each model says whether it fits, fits only if
// stated prerequisites hold, or does not fit, and why. Rules are deliberately simple and
// visible so a reader can argue with them. Token design (which stablecoin), route model
// (how value travels) and partnership economics (who earns what) are kept separate.

export type Fit = 'fits' | 'conditional' | 'poor';

export interface RouteInputs {
  payer: 'business' | 'person' | 'bank';
  /** What the payee can receive into. */
  payeeHas: 'bank' | 'wallet' | 'both';
  /** What the payee needs to end up holding. */
  payeeWants: 'local' | 'dollars';
  /** What the payer starts with. */
  payerHolds: 'fiat' | 'stablecoin';
  /** Are both parties customers of the same platform or bank network? */
  shared: 'none' | 'platform' | 'bank-network';
  /** Must it complete overnight or at a weekend? */
  anyTime: boolean;
  /** Are licensed, funded crypto off-ramps established for this destination? */
  corridor: 'served' | 'thin';
  /** Do correspondent banks and payment firms still serve this destination? */
  bankReach: 'normal' | 'withdrawn';
}

export const DEFAULT_ROUTE_INPUTS: RouteInputs = {
  payer: 'business', payeeHas: 'bank', payeeWants: 'local', payerHolds: 'fiat',
  shared: 'none', anyTime: false, corridor: 'served', bankReach: 'normal',
};

export type ModelFamily = 'bank-rails' | 'stablecoin' | 'bank-token';

export interface OperatingModel {
  id: string;
  name: string;
  family: ModelFamily;
  oneLine: string;
  parties: string;
  prerequisites: string[];
  controls: string;
  failsWhen: string;
  goodFor: string;
  assess: (i: RouteInputs) => { fit: Fit; because: string[] };
}

const needsBank = (i: RouteInputs) => i.payeeHas === 'wallet';
const needsWallet = (i: RouteInputs) => i.payeeHas === 'bank';

export const MODELS: OperatingModel[] = [
  {
    id: 'correspondent', name: 'Bank transfer through correspondents', family: 'bank-rails',
    oneLine: 'SWIFT message plus settlement across nostro and vostro accounts.',
    parties: 'Sending bank, one or more correspondents, receiving bank.',
    prerequisites: ['Payee has a bank account', 'Banks in the chain process within their hours'],
    controls: 'Each bank screens; gpi tracking; returns through the same chain.',
    failsWhen: 'Wrong details trigger slow returns; cut-offs push payments to the next business day.',
    goodFor: 'Any currency and almost any destination with a bank account, including large values.',
    assess: i => {
      if (needsBank(i)) return { fit: 'poor', because: ['The payee has no bank account to credit.'] };
      if (i.bankReach === 'withdrawn') return { fit: 'poor', because: ['Correspondent banks have withdrawn from this corridor ("de-risking"), so no chain of banks will carry it.'] };
      const because = ['Reaches almost any bank account, in local currency or dollars.'];
      if (i.anyTime) return { fit: 'conditional', because: [...because, 'Cut-offs and bank hours mean overnight or weekend payments wait.'] };
      return { fit: 'fits', because };
    },
  },
  {
    id: 'psp', name: 'Payment firm with local accounts', family: 'bank-rails',
    oneLine: 'Pounds in at home, prefunded local currency out at the destination.',
    parties: 'Payment firm, its banks at both ends, the destination’s domestic payment system.',
    prerequisites: ['The firm serves this corridor', 'Payee has a bank account', 'The firm holds enough local currency'],
    controls: 'The firm screens and monitors; safeguarding of client money at home.',
    failsWhen: 'The corridor isn’t served, or the firm’s local balance runs dry before it rebalances.',
    goodFor: 'Routine business and personal payments in corridors the firm already serves.',
    assess: i => {
      if (needsBank(i)) return { fit: 'poor', because: ['The payee has no bank account to pay out to.'] };
      if (i.bankReach === 'withdrawn') return { fit: 'poor', because: ['No payment firm serves this corridor, and it needs banks at both ends to move its own money.'] };
      return { fit: i.anyTime ? 'conditional' : 'fits', because: i.anyTime
        ? ['Fast where the destination has an instant domestic system; otherwise waits for local hours.']
        : ['One conversion and a domestic payout from money already in the destination.'] };
    },
  },
  {
    id: 'instant-link', name: 'Linked instant payment systems', family: 'bank-rails',
    oneLine: 'Two countries’ instant payment systems connected, so a domestic-style payment crosses the border.',
    parties: 'Banks in both countries, both instant payment systems, a settlement and FX arrangement.',
    prerequisites: ['A live link between the two countries', 'Both banks participate', 'The amount is within the link’s limits'],
    controls: 'Each side screens under its own rules; limits per transaction.',
    failsWhen: 'No link exists for the corridor, or the payment exceeds its limits.',
    goodFor: 'Person-to-person payments in the few corridors where links are live.',
    assess: i => {
      if (needsBank(i)) return { fit: 'poor', because: ['Links connect bank accounts, not wallets.'] };
      if (i.payer === 'bank') return { fit: 'poor', because: ['Built for retail payments, not bank treasury flows.'] };
      return { fit: 'conditional', because: ['Only in corridors with a live link, and within its limits. Few UK corridors have one today.'] };
    },
  },
  {
    id: 'managed', name: 'Provider-managed stablecoin settlement', family: 'stablecoin',
    oneLine: 'Fiat in, stablecoin across, fiat out. The customer never holds a token.',
    parties: 'Provider, issuer, blockchain, licensed off-ramp partner, destination banks.',
    prerequisites: ['A licensed, funded off-ramp in the destination', 'Stablecoin inventory or issuer access', 'Local rules allow the off-ramp to pay out'],
    controls: 'Provider screens at entry; wallet screening and Travel Rule between providers; off-ramp screens at payout.',
    failsWhen: 'No licensed off-ramp, a dry local float, or a closed payout system. The token can arrive while the payee still has nothing.',
    goodFor: 'Corridors with deep dollar-stablecoin liquidity and licensed off-ramps, especially where correspondent links are thin.',
    assess: i => {
      if (needsBank(i) && i.payeeWants === 'local') return { fit: 'poor', because: ['The payout leg needs a bank account.'] };
      if (i.corridor === 'thin') return { fit: 'poor', because: ['No licensed, funded off-ramp is established. Legality and reachability can’t be assumed.'] };
      if (i.bankReach === 'withdrawn') return { fit: 'fits', because: ['Banks have left this corridor but a licensed off-ramp operates there: this route reaches payees the bank rails no longer reach.'] };
      if (i.payerHolds === 'stablecoin') return { fit: 'fits', because: ['The payer already holds stablecoins, so the first conversion disappears and only the payout leg remains.'] };
      const because = ['Pays a bank account in local currency through a partner that converts the stablecoin.'];
      if (i.anyTime) because.push('The chain runs at any hour; payout still needs a funded partner and an open domestic system.');
      return { fit: 'conditional', because: [...because, 'Two conversions and two prefunded balances: compare the all-in quote with a payment firm’s.'] };
    },
  },
  {
    id: 'psp-treasury', name: 'Payment firm settling its own treasury leg in stablecoins', family: 'stablecoin',
    oneLine: 'The customer sees an ordinary fiat payment. Behind it, the firm moves its own liquidity between countries in stablecoins.',
    parties: 'Payment firm, its banks at both ends, an issuer or market maker, a blockchain for the firm’s internal rebalancing.',
    prerequisites: ['The firm serves this corridor', 'Payee has a bank account', 'The firm can mint, buy and sell stablecoins at both ends'],
    controls: 'Customer controls are the firm’s usual ones. The token leg adds wallet custody, issuer exposure and reconciliation between the firm’s own entities.',
    failsWhen: 'The corridor isn’t served, or ramps at either end close or widen just when the firm needs to rebalance.',
    goodFor: 'Firms that want to rebalance floats at weekends without correspondent wires. A complement to fiat rails, not a rival.',
    assess: i => {
      if (needsBank(i)) return { fit: 'poor', because: ['The payout is still fiat into a bank account.'] };
      if (i.bankReach === 'withdrawn') return { fit: 'poor', because: ['A firm still needs a licensed local presence and bank accounts at the payout end.'] };
      if (i.corridor === 'thin') return { fit: 'conditional', because: ['Works as a normal payment firm; the token leg needs ramps at both ends.'] };
      return { fit: i.anyTime ? 'fits' : 'conditional', because: i.anyTime
        ? ['The firm can rebalance its own floats at any hour, so weekend payouts are less likely to wait for funding.']
        : ['The customer gets the same fiat service. The gain is in the firm’s treasury, not in the customer’s payment.'] };
    },
  },
  {
    id: 'wallet-custodial', name: 'Exchange wallet to exchange wallet', family: 'stablecoin',
    oneLine: 'Tokens move on-chain between accounts at two licensed exchanges or custodians.',
    parties: 'Two custodial providers, the issuer, the blockchain.',
    prerequisites: ['Payee has a custodial wallet', 'Both providers exchange Travel Rule data', 'Payee is content to hold dollars, or converts them'],
    controls: 'Both providers screen; Travel Rule data passes with the transfer; blockchain analytics on the addresses.',
    failsWhen: 'The payee has no wallet, needs local currency in a bank, or the receiving provider can’t accept the Travel Rule data.',
    goodFor: 'Payees who want to hold dollars, or firms moving value between their own accounts at any hour.',
    assess: i => {
      if (needsWallet(i)) return { fit: 'poor', because: ['The payee has no wallet. Opening one, then converting and withdrawing, would fall on them.'] };
      if (i.payeeWants === 'local') return { fit: 'conditional', because: ['Arrives as dollars. The payee must sell and withdraw before the invoice is paid in spendable money.'] };
      return { fit: 'fits', because: ['The payee wants dollars and holds a custodial wallet. Settles on-chain at any hour.'] };
    },
  },
  {
    id: 'unhosted', name: 'Self-custody wallet to wallet', family: 'stablecoin',
    oneLine: 'Tokens move to or from a wallet whose owner controls the keys, with no provider in between.',
    parties: 'The payer, the payee’s own wallet, the issuer, the blockchain.',
    prerequisites: ['Proof the payee owns the wallet', 'Analytics on the address and its history', 'The payer’s policy allows it'],
    controls: 'Ownership proof, wallet screening, enhanced due diligence, limits. Travel Rule data has no counterparty provider to go to.',
    failsWhen: 'Ownership can’t be shown, the address carries risk, or keys are lost. Transfers are irreversible.',
    goodFor: 'Rarely the right choice for a regulated payer. Sometimes the only way to reach a payee who uses no provider.',
    assess: i => {
      if (needsWallet(i)) return { fit: 'poor', because: ['The payee has no wallet.'] };
      if (i.payer !== 'person') return { fit: 'conditional', because: ['A regulated payer needs ownership proof and analytics on the address first, and many policies cap or prohibit it.'] };
      return { fit: 'conditional', because: ['Works technically, but mistakes are irreversible and there is no provider to recover from.'] };
    },
  },
  {
    id: 'same-platform', name: 'Transfer inside one platform', family: 'stablecoin',
    oneLine: 'Both parties hold accounts at the same exchange or custodian, which moves the balance on its own books.',
    parties: 'One provider.',
    prerequisites: ['Both parties are customers of the same provider'],
    controls: 'The provider screens both sides and keeps the records.',
    failsWhen: 'The provider fails. Both parties are exposed to the same custodian.',
    goodFor: 'Instant, free-looking transfers between customers of one platform. No blockchain transaction needed.',
    assess: i => i.shared === 'platform'
      ? { fit: 'fits', because: ['Both are on one platform, so the transfer is a book entry. Nothing needs to touch a blockchain.'] }
      : { fit: 'poor', because: ['Only works when both parties use the same provider.'] },
  },
  {
    id: 'bank-token', name: 'Tokenised deposits on a bank network', family: 'bank-token',
    oneLine: 'Bank deposits recorded as tokens, moved between clients of one bank or a shared bank platform.',
    parties: 'The bank or banks on the network; settlement between banks in central bank money or on the bank’s books.',
    prerequisites: ['Both parties bank on the same network', 'The network operates at the hours needed'],
    controls: 'Ordinary bank KYC, sanctions and monitoring. The token is still the bank’s deposit liability.',
    failsWhen: 'The payee banks outside the network.',
    goodFor: 'Treasury and large-value payments between clients of the same bank or bank network, including at weekends where offered.',
    assess: i => i.shared === 'bank-network'
      ? { fit: 'fits', because: ['Both parties are on the same bank network: a deposit moves, with no stablecoin or conversion needed.'] }
      : { fit: 'poor', because: ['Reaches only clients of the banks on the network.'] },
  },
  {
    id: 'issuer-direct', name: 'Mint and redeem with the issuer', family: 'stablecoin',
    oneLine: 'An institution sends dollars to the issuer for new tokens, or returns tokens for dollars.',
    parties: 'The institution and the issuer, through the issuer’s banks.',
    prerequisites: ['An onboarded account with the issuer', 'Issuer and US banking hours', 'Minimum sizes'],
    controls: 'The issuer’s onboarding and screening; the institution’s own controls.',
    failsWhen: 'Outside banking hours, or for anyone without an issuer account. It is a funding and cash-out tool, not a route to a third party.',
    goodFor: 'Providers and treasuries that need to create or retire tokens at par instead of buying them in the market.',
    assess: i => {
      if (i.payer === 'person') return { fit: 'poor', because: ['Issuers open direct accounts mainly to institutions.'] };
      return { fit: 'conditional', because: ['Funds a stablecoin route or cashes one out at par. It does not pay a third party on its own.', ...(i.anyTime ? ['Runs on banking hours.'] : [])] };
    },
  },
  {
    id: 'cross-chain', name: 'Moving between blockchains', family: 'stablecoin',
    oneLine: 'Issuer burn-and-mint, a bridge, a pool, or a provider paying out on the other chain.',
    parties: 'The issuer or a bridge or pool operator, both chains, sometimes a provider.',
    prerequisites: ['Know which chain the payee’s wallet is on', 'Prefer the issuer’s own mechanism where it exists'],
    controls: 'Track the transfer to finality on both chains; keep it in transit on the books until then.',
    failsWhen: 'Confirmation is delayed, a bridge is exploited, a pool runs short, or a timeout tempts someone to send again.',
    goodFor: 'Only when the payer’s tokens and the payee’s wallet sit on different chains. See the failure lab below.',
    assess: i => {
      if (needsWallet(i) || i.payerHolds !== 'stablecoin') return { fit: 'poor', because: ['Only relevant when tokens must move between chains.'] };
      return { fit: 'conditional', because: ['Needed if the payee is on a different chain. Prefer the issuer’s native burn-and-mint over a wrapped token.'] };
    },
  },
];

export function assessAll(i: RouteInputs): { model: OperatingModel; fit: Fit; because: string[] }[] {
  const rank: Record<Fit, number> = { fits: 0, conditional: 1, poor: 2 };
  return MODELS
    .map(model => ({ model, ...model.assess(i) }))
    .sort((a, b) => rank[a.fit] - rank[b.fit]);
}
