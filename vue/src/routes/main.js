import home from '@/templates/home.vue'

// - As rotas devem seguir a ordem de prioridade, da mais específica para a mais genérica
// - Nomes de rotas devem ser únicos
// - Props devem ser passados como função quando dependerem de componentes
// importados de outros arquivos, se não eles serão passados como 'undefined'
// - Quando utilizando router-views nomeados é necessário definir os props e
// componentes de cada router-view, se não o router não sabe para quem enviar oq...
export default [
  {
    path: '',
    name: 'home',
    label: 'home',
    component: home
  },
  {
    path: '/*',
    redirect: { name: 'home' }
  }
]
