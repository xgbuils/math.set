const ParserToken = require('parser.token')
const deps = {ParserToken}
const ParenthesisLeftToken = require('./parenthesis-left-token')(deps)
const SetToken = require('./set-token.js')(deps)
const CartesianToken = require('./cartesian-token.js')(deps)
const ParenthesisRightToken = require('./parenthesis-right-token')(deps)
const PowerToken = require('./power-token')(deps)
const NumberToken = require('./number-token')(deps)
const EndToken = require('./end-token')(deps)

module.exports = {
    'set': SetToken,
    '(': ParenthesisLeftToken,
    ')': ParenthesisRightToken,
    'x': CartesianToken,
    '^': PowerToken,
    'number': NumberToken,
    'end': EndToken
}
