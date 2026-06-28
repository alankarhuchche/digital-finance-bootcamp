const STORAGE_KEY = 'dfl-progress-v1';

function readSet(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    // Corrupt or inaccessible storage (e.g. private browsing) — fail soft.
    return new Set();
  }
}

function writeSet(set: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(set)));
  } catch {
    // Storage unavailable — progress just won't persist this session.
  }
}

export function isComplete(moduleId: string): boolean {
  return readSet().has(moduleId);
}

export function toggleComplete(moduleId: string): boolean {
  const set = readSet();
  const willBeComplete = !set.has(moduleId);
  if (willBeComplete) {
    set.add(moduleId);
  } else {
    set.delete(moduleId);
  }
  writeSet(set);
  return willBeComplete;
}

export function completedCount(): number {
  return readSet().size;
}
