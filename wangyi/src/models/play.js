import { getUrl, getDetail, getLyric } from '../services/index'

export default {
  namespace: 'play',
  state: {
    id: 0,
    url: '',
    info: {},
    lyric: ''  //歌词
  },
  effects: {
    * getUrl({ payload }, {call,put}){
      let response = yield call(getUrl, payload)
      let detail = yield call(getDetail, payload)
      //console.log('datail response',detail)
      let obj = {info:response.data.data[0]}
      obj.id = payload
      obj.url = response.data.data[0].url
      obj.detail = detail.data.songs[0];
      yield put({
        type: 'updateState',
        payload: obj
      })
    },
    * getLyric({ payload }, { call, put }){
      // 获取歌词
      let lyric = yield call(getLyric, payload);
      yield put({
        type: 'updateState',
        payload: {
          lyric: lyric.data.lrc.lyric
        }
      })
    }
  },
  reducers: {
    updateState(state, action){
      //console.log('action...', action);
      return {...state, ...action.payload}
    },
    changPlay(state, action) {
      return
    }
  }
}