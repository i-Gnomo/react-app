import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Tabs } from 'antd-mobile';
import Header from './../components/Header/Header';
import MyTabBar from './../components/MyTabBar/MyTabBar';

const mytabs = [
  { title: '进行中', sub: '1' },
  { title: '已结束', sub: '2' },
  { title: '全部活动', sub: '3' },
];


class OneActv extends Component {
  render(){
    const _thisData = this.props.rowdata;
    return (<div className="EachActv">
        <div><Link to={_thisData.toLink}><img alt={_thisData.title} src={_thisData.imgSrc} /></Link></div>
        <h4>{_thisData.title}</h4>
        <p>{_thisData.descInfo}</p>
      </div>);
  }
}

class Actives extends Component {
  constructor(props){
    super(props);
    this.state = {
      isFixedActd: false,
      listdata_ON: [],
      listdata_OVER: [],
      listdata_ALL: [],
    }
    this.actvUrl = '/datalist/activeslist.json';
    this.source = axios.CancelToken.source();
  }

  headerHeight = 0;
  //窗口滚动时
  onScrollHandle = (event) => {
    const w = window;
    this.setState({
      isFixedActd: (w.pageYOffset >= this.headerHeight)
    });
  }
  
  componentDidMount = () => {
    //加载数据
    var _this = this;
    axios.get(_this.actvUrl,{ cancelToken: _this.source.token }).then(function(response){
        if(response.status === 200){
            if(response.data.result){

                _this.setState({
                  listdata_ON: response.data.result
                });

            }
        }
    }).catch(function(error){
        if (axios.isCancel(error)){
            console.log('Request canceled', error.message)
        }else{
            console.log(error);
        }
    });


    //监听tab bar位置
    const clientHeight = findDOMNode(this.refs.headerRef).clientHeight;
    this.headerHeight = clientHeight;
    window.addEventListener('scroll', this.onScrollHandle);
  }

  componentWillUnmount = () => {
    this.source.cancel('组件卸载，取消请求');
    window.removeEventListener('scroll', this.onScrollHandle);
  }

  render(){
    return (
      <div className="Page">
        <Header ref="headerRef" className="Page-header" title="活动"></Header>
        <div className={this.state.isFixedActd?"actives-list-box list-fixed-tabbar":"actives-list-box"}>
          <Tabs
            tabs={mytabs}
            swipeable={false}
            initialPage={0}
            tabBarPosition="top"
            renderTab={tab => <span>{tab.title}</span>}
          >
            <div style={styler.tabBox}>
              {this.state.listdata_ON.length>0?
                this.state.listdata_ON.map((item)=>{
                  return <OneActv key={item.id} rowdata={item} />
                })
                :null
              }
              <div className="EachActv">
                <div><img alt="农业银行联合浙江车市网举办汽车节" src="/images/huodong.jpg" /></div>
                <h4>农业银行联合浙江车市网举办汽车节</h4>
                <p>国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2017年首场汽</p>
              </div>
              <div className="EachActv">
                <div><img alt="农业银行联合浙江车市网举办汽车节" src="/images/huodong.jpg" /></div>
                <h4>农业银行联合浙江车市网举办汽车节</h4>
                <p>国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2017年首场汽</p>
              </div>
              <div className="EachActv">
                <div><img alt="农业银行联合浙江车市网举办汽车节" src="/images/huodong.jpg" /></div>
                <h4>农业银行联合浙江车市网举办汽车节</h4>
                <p>国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2017年首场汽</p>
              </div>

            </div>
            <div style={styler.tabBox}>

              <div className="EachActv">
                <div><img alt="农业银行联合浙江车市网举办汽车节" src="/images/huodong.jpg" /></div>
                <h4>农业银行联合浙江车市网举办汽车节</h4>
                <p>国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2017年首场汽</p>
              </div>
              <div className="EachActv">
                <div><img alt="农业银行联合浙江车市网举办汽车节" src="/images/huodong.jpg" /></div>
                <h4>农业银行联合浙江车市网举办汽车节</h4>
                <p>国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2017年首场汽</p>
              </div>

            </div>
            <div style={styler.tabBox}>

              <div className="EachActv">
                <div><img alt="农业银行联合浙江车市网举办汽车节" src="/images/huodong.jpg" /></div>
                <h4>农业银行联合浙江车市网举办汽车节</h4>
                <p>国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2017年首场汽</p>
              </div>
              <div className="EachActv">
                <div><img alt="农业银行联合浙江车市网举办汽车节" src="/images/huodong.jpg" /></div>
                <h4>农业银行联合浙江车市网举办汽车节</h4>
                <p>国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2017年首场汽</p>
              </div>

            </div>
          </Tabs>
        </div>
        <MyTabBar selectedkey='actives'></MyTabBar>
      </div>
    )
  }
}

const styler = {
  tabBox: {
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#fff',
  },
}

export default Actives
