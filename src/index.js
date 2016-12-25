var parse = require('./parser/')
var RealSet = require('math.real-set')

function MSet (options) {
    var R = RealSet('(-Infinity, Infinity)')
    var expr
    var given = {}
    if (typeof options === 'string') {
        given.R = R
        expr = options
    } else {
        given = options.given || {}
        given.R = R
        expr = options.set || ''
    }
    this.set = parse(expr, given)
}

module.exports = MSet
