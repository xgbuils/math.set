const ParserToken = require('parser.token')

class NumberToken extends ParserToken {
    constructor (token) {
        super(token, [
            'NESTED_ARGUMENT_NUMBER',
            'ARGUMENT_NUMBER'
        ], next)
    }
}

function next (status, values) {
    const value = values.pop()
    const power = this.value
    for (let i = 0; i < power; ++i) {
        values.push(value)
    }

    return status.replace('ARGUMENT_NUMBER', 'SEPARATOR_TUPLE')
}

module.exports = NumberToken
