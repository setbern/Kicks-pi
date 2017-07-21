var request = require('request-promise');
var rpi433 = require('rpi-433');


var kick = module.exports = (function() {

    var settings = require('../config/constants');

    var json = request.defaults({
        json: true,
        
    });
    var turnLightOn = function(socket) {
        console.log('turnLightOn');
        var codes = settings.rfCodes
        return new Promise(function(resolve, reject) {
            console.log(codes)
            console.log(params)

            rfEmitter = rpi433.emitter({
                pin: 0,                     //Send through GPIO 0 (or Physical PIN 11)
                pulseLength: 178            //Send the code with a 178 pulse length
            });

            rfEmitter.sendCode(codes[socket].on, function(error, stdout) {  
                if(!error) 
                console.log(stdout); 
                resolve('on')
            })
        });        
    };
    var turnLightOff = function(params) {
        console.log('turnLightOff');
        var codes = settings.rfCodes
        return new Promise(function(resolve, reject) {
            console.log(codes)
            console.log(params)

            rfEmitter = rpi433.emitter({
                pin: 0,                     //Send through GPIO 0 (or Physical PIN 11)
                pulseLength: 178            //Send the code with a 178 pulse length
            });

            rfEmitter.sendCode(codes[socket].off, function(error, stdout) {  
                if(!error) 
                console.log(stdout); 
                resolve('on')
            })
        });        
    };
    return {
        startFeed: startFeed,
        turnLightOn: turnLightOn,
        turnLightOff: turnLightOff,
    };
})();
