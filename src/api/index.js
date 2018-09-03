
import ajax from "./axios";
/*请求地理位置*/
const BASE = "/api"
export const reqAddress = (geohash) => ajax(`${BASE}position/${geohash}`);
/* 请求食品分类列表*/
export const reqCategorys = () => ajax(BASE+"/index_category");
/*根据经纬度获取商铺列表*/
export const reqShops = (longitude,latitude) => ajax(`${BASE}/shops`,{latitude,longitude});
/*获取一次性验证码*/
export const reqSendcode = (phone) => ajax(`${BASE}/sendcode`,{phone});
/*手机号码验证登录*/
export const reqLoginSms = ({phone,code}) => ajax(`${BASE}/login_sms`,{phone,code},"POST");
/*用户名密码登录验证*/
export const reqLoginPwd = ({name,pwd,captcha}) => ajax(`${BASE}/login_pwd`,{name,pwd,captcha},"POST");
/*根据会话获取用户信息*/
export const reqUserInfo = () => ajax(`${BASE}/userinfo`);
/*用户登出*/
export const reqLogout = () => ajax(`${BASE}/logout`);
/*获取商家信息*/
export const reqShopInfo = () => ajax('/info');
/*获取商家评价信息*/
export const reqShopRatings = () => ajax('/ratings');
/*获取商家商品数组*/
export const reqShopGoods = () => ajax('/goods');
