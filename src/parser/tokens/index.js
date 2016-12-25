var ParenthesisLeftToken = require('./parenthesis-left-token')
var SetToken = require('./set-token.js')
var CartesianToken = require('./cartesian-token.js')
var ParenthesisRightToken = require('./parenthesis-right-token')
var PowerToken = require('./power-token')
var NumberToken = require('./number-token')
var EndToken = require('./end-token')

module.exports = {
    'set': SetToken,
    '(': ParenthesisLeftToken,
    ')': ParenthesisRightToken,
    'x': CartesianToken,
    '^': PowerToken,
    'number': NumberToken,
    'end': EndToken
}
