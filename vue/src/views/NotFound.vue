<template>
  <app-layout>
    <template v-slot:header>
      <app-header />
    </template>
    <template v-slot:content>
      <h1>Página não encontrada</h1>
    </template>
    <template v-slot:footer>
      <app-footer />
    </template>
  </app-layout>
</template>

<script>
import appLayout from '@/layouts/appLayout.vue'
import appHeader from '@/components/appHeader.vue'
import appFooter from '@/components/appFooter.vue'
export default {
  components: {
    appLayout,
    appHeader,
    appFooter
  }
}
</script>
