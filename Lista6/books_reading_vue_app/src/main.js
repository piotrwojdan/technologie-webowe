import { createApp } from 'vue/dist/vue.esm-bundler'
import { createRouter, createWebHashHistory } from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import HomePage  from './pages/Home'
import Books  from './components/Books'
import Authors from './components/Authors'
import EditBook from './components/EditBook'
import CreateBook from './components/CreateBook'

const routes = [
  { path: '/', component: HomePage },
  { path: '/books', component: Books },
  { path: '/authors', component: Authors },
  { path: '/editBook/:id', component: EditBook, props:true},
  { path: '/createBook', component: CreateBook},
]

const router = createRouter({

  history: createWebHashHistory(),
  routes, 
})

const app = createApp({})

app.use(router)

app.mount('#app')