<template>
  <div>
    <keep-alive>
      <router-view name="prepend" />
    </keep-alive>
    <keep-alive>
      <router-view />
    </keep-alive>
    <keep-alive>
      <router-view name="append" />
    </keep-alive>
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>
