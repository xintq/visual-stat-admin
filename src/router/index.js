import Vue from 'vue'
import VueRouter from 'vue-router'
import ListArticle from '../views/ListArticle.vue'
import CreateArticle from '../views/CreateArticle.vue'
import ShowArticle from '../views/ShowArticle.vue'
import EditArticle from "../views/EditArticle.vue"


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/articles/index',
  },
  {
    path: '/articles/list',
    name: 'list',
    component: ListArticle,
  },
  {
    path: '/articles/create',
    name: 'create',
    component: CreateArticle,
  },
  {
    path: '/articles/:id/edit',
    name: 'edit',
    component: EditArticle
  },
  {
    path: '/articles/:id/show',
    name: 'show',
    component: ShowArticle
  }
]

const router = new VueRouter({
  routes
})

export default router
