<template>
  <div class="collapse">
    <div class="collapse-item">
      <div class="left">选择</div>
      <div class="right">
        <span>颜色、款式</span>
        <i class="iconfont icon-xiayiye"></i>
      </div>
    </div>
     <div class="collapse-item">
      <div class="left">配送</div>
      <div class="right">
        <span>广东省 深圳市 南山区</span>
        <i class="iconfont icon-xiayiye"></i>
      </div>
    </div>
     <div class="collapse-item">
      <div class="left">运费</div>
      <div class="right">
        <span>此商品包邮</span>
        <i class="iconfont icon-xiayiye"></i>
      </div>
    </div>
     <div class="collapse-item">
      <div class="left">说明</div>
      <div class="right">
        <span>七天无理由退款·正品保障</span>
        <i class="iconfont icon-xiayiye"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.collapse{
  background: white;
  padding-left: 20px;
  border-radius: 10px;
}
.collapse-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;

  .left {
    width: 50px;
    font-size: 12px;
    font-weight: 700;
  }
  .right{
    flex:1;
    display: flex;
     justify-content: space-between;
     line-height: 50px;
     padding-left: 5px;
     padding-right: 20px;
     border-bottom: 1px solid #F6F6F6;
     span{
       font-size: 12px;
     }
  }
}
</style>
