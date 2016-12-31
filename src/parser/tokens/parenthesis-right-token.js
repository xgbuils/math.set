function next (status, values) {
    const parserStatus = this.parserStatus
    parserStatus.pop()
    if (values.length === 1) {
    	values = values[0]
    }
    parserStatus.addValue(values)
    return parserStatus.getStatus()
}

module.exports = deps => class ParenthesisRightToken extends deps.ParserToken {
    constructor (token) {
        super(token, [
            'NESTED_SEPARATOR_TUPLE'
        ], next)
    }
}
