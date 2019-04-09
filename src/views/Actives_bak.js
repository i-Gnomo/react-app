import React, { Component } from 'react';
import { Progress, Button, WingBlank, WhiteSpace} from 'antd-mobile';
import Header from './../components/Header/Header';
import MyTabBar from './../components/MyTabBar/MyTabBar';

class Actives extends Component {
    state = {
      percent: 50
    }
    add = () =>{
      let p = this.state.percent + 10;
      if(this.state.percent >=100){
        p = 0;
      }
      this.setState({
        percent: p
      });
    }
    render(){
      const { percent } = this.state;
      return (
        <div className="Page">
          <Header className="Page-header" title="活动"></Header>
          {/* <Progress percent={30} position="fixed" /> */}
          <div style={{ height: 18 }} />
          {this.state.percent <100?
            <div>
              <div className="show-info">
                <div className="progress"><Progress percent={percent} position="normal" /></div>
                <div aria-hidden="true">{percent}%</div>
              </div>
              <WhiteSpace size="xl" />
              <WingBlank>
                <Button onClick={this.add}>(+-)10</Button>
              </WingBlank>
            </div>:<div></div>
          }
          <MyTabBar selectedkey='actives'></MyTabBar>
        </div>
      )
    }
}

export default Actives
