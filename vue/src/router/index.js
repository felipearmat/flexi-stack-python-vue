import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About'
import NotFound from '@/views/NotFound'

// As rotas devem seguir a ordem de prioridade, da mais específica para a mais genérica
// Nomes de rotas devem ser únicos
// Props devem ser passados como função quando dependerem de componentes
// importados de outros arquivos, se não eles serão passados como 'undefined'
// Ao passar props é preciso definir os alvos em components e em props, se não o router não sabe para quem enviar oq...
// Menus só renderizam itens que possuem as propriedades "label" e "name", caso contrário o item não será renderizado.
var routes = [
  {
    path: '/about',
    name: 'about',
    label: 'Sobre',
    component: About
  },
  {
    path: '',
    name: 'home',
    label: 'Principal',
    component: Home
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const routerGen = (customRoutes = routes) => {
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: customRoutes
  })
  return router
}

export { routes, routerGen }
