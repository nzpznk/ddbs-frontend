import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.use(ElementUI);
Vue.use(VueRouter);

import ArticleBrief from'./ArticleBrief.vue'
import Article from './Article.vue'

Vue.component('articlebrief', ArticleBrief)
Vue.component('article', Article)

var router = new VueRouter({
    mode: 'hash',
    routes: [
        {path: '/', component: ArticleBrief, props: {granularity: 'daily'}}, 
        {path: '/article/:aid', component: Article},
        {path: '/daily', component: ArticleBrief, props: {granularity: 'daily'}},
        {path: '/weekly', component: ArticleBrief, props: {granularity: 'weekly'}},
        {path: '/monthly', component: ArticleBrief, props: {granularity: 'monthly'}},
        {path: '/randomly', component: ArticleBrief, props: {granularity: 'randomly'}},
        // {path: '/searchuser', component: },
    ]
});

new Vue({
    el: '#app',
    router: router,
    render: h=>h(App)
})
