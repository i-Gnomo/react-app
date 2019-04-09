import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from "prop-types";
import axios from "axios";

import { List, Button } from 'antd-mobile';
import FormInput from "../Content/FormInput";

const Item = List.Item;
const Brief = Item.Brief;

class ListBar extends Component{
    render(){
        return (
        <div className="ListTitle">
            <div className="ListTitleTag"></div>
            <div className="ListTitleBar">{this.props.children}</div>
        </div>)
    }
}

class Question extends Component {
    constructor(props){
        super(props);
        this.state = {
            listdata: [{
                id: 100,
                qu: '下完单多久能提车？',
                datetime: '2019-1-25 11:06',
                data:[{
                    id: 1001,
                    res: '提车周期一般在15-25个工作日。',
                    datetime: '2019-1-25 11:09'
                },{
                    id: 1002,
                    res: '客服：一般都能在APP显示的时间内交车的，请您再 耐心等待下哦。',
                    datetime: '2019-1-25 11:18'
                }]
            },{
                id: 101,
                qu: '申请金融方案需要什么资质？',
                datetime: '2019-1-25 12:21',
            },{
                id: 102,
                qu: '金融方案通过审核以后，需要做什么？',
                datetime: '2019-1-25 15:36',
            }],
            question: ""
        }
        this.source = axios.CancelToken.source(); 
    }

    //定义属性类型
    static propTypes = {
        options: PropTypes.object
    }

    //getDefaultProps 的es6用法
    static defaultProps = {
        options: {}
    };

    componentDidMount = () => {
        var _this = this;
        //获取数据
        axios.get(_this.props.dataurl,{ cancelToken: _this.source.token }).then(function(response){
            if(response.status === 200){
                if(response.data.result){
                    // _this.setState({
                    //     listdata: response.data.result
                    // });
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
    componentWillUnmount = () => {
        this.source.cancel('组件卸载，取消请求');
    }

    setQusRes = (rdata) => {
        var rstrs = [];
        rdata.map(function(_itm){
            return rstrs.push(<div key={_itm.id} className="qu-res">
                客服：{_itm.res}
                <p>{_itm.datetime}</p>
            </div>);
        })
        return rstrs;
    }

    submitQues = (e) => {
        e.preventDefault();
        var _question = this.refs.myquestion;
        if(_question.state.hasError){
            return;
        }
        alert(_question.state.value);
    }

    render() {
        return (
            <List renderHeader={
                    this.props.showTitle === true?
                    () => (
                    <ListBar>{this.props.options.title}{this.props.options.tolink?
                    <Link style={{fontSize:"14px",color:"#a6a6a6"}} to={this.props.options.tolink}>更多&gt;</Link>:<i></i>}</ListBar>)
                    :false
                } className="quest-list">
                <div className="push-Ques">
                    <FormInput 
                        style={{width:"calc(100% - 20vmin)",marginRight:"0"}}
                        className="input-text"
                        ftype="text"
                        placeholder="我要提问..."
                        errormsg="请输入你的提问内容哦"
                        value={this.state.question} ref="myquestion"></FormInput>
                    <Button className="sub-ques" onClick={this.submitQues}>提交</Button>
                </div>

                {this.state.listdata.map(function(item){
                    return <Item
                        key = {item.id}
                        thumb= {<div className="Qu">问</div>}
                        multipleLine>
                        <div style={styler.qutit}>匿名：{item.qu}</div>
                        <Brief style={styler.alignRight}>{item.datetime}</Brief>
                        {(item.data && item.data.length>0)? (<div className="quest-cont">{this.setQusRes(item.data)}</div>):null}

                        {/* {(item.data && item.data.length>0)? '<div className="quest-cont">'+ item.data.map(function(_itm){
                            return (<div key={_itm.id} className="qu-res">
                                客服：{_itm.res}
                                <p>{_itm.datetime}</p>
                            </div>)
                        })+'</div>':null} */}

                    </Item>;
                }.bind(this))}
            </List>
        );
    }
}

export default withRouter(Question);

const styler = {
    alignRight: {
        textAlign: "right"
    },
    qutit: {
        fontSize: '16px',
        whiteSpace: 'normal'
    },
    redPrice:{
        fontSize:"22px",
        fontStyle:"normal",
        verticalAlign:"bottom",
        lineHeight: "1.2",
        margin: "0 2px"
    },
    twoRowsFont: {
        whiteSpace:"pre-wrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    }
}