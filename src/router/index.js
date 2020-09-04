import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/store';

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      navBar: true,
      playBar: true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/songList',
    name: 'songList',
    component: () => import(/* webpackChunkName: "about" */ '@/views/songList/SongList.vue'),
    meta:{
      navBar: true,
      playBar: true,
      isKeep: true
    }
  },
  {
    path: '/songList/:id',
    name: 'songListDetail',
    component: () => import(/* webpackChunkName: "about" */ '@/views/songList/Detail.vue'),
    meta:{
      navBar: false,
      playBar: true
    }
  },
  {
    path: '/user',
    name: 'user',
    component: () => import(/* webpackChunkName: "about" */ '@/views/User.vue'),
    meta:{
      navBar: true,
      playBar: true
    }
  },
  {
    path: '/rank',
    name: 'rank',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Rank.vue'),
    meta:{
      navBar: true,
      playBar: true
    }
  },
  {
    path: '/recommend',
    name: 'recommend',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Recommend.vue'),
    meta:{
      navBar: true,
      playBar: true,
      isKeep: true
    }
  },
  {
    path: '/play',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Play.vue'),
    meta:{
      navBar: false,
      playBar: false
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  // console.log(to);
  // 当路由切换关闭播放列表
  store.commit('setShowPlayList', false);
  next();
});

export default router;
