<template>
  <div id="home">
    <van-sticky>
      <nav-bar
        class="nav-bar"
        :style="{
          transition: '0.5s',
          background: scrollTop < 188 ? 'white' : '#00BFC0',
          color: scrollTop < 188 ? ' #090c19' : 'white',
        }"
      >
        <i class="iconfont icon-saoma" slot="left"></i>
        <div slot="center" class="seach"><i class="iconfont icon-iconseach"></i>搜索</div>
        <i class="iconfont icon-msg" slot="right"></i>
      </nav-bar>
    </van-sticky>
    <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in banner" :key="item.id">
        <img class="swipe-img" v-lazy="item.image" />
      </van-swipe-item>
    </van-swipe>
    <recommend :recommend="recommend" />
    <div class="feature">
      <img src="@/assets/img/feature_bg.png" />
    </div>
    <van-tabs
      v-model="active"
      animated
      color="#00BFC0"
      title-active-color="#00BFC0"
      :sticky="true"
      offset-top="43"
    >
      <van-tab v-for="(item, index) in tab" :key="index" :title="item">
        <van-list @load="onLoad" :immediate-check="false" loading-text="加载中">
          <waterfall :left="goods[type].leftList" :right="goods[type].rightList">
          </waterfall>
        </van-list>
        <div class="loading">
          <van-loading size="24px" type="spinner" color="#00BFC0" text-color="#00BFC0"
            >加载中...</van-loading
          >
        </div>
      </van-tab>
    </van-tabs>
    <back-top @click.native="backtop" v-show="scrollTop > 800" />
    <div class="empty"></div>
  </div>
</template>

<script>
import { queryHome, queryGoods } from "@/api";
import { debounce } from "@/util";
import NavBar from "@/components/navbar/NavBar.vue";
import Recommend from "@/components/recommend/Recommend.vue";
import Waterfall from "@/components/waterfall/Waterfall.vue";
import BackTop from "@/components/backtop/BackTop.vue";
export default {
  components: { NavBar, Recommend, Waterfall, BackTop },
  data() {
    return {
      banner: [],
      recommend: [],
      tab: ["流行", "新款", "精选"],
      active: 0,
      goods: {
        pop: { page: 1, leftList: [], rightList: [] },
        new: { page: 1, leftList: [], rightList: [] },
        sell: { page: 1, leftList: [], rightList: [] },
      },
      scrollTop: 0,
    };
  },
  mounted() {
    this.scroll();
    this._queryHome();
    this._queryGoods("pop");
    this._queryGoods("new");
    this._queryGoods("sell");
  },
  computed: {
    type() {
      if (this.active == 0) return "pop";
      if (this.active == 1) return "new";
      if (this.active == 2) return "sell";
    },
  },
  methods: {
    async _queryHome() {
      const { data } = await queryHome();
      this.banner = data.banner;
      this.recommend = data.recommend;
    },
    async _queryGoods(type) {
      const { data } = await queryGoods({
        page: this.goods[type].page,
        type,
      });
      this.goods[type].leftList.push(...data.filter((item, index) => index % 2 == 0));
      this.goods[type].rightList.push(...data.filter((item, index) => index % 2 == 1));
      this.goods[type].page++;
    },
    scroll() {
      // 获取滚动的高度
      document.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > 188) {
          setTimeout(() => (this.scrollTop = document.documentElement.scrollTop), 2000);
        } else {
          this.scrollTop = document.documentElement.scrollTop;
        }
      });
    },
    // 上拉加载数据
    onLoad: debounce(function () {
      this._queryGoods(this.type);
    }, 2000),
    // 返回
    backtop() {
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style lang="less" scoped>
#home {
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
  .swipe {
    margin-top: 10px;
    width: 90%;
    margin: 10px auto;
    border-radius: 10px;
    text-align: center;
    .swipe-img {
      border-radius: 10px;
    }
  }
  .feature {
    width: 90%;
    margin: 10px auto;
    border-radius: 10px;
    img {
      width: 100%;
      border-radius: 10px;
    }
  }
  .loading {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f7f7f7;
  }
  .empty {
    height: 55px;
  }
}
</style>
