var rpi433  = require('rpi-433');
    
var rfSniffer = rpi433.sniffer({
      pin: 2,                     //Snif on GPIO 2 (or Physical PIN 13)
      debounceDelay: 500          //Wait 500ms before reading another code
    }),
    

// Receive (data is like {code: xxx, pulseLength: xxx})
rfSniffer.on('data', function (data) {
    console.log('shit went off')
  console.log('Code received: '+data.code+' pulse length : '+data.pulseLength);
});