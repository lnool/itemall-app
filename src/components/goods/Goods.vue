<template>
  <div class="goods-item" @click="linkDatail(goods.iid)">
    <img :src="goods.showLarge | paraseImg" />
    <div class="title">
      {{ goods.title }}
    </div>
    <div class="info">
      <span class="price"> {{ goods.price | prasePrice }}</span>
      <span class="cfav"><i class="iconfont icon-shoucang1"></i>{{ goods.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: Object,
  },
  filters: {
    paraseImg(showLarge) {
      return JSON.parse(showLarge).img;
    },
    prasePrice(price) {
      return "￥" + price;
    },
  },
  methods:{
    // 跳转详情页
    linkDatail(iid){
      this.$router.push('/detail/'+iid)
    }
  }
};
</script>

<style lang="less" scoped>
.goods-item {
  padding: 10px;
  font-size: 13px;
  img {
    border-radius: 10px;
  }
  .title {
    color: #090c19;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 35px;
  }
  .info {
    text-align: center;
    .price {
      color: red;
    }
    .cfav {
      color: #a1a4aa;
      .icon-shoucang1 {
        margin: 0 5px;
      }
    }
  }
}
</style>
