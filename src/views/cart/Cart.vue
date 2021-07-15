<template>
  <div class="cart">
    <van-sticky>
      <nav-bar class="nav-bar" style="transition: '0.5s'">
        <i class="iconfont icon-fanhui" slot="left"></i>
        <span slot="center">购物车</span>
        <span slot="right">编辑</span>
      </nav-bar>
    </van-sticky>
    <div class="bg"></div>
    <div class="order">
      <div class="order-item" v-for="(item, index) in carts" :key="index">
        <div class="oreder-item-title">
          <span class="shopname">莱斯够自营</span>
          <span>免运费</span>
        </div>
        <div class="oreder-item-panel">
          <img :src="item.goods.show | parseImg" alt="" />
          <div class="item-panel-right">
            <div class="title">{{ item.goods.title }}</div>
            <select class="props">
              <option
                :value="prop"
                v-for="(prop, index) in JSON.parse(item.goods.props)"
                :key="index"
              >
                {{ prop }}
              </option>
            </select>
          </div>
        </div>
        <div class="price-warp">
          <span class="price">{{ item.goods.price | parsePrice }}</span>
          <span>
            <button class="btn" v-if="item.num > 1">
              <i class="iconfont icon-jian"></i>
            </button>
            <button class="btn" v-else disabled>
              <i class="iconfont icon-jian" style="color: #f6f7f8"></i>
            </button>
            <span class="num">{{ item.num }}</span>
            <button class="btn"><i class="iconfont icon-jia"></i></button>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { queryToken } from "../../util";
import { queryCart } from "../../api";
import NavBar from "../../components/navbar/NavBar.vue";

export default {
  data() {
    return {
      carts: [],
    };
  },
  components: { NavBar },
  computed: {
    ...mapState({
      user: (state) => state.user || queryToken().user,
      token: (state) => state.token || queryToken().token,
    }),
  },
  filters: {
    parseImg(show) {
      return JSON.parse(show).img;
    },
    parsePrice(price) {
      return "￥ " + price;
    },
  },
  mounted() {
    this._queryCart();
  },
  methods: {
    async _queryCart() {
      const { data } = await queryCart({ uid: this.user.id }, this.token);
      this.carts.push(...data);
      console.log(data);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  background: #f7f7f7;
  position: relative;
  height: 100%;
  .nav-bar {
    background: #00bfc0;
    color: white;
  }
  .bg {
    height: 100px;
    background: #00bfc0;
  }
  .order {
    position: absolute;
    left: 0;
    top: 30px;
    padding: 20px 20px 55px 20px;
    .order-item {
      background: white;
      border-radius: 10px;
      margin-bottom: 10px;
      padding: 10px;
      .oreder-item-title {
        display: flex;
        justify-content: space-between;
        span {
          font-size: 12px;
          color: #707378;
        }
        .shopname {
          font-weight: 600;
        }
      }
      .oreder-item-panel {
        height: 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        img {
          width: 80px;
          height: 80px;
          border-radius: 10px;
        }
        .item-panel-right {
          width: 65%;
          overflow: hidden;
          .title {
            height: 35px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
          .props {
            width: 100%;
            outline: none;
            background: #f6f7f8;
            border: 0;
            color: #707378;
            option {
              width: 100%;
              overflow: hidden;
            }
          }
        }
      }
      .price-warp {
        display: flex;
        justify-content: space-around;
        align-items: center;
        .price {
          color: red;
        }
        .btn {
          width: 30px;
          height: 20px;
          line-height: 20px;
          border: 0;
        }
        .num {
          display: inline-block;
          width: 30px;
          height: 20px;
          line-height: 20px;
          background: #f8f8f9;
          text-align: center;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
