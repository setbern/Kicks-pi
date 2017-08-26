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

    var turnAllLightOff = function() {
            var codes = settings.rfCodes
        return new Promise(function(resolve, reject) {
            rfEmitter = rpi433.emitter({
                pin: 0,                     //Send through GPIO 0 (or Physical PIN 11)
                pulseLength: 178            //Send the code with a 178 pulse length
            });

            var lights = lights.length;

    
            rfEmitter.sendCode(codes['one'].off, function(error, stdout) {  
                if(!error) 
                console.log(stdout); 

            }).then(function(){
                RfEmitter = rpi433.emitter({
                    pin: 0,                     
                    pulseLength: 178            
                });
                rfEmitter.sendCode(codes['three'].off, function(error, stdout) {  
                    if(!error) 
                    console.log(stdout); 

                }).then(function() {
                    RFEmitter = rpi433.emitter({
                        pin: 0,                     
                        pulseLength: 178            
                    });
                    rfEmitter.sendCode(codes['five'].off, function(error, stdout) {  
                        if(!error) 
                        console.log(stdout); 
                        resolve('should have turned on all three')
                    })
                })
            })
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
        turnLightOn: turnLightOn,
        turnLightOff: turnLightOff,
        turnMultiLightsOn: turnMultiLightsOn,
        turnAllLightOff: turnAllLightOff
    };
})();
//kick.turnMultiLightsOn(['one', 'three', 'five']);