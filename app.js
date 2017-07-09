const io = require('socket.io-client');


console.log('boolin no hooolin')

const socket = io('http:// 10.1.10.152');

io.on('connection', function(socket){
  console.log('up and down');


});
