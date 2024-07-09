const http = require('http');
const url = require('url');

const items = [];

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathName = parsedUrl.pathname;

    switch (true) {
        case pathName === '/':
            handleGetAllItems(req, res);
            break;
        case pathName.startsWith('/items'):
            const itemId = pathName.split('/')[2];
            if (itemId) {
                if (req.method === 'DELETE') {
                    handleDeleteItem(itemId, res);
                } else if (req.method === 'PUT') {
                    handleUpdateItem(itemId, req, res);
                } else {
                    handleGetItemById(itemId, req, res);
                }
            }
            break;
        case pathName === '/add':
            handleAddNewItem(req, res);
            break;
        default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not Found');
    }
});

function handleGetAllItems(req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(items));
}

function handleAddNewItem(req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString(); 
    });
    req.on('end', () => {
        const newItem = JSON.parse(body);
        items.push(newItem);
        res.writeHead(201, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(newItem));
    });
}

function handleGetItemById(itemId, req, res) {
    const item = items.find(item => item.id === parseInt(itemId));
    if (item) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(item));
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Item not found');
    }
}

function handleUpdateItem(itemId, req, res) {
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const itemIndex = items.findIndex(item => item.id === parseInt(itemId));
        if (itemIndex !== -1) {
            items[itemIndex] = JSON.parse(body);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(items[itemIndex]));
        } else {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Item not found');
        }
    });
}

function handleDeleteItem(itemId, res) {
    const itemIndex = items.findIndex(item => item.id === parseInt(itemId));
    if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
        res.writeHead(204, {'Content-Type': 'text/plain'});
        res.end('');
    } else {
        res.writeHead(404, {'Content-Type': 'text/plain'});
        res.end('Item not found');
    }
}

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});