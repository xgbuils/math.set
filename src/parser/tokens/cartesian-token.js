const ParserToken = require('parser.token')

class CartesianToken extends ParserToken {
    constructor (token) {
        super(token, [
            'NESTED_SEPARATOR_TUPLE',
            'SEPARATOR_TUPLE'
        ], next)
    }
}

function next (status) {
    return status.substring(0, 6) === 'NESTED'
        ? 'NESTED_ARGUMENT_TUPLE'
        : 'ARGUMENT_TUPLE'
}

module.exports = CartesianToken
