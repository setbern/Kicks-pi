//node_modules
var express = require('express');
var path = require('path');
var fs = require('fs');
var rpi433 = require('rpi-433');

var app = express();

var kick = require('./api/handlers/kick');


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



var moment = require('moment');

io.on('connection', function(socket) {

    console.log('brack bracka');
    let now = moment().format('H');
    if (now >= 20) {

    }
    console.log(now)
    
    // kick.toggleLights(
    //     [
    //         {
    //             light: 'one',
    //             status: true

    //         },
    //         {
    //             light: 'three',
    //             status: true
                
    //         },
    //         {
    //             light: 'four',
    //             status: true
                
    //         },
    //         {
    //             light: 'five',
    //             status: true
                
    //         } 
    //     ]);
    socket.on('on', function(data, from) {
        console.log('socket on')
        console.log(data)
        kick.turnLightOn(data)
        
    })
    socket.on('off', function(data, from) {
        console.log('socket off')
        console.log(data)
        kick.turnLightOff(data)
    })

    socket.on('disconnect', () => {
        console.log('Socket disconnected: ')
        // kick.toggleLights(
        //     [
        //         {
        //             light: 'one',
        //             status: false

        //         },
        //         {
        //             light: 'three',
        //             status: false
                    
        //         },
        //         {
        //             light: 'four',
        //             status: false
                    
        //         },
        //         {
        //             light: 'five',
        //             status: false
                    
        //         } 
        //     ]);

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