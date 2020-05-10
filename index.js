const _ = require('lodash')
const chalk = require('chalk');

let colorize = color => a => {
    if (typeof a !== 'string') return a
    let chalkElement = chalk[color];
    if (!chalkElement) return a
    return chalkElement(a);
};


const defaultParams = {
    prefix: null,
    levels: {
        log: {color: 'white'},
        debug: {color: 'white'},
        info: {color: 'green'},
        warn: {color: 'yellow'},
        error: {color: 'red'},
    }
}

const configureNode = (params) => {

    params = _.merge(defaultParams, params);

    _.entries(params.levels).forEach(([level, {color, prefix}]) => {
        const log = console[level]
        console[level] = function () {
            let now = new Date()
            let formatted_date = `${now.getUTCDate()}-${now.getUTCMonth() + 1}-${now.getUTCFullYear()} ${now.getUTCHours()}:${now.getUTCMinutes()}:${now.getUTCSeconds()}.${now.getUTCMilliseconds()}`
            const datePrefix = _.padEnd(`[${ formatted_date}]`, 23);
            const levelPrefix = _.padEnd(`[${ level}]`, 7)
            const prefix = params.prefix || prefix
            const all = [datePrefix, levelPrefix]
            if (prefix) all.push(prefix)
            all.push(...arguments)

            log(...all.map(colorize(color)))
        };
    });


}


module.exports = {
    configureNode
}
