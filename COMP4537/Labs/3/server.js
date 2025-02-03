const http = require('http');
const url = require('url');
const dateTime = require('./modules/utils.js').dateTime;
const messages = require('./lang/messages/en/en.js');

class DateServer {
    constructor(port) {
        this.port = port;
    }

    handleRequest(req, res) {
        const query = url.parse(req.url, true).query;
        const name = query.name || 'Guest';

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(`<p style="color: blue;">${messages.greeting.replace('%1', name)} ${dateTime()}</p>`);
        res.end();
    }

    start() {
        http.createServer((req, res) => this.handleRequest(req, res)).listen(this.port);
        console.log(`Server is running and listening on port ${this.port}...`);
    }
}

// Instantiate and start the server
const server = new DateServer(8888);
server.start();