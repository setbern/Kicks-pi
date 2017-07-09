var ses = require('node-ses');

var awsKeys = require('../config/settings').aws;

var client = ses.createClient({ key: awsKeys.accessKeyId, secret: awsKeys.secretAccessKey });

var aws = module.exports = {

    //Basic Send Email, to and from cant be the same email
    sendEmail: function(params) {
        console.log('sendEmail');
        console.log(params);
        
        return new Promise(function(resolve, reject) {
            client.sendEmail({
                to: params.recipient,
                from: params.sender,
                subject: params.subject,
                message: params.message
            },
            function (err, data, res) {
                if (err) reject(err);
                else resolve(res);
            });
        });        
    }
    
};