const chai = require('chai')
const expect = chai.expect
const RealSet = require('math.real-set')

const contains = require('../src/contains')({RealSet})

describe('contains', function () {
    describe('given real sets', function () {
        context('if first set contains the second set', function () {
            it('it returns true', function () {
                const first = RealSet('(-1, 8)')
                const second = RealSet('[2, 3) U {7}')
                expect(contains(first, second)).to.be.equal(true)
            })
        })

        context('if first set does not contain the second set', function () {
            it('it returns false', function () {
                const first = RealSet('(-1, 8)')
                const second = RealSet('[2, 3) U {8}')
                expect(contains(first, second)).to.be.equal(false)
            })
        })
    })

    describe('given 1-deep-arrays of real sets', function () {
        context('if length of arrays is different', function () {
            it('it returns false', function () {
                const first = [RealSet('(-1, 8)')]
                const second = [RealSet('[2, 3) U {7}'), RealSet('{6}')]
                expect(contains(first, second)).to.be.equal(false)
            })
        })

        describe('otherwise', function () {
            context('if each real set of first array contains the real set in the same position of second array', function () {
                it('it returns true', function () {
                    const emptySet = RealSet('(6, 6)')
                    const first = [RealSet('(-1, 8)'), RealSet('{6}')]
                    const second = [RealSet('[2, 3) U {7}'), emptySet]
                    expect(contains(first, second)).to.be.equal(true)
                })
            })

            context('if it exists real set of first array that does not contain the real set in the same position of second array', function () {
                it('it returns false', function () {
                    const first = [RealSet('(-1, 8)'), RealSet('{6}')]
                    const second = [RealSet('[2, 3) U {7}'), RealSet('{8}')]
                    expect(contains(first, second)).to.be.equal(false)
                })
            })
        })
    })

    describe('given 2-deep-arrays of real sets', function () {
        context('if for each real set of first array in position contains the real set of second array in the same position', function () {
            it('it returns true', function () {
                const first = [
                    [RealSet('[2, 3]'), RealSet('[5, 8]')],
                    [RealSet('(0, 5)'), RealSet('(-5, -1)')]
                ]
                const second = [
                    [RealSet('(2, 3)'), RealSet('(5, 8)')],
                    [RealSet('[1, 4]'), RealSet('[-4, -2]')]
                ]
                expect(contains(first, second)).to.be.equal(true)
            })
        })

        context('if for each real set of first array in position does not contain the real set of second array in the same position', function () {
            it('it returns true', function () {
                const first = [
                    [RealSet('[2, 3]'), RealSet('[5, 8]')],
                    [RealSet('(0, 5)'), RealSet('(-5, -1)')]
                ]
                const second = [
                    [RealSet('(2, 3)'), RealSet('(5, 8)')],
                    [RealSet('[0, 5]'), RealSet('[-4, -2]')]
                ]
                expect(contains(first, second)).to.be.equal(false)
            })
        })
    })

    describe('given a real and an array', function () {
        it('it always returns false', function () {
            const first = [RealSet('(-1, 8)')]
            const second = RealSet('[2, 3) U {7}')
            expect(contains(first, second)).to.be.equal(false)
        })
    })
})
