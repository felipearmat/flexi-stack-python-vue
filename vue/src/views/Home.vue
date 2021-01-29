<template>
  <app-layout>
    <template v-slot:header>
      <app-header />
    </template>
    <template v-slot:content>
      <div class="home">
        <img
          alt="Vue logo"
          src="static/img/logo.png"
        >
        <HelloWorld msg="Welcome to Your Vue.js App" />
      </div>
    </template>
    <template v-slot:footer>
      <app-footer />
    </template>
  </app-layout>
</template>

<script>
import appLayout from '@/layouts/appLayout.vue'
import appFooter from '@/components/appFooter.vue'
import appHeader from '@/components/appHeader.vue'
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'Home',
  components: {
    appLayout,
    appFooter,
    appHeader,
    HelloWorld
  }
}
</script>
