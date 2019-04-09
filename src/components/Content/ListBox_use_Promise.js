import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import { List } from 'antd-mobile';

import ContentLoader from 'react-content-loader';

const MyLoader = () => (
  <ContentLoader 
		height={90}
		width={400}
		speed={2}
		primaryColor="#f3f3f3"
		secondaryColor="#ecebeb"
	>
		<rect x="15" y="15" rx="5" ry="5" width="100" height="74" />
		<rect x="135" y="25" rx="4" ry="4" width="250" height="8" />
		<rect x="215" y="50" rx="3" ry="3" width="170" height="8" />
		<rect x="135" y="75" rx="4" ry="4" width="250" height="8" />
	</ContentLoader>
)

const Item = List.Item;
const Brief = Item.Brief;

const getListJSON = url => {
    return new Promise((resolve, reject) => {
        let client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();
        function handler(){
            if(this.readyState !==4){
                return;
            }
            if(this.status === 200){
                setTimeout(() => resolve(this.response), 1000);
                // resolve(this.response);
            }else{
                reject(new Error(this.statusText));
            }
        }
    });
}

class ListBar extends Component{
    render(){
        return (
        <div className="ListTitle">
            <div className="ListTitleTag"></div>
            <div className="ListTitleBar">{this.props.children}</div>
        </div>)
    }
}

class ListBox extends Component {
    constructor(props){
        super(props);
        this.state = {
            listdata: []
        }
    }

    //定义属性类型
    static propTypes = {
        options: PropTypes.object
    }

    //getDefaultProps 的es6用法
    static defaultProps = {
        options: {}
    };

    componentDidMount(){
        var _this = this;
        //获取新车数据
        getListJSON(_this.props.dataurl).then(function(res){
            if(res && res.result){
                _this.setState({
                    listdata: res.result
                });
            }
        }, function(error){
            console.log(error);
        });
    }

    render() {
        var loaderBox = [];
        for(let i=0;i<5;i++){
        loaderBox.push(<MyLoader key={i} />);
        }
        return (
            <List renderHeader={
                    this.props.showTitle === true?
                    () => (
                    <ListBar>{this.props.options.title}{this.props.options.tolink?
                    <Link style={{fontSize:"14px",color:"#a6a6a6"}} to={this.props.options.tolink}>更多&gt;</Link>:<i></i>}</ListBar>)
                    :false
                } className="my-list">
                {this.state.listdata.length>0?
                    this.state.listdata.map(function(item){
                        if(this.props.options.listtype === "newcar"){
                            return <Item
                                key = {item.id}
                                thumb={<Link to="{item.toLink}"><img alt="" src={item.imgSrc} /></Link>}
                                multipleLine
                                onClick={() => {}}>
                                <div className="justifyDiv">{item.title} <span>共{item.carAmount}款车型</span></div>
                                <Brief style={styler.alignRight}>指导价{item.price}万</Brief>
                                <div className="justifyDiv"><span style={styler.redFont}>首付<em style={styler.redPrice}>{item.payPrice}</em>万起</span> <span>月供{item.priceMonth}元起</span></div>
                            </Item>;
                        }else if(this.props.options.listtype === "news"){
                            return item.imgSrc && item.imgSrc!=="" ?
                            <Item
                                key = {item.id}
                                align="top"
                                thumb={<Link to={item.toLink}><img alt="" src={item.imgSrc} /></Link>}
                                multipleLine>
                                    <Link to={item.toLink}>{item.title}</Link>
                                    {item.descInfo && item.descInfo!==""?
                                    <div className="twoRowFonts"><Brief className="hahahaha" style={styler.twoRowsFont}>{item.descInfo}</Brief></div>:""}
                            </Item>:
                            <Item
                                className="newsRow"
                                key = {item.id}
                                extra={item.imgSrc && item.imgSrc!=="" ?<i></i>:<div>{item.datetime}</div>}
                                align="top"
                                multipleLine>
                                    <Link to={item.toLink}>{item.title}</Link>
                            </Item>;
                        }else if(this.props.options.listtype === "friends"){
                            return <Item className="friendslink" key = {item.id}><Link to={item.toLink}>{item.title}</Link></Item>;
                        }else{
                            return <Item></Item>;
                        }
                    }.bind(this)): loaderBox
                }
            </List>
        );
    }
}

export default ListBox

const styler = {
    alignRight: {
        textAlign: "right"
    },
    redFont: {
        color: "#e60012",
        fontSize: '14px'
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