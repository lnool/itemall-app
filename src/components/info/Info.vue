<template>
  <div class="info">
    <div v-for="(imgobj,index) in detailinfo" :key="index">
      <img v-for="(img,imgindex) in imgobj.list" :src="img" :key="imgindex" />
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      detailinfo:Array
    }
  }
</script>

<style lang="less" scoped>
.info{
  text-align: center;
  line-height: 35px;
  font-size: 16px;
  font-weight: 500;
  img{
    margin-bottom: 10px;
  }
}
</style>