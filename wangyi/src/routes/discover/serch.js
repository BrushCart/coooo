import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

@connect(({discover})=>{
  let {songs, songCount} = discover;
  return {
    songs,
    songCount
  }
}, dispatch=>{
  return {
    serch: payload=>{
      dispatch({
        type: 'discover/serch',
        payload
      })
    }}
})

class Serch extends Component {
  constructor(props) {
    super(props);
  }
  serch() {
    let serch = this.refs.serch.value
    if (serch){
      this.props.serch(serch);
    }
  }
  render() {
    //console.log(this.props)
    let {songs} = this.props
    return (
      <div className="search">
        <header className="searchHeader">
          <input type="text" placeholder="输入想搜索的内容" ref="serch"/>
          <button onClick={this.serch.bind(this)}>搜索</button>
        </header>
        <div className="songs">
          <ul>{
            songs.map((item,index)=>{
              return <Link to={`/serchDetail/${item.id}`}  key={index}>
              <li>
                <h3>{item.name}</h3>
                <span>{`${item.artists[0].name} - ${item.album.name}`}</span>
              </li></Link>
            })
          }</ul>
        </div>
      </div>
    );
  }
}

export default Serch;
