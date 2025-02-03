const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer(function (req, res) {
    const parsedUrl = url.parse(req.url, true);
    
    // Ignore favicon requests
    if (parsedUrl.pathname === "/favicon.ico") {
        res.writeHead(204, { 'Content-Type': 'image/x-icon' });
        return res.end(); 
    }

    const text = parsedUrl.query.text || '';
    console.log("Text Test: " + text);

    fs.appendFile('file.txt', text, function (err) {
        if (err) {
            res.writeHead(500, {'Content-Type': 'text/html'});
            res.end("Error saving file!");
            throw err;
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end("File has been saved!");
    });
}).listen(8888);

console.log("Server is running and listening on port 8888...");