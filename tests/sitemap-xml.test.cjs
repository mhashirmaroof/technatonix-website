const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const source = fs.readFileSync(path.join(__dirname, '../lib/sitemap-xml.ts'), 'utf8');
const compiled = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const exportsObject = {};
vm.runInNewContext(compiled, { exports: exportsObject, Buffer });
const { createSitemapDocuments, createSitemapIndex } = exportsObject;

test('escapes XML, includes lastmod, and removes duplicate URLs', () => {
  const [xml] = createSitemapDocuments([
    { path: '/a&b', lastModified: '2025-01-02T03:04:05.000Z' },
    { path: '/a&b' },
  ]);
  assert.match(xml, /\/a&amp;b/);
  assert.match(xml, /<lastmod>2025-01-02T03:04:05.000Z<\/lastmod>/);
  assert.equal((xml.match(/<url>/g) || []).length, 1);
});

test('splits after 50,000 URLs and generates an index', () => {
  const entries = Array.from({ length: 50_001 }, (_, index) => ({ path: `/page-${index}` }));
  const documents = createSitemapDocuments(entries);
  assert.equal(documents.length, 2);
  assert.equal((documents[0].match(/<url>/g) || []).length, 50_000);
  assert.equal((documents[1].match(/<url>/g) || []).length, 1);
  assert.match(createSitemapIndex(documents.length), /\/sitemap\/2\.xml/);
  assert.throws(() => createSitemapIndex(50_001));
});

test('splits documents before exceeding 50 MiB', () => {
  const documents = createSitemapDocuments([
    { path: `/${'a'.repeat(26 * 1024 * 1024)}` },
    { path: `/${'b'.repeat(26 * 1024 * 1024)}` },
  ]);
  assert.equal(documents.length, 2);
  for (const document of documents) assert.ok(Buffer.byteLength(document) <= 50 * 1024 * 1024);
});
