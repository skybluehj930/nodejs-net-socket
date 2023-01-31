const net = require('net');
const fs = require('fs');
const path = require('path');

let filePath;
let clients = [];

const server = net.createServer(function(client){
  clients.push(client);
  
  client.on('data', (data) => {
    console.log(data);
    const json = JSON.parse(data);
    if (json.cmd == 'file') {
      filePath = path.join(__dirname, json.fileName);
      sendFile();
    }  
  });

  client.on('error', function(){
    console.log("error del cliente");
  });

  client.on('close', function(){
    console.log("disconnect client");
  });

  function sendFile() {
    let packets = 0;
    let totalBytes = 0;
    const readStream = fs.createReadStream(filePath, {highWaterMark: 16384});

    readStream.on('data', function(chunk){
      packets++;
      console.log('chunk', chunk);
      const head = new Buffer.from("FI");
      // content size를 16진수로 변환.
      const sizeHex = chunk.length.toString(16);
      console.log('sizeHex', sizeHex);
      while(sizeHex.length < 4){
        sizeHex = "0" + sizeHex;
      }
      const size = new Buffer.from(sizeHex);
      console.log("size byte", size, "size", chunk.length, "hex", sizeHex);
      const delimiter = new Buffer.from("@");
      const pack = Buffer.concat([head, size, chunk, delimiter]);
      totalBytes += pack.length;
      
      for (let c  of clients) {
        if (client != c) c.write(pack);
      }
    });
  
    readStream.on('close', function(){
      client.write("EN");
      // client.end();
      console.log("total packets", packets);
      console.log("total bytes sent", totalBytes + 2);
    });
  }
});

server.listen(5000);

server.on('listening', function(){
  console.log("servidor escuchando");
});

server.on('error', function(err){
  console.log("error del servidor");
});