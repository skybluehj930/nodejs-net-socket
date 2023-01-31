const net = require('net');
const server = net.createServer((socket) => { // createServer는 net.Socket 클래스 반환
  console.log('client connected');
  socket.write('Welcome to Socket Server\n');
   
  socket.on('end', () => {    // client 커넥션이 끊기면 호출되는 이벤트
    console.log('client disconnected');
  });

  // socket.pipe(connection);    // 소켓의 데이터를 그대로 전달 (echo 역할)
  socket.on('data', (data) => {
		var textMsg=data.toString();
		console.log('Client send: ', textMsg);
    socket.write("server가 중간에 변경 했지롱 "+ textMsg);
	});
});

server.listen(8090, () => {   // 다른 소켓의 접속 listening
  console.log('server is listening');
});