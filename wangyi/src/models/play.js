import { getUrl, getDetail } from '../services/index'

export default {
  namespace: 'play',
  state: {
    id: 0,
    url: '',
    info: {}
  },
  effects: {
    * getUrl({ payload }, {call,put}){
      let response = yield call(getUrl, payload)
      let detail = yield call(getDetail, payload)
      console.log('datail response',detail)
      let obj = {info:response.data.data[0]}
      obj.id = payload
      obj.url = response.data.data[0].url
      obj.detail = detail.data.songs[0];
      yield put({
        type: 'updateState',
        payload: obj
      })
    }
  },
  reducers: {
    updateState(state, action){
      //console.log('action...', action);
      return {...state, ...action.payload}
    }
  }
}