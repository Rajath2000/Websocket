const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 },()=>{
    console.log("web socket initiated on port 8000");
});

wss.on('connection', function connection(ws) {
    console.log('A new client connected.');
  
    // Event listener for incoming messages from the client
    ws.onmessage = function (event) {
      console.log('Received message:', event.data);
      console.log(typeof event.data);

      if (event.data instanceof Blob) {
        var reader = new FileReader();
    
        reader.onload = function() {
          // Decode binary data to text using UTF-8
          var text = new TextDecoder().decode(reader.result);
          
          // Do something with the decoded text
          console.log(text);
        };
     }
  
      // Broadcast the received message to all connected clients
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(event.data);
        }
      });
    }
  
    // Event listener for when the client closes the connection
    ws.on('close', function close() {
      console.log('Client disconnected.');
    });
});