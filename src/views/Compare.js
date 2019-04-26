import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
// import { Link } from 'react-router-dom';
import axios from "axios";
import IScroll from "iscroll-zoom-probe";

import Header from './../components/Header/Header';

//legend标签
class Basemark extends Component{
  render(){
    return (<div className="basemark">
      <label>{this.props.title}</label> 
      <p>
        <span className="standard">标配</span>
        <span className="match">选配</span>
        <span className="nothing">无</span>
      </p>
    </div>)
  }
}
//legend标签真实Dom
var legendRefs = [];
const setLegendRef = (elem) => {
  legendRefs.push(elem);
}
//左侧legend
const LeftItems = (props) => {
  const o = props.opts.items.map((item,index) => {
    return (
      <div key={index} className={props['l-group-index'] === 0 && index === 0? "cell c-hide":"cell"}>
        <div className="inner">{item.name}</div>
      </div>
    );
  });
  if(o.length === 0){
    o.push(<div key="0" className="cell"><div className="inner">-</div></div>)
  }
  return (<div className="group">
      <Basemark ref={setLegendRef} title={props.opts.itemtype} />
      {/* <Basemark ref={()=>{return "legend"+props['l-group-index']}} title={props.opts.itemtype} /> */}
      {o}
    </div>);
}
//右侧车型配置相关内容
const RightItems = (props) => {
  const r = props.opts.items.map((item,index) => {
    return (<div key={index} className={props['r-group-index'] === 0 && index === 0?"cell c-hide":"cell"}>
      {item.modelexcessids.map((icm,icx) => {
        var itmHtml = [];
        itmHtml.push(<div key={icx} className="inner">
          <div className="carname" dangerouslySetInnerHTML={{__html: icm.value}}></div>
        </div>);
        if(icx === (item.modelexcessids.length - 1)){
          if(item.modelexcessids.length<props.columnsNum){
            for(let x = 0;x<(props.columnsNum-item.modelexcessids.length);x++){
                itmHtml.push(<div key={icx + (x -(-1))} className="inner">
              <div className="carname" dangerouslySetInnerHTML={{__html: "-"}}></div>
            </div>);
            }
          }
          itmHtml.push(<div key={icx + (props.columnsNum -(-1))} className="inner">
            <div className="carname" dangerouslySetInnerHTML={{__html: "&nbsp;"}}></div>
          </div>);
        }
        return itmHtml;
      })}
    </div>);
  })
  return (<div className="group">{r}</div>)
}

function getPoint(obj) { //获取某元素以浏览器左上角为原点的坐标  
  var t = obj.offsetTop; //获取该元素对应父容器的上边距  
  var l = obj.offsetLeft; //对应父容器的上边距  
  //判断是否有父容器，如果存在则累加其边距  
  while (obj = obj.offsetParent) {
      t += obj.offsetTop; //叠加父容器的上边距  
      l += obj.offsetLeft; //叠加父容器的左边距  
  }  
  return {
      x:l,
      y:t
  }
}  

class Compare extends Component {
  constructor(props){
      super(props);
      this.state = {
        legendName: '基本参数',
        topFixed: false,
        isFirstRender: true
      }
      this.timmer = null;
      this.setCompareHeader = element => {
        this.compareHeader = element;
      };

      this.source = axios.CancelToken.source(); 
  }
  legendBox = null;

  onScrollHandle = (event) => {
    //纵向滚动
    event.preventDefault();
    const win = window;
    const legendHeight = this.legendBox.clientHeight;
    const fixedHeaderH = findDOMNode(this.compareHeader).clientHeight;
    legendRefs.map(function(myref, index){
      if(index > 0){
        let y1 = getPoint(findDOMNode(legendRefs[index-1])).y;
        let y2 = getPoint(findDOMNode(myref)).y;
        if((y1 - fixedHeaderH)<=win.pageYOffset && (y2 - fixedHeaderH)>win.pageYOffset){
          this.setState({
            legendName: legendRefs[index-1].props.title,
            topFixed: (win.pageYOffset >= legendHeight)
          })
        }
      }
      return;
    }.bind(this));
    // console.log('is fixed:',  win.pageYOffset, win.pageYOffset >= legendHeight, legendRefs);
  }

