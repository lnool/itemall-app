<template>
  <div class="tab-bar">
    <tab-bar-item
      v-for="item in tabbar"
      :key="item.id"
      :path="item.path"
      :activeColor="color"
      class="tab-bar-item"
    >
      <i slot="icon" :class="['iconfont', item.icon]"></i>
      <div slot="text">{{ item.text }}</div>
    </tab-bar-item>
  </div>
</template>

<script>
import TabBarItem from "./TabBarItem.vue";
export default {
  components: { TabBarItem },
  data() {
    return {
      tabbar: [
        { id: 1, icon: "icon-iconfonthome0", text: "首页", path: "/" },
        { id: 2, icon: "icon-fenlei", text: "分类", path: "/category" },
        { id: 3, icon: "icon-shangcheng", text: "购物车", path: "/cart" },
        { id: 4, icon: "icon-user", text: "我的", path: "/profile" },
      ],
      color: "#00BFC0",
    };
  },
};
</script>

<style lang="less" scoped>
.tab-bar {
  background: white;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  border-top: 1px solid #ddd;
  z-index: 9;
  .tab-bar-item {
    flex: 1;
    text-align: center;
    padding: 3px 0;
    i {
      font-size: 18px;
    }
    div {
      font-size: 14px;
    }
  }
}
</style>
