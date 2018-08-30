
import Vue from 'vue'
import {Button} from 'mint-ui';
import App from './App.vue'
import router from "./router"
import store from "./store"
import HeaderTop from "./components/HeaderTop/HeaderTop.vue"
Vue.config.productionTip = false;

Vue.component(Button.name, Button);
Vue.component("HeaderTop",HeaderTop)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  /* render:h=>h(App)*/
  router,
  store
});

