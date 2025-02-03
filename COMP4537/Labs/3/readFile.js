const http = require('http');
const url = require('url');
const fs = require('fs');

class ReadFileServer {
    constructor(port) {
        this.port = port;
    }

    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        if (pathname === '/COMP4537/labs/3/readFile/file.txt') {
            fs.readFile('file.txt', 'utf8', (err, data) => {
                if (err) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(`Error 404: File not found - ${pathname}`);
                    return;
                }
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(data);
            });
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end(`Error 404: Path not found - ${pathname}`);
        }
    }

    start() {
        http.createServer((req, res) => this.handleRequest(req, res)).listen(this.port);
        console.log(`Server is running and listening on port ${this.port}...`);
    }
}

// Instantiate and start the server
const server = new ReadFileServer(8001);
server.start();