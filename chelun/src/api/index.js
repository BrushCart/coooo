// const host = /localhost/.test(window.location.host)?'http://123.206.55.50:14000':'http://123.206.55.50:14000';
import JSBridge from '@/utils/JSBridge.js';

export let uploadImg = (type)=>{
  return new Promise((resolve, reject)=>{
    JSBridge.invoke('device', 'chooseImage', {
      type,
      chooseCallbackName: function(res){
        resolve(res);
      }
    })
  })
}
