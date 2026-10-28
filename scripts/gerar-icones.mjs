#!/usr/bin/env node
// Generates the favicons and the social sharing image (public/) from src/assets/img/logo.png.
// Only needed when the logo changes: `npm run icones`.

import sharp from 'sharp';

const LOGO = 'src/assets/img/logo.png';
const BRANCO = { r: 255, g: 255, b: 255, alpha: 1 };

// The symbol is the red shape with the "H". It touches the "Lar" text in the bounding box, so it is
// isolated as the connected red area around a point inside it, filling the "H" in white.
const { data, info } = await sharp(LOGO).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const vermelho = (i) => data[i + 3] > 60 && data[i] > 120 && data[i + 1] < 110 && data[i + 2] < 110;
const forma = new Uint8Array(width * height);
const fila = [Math.round(height * 0.35) * width + Math.round(width * 0.1)];
while (fila.length) {
  const p = fila.pop();
  if (forma[p] || !vermelho(p * 4)) continue;
  forma[p] = 1;
  const x = p % width;
  if (x > 0) fila.push(p - 1);
  if (x < width - 1) fila.push(p + 1);
  if (p >= width) fila.push(p - width);
  if (p < width * (height - 1)) fila.push(p + width);
}
const saida = Buffer.alloc(data.length);
for (let y = 0; y < height; y++) {
  const linha = forma.subarray(y * width, (y + 1) * width);
  const ini = linha.indexOf(1);
  if (ini < 0) continue;
  const fim = linha.lastIndexOf(1);
  // One extra pixel on each side keeps the anti-aliased edge
  for (let x = Math.max(0, ini - 1); x <= Math.min(width - 1, fim + 1); x++) {
    const i = (y * width + x) * 4;
    const dentro = x >= ini && x <= fim && !vermelho(i);
    saida.set(dentro ? [255, 255, 255, 255] : data.subarray(i, i + 4), i);
  }
}
const simbolo = await sharp(saida, { raw: { width, height, channels: 4 } }).trim().png().toBuffer();

const quadrado = (tamanho, fundo, margem) => {
  const borda = Math.round(tamanho * margem);
  const interno = tamanho - 2 * borda;
  return sharp(simbolo)
    .resize(interno, interno, { fit: 'contain', background: fundo })
    .extend({ top: borda, bottom: borda, left: borda, right: borda, background: fundo });
};

await quadrado(32, { r: 0, g: 0, b: 0, alpha: 0 }, 0.02).png().toFile('public/favicon-32.png');
await quadrado(192, { r: 0, g: 0, b: 0, alpha: 0 }, 0.06).png().toFile('public/favicon-192.png');
await quadrado(180, BRANCO, 0.12).flatten({ background: BRANCO }).png().toFile('public/apple-touch-icon.png');

const logoGrande = await sharp(LOGO).resize({ width: 640 }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: BRANCO } })
  .composite([
    { input: logoGrande, gravity: 'center' },
    { input: { create: { width: 1200, height: 14, channels: 4, background: { r: 237, g: 42, b: 40, alpha: 1 } } }, gravity: 'south' },
  ])
  .flatten({ background: BRANCO })
  .jpeg({ quality: 88 })
  .toFile('public/og.jpg');

console.log('Ícones e og.jpg gerados em public/');
