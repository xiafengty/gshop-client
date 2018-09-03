import Vue from "vue";
import VerRouter from "vue-router"
import Msite from '../pages/Msite/Msite.vue'
import Order from '../pages/Order/Order.vue'
import Search from '../pages/Search/Search.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'

import Shop from '../pages/Shop/Shop.vue';
import ShopFoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRating from '../pages/Shop/ShopRating/ShopRating.vue'
Vue.use(VerRouter);
export default new VerRouter({
  routes: [
    {
      path: '/msite',
      component: Msite,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/order',
      component: Order,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/search',
      component: Search,
      meta:{
        showFooter:true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path:"/login",
      component:Login
    },
    {
      path:"/shop",
      component:Shop,
      children:[
        {
          path:"/shop/goods",
          component:ShopFoods
        },
        {
          path:"/shop/info",
          component:ShopInfo
        },
        {
          path:"/shop/rating",
          component:ShopRating
        },
        {
          path: "",
          redirect: "/shop/goods"
        }
      ]
    },
    {
      path:"/",
      redirect:"/msite",
      meta:{
        showFooter:true
      }
    },
  ]
})



