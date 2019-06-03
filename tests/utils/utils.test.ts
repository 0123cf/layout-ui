import { getSTyleStr, id } from '../../src/utils/utils'

test('id', () => {
    expect(id(1)).toBe(1)
    expect(id(null)).toBe(null)
    expect(id(void 0)).toBe(void 0)
})
describe('css class utils getSTyleStr', () => {
    it('带大写的属性', () => {
        expect(getSTyleStr({backgroundColor: "rgba(216,52,52,1)"}))
        .toBe('background-color: rgba(216,52,52,1);')
    })
    it('单个属性', () => {
        expect(getSTyleStr({width: "30px", height: "30px"}))
        .toBe('width: 30px;height: 30px;')
    })
})