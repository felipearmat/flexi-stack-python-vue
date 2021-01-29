import { shallowMount } from '@vue/test-utils'
import { store } from '@/setup.js'
import appLayout from '@/layouts/appLayout.vue'

// Setup de variáveis do teste
var wrapper = {}
var _this = {}
var _data = {}

// Executado antes de cada teste (funções "it")
beforeEach(() => {
  // Monta wrapper
    wrapper = shallowMount(appLayout, {
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

describe('Testes de slot do layout appLayout.vue', () => {
  // Test Factory
  const slotTest = function (slot) {
    it(`Elemento #app_${slot} não deve existir sem o slot "${slot}"`, () => {
      expect(wrapper.find(`#app_${slot}`).exists()).toBeFalsy()
    })

    it(`Elemento #app_${slot} deve existir se for preenchido o slot "${slot}"`, () => {
      let slots = {}
      slots[slot] = '<div />'

      // Monta wrapper com slot preenchido
      wrapper = shallowMount(appLayout, {
        slots
      })

      expect(wrapper.find(`#app_${slot}`).exists()).toBeTruthy()
    })
  }

  const slots = ['sidebar', 'header', 'content', 'footer']
  for (var index in slots) {
    slotTest(slots[index])
  }
})
