<template>
  <div id="app">
    <keep-alive >
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
     <router-view v-if="!$route.meta.keepAlive"/>
    <tab-bar />
  </div>
</template>
<script>
import TabBar from "./components/tabbar/TabBar.vue";
export default {
  components: { TabBar },
};
</script>
<style lang="less">
@import "./assets/css/base.css";
</style>
