const _ = require('lodash')
const chalk = require('chalk');

let colorize = color => a => {
    if (typeof a !== 'string') return a
    let chalkElement = chalk[color];
    if (!chalkElement) return a
    return chalkElement(a);
};



const configureNode = () => {
let params = [['log', 'white'], ['debug', 'white'], ['info', 'green'], ['warn', 'yellow'], ['error', 'red']];

params.forEach(([level, color]) => {
    const log = console[level]
    console[level] = function () {
        let now = new Date()
        let formatted_date = `${now.getUTCDate()}-${now.getUTCMonth() + 1}-${now.getUTCFullYear()} ${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()}.${now.getUTCMilliseconds()}`
        const datePrefix = _.padEnd(`[${ formatted_date}]`, 23);
        const levelPrefix = _.padEnd(`[${ level}]`, 7)
        log(...([`${datePrefix}`, `${levelPrefix}`, ...arguments].map(colorize(color))))
    };
});


}


module.exports = {
    configureNode
}