<template>
  <div id="app">
   <router-view />
   <tab-bar />
  </div>
</template>
<script>
import TabBar from './components/TabBar.vue'
export default {
  components:{
    TabBar
  }
}
</script>
<style lang="less">
@import url('./assets/font/iconfont.css');
</style>
