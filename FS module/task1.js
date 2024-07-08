const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Введите текст:', function(text) {
  rl.question('Введите имя файла:', function(fileName) {
    let filePath = `./${fileName}.txt`;

    fs.writeFile(filePath, text, err => {
      if (err) {
        console.error("Ошибка при записи файла:", err);
      } else {
        console.log("Текст успешно записан в файл");
      }
    });

    rl.close();
  });
});