import { products } from './products'

export const filter = {
  category: [{ content: 'Áo thun' }, { content: 'Áo somi' }, { content: 'Quần jean' }],
  color: [
    { content: 'trắng' },
    { content: 'Hồng' },
    { content: 'Cam' },
    { content: 'Vàng' },
    { content: 'Xanh dương' },
  ],
  size: [
    { content: 'S' },
    { content: 'L' },
    { content: 'M' },
    { content: 'XL' },
    { content: 'XXL' },
  ],
}

export const MockFilterData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(filter)
    }, 1000)
  })
}

export const MockFilterProduct = () => {
  return new Promise((reslove, reject) => {
    setTimeout(() => {
      reslove(products)
    }, 1000)
  })
}
