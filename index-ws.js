const express = require('express');
const server = require('http')
  .createServer();

const app = express();

app.get('/', function(req, res) {
  res.sendFile('index.html', { root: __dirname });
});

server.on('request', app);
server.listen(3000, function() {
  console.log('server started on port 3000');
});


// websocket setup

const WebStocketServer = require('ws').Server;

const wss = new WebStocketServer({ server });

wss.on('connection', function connection(ws) {
  const numClients = wss.clients.size; 
  console.log('Clients connected:', numClients);
  // for every client
  wss.broadcast(`Current visitors: ${numClients}`);
  if (ws.readyState == ws.OPEN) {
    // for single client;
    ws.send('Welcome to my server.');
  }

  ws.on('close', function close() {
    wss.broadcast(`Current visitors: ${numClients}`);
    console.log('A client has disconnected');
  })
});

wss.broadcast = function(message) {
  wss.clients.forEach(function each(client) {
    client.send(message);
  });
};
