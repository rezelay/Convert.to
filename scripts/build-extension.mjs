import fs from 'node:fs';
import path from 'node:path';
import archiver from 'archiver';

const src = 'src';
const dist = 'dist';

// Limpa e recria dist
fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

fs.cpSync(src, dist, { recursive: true });

// Cria o arquivo ZIP dentro de dist
const zipPath = path.join(dist, 'extension.zip');
const output = fs.createWriteStream(zipPath);
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', () => {
  console.log(`Build gerado em ${dist}/ e ${zipPath} (${archive.pointer()} bytes)`);
});

archive.pipe(output);
archive.directory(dist, false); // adiciona o conteúdo da pasta dist
await archive.finalize();
