import React, { Component } from 'react';

import {Button, Carousel, WhiteSpace} from 'antd-mobile';
import './Content.css';

import MyForm from './MyForm';
import ListBox from './ListBox';

class Content extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: ['banner1', 'banner2', 'banner3'],
            imgHeight: 176,
        }
        this.timmer = null;
    }
    //getDefaultPops方法 设置默认的props值
    //getInitialState方法 初始化实例的state值
    //每次修改state都会重新渲染组件
    componentWillMount() {
        // console.log('componentWillMount');
    }
    componentDidMount() {
        //从组件获取真实DOM
        // console.log(this.refs.indexSlider, 'componentDidMount');
        // simulate img loading
        // this.timmer = setTimeout(() => {
        //   this.setState({
        //     data: ['banner1', 'banner2', 'banner3'],
        //   });
        // }, 100);
    }

    componentWillReceiveProps(nextProps){
        //nextProps 父组件更改组件的props时 componentWillReceiveProps被调用 更新state触发render
        console.log('componentWillReceiveProps');
    }
    shouldComponentUpdate(){
        //return false 则不更新组件
        return true;
    }
    componentWillUpdate(){

    }
    componentDidUpdate(){

    }

    componentWillUnmount(){
        // clearTimeout(this.timmer);
    }

    render() {
        return (
            <div>
                <div className="SliderBox" ref="indexSlider">
                <Carousel
                autoplay={false}
                infinite
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                afterChange={index => console.log('slide to', index)}
                >
                {this.state.data.map(val => (
                    <a
                    key={val}
                    href="https://www.baidu.com/"
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
                </div>
                <WhiteSpace size="lg" style={{backgroundColor: "#eeeeee"}}/>
                <div className="index-promotion-info">
                    <h3>折抵换购，iPhone XS 仅 RMB 6599 起。</h3>
                    <p>把你手上的 iPhone 升级换购成一个新的，时机正好。</p>
                    <Button className="btn-red-border" inline size="small" style={{color: '#c20c0c', marginRight: '10vmin' }}>活动详情</Button>
                    <Button inline size="small">查看更多</Button>
                </div>
                <WhiteSpace size="lg" style={{backgroundColor:"#eeeeee"}}/>
                <MyForm></MyForm>
                <WhiteSpace size="lg" style={{backgroundColor:"#eeeeee"}}/>
                <ListBox dataurl="/datalist/newcarlist.json" showTitle={true} options={{
                    "listtype":"newcar",
                    "title":"热销新车",
                    "tolink":"/newcar"
                }}></ListBox>
                <WhiteSpace size="lg" style={{backgroundColor:"#eeeeee"}}/>
                <ListBox dataurl="/datalist/newslist.json" showTitle={true} options={{
                    "listtype":"news",
                    "title":"最新资讯",
                    "tolink":"/news"
                }}></ListBox>
                <WhiteSpace size="lg" style={{backgroundColor:"#eeeeee"}}/>
                <ListBox dataurl="/datalist/friendslist.json" showTitle={true} options={{
                    "listtype":"friends",
                    "title":"友情链接"
                }}></ListBox>
            </div>
        );
    }
}
export default Content;