const ParserToken = require('parser.token')

function EndToken (token) {
    ParserToken.call(this, token, [
        'END_EXPR',
        'SEPARATOR_TUPLE',
        'NESTED_SEPARATOR_TUPLE'
    ], next)
}

EndToken.prototype = Object.create(ParserToken.prototype)
EndToken.prototype.constructor = EndToken

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
