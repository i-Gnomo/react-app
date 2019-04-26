import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import Header from './../components/Header/Header';
import Menusort from './../components/Content/Menusort';
import ListBox from './../components/Content/ListBox';
import MyTabBar from './../components/MyTabBar/MyTabBar';

class NewCar extends Component {
  constructor(props){
    super(props);
    this.state = {
      isFixedsort: false
    }
  }

  headerHeight = 0;

  onScrollHandle = (event) => {
    const w = window;
    this.setState({
      isFixedsort: (w.pageYOffset >= this.headerHeight)
    });
    // console.log('is bottom:', this.isFixedsort, w.pageYOffset);
  }
  
  componentDidMount = () => {
    const clientHeight = findDOMNode(this.refs.headerRef).clientHeight;
    this.headerHeight = clientHeight;
    window.addEventListener('scroll', this.onScrollHandle);
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.onScrollHandle);
  }

  render(){
    return (
      <div className="Page">
        <Header ref="headerRef" className="Page-header" title="新车"></Header>
        <Menusort fixed = {this.state.isFixedsort}></Menusort>
        <ListBox dataurl="datalist/newcarlist2.json" showTitle={false} options={{
            "listtype":"newcar",
            "title":"热销新车",
            "tolink":"/newcar"
        }}></ListBox>
        {/* {this.props.children} */}
        <MyTabBar selectedkey='newcar'></MyTabBar>
      </div>
    )
  }
}

export default NewCar