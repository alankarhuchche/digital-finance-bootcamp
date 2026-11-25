import {
  CORRIDOR_PRESETS, DEFAULT_CONDITIONS, DEFAULT_FEES, FEE_LIMITS, ROUTES,
  type FeeInputs, type JourneyConditions, type RouteId,
} from './journey.ts';

// The controls and the URL accept the same values.
export const CONDITION_CONTROLS = {
  objective: { label: 'Supplier needs', options: [
    { value: 'local', label: 'Local currency in its bank' }, { value: 'tokens', label: 'Dollar tokens in its wallet' },
  ] },
  bankReach: { label: 'Banks and payment firms', options: [
    { value: 'normal', label: 'Serve this corridor' }, { value: 'withdrawn', label: 'Have withdrawn' },
  ] },
  wallet: { label: 'Supplier’s stablecoin wallet', options: [
    { value: 'none', label: 'None' }, { value: 'hosted', label: 'At an exchange' },
  ] },
  offramp: { label: 'Licensed off-ramp in the destination', options: [
    { value: 'liquid', label: 'Funded' }, { value: 'thin', label: 'Short of cash' }, { value: 'none', label: 'None' },
  ] },
  localRail: { label: 'Destination payout system', options: [
    { value: 'instant', label: 'Instant, 24/7' }, { value: 'hours', label: 'Banking hours' },
  ] },
  when: { label: 'Business presses send', options: [
    { value: 'weekday', label: 'Tue 10:00' }, { value: 'evening', label: 'Fri 18:00' }, { value: 'weekend', label: 'Sat 11:00' },
  ] },
  screening: { label: 'Payee screening', options: [
    { value: 'clear', label: 'Clear' }, { value: 'review', label: 'Possible match' },
  ] },
} satisfies { [K in keyof JourneyConditions]: { label: string; options: { value: JourneyConditions[K]; label: string }[] } };

export const conditionKeys = Object.keys(CONDITION_CONTROLS) as (keyof JourneyConditions)[];
const feeKeys = Object.keys(FEE_LIMITS) as (keyof FeeInputs)[];

export interface JourneySelection {
  view: RouteId | 'compare';
  conditions: JourneyConditions;
  fees: FeeInputs;
  step: number; // 0 is the opening position. Numbered payment steps start at 1.
}

export function matchingPreset(conditions: JourneyConditions) {
  return CORRIDOR_PRESETS.find(p => conditionKeys.every(key => p.conditions[key] === conditions[key]));
}

export function readJourneySelection(query: URLSearchParams): JourneySelection {
  const route = ROUTES.find(r => r.id === query.get('view'));
  const view = query.get('view') === 'compare' ? 'compare' : route?.id ?? 'sandwich';
  const preset = CORRIDOR_PRESETS.find(p => p.id === query.get('scenario'));
  const conditions = { ...(preset?.conditions ?? DEFAULT_CONDITIONS) };
  for (const key of conditionKeys) {
    const choice = CONDITION_CONTROLS[key].options.find(option => option.value === query.get(key));
    if (choice) Object.assign(conditions, { [key]: choice.value });
  }
  const fees = { ...DEFAULT_FEES };
  for (const key of feeKeys) {
    const raw = query.get(key);
    if (!raw?.trim()) continue;
    const value = Number(raw);
    const { min, max, step } = FEE_LIMITS[key];
    if (Number.isFinite(value) && value >= min && value <= max) {
      fees[key] = Number((Math.round(value / step) * step).toFixed(2));
    }
  }
  const step = Number(query.get('step'));
  return { view, conditions, fees, step: view !== 'compare' && Number.isSafeInteger(step) && step > 0 ? step : 0 };
}

export function writeJourneySelection(query: URLSearchParams, selection: JourneySelection): void {
  for (const key of ['view', 'scenario', 'step', ...conditionKeys, ...feeKeys]) query.delete(key);
  query.set('view', selection.view);
  const preset = matchingPreset(selection.conditions);
  if (preset) {
    query.set('scenario', preset.id);
  } else {
    for (const key of conditionKeys) {
      if (selection.conditions[key] !== DEFAULT_CONDITIONS[key]) query.set(key, selection.conditions[key]);
    }
  }
  for (const key of feeKeys) {
    if (selection.fees[key] !== DEFAULT_FEES[key]) query.set(key, String(selection.fees[key]));
  }
  if (selection.view !== 'compare' && selection.step > 0) query.set('step', String(selection.step));
}
