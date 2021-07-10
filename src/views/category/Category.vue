<template>
  <div class="category">
    <van-sticky>
      <nav-bar class="nav-bar" style="transition: '0.5s'">
        <i class="iconfont icon-saoma" slot="left"></i>
        <div slot="center" class="seach"><i class="iconfont icon-iconseach"></i>搜索</div>
        <i class="iconfont icon-msg" slot="right"></i>
      </nav-bar>
    </van-sticky>
    <div class="category-list">
      <div class="category-left">
        <div
          v-for="(item, index) in category"
          @click="categoryClick(index, item.maitKey)"
          :class="['category-item', { active: currenIndex === index }]"
          :key="item.id"
        >
          {{ item.title }}
        </div>
      </div>
      <div class="category-right">
        <div v-for="item in categorysub" class="categorysub-item" :key="item.id">
          <img v-lazy="item.image" alt="" />
          <div>{{ item.title }}</div>
        </div>
      </div>
    </div>
    <div class="empty"></div>
  </div>
</template>

<script>
import { queryCategory, queryCategorysub } from "@/api";
import NavBar from "@/components/navbar/NavBar.vue";
export default {
  components: { NavBar },
  data() {
    return {
      category: [],
      categorysub: [],
      currenIndex: 0,
    };
  },
  mounted() {
    this._queryCategory();
    this.categoryClick(0, 3627);
  },
  methods: {
    async _queryCategory() {
      const { data } = await queryCategory();
      this.category = data;
    },
    async categoryClick(index, maitKey) {
      this.currenIndex = index;
      const { data } = await queryCategorysub({ maitKey });
      this.categorysub = data;
    },
  },
};
</script>

<style lang="less" scoped>
.category {
  background: #f6f6f6;
  height: 100vh;
  .nav-bar {
    background: white;
    .icon-saoma,
    .icon-msg {
      font-size: 14px;
    }
    .seach {
      background: #f6f6f6;
      text-align: left;
      height: 30px;
      line-height: 30px;
      border-radius: 20px;
      font-size: 13px;
      text-indent: 20px;
      color: #a1a4aa;
      .icon-iconseach {
        font-size: 13px;
        margin-right: 5px;
      }
    }
  }
  .category-list {
    display: flex;
    .category-left {
      width: 100px;
      background: #ffffff;
      .category-item {
        height: 35px;
        line-height: 35px;
        text-align: center;
        font-size: 14px;
      }
      .active {
        background: #00bfc0;
        color: white;
      }
    }
    .category-right {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      font-size: 14px;
      background: #ffffff;
      .categorysub-item {
        width: 33%;
        text-align: center;
        padding: 5px;
        img {
          width: 50px;
          height: 50px;
        }
      }
    }
  }
  .empty {
    height: 55px;
  }
}
</style>
