const io = require('socket.io-client');


console.log('boolin no hooolin')
    
const socket = io('http://192.168.10.59:3000');

socket.on('connect', function(socket){
  console.log('up and down');


});
