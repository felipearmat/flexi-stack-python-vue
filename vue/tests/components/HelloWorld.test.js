import { shallowMount } from '@vue/test-utils'
import { store } from '@/setup.js'
import HelloWorld from '@/components/HelloWorld.vue'

// Setup de variáveis do teste
var wrapper = {}
var _this = {}
var _data = {}

// Executado antes de cada teste (funções "it")
beforeEach(() => {
  // Monta wrapper
  wrapper = shallowMount(HelloWorld, {
    store
  })

  // Define _this e _data
  _this = wrapper.vm
  _data = _this.$data
})

// Executado após cada teste (funções "it")
afterEach(() => {
  // Destrói a instância do wrapper após cada teste
  wrapper.destroy()
})

describe('HelloWorld.vue', () => {
  it('Renderiza msg quando passada', () => {
    var msg = 'Mensagem nova'
    wrapper = shallowMount(HelloWorld, {
      store,
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
