import { split, select, find } from '../src/utils'

test('split', () => {
  expect(split([1, 2])).toEqual([[1, 2]])
  expect(split([1, 2, 3, 4])).toEqual([[1, 2, 3, 4]])
  expect(split([1, 2, 3, 4, 5])).toEqual([[1, 2, 3, 4], [5]])
  expect(split([1, 2, 3, 4, 5, 6, 7, 8, 9])).toEqual([[1, 2, 3, 4], [5, 6, 7, 8], [9]])
})

test('select', () => {
  const object = { a: 1, b: 2, c: 3 }
  expect(select(['a', 'b'])(object)).toEqual({ a: 1, b: 2 })
  expect(select(['a', 'd', 'c'])(object)).toEqual({ a: 1, c: 3 })
})

test('find', () => {
  const object = {
    a: 1, b: 2, c: 3, aa: { a: 'a', c: { a: 1 } },
  }
  expect(find(['a', 'b', 'c'], object)).toEqual({ a: [1, 'a'], b: [2], c: [3, { a: 1 }] })
})
