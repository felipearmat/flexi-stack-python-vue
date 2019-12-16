// Esse arquivo foi alterado para o formato CommonJS para ser utilizado tanto nos arquivos Vue quanto
// nos arquivos de teste, permitindo que a configuração do Vue seja a mesma nos dois ambientes
const axios = require('axios')
const BootstrapVue = require('bootstrap-vue')
const customParseFormat = require('dayjs/plugin/customParseFormat')
const dayjs = require('dayjs')
const ptbr = require('dayjs/locale/pt-br')
const utc = require('dayjs/plugin/utc')
const VueAxios = require('vue-axios')
const BaseVue = require('vue')
const BaseMaskedInput = require('vue-text-mask')
const BaseVueRouter = require('vue-router')

// MaskedInput, Vue Router e Vue podem ser importados com .default ou não, dependendo de qual arquivo
// chama-lo, com isso temos que verificar se existe o .default e então fazer a atribuição correta
const VueRouter = BaseVueRouter.default ? BaseVueRouter.default : BaseVueRouter
const MaskedInput = BaseMaskedInput.default ? BaseMaskedInput.default : BaseMaskedInput
const Vue = BaseVue.default ? BaseVue.default : BaseVue

dayjs.extend(utc)
dayjs.extend(customParseFormat)
dayjs.locale(ptbr)

if (window.NO_ROUTER !== 'True' && window.NO_ROUTER !== true) {
  Vue.use(VueRouter)
}

Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)
Vue.component('masked-input', MaskedInput)
Vue.config.productionTip = false
// Prototipando dayJs para ser utilizado em
// qualquer componente sem ter que ser importado
Vue.prototype.$dayjs = dayjs

module.exports = Vue
