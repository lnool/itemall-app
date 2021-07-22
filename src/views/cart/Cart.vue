<template>
  <div class="cart">
    <van-sticky>
      <nav-bar class="nav-bar">
        <i
          class="iconfont icon-fanhui"
          v-if="pathName == 'detail'"
          slot="left"
          @click="back"
        ></i>
        <span slot="center">购物车</span>
        <span slot="right" @click="edit">{{ showDel ? "取消" : "编辑" }}</span>
      </nav-bar>
    </van-sticky>
    <div class="bg"></div>
    <div class="order" v-if="carts.length">
      <van-checkbox-group v-model="id">
        <div class="order-item" v-for="(item, index) in carts" :key="index">
          <div class="oreder-item-title">
            <span class="shopname">莱斯够自营</span>
            <span>免运费</span>
          </div>
          <div class="oreder-item-panel">
            <div class="checkbox-warp">
              <van-checkbox
                icon-size="14"
                checked-color="#FF7500"
                :name="item.id"
                :value="item.id"
              />
              <img :src="item.goods.show | parseImg" alt="" />
            </div>
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
              <button
                class="btn"
                v-if="item.num > 1"
                @click="desincrement(item.id, item.goods.id, index)"
              >
                <i class="iconfont icon-jian"></i>
              </button>
              <button class="btn" v-else disabled>
                <i class="iconfont icon-jian" style="color: #f6f7f8"></i>
              </button>
              <span class="num">{{ item.num }}</span>
              <button class="btn">
                <i
                  class="iconfont icon-jia"
                  @click="increment(item.id, item.goods.id, index)"
                ></i>
              </button>
            </span>
          </div>
        </div>
      </van-checkbox-group>
      <submit-bar v-if="!showDel">
        <van-checkbox slot="chexbox" v-model="checked" @click="checkAll"
          >全选</van-checkbox
        >
        <div slot="price">
          总计:<span class="price">{{ totalPrice | parsePrice }}</span>
        </div>
        <van-button
          v-if="id.length"
          slot="btn"
          type="primary"
          color="#FF9100"
          size="small"
          round
          @click="onBuyClicked"
          >结 算
          <van-badge :content="id.length" color="#FFCAB5" />
        </van-button>
        <van-button
          v-else
          disabled
          slot="btn"
          type="primary"
          color="#FF9100"
          size="small"
          round
          >结 算
          <van-badge :content="id.length" color="#FFCAB5" />
        </van-button>
      </submit-bar>
      <submit-bar v-else>
        <van-checkbox slot="chexbox" v-model="checked" @click="checkAll"
          >全选</van-checkbox
        >
        <van-button
          @click="del"
          slot="btn"
          type="primary"
          color="#FF9100"
          size="small"
          round
          v-if="id.length"
          >删 除
          <van-badge :content="id.length" color="#FFCAB5" />
        </van-button>
        <van-button
          @click="del"
          slot="btn"
          type="primary"
          color="#FF9100"
          size="small"
          round
          v-else
          disabled
          >删 除
          <van-badge :content="id.length" color="#FFCAB5" />
        </van-button>
      </submit-bar>
    </div>
    <van-empty description="购物车中没有商品，赶紧去添加吧" v-else />
  </div>
</template>

<script>
import { mapState,mapMutations } from "vuex";
import { queryToken, toast } from "../../util";
import { delCart, queryCart, saveCart } from "../../api";
import NavBar from "../../components/navbar/NavBar.vue";
import SubmitBar from "../../components/submitbar/SubmitBar.vue";
export default {
  data() {
    return {
      carts: [],
      id: [],
      checked: false, // 全选
      showDel: false,
      pathName: "",
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => (vm.name = from.name));
  },
  components: { NavBar, SubmitBar },
  computed: {
    ...mapState({
      user: (state) => state.user || queryToken().user,
      token: (state) => state.token || queryToken().token,
    }),
    totalPrice() {
      let total = 0;
      for (const item of this.carts) {
        if (this.id.indexOf(item.id) != -1) total += item.num * item.goods.price;
      }
      return total;
    },
  },
  watch: {
    id(value) {
      this.checked = value.length == this.carts.length && value.length != 0;
    },
  },
  filters: {
    parseImg(show) {
      return JSON.parse(show).img;
    },
    parsePrice(price) {
      return "￥" + price;
    },
  },
  mounted() {
    this._queryCart();
    this.pathName = this.name;
  },
  methods: {
    ...mapMutations(['saveCartId']),
    async _queryCart() {
      const { data } = await queryCart({ uid: this.user.id }, this.token);
      this.carts = data;
    },
    // 全选
    checkAll() {
      this.id = [];
      if (this.checked) this.carts.forEach((item) => this.id.push(item.id));
    },
    // 显示删除
    edit() {
      this.showDel = !this.showDel;
    },
    async del() {
      const { data } = await delCart({ uid: this.user.id, id: this.id }, this.token);
      this._queryCart();
      toast(data);
    },
    async increment(id, gid, index) {
      this.carts[index].num++;
      await saveCart(
        { uid: this.user.id, id, gid, num: this.carts[index].num },
        this.token
      );
    },
    async desincrement(id, gid, index) {
      this.carts[index].num--;
      await saveCart(
        { uid: this.user.id, id, gid, num: this.carts[index].num },
        this.token
      );
    },
    onBuyClicked() {
      // map=> 被处理过的新数组 [{num:xx,id:xx}]
      const info = this.carts
        .map((item) =>
          this.id.indexOf(item.id) != -1 ? { id: item.goods.id, num: item.num } : false
        )
        .filter((item) => item);
      this.$router.push({
        path: "/order-detail",
        query: { info },
      });
    this.saveCartId(this.id)
    },
    back() {
      this.$router.back(-1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  background: #f7f7f7;
  position: relative;
  min-height: 100vh;
  .nav-bar {
    background: #00bfc0;
    color: white;
  }
  .bg {
    margin-top: -1px;
    height: 100px;
    background: #00bfc0;
  }
  .order {
    margin-top: -100px;
    padding: 20px 20px 105px 20px;
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
        .checkbox-warp {
          display: flex;
          img {
            margin-left: 10px;
            width: 65px;
            height: 65px;
            border-radius: 10px;
          }
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
  .price {
    color: red;
  }
}
</style>
