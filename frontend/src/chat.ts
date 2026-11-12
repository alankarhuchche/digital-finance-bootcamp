import type { ContentBlock } from './content/types';
import { gbtdHookPlainText, gbtdScenePlainText, useCaseAtlasPlainText } from './data/gbtdStoryText';

interface ChatMsg {
  role: 'user' | 'bot';
  text: string;
}

let chatContainer: HTMLElement | null = null;

export function destroyChatWidget(): void {
  if (chatContainer) {
    chatContainer.remove();
    chatContainer = null;
  }
}

// Opens the panel with an editable question; the visitor still chooses to send it.
export function openChatWithQuestion(question: string): boolean {
  if (!chatContainer) return false;
  const panel = chatContainer.querySelector<HTMLElement>('#chatPanel');
  const fab = chatContainer.querySelector<HTMLElement>('#chatFab');
  const input = chatContainer.querySelector<HTMLInputElement>('#chatInput');
  if (!panel || !fab || !input) return false;
  panel.classList.add('chat-panel-open');
  fab.classList.add('chat-fab-hidden');
  input.value = question;
  input.focus();
  return true;
}

export function renderChatWidget(
  parent: HTMLElement,
  moduleId: string,
  moduleTitle: string,
  blocks: ContentBlock[]
): void {
  destroyChatWidget();

  const messages: ChatMsg[] = [];
  const moduleContent = extractPlainText(blocks);

  chatContainer = document.createElement('div');
  chatContainer.className = 'chat-container';
  chatContainer.innerHTML = `
    <button class="chat-fab" id="chatFab" aria-label="Ask a question">?</button>
    <div class="chat-panel" id="chatPanel">
      <div class="chat-panel-header">
        <span class="chat-panel-title">Ask about this module</span>
        <button class="chat-close" id="chatClose">✕</button>
      </div>
      <div class="chat-messages" id="chatMessages">
        <div class="chat-msg chat-msg-bot">Ask me anything about <strong>${moduleTitle}</strong>. I'll answer based on this topic's content.</div>
      </div>
      <div class="chat-input-row">
        <input class="chat-input" id="chatInput" type="text" placeholder="Type a question…" autocomplete="off" maxlength="1000" />
        <button class="chat-send" id="chatSend">→</button>
      </div>
    </div>
  `;
  parent.appendChild(chatContainer);

  const fab = chatContainer.querySelector<HTMLElement>('#chatFab')!;
  const panel = chatContainer.querySelector<HTMLElement>('#chatPanel')!;
  const closeBtn = chatContainer.querySelector<HTMLElement>('#chatClose')!;
  const messagesEl = chatContainer.querySelector<HTMLElement>('#chatMessages')!;
  const input = chatContainer.querySelector<HTMLInputElement>('#chatInput')!;
  const sendBtn = chatContainer.querySelector<HTMLElement>('#chatSend')!;

  fab.addEventListener('click', () => {
    panel.classList.add('chat-panel-open');
    fab.classList.add('chat-fab-hidden');
    input.focus();
  });

  closeBtn.addEventListener('click', () => {
    panel.classList.remove('chat-panel-open');
    fab.classList.remove('chat-fab-hidden');
  });

  async function send() {
    const q = input.value.trim();
    if (!q) return;

    input.value = '';
    messages.push({ role: 'user', text: q });
    appendMsg(messagesEl, 'user', q);

    const typingEl = appendMsg(messagesEl, 'bot', '');
    typingEl.innerHTML = '<span class="chat-typing"><span>.</span><span>.</span><span>.</span></span>';

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, moduleTitle, moduleContent, question: q }),
      });
      if (res.status === 503) {
        typingEl.textContent = 'Chat is not available in this environment yet. The rest of the guide is still available.';
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return;
      }
      if (res.status === 502) {
        typingEl.textContent = 'Chat is temporarily unavailable because the AI model is not available. The rest of the guide is still available.';
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return;
      }
      if (!res.ok) {
        typingEl.textContent = 'Could not reach the server — try again.';
        messagesEl.scrollTop = messagesEl.scrollHeight;
        return;
      }
      const data = await res.json();
      const answer = data.answer ?? 'No response.';
      messages.push({ role: 'bot', text: answer });
      typingEl.textContent = answer;
    } catch {
      typingEl.textContent = 'Could not reach the server — try again.';
    }
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') send();
  });
}

function appendMsg(container: HTMLElement, role: 'user' | 'bot', text: string): HTMLElement {
  const el = document.createElement('div');
  el.className = `chat-msg chat-msg-${role}`;
  el.textContent = text;
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
  return el;
}

function extractPlainText(blocks: ContentBlock[]): string {
  const parts: string[] = [];
  for (const block of blocks) {
    if ('heading' in block && block.heading) parts.push(block.heading);
    if (block.kind === 'chapter') {
      parts.push(`Chapter ${block.data.num}: ${block.data.title}.${block.data.job ? ' ' + block.data.job : ''}`);
    } else if (block.kind === 'status-cards') {
      for (const card of block.data.cards) parts.push(`${card.title} (${card.status}): ${stripHtml(card.body)}`);
    } else if (block.kind === 'gbtd-hook') {
      parts.push(gbtdHookPlainText(block.data));
    } else if (block.kind === 'gbtd-scene') {
      parts.push(gbtdScenePlainText(block.data));
    } else if (block.kind === 'usecase-atlas') {
      parts.push(useCaseAtlasPlainText(block.data));
    } else if (block.kind === 'text') {
      parts.push(stripHtml(block.body));
    } else if (block.kind === 'matrix' && 'data' in block) {
      const d = block.data;
      for (const item of d.items) {
        parts.push(`${item.label}: ${item.values.join(', ')}`);
      }
    } else if (block.kind === 'case' && 'data' in block) {
      const d = block.data;
      parts.push(d.title, d.whatHappened, d.whyItMatters);
    } else if (block.kind === 'scale' && 'data' in block) {
      for (const item of block.data.items) {
        parts.push(`${item.label}: $${item.value}B${item.detail ? ' — ' + item.detail : ''}`);
      }
    }
  }
  return parts.join('\n').substring(0, 8000);
}

function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent ?? '';
}
