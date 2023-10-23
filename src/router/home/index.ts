export default [
  {
    path: '/home',
    name: 'home',
    meta: {
      title: '盘路分析',
      permiss: '1',
    },
    component: () => import(/* webpackChunkName: "import" */ '@v/home/'),
  },
]