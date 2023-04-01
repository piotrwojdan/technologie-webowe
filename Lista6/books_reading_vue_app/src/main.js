import { createApp } from 'vue/dist/vue.esm-bundler'
import { createRouter, createWebHashHistory } from 'vue-router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import HomePage  from './pages/Home'
import Books  from './components/Books'
import Authors from './components/Authors'
import EditBook from './components/EditBook'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.

const routes = [
  { path: '/', component: HomePage },
  { path: '/books', component: Books },
  { path: '/authors', component: Authors },
  { path: '/editBook/:id', component: EditBook, props:true}
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

// 5. Create and mount the root instance.
const app = createApp({})
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router)

app.mount('#app')