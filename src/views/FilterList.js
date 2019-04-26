import React,  {Component } from 'react';
// import { findDOMNode } from 'react-dom';
import { withRouter } from 'react-router-dom';
import axios from "axios";
import Header from './../components/Header/Header';

import { List, Radio, Flex, Button } from 'antd-mobile';

const RadioItem = Radio.RadioItem;

class FilterList extends Component{

    constructor(props){
        super(props);
        this.state = {
            initialFilter: {},
            checkedVal: {
                pailiang: "0",
                biansuxiang: "0",
                qudong: "0",
                sitenumber: "0",
            }
        }
        this.defaultCheckedVal = {
            pailiang: "0",
            biansuxiang: "0",
            qudong: "0",
            sitenumber: "0",
        };
        this.filterUrl = 'datalist/filterItems.json';
        this.source = axios.CancelToken.source();
        
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextProps, nextState);
    //     return true;
    // }

    componentDidMount = () => {
        var _this = this;
        axios.get(this.filterUrl,{ cancelToken: _this.source.token }).then(function(response){
            if(response.status === 200){
                if(response.data.state === 'y'){
                    _this.setState({
                        initialFilter: response.data.rows
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

    goBack = () => {
        this.props.history.goBack();
    } 

    componentWillUnmount = () => {
        this.source.cancel('组件卸载，取消请求');
    }
    
    onChange = (name,val) => {
        //筛选分类每个类别下只能选择一个
        var v = this.state.checkedVal;
        v[name] = val;
        this.setState({
            checkedVal: v
        });
    }

    inCkedData = (name,val) => {
        var v = this.state.checkedVal;
        if(!v[name]){
            return false;
        }else{
            if(v[name] === val){
                return true;
            }else{
                return false;
            }
        }
    }

    render(){
        /**浅copy和深copy */
        
        const intdata = this.state.initialFilter;
        const filterEles = [];

        Object.keys(intdata).forEach(element => {
            const item = intdata[element];
            filterEles.push(<List key={element} renderHeader={() => item.title}>
                <Flex>
                    {item.data.map(i => {
                        return (<Flex.Item key={i.value}>
                            <RadioItem
                            className={this.inCkedData(item.name,i.value)?'ck_checked':''}
                            checked={this.inCkedData(item.name,i.value)? true:false}
                            onChange={(e) => {
                                this.onChange(item.name,i.value);
                            }}>
                            {i.title}
                            </RadioItem>
                        </Flex.Item>)
                    })}
                </Flex>
            </List>)
        });

        return (<div className="Page" style={{paddingBottom: 0}}>
            <Header className="Page-fiexedheader" title="更多筛选" leftback={true} leftClick={this.goBack}></Header>
            <div className="FilterList" style={{paddingTop:"14vmin",paddingBottom:"11vmin"}}>
            {filterEles}                  
            </div>
            <Flex style={ffstyle.fixedbm}>
                <Flex.Item style={ffstyle.noflex}>
                    <Button style={{width: "30vmin",backgroundColor: "#d2d2d2"}} onClick={(e)=>{
                        e.preventDefault();
                        this.setState({
                            checkedVal: Object.assign({},this.defaultCheckedVal)
                        });
                    }}>重置</Button>
                </Flex.Item>
                <Flex.Item style={ffstyle.noflex}>
                    <Button type="warning" style={{width: "70vmin",backgroundColor: "#c20c0c"}} onClick={(e)=>{
                        e.preventDefault();
                        console.log(this.state.checkedVal);
                    }}>确定</Button>
                </Flex.Item>
            </Flex>
        </div>)
    }
}

const ffstyle = {
    fixedbm: {
        position: "fixed",
        width: "100%",
        height: "11vmin",
        left: "0",
        bottom: "0",
        zIndex: "10",
        backgroundColor: "#ffffff",
    },
    noflex: {
        flex: "auto",
        marginLeft: "0"
    }
}

export default withRouter(FilterList)