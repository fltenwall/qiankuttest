import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui'; 

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App),
});
