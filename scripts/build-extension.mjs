import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';

const dist = 'dist';
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist);

// Copia arquivos essenciais
for (const f of ['manifest.json', 'src/main.js', 'src/popup.html', 'src/img/icon.png']) fs.copyFileSync(f, path.join(dist, f));

// Gera ZIP
const output = fs.createWriteStream(path.join(dist, 'extension.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });
archive.directory(dist, false);
archive.pipe(output);
await archive.finalize();
console.log('Build gerado em dist/ e dist/extension.zip');