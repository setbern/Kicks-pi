var request = require('request-promise');


var kick = module.exports = (function() {

    var constants = require('../config/constants');

    var json = request.defaults({
        json: true,
        
    });
    var startFeed = function(io) {
        console.log('startFeed');
        
        return new Promise(function(resolve, reject) {


           
           
            // var BTC = io.of('/BTC');
            // var ETH = io.of('/ETH');
            // var XRP = io.of('/XRP');
            // var DASH = io.of('/DASH');
            // var LTC = io.of('/LTC');
            // var XMR = io.of('/XMR');



            
                
           
        });        
    };
    return {
        startFeed: startFeed
    };
})();
