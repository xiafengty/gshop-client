import {
  REQ_ADDRESS,
  REQ_CATEGORY,
  REQ_SHOPS,
  SAVE_USER_INFO,
  REQ_USER_INFO,
  REQ_LOGOUT,
  REQ_SHOP_INFO,
  REQ_SHOP_RATING,
  REQ_SHOP_GOODS
} from "./mutations-types";
export default {
  [REQ_ADDRESS](state,{address}){
    state.address = address;
  },
  [REQ_CATEGORY](state,{categorys}){
    state.categorys = categorys;
  },
  [REQ_SHOPS](state,{shops}){
    state.shops = shops;
  },
  [SAVE_USER_INFO](state,{userInfo}){
    state.userInfo=userInfo;
  },
  [REQ_USER_INFO](state,{userInfo}){
    state.userInfo=userInfo;
  },
  [REQ_LOGOUT](state){
    state.userInfo=[];
  },
  [REQ_SHOP_INFO](state,{info}){
    state.info=info;
  },
  [REQ_SHOP_RATING](state,{ratings}){
    state.ratings=ratings;
  },
  [REQ_SHOP_GOODS](state,{goods}){
    state.goods=goods;
  }
}
