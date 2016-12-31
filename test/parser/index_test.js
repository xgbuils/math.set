const chai = require('chai')
const expect = chai.expect
const RealSet = require('math.real-set')
const rawSet = require('math.real-set/src/raw-set')

const parse = require('../../src/parser/')

describe('set parser', function () {
    describe('valid expressions', function () {
        describe('given a real set', function () {
            it('returns an array with the same set that means', function () {
                const expr = '(-1, 8)'
                const set = RealSet(expr)
                const result = parse(expr)
                expect(rawSet(result)).to.be.deep.equal(rawSet(set))
            })
        })

        describe('given a complex nested product of real sets', function () {
            it('returns the array structure of sets that means', function () {
                const a = '{1, 5}'
                const R = RealSet('(-Infinity, Infinity)')
                const b = '(0, 1]'
                const aset = RealSet(a)
                const bset = RealSet(b)
                const expr = '(' + a + '^3 x ((R)^2 x ' + b + '))'

                const result = parse(expr, {
                    R: R
                })
                expect(result.length).to.be.equal(4)
                expect(result.slice(0, 3).map(rawSet)).to.be.deep.equal([aset, aset, aset].map(rawSet))
                expect(result[3].map(rawSet)).to.be.deep.equal([R, R, bset].map(rawSet))
            })
        })
    })
})
