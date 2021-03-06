import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router-dom';
import axios from "axios";

import Header from './../components/Header/Header';


const Basemark = (props) => {
  return (<div className="basemark">
    <label>{props.title}</label> 
    <p>
      <span className="standard">标配</span>
      <span className="match">选配</span>
      <span className="nothing">无</span>
    </p>
  </div>)
}

const LeftItems = (props) => {
  const o = props.opts.items.map((item,index) => {
    return (
      <div key={index} className={props['l-group-index'] === 0 && index === 0? "cell c-hide":"cell"}>
        <div className="inner">{item.name}</div>
      </div>
    );
  });
  if(o.length === 0){
    o.push(<div key="0" className="cell"><div className="inner">—</div></div>)
  }
  return (<div className="group">
      <Basemark title={props.opts.itemtype} />
      {o}
    </div>);
}

const RightItems = (props) => {
  const r = props.opts.items.map((item,index) => {
    return (<div key={index} className={props['r-group-index'] === 0 && index === 0?"cell c-hide":"cell"}>
      {item.modelexcessids.map((icm,icx) => {
        return <div key={icx} className="inner">
                <div className="carname" dangerouslySetInnerHTML={{__html: icm.value}}></div>
              </div>
      })}
    </div>);
  })
  return (<div className="group">{r}</div>)
}

class Compare extends Component {
  constructor(props){
      super(props);
      this.state = {
        topFixed: false
      }
      
      this.source = axios.CancelToken.source(); 
  }
  headerBox = null;

  onScrollHandle = (event) => {
    const win = window;
    const headerHeight = this.headerBox.clientHeight;
    this.setState({
      topFixed: (win.pageYOffset >= headerHeight)
    });
    // console.log('is fixed:', this.state.topFixed, win.pageYOffset, win.pageYOffset >= headerHeight);
  }

  componentDidMount = () => {
    this.headerBox = findDOMNode(this.refs.headerRef);
    window.addEventListener('scroll', this.onScrollHandle);
    this.getData(this.props.match.params.ids);
  }
  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.onScrollHandle);
      // this.source.cancel('组件卸载，取消请求');
  }

  getData = (_id) => {
    var _this = this;
    var carsUrl = '/datalist/car_compare.json?id='+ _id;
    axios.get(carsUrl,{ cancelToken: _this.source.token }).then(function(response){
        if(response.status === 200){
            if(response.data){
                var rd = response.data;
                _this.setState({
                  rdata: {
                    totalitems: rd.paramitems.concat(rd.configitems),
                    specinfo: rd.specinfo,
                    columns: rd.columns
                  }
                });
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
    // const cararr = [{
    //   id:"123",
    //   name:"北京现代 朗动2018款 1.8L 自动舒适型"
    // },{
    //   id:"456",
    //   name:"北京现代 朗动2018款 1.8L 自动舒适型 北京现代 朗动2018款 1.8L 自动舒适型"
    // },{
    //   id:"789",
    //   name:"北京现代 朗动2018款 1.8L 自动舒适型"
    // }]

    // const rowCols = [{
    //   id:'1',
    //   name:'车型'
    // },{
    //   id:'2',
    //   name:'车型'
    // },{
    //   id:'3',
    //   name:'车型'
    // },{
    //   id:'4',
    //   name:'车型'
    // },{
    //   id:'5',
    //   name:'车型'
    // },{
    //   id:'6',
    //   name:'车型'
    // },{
    //   id:'7',
    //   name:'车型'
    // },{
    //   id:'8',
    //   name:'车型'
    // }];

    //内容滚动时车型及顶栏固定
    const topFixed = this.state.topFixed;

    //车型对比id
    // const cids = this.props.match.params.ids;
    // console.log('车型id',cids);

    const leftCells = [], rightCells = [];
    if(this.state.rdata){
      console.log(this.state.rdata);
      const mytotalitems = this.state.rdata.totalitems;
      if(mytotalitems && mytotalitems.length>0){
        mytotalitems.map(function(itm,idx){
          console.log(itm,idx);
          leftCells.push(<LeftItems key={idx+"l"} opts={itm} l-group-index={idx}></LeftItems>);
          rightCells.push(<RightItems key={idx+"r"} opts={itm} r-group-index={idx}></RightItems>);
          return itm;
        });
      }
    }

    return (<div className="Page" style={{padding:0}}>
      <Header ref="headerRef" className="Page-header" title="车型对比" leftback={true} leftClick={this.goBack}></Header>
      <div className="Compare-section">
        <div className="Compare-header" style={{height: "10rem"}}>
          <div className={topFixed? "basic-top fixedit":"basic-top"}>
            <div className="basemark"><label>基本参数</label> <p><span className="standard">标配</span><span className="match">选配</span><span className="nothing">无</span></p></div>
            <div className="Compare-basic">
            <div className="left">
              <div className="cell">车型名称</div>
            </div>
            <div className="main">
              <div className="slide">
                {/* {cararr.map((icm) => {
                  return <div key={icm.id} className="cell">
                          <div className="carname"><Link to="">{icm.name}{icm.id}</Link></div>
                          <i className="remove-car" onClick={()=>{}}></i>
                        </div>
                })} */}
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="Compare-content">
          <div className="left">
            {leftCells}
            {/* <div className="group" key="1">
              {rowCols.map((icm1) => {
                return (
                  <div key={icm1.id} className="cell"><div className="inner">厂商指导价(元)</div></div>
                )
              })}
            </div>
            <div className="group" key="2">
              <div className="basemark"><label>车身</label> <p><span className="standard">标配</span><span className="match">选配</span><span className="nothing">无</span></p></div>
              {rowCols.map((icm2) => {
                return (
                  <div key={icm2.id} className="cell"><div className="inner">厂商指导价(元)</div></div>
                )
              })}
            </div>
            <div className="group" key="3">
              <div className="basemark"><label>车身</label> <p><span className="standard">标配</span><span className="match">选配</span><span className="nothing">无</span></p></div>
              {rowCols.map((icm3) => {
                return (
                  <div key={icm3.id} className="cell"><div className="inner">厂商指导价(元)</div></div>
                )
              })}
            </div> */}
          </div>
          <div className="main">
            <div className="slide">
              {rightCells}
              {/* <div className="group" key="1">
                {rowCols.map((icm) => {
                  return (
                    <div key={icm.id} className="cell">
                    {cararr.map((icm2) => {
                      return <div key={icm2.id} className="inner">
                              <div className="carname">北京现代</div>
                            </div>
                    })}
                    </div>
                  )
                })}
              </div>
              <div className="group" key="2">
                {rowCols.map((icm) => {
                  return (
                    <div key={icm.id} className="cell">
                    {cararr.map((icm2) => {
                      return <div key={icm2.id} className="inner">
                              <div className="carname">北京现代</div>
                            </div>
                    })}
                    </div>
                  )
                })}
              </div>
              <div className="group" key="3">
                {rowCols.map((icm) => {
                  return (
                    <div key={icm.id} className="cell">
                    {cararr.map((icm2) => {
                      return <div key={icm2.id} className="inner">
                              <div className="carname">北京现代</div>
                            </div>
                    })}
                    </div>
                  )
                })}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default Compare