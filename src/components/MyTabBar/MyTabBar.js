import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import {TabBar} from 'antd-mobile';

import Home from '../../views/Home';
import NewCar from '../../views/NewCar';
import News from '../../views/News';
import Actives from '../../views/Actives';

const barsArr = [{
    title:"首页",
    key:"home",
    myhref:'/',
    icon:"/images/icons-home.png",
    selectedIcon:"/images/icons-home-current.png"
},{
    title:"新车",
    key:"newcar",
    myhref:'/newcar/',
    icon:"/images/icons-newcar.png",
    selectedIcon:"/images/icons-newcar-current.png"
},{
    title:"资讯",
    key:"news",
    myhref:'/news/',
    icon:"/images/icons-news.png",
    selectedIcon:"/images/icons-news-current.png"
},{
    title:"活动",
    key:"actives",
    myhref:'/actives/',
    icon:"/images/icons-actives.png",
    selectedIcon:"/images/icons-actives-current.png"
}];
class MyTabBar extends Component{
    constructor(props,context){
        super(props,context)
        this.state = {
            selectedTab: this.props.selectedkey
        }
    }

    // componentDidMount = () => {
    //     window.scrollTo(0,0);
    // }

    navSwitch(_key){
        var box = <div></div>;
        switch(_key){
            case 'home':
            box = <Home/>;
            break;
            case 'newcar':
            box = <NewCar/>;
            break;
            case 'news':
            box = <News/>;
            break;
            case 'actives':
            box = <Actives/>;
            break;
            default:
            box = <Home/>
        }
        return box;
    }

    render(){
        return (
            <div className="TabbarClass">
                <TabBar
                    barTintColor="#ffffff"
                    tintColor="#c20c0c"
                    unselectedTintColor="#a0a0a0"
                    prerenderingSiblingsNumber="0"
                    tabBarPosition="bottom"
                >
                    {barsArr.map((items) => (
                        <TabBar.Item
                            selected={this.state.selectedTab === items.key}
                            title={items.title}
                            key={items.key}
                            onPress={()=>{
                                window.scrollTo(0,0);
                                this.setState({
                                    selectedTab: `${items.key}`
                                });
                                this.props.history.push({pathname:'/'+items.key.toLowerCase()+'/'});
                            }}
                            icon={<div className="icon-tabbar" style={{ backgroundImage: "url("+items.icon+")"}}></div>}
                            selectedIcon={<div className="icon-tabbar" style={{ backgroundImage: "url("+items.selectedIcon+")"}}></div>}
                        >
                            {/* {this.navSwitch(items.key)} */}
                        </TabBar.Item>
                    ))}
                </TabBar>
            </div>
        )
    }
}

export default withRouter(MyTabBar) 