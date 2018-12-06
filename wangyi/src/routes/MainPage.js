import React from 'react';
import RouterView from '../router/RouterView';
import {NavLink} from 'dva/router';
import style from './MainPage.scss';

class MainPage extends React.PureComponent{
  render(){
    return <React.Fragment>
      <RouterView routes={this.props.routes}></RouterView>
      <footer>
        <NavLink to="/main/discover">
          <p><i className="icon iconfont">&#xe762;</i></p>
          <span>发现</span>
        </NavLink>
        <NavLink to="/main/video">
          <p><i className="icon iconfont">&#xe61e;</i></p>
          <span>视频</span>
        </NavLink>
        <NavLink to="/main/my">
          <p><i className="icon iconfont">&#xe602;</i></p>
          <span>我的</span>
        </NavLink>
        <NavLink to="/main/friend">
          <p><i className="icon iconfont">&#xe6a1;</i></p>
          <span>朋友</span>
        </NavLink>
        <NavLink to="/main/account">
          <p><i className="icon iconfont">&#xe601;</i></p>
          <span>账号</span>
        </NavLink>
      </footer>
    </React.Fragment>
  }
}

export default MainPage;
