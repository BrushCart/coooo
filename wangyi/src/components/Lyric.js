import React, { Component } from 'react';
import {toSec} from '../utils/index';
import { Carousel } from 'antd-mobile'

class Lyric extends Component {
  constructor(props) {
    super(props);
    this.state = {
      times: [], //存放歌词时间
      texts: [], //存放歌曲文本
      current: 0  //滚动下标
    }
  }
  //把歌词空缺的地方补上正常显示
  initLyric(lyrics) {
    //转化数组
    lyrics = lyrics.split('\n');
    //删除文本最后一项为空的
    lyrics.filter(item=>item)
    lyrics = lyrics.map((item,index)=>{
      let arr = item.split(']');
      if(!arr[1] && index < lyrics.length-2){
        for(let i=index+1,len=index+3; i<len; i++){
          let temp = lyrics[i].split(']');
          if(temp[1]){
            arr[1] = temp[1];
            break;
          }
        }
        return arr.join(']')
      }else{
        return item
      }
    })
    this.formatLyric(lyrics);
  }
  //解析歌词
  formatLyric(lyrics) {
    let times = [],
        texts = []
    lyrics.forEach(item=>{
      let arr = item.replace('[','').split(']');
      times.push(toSec(arr[0]));
      texts.push({
        time: toSec(arr[0]),
        text: arr[1]
      })
    })
    this.setState({
      times,
      texts
    })
    console.log('texts...',texts)
  }
  componentWillReceiveProps(nextProps, nextState){
    // if(!this.state.times.length){
      // this.initLryic();
    // }

    if (nextProps.lyric != this.props.lyric){
      this.initLyric(nextProps.lyric);
    }
    // console.log('props...', nextProps);
    for (let i=0,len=this.state.times.length; i<len; i++){
      if (nextProps.currentTime < this.state.times[i]){
        if (i-1 !== this.state.current){
          this.setState({
            current: i-1
          });
        }
        break;
      }
    }
  }
  render() {
    return (
      <Carousel
      className="lyric"
      selectedIndex={this.state.current}
      // autoplay={true}
      vertical={true}
      dots={false}
      autoplayInterval={500}
      infinite
    >{
      this.state.texts.map((item, index)=>{
        return <p key={index}>{item.text}</p>
      })
    }</Carousel>
    );
  }
}

export default Lyric;
