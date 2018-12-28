const state = {
  num:1000
}
//同步改变
const mutations = {
  changNum(state, action){
    state.num = action.payload == '+' ?state.num+1:state.num-1
  }
}
//异步改变
const actions = {
  changeNumAsync({commit}, action){
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        commit({
          type:'changNum',
          payload:action.payload
        });
        resolve();
      },500)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}