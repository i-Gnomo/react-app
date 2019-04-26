import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from 'react-router-dom';
import { List } from 'antd-mobile';

import ContentLoader from 'react-content-loader';

import Header from './../components/Header/Header';
import MyTabBar from './../components/MyTabBar/MyTabBar';
import NewsDetail from '../views/NewsDetail';

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

class ItemIcon extends Component{
  render(){
      return (<div className="DotLine"><em className="circle-DotLine"></em></div>)
  }
}

class News extends Component {
  constructor(props){
      super(props);
      this.state = {
          listdata: []
      }
      this.newsUrl = 'datalist/newslist2.json';
      this.source = axios.CancelToken.source(); 
  }

  //定义属性类型
  static propTypes = {
      options: PropTypes.object
  }

  componentDidMount = () => {
    var _this = this;
    axios.get(_this.newsUrl,{ cancelToken: _this.source.token }).then(function(response){
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

  render(){
    var loaderBox = [];
    for(let i=0;i<10;i++){
    loaderBox.push(<MyLoader key={i} />);
    }
    return (
      <div className="Page" style={{touchAction:'none'}}>
      <Header className="Page-header" title="资讯"></Header>
      <List className="news-list">
        {this.state.listdata.length>0?
            this.state.listdata.map(function(item){
              return (<Item
                      key = {item.id}
                      align="top"
                      thumb={<Link to={item.toLink} style={styler.dateline}><span style={styler.datefont}>{item.datetime}</span><ItemIcon></ItemIcon></Link>}
                      multipleLine>
                          <Link to={item.toLink}>{item.title}</Link>
                          <Link to={item.toLink}>
                            <div className="twoRowFonts">
                              <Brief className="hahahaha" style={styler.twoRowsFont}>{item.descInfo}</Brief>
                            </div>
                          </Link>
                    </Item>);
            }): loaderBox
        }
      </List>
      <MyTabBar selectedkey='news'></MyTabBar>
      <Route path="/newsdetail/:id" component={NewsDetail}/>
    </div>
    )
  }
}

export default News

const styler = {
  dateline: {
    display: "flex",
    justifyContent: "flex-end",
    width: "14vmin",
    color: "#a0a0a0",
  },
  datefont: {
    marginRight: "4vmin",
    textAlign: "right",
  },
  twoRowsFont: {
      whiteSpace:"pre-wrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
  }
}