var chai = require('chai')
var expect = chai.expect
var RealSet = require('math.real-set')
var rawSet = require('math.real-set/src/raw-set')

var parse = require('../../src/parser/')

describe('set parser', function () {
    describe('valid expressions', function () {
        describe('given a real set', function () {
            it('returns an array with the same set that means', function () {
                var expr = '(-1, 8)'
                var set = RealSet(expr)
                var result = parse(expr)
                expect(rawSet(result)).to.be.deep.equal(rawSet(set))
            })
        })

        describe('given a complex nested product of real sets', function () {
            it('returns the array structure of sets that means', function () {
                var a = '{1, 5}'
                var R = RealSet('(-Infinity, Infinity)')
                var b = '(0, 1]'
                var aset = RealSet(a)
                var bset = RealSet(b)
                var expr = '(' + a + '^3 x ((R)^2 x ' + b + '))'

                var result = parse(expr, {
                    R: R
                })
                expect(result.length).to.be.equal(4)
                expect(result.slice(0, 3).map(rawSet)).to.be.deep.equal([aset, aset, aset].map(rawSet))
                expect(result[3].map(rawSet)).to.be.deep.equal([R, R, bset].map(rawSet))
            })
        })
    })
})
