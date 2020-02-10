<template>
  <div id="app">
    <titlebar></titlebar>
    <router-view></router-view>
  </div>
</template>

<script>

import titlebar from './components/widgets/titlebar'

export default {
  name: 'App',
  components: {
    titlebar,
  }
}
</script>

<style>

*{
  padding: 0;
  margin: 0;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
