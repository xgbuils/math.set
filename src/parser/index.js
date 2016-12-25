var lexerGenerator = require('lexer.generator')
var lexerConfig = require('./lexer-config')
var parserGenerator = require('parser.generator')
var parserTokenClasses = require('./tokens/')
var parserStatus = require('parser.status')

var parser = require('./parser')

function parse (string, aliasSets) {
    var lexerIterator = lexerGenerator(string, lexerConfig(aliasSets))
    var parserIterator = parserGenerator(lexerIterator, parserTokenClasses, parserStatus('START_EXPR'))
    return parser(parserIterator)
}

module.exports = parse
