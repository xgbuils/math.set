function parser (iterator) {
    let status = iterator.next()
    let value
    while (!status.done) {
        value = status.value
        status = iterator.next()
    }
    return value
}

module.exports = parser
