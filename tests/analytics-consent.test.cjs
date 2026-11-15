const assert = require('node:assert/strict');
const fs = require('node:fs');
const Module = require('node:module');
const path = require('node:path');
const test = require('node:test');
const ts = require('typescript');

const filename = path.resolve(__dirname, '../lib/analytics-consent.ts');
const compiled = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
}).outputText;
const loaded = new Module(filename, module);
loaded.filename = filename;
loaded.paths = module.paths;
loaded._compile(compiled, filename);
const { analyticsRegionPolicy, regionalAnalyticsRules } = loaded.exports;

const denied = { analyticsStorage: 'denied', prompt: true };

test('visitors are prompted for consent when no regional exceptions are enabled', () => {
  assert.deepEqual(regionalAnalyticsRules, []);
  for (const country of [undefined, 'AA', 'BB', 'ZZ', 'invalid']) {
    assert.deepEqual(analyticsRegionPolicy(country, undefined), denied);
  }
});

test('reviewed country and subdivision rules resolve conservatively', () => {
  const rules = [
    { region: 'AA', analyticsStorage: 'granted', prompt: false },
    { region: 'BB-01', analyticsStorage: 'denied', prompt: true },
    { region: 'BB', analyticsStorage: 'granted', prompt: false },
  ];
  assert.deepEqual(analyticsRegionPolicy('AA', undefined, rules), { analyticsStorage: 'granted', prompt: false });
  assert.deepEqual(analyticsRegionPolicy('BB', '01', rules), { analyticsStorage: 'denied', prompt: true });
  assert.deepEqual(analyticsRegionPolicy('BB', undefined, rules), denied);
  assert.deepEqual(analyticsRegionPolicy('BB', '02', rules), denied);
  assert.deepEqual(analyticsRegionPolicy('BB', 'INVALID', rules), denied);
  assert.deepEqual(analyticsRegionPolicy(undefined, '01', rules), denied);
});
