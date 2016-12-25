var ParserToken = require('parser.token')

function SetToken (token) {
    ParserToken.call(this, token, [
        'START_EXPR',
        'NESTED_ARGUMENT_TUPLE',
        'ARGUMENT_TUPLE'
    ], next)
}

SetToken.prototype = Object.create(ParserToken.prototype)
SetToken.prototype.constructor = SetToken

function next (status) {
    var parserStatus = this.parserStatus
    if (status === 'START_EXPR') {
        parserStatus.push('END_EXPR')
    }
    parserStatus.addValue(this.value)
    return status === 'START_EXPR'
        ? 'SEPARATOR_TUPLE'
        : status.replace('ARGUMENT', 'SEPARATOR')
}

module.exports = SetToken
