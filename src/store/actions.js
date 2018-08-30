
import {
  REQ_ADDRESS,
  REQ_CATEGORY,
  REQ_SHOPS,
  SAVE_USER_INFO,
  REQ_USER_INFO,
  REQ_LOGOUT
} from "./mutations-types";
import {
  reqAddress,
  reqCategorys,
  reqShops,
  reqUserInfo,
  reqLogout
} from "../api"

export default {
    async getAddress ({commit,state}){
      const {latitude,longitude}=state;
      const geohash=`${latitude},${longitude}`
      const result=await reqAddress(geohash);
      const address=result.data;
      commit(REQ_ADDRESS,{address})
    },
    async getCategorys ({commit}){
      const result=await reqCategorys();
      const categorys=result.data;
      commit(REQ_CATEGORY,{categorys})
    },
    async getShops({commit,state}){
      const {latitude,longitude}=state;
      const result=await reqShops(latitude,longitude);
      const shops=result.data;
      commit(REQ_SHOPS,{shops});
    },
    saveUserInfo({commit},{userInfo}){
        commit(SAVE_USER_INFO,{userInfo});
    },
    async getUserInfo({commit}){
      const result = await reqUserInfo();
      if(result.code===0){
        const userInfo = result.data;
        commit(REQ_USER_INFO,{userInfo});
      }
    },
    async getLogout({commit}){
      const result = await  reqLogout();
      if(result.code===0){
        commit(REQ_LOGOUT);
      }
    }
}
