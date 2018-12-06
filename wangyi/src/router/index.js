import React from 'react';
import dynamic from 'dva/dynamic';

// 引入一级路由
import LoginPage from '../routes/LoginPage';
import MainPage from '../routes/MainPage';
import SerchDetailPage from '../routes/serchDetail';

// 引入二级路由
import AccountPage from '../routes/account/Index';
import DiscoverPage from '../routes/discover/Index';
import FriendPage from '../routes/friend/Index';
import MyPage from '../routes/my/Index';
import VideoPage from '../routes/video/Index';
import SerchPage from '../routes/discover/serch';


export default {
  routes: [{
    path: '/login',
    component: LoginPage
  },{
    path: '/serchDetail/:id?',
    component: SerchDetailPage
  },{
    path: '/main',
    component: MainPage,
    children: [{
      path: '/main/account',
      component: AccountPage
    },{
      path: '/main/discover',
      component: DiscoverPage
    },{
      path: '/main/friend',
      component: FriendPage
    },{
      path: '/main/my',
      component: MyPage
    },{
      path: '/main/video',
      component: VideoPage
    },{
      path: '/main/serch',
      component: SerchPage
    }]
  },{
    path: '/',
    redirect: '/main/discover'
  }]
}
