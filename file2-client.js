const net = require('net');
const socket = new net.Socket();
socket.connect(5000, "127.0.0.1");
const fs = require('fs');
const path = require('path');

const fileName = "out.jpg";
const filePath = path.join(__dirname, fileName);
let packets = 0;
let totalBytes = 0;
let buffer = new Buffer.alloc(0);

const writeStream = fs.createWriteStream(filePath);

socket.on('data', function(chunk){
  packets++;
  totalBytes += chunk.length;
  // buffer sum
  buffer = Buffer.concat([buffer, chunk]);
  console.log("buffer size", buffer.length);
  while(buffer.length){
    // packet type check
    const head = buffer.slice(0, 2).toString();
    console.log("head", head);
    if (head == "FI") { // file
      const sizeHex = buffer.slice(2, 6);
      const size = parseInt(sizeHex, 16);
  
      console.log("size", size); // content size
      console.log(buffer.length);
      const content = buffer.slice(6, size + 6);
      const delimiter = buffer.slice(size + 6, size + 7);
      console.log(buffer.length)
      console.log("delimiter", delimiter.toString());
      if(delimiter != "@"){ // delimiter가 아니면 다음 패킷을 기다린다.
        console.log("wrong delimiter!!!");
        break;
      }
      
      writeStream.write(content);
      buffer = buffer.slice(size + 7);
      console.log('after buffer', buffer)
      
    } else if (head == "EN") { // file transfer end
      setTimeout(function(){
        writeStream.end();
      }, 2000);
      console.log("total packets", packets);
      console.log("total bytes sent", totalBytes);
      break;
    }
  }
});

socket.on('close', function(){
  console.log("good bye");
});