<template>
  <div class="waterfall">
    <div class="waterfall-col">
      <goods class="goods" v-for="(item,index) in left" :key="index" :goods="item" />
    </div>
    <div class="waterfall-col">
      <goods class="goods" v-for="(item,index) in right" :key="index" :goods="item" />
    </div>
  </div>
</template>

<script>
import Goods from "@/components/goods/Goods";
export default {
  props: {
    left: Array,
    right: Array,
  },
  components: { Goods },
};
</script>

<style lang="less" scoped>
.waterfall {
  display: flex;
  background: #f6f6f6;
  .waterfall-col {
    width: 50%;
  }
}
</style>
