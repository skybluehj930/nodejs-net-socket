const net = require('net');
const client = net.connect({port: 8090}, () => {  // connect는 net.Socket 클래스 반환
    console.log("client connected");    
});

client.write("client send data");   // tx 버퍼에 data 쓰기

client.on('data', (data) => {   // rx 버퍼에 데이터 읽어오기
    console.log("msg from server : " + data.toString());
    client.end();
});

client.on('end', () => {    // 연결 끊김 확인
    console.log("disconnected from server");
});