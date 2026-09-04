/**
 * Resize and re-encode the site artwork. Run with `npm run images`.
 *
 * The sources are export-resolution: logo.png shipped at 1735x798 for a slot
 * 96px wide, logo-mark.png at 796x795 for a 52px slot. Those two alone were
 * 575 KB of a 1.06 MB first load.
 *
 * Originals live in images/src/ and are never modified. The optimised files
 * written to images/ are what the site references. Replace a source file and
 * re-run; nothing else needs editing.
 *
 * Format choice: flat logo art stays PNG (palette encoding is near-lossless
 * and tiny for it); photographs go to WebP, which also handles hero.png's
 * alpha channel — the reason it cannot simply become a JPEG.
 */
import sharp from 'sharp';
import { mkdir, readdir, stat, copyFile, access, unlink } from 'node:fs/promises';
import path from 'node:path';

const SRC = 'images/src';
const OUT = 'images';

// width = 2x the widest CSS slot the image occupies, which is all a retina
// display can use; anything beyond that is bytes the visitor never sees.
const TARGETS = {
  'logo.png':       { w: 220,  format: 'png'  },  //  96x44 slot
  'logo-white.png': { w: 220,  format: 'png'  },
  'logo-mark.png':  { w: 128,  format: 'png'  },  //  52x52 slot
  'hero.png':       { w: 880,  format: 'webp' },  // 420 slot, has alpha
  'team.jpg':       { w: 1100, format: 'webp' },  // 551 slot
  'exterior.jpg':   { w: 760,  format: 'webp' },  // 268 slot
  'meeting.jpg':    { w: 760,  format: 'webp' },
  'office.jpg':     { w: 760,  format: 'webp' },
};

const kb = (n) => (n / 1024).toFixed(1).padStart(7) + ' KB';

await mkdir(SRC, { recursive: true });

// First run seeds images/src/ from images/ so the originals are preserved.
for (const name of Object.keys(TARGETS)) {
  try { await access(path.join(SRC, name)); } catch {
    try { await copyFile(path.join(OUT, name), path.join(SRC, name)); } catch { /* absent */ }
  }
}

let before = 0, after = 0;
const rows = [];

for (const name of await readdir(SRC)) {
  const target = TARGETS[name];
  if (!target) continue;

  const srcPath = path.join(SRC, name);
  const pipeline = sharp(srcPath).resize({ width: target.w, withoutEnlargement: true, fit: 'inside' });

  const outName = target.format === 'webp' ? name.replace(/\.(png|jpe?g)$/, '.webp') : name;
  const outPath = path.join(OUT, outName);

  const buf = target.format === 'webp'
    ? await pipeline.webp({ quality: 82, effort: 6 }).toBuffer()
    : await pipeline.png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 }).toBuffer();

  const wasSize = (await stat(srcPath)).size;

  // Never ship a file larger than what it replaced.
  if (target.format !== 'webp' && buf.length >= wasSize) {
    await copyFile(srcPath, outPath);
    rows.push(`  ${name.padEnd(17)} ${kb(wasSize)} -> ${kb(wasSize)}  (kept original, re-encode was larger)`);
    before += wasSize; after += wasSize;
    continue;
  }

  await sharp(buf).toFile(outPath);
  const nowSize = (await stat(outPath)).size;
  const meta = await sharp(outPath).metadata();

  // Drop the superseded original from the served directory.
  if (outName !== name) { try { await unlink(path.join(OUT, name)); } catch {} }

  before += wasSize; after += nowSize;
  rows.push(`  ${name.padEnd(17)} ${kb(wasSize)} -> ${kb(nowSize)}  ${outName.padEnd(18)} ${meta.width}x${meta.height}`);
}

// A real favicon — the 253 KB logo-mark.png was doing this job.
await sharp(path.join(SRC, 'logo-mark.png')).resize(48, 48).png({ compressionLevel: 9, palette: true }).toFile(path.join(OUT, 'favicon-48.png'));
await sharp(path.join(SRC, 'logo-mark.png')).resize(180, 180).png({ compressionLevel: 9, palette: true }).toFile(path.join(OUT, 'apple-touch-icon.png'));

// Social preview at 1200x630, the size crawlers expect. Kept as JPEG: a few
// social scrapers still handle WebP poorly and this is served to them, not
// to browsers.
await sharp(path.join(SRC, 'hero.png'))
  .resize(1200, 630, { fit: 'contain', background: '#E7F0FA' })
  .flatten({ background: '#E7F0FA' })
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(OUT, 'og-image.jpg'));

console.log(rows.join('\n'));
console.log(`  ${'TOTAL'.padEnd(17)} ${kb(before)} -> ${kb(after)}   (${(100 - after / before * 100).toFixed(0)}% smaller)`);
for (const extra of ['favicon-48.png', 'apple-touch-icon.png', 'og-image.jpg']) {
  console.log(`  + ${extra.padEnd(21)} ${kb((await stat(path.join(OUT, extra))).size)}`);
}
