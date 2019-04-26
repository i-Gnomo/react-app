import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from "prop-types";
import axios from "axios";
import { List } from 'antd-mobile';
import StarLevel from "../Content/StarLevel";

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

const saleGuide = [{
    id: "100",
    name: "余思娅",
    telphone: "13123568798",
    starLevel: "4",
    legend: "JEEP新车金牌销售顾问。",
    picture: "images/saler01.jpg",
    erweima: "images/saler01_erweima.jpg"
},{
    id: "101",
    name: "小苗",
    telphone: "13123456789",
    starLevel: "4.6",
    legend: "捷诚，竭诚为您服务。",
    picture: "images/saler01.jpg",
    erweima: "images/saler01_erweima.jpg"
}];

class SalesLead extends Component {
    constructor(props){
        super(props);
        this.state = {
            listdata: saleGuide
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

    render() {
        return (
            <List renderHeader={
                    this.props.showTitle === true?
                    () => (
                    <ListBar>{this.props.options.title}{this.props.options.tolink?
                    <Link style={{fontSize:"14px",color:"#a6a6a6"}} to={this.props.options.tolink}>更多&gt;</Link>:<i></i>}</ListBar>)
                    :false
                } className="saleslead-list">
                {this.state.listdata.map(function(item){
                    return <Item
                        key = {item.id}
                        multipleLine
                        thumb={<div className="saler-pic"><img alt="" src={item.picture} /></div>}
                        extra={<div>
                                <img alt="" src={item.erweima} />
                                <p style={{
                                    fontSize: "13px",
                                    margin: "0",
                                    textAlign: "center",
                                }}>微信向TA咨询</p>
                            </div>}>
                        <div className="justifyDiv">{item.name}</div>
                        <StarLevel value={item.starLevel} />
                        <Brief>{item.legend}</Brief>
                        <Brief>服务专线:{item.telphone}</Brief>
                    </Item>;
                })}
            </List>
        );
    }
}

export default withRouter(SalesLead);

// const styler = {
//     alignRight: {
//         textAlign: "right"
//     },
//     redFont: {
//         color: "#e60012",
//         fontSize: '14px'
//     },
//     redPrice:{
//         fontSize:"22px",
//         fontStyle:"normal",
//         verticalAlign:"bottom",
//         lineHeight: "1.2",
//         margin: "0 2px"
//     },
//     twoRowsFont: {
//         whiteSpace:"pre-wrap",
//         overflow: "hidden",
//         textOverflow: "ellipsis"
//     }
// }