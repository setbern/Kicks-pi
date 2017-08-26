var request = require('request-promise');
var rpi433 = require('rpi-433');


var kick = module.exports = (function() {

    var settings = require('../config/settings');

    var json = request.defaults({
        json: true,
        
    });
    var turnLightOn = function(socket) {
        console.log('turnLightOn');
        var codes = settings.rfCodes
        return new Promise(function(resolve, reject) {
            console.log(codes[socket])
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

    var createEmitter = function(lights) {
        return new Promise(function(resolve, reject) {
            var lightLength = lights.length;
            console.log('lights length ' + lightLength)

            var emitter =  {}

            for(var x = 0; x < lightLength; x++) {
                console.log(x)
                console.log(lights[x])
                emitter[lights[x]] = rpi433.emitter({ pin: 0, pulseLength: 178 });
            }
            console.log(emitter)
            resolve(emitter)
        })
    }

    var emitOff = function(params) {
        var codes = settings.rfCodes
        console.log(params)
        return new Promise(function(resolve, reject) {
            params.emit.sendCode(codes[params.light].off, function(error, stdout) {  
                if(!error) 
                console.log(stdout); 
                resolve('on')
            })
        })
    }
    var turnAllLightsOff = function(lights) {
            var codes = settings.rfCodes
        return new Promise(function(resolve, reject) {
            console.log('turn off');
            createEmitter(lights)
            .then(function(emitters) {
                console.log('emit')
                console.log(emitters)

                var lightLength = lights.length;
                console.log('emit for looop');

                for(var i = 0; i < lightLength ; i++) {
                    console.log('i ' +i)
                    console.log(lights[i])
                    params = {
                        emit: emitters[lights[" " + i]],
                        light: i,
                    }
                    console.log('emit params')
                    emitOff(params)
                }
            })
            .then(resolve)
            .catch(reject)
            
        })
    }
    var turnLightOff = function(socket) {
        console.log('turnLightOff');
        var codes = settings.rfCodes
        return new Promise(function(resolve, reject) {
            console.log(codes[socket])

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

    var turnMultiLightsOn = function(lights) {
        var codes = settings.rfCodes
        return new Promise(function(resolve, reject) {
            rfEmitter = rpi433.emitter({
                pin: 0,                     //Send through GPIO 0 (or Physical PIN 11)
                pulseLength: 178            //Send the code with a 178 pulse length
            });

            var lights = lights.length;

             
            rfEmitter.sendCode(codes['one'].on, function(error, stdout) {  
                if(!error) 
                console.log(stdout); 

            }).then(function(){
                RfEmitter = rpi433.emitter({
                    pin: 0,                     
                    pulseLength: 178            
                });
                rfEmitter.sendCode(codes['three'].on, function(error, stdout) {  
                    if(!error) 
                    console.log(stdout); 

                }).then(function() {
                    RFEmitter = rpi433.emitter({
                        pin: 0,                     
                        pulseLength: 178            
                    });
                    rfEmitter.sendCode(codes['five'].on, function(error, stdout) {  
                        if(!error) 
                        console.log(stdout); 
                        resolve('should have turned on all three')
                    })
                })
            })
            .catch(reject)
        })
    }
    return {
        createEmitter: createEmitter,
        turnLightOn: turnLightOn,
        turnLightOff: turnLightOff,
        turnMultiLightsOn: turnMultiLightsOn,
        turnAllLightsOff: turnAllLightsOff
    };
})();
//kick.turnMultiLightsOn(['one', 'three', 'five']);