const io = require('socket.io-client');


console.log('boolin no hooolin')

const socket = io('http://192.168.10.59:3000');

io.on('connection', function(socket){
  console.log('up and down');


});
