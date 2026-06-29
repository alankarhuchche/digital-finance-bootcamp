import type { QuizSpec } from '../types';

export function renderQuiz(container: HTMLElement, spec: QuizSpec): void {
  let currentIdx = 0;
  let score = 0;
  let answered = false;

  function renderQuestion() {
    const q = spec.questions[currentIdx];
    container.innerHTML = `
      <div class="quiz-card">
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width:${((currentIdx) / spec.questions.length) * 100}%"></div>
        </div>
        <div class="quiz-counter">${currentIdx + 1} / ${spec.questions.length}</div>
        <p class="quiz-question">${q.question}</p>
        <div class="quiz-options">
          ${q.options.map((opt, i) => `<button class="quiz-option" data-idx="${i}">${opt}</button>`).join('')}
        </div>
        <div class="quiz-feedback" id="quizFeedback"></div>
      </div>
    `;

    answered = false;
    const feedbackEl = container.querySelector<HTMLElement>('#quizFeedback')!;

    container.querySelectorAll<HTMLElement>('.quiz-option').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (answered) return;
        answered = true;

        const chosen = Number(btn.getAttribute('data-idx'));
        const isCorrect = chosen === q.correctIndex;
        if (isCorrect) score++;

        container.querySelectorAll<HTMLElement>('.quiz-option').forEach((b, i) => {
          b.classList.add('quiz-option-locked');
          if (i === q.correctIndex) b.classList.add('quiz-option-correct');
          if (i === chosen && !isCorrect) b.classList.add('quiz-option-wrong');
        });

        feedbackEl.innerHTML = `
          <div class="quiz-explanation ${isCorrect ? 'quiz-correct' : 'quiz-wrong'}">
            <span class="quiz-verdict">${isCorrect ? '✓ Correct' : '✗ Not quite'}</span>
            <p>${q.explanation}</p>
          </div>
          ${currentIdx < spec.questions.length - 1
            ? '<button class="quiz-next" id="quizNext">Next →</button>'
            : '<button class="quiz-next" id="quizNext">See results</button>'
          }
        `;

        container.querySelector<HTMLElement>('#quizNext')!.addEventListener('click', () => {
          currentIdx++;
          if (currentIdx < spec.questions.length) {
            renderQuestion();
          } else {
            renderResults();
          }
        });
      });
    });
  }

  function renderResults() {
    const pct = Math.round((score / spec.questions.length) * 100);
    let msg = 'Keep reviewing — you’ll get there.';
    if (pct >= 80) msg = 'Strong understanding of this module.';
    else if (pct >= 60) msg = 'Good foundation — revisit the parts you missed.';

    container.innerHTML = `
      <div class="quiz-card quiz-results">
        <div class="quiz-score-circle">
          <span class="quiz-score-number">${score}</span>
          <span class="quiz-score-total">/ ${spec.questions.length}</span>
        </div>
        <p class="quiz-score-msg">${msg}</p>
        <button class="quiz-retry" id="quizRetry">Try again</button>
      </div>
    `;

    container.querySelector<HTMLElement>('#quizRetry')!.addEventListener('click', () => {
      currentIdx = 0;
      score = 0;
      renderQuestion();
    });
  }

  renderQuestion();
}
