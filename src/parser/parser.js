function parser (parserIterator) {
    var iterator = parserIterator
    var status = iterator.next()
    var value
    while (!status.done) {
        value = status.value
        status = iterator.next()
    }
    return value
}

module.exports = parser
