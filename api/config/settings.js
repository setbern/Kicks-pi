module.exports = {
    // Database configuration
    // API Access Keys - AS ENVIRONMENT VARIABLES ONLY
    // Custom config functions
    db: {
        host: 'insert rds database host',
        port: '3306',
        database: 'main',
        user: 'admin',
        timezone: 'Z',
        connectionLimit: 1000,
        password: 'make this password secure',
        waitForConnection: true,
        queueLimit: 0,
        acquireTimeout: 100000,
        knexConfig: {
            client: 'mysql',
            connection: {
                host: 'insert rds database host',
                port: '3306',
                database: 'main',
                user: 'admin',
                timezone: 'Z',
                connectionLimit: 1000,
                password: 'make this password secure',
                charset: 'UTF8_GENERAL_CI'
            }
        }
    },
    apiKeys: {
        aws: {
            accessKeyId: 'Do not hardcode AWS keys',
            secretAccessKey: 'Use environment variables'
        }
    },
    forceHttps: function(req, res, next) {
        var isProduction = process.env.NODE_ENV != null;

        if (isProduction && req.get('x-forwarded-proto') == 'http') {
            res.redirect('https://setdev.io' + req.url);
        } else {
            next();
        }
    }
};
