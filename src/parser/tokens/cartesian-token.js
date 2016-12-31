const ParserToken = require('parser.token')

function CartesianToken (token) {
    ParserToken.call(this, token, [
        'NESTED_SEPARATOR_TUPLE',
        'SEPARATOR_TUPLE'
    ], next)
}

CartesianToken.prototype = Object.create(ParserToken.prototype)
CartesianToken.prototype.constructor = CartesianToken

function next (status) {
    return status.substring(0, 6) === 'NESTED'
        ? 'NESTED_ARGUMENT_TUPLE'
        : 'ARGUMENT_TUPLE'
}

module.exports = CartesianToken
