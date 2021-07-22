<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="right" class="icon">
        <i class="iconfont icon-shezhi"></i>
        <i class="iconfont icon-msg"></i>
      </div>
    </nav-bar>
    <div class="profile-swiper">
      <div class="user-info">
        <img :src="user.avatar" class="avatar" />
        <div class="info">
          <span class="nickName">{{ user.nickName }}</span>
          <div class="phone">{{ user.phone }}</div>
        </div>
      </div>
      <div class="record">
        <div class="record-item">
          <span>23</span>
          <div>我的关注</div>
        </div>
        <div class="record-item">
          <span>66</span>
          <div>我的收藏</div>
        </div>
        <div class="record-item">
          <span>8</span>
          <div>浏览记录</div>
        </div>
        <div class="record-item">
          <span>0</span>
          <div>红包卡券</div>
        </div>
      </div>
      <div class="order">
        <div class="order-title" @click="linkOrder">
          <span class="myorder">我的订单</span>
          <span class="more">
            查看全部
            <i class="iconfont icon-xiayiye"></i>
          </span>
        </div>
        <div class="order-warp">
          <card badge="3">
            <i slot="icon" class="iconfont icon-daifahuo"></i>
            <div slot="text">待付款</div>
          </card>
          <card>
            <i slot="icon" class="iconfont icon-qianbao"></i>
            <div slot="text">待发货</div>
          </card>
          <card>
            <i slot="icon" class="iconfont icon-daishouhuo"></i>
            <div slot="text">待收货</div>
          </card>
          <card>
            <i slot="icon" class="iconfont icon-pingjia"></i>
            <div slot="text">待评价</div>
          </card>
          <card>
            <i slot="icon" class="iconfont icon-tuihuanhuo"></i>
            <div slot="text">退换货</div>
          </card>
        </div>
      </div>
    </div>
    <div class="service">
      <img src="../../assets/img/service.png" alt="" />
    </div>
    <div class="empty"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { queryToken } from "@/util";
import NavBar from "@/components/navbar/NavBar.vue";
import Card from "@/components/card/Card.vue";
export default {
  computed: {
    ...mapState({
      user: (state) => state.user || queryToken().user,
    }),
  },
  components: { NavBar, Card },
  methods:{
    linkOrder(){
      this.$router.push('/order')
    }
  }
};
</script>

<style lang="less" scoped>
.profile {
  height: 100vh;
  background: #f7f7f7;
  .nav-bar {
    background: #00cac1;
    .icon i {
      color: white;
    }
    .icon .icon-shezhi {
      font-size: 20px;
    }
    .icon .icon-msg {
      margin: 0 5px;
    }
  }
  .profile-swiper {
    margin-top: -1px;
    background: linear-gradient(to bottom, #00cac1, #00cac1, white);
    padding: 20px 20px 0 20px;
    .user-info {
      display: flex;
      align-items: center;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .info {
        padding: 0 15px;
        color: white;
        opacity: 0.8;
        font-size: 14px;
        .phone {
          font-size: 12px;
        }
      }
    }
    .record {
      display: flex;
      color: white;
      text-align: center;
      padding: 20px 0;
      opacity: 0.9;
      .record-item {
        flex: 1;
        span {
          font-size: 16px;
        }
        div {
          font-size: 12px;
        }
      }
    }
    .order {
      background: #ffffff;
      border-radius: 10px;
      padding: 10px;
      .order-title {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        .myorder {
          font-weight: 700;
        }
        .more {
          color: #707378;
        }
      }
      .order-warp {
        padding-top: 10px;
        display: flex;
        .card {
          flex: 1;
        }
      }
    }
  }
  .service {
    margin-top: 10px;
    padding: 0 20px;
    background: #f7f7f7;
    img {
      width: 100%;
    }
  }
  .empty {
    height: 55px;
  }
}
</style>
