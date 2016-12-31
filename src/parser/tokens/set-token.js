const ParserToken = require('parser.token')

class SetToken extends ParserToken {
    constructor (token) {
        super(token, [
            'START_EXPR',
            'NESTED_ARGUMENT_TUPLE',
            'ARGUMENT_TUPLE'
        ], next)
    }
}

function next (status) {
    const parserStatus = this.parserStatus
    if (status === 'START_EXPR') {
        parserStatus.push('END_EXPR')
    }
    parserStatus.addValue(this.value)
    return status === 'START_EXPR'
        ? 'SEPARATOR_TUPLE'
        : status.replace('ARGUMENT', 'SEPARATOR')
}

module.exports = SetToken
