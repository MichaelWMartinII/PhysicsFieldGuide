import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const appDir = path.join(root, 'src', 'app');
const libDir = path.join(root, 'src', 'lib');

const fail = [];
const warn = [];

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (/\.(tsx?|jsx?|mjs)$/.test(entry.name)) files.push(full);
  }
  return files;
}

function rel(file) {
  return path.relative(root, file);
}

function lineOf(text, index) {
  return text.slice(0, index).split('\n').length;
}

function addFinding(list, file, index, message) {
  list.push(`${rel(file)}:${lineOf(fs.readFileSync(file, 'utf8'), index)} ${message}`);
}

const appFiles = walk(appDir);
const contentFiles = appFiles.filter(file => !rel(file).startsWith('src/app/api/'));

const draftPatterns = [
  /\bwait\s*(?:[,—-]|\blet\b)/i,
  /\blet me redo\b/i,
  /\brecalc(?:ulate)?\b/i,
  /\bhmm\b/i,
  /\bnot right\b/i,
];

for (const file of contentFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const pattern of draftPatterns) {
    const match = pattern.exec(text);
    if (match) addFinding(fail, file, match.index, `draft phrase matched ${pattern}`);
  }
}

const chapterLabels = new Map();
for (const file of contentFiles) {
  const text = fs.readFileSync(file, 'utf8');
  const matches = text.matchAll(/>([^<]*?(?:Chapter|Advanced Topics|Upper Division)[^<]*?)<\/div>/g);
  for (const match of matches) {
    const label = match[1].replace(/&amp;/g, '&').trim();
    if (!chapterLabels.has(label)) chapterLabels.set(label, []);
    chapterLabels.get(label).push(`${rel(file)}:${lineOf(text, match.index)}`);
  }
}

for (const [label, locations] of chapterLabels) {
  if (locations.length > 1 && /Chapter \d+/.test(label)) {
    warn.push(`duplicate chapter label "${label}" at ${locations.join(', ')}`);
  }
}

const knownBadPatterns = [
  [/answer=\{0\.0821\}/, 'known-bad gas-law answer 0.0821'],
  [/answer=\{3\.11e23\}/, 'known-bad molecule-count answer 3.11e23'],
  [/answer=\{89\.9\}\s+unit="V"/, 'known-bad electric-potential answer 89.9 V'],
  [/answer=\{18\}\s+unit="W"/, 'known-bad circuit-power answer 18 W'],
  [/answer=\{0\.0209\}\s+unit="m"/, 'known-bad cyclotron-radius answer 0.0209 m'],
  [/answer=\{6\.28\}\s+unit="rad\/s"/, 'known-bad oscillator angular frequency 6.28'],
  [/pressure antinodes at ends/i, 'open pipe pressure boundary condition should be pressure nodes'],
  [/BGL ratio/i, 'typo: BGL ratio'],
  [/¹³⁶Ge|136Ge/i, 'germanium double-beta isotope should be 76Ge'],
  [/same universality class as the 2D Ising/i, 'percolation universality class mismatch'],
];

for (const file of contentFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const [pattern, message] of knownBadPatterns) {
    const match = pattern.exec(text);
    if (match) addFinding(fail, file, match.index, message);
  }
}

const libText = walk(libDir).map(file => fs.readFileSync(file, 'utf8')).join('\n');
const builtTopicPattern = /\{[^{}]*built:\s*true[^{}]*\}/g;
for (const match of libText.matchAll(builtTopicPattern)) {
  const topic = match[0];
  if (!/href:\s*['"]\//.test(topic)) {
    const title = /title:\s*['"]([^'"]+)/.exec(topic)?.[1] ?? 'unknown topic';
    warn.push(`built topic lacks href: ${title}`);
  }
}

const knownRoutes = new Set();
for (const file of contentFiles) {
  if (!file.endsWith('/page.tsx')) continue;
  const route = '/' + path.relative(appDir, path.dirname(file)).split(path.sep).join('/');
  if (route !== '/') knownRoutes.add(route);
}

knownRoutes.delete('/roadmap');

for (const route of knownRoutes) {
  if (!libText.includes(`href: '${route}'`) && !libText.includes(`href: "${route}"`)) {
    warn.push(`route exists but is not referenced by curriculum/roadmap href: ${route}`);
  }
}

if (warn.length) {
  console.log('Content QA warnings:');
  for (const item of warn) console.log(`  - ${item}`);
  console.log('');
}

if (fail.length) {
  console.error('Content QA failures:');
  for (const item of fail) console.error(`  - ${item}`);
  process.exit(1);
}

console.log('Content QA passed.');
