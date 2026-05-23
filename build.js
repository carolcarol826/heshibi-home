/**
 * Build script: merges content.json into template.html → dist/index.html
 * Runs locally (`node build.js`) and on Vercel builds.
 */
const fs = require('fs');
const path = require('path');

const content = JSON.parse(fs.readFileSync('content.json', 'utf8'));
const template = fs.readFileSync('template.html', 'utf8');

// Pre-compute URL-encoded versions of email subjects (for mailto: links)
function addEncodedSubjects(obj, parentKey = '') {
  if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
    const keys = Object.keys(obj);
    for (const k of keys) {
      if (k.endsWith('_email_subject') && typeof obj[k] === 'string') {
        obj[k + '_encoded'] = encodeURIComponent(obj[k]);
      }
      addEncodedSubjects(obj[k], k);
    }
  }
}
addEncodedSubjects(content);

// Resolve {{path.to.value}} via dot-path lookup
function resolve(data, path) {
  const parts = path.split('.');
  let v = data;
  for (const part of parts) {
    if (v && typeof v === 'object' && part in v) v = v[part];
    else return null;
  }
  return v;
}

// Replace {{key}} placeholders
const missing = [];
const html = template.replace(/\{\{([\w.]+)\}\}/g, (match, key) => {
  const v = resolve(content, key);
  if (v == null) {
    missing.push(key);
    return match;
  }
  return String(v);
});

if (missing.length) {
  console.error('\n[build] ⚠️  缺失字段:');
  for (const k of [...new Set(missing)]) console.error('  - ' + k);
  console.error('\n请检查 content.json 是否有对应键。\n');
  process.exit(1);
}

const outDir = 'dist';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), html);

console.log('✓ Built dist/index.html (' + (html.length / 1024).toFixed(1) + ' KB)');
