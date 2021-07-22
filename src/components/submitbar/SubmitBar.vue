<template>
  <div class="submit-bar">
    <div class="submit-left">
      <slot name="chexbox" />
      <div class="price">
        <slot name="price" />
      </div>
    </div>
    <slot name="btn" />
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.submit-bar {
  display: flex;
  padding: 0 20px;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 54px;
  background: white;
  .submit-left {
    display: flex;
    .price {
      margin-left: 10px;
    }
  }
}
</style>
