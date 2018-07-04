var WebSocket = require('ws');
var wss = new WebSocket.Server({port: 40510});
var clientCount = 0;
//temp solution: store client ids in an array
var clients = []; 

wss.on('connection',  (ws) => {
  console.log('connected client:' + clientCount);
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if(client !== ws && client.readyState === WebSocket.OPEN)
        client.send(message);
    });
  });
});



