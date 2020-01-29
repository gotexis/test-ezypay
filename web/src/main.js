import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import Buefy from 'buefy';
import App from './App.vue';
import router from './router';
import store from './store';
import './assets/sass/app.sass';

Vue.config.productionTip = false;

Vue.use(VueProgressBar, {
  color: 'rgb(74, 139, 250)',
  failedColor: 'rgb(205, 33, 13)',
  height: '3px',
});

Vue.use(Buefy);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
