import Vue from './setup.js'
import render from '@/componentes/render.vue'
import routes from '@/routes/main.js'
import VueRouter from 'vue-router'

// Global css
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/css/base.css'

// Bus de eventos para controle omnidirecional
// export const eventBus = new Vue()

const router = new VueRouter({ mode: 'history', routes })

// Conjunto de variáveis globais a ser exportado
export var globalVars = {}

export function init (root, gVars) {
  globalVars = gVars
  /* eslint-disable no-new */
  new Vue({
    el: root,
    router,
    render: h => h(render)
  })
}
