import { IProducts, products } from "./products"

export interface FilterInterFace {
  [a: string]: {
    content: string;
    use?: boolean;
  }[]
}
export const filter : FilterInterFace = {
  category: [
    { content: "Áo thun"},
    { content: 'Áo somi'},
    { content: 'Quần jean'},
  ],
  color: [
    { content: "trắng" },
    { content: 'Hồng'},
    { content: 'Cam'},
    { content: "Vàng"},
    { content: 'Xanh dương'},
  ],
  size: [
    { content: "S"},
    { content: 'L'},
    { content: 'M'},
    { content: 'XL' },
    { content: 'XXL'},
  ]
}

export const MockFilterData = () => {
  return new Promise<FilterInterFace>((resolve,reject)=> {
    setTimeout(()=> {
      resolve(filter)
    },1000)
  })
}

export const MockFilterProduct = () => {
  return new Promise<IProducts[]>((reslove, reject)=>{
    setTimeout(()=>{
      reslove(products)
    },1000)
  })
}
