var net = require('net');
var fs = require('fs');
var path = require('path');
var fileName = "send-image.jpg";
var filePath = path.join(__dirname, fileName);

var server = net.createServer(function(client){
  var packages = 0;
  var totalBytes = 0;
  var readStream = fs.createReadStream(filePath, {highWaterMark: 16384});
//   var readStream = fs.createReadStream(filePath);
  readStream.on('data', function(chunk){
    packages++;    
    var head = new Buffer.from("FILE");
    var sizeHex = chunk.length.toString(16);
    while(sizeHex.length < 4){
      sizeHex = "0" + sizeHex;
    }
    var size = new Buffer.from(sizeHex);
    console.log("size", chunk.length, "hex", sizeHex);
    var delimiter = new Buffer.from("@");
    var pack = Buffer.concat([head, size, chunk, delimiter]);
    totalBytes += pack.length;
	console.log("pack: ", pack);
    client.write(pack);
  });
  readStream.on('close', function(){
    client.end();
    console.log("total packages", packages);
    console.log("total bytes sent", totalBytes);
  });

  client.on('error', function(){
    console.log("error del cliente");
  });

  client.on('close', function(){
    console.log("disconnect client");
  });

});

server.listen(5000);

server.on('listening', function(){
  console.log("servidor escuchando");
});
server.on('error', function(err){
  console.log("error del servidor");
});