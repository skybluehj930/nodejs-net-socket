# nodejs-net-socket
node.js socket net module example

###  Basic Test
node-net-client.js  
node-net-server.js

### Multi Chat
chat-client.js  
chat-server.js

### File Transfer
* server에서 스트림으로 파일전송 client에서 buffer 모두 담아 file write  
file-client.js  
file-server.js

* server에서 스트림으로 파일전송 client에서 chunk를 받는 즉시 buffer에 담아 file write  
file2-client.js  
file2-server.js  

* receive-client에서 수신 대기 trigger-client 연결시 server에서 스트림으로 파일전송 receive-client에게 파일 전송  
file3-receive-client.js  
file3-trigger-client.js  
file3-server.js
