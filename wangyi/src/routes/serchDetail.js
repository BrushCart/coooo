import React, { Component } from 'react';
import { connect } from 'dva';
import Lyric from '../components/Lyric';
import { formatTime } from '../utils/index';

@connect(({play})=>{
  return play
}, dispatch=>{
  return {
    getUrl: id=>{
      dispatch({
        type: 'play/getUrl',
        payload: id
      })
    },
    getDetail: payload=>{
      dispatch({
        type: 'play/getDetail',
        payload: payload
      })
    },
    changeLyric: payload=>{
      dispatch({
        type: 'play/getLyric',
        payload
      })
    }
  }
})

class SerchDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlay: true,
      progress: 0
    }
  }
  componentDidMount() {
    let id = this.props.match.params.id
    this.props.getUrl(id)
  }

  //判断id匹配歌词
  componentWillReceiveProps(next) {
    //判断id是否相同，找到相对应的歌词文本
    if(next.id || this.props.id){
      this.props.changeLyric(next.id)
    }
  }

  //返回键
  back() {
    window.history.go(-1)
  }

  //播放歌曲出发
  timeUpdate(){
    let progress = this.refs.audio.currentTime/this.refs.audio.duration*100;
    this.setState({
      progress
    }, ()=>{
      if(this.state.progress == 100){
        if(!this.props.playList.length){
           this.refs.audio.pause()
           this.refs.audio.currentTime = 0;
           this.refs.audio.play() 
        }
      }
    })
  }

  //总时长
  get duration(){
    if (this.refs.audio && this.refs.audio.duration){
      return formatTime(this.refs.audio.duration);
    }
    return '00:00';
  }
  
  //当前的播放时间
  get currentTime(){
    if (this.refs.audio && this.refs.audio.currentTime){
      return formatTime(this.refs.audio.currentTime);
    }
    return '00:00';
  }

  changStart() {
    this.setState({
      isPlay: !this.state.isPlay
    }, () => {
      this.state.isPlay ? this.refs.audio.play() : this.refs.audio.pause()
    })
  }
  //开始拖动
  touchStart() {
    this.setState({
      isPlay: false
    }, ()=>{
      this.refs.audio.pause()
    })
  }
  //拖动时
  touchMove(e) {
    let touch = e.touches[0],
        progressEle = this.refs.progress;
    let progress = (touch.pageX - progressEle.offsetLeft)/progressEle.offsetWidth;
    if (progress>1){
      progress = 1;
    }
    if (progress<0){
      progress = 0;
    }
    this.setState({
      progress: progress*100
    }, ()=>{
      this.refs.audio.currentTime = progress*this.refs.audio.duration
    }) 
  }
  //拖动完毕
  touchEnd() {
    this.setState({
      isPlay: false
    }, ()=>{
      this.refs.audio.play()
    })
  }

  //切换歌曲
  changPlay(type) {
    this.props.changPlay(type)
  }

  render() {
    if(!this.props.detail){
      return null
    }
    return (
      <div className="detail">
        <header className="detailHeader">
          <i className="icon iconfont" onClick={this.back}>&#xe630;</i>
          <p>
            {this.props.detail.name}
          </p>
        </header>
        <div className="detailList">
          <Lyric lyric={this.props.lyric} currentTime={this.refs.audio && this.refs.audio.currentTime} />
          <img className="pic" src={this.props.detail.al.picUrl} alt=""/>
          <div className="proLine"
            onTouchStart={this.touchStart.bind(this)}
            onTouchMove={this.touchMove.bind(this)}
            onTouchEnd={this.touchEnd.bind(this)}
          >
            <span className="leftTime">{this.currentTime}</span>
            <p ref="progress"><span style={{width:this.state.progress+'%'}}></span></p>
            <span className="rightTime">{this.duration}</span>
          </div>
          <div className="detailButton">
            <i className="icon iconfont">&#xe63c;</i>
            <i className="icon iconfont" onClick={()=>{this.changPlay('prev')}}>&#xe61f;</i>
            <i className="icon iconfont" onClick={this.changStart.bind(this)}>&#xe6a7;</i>
            <i className="icon iconfont" onClick={()=>{this.changPlay('next')}}>&#xe620;</i>
            <i className="icon iconfont">&#xe699;</i>
          </div>
        </div>
        {this.props.url?<audio src={this.props.url} autoPlay ref="audio" onTimeUpdate={()=>this.timeUpdate()}></audio>:null}
      </div>
    );
  }
}

export default SerchDetail;
