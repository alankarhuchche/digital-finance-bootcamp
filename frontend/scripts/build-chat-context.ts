// Writes the curated chat context for the Stablecoins topic into the backend's resources.
// Run: cd frontend && npm run chat-context   (Node 26 runs TypeScript directly)
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildChatContext } from '../src/content/stablecoins/chatContext.ts';

const here = dirname(fileURLToPath(import.meta.url));
const out = resolve(here, '../../backend/src/main/resources/chat-context/stablecoins.json');
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, JSON.stringify(buildChatContext(), null, 2) + '\n', 'utf8');
console.log(`Wrote ${out}`);
