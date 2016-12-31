const ParserToken = require('parser.token')

class PowerToken extends ParserToken {
    constructor (token) {
        super(token, [
            'NESTED_SEPARATOR_TUPLE',
            'SEPARATOR_TUPLE'
        ], next)
    }
}

function next (status) {
    return status.replace('SEPARATOR_TUPLE', 'ARGUMENT_NUMBER')
}

module.exports = PowerToken
