import { getSTyleStr, id, setTreeData, addTreeData, delectTreeData } from '../../src/utils/utils'

test('id', () => {
    expect(id(1)).toBe(1)
    expect(id(null)).toBe(null)
    expect(id(void 0)).toBe(void 0)
})
describe('css class utils getSTyleStr', () => {
    it('带大写的属性', () => {
        expect(getSTyleStr({ backgroundColor: "rgba(216,52,52,1)" }))
            .toBe('background-color: rgba(216,52,52,1);')
    })
    it('单个属性', () => {
        expect(getSTyleStr({ width: "30px", height: "30px" }))
            .toBe('width: 30px;height: 30px;')
    })
})
describe('test AST', () => {
    it('set', () => {
        expect(
            addTreeData(
                [{
                    "tag": "div", "css": [""], "style": {},
                    "children": []
                }],
                {
                    path: [0, 0],
                    childrenName: 'children',
                    value: { "tag": "div", "css": ["flex", "al-flex-center-x", ""], "style": {}, "innerText": "aa", "children": [] }
                }
            )
        ).toEqual([{
            "tag": "div", "css": [""], "style": {},
            "children": [
                { "tag": "div", "css": ["flex", "al-flex-center-x", ""], "style": {}, "innerText": "aa", "children": [] }
            ]
        }])
    })
    it('add', () => {
        expect(
            setTreeData(
                [{
                    "tag": "div", "css": [""], "style": {},
                    "children": []
                }],
                {
                    path: [0, 0],
                    childrenName: 'children',
                    value: { "tag": "div", "css": ["flex", "al-flex-center-x"], "style": {}, "innerText": "QAQ", "children": [] }
                }
            )
        ).toEqual([{
            "tag": "div", "css": [""], "style": {},
            "children": [
                { "tag": "div", "css": ["flex", "al-flex-center-x"], "style": {}, "innerText": "QAQ", "children": [] }
            ]
        }])
    })
    it('del', () => {
        expect(
            delectTreeData(
                [{
                    "tag": "div", "css": [""], "style": {},
                    "children": [{ "tag": "img" }]
                }],
                {
                    path: [0, 0],
                    childrenName: 'children'
                }
            )
        ).toEqual([{
            "tag": "div", "css": [""], "style": {},
            "children": []
        }])
        expect(
            delectTreeData(
                [{
                    "tag": "div", "css": [""], "style": {},
                    "children": [{ "tag": "img" }]
                }],
                {
                    path: [0],
                    childrenName: 'children'
                }
            )
        ).toEqual([])
    })
})