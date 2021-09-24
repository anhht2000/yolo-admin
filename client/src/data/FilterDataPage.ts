export interface FilterInterFace {
  [a: string]: {
    content: string;
    use?: boolean;
  }[]
}
export const data : FilterInterFace = {
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
  return new Promise<{filter:FilterInterFace,filter_helper:string[]}>((resolve,reject)=> {
    setTimeout(()=> {
      var helper: string[] = []
      for(const key in data) {
        helper.push(key);
        for(const element of data[key]) {
          element.use = false;
        }
      }
      resolve({filter: data, filter_helper: helper})
    },1000)
  })
}
