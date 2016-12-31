function next (status) {
    return status.replace('SEPARATOR_TUPLE', 'ARGUMENT_NUMBER')
}

module.exports = deps => class PowerToken extends deps.ParserToken {
    constructor (token) {
        super(token, [
            'NESTED_SEPARATOR_TUPLE',
            'SEPARATOR_TUPLE'
        ], next)
    }
}
