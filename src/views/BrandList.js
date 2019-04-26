import React,  {Component } from 'react';
import { findDOMNode } from 'react-dom';
import { withRouter } from 'react-router-dom';
import axios from "axios";
import { List } from 'antd-mobile';
import Header from './../components/Header/Header';

const Item = List.Item;
class BrandList extends Component{
    constructor(props){
        super(props);
        this.state = {
            initialBrand: {},
            selectedBrand: this.props.selectedBrand,
            selectedIndex: this.props.brandIndex,
            showTag: false,
            showTagName: '',
        }
        this.timmer = null;
        this.brandUrl = 'datalist/carbrand.json';
        this.source = axios.CancelToken.source();
    }

    componentDidMount = () => {
        var _this = this;
        axios.get(this.brandUrl,{ cancelToken: _this.source.token }).then(function(response){
            if(response.status === 200){
                // console.log(response.data);
                if(response.data.state === 'y'){
                    var x = []; //索引数组
                    var xdata = {}; //品牌对象
                    x = response.data.rows.map(function(itm,idx){
                        var d = itm.title.substr(0,1);
                        if(x.indexOf(d) === -1){
                            x.push(d);
                            xdata[d] = [];
                        }
                        xdata[d].push({
                            tag: d,
                            id: itm.id, 
                            title: itm.title.substring(4, itm.title.length)
                        });
                        return d;
                    })
                    _this.setState({
                        initialBrand: xdata
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
    }

    handleScroll = (e) => {
        // console.log(window.outerWidth);
        const bwidth = document.body.clientWidth;
        const tname = e.target.innerText;
        const toffset = findDOMNode(this.refs['Brand'+ tname]).offsetTop - (14/100)*bwidth;
        this.setState({
            showTag: true,
            showTagName: tname
        });
        this.timmer = setTimeout(() => {
            this.setState({
                showTag: false,
                showTagName: ''
            });
        }, 1500);

        window.scrollTo(0,toffset);
    }

    goBack = () => {
        this.props.history.goBack();
    } 

    brandClick = () => {
        // console.log(e.target);
    }

    componentWillUnmount = () => {
        this.source.cancel('组件卸载，取消请求');
        clearTimeout(this.timmer);
    }

    render(){
        const _brand = this.state.initialBrand;
        const brandSyns = [];
        const brandEles=[];
        const _len = Object.keys(_brand).length;
        Object.keys(_brand).forEach(element => {
            brandSyns.push(<div 
                key={element} 
                className="EachTag" 
                style={{height:parseFloat(100/_len).toFixed(2)+'%'}}
                onClick={this.handleScroll}
            >{element}</div>);
            brandEles.push(<List key={element} renderHeader={() => element} ref={'Brand'+ element} className={'Brand'+ element}>
                {_brand[element].map(b => {
                        return (<Item key={b.id} tag={b.tag} onClick={() => {
                            this.setState({
                                selectedBrand: b.title,
                                selectedIndex: b.id,
                            });

                            //选择品牌后路由回到列表页面并且state参数传递过去
                            this.props.history.push({pathname:'/newcar/',search:'',state:{
                                selectedBrand:b.title,
                                selectedIndex:b.id,
                            }});
                        }}>{b.title}</Item>);
                    })}
            </List>);
        })
        return (<div className="Page" style={{paddingBottom: 0}}>
            <Header className="Page-fiexedheader" title="选择品牌" leftback={true} leftClick={this.goBack}></Header>
            <div className="BrandList" style={{paddingTop:"14vmin"}}>
                <div className="BrandIndex" style={{paddingTop:"14vmin",height:"calc(100% - 14vmin)"}}>
                    {brandSyns}
                </div>
                <div className="BrandContent">
                    <List key="all" className="Brandall">
                        <Item key="allbrand" tag="all">不限品牌</Item>
                    </List>
                    {brandEles}
                </div>
                {this.state.showTag === true?
                <div className="BrandNowTag">{this.state.showTagName}</div>:''}
            </div>
        </div>)
    }
}

export default withRouter(BrandList)