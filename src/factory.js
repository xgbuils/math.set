module.exports = function (deps) {
    class MSet {
        constructor (expr, given) {
            given = Object.assign(given, {
                R: new deps.RealSet('(-Infinity, Infinity)')
            })
            this._set = deps.parse(expr, given)
        }
        contains (set) {
            return deps.contains(this._set, set._set)
        }
        product (...args) {
            return MSet.product.apply(null, [this._set].concat(args))
        }
    }

    MSet.product = function (...args) {
        return Object.create(MSet.prototype, {
            _set: {
                value: args
            }
        })
    }

    return MSet
}
