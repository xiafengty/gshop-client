<template>
  <div id="app">
    <FooterGuide v-show="$route.meta.showFooter" />
    <router-view/>
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";
import {mapActions} from "vuex";
export default {
  mounted(){
    this.$store.dispatch("getAddress");
    this.$store.dispatch("getUserInfo");
  },
  components:{
    FooterGuide
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
 #app {
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    position: relative;
  }
</style>
