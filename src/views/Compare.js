import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Link } from 'react-router-dom';
import axios from "axios";

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
        maxLegendLen: 0,
        topFixed: false,
        isFirstRender: true
      }
      this.timmer = null;
      this.setCompareHeader = element => {
        this.compareHeader = element;
      };
      this.slideBars = null;
      //车型横行真实DOM 横向滚动容器1
      this.setSpecSlide = element => {
        this.specSlide = element;
      };
      //配置数据横行真实DOM 横向滚动容器2
      this.setInfoSlide = element => {
        this.infoSlide = element;
      };

      this.source = axios.CancelToken.source(); 
  }
  legendBox = null;

  onScrollHandle = (event) => {
    const win = window;
    const legendHeight = this.legendBox.clientHeight;
    const fixedHeaderH = findDOMNode(this.compareHeader).clientHeight;

    this.setState({
      topFixed: (win.pageYOffset >= legendHeight)
    });
    legendRefs.map(function(myref, index){
      if(index > 0){
        let y1 = getPoint(findDOMNode(legendRefs[index-1])).y;
        let y2 = getPoint(findDOMNode(myref)).y;
        if((y1 - fixedHeaderH)<=win.pageYOffset && (y2 - fixedHeaderH)>win.pageYOffset){
          this.setState({
            legendName: legendRefs[index-1].props.title
          })
        }
      }
      return;
    }.bind(this));
    // console.log('is fixed:',  win.pageYOffset, win.pageYOffset >= legendHeight, legendRefs);
  }

  onSlideHandle = () => {
    var $scrollTab;
    var $tabs = document.getElementsByClassName("main");
    var $scrollTab1 = document.getElementById("specScrollbar");
    var $scrollTab2 = document.getElementById("infoScrollbar");
    var touchstartX, touchstartY;
    var scrollMax;
    var mX,mY;
    var moveto;
    console.log($tabs);
    Object.keys($tabs).forEach(function(key){
      //手势触发
      $tabs[key].addEventListener('touchstart', function (e) {
        //触摸事件
        var touch = e.targetTouches[0];
        //触摸点位置相对于视口坐标
        touchstartX = touch.pageX;
        touchstartY = touch.pageY;
        $scrollTab = $tabs[key].getElementsByClassName("slide")[0];
        //scrollMax横向 可滚动位移值
        scrollMax = $scrollTab.scrollWidth - $tabs[key].clientWidth;  
      });
      $tabs[key].addEventListener('touchmove', function (e) {
        var touch = e.targetTouches[0];
        mX = touch.pageX;
        mY = touch.pageY;
        //横向滚动
        if (touchstartY - mY <= 10 && touchstartY - mY >= -10) {
          var transform = $scrollTab.style.transform;
          transform = transform.replace("translate(", "");
          var currentX = Number(transform.substring(0, (transform.indexOf(",") - 2)));
          moveto = -(touchstartX - mX);
          moveto = moveto + currentX;
          $scrollTab1.style.transitionDuration="1500ms";
          $scrollTab2.style.transitionDuration="1500ms";
          if ((moveto < 100 && moveto > 0) || (moveto >= (-scrollMax-100) && moveto < 0)) {
            $scrollTab1.style.transform="translate(" + moveto + "px, 0px) translateZ(0px)";
            $scrollTab2.style.transform="translate(" + moveto + "px, 0px) translateZ(0px)";
          }
          var xxx01 = setTimeout(function () {
            $scrollTab1.style.transitionDuration="0ms";
            $scrollTab2.style.transitionDuration="0ms";
            clearTimeout(xxx01);
          }, 600);
        }
      });
      $tabs[key].addEventListener('touchend', function (e) {
        $scrollTab1.style.transitionDuration="600ms";
        $scrollTab2.style.transitionDuration="600ms";
        if (moveto > 0) {
          $scrollTab1.style.transform="translate(0px, 0px) translateZ(0px)";
          $scrollTab2.style.transform="translate(0px, 0px) translateZ(0px)";
        } else if (moveto < (-scrollMax)) {
          $scrollTab1.style.transform="translate(" + (-scrollMax) + "px, 0px) translateZ(0px)";
          $scrollTab2.style.transform="translate(" + (-scrollMax) + "px, 0px) translateZ(0px)";
        }
        var xxx02 = setTimeout(function () {
          $scrollTab1.style.transitionDuration="0ms";
          $scrollTab2.style.transitionDuration="0ms";
          clearTimeout(xxx02);
        }, 600);
      });
    });
  }

  componentDidMount = () => {
    legendRefs = [];
    this.getData(this.props.match.params.ids);
    this.legendBox = findDOMNode(this.refs.headerRef);
    window.scrollTo(0,0);
    
    // this.slideBars = Object.assign(this.specSlide, this.infoSlide);
    // console.log(this.compareHeader, this.specSlide, this.infoSlide);

    this.timmer = setTimeout(() => {
      //纵向滚动
      window.addEventListener('scroll', this.onScrollHandle);
      //横向滚动
      // this.onSlideHandle();
    },0);

  }
  componentWillUnmount = () => {
    clearTimeout(this.timmer);
    legendRefs = [];
    this.source.cancel('组件卸载，取消请求');
    window.removeEventListener('scroll', this.onScrollHandle);
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
                },
                maxLegendLen: rd.paramitems.length - ( - rd.configitems.length),
                isFirstRender: false
              });
              // _this.slideBars = Object.assign({}, _this.specSlide, _this.infoSlide);
              // console.log(document.getElementsByClassName('main'));
              // console.log(findDOMNode(_this.specSlide), _this.specSlide.innerHTML,  _this.specSlide.children);
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
          leftCells.push(<LeftItems key={idx+"l"} opts={itm} l-group-index={idx}></LeftItems>);
          rightCells.push(<RightItems key={idx+"r"} opts={itm} r-group-index={idx} columnsNum={columnsNum}></RightItems>);
          return itm;
        });
      }
    }
    return (<div className="Page" style={{padding:0}}>
      <Header ref="headerRef" className="Page-header" title="车型对比" leftback={true} leftClick={this.goBack}></Header>
      {!this.state.isFirstRender?<div className="Compare-section">
        <div className="Compare-header" ref={this.setCompareHeader} style={{height: "10rem"}}>
          {this.state.rdata?<div className={topFixed? "basic-top fixedit":"basic-top"}>
            <div className="Compare-basic">
              <div className="left">
                <div className="cell">{this.state.rdata?this.state.rdata.totalitems[0].items[0].name:null}</div>
              </div>
              <div className="main" style={{touchAction: "pan-y pinch-zoom"}}>
                <div className="slide" id="specScrollbar" ref={this.setSpecSlide} style={{transform: "translate(0px, 0px) translateZ(0px)"}}>
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
        <div className="Compare-content">
          <div className="left">
            {leftCells}
          </div>
          <div className="main" style={{touchAction: "pan-y pinch-zoom"}}>
            <div className="slide" id="infoScrollbar" ref={this.setInfoSlide} style={{transform: "translate(0px, 0px) translateZ(0px)"}}>
              {rightCells}
            </div>
          </div>
        </div>
      </div>:null}
    </div>)
  }
}

export default Compare