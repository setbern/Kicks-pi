var request = require('request-promise');
var rpi433 = require('rpi-433');
var moment = require('moment');


var kick = module.exports = (function() {

    var settings = require('../config/settings');
   

    var toggleEmitter = function(params) {
        /** 
            PARAMS = {
                STATUS: BOOL,
                LIGHT: STRING
            }
        **/
        var codes = settings.rfCodes
        return new Promise(function(res,rej){
            console.log('toggleLight')
            console.log(params)
            var emit = rpi433.emitter({
                pin: 0,                     
                pulseLength: 178            
            });

            var status = params.status ? 'on' : 'off';
            emit.sendCode(codes[params.light][status], function(error, stdout) {  
                if(!error) 
                console.log(stdout); 
                res(stdout)
            })
        })
    };
    
    var toggleLights = function(params) {
        console.log('turnAllLightsOff')
            var codes = settings.rfCodes
            var self = this;
        return new Promise(function(resolve, reject) {
            console.log('toggleLights')
            console.log(params)
            var sockets = params.socket
            toggleEmitter(socket[0])
            .then(function(results){
                console.log('results')
                console.log(results)
                if(socket[1]) {
                    return toggleEmitter(socket[1])
                } else{
                    resolve('done');
                }
            })
            .then(function(results){
                console.log('results')
                console.log(results)
                if(socket[2]) {
                    return toggleEmitter(socket[2])
                } else{
                    resolve('done');
                }
            })
            .then(function(result){
                console.log(result)
                if(socket[3]) {
                    return toggleEmitter(socket[3])
                } else{
                    resolve('done');
                }
            })
            .then(function(result){
                console.log(result)
               
                if(socket[4]) {
                    return toggleEmitter(socket[4])
                } else{
                    resolve('done');
                }
            })
            .catch(reject)
        })
    };
   
    return {
        toggleLights: toggleLights
    };
})();
