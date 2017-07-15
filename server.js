//node_modules
var express = require('express');
var path = require('path');
var fs = require('fs');
var rpi433 = require('rpi-433');

var app = express();

var kicks = require('./api/handlers/kick');


//env setup
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT: 3000;

// var settings = require('./api/config/settings');
// app.use(settings.forceHttps);

//cors setup
var cors = require('cors');

var whitelist = [
    'http://localhost:8080',
    'http://localhost:3000',
    'https://kicks-pi.herokuapp.com/',
    'http://kicks-pi.herokuapp.com/',
];
var corsOptions = {
    origin: function(origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true,
    methods: ['GET,PUT,POST,DELETE,OPTIONS'],
    allowedHeaders: ['Access-Control-Allow-Headers', 'Origin', 'Access-Control-Allow-Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Cache-Control']
};
app.use(cors(corsOptions));

//Socket.io setup
var server = require('http').createServer(app);
var io = require('socket.io')(server);


io.on('connection', function(socket) {
    console.log('brack bracka');

    socket.on('on', function(data, from) {
        console.log('data');
        console.log(data)
        rfEmitter = rpi433.emitter({
              pin: 0,                     //Send through GPIO 0 (or Physical PIN 11)
              pulseLength: 178            //Send the code with a 178 pulse length
            });


        rfEmitter.sendCode(29955, function(error, stdout) {   
            if(!error) 
            console.log(stdout); 
        }).then(function(rfEmitter){
            rfEmitter.sendCode(23811, function(error, stdout) {   
                if(!error) 
                console.log(stdout);
            });
        })

        
       
        
    })
    socket.on('off', function(data, from) {
        console.log('data');
        console.log(data)
        rfEmitter = rpi433.emitter({
            pin: 0,                     //Send through GPIO 0 (or Physical PIN 11)
            pulseLength: 178            //Send the code with a 178 pulse length
        });

        rfEmitter.sendCode(29964, function(error, stdout) {   
            if(!error) console.log(stdout); 
        }).then(function(rfEmitter) {
            rfEmitter.sendCode(23820, function(error, stdout) {   
                if(!error) console.log(stdout); 
            });
        })
       
    })
});


//GraphiQL  setup
var graphqlHTTP = require('express-graphql');
var apiSchema = require('./api/schema');

app.use('/api/v/:vid/graph', graphqlHTTP(function(req, res) {
    return {
        schema: apiSchema,
        rootValue: {
            req: req,
            res: res,
            io: io,
        },
        pretty: true,
        graphiql: true
    };
}));


server.listen(port, function() {
    console.log('SetLife-ApiOnly: Server running on port ' + port);
    //kicks.startFeed(io);
});