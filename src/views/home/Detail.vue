<template>
  <div class="detail">
    <nav-bar
      class="nav-bar"
      :style="{
        transiton: '1s',
        background: scrollTop > 280 ? '#00BFC0' : 'rgba(255, 255, 255, 0)',
      }"
    >
      <div slot="left" class="icon" @click="back">
        <i class="iconfont icon-fanhui"></i>
      </div>
      <div slot="center" class="center" v-show="scrollTop > 280">
        <span :class="{ active: scrollTop > 280 && scrollTop < 768 }">商品</span>
        <span :class="{ active: scrollTop > 768 }">详情</span>
        <span>推荐</span>
      </div>
      <div slot="right" class="icon">
        <i class="iconfont icon-zhuanfa" @click="showShare = true"></i>
        <i class="iconfont icon-gengduo"></i>
      </div>
    </nav-bar>
    <van-swipe height="400" class="swipe" lazy-render :loop="false">
      <van-swipe-item>
        <img :src="goodDetail | filterImg" />
      </van-swipe-item>
    </van-swipe>
    <div class="detailinfo">
      <div class="price">
        <span
          ><small>￥</small> {{ goodDetail.itemInfo.lowNowPrice | prasePrice(true)
          }}<small>{{ goodDetail.itemInfo.lowNowPrice | prasePrice(false) }}</small>
        </span>
        <div class="collect">
          <i class="iconfont icon-shoucang1"></i>
          <div>收藏</div>
        </div>
      </div>
      <div class="title">
        {{ goodDetail.itemInfo.desc }}
      </div>
      <div class="discounts">
        <div>免税</div>
        <div>包邮</div>
      </div>
    </div>
    <collapse class="collapse"></collapse>
    <shop :shopinfo="goodDetail.shopInfo" />
    <info :detailinfo="goodDetail.detailInfo.detailImage" />
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-icon icon="shopping-cart-o" text="购物车" />
      <van-goods-action-button
        @click="show = true"
        color="#090C19"
        type="warning"
        text="加入购物车"
      />
      <van-goods-action-button color="#16C1BC" type="danger" text="立即购买" />
    </van-goods-action>
    <van-share-sheet
      v-model="showShare"
      @select="onSelect"
      title="立即分享给好友"
      :options="options"
    />
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :hide-stock="sku.hide_stock"
      @buy-clicked="onBuyClicked"
      @add-cart="onAddCartClicked"
    />
  </div>
</template>

<script>
import { queryDetail } from "@/api";
import NavBar from "../../components/navbar/NavBar.vue";
import Collapse from "../../components/collapse/Collapse.vue";
import Shop from "../../components/shop/Shop.vue";
import Info from "../../components/info/Info.vue";
export default {
  data() {
    return {
      scrollTop: 0,
      goodDetail: {},
      showShare: false,
      show: false,
      sku: {
        tree: [
          {
            k: "颜色", // skuKeyName：规格类目名称
            k_s: "s1", // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
            v: [
              {
                id: "1",
                name: "蓝色",
                imgUrl: "https://img01.yzcdn.cn/2.jpg",
                previewImgUrl: "https://img01.yzcdn.cn/2p.jpg",
              },
            ],
            largeImageMode: false, //  是否展示大图模式
          },
        ],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId
            s1: "1", // 规格类目 k_s 为 s1 的对应规格值 id
            s2: "1", // 规格类目 k_s 为 s2 的对应规格值 id
            price: 100, // 价格（单位分）
            stock_num: 110, // 当前 sku 组合对应的库存
          },
        ],
        price: "1.00", // 默认价格（单位元）
        stock_num: 227, // 商品总库存
        collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        none_sku: false, // 是否无规格商品
        hide_stock: false, // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://img01.yzcdn.cn/1.jpg",
      },
      options: [
        [
          { name: "微信", icon: "wechat" },
          { name: "朋友圈", icon: "wechat-moments" },
          { name: "微博", icon: "weibo" },
          { name: "QQ", icon: "qq" },
        ],
        [
          { name: "复制链接", icon: "link" },
          { name: "分享海报", icon: "poster" },
          { name: "二维码", icon: "qrcode" },
          { name: "小程序码", icon: "weapp-qrcode" },
        ],
      ],
    };
  },
  components: { NavBar, Collapse, Shop, Info },
  async mounted() {
    this._queryDetail();
    this.scroll();
  },
  filters: {
    filterImg(goodDetail) {
      return goodDetail.detailInfo.detailImage[0].list[0];
    },
    prasePrice(price, flag) {
      const [num1, num2] = price.split(".");
      if (flag) return num1;
      return "." + num2;
    },
  },
  methods: {
    // 获取详情信息
    async _queryDetail() {
      // 获取iid
      const { iid } = this.$route.params;
      // 请求数据
      const { data } = await queryDetail({ iid: iid });
      // 解析JSON
      data.detailInfo = JSON.parse(data.detailInfo);
      data.itemInfo = JSON.parse(data.itemInfo);
      data.itemParams = JSON.parse(data.itemParams);
      data.shopInfo = JSON.parse(data.shopInfo);
      data.columns = JSON.parse(data.columns);
      this.goodDetail = data;
    },
    // 返回
    back() {
      this.$router.back(-1);
    },
    // 隐藏分享面板
    onSelect() {
      this.showShare = false;
      this.$toast("分享成功");
    },
    scroll() {
      // 获取滚动的高度
      document.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > 290) {
          setTimeout(() => (this.scrollTop = document.documentElement.scrollTop), 2000);
        } else {
          this.scrollTop = document.documentElement.scrollTop;
        }
      });
    },
    onBuyClicked() {
      console.log("购买");
    },
    onAddCartClicked() {
      console.log("添加购物车");
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  background: #f7f7f7;
  z-index: 99;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .nav-bar {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 9;
    .center {
      display: flex;
      justify-content: space-around;
      font-size: 12px;
    }
    span {
      color: white;
      opacity: 0.5;
    }
    .active {
      opacity: 1;
      color: white;
    }
    .icon i {
      display: inline-block;
      height: 25px;
      width: 25px;
      border-radius: 50%;
      line-height: 25px;
      color: white;
      background: #70737833;
      font-size: 14px;
    }
    .icon .icon-gengduo {
      margin: 0 5px;
    }
  }
  .swipe {
    height: 300px;
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
      color: white;
    }
    img {
      height: 100%;
      width: 100%;
    }
  }
  .detailinfo {
    width: 90%;
    background: white;
    margin: 15px 0;
    border-radius: 10px;
    padding: 10px;
    .price {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: center;
      span {
        color: #01b4ae;
        font-weight: 700;
        font-size: 16px;
      }
      .collect {
        color: #707378;
        font-size: 12px;
      }
    }
    .title {
      width: 100%;
      font-size: 14px;
      line-height: 32px;
      height: 64px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    .discounts {
      display: flex;
      height: 50px;
      align-items: center;
      div {
        width: 50px;
        height: 25px;
        background: #def6f5;
        line-height: 25px;
        text-align: center;
        border-radius: 8px;
        color: #01b4ae;
        font-size: 12px;
        font-weight: 500;
        margin-right: 10px;
      }
    }
  }
  .collapse {
    width: 90%;
  }
}
</style>
