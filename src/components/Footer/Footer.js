import React, { Component } from 'react';

class Footer extends Component{
    render() {
        return (
            <div className="footer">
                <img alt="" style={{width:"22vmin"}} src="/images/footer-logo.png" />
                <div className="telinfo">
                    <p>淄博万盛 - 江淮汽车4S店</p>
                    <span>销售热线：0571-87030075</span>
                </div>
                <p>©2016 杭州车云网络科技有限公司 版权所有</p>
                <p>浙ICP备13014457号-2号    技术支持：车巡</p>
            </div>
        );
    }
}
export default Footer;