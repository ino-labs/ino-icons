import * as fs from 'fs';
import * as path from 'path';

const iconsDir = path.join(__dirname, './src/assets/icons');
const outputFilePath = path.join(__dirname, './assets/icons.json');

fs.readdir(iconsDir, (err, files) => {
  if (err) {
    console.error('Erro ao ler a pasta de ícones:', err);
    return;
  }

  const iconNames = files.map(file => path.parse(file).name);
  fs.writeFile(outputFilePath, JSON.stringify(iconNames, null, 2), err => {
    if (err) {
      console.error('Erro ao escrever o arquivo JSON:', err);
      return;
    }
    console.log('Arquivo icons.json gerado com sucesso!');
  });
});
