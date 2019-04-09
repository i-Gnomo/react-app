import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from "prop-types";
import axios from "axios";
import { List, Icon } from 'antd-mobile';

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

const planData = [{
    id: "100",
    price: "20.99",
    guidePrice: "32.80",
    payPrice: "3.09",
    priceMonth: "3000",
    months: "24",
    title: "JEEP 自由侠 1.4L 涡轮增压 2018款 180T 手动动能版",
    toLink: ""
},{
    id: "101",
    price: "19.10",
    guidePrice: "32.80",
    payPrice: "3.09",
    priceMonth: "3000",
    months: "36",
    title: "JEEP 自由侠 1.4L 涡轮增压 2018款 180T 手动动能版",
    toLink: ""
},{
    id: "102",
    price: "19.10",
    guidePrice: "32.80",
    payPrice: "3.09",
    priceMonth: "3000",
    months: "36",
    title: "JEEP 自由侠 1.4L 涡轮增压 2018款 180T 手动动能版",
    toLink: ""
}];

class BuyPlan extends Component {
    constructor(props){
        super(props);
        this.state = {
            listdata: planData
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
                    // console.log(response.data.result);
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

    render() {
        return (
            <List renderHeader={
                    this.props.showTitle === true?
                    () => (
                    <ListBar>{this.props.options.title}{this.props.options.tolink?
                    <Link style={{fontSize:"14px",color:"#a6a6a6"}} to={this.props.options.tolink}>更多&gt;</Link>:<i></i>}</ListBar>)
                    :false
                } className="buyplan-list">
                {this.state.listdata.map(function(item){
                    return <Item style={{borderBottomWidth:"2px"}} key={item.id} multipleLine>
                        <div style={{margin: "0 15px"}}>
                            <div className="justifyDiv" style={{whiteSpace:"normal"}}>{item.title}</div>
                            <Brief style={styler.garyFont}>
                                优惠价:<em>{item.price}</em>万&nbsp;&nbsp;
                                <span style={styler.underlineFont}>指导价:{item.guidePrice}万</span>
                            </Brief>
                            <div className="justifyDiv" style={styler.garyFont}>
                                <span>首付:<em>{item.payPrice}</em>万起</span>
                                <span>月供:<em>{item.priceMonth}</em>元起</span>
                                <span>期数:<em>{item.months}</em>期</span>
                            </div>
                            <Item className="arrow-link" onClick={() => {
                                this.props.history.push({pathname:'/newcarinfo/'+item.id});
                            }}>具体购车方案 <Icon type="right"></Icon></Item>
                        </div>
                    </Item>;
                }.bind(this))}
            </List>
        );
    }
}

export default withRouter(BuyPlan);

const styler = {
    alignRight: {
        textAlign: "right"
    },
    underlineFont: {
        marginLeft: "15px",
        color: "#a0a0a0",
        textDecoration: "line-through"
    },
    garyFont: {
        color: "#707070",
        fontSize: '14px'
    },
    twoRowsFont: {
        whiteSpace:"pre-wrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    }
}