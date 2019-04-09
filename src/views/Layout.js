import React, { Component } from 'react';
import './../App.css';
import MyTabBar from './../components/MyTabBar/MyTabBar';

class Layout extends Component {
    constructor(props){
      super(props);
      this.state = {
        nowkey: 'home'
      }
    }

    componentDidMount = () => {
      // console.log(this.props.location,'12312312312');
    }

    render(){
      // console.log(this.props.location,'2222111111111111');
      // const mylocation = this.props.location;
      // const nowkey = mylocation.pathname.indexOf('newcar')> -1 && mylocation.state? mylocation.state.selectedTab: 'home';
      // console.log(nowkey);
      return (
        // <MyTabBar selectedkey="home"></MyTabBar>
        <MyTabBar selectedkey={this.state.nowkey}></MyTabBar>
      )
    }
}

export default Layout