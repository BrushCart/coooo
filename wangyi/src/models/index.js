import { routerRedux } from 'dva/router';
import {getToken, setToken} from '../utils/user';
import {login} from '../services/index';

export default {
  namespace: 'index',
  state: {

  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({ pathname }) => {
        //console.log('pathname...', pathname);
        if (pathname !== '/login') {
          if (!getToken()){
            dispatch(routerRedux.replace({
              pathname: '/login',
            }))
          }
        }
      });
    },
  },

  effects: {
    *login({payload}, {call, put}){
      console.log('login payload...', payload);
      let response = yield call(login, payload);
      console.log('response...', response);
      // 设置token
      setToken(response.data.account.id);
      yield put({
        type: 'updateState',
        payload: response.data
      });
      yield put(routerRedux.replace({
        pathname: '/',
      }))
    }
  },

  reducers: {
    updateState(state, action){
      //console.log('action...', action);
      return {...state, ...action.payload}
    }
  }
}
