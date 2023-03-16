const PORT = 3000;
const http = require('http');

http.createServer(function (req, res) {
	res.write('Too lazy to setup a portfolio page.');
	res.end();
}).listen(PORT);

console.log(`Server started on port ${PORT}`);
