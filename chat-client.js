const net = require("net");
const readline = require("readline");
 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
 
const client = net.connect({ port: 5000, host: "localhost" });
 
client.on("connect", () => {
  rl.question("Name : ", (name) => {
    client.write(
      JSON.stringify({
        type: "CONNECT",
        content: `${name}`,
      })
    );
    rl.on("line", function (line) {
      client.write(
        JSON.stringify({
          type: "CHAT",
          content: `${name} : ${line}`,
        })
      );
    });
  });
});
 
client.on("data", (data) => {
  console.log(data.toString());
});
 
client.on("close", () => {
  console.log("ended");
});