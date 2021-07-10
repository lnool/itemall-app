<template>
  <div class="shop">
    <div class="shop-left">
      <img :src="shopinfo.shopLogo" alt="" class="shopLogo" width="50px" height="50px" />
      <span class="name">{{ shopinfo.name }}</span>
    </div>
    <div class="shop-right">
      <span>宝贝描述 4.8</span>
      <span>卖家服务 4.8</span>
      <span>物流服务 4.8</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shopinfo: Object,
  },
};
</script>

<style lang="less" scoped>
.shop {
  display: flex;
  width: 90%;
  background: white;
  padding: 20px;
  justify-content: space-between;
  margin: 15px 0;
  border-radius: 10px;
  .shop-left{
    .shopLogo{
      border-radius: 10px;
    }
    .name{
      margin-left: 10px;
      font-weight: 600;
      font-size: 13px;
      color: #707378;
    }
  }
  .shop-right {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: 600;
    color:#A1A4AA;
  }
}
</style>
