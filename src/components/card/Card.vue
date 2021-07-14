<template>
  <div class="card">
    <div>
      <slot name="icon"></slot>
      <div class="text">
        <slot name="text"></slot>
      </div>
      <span class="badge" v-if="badge">{{ badge }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["badge"],
};
</script>

<style lang="less" scoped>
.card>div{
  position: relative;
  text-align: center;
  width: 50px;
  .iconfont {
    font-size: 25px;
    z-index: 9;
  }
  .text {
    font-size: 12px;
  }
  .badge {
    position: absolute;
    top: 3px;
    right: 3px;
    font-size: 12px;
    display: inline-block;
    width: 15px;
    height: 15px;
    line-height: 15px;
    border-radius: 50%;
    color: red;
    border: 1px solid red;
    z-index: 1;
  }
}
</style>
