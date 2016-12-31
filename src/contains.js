module.exports = function (deps) {
    const RealSet = deps.RealSet
    return function contains (a, b) {
        const firstIsRealSet = a instanceof RealSet
        const comparable = firstIsRealSet
            ? b instanceof RealSet
            : Array.isArray(b) && a.length === b.length
        if (comparable) {
            return firstIsRealSet
                ? a.contains(b)
                : a.every((x, i) => contains(x, b[i]))
        }
        return false
    }
}
