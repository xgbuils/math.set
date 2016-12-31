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

module.exports = deps => class SetToken extends deps.ParserToken {
    constructor (token) {
        super(token, [
            'START_EXPR',
            'NESTED_ARGUMENT_TUPLE',
            'ARGUMENT_TUPLE'
        ], next)
    }
}
