import test from 'node:test';
import assert from 'node:assert/strict';
import { organizations, membershipsFor } from '../src/index.js';

test('Luciana belongs to UFPB and Momento independently', () => {
 assert.deepEqual(membershipsFor('LucianaNascimento').map(m => m.initiative).sort(), ['momento', 'trilha-ufpb']);
 assert(membershipsFor('LucianaNascimento').every(m => m.role === 'Membro da Organização'));
});
test('2026.1 teaching leadership replaces Guilherme with Joaquim', () => {
 assert.equal(organizations.ufpb.period, '2026.1');
 assert(!organizations.ufpb.members.some(m => m.personId === 'Guilherme'));
 assert.equal(organizations.ufpb.members.find(m => m.personId === 'Joaquim').role, 'Líder de Aulas');
});
test('each initiative contains unique people and roles do not leak between initiatives', () => {
 for (const org of Object.values(organizations)) assert.equal(new Set(org.members.map(m => m.personId)).size, org.members.length);
 assert.equal(membershipsFor('NicoleCosta').find(m => m.initiative === 'momento').role, 'Líder');
 assert.equal(membershipsFor('NicoleCosta').find(m => m.initiative === 'trilha-ufpb').role, 'Membro da Organização');
 assert(organizations.ufpe.members.every(m => m.role === 'Líder'));
 assert.equal(organizations.momento.members.length, 7);
});
