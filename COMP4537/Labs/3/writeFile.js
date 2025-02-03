const http = require('http');
const url = require('url');
const fs = require('fs');

class WriteFileServer {
    constructor(port) {
        this.port = port;
    }

    handleRequest(req, res) {
        const parsedUrl = url.parse(req.url, true);
        const pathname = parsedUrl.pathname;

        // Ignore favicon requests
        if (pathname === "/favicon.ico") {
            res.writeHead(204, { 'Content-Type': 'image/x-icon' });
            return res.end();
        }

        const text = parsedUrl.query.text || '';
        console.log("Text Test: " + text);
        console.log("Pathname: " + pathname);

        if (pathname.includes('/COMP4537/labs/3/writeFile')) {
            fs.appendFile('file.txt', text + '\n', (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end("Error saving file!");
                    throw err;
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end("File has been saved!");
            });
        } else {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`Error 404: Path not found - ${pathname}`);
        }
    }

    start() {
        http.createServer((req, res) => this.handleRequest(req, res)).listen(this.port);
        console.log(`Server is running and listening on port ${this.port}...`);
    }
}

// Instantiate and start the server
const server = new WriteFileServer(8002);
server.start();