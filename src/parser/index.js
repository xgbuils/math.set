const lexerGenerator = require('lexer.generator')
const lexerConfig = require('./lexer-config')
const parserGenerator = require('parser.generator')
const parserTokenClasses = require('./tokens/')
const parserStatus = require('parser.status')

const parser = require('./parser')

function parse (string, sets, RealSet) {
    const lexerIterator = lexerGenerator(string, lexerConfig({sets, RealSet}))
    const parserIterator = parserGenerator(lexerIterator, parserTokenClasses, parserStatus('START_EXPR'))
    return parser(parserIterator)
}

module.exports = parse
