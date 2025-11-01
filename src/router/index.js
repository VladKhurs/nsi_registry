import Vue from 'vue'
import VueRouter from 'vue-router'
import Registry from '../views/Registry.vue'
import DictionaryView from '../views/DictionaryView.vue'
import DictionaryForm from '../views/DictionaryForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Registry',
    component: Registry
  },
  {
    path: '/dictionary/:id',
    name: 'DictionaryView',
    component: DictionaryView,
    props: true
  },
  {
    path: '/create',
    name: 'DictionaryForm',
    component: DictionaryForm,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router