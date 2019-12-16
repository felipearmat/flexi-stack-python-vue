<template>
  <div class="main container-fluid">
    <h1>Olá! Bem vindo ao projeto Base!</h1>
    <p>Permissões do usuário: {{ getPermissoes }}</p>
  </div>
</template>

<script>
import { globalVars } from '../main.js'
export default {
  computed: {
    getPermissoes () {
      return globalVars
    }
  }
}
</script>

<style>
</style>
