import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(ElementUI);
Vue.use(VueRouter);

import Daily from'./Daily.vue'
import Article from './Article.vue'

Vue.component('daily', Daily)
Vue.component('article', Article)

var router = new VueRouter({
    mode: 'hash',
    routes: [
        {path: '/', component: Daily}, 
        {path: '/daily', component: Daily},
        {path: '/article', component: Article}
    ]
});

new Vue({
    el: '#app',
    router: router,
    render: h=>h(App)
})
