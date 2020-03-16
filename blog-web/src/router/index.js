import Vue from 'vue'
import Router from 'vue-router'

import BlogList from 'pages/blog/List.vue'
import AddBlog from 'pages/blog/Add.vue'
import EditBlog from 'pages/blog/Edit.vue'
import BlogDetail from 'pages/blog/Detail.vue'

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error)
}

Vue.use(Router)

const routes = [
  {
    name: 'blog/list',
    path: '/blog/list',
    component: BlogList
  },
  {
    name: 'blog/add',
    path: '/blog/add',
    component: AddBlog
  },
  {
    name: 'blog/edit',
    path: '/blog/edit/:id',
    component: EditBlog
  },
  {
    name: 'blog/detail',
    path: '/blog/detail/:id',
    component: BlogDetail
  },
  {
    path: '/',
    component: BlogList
  }
]

export default new Router({
  mode: 'hash',
  routes
})
