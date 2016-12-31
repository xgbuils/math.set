const chai = require('chai')
const expect = chai.expect
const MSet = require('math.real-set')
const rawSet = require('math.real-set/src/raw-set')

const Iterum = require('iterum')
const List = Iterum.List

const parserTokenClasses = require('../../src/parser/tokens/')

const parserStatus = require('parser.status')
const parserGenerator = require('parser.generator')
const parser = require('../../src/parser/parser')

function createToken (value, type, column, key) {
    return {
        value: value,
        type: type,
        column: column,
        key: key
    }
}

function createEndToken (column) {
    return {
        type: 'end',
        key: '<<END OF LINE>>',
        column: column
    }
}

describe('parser', function () {
    describe('valid expressions', function () {
        describe('given simple set', function () {
            it('returns an array with the same set that means', function () {
                const set = MSet('(2, 3)')

                // (2, 3)
                const lex = List([
                    createToken(set, 'set'),
                    createEndToken()
                ])
                const parserIterator = parserGenerator(lex.build()(), parserTokenClasses, parserStatus('START_EXPR'))
                const result = parser(parserIterator)
                expect(rawSet(result)).to.be.deep.equal(rawSet(set))
            })
        })

        describe('given a cartesian product of simple sets', function () {
            it('returns the array of sets that means', function () {
                const a = MSet('(2, 3)')
                const b = MSet('[1, 4)')
                const c = MSet('{1, 2, 5}')

                // (2, 3) x [1, 4) x {1, 2, 5}
                const lex = List([
                    createToken(a, 'set'),
                    createToken('x', 'x'),
                    createToken(b, 'set'),
                    createToken('x', 'x'),
                    createToken(c, 'set'),
                    createEndToken()
                ])
                const parserIterator = parserGenerator(lex.build()(), parserTokenClasses, parserStatus('START_EXPR'))
                const result = parser(parserIterator)
                expect(result.map(rawSet)).to.be.deep.equal([a, b, c].map(rawSet))
            })
        })

        describe('given a cartesian product wrapped with extra parenthesis', function () {
            it('returns the array of sets that means omiting extra parenthesis', function () {
                const a = MSet('{1, 2, 5}')
                const b = MSet('[0, 1)')

                // ({1, 2, 5} x [0, 1))
                const lex = List([
                    createToken('(', '('),
                    createToken(a, 'set'),
                    createToken('x', 'x'),
                    createToken(b, 'set'),
                    createToken(')', ')'),
                    createEndToken()
                ])
                const parserIterator = parserGenerator(lex.build()(), parserTokenClasses, parserStatus('START_EXPR'))
                const result = parser(parserIterator)
                expect(result.map(rawSet)).to.be.deep.equal([a, b].map(rawSet))
            })
        })

        describe('given a castesian product of cartesian products', function () {
            it('returns the array of sets that means', function () {
                const a = MSet('{1}')
                const b = MSet('(-1, 2)')
                const c = MSet('{2, 0}')
                const d = MSet('{5} U [3, 4]')

                // ({1} x (-1, 2)) x ({2, 0} x {5} U [3, 4])
                const lex = List([
                    createToken('(', '('),
                    createToken(a, 'set'),
                    createToken('x', 'x'),
                    createToken(b, 'set'),
                    createToken(')', ')'),
                    createToken('x', 'x'),
                    createToken('(', '('),
                    createToken(c, 'set'),
                    createToken('x', 'x'),
                    createToken(d, 'set'),
                    createToken(')', ')'),
                    createEndToken()
                ])
                const parserIterator = parserGenerator(lex.build()(), parserTokenClasses, parserStatus('START_EXPR'))
                const result = parser(parserIterator)
                expect(result.length).to.be.equal(2)
                expect(result[0].length).to.be.equal(2)
                expect(result[1].length).to.be.equal(2)
                expect(result[0].map(rawSet)).to.be.deep.equal([a, b].map(rawSet))
                expect(result[1].map(rawSet)).to.be.deep.equal([c, d].map(rawSet))
            })
        })

        describe('given a castesian power', function () {
            it('returns the array of sets that means', function () {
                const a = MSet('(2, 4)')
                const power = 3

                // (2, 4)^3
                const lex = List([
                    createToken(a, 'set'),
                    createToken('^', '^'),
                    createToken(power, 'number'),
                    createEndToken()
                ])
                const parserIterator = parserGenerator(lex.build()(), parserTokenClasses, parserStatus('START_EXPR'))
                const result = parser(parserIterator)
                expect(result.map(rawSet)).to.be.deep.equal([a, a, a].map(rawSet))
            })
        })

        describe('given a cartesian power and cartesian product', function () {
            it('cartesian power has more priority', function () {
                const a = MSet('(2, 4)')
                const b = MSet('{1, 2}')
                const power = 3

                // (2, 4) x {1, 2}^3
                const lex = List([
                    createToken(a, 'set'),
                    createToken('x', 'x'),
                    createToken(b, 'set'),
                    createToken('^', '^'),
                    createToken(power, 'number'),
                    createEndToken()
                ])
                const parserIterator = parserGenerator(lex.build()(), parserTokenClasses, parserStatus('START_EXPR'))
                const result = parser(parserIterator)
                expect(result.map(rawSet)).to.be.deep.equal([a, b, b, b].map(rawSet))
            })
        })

        describe('given a cartesian power and cartesian product with parenthesis', function () {
            it('cartesian product has more priority', function () {
                const a = MSet('(2, 4)')
                const b = MSet('{1, 2}')
                const power = 3

                // ((2, 4) x {1, 2})^3
                const lex = List([
                    createToken('(', '('),
                    createToken(a, 'set'),
                    createToken('x', 'x'),
                    createToken(b, 'set'),
                    createToken(')', ')'),
                    createToken('^', '^'),
                    createToken(power, 'number'),
                    createEndToken()
                ])
                const parserIterator = parserGenerator(lex.build()(), parserTokenClasses, parserStatus('START_EXPR'))
                const result = parser(parserIterator)
                expect(result.map(function (product) {
                    return product.map(rawSet)
                })).to.be.deep.equal([
                    [a, b].map(rawSet),
                    [a, b].map(rawSet),
                    [a, b].map(rawSet)
                ])
            })
        })

        describe('given a cartesian product of sets wrapped with extra parenthesis', function () {
            it('returns the array of sets that means omiting extra parenthesis', function () {
                const a = MSet('(2, 4)')
                const b = MSet('{3}')
                const c = MSet('[1, 5]')

                // ((((2, 4))) x (({3}) x [1, 5]))
                const lex = List([
                    createToken('(', '('),
                    createToken('(', '('),
                    createToken('(', '('),
                    createToken(a, 'set'),
                    createToken(')', ')'),
                    createToken(')', ')'),
                    createToken('x', 'x'),
                    createToken('(', '('),
                    createToken('(', '('),
                    createToken(b, 'set'),
                    createToken(')', ')'),
                    createToken('x', 'x'),
                    createToken(c, 'set'),
                    createToken(')', ')'),
                    createToken(')', ')'),
                    createEndToken()
                ])
                const parserIterator = parserGenerator(lex.build()(), parserTokenClasses, parserStatus('START_EXPR'))
                const result = parser(parserIterator)
                expect(rawSet(result[0])).to.be.deep.equal(rawSet(a))
                expect(result[1].map(rawSet)).to.be.deep.equal([b, c].map(rawSet))
            })
        })
    })

    describe('invalid expressions', function () {
        describe('given only a left parenthesis', function () {
            it('throws an error', function () {
                const column = 5

                function test () {
                    // (
                    const lex = List([
                        createToken('(', '('),
                        createEndToken(column)
                    ])
                    const parserIterator = parserGenerator(lex.build()(), parserTokenClasses, parserStatus('START_EXPR'))
                    parser(parserIterator)
                }

                expect(test).to.throw('Unexpected token `<<END OF LINE>>` in column ' + column + '.')
            })
        })

        describe('given only a right parenthesis', function () {
            it('throws an error', function () {
                const column = 90
                const key = ')'

                function test () {
                    // )
                    const lex = List([
                        createToken(')', ')', column, key),
                        createEndToken()
                    ])
                    const parserIterator = parserGenerator(lex.build()(), parserTokenClasses, parserStatus('START_EXPR'))
                    parser(parserIterator)
                }

                expect(test).to.throw('Unexpected token `' + key + '` in column ' + column + '.')
            })
        })

        describe('given only a power symbol', function () {
            it('throws an error', function () {
                const column = 32
                const key = '^'

                function test () {
                    // ^
                    const lex = List([
                        createToken('^', '^', column, key),
                        createEndToken()
                    ])
                    const parserIterator = parserGenerator(lex.build()(), parserTokenClasses, parserStatus('START_EXPR'))
                    parser(parserIterator)
                }

                expect(test).to.throw('Unexpected token `' + key + '` in column ' + column + '.')
            })
        })

        describe('given only a cartesian product symbol', function () {
            it('throws an error', function () {
                const column = 61
                const key = 'x'

                function test () {
                    // x
                    const lex = List([
                        createToken('x', 'x', column, key),
                        createEndToken()
                    ])
                    const parserIterator = parserGenerator(lex.build()(), parserTokenClasses, parserStatus('START_EXPR'))
                    parser(parserIterator)
                }

                expect(test).to.throw('Unexpected token `' + key + '` in column ' + column + '.')
            })
        })

        describe('given only a number', function () {
            it('throws an error', function () {
                const column = 21
                const number = 5
                const key = number.toString()

                function test () {
                    // 5
                    const lex = List([
                        createToken(number, 'number', column, key),
                        createEndToken()
                    ])
                    const parserIterator = parserGenerator(lex.build()(), parserTokenClasses, parserStatus('START_EXPR'))
                    parser(parserIterator)
                }

                expect(test).to.throw('Unexpected token `' + key + '` in column ' + column + '.')
            })
        })

        describe('given empty list of tokens', function () {
            it('throws an error', function () {
                const column = 12

                function test () {
                    //
                    const lex = List([
                        createEndToken(column)
                    ])
                    const parserIterator = parserGenerator(lex.build()(), parserTokenClasses, parserStatus('START_EXPR'))
                    parser(parserIterator)
                }

                expect(test).to.throw('Unexpected token `<<END OF LINE>>` in column ' + column + '.')
            })
        })

        describe('given not ended cartesian product', function () {
            it('throws an error', function () {
                const column = 16

                function test () {
                    const a = MSet('(2, 4)')

                    //
                    const lex = List([
                        createToken(a, 'set'),
                        createToken('x', 'x'),
                        createEndToken(column)
                    ])
                    const parserIterator = parserGenerator(lex.build()(), parserTokenClasses, parserStatus('START_EXPR'))
                    parser(parserIterator)
                }

                expect(test).to.throw('Unexpected token `<<END OF LINE>>` in column ' + column + '.')
            })
        })

        describe('given extra right parenthesis in cartesian product', function () {
            it('throws an error', function () {
                const column = 23
                const key = ')'

                function test () {
                    const a = MSet('(2, 4)')
                    const b = MSet('{8}')

                    //
                    const lex = List([
                        createToken(a, 'set'),
                        createToken('x', 'x'),
                        createToken(b, 'set'),
                        createToken(')', ')', column, key),
                        createEndToken()
                    ])
                    const parserIterator = parserGenerator(lex.build()(), parserTokenClasses, parserStatus('START_EXPR'))
                    parser(parserIterator)
                }

                expect(test).to.throw('Unexpected token `' + key + '` in column ' + column + '.')
            })
        })

        describe('given set as exponent of cartesian power', function () {
            it('throws an error', function () {
                const column = 16
                const key = '{8}'

                function test () {
                    const a = MSet('(2, 4)')
                    const b = MSet(key)

                    //
                    const lex = List([
                        createToken(a, 'set'),
                        createToken('^', '^'),
                        createToken(b, 'set', column, key),
                        createEndToken()
                    ])
                    const parserIterator = parserGenerator(lex.build()(), parserTokenClasses, parserStatus('START_EXPR'))
                    parser(parserIterator)
                }

                expect(test).to.throw('Unexpected token `' + key + '` in column ' + column + '.')
            })
        })
    })
})
