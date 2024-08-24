import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const iconsDir = path.join(__dirname, './public/assets/icons');
const outputFilePath = path.join(__dirname, './public/assets/icons-data.json');

const readExistingIcons = (): any[] => {
  if (fs.existsSync(outputFilePath)) {
    const data = fs.readFileSync(outputFilePath, 'utf-8');
    return JSON.parse(data);
  }
  return [];
};

const iconExists = (existingIcons: any[], name: string): boolean => {
  return existingIcons.some(icon => icon.name === name);
};

fs.readdir(iconsDir, (err, files) => {
  if (err) {
    console.error('Error reading icon folder:', err);
    return;
  }

  const existingIcons = readExistingIcons();
  const currentIconNames = files.map(file => path.parse(file).name);

  const newIcons = files
    .map((file, index) => {
      const name = path.parse(file).name;
      const title = name.replace(/ino|-/g, ' ').trim();
      const keywords = name.split(/-|_/).map(word => word.trim());

      return {
        id: existingIcons.length + index + 1,
        name,
        title,
        keywords
      };
    })
    .filter(icon => !iconExists(existingIcons, icon.name));

  const removedIcons = existingIcons.filter(icon => !currentIconNames.includes(icon.name));

  if (newIcons.length > 0 || removedIcons.length > 0) {
    const updatedIcons = [
      ...existingIcons.filter(icon => currentIconNames.includes(icon.name)),
      ...newIcons
    ];
    fs.writeFile(outputFilePath, JSON.stringify(updatedIcons, null, 2), err => {
      if (err) {
        console.error('Error writing JSON file:', err);
        return;
      }
      console.log('icons-data.json file updated successfully!');
      if (newIcons.length > 0) {
        console.log('New icons generated:', newIcons.map(icon => icon.name).join(', '));
      }
      if (removedIcons.length > 0) {
        console.log('Icons removed:', removedIcons.map(icon => icon.name).join(', '));
      }
    });
  } else {
    console.log('No new icons were generated and no icons were removed.');
  }
});
