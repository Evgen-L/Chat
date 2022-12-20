import {sum, multiplier, division, subtraction} from './calculations'

describe(
    'calculations tests', function(){
        test('test sum', () =>
        {
            expect(sum(2, 2)).toBe(4)
        })

        test('test subtraction', () =>
        {
            expect(subtraction(10, 7)).toBe(3)
        })

        test('test multiplier', () =>
        {
            expect(multiplier(2, 3)).toBe(6)
        })

        test('test division', () =>
        {
            expect(division(10, 2)).toBe(5)
        })
})