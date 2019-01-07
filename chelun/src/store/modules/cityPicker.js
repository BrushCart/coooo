import {cityList, costList} from '@/api/index';

const state = {
  // 签发城市列表
  cityList: [],
  // 可补换城市列表
  costList: [],
  // 选择的签发城市
  city: [],
  // 选择的补换城市
  cost: [],
  // 需要的费用
  money: ''
}

const mutations = {
  updateState(state, action){
    if (Object.keys(action)[0] == 'cost'){
      let value = Object.values(action)[0];
      let proIndex = state.costList.findIndex(item=>item.name==value[0]),
          cityIndex = state.costList[proIndex].list.findIndex(item=>item.name==value[1]);
      state.money = state.costList[proIndex].list[cityIndex].cost;
    }
    state = Object.assign(state, action);
  }
}

const actions = {
  // 获取签发城市列表
  async getCityList({commit}){
    let res = await cityList();
    res.data.forEach(item=>{
      item.list.forEach(value=>{
        delete value.list;
      })
    })
    commit('updateState', {cityList: res.data})
    console.log('res...', res);
  },
  // 获取可补换的城市列表
  async getCostList({commit,state}, action){
    let proIndex = state.cityList.findIndex(item=>item.name==state.city[0]),
        cityIndex = state.cityList[proIndex].list.findIndex(item=>item.name==state.city[1]);
    let res = await costList(1, state.cityList[proIndex].id, state.cityList[proIndex].list[cityIndex].id);

    res.data.forEach(item=>{
      if (item.source_city == 1){
        item.name += '(签发地)'
        item.list.forEach(value=>{
          if (value.source_city == 1){
            value.name += '(签发地)'
          }
        })
      }
    })
    commit('updateState', {costList: res.data})
    console.log('res.....', res);
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
