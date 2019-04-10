import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Flex } from 'antd-mobile';

const data = [
  {
    value: '0',
    label: '默认排序',
  }, {
    value: '1',
    label: '车价由高到低',
  }, {
    value: '2',
    label: '车价由低到高',
  }, {
    value: '3',
    label: '新车上架'
  },
];

class Menusort extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      initData: data,
      show: false,
    };
    this.timmer = null;
  }

  //选择默认排序列表
  onChange = (value) => {
    let label = '';
    data.forEach((dataItem) => {
      if (dataItem.value === value[0]) {
        label = dataItem.label;
        value = dataItem.value;
      }
    });
    console.log(label,value);
  }

  //点击显示默认列表
  handleClick = (e) => {
    e.preventDefault(); // Fix event propagation on Android
    this.setState({
      show: !this.state.show,
    });
    // mock for async data loading
    if (!this.state.initData) {
      this.timmer = setTimeout(() => {
        this.setState({
          initData: data,
        });
      }, 500);
    }
  }

  //关闭默认排序
  onMaskClick = () => {
    this.setState({
      show: false,
    });
  }

  componentWillUnmount = () => {
    clearTimeout(this.timmer);
  }

  // 默认排序 车价由高到低 车价由低到高 新车上架
  render() {
    const { initData, show } = this.state;
    return (
      <div className="SortMenu" style={this.props.fixed? {position:"fixed",top:"0",left:"0",width:"100%",zIndex:"1"}:{position:"relative"}}>
        <Flex style={styles.Menusort}>
          <Flex.Item className="LeftFlexmenu" style={show?{color:"#e60012"}:{color:"#1b1b1b"}} onClick={this.handleClick}>默认排序<Icon style={styles.marginv} type={show?"up":"down"} size="sm" color={show?"#c20c0c":"#707070"} /></Flex.Item>
          <Flex.Item><Link to='/brand/' style={{color:"#1b1b1b"}}>不限品牌<Icon style={styles.marginv} type="down" size="sm" color="#707070" /></Link></Flex.Item>
          <Flex.Item className="RightFlexmenu"><Link to='/filter/' style={{color:"#1b1b1b"}}>更多筛选<Icon style={styles.marginv} type="down" size="sm" color="#707070" /></Link></Flex.Item>
        </Flex>
        <div className="SortList">
          {show && initData ? <Menu
            className="single-foo-menu"
            data={initData}
            value={['0']}
            level={1}
            onChange={this.onChange}
            height={document.documentElement.clientWidth * 12/100 * data.length}
          ></Menu> : null }
        </div>
        {show ? <div className="menu-mask" onClick={this.onMaskClick} ></div> : null}
      </div>
    );
  }
}

// define your styles
const styles = {
  Menusort: {
    position: "relative",
    zIndex: 10,
    height: "12vmin",
    backgroundColor: "#ffffff",
    borderWidth: "0 0 1px 0",
    borderStyle: "solid",
    borderColor: "#eeeeee",
    textAlign: "center"
  },
  marginv: {
    marginTop: "-4px",
    marginLeft: "4px",
    verticalAlign: "middle"
  }
}

export default Menusort