  onSlideHandle = () => {
    //横向滚动 使用IScroll 5.2.0插件
    var $scroll1 = new IScroll("#specScrollbar", {
        probeType: 3,
        eventPassthrough: !0,
        scrollX: !0,
        scrollY: !1
    }),
    $scroll2 = new IScroll("#infoScrollbar", {
        probeType: 3,
        eventPassthrough: !0,
        scrollX: !0,
        scrollY: !1
    });
    $scroll1.on("scroll", function () {
      $scroll2.scrollTo(this.x, 0)
    });
    $scroll2.on("scroll", function () {
      $scroll1.scrollTo(this.x, 0)
    });
  }

  componentDidMount = () => {
    legendRefs = [];
    this.getData(this.props.match.params.ids);
    this.legendBox = findDOMNode(this.refs.headerRef);
    window.scrollTo(0,0);

    this.timmer = setTimeout(() => {
      //纵向滚动
      window.addEventListener('scroll', this.onScrollHandle);
    },0);

  }
  componentWillUnmount = () => {
    clearTimeout(this.timmer);
    legendRefs = [];
    this.source.cancel('组件卸载，取消请求');
    window.removeEventListener('scroll', this.onScrollHandle);
  }

  getData = (_id) => {
    //获取数据
    var _this = this;
    var carsUrl = 'datalist/car_compare.json?id='+ _id;
    axios.get(carsUrl,{ cancelToken: _this.source.token }).then(function(response){
      if(response.status === 200){
          if(response.data){
              var rd = response.data;
              _this.setState({
                rdata: {
                  totalitems: rd.paramitems.concat(rd.configitems),
                  specinfo: rd.specinfo,
                  columns: rd.columns
                },
                isFirstRender: false
              });
              //横向滚动
              _this.onSlideHandle();
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
    //内容滚动时车型及顶栏固定
    const topFixed = this.state.topFixed;

    //车型对比id
    // const cids = this.props.match.params.ids;
    // console.log('车型id',cids, legendRefs);

    const leftCells = [], rightCells = [];
    if(this.state.rdata){
      const mytotalitems = this.state.rdata.totalitems;
      const columnsNum = this.state.rdata.columns;
      if(mytotalitems && mytotalitems.length>0){
        mytotalitems.map(function(itm,idx){
          //配置详情 左内容
          leftCells.push(<LeftItems key={idx+"l"} opts={itm} l-group-index={idx}></LeftItems>);
          //配置详情 右内容
          rightCells.push(<RightItems key={idx+"r"} opts={itm} r-group-index={idx} columnsNum={columnsNum}></RightItems>);
          return itm;
        });
      }
    }
    return (<div className="Page" style={{padding:0}}>
      {/*车型对比头部 */}
      <Header ref="headerRef" className="Page-header" title="车型对比" leftback={true} leftClick={this.goBack}></Header>
      {!this.state.isFirstRender?<div className="Compare-section">
        {/*对比头部 显示legend 和对比的几个车型 */}
        <div className="Compare-header" ref={this.setCompareHeader} style={{height: "10rem"}}>
          {/*对比头部内容 页面纵向滚动时固定到顶部不动 */}
          {this.state.rdata?<div className={topFixed? "basic-top fixedit":"basic-top"}>
            <div className="Compare-basic">
              <div className="left">
                <div className="cell">{this.state.rdata?this.state.rdata.totalitems[0].items[0].name:null}</div>
              </div>
              <div className="main" id="specScrollbar" style={{touchAction: "pan-y pinch-zoom"}}>
                {/*车型可横向滚动 */}
                <div className="slide" style={{transform: "translate(0px, 0px) translateZ(0px)"}}>
                  {this.state.rdata?this.state.rdata.totalitems[0].items[0].modelexcessids.map((myspec,myindex) => {
                    return <div key={myindex} className="cell">
                            <div className="carname">{myspec.value}</div>
                            <i className="remove-car" onClick={()=>{}}></i>
                          </div>
                  }):null}
                  <div key={this.state.rdata.totalitems[0].items[0].modelexcessids.length-(-1)} className="cell">
                    <div className="addCompareCar">
                      <i></i>
                      <p className="addcar">添加车型</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="basemark">
              <label>{this.state.legendName}</label>
              <p>
                <span className="standard">标配</span>
                <span className="match">选配</span>
                <span className="nothing">无</span>
              </p>
            </div>
          </div>:null}
        </div>
        {/*对比 配置详情*/}
        <div className="Compare-content">
          <div className="left">
            {leftCells}
          </div>
          <div className="main" id="infoScrollbar" style={{touchAction: "pan-y pinch-zoom"}}>
            <div className="slide" style={{transform: "translate(0px, 0px) translateZ(0px)"}}>
              {rightCells}
            </div>
          </div>
        </div>
      </div>:null}
    </div>)
  }
}

export default Compare