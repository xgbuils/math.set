function next (status) {
    if (status === 'START_EXPR') {
        this.parserStatus.push('END_EXPR')
    }
    this.parserStatus.push('NESTED_SEPARATOR_TUPLE')
    return 'NESTED_ARGUMENT_TUPLE'
}

module.exports = deps => class ParenthesisLeftToken extends deps.ParserToken {
    constructor (token) {
        super(token, [
            'START_EXPR',
            'NESTED_ARGUMENT_TUPLE',
            'ARGUMENT_TUPLE'
        ], next)
    }
}
