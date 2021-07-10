<template>
  <div class="recommend">
    <div v-for="item in recommend" :key="item.id" class="recommend-item">
      <img v-lazy="item.image" />
      <div class="title">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      recommend:Array
    }
  }
</script>

<style lang="less" scoped>
  .recommend{
    display: flex;
    text-align: center;
    .recommend-item{
      flex: 1;
      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .title{
        color: #707378;
        font-size: 12px;
        line-height: 35px;
      }
    }
  }
</style>