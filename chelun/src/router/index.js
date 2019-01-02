import VueRouter from 'vue-router';
import Vue from 'vue';

// 路由组件
import IndexPage from '@/pages/Index.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [{
    path: '/index',
    component: IndexPage
  },{
    path: '*',
    redirect: '/index'
  }]
})

// 导航守卫
router.beforeEach((to, from, next)=>{
  console.log('1111');
  next();
})

router.afterEach((to, from, next)=>{

})

export default router;
