const colors = require('colors');

class Logger {
    static success(...info) {
        return console.log(`${info}`.green);
    }

    static error(...error) {
        return console.log(`${error}`.red);
    }

    static warn(...warn) {
        return console.log(`${warn}`.yellow);
    }

    static db(...db) {
        return console.log(`${db}`.cyan);
    }

    static log(...db) {
        return console.log(`${db}`.magenta);
    }
}

module.exports = Logger;
