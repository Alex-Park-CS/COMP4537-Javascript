const http = require('http');
const dateTime = require('./modules/utils.js').dateTime;
const url = require('url');
const messages = require('./lang/messages/en/en.js');

http.createServer(function (req, res) {
    const query = url.parse(req.url, true).query;
    const name = query.name || 'Guest';

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(messages.greeting.replace('%1', name) + dateTime());
    res.end();
}).listen(8888);

console.log("Server is running and listening on port 8888...");