import Vue from 'vue'
import App from './App.vue'
import store from './store'
import BuyModalComponent from '@/components/Shared/BuyModal'
import vuetify from './plugins/vuetify';
import * as fb from 'firebase'
import {router} from './router'

Vue.config.productionTip = false
Vue.component('app-buy-modal', BuyModalComponent )

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created(){
    fb.initializeApp({
      apiKey: "AIzaSyC-dEAwvOCI_fbYPa4hTn34-w7yLSgmXyQ",
      authDomain: "its-ads-46d0f.firebaseapp.com",
      databaseURL: "https://its-ads-46d0f.firebaseio.com",
      projectId: "its-ads-46d0f",
      storageBucket: "gs://its-ads-46d0f.appspot.com",
      messagingSenderId: "793082536449",
      appId: "1:793082536449:web:c326a4ddb17836d10e9600"
    })
    fb.auth().onAuthStateChanged(user=>{
      if(user){
        console.log(user)
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')

  }
}).$mount('#app')
