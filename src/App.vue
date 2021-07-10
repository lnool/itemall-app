<template>
  <div id="app">
    <router-view />
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
@import url("//at.alicdn.com/t/font_1431323_0md7akg91rp.css");
@import url("https://cdn.bootcdn.net/ajax/libs/reseter.css/1.2.0/reseter.min.css");
</style>
