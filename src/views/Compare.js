import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import Header from './../components/Header/Header';
import Item from 'antd-mobile/lib/popover/Item';

class Compare extends Component {
  constructor(props){
      super(props);
      this.state = {}
      //获取资讯内容的路由
      
      this.source = axios.CancelToken.source(); 
  }

  componentDidMount = () => {
    this.getData(this.props.match.params.ids);
  }
  componentWillUnmount = () => {
      // this.source.cancel('组件卸载，取消请求');
  }

  getData = (_id) => {
    var _this = this;
    var newsUrl = '/datalist/newslist2.json?id='+ _id;

    axios.get(newsUrl,{ cancelToken: _this.source.token }).then(function(response){
        if(response.status === 200){
            if(response.data.result){
                // _this.setState();
                window.scrollTo(0, 0);
            }
        }
    }).catch(function(error){
        if (axios.isCancel(error)){
            console.log('Request canceled', error.message)
        }else{
            console.log(error);
        }
    });
  }

  goBack = () => {
    this.props.history.goBack();
  } 

  render(){
    const cararr = [{
      id:"123",
      name:"北京现代 朗动2018款 1.8L 自动舒适型"
    },{
      id:"456",
      name:"北京现代 朗动2018款 1.8L 自动舒适型 北京现代 朗动2018款 1.8L 自动舒适型"
    },{
      id:"789",
      name:"北京现代 朗动2018款 1.8L 自动舒适型"
    }]


    const cids = this.props.match.params.ids;
    const compare = cids.indexOf(',')>0? true:false;
    console.log('车型id',cids);
    return (<div className="Page">
      <Header className="Page-header" title={compare? '车型对比':'车辆配置'} leftback={true} leftClick={this.goBack}></Header>
      <div className="Compare-section">
        <div className="Compare-header">
          <div className="Compare-basic">
            <div className="left">
              <div className="item">车型名称</div>
            </div>
            <div className="main">
              <div className="slide">
                {cararr.map((icm) => {
                  return <div key={icm.id} className="item">
                          <div className="carname"><Link to="">{icm.name}{icm.id}</Link></div>
                          <i className="remove-car" onClick={()=>{}}>X</i>
                        </div>
                })}
              </div>
            </div>
          </div>
          <div className="basemark"></div>
        </div>
        <div className="Compare-content">
          <div className="left"></div>
          <div className="main"></div>
        </div>
      </div>
    </div>
    )
  }
}

export default Compare