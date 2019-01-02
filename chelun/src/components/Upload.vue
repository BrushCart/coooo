<template>
  <ul>
    <li v-for="(item, index) in list" :key="index" @click="click(index)">
      <img v-if="item.src" :src="item.src">
      <img v-else class="add" :src="addImg">
      <p>{{item.desc}}</p>
    </li>
    <div v-show="showMask" class="mask">
      <img :src="current.demo">
      <div>
        <button @click="upload(1)">拍照</button>
        <button @click="upload(2)">相册</button>
        <button @click="cancel">取消</button>
      </div>
    </div>
  </ul>
</template>

<script>
import {mapState, mapMutations} from 'vuex';
import {uploadImg} from '@/api/index';
import add from '@/assets/add.png';
export default {
  data(){
    return {
      current: {},
      showMask: false
    }
  },
  name: 'Upload',
  computed: {
    ...mapState({
      list: state=>state.upload.list
    }),
    addImg(){
      return add;
    }
  },
  methods: {
    ...mapMutations({
      updataList: 'upload/upadteList'
    }),
    click(index){
      this.current = this.list[index];
      this.showMask = true;
    },
    cancel(){
      this.showMask = false;
    },
    upload(type){
      // let res = uploadImg(type);
      uploadImg(type).then(res=>{
        if (res.code == 0){
          let src = '';
          if (/picture.eclicks.cn/.test(res.data.image01)) {
              src = res.data.image01.replace('http://', '//');
          } else {
              src = '//picture.eclicks.cn/' + res.data.image01;
          }
          this.updataList({
            src,
            index: this.list.findIndex(item=>item==this.current)
          })
        }else{
          alert(res.msg);
        }
      })
      // console.log('res...', res);
    }
  }
}
</script>

<style lang="scss" scoped>
ul{
  margin-top: .2rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
li{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img{
    border-radius: .15rem;
    width: .9rem;
    height: .7rem;
    border: 1px solid #c0c0c0;
  }
  p{
    font-size: .26rem;
    padding: .1rem .3rem;
    text-align: center;
  }
}
.add{
  width: .5rem;
  height: .5rem;
  padding: .1rem .2rem;
}
.mask{
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0, .5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  img{
    width: 90%;
    margin-top: 20%;
  }
  div{
    display: flex;
    width: 90%;
    flex-direction: column;
    align-items: center;
    button{
      width: 100%;
      height: .9rem;
      font-size: .4rem;
      letter-spacing: .1rem;
      border-radius: .15rem;
      background: #fff;
      color: #3aafc0;
    }
    button:first-child{
      border-radius: .15rem .15rem 0 0;
    }
    button:nth-child(2){
      border-radius: 0 0 .15rem .15rem;
    }
    button:last-child{
      margin: .15rem 0;
    }
  }
}
</style>
