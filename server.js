var express = require('express');
var path = require('path');
var fs = require('fs');

var app = express();

var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? 80 : 3000;

// var settings = require('./api/config/settings');
// app.use(settings.forceHttps);

var cors = require('cors');

var whitelist = [
    'http://localhost:8080',
    'http://localhost:3000'
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

var server = require('http').createServer(app);
var io = require('socket.io')(server);


io.on('connection', function(data) {
    console.log('brack bracka');
});

// GraphiQL Docs
// var graphqlHTTP = require('express-graphql');
// var apiSchema = require('./api/schema');

// app.use('/api/v/:vid/graph', graphqlHTTP(function(req, res) {
//     return {
//         schema: apiSchema,
//         rootValue: {
//             req: req,
//             res: res
//         },
//         pretty: true,
//         graphiql: true
//     };
// }));


server.listen(port, function() {
    console.log('SetLife-ApiOnly: Server running on port ' + port);
});