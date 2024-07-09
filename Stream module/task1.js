const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') filePath = './index.html'; 

    fs.stat(filePath, (err, stats) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not Found');
            return;
        }

        const stream = fs.createReadStream(filePath);
        res.writeHead(200, {
            'Content-Type': 'text/html',
            'Content-Length': stats.size
        });

        stream.pipe(res);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});