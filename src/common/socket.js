const ws = new WebSocket('ws://127.0.0.1:8080/socket.io/?transport=websocket');

ws.onopen = () => {
  // 打开一个连接

  ws.send('something'); // 发送一个消息
};

ws.onmessage = (e) => {
  // 接收到了一个消息
  console.log('接收到了一个消息', e);
};

ws.onerror = (e) => {
  // 发生了一个错误
  console.log('发生了一个错误', e);
};

ws.onclose = (e) => {
  // 连接被关闭了
  console.log('连接被关闭了', e);
};