const ParserToken = require('parser.token')

class EndToken extends ParserToken {
    constructor (token) {
        super(token, [
            'END_EXPR',
            'SEPARATOR_TUPLE',
            'NESTED_SEPARATOR_TUPLE'
        ], next)
    }
}

function next () {
    const parserStatus = this.parserStatus
    let value = parserStatus.pop()
    if (value.length === 1) {
        value = value[0]
    }
    parserStatus.addValue(value)
    return true
}

module.exports = EndToken
