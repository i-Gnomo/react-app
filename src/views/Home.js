import React, { Component } from 'react';
import './../App.css';

// import {TabBar} from 'antd-mobile';
import Header from './../components/Header/Header';
import Content from './../components/Content/Content';
import Footer from './../components/Footer/Footer';
import MyTabBar from './../components/MyTabBar/MyTabBar';

class Home extends Component {
    render(){
      return (
        <div className="Page">
          <Header className="Page-header" title="Logo"></Header>
          <Content className="Page-content"></Content>
          <Footer className="Page-footer"></Footer>
          <MyTabBar selectedkey='home'></MyTabBar>
        </div>
      )
    }
}

export default Home