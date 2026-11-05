/* Quant Strategy Lab: plugging in numbers, working backwards and estimating, each with practice. */
(function () {
  'use strict';
  const STRATEGIES = [
    { id: 'plug', name: 'Plug in numbers', when: 'Variables in the question and the choices, or percents of an unknown amount.', how: 'Choose easy numbers (such as 100 for a price, or 2 and 3 for x and y), work out the answer, then test each choice with the same numbers.', example: 'A price rises 20% and then falls 25%. Start at $100: up to $120, then down 25% to $90. Net change: −10%.', templates: ['successive', 'percentChange', 'reversePercent', 'qcSwap'] },
    { id: 'back', name: 'Work backwards', when: 'The answer choices are numbers, and the question describes a process.', how: 'Start with the middle choice and run it through the story. If it is too big, try a smaller choice; if too small, a larger one.', example: 'Ana is 9 years older than her brother; in 3 years she will be twice his age. Try 6: Ana is 15, in 3 years 18 and 9: twice. Done.', templates: ['ages', 'linear', 'system', 'ratioSplit'] },
    { id: 'est', name: 'Estimate', when: 'The choices are far apart, or a calculation is long.', how: 'Round to friendly numbers and compute roughly. Pick the choice nearest your estimate.', example: '19.8% of 403 is about 20% of 400, which is 80.', templates: ['percentOf', 'orderOps', 'mean', 'interest'] },
  ];
  const App = {
    about: 'Three strategies solve many GRE Quant questions faster than algebra: plug in numbers, work backwards from the choices, and estimate. Each lesson explains when to use the strategy, how, and a worked example, then gives generated questions where it shines.',
    how: ['Read a lesson in **Lessons**.', 'Practise that strategy in **Practice**: choose it as the topic.', 'Try the strategy even when you could solve the question directly. Speed comes from practice.'],
    tabs: [
      { id: 'lessons', label: 'Lessons', render(el) { STRATEGIES.forEach((s) => el.appendChild(SK.card(s.name, SK.h('p', {}, SK.h('strong', { text: 'When: ' }), s.when), SK.h('p', {}, SK.h('strong', { text: 'How: ' }), s.how), SK.note('Example: ' + s.example)))); } },
      { id: 'practice', label: 'Practice', render(el) {
        SK.quizStarter(el, { title: 'Strategy practice', topics: STRATEGIES.map((s) => s.name), sizes: [5, 10], make: (topic, n, seed) => {
          const s = STRATEGIES.filter((x) => topic === 'All' || x.name === topic);
          return SK.makeQuant(s.flatMap((x) => x.templates), n, seed).map((q) => Object.assign(q, { topic: STRATEGIES.find((x) => x.templates.includes(q.template)).name, explanation: 'Strategy: ' + STRATEGIES.find((x) => x.templates.includes(q.template)).name.toLowerCase() + '. ' + q.explanation }));
        }, seconds: (n) => n * 90 });
      } },
    ],
    STRATEGIES,
    checks: { 'every strategy template exists and each template belongs to one strategy': (data, assert) => {
      const all = STRATEGIES.flatMap((s) => s.templates);
      assert.equal(new Set(all).size, all.length);
      for (const t of all) assert.equal(typeof SK.QUANT[t], 'function', t);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
