import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const portuguese = JSON.parse(
  await readFile(new URL('../src/locales/pt/common.json', import.meta.url), 'utf8'),
);
const english = JSON.parse(
  await readFile(new URL('../src/locales/en/common.json', import.meta.url), 'utf8'),
);

function lesson(locale, number) {
  return locale.aulas.items.find((item) => item.number === number);
}

test('substitui a apresentação por uma roda de conversa em 04/09', () => {
  const aula12 = lesson(portuguese, '12');

  assert.equal(aula12.title, 'Roda de conversa');
  assert.equal(aula12.date, '4 de setembro de 2026');
  assert.equal(aula12.dateISO, '2026-09-04');
  assert.equal(aula12.openable, false);
  assert.equal(lesson(portuguese, '12').title.includes('Apresentação'), false);
});

test('publica os materiais e o prazo da atividade da aula 13', () => {
  const aula13 = lesson(portuguese, '13');

  assert.equal(aula13.date, '11 de setembro de 2026');
  assert.equal(aula13.deadline, '20 de setembro de 2026');
  assert.equal(aula13.dateISO, '2026-09-11');
  assert.equal(aula13.canvaUrl, 'https://www.canva.com/design/DAHU1gadhaw/JCMw2QRgJII3t3jJemMcBA/edit');
  assert.equal(aula13.links[0].url, 'https://github.com/joaovictor42/data-lakehouse-101');
});

test('mantém o cronograma equivalente em inglês', () => {
  const aula12 = lesson(english, '12');
  const aula13 = lesson(english, '13');

  assert.equal(aula12.title, 'Conversation circle');
  assert.equal(aula12.date, 'September 4, 2026');
  assert.equal(aula12.dateISO, '2026-09-04');
  assert.equal(aula12.openable, false);
  assert.equal(aula13.date, 'September 11, 2026');
  assert.equal(aula13.deadline, 'September 20, 2026');
  assert.equal(aula13.canvaUrl, 'https://www.canva.com/design/DAHU1gadhaw/JCMw2QRgJII3t3jJemMcBA/edit');
  assert.equal(aula13.links[0].url, 'https://github.com/joaovictor42/data-lakehouse-101');
});

test('publica o Google Slides da aula 15 de Machine Learning', () => {
  const aula15 = lesson(portuguese, '15');

  assert.equal(aula15.embedUrl, 'https://docs.google.com/presentation/d/1wUEpi-14Cd93H2KnsbVVb1L40TttSEfo6PYy1tZ1EJo/embed');
  assert.equal(aula15.canvaUrl, 'https://docs.google.com/presentation/d/1wUEpi-14Cd93H2KnsbVVb1L40TttSEfo6PYy1tZ1EJo/edit?usp=sharing');
  assert.equal(aula15.links[0].label, 'Conteúdo complementar — TensorFlow Playground');
  assert.match(aula15.links[0].url, /^https:\/\/playground\.tensorflow\.org\/#activation=relu&/);
});

test('não renderiza uma página para aulas marcadas como não abertas', async () => {
  const source = await readFile(new URL('../src/app/aulas/[slug]/page.tsx', import.meta.url), 'utf8');

  assert.match(source, /if \(aula\.openable === false\) return null/);
});

test('renderiza aulas não abertas como conteúdo estático na lista', async () => {
  const source = await readFile(new URL('../src/app/aulas/page.tsx', import.meta.url), 'utf8');

  assert.match(source, /aula\.openable === false/);
  assert.match(source, /<div[\s\S]*className=\{`aula-scard/);
});
