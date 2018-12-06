import { routerRedux } from 'dva/router';
import {getBanner, getRecommend, serch} from '../services/index';

export default {
  namespace: 'discover',
  state: {
    banners: [],
    result: [],
    songs: [],
    songsCount: []
  },

  effects: {
    * getBanner({payload}, {call, put}){
        let response = yield call(getBanner);
        //console.log('banner response...', response);
        yield put({
          type: 'updateState',
          payload: response.data
        })
    },
    * getRecommend({payload}, {call, put}){
        let response = yield call(getRecommend);
        //console.log('result response...', response);
        yield put({
          type: 'updateRecommend',
          payload: response.data
        })
    },
    * serch({payload}, {call, put}){
        console.log(payload)
        let response = yield call(serch,payload);
        //console.log('serch response...', response);
        yield put({
          type: 'updateState',
          payload: response.data.result
        })
    }
  },

  reducers: {
    updateState(state, action){
      //console.log('action...', action);
      return {...state, ...action.payload}
    },
    updateRecommend(state, action){
      //console.log('action...', action);
      return {...state, ...action.payload}
    }
  }
}
