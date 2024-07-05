const fs = require('fs');

console.time('blockReadTime');

try {
    const content = fs.readFileSync('file.txt', 'utf8');
    console.log(content);
} catch (error) {
    console.error('Ошибка при чтении файла:', error);
}
console.log("\n\n\n");
console.timeEnd('blockReadTime');
console.time('nonBlockReadTime');

fs.readFile('file.txt', 'utf8', (err, content) => {
    if (err) {
        console.error('Ошибка при чтении файла:', err);
        return;
    }
    
    console.log(content);
});

console.log("\n\n\n");
console.timeEnd('nonBlockReadTime');
console.log("\n\n\n");