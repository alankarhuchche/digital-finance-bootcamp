// gbtdStoryText.ts
// Plain-text versions of the GBTD topic's interactive blocks, for the site chat's
// topic context. Kept apart from the content itself so the chat bundle, which loads
// on every page, doesn't carry the GBTD copy.

import type { GbtdHookSpec, GbtdSceneSpec, UseCaseAtlasSpec } from '../types';

const strip = (html: string): string => html.replace(/<[^>]+>/g, '');

export function gbtdHookPlainText(spec: GbtdHookSpec): string {
  return spec.tabs.map(t => [
    `Who goes first: ${t.tab}. ${t.intro}`,
    ...Object.values(t.choices).map(c => strip(c.outcome)),
    strip(t.copy),
  ].join('\n')).join('\n') + '\n' + strip(spec.lens);
}

export function gbtdScenePlainText(spec: GbtdSceneSpec): string {
  return spec.steps.map(s => `${s.label}: ${s.title}. ${strip(s.body)}${s.like ? ` Like ${s.like}` : ''}${s.stops ? ` Where it stops working: ${s.stops}` : ''}`).join('\n');
}

export function useCaseAtlasPlainText(spec: UseCaseAtlasSpec): string {
  return spec.items.map(i => `${i.title} (${i.statusLabel}; ${i.reach === 'inside' ? 'inside one bank' : 'between banks'}; for ${i.audience}): ${strip(i.summary)} Today: ${i.today} Tokens add: ${i.adds} Watch: ${i.watch}`).join('\n');
}
