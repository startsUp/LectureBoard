var WebSocket = require('ws');
var wss = new WebSocket.Server({port: 40510});

wss.broadcast = (data) => {
	wss.clients.forEach((client) => {
		if (client.readyState === WebSocket.OPEN) {
     		client.send(data);
    	}
	});
}
wss.on('connection',  (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
    	if(client !== ws && client.readyState === WebSocket.OPEN)
    		client.send(message);
    });
  });

});
