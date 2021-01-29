// Algumas funções utilitárias que podem ser importadas do BootstrapVue
/*
  import { cloneDeep } from 'bootstrap-vue/src/utils/clone-deep'
  import {
    kebabCase,
    pascalCase,
    startCase,
    lowerFirst,
    upperFirst,
    escapeRegExp,
    toString,
    trimLeft,
    trimRight } from 'bootstrap-vue/src/utils/string'
  import {
    removeNode,
    isElement,
    getActiveElement,
    isActiveElement,
    isVisible,
    isDisabled,
    selectAll,
    select,
    matches,
    closest,
    contains,
    addClass,
    removeClass,
    hasClass,
    setAttr,
    removeAttr,
    getAttr,
    setStyle,
    removeStyle,
    offset,
    position } from 'bootstrap-vue/src/utils/dom'
 */
import { getBreakpointsCached } from 'bootstrap-vue/src/utils/config'
import { Vue } from '@/setup.js'
import exportedVars from '@/styles/base.scss'

export default new Vue({
  computed: {
    breakpoints () {
      // Retorna um dicionário contendo os breakpoints da aplicação (valor numérico e se está ativo)
      var _res = {}
      var _width = this.windowWidth
      var _bp = getBreakpointsCached()
      for (var index in _bp) {
        var _val = this.stringToNumber(exportedVars[_bp[index]])
        var _nindex = Number(index) + 1
        var _nextVal = _bp[_nindex] && this.stringToNumber(exportedVars[_bp[_nindex]])
        _res[_bp[index]] = {
          value: _val !== null ? _val : 0,
          active: _nextVal ? _width >= _val && _width < _nextVal : _width >= _val
        }
      }
      return _res
    }
  },
  methods: {
    stringToNumber (string) {
      var _num = String(string).replace(/[^0-9.]/g, '')
      var _val = Number(_num)
      return Number.isNaN(_val) ? null : _val
    },
    parseJSON (string) {
      var _res = null
      try {
        _res = JSON.parse(string)
      } catch (e) { }
      return _res
    },
    filterProps (self, keys) {
      var _props = Object.assign({}, self.$props)
      // Removemos os atributos que fazem sentido para o componente atual e
      // retornamos o resto para depois passar para o componente novo
      for (var idx in keys) {
        delete _props[keys[idx]]
      }
      return _props
    },
    getStyle (element, property) {
      var _res = null
      if (window.getComputedStyle && (element instanceof Element || element instanceof HTMLDocument)) {
        _res = window.getComputedStyle(element, null).getPropertyValue(property)
      } else {
        _res = element.style[property.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() })]
      }
      return _res
    }
  }
})
