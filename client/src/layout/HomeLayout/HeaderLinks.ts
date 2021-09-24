interface IHeaderLink {
  path: string,
  name: string,
}

export const HeaderLinks: IHeaderLink[] = [
  { path:'/', name:'Trang chủ' },
  { path:'/product', name:'Sản phẩm' },
  { path:'/accessory', name:'Phụ kiện' },
  { path:'/contact', name:'Liên hệ' },
];

interface IHeaderIcons {
  className: string,
}

export const HeaderIcons: IHeaderIcons[] = [
  { className:'bx bx-search' },
  { className:'bx bx-shopping-bag' },
  { className:'bx bx-user' }
];
