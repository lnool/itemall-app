<template>
  <div class="order">
    <van-sticky>
      <nav-bar class="nav-bar">
        <i class="iconfont icon-fanhui" slot="left" @click="back"></i>
        <span slot="center">订单列表</span>
        <i class="iconfont icon-gengduo" slot="right"></i>
      </nav-bar>
    </van-sticky>
    <van-tabs @click="checkStatus">
      <van-tab title="待支付">
        <div
          class="goods-warp"
          @click="linkOrderDeatil(item.order_id)"
          v-for="(item, index) in order"
          :key="index"
        >
          <div class="goods" v-for="(desc, descIndex) in item.orderDesc" :key="descIndex">
            <img :src="desc.show | parseImg" alt="" />
            <div class="title">{{ desc.title }}</div>
            <div class="goods-info">
              <span>￥{{ desc.price }}</span>
              <div>x{{ desc.num }}</div>
            </div>
          </div>
          <div class="totalPrice">
            总计：<span style="color: red">￥{{ item.order_totalPrice }}</span>
          </div>
          <div class="btn">
            <van-button color="#FF7500" size="small">去支付</van-button>
          </div>
        </div>
      </van-tab>
      <van-tab title="已完成">
        <div
          class="goods-warp"
          @click="linkOrderDeatil(item.order_id)"
          v-for="(item, index) in order"
          :key="index"
        >
          <div class="goods" v-for="(desc, descIndex) in item.orderDesc" :key="descIndex">
            <img :src="desc.show | parseImg" alt="" />
            <div class="title">{{ desc.title }}</div>
            <div class="goods-info">
              <span>￥{{ desc.price }}</span>
              <div>x{{ desc.num }}</div>
            </div>
          </div>
          <div class="totalPrice">
            总计：<span style="color: red">￥{{ item.order_totalPrice }}</span>
          </div>
        </div>
      </van-tab>
      <van-tab title="取消">
        <div class="goods-warp" @click="linkOrderDeatil(item.order_id)" v-for="(item, index) in order" :key="index">
          <div class="goods" v-for="(desc, descIndex) in item.orderDesc" :key="descIndex">
            <img :src="desc.show | parseImg" alt="" />
            <div class="title">{{ desc.title }}</div>
            <div class="goods-info">
              <span>￥{{ desc.price }}</span>
              <div>x{{ desc.num }}</div>
            </div>
          </div>
          <div class="totalPrice">
            总计：<span style="color: red">￥{{ item.order_totalPrice }}</span>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { queryOrder } from "../../api";
import { queryToken } from "../../util";
import NavBar from "../../components/navbar/NavBar.vue";
export default {
  name: "order",
  components: { NavBar },
  data() {
    return {
      order: [],
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.user || queryToken().user,
      token: (state) => state.token || queryToken().token,
    }),
  },
  mounted() {
    this._queryOrder();
  },
  filters: {
    parseImg(show) {
      const str = JSON.parse(show).img;
      return str.indexOf("http:") == -1 ? "http:" + str : str;
    },
  },
  methods: {
    async _queryOrder(status = 0) {
      const { data } = await queryOrder({ uid: this.user.id, status }, this.token);
      this.order = data;
    },
    checkStatus(status) {
      this._queryOrder(status);
    },
    back() {
      this.$router.back(-1);
    },
    linkOrderDeatil(order_id) {
      this.$router.push({
        path: "/order-detail",
        query: {
          order_id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.order {
  position: relative;
  min-height: 100vh;
  background: #f6f6f6;
  z-index: 10;
  .nav-bar {
    background: #00bfc0;
    color: white;
  }
  .goods-warp {
    background: white;
    padding: 10px 20px 0 20px;
    .goods {
      display: flex;
      height: 80px;
      justify-content: space-between;
      align-items: center;
      .title {
        width: 55%;
        height: 35px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 12px;
      }
      .goods-info {
        font-size: 12px;
      }
      img {
        width: 65px;
        height: 65px;
        border-radius: 10px;
      }
    }
    .totalPrice {
      font-size: 14px;
      text-align: right;
    }
    .btn {
      display: flex;
      height: 50px;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
