import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

async function images(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(entry => entry.isDirectory() ? images(path.join(directory, entry.name)) : [path.join(directory, entry.name)]));
  return files.flat().filter(file => file.endsWith(".png"));
}

const sources = [...await images("public/images/mockups"), ...await images("public/images/palettes"), "public/images/pokemon-card-back.png"];
let before = 0, after = 0;
for (const source of sources) {
  const destination = source.replace(/\.png$/, ".webp");
  // Lossless encoding keeps screenshot text and card artwork pixel-identical.
  await sharp(source).webp({ lossless: true, effort: 6 }).toFile(destination);
  before += (await stat(source)).size;
  after += (await stat(destination)).size;
}
console.log(`${sources.length} images: ${(before / 1048576).toFixed(1)} MB -> ${(after / 1048576).toFixed(1)} MB (${Math.round((1 - after / before) * 100)}% smaller)`);
