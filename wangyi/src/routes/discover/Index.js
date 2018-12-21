import React from 'react';
import {connect} from 'dva';
import { Carousel } from 'antd-mobile';
import { Link } from 'dva/router';

@connect(({discover})=>{
  return discover
}, dispatch=>{
  return {
    getBanner: ()=>{
      dispatch({
        type: 'discover/getBanner'
      })
    },
    getRecommend: payload=>{
      dispatch({
        type: 'discover/getRecommend',
        payload
      })
    }}
  }
)
class Index extends React.PureComponent{
  componentDidMount(){
    this.props.getBanner();
    this.props.getRecommend();
  }
  click() {
    console.log(window._hmt)
    window._hmt.push(['_trackEvent', '网易云音乐', '按钮点击', '搜索按钮']);
  }
  render(){
    console.log('props..', this.props);
    let {banners,result} = this.props;
    return (<div className="main">
      <header>
        <Link to="#"><i className="icon iconfont">&#xe607;</i></Link>
        <Link to="/main/serch" onClick={()=>this.click()}><input placeholder="输入想搜索的歌曲" type="text"/></Link>
        <Link to="#"><i className="icon iconfont">&#xe699;</i></Link>
      </header>
      <Carousel infinite={true} autoplay={true}>{
        banners.map((item, index)=>{
          return <img className="bannersImg" key={index} src={item.imageUrl}/>
        })
      }</Carousel>
      <div className="mains">
        <div className="musicList">
          <p>推荐歌单</p>
        </div>
        <div className="result">{
          result.map((item,index)=>{
            return <dl key={index}>
              <dd><img src={item.picUrl}/></dd>
              <dt>{item.name}</dt>
            </dl>
          })
        }</div>
      </div>
    </div>)
  }
}

export default Index;
