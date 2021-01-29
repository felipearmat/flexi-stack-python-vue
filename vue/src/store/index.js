import createPersistedState from 'vuex-persistedstate'

// Atributos de estado a serem persistidos na sessionStorage
const persisted = ['global']

// Retornando função geradora de Store
export default function (Vuex) {
  return new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
      global: {}
    },
    getters: {
    },
    mutations: {
      updateGlobal (state, payload) {
        state.global = Object.assign({}, state.global, payload)
      }
    },
    actions: {
    },
    plugins: [createPersistedState({
      storage: window.sessionStorage,
      paths: persisted
    })]
  })
}
