const ParserToken = require('parser.token')

function ParenthesisRightToken (token) {
    ParserToken.call(this, token, [
        'NESTED_SEPARATOR_TUPLE'
    ], next)
}

ParenthesisRightToken.prototype = Object.create(ParserToken.prototype)
ParenthesisRightToken.prototype.constructor = ParenthesisRightToken

function next (status, values) {
    const parserStatus = this.parserStatus
    parserStatus.pop()
    if (values.length === 1) {
    	values = values[0]
    }
    parserStatus.addValue(values)
    return parserStatus.getStatus()
}

module.exports = ParenthesisRightToken
