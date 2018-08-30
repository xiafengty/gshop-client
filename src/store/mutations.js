import {
  REQ_ADDRESS,
  REQ_CATEGORY,
  REQ_SHOPS,
  SAVE_USER_INFO,
  REQ_USER_INFO,
  REQ_LOGOUT
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
  }
}
