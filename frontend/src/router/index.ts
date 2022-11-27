import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

enum RouteName {
  Home = 'Home',
  Place = 'Place',
  NotFound = 'NotFound',
}

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: RouteName.Home,
    component: HomeView
  },
  {
    path: '/place/:id',
    name: RouteName.Place,
    component: () => import(/* webpackChunkName: "place" */ '@/views/PlaceView.vue'),
    props: true,
  },
  {
    path: '*',
    name: RouteName.NotFound,
    component: () => import(/* webpackChunkName: "not-found" */ '@/views/NotFound.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export { router, RouteName }
