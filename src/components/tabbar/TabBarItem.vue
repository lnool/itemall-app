<template>
  <div class="tab-bar-item" @click="itemClick" :style="active">
    <slot name="icon"></slot>
    <slot name="text"></slot>
  </div>
</template>

<script>
export default {
  props: {
    // 接收父组件传的数据
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  methods: {
    itemClick() {
      // 判断跳转的路由是否为活跃路由
      if (this.$route.path !== this.path) this.$router.replace(this.path);
    },
  },
  computed: {
    active() {
      return { color: this.$route.path === this.path ? this.activeColor : "#090C19" };
    },
  },
};
</script>

<style lang="less" scoped></style>
