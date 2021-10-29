interface IHeaderLink {
  path: string;
  name: string;
}

export const HeaderLinks: IHeaderLink[] = [
  { path: '/', name: 'Trang chủ' },
  { path: '/product', name: 'Sản phẩm' },
  { path: '/accessory', name: 'Phụ kiện' },
  { path: '/contact', name: 'Liên hệ' },
];

interface IHeaderIcons {
  path: string;
  className: string;
  isCheck?: boolean;
}

export const HeaderIcons: IHeaderIcons[] = [
  { path: '/', className: 'bx bx-search' },
  { path: '/list_product_add', className: 'bx bx-shopping-bag', isCheck: true },
];
