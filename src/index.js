const contains = require('./contains')
const parse = require('./parser/')
const RealSet = require('math.real-set')

const factory = require('./factory')

const Rdep = {
    RealSet: RealSet
}

module.exports = factory(Object.assign(Rdep, {
    contains: contains(Rdep),
    parse: parse
}))
