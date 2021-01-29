<template>
  <div>
    <div
      v-if="$slots.sidebar"
      id="app_sidebar"
    >
      <slot name="sidebar" />
    </div>
    <b-container
      v-if="$slots.header"
      id="app_header"
      fluid
    >
      <slot name="header" />
    </b-container>
    <b-container
      v-if="$slots.content"
      id="app_content"
    >
      <b-row>
        <b-col
          xs="12"
          sm="2"
          md="3"
        />
        <b-col
          xs="12"
          sm="8"
          md="6"
        >
          <slot name="content" />
        </b-col>
        <b-col
          xs="12"
          sm="2"
          md="3"
        />
      </b-row>
    </b-container>
    <b-container
      v-if="$slots.footer"
      id="app_footer"
      :class="{ 'spaced': breakpoints.xs.active }"
      fluid
    >
      <slot name="footer" />
    </b-container>
  </div>
</template>

<script>
import Util from '@/helpers/Util.js'
export default {
  computed: {
    breakpoints () {
      return Util.breakpoints
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .container {
    padding: 0;
  }
  #app_header {
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  #app_footer {
    padding-top: 0.875rem;
    padding-bottom: 0.875rem;
    padding-left: 2rem;
    padding-right: 2rem;
    &.spaced {
      padding-top: 1.75rem;
      padding-bottom: 1.75rem;
    }
  }
}
</style>
