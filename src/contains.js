module.exports = function (deps) {
    const RealSet = deps.RealSet
    return function contains (a, b) {
        const firstIsRealSet = a instanceof RealSet
        const comparable = firstIsRealSet
            ? b instanceof RealSet
            : Array.isArray(b) && a.length === b.length
        if (comparable) {
            if (firstIsRealSet) {
                return a.contains(b)
            } else {
                return a.every((x, i) => contains(x, b[i]))
            }
        }
        return false
    }
}
