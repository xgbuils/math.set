const ParserToken = require('parser.token')

function PowerToken (token) {
    ParserToken.call(this, token, [
        'NESTED_SEPARATOR_TUPLE',
        'SEPARATOR_TUPLE'
    ], next)
}

PowerToken.prototype = Object.create(ParserToken.prototype)
PowerToken.prototype.constructor = PowerToken

function next (status) {
    return status.replace('SEPARATOR_TUPLE', 'ARGUMENT_NUMBER')
}

module.exports = PowerToken
