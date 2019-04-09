import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from "prop-types";
import axios from "axios";
import { List, Icon } from 'antd-mobile';

const Item = List.Item;

class ListBar extends Component{
    render(){
        return (
        <div className="ListTitle">
            <div className="ListTitleTag"></div>
            <div className="ListTitleBar">{this.props.children}</div>
        </div>)
    }
}

class Introduct extends Component {
    constructor(props){
        super(props);
        this.state = {
            listdata: []
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
                    _this.setState({
                        listdata: response.data.result
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
    componentWillUnmount = () => {
        this.source.cancel('组件卸载，取消请求');
    }

    render() {
        return (
            <List renderHeader={
                    this.props.showTitle === true?
                    () => (
                    <ListBar>{this.props.options.title}{this.props.options.tolink?
                    <Link style={{fontSize:"14px",color:"#a6a6a6"}} to={this.props.options.tolink}>更多&gt;</Link>:<i></i>}</ListBar>)
                    :false
                } className="introduct-list">
                <div className="NewsInfo" style={{padding:"6px 15px 15px"}}>
                    <img style={{maxWidth: "100%"}} src="/images/huodong.jpg" alt="介绍"></img>
                    <h4 style={{
                        fontWeight: "normal",
                        fontSize: "16px",
                        margin: "15px 0px 10px",
                    }}>新帕萨特领衔 北美车展10款新车前瞻</h4>
                    <div style={{
                        color: "#707070",
                        lineHeight: "1.5",
                        fontSize:"16px"
                    }}>111国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，
                    <img style={{maxWidth: "100%",margin:"10px 0"}} src="/images/huodong.jpg" alt="介绍" />
                    集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车</div>
                </div>
                <Item className="arrow-link" onClick={() => {}}>查看详情介绍 <Icon type="right"></Icon></Item>
                <Item className="arrow-link" onClick={() => {
                    this.props.history.push({pathname:'/compare/123'});
                }}>查看全部配置 <Icon type="right"></Icon></Item>
            </List>
        );
    }
}

export default withRouter(Introduct);