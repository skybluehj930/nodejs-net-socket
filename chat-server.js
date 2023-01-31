const net = require("net");
 
let pool = [];
 
const server = net.createServer((socket) => {
  pool.push(socket);
  socket.on("data", (data) => {
    let d = JSON.parse(data);
    switch (d.type) {
      case "CONNECT":
        for (let s of pool) s.write(d.content + " connected!");
        break;
      case "CHAT":
        for (let s of pool) s.write(d.content);
        break;
    }
  });
  socket.on("error", (e) => {
    const exitSocket = pool.findIndex((item) => item === socket);
    if (exitSocket > -1) pool.splice(exitSocket, 1);
    for (let s of pool) s.write("Someone's out.");
  });
});
 
server.listen(5000, () => {
  console.log("listening 5000");
});