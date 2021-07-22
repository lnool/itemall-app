<template>
  <div class="order-detail">
    <van-sticky>
      <nav-bar class="nav-bar">
        <i class="iconfont icon-fanhui" slot="left" @click="back"></i>
        <span slot="center">订单详情</span>
        <i class="iconfont icon-gengduo" slot="right"></i>
      </nav-bar>
    </van-sticky>
    <div class="bg"></div>
    <div class="order-detail-warp">
      <van-contact-card type="edit" :name="user.nickName" :tel="user.phone" />
      <div class="goods-warp">
        <div class="goods" v-for="(item, index) in goods" :key="index">
          <img :src="item.show | parseImg" alt="" />
          <div class="title">{{ item.title }}</div>
          <div class="goods-info">
            <span>￥{{ item.price }}</span>
            <div>x{{ item.num }}</div>
          </div>
        </div>
        <div class="subtotal">
          <span>商品金额</span>
          <span>￥{{ totalPrice }}</span>
        </div>
        <div class="total">实付金额：￥{{ totalPrice }}</div>
      </div>
      <div class="order-info" v-if="order.id">
        <div class="info-title">订单信息</div>
        <div class="info">
          <div class="info-left">
            <div>订单编号：{{ order.id }}</div>
            <div>下单时间：{{ order.createDateTime | parseTime }}</div>
          </div>
          <span>复制</span>
        </div>
      </div>
    </div>
    <div class="order-bottom" v-if="order.status == undefined">
      <van-button type="default" round size="small">联系客服</van-button>
      <van-button
        @click="_saveOrder"
        type="default"
        round
        plain
        color="#00BFC0"
        size="small"
        >添加订单</van-button
      >
    </div>
    <div class="order-bottom" v-else-if="order.status == 0">
      <van-button type="default" round size="small" @click="_cancel">取消</van-button>
      <van-button @click="_pay" type="default" round plain color="#00BFC0" size="small"
        >立即支付</van-button
      >
    </div>
    <div class="order-bottom" v-else-if="order.status == 1">
      <van-button @click="_del" type="default" round plain color="#00BFC0" size="small"
        >删除</van-button
      >
    </div>
    <div class="order-bottom" v-else-if="order.status == 2">
      <van-button @click="_del" type="default" round plain color="#00BFC0" size="small"
        >删除</van-button
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import * as dayjs from "dayjs";
import { queryGood, saveOrder, queryOne, pay, delOrder, cancel } from "../../api";
import { queryToken, toast } from "../../util";
import NavBar from "../../components/navbar/NavBar.vue";
export default {
  name: "orderDetail",
  data() {
    return {
      goods: [],
      order: {},
    };
  },
  mounted() {
    this._queryGood();
  },
  computed: {
    ...mapState({
      user: (state) => state.user || queryToken().user,
      token: (state) => state.token || queryToken().token,
    }),
    totalPrice() {
      return this.goods.reduce((pre, item) => pre + item.num * item.price, 0);
    },
  },
  methods: {
    ...mapActions(["clearCartIds"]),
    back() {
      this.$router.back(-1);
    },
    async _queryGood() {
      const { info, order_id } = this.$route.query;
      if (!order_id) {
        const id = info.map((item) => item.id);
        const { data } = await queryGood({ id });
        data.forEach((item, index) => {
          item.num = info[index].num;
        });
        this.goods = data;
        return;
      }
      this._queryOne(order_id);
    },
    async _queryOne(order_id) {
      const { data } = await queryOne(
        { uid: this.user.id, id: order_id || this.order.id },
        this.token
      );
      this.goods = data.orderDesc;
      this.order = data;
    },
    async _saveOrder() {
      const goods = this.goods.map((item) => ({ gid: item.id, num: item.num }));
      const { data } = await saveOrder(
        {
          uid: this.user.id,
          address: "陕西省西安市雁塔区长丰国际 B座1510室",
          goods,
        },
        this.token
      );
      toast(data);
      this.clearCartIds();
      this.$router.replace("/order");
    },
    // 支付
    async _pay() {
      const { data } = await pay({ uid: this.user.id, id: this.order.id }, this.token);
      this._queryOne();
    },
    // 删除订单
    async _del() {
      const { data } = await delOrder(
        { uid: this.user.id, id: this.order.id },
        this.token
      );
      toast(data + ",可以在回收站恢复");
      this.$router.replace("/order");
    },
    // 取消订单
    async _cancel() {
      const { data } = await cancel({ uid: this.user.id, id: this.order.id }, this.token);
      toast(data);
      this._queryOne();
    },
  },
  filters: {
    parseImg(show) {
      return JSON.parse(show).img;
    },
    parseTime(time) {
      return dayjs(time).format("YYYY-MM-DD hh:mm:ss");
    },
  },
  components: { NavBar },
};
</script>

<style lang="less" scoped>
.order-detail {
  min-height: 100vh;
  position: relative;
  z-index: 10;
  background: #f6f6f6;
  .nav-bar {
    background: #00bfc0;
    color: white;
  }
  .bg {
    margin-top: -1px;
    height: 80px;
    background: #00bfc0;
  }
  .order-detail-warp {
    padding: 20px 20px 50px 20px;
    margin-top: -80px;
    .van-contact-card {
      border-radius: 10px;
      margin-bottom: 10px;
    }
    .goods-warp {
      padding: 10px 10px 0 10px;
      background: white;
      border-radius: 10px;
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
      .subtotal {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        color: #707378;
        line-height: 30px;
      }
      .total {
        font-size: 14px;
        color: #090c19;
        font-weight: 700;
        line-height: 30px;
        border-top: 1px solid #f1f1f1;
        text-align: right;
      }
    }
    .order-info {
      margin-top: 10px;
      background: white;
      padding: 10px;
      border-radius: 10px;
      .info-title {
        font-weight: 700;
        font-size: 13px;
        padding: 10px 0;
      }
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #707378;
      }
    }
  }
  .order-bottom {
    position: fixed;
    height: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
    background: white;
  }
}
</style>
