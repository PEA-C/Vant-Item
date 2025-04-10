import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/utils/vant-ui'
import ArticleItem from '@/components/ArticleItem.vue'
Vue.component('ArticleItem', ArticleItem)
// 全部导入
// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
