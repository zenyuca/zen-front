<template lang="pug">
  #home
    v-header.header
    v-sidebar.sidebar
    .content
      transition(name="move", mode="out-in")
        router-view
</template>

<script>

import header from './Header.vue'
import sidebar from './Sidebar.vue'

export default {
  name: 'home',
  components: {
    'v-header': header,
    'v-sidebar': sidebar
  },
  created () {
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus">
  #home
    .header
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      height: 3.5rem;
      line-height: 3.5rem;
      z-index: 99999;
    .sidebar, .content
      position: absolute;
      top: 3.5rem;
      bottom: 0;
    .sidebar
      width: 11rem;
      left: 0;
      bottom: 0;
      background-color: #272822;
    .content
      width: calc(100% - 11rem);
      right: 0;
</style>
