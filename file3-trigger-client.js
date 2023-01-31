const net = require('net');

const socket = net.connect({ port: 5000, host: "localhost" });

socket.on('connect', () => {
  let json = {
    cmd: "file",
    fileName: "send-image.jpg"
  }
  socket.write(JSON.stringify(json));
});

socket.on('close', function(){
  console.log("good bye");
});