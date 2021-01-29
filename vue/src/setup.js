import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import axios from 'axios'
import defaults from '@/styles/defaults.js'
import storeGen from '@/store/index.js'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueWindowSize from 'vue-window-size'
import Vuex from 'vuex'
import '@/styles/base.scss'

Vue.use(BootstrapVue, defaults)
Vue.use(BootstrapVueIcons)
Vue.use(VueAxios, axios)
Vue.use(VueWindowSize)
Vue.use(Vuex)

Vue.config.productionTip = false

const store = storeGen(Vuex)

// Exportando classes/instâncias já configuradas
export { Vue, store }
