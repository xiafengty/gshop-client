<template>
  <section class="msite">
    <!--首页头部-->
    <HeaderTop :title="address.name">
      <a class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </a>
      <!--<a class="header_title">
        <span class="header_title_text ellipsis">昌平区北七家宏福科技园(337省道北)</span>
      </a>-->
      <a class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </a>
    </HeaderTop>
    <!--首页导航-->
    <nav class="msite_nav border-1px">
      <div class="swiper-container" v-if="categorys.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categoryArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(item,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImgUrl+item.image_url">
              </div>
              <span>{{item.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list border-1px">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList />
    </div>
  </section>
</template>
<script>
  import Swiper from  "swiper";
  import 'swiper/dist/css/swiper.min.css'
  import ShopList from "../../components/ShopList/ShopList.vue";
  import {mapState} from "vuex";
  export default {
    data(){
      return {
        baseImgUrl: 'https://fuss10.elemecdn.com'
      }
    },
    mounted (){
      this.$store.dispatch("getCategorys");
      this.$store.dispatch("getShops");
    },
    computed:{
      ...mapState(["address","categorys"]),
      /*定义放入轮播图中的二维数组*/
      categoryArr(){
        let maxLength = 8;
        const {categorys}=this;
        const bigArr=[];
        let smallArr=[];
        categorys.forEach(item=>{
          if(smallArr.length===0){
            bigArr.push(smallArr)
          }
          smallArr.push(item);
          if(smallArr.length===maxLength){
            smallArr=[];
          }
        });
        return bigArr;
      }
    },
    watch:{
      categorys(){
        this.$nextTick(()=>{
          /*swiper只有在页面加载完成后才能够执行，故使用￥nextTick在页面更新后加载*/
          new Swiper('.swiper-container', {
            centeredSlides: true,  //居中
            autoplay: {     //自动轮播
              delay: 3000,
              disableOnInteraction: false,
            },
            pagination: {   //小圆点
              el: '.swiper-pagination'
            },
            loop: true   //无线循环
          });
        })
      }
    },
    components:{
      ShopList
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl";
  .msite  //首页
    width 100%
   /* .header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        margin-left -5%
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff*/
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>
