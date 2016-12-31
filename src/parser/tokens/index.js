const ParenthesisLeftToken = require('./parenthesis-left-token')
const SetToken = require('./set-token.js')
const CartesianToken = require('./cartesian-token.js')
const ParenthesisRightToken = require('./parenthesis-right-token')
const PowerToken = require('./power-token')
const NumberToken = require('./number-token')
const EndToken = require('./end-token')

module.exports = {
    'set': SetToken,
    '(': ParenthesisLeftToken,
    ')': ParenthesisRightToken,
    'x': CartesianToken,
    '^': PowerToken,
    'number': NumberToken,
    'end': EndToken
}
