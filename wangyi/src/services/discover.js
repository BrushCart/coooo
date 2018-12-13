import request from '../utils/request';

const host = /localhost/.test(window.location.host)?'http://123.206.55.50:14000':'http://123.206.55.50:14000';
// 获取banner
export function getBanner(){
  return request(`${host}/banner`)
}

// 获取每日推荐歌单
export function getRecommend(){
  return request(`${host}/personalized`)
}

//获取搜索列表
export function serch(keywords){
  return request(`${host}/search?keywords=${keywords}`)
}