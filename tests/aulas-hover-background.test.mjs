import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('mostra o destaque de largura total sem redimensionar o cartão no hover', async () => {
  const styles = await readFile(new URL('../src/app/globals.css', import.meta.url), 'utf8');
  const page = await readFile(new URL('../src/app/aulas/page.tsx', import.meta.url), 'utf8');

  assert.match(
    styles,
    /\.aula-scard::before\s*\{[^}]*width:\s*100vw;[^}]*left:\s*50%;[^}]*opacity:\s*0;/s,
  );
  assert.match(styles, /\.aula-scard:hover::before\s*\{[^}]*opacity:\s*1;/s);
  assert.doesNotMatch(styles, /\.aula-scard:hover\s*\{[^}]*width:\s*100vw;/s);
  assert.doesNotMatch(page, /style=\{\{ overflow: 'hidden' \}\}/);
});

test('mostra o destaque do cabeçalho da seção em toda a largura da tela', async () => {
  const styles = await readFile(new URL('../src/app/globals.css', import.meta.url), 'utf8');

  assert.match(
    styles,
    /\.aulas-group-header::before\s*\{[^}]*width:\s*100vw;[^}]*left:\s*50%;[^}]*opacity:\s*0;/s,
  );
  assert.match(styles, /\.aulas-group-header:hover::before\s*\{[^}]*opacity:\s*1;/s);
  assert.doesNotMatch(styles, /\.aulas-group-header:hover\s*\{[^}]*margin-inline:/s);
});
