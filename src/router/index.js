import VueRouter from "vue-router";
import Vue from 'vue';
import AuthGuard from './auth-guard'
import Home from '@/components/Home';
import Ad from '@/components/Ads/Ad';
import AdList from '@/components/Ads/AdList';
import NewAd from '@/components/Ads/NewAd';
import Registration from '@/components/Auth/Registration';
import Login from '@/components/Auth/Login';
import Orders from '@/components/User/Orders';



Vue.use(VueRouter);
const routes = [
    {
        path:'',
        name: 'home',
        component:Home
    },
    {
        path:'/ad/:id',
        props:true,
        name: 'ad',
        component:Ad
        
    },
    {
        path:'/list',
        name: 'list',
        component:AdList,
        beforeEnter: AuthGuard
    },
    {
        path:'/new',
        name: 'newAd',
        component:NewAd,
        beforeEnter: AuthGuard
    },
    {
        path:'/login',
        name: 'login',
        component:Login
    },
    {
        path:'/registration',
        name: 'reg',
        component:Registration
    },
    {
        path:'/orders',
        name: 'orders',
        component:Orders,
        beforeEnter: AuthGuard
    },
];
export const router = new VueRouter({
    routes,
    mode: 'history'
})