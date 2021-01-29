import { routerGen } from '@/router/index.js'
import { Vue, store } from './setup.js'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = routerGen()

// Criando uma função para que inicializemos parametros globais do SPA passados na inicialização
export function init (root, globalVars) {
  store.commit('updateGlobal', globalVars)
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount(root)
}
