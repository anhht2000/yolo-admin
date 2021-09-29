export interface IComonRouter{
  icon?: string,
  routerName: string,
  path?: string,
}

export type ISidebarRouter = IComonRouter & { router?: IComonRouter[] }

const sideBarRouter: ISidebarRouter[] = [
  {
    icon:'bx bx-box',
    routerName:'Widgets',
    path:'/admin',
  },
  {
    icon:'bx bxl-docker',
    routerName: 'Charts',
    router: [
      {
        icon:'bx bxl-docker',
        routerName:'Widgets',
        path:'/admin',
      },
      {
        icon:'bx bx-box',
        routerName:'Widgets',
        path:'/admin',
      },
      {
        icon:'bx bx-box',
        routerName:'Widgets',
        path:'/admin',
      },
      {
        icon:'bx bx-box',
        routerName:'Widgets',
        path:'/admin',
      },
      {
        routerName:'Widgets',
        path:'/admin',
      },
      {
        icon:'bx bx-box',
        routerName:'Widgets',
        path:'/admin',
      },
      {
        icon:'bx bx-box',
        routerName:'Widgets',
        path:'/admin',
      },
      {
        icon:'bx bx-box',
        routerName:'Widgets',
        path:'/admin',
      },
    ]
  },
  {
    icon:'bx bxl-docker',
    routerName: 'Charts',
    router: [
      {
        icon:'bx bxl-docker',
        routerName:'Widgets',
        path:'/admin',
      },
      {
        icon:'bx bx-box',
        routerName:'Widgets',
        path:'/admin',
      },
      {
        icon:'bx bx-box',
        routerName:'Widgets',
        path:'/admin',
      },
      {
        icon:'bx bx-box',
        routerName:'Widgets',
        path:'/admin',
      },
      {
        icon:'bx bx-box',
        routerName:'Widgets',
        path:'/admin',
      },
      {
        icon:'bx bx-box',
        routerName:'Widgets',
        path:'/admin',
      },
      {
        icon:'bx bx-box',
        routerName:'Widgets',
        path:'/admin',
      },
      {
        icon:'bx bx-box',
        routerName:'Widgets',
        path:'/admin',
      },
    ]
  }
]


export default sideBarRouter;
