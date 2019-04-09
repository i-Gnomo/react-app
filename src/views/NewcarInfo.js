import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, WhiteSpace} from 'antd-mobile';
import './../components/Content/Content.css';

import Header from './../components/Header/Header';
import SelectCar from './../components/NewCar/SelectCar';
import MyForm from './../components/Content/MyForm';
import ListBox from './../components/Content/ListBox';
import Introduct from './../components/NewCar/Introduct';
import BuyPlan from '../components/NewCar/BuyPlan';
import SalesLead from '../components/NewCar/SalesLead';
import Question from '../components/NewCar/Question';

class NewcarInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
        slidenowpage: 1,
        data: ['newcarinfo1', 'newcarinfo2', 'newcarinfo1','newcarinfo2'],
        imgHeight: 176,
        newcarSelect: [{
          id: 110,
          name: "JEEP 自由侠 1.4L 涡轮增压 2018款 180T 自动动能版",
        },{
          id: 111,
          name: "JEEP 自由侠 1.6L 涡轮增压 2018款 180T 自动动能版",
        },{
          id: 112,
          name: "JEEP 自由侠 1.8L 涡轮增压 2018款 180T 手动动能版",
        },{
          id: 113,
          name: "JEEP 自由侠 2.0L 涡轮增压 2018款 180T 手动动能版",
        }],
        newcarSelected: {
          id:110,
          name: "JEEP 自由侠 1.4L 涡轮增压 2018款 180T 自动动能版",
        },
        selectShow: false,
    }
  }

  handleToggle = (mode) => {
    //切换下拉
    console.log(mode);
    this.setState({
      selectShow: mode
    });
  }

  handleSelect = (values) => {
    //选择下拉点击选择
    console.log(values);
    this.setState({
      newcarSelected: values,
      selectShow: false,
    })
  }

  goBack = () => {
    this.props.history.goBack();
  }

  render(){
    return (
      <div className="Page">
        <Header className="Page-header" title="车辆详情" leftback={true} leftClick={this.goBack} righthome={true}></Header>
        <div className="SliderBox" style={{position:"relative"}} ref="indexSlider">
          <Carousel
          dots={false}
          autoplay={false}
          infinite={true}
          beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          afterChange={index => {
            this.setState({
              slidenowpage: index-(-1)
            });
            console.log('slide to', index);
          }}
          >
          {this.state.data.map((val) => (
              <a 
              key={val}
              href="/"
              target="_self"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
              >
              <img
                  src={`/images/${val}.jpg`}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top' }}
                  onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                  }}
              />
              </a>
          ))}
          </Carousel>
          <div className="slide-page"><span>{this.state.slidenowpage+"/"+this.state.data.length}</span></div>
        </div>
        <SelectCar 
          listdata={this.state.newcarSelect}
          current={this.state.newcarSelected}
          show={this.state.selectShow}
          handleToggle={mode => this.handleToggle(mode)}
          handleSelect={values => this.handleSelect(values)}>
        </SelectCar>
        <div className="newcar-info">
          <ul>
            <li>
              <label style={{marginTop:"-7px"}}>优惠价：<em className="red-price">18.88</em>万</label>
              <label style={{textDecoration:"line-through",marginLeft:"1.5rem",color:"#a0a0a0"}}>指导价：32.80万</label>
            </li>
            <li className="flexli">
              <label>
                <span style={{backgroundColor:"#ffffff",padding:"0"}}>金融方案：</span>
                <span>首付<em>3.98</em>万</span><span>月供<em>5986</em>元</span><span>期数<em>36</em>期</span>
              </label>
            </li>
            <li className="flexli">
              <span className="actv-tags">送1888装潢礼包</span>
              <Link to="">对比<em>VS</em></Link>
            </li>
          </ul>
        </div>
        <WhiteSpace size="lg" style={styler.spacebg}/>
        <MyForm></MyForm>
        <WhiteSpace size="lg" style={styler.spacebg}/>
        <div className="index-promotion-info">
            <h3 style={{fontSize: "18px"}}>新春福利，下单送红包。</h3>
            <p style={{margin:"3vmin 0 0"}}>前3000名下单网友上传到店照片，获得100元现金红包。</p>
        </div>

        <WhiteSpace size="lg" style={styler.spacebg}/>
        {/*介绍/配置 */}
        <Introduct dataurl="/datalist/newcarlist.json" showTitle={true} options={{"title":"介绍/配置"}}></Introduct>

        <WhiteSpace size="lg" style={styler.spacebg}/>
        {/*购车方案 */}
        <BuyPlan dataurl="/datalist/newcarlist.json" showTitle={true} options={{"title":"购车方案"}}></BuyPlan>

        <WhiteSpace size="lg" style={styler.spacebg}/>
        {/*销售顾问 */}
        <SalesLead dataurl="/datalist/newcarlist.json" showTitle={true} options={{"title":"销售顾问"}}></SalesLead>

        <WhiteSpace size="lg" style={styler.spacebg}/>
        {/*车辆问答 */}
        <Question dataurl="/datalist/newcarlist.json" showTitle={true} options={{"title":"车辆问答"}}></Question>

        <WhiteSpace size="lg" style={styler.spacebg}/>
        {/*为您推荐 */}
        <ListBox dataurl="/datalist/newcarlist.json" showTitle={true} options={{
            "listtype":"newcar",
            "title":"为您推荐"
        }}></ListBox>

        {/*立即获取优惠 */}
        
      </div>
    )
  }

}

export default NewcarInfo

const styler = {
  spacebg:{
    backgroundColor: "#eeeeee"
  }
};