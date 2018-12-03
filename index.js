const http = require('http');
const finalhandler = require('finalhandler');
const serveStatic = require('serve-static');
const morgan = require('morgan');
const argv = require('minimist')(process.argv.slice(2));

const logger = morgan('tiny');
const serve = serveStatic('./public');
const server = http.createServer((req, res) => {
    const done = finalhandler(req, res);
    logger(req, res, (err) => {
        if (err) return done(err)
        serve(req, res, done);
    });
});

const logUnhandledError = (err, label) => {
    if (err && err.stack) {
        logger.error(`process(${label}):`, err.stack);
    }
    else {
        logger.error(`process(${label}):`, err && err.message || err);
    }
};

process.on('uncaughtException', (err) => {
    logUnhandledError(err, 'uncaughtException');
    process.exit(1);
});

process.on('unhandledRejection', (err) => {
    logUnhandledError(err, 'unhandledRejection');
});

server.on('error', (err) => {
    logUnhandledError(err, 'serverError');
});

const port = argv.port || process.env.PORT || 31337;
server.listen(port, (err) => {
    if (err) {
        logUnhandledError(err, 'listen');
        process.exit(1);
    }
    console.log(`Server started http://localhost:${port}`)
} );