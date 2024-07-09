const path = require('path');

const filePath = process.argv[2];

if (!filePath) {
    console.error('Пожалуйста, укажите путь к файлу.');
    return;
}

const absolutePath = path.resolve(filePath);

const fileNameWithoutExtension = path.basename(filePath, path.extname(filePath));

console.log(`Абсолютный путь к файлу: ${absolutePath}`);
console.log(`Имя файла без расширения: ${fileNameWithoutExtension}`);