import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";

import Header from './../components/Header/Header';
import MyTabBar from './../components/MyTabBar/MyTabBar';

class NewsDetail extends Component {
  constructor(props){
      super(props);
      this.state = {
        "left": {
          "id": null,
          "title": ""
        },
        "right": {
          "id": null,
          "title": ""
        },
        "infodata": {
          "id": "",
          "title": "",
          "datetime": "",
          "info": ""  
        }
      }
      //获取资讯内容的路由
      
      this.source = axios.CancelToken.source(); 
  }

  componentDidMount = () => {
    this.getData(this.props.match.params.id);
  }
  componentWillUnmount = () => {
      // this.source.cancel('组件卸载，取消请求');
  }

  getData = (_id) => {
    var _this = this;
    var newsUrl = 'datalist/newslist2.json?id='+ _id;

    axios.get(newsUrl,{ cancelToken: _this.source.token }).then(function(response){
        if(response.status === 200){
            if(response.data.result){
                _this.setState({
                    "left": {
                      "id": _id>110? (_id - 1): "",
                      "title": _id>110? "新帕萨特领衔 北美车展10款新车前瞻":""
                    },
                    "right": {
                      "id": _id>118? "": (_id - (-1)),
                      "title": _id>118? "":"新帕萨特领衔 北美车展10款新车前瞻"
                    },
                    "infodata": {
                      "id": _id,
                      "title": "新帕萨特领衔 北美车展10款新车前瞻",
                      "datetime": "2019-01-10 13:25",
                      "info": _id+"国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，<img src=\"images/huodong.jpg\" alt=\"img\" />集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2国内领先的汽车互联网企业易车将于今年3月初推出业内首个“SUV购车节”，集结国内外众多一线SUV品牌，共同打造2"  
                    }
                });
                window.scrollTo(0, 0);
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
    const toleft = this.state.left;
    const toright = this.state.right;
    const {title,datetime,info} = this.state.infodata;
    return (<div className="Page">
      <Header className="Page-header" title="资讯" leftback={true} leftClick={this.goBack} righthome={true}></Header>
      <div className="NewsInfo">
        <div className="news-header">
          <h4>{title}</h4>
          <p>{datetime}</p>
        </div>
        <div className="news-content" dangerouslySetInnerHTML={{__html: info}}></div>

        {/*上一篇 */}
        <div className="news-pagination">
          {toleft.id === ""? ("上一篇：无"):
            <Link to={'/newsdetail/'+toleft.id} onClick={() => {
              this.getData(toleft.id);
            }}>{"上一篇："+ toleft.title}</Link>
          }
        </div>
        {/*下一篇 */}
        <div className="news-pagination">
          {toright.id === ""? ("下一篇：无"):
            <Link to={'/newsdetail/'+toright.id} onClick={() => {
              this.getData(toright.id);
            }}>{"下一篇："+ toright.title}</Link>
          }
        </div>
      </div>
      <MyTabBar selectedkey='news'></MyTabBar>
    </div>
    )
  }
}

export default NewsDetail