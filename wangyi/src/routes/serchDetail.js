import React, { Component } from 'react';
import { connect } from 'dva';
import { Object } from 'core-js';

@connect(({play})=>{
  return play
}, dispatch=>{
  return {
    getUrl: id=>{
      dispatch({
        type: 'play/getUrl',
        payload: id
      })
    },getDetail: payload=>{
      dispatch({
        type: 'play/getDetail',
        payload: payload
      })
    }
  }
})

class SerchDetail extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    let id = this.props.match.params.id
    this.props.getUrl(id)
  }
  render() {
    console.log(this.props)
    if(!this.props.detail){
      return null
    }
    return (
      <div className="detail">
        <header className="detailHeader">
          <i className="icon iconfont">&#xe630;</i>
          <p>{this.props.detail.name}</p>
        </header>
        <div className="detailList">
          <img src={this.props.detail.al.picUrl} alt=""/>
          <div className="detailButton">
            <i className="icon iconfont">&#xe63c;</i>
            <i className="icon iconfont">&#xe61f;</i>
            <i className="icon iconfont">&#xe60f;</i>
            <i className="icon iconfont">&#xe620;</i>
          </div>
        </div>
        {this.props.url?<audio src={this.props.url} autoPlay></audio>:null}
      </div>
    );
  }
}

export default SerchDetail;
