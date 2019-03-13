import Vue from 'vue'
import App from './components/app/App.vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify, {
    iconfont: 'md'
});

new Vue({
    el: '#app',
    render: h => h(App)
});