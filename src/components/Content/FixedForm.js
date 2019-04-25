import React, { Component } from 'react';

import {Button,Toast, WhiteSpace} from 'antd-mobile';
import FormInput from "./FormInput";

import SmsLayer from "../SmsLayer";

class FixedForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            submiting: false,
            userphone:"",
            showsmslayer: false,
            smserror:""
        }
    }

    sendCarClubNew = (e, smscode) => {
        e.preventDefault();
        var _phone = this.refs.userphone;
        if(_phone.state.hasError){
            return;
        }
        if(this.state.submiting === true){
            return;
        }
        //验证码 用户名 电话号码
        console.log(smscode, _phone.state.value);

        this.setState({
            submiting: true
        });

        /**验证码错误 */
        // this.setState({
        //     smserror: "验证码错误啦..."
        // })

        return;
        
        Toast.success('提交成功，客服会尽快和您联系',1);
        this.setState({
            showsmslayer: false,
            submiting: false
        });
    }

    handleClick = (e) => {
        e.preventDefault();
        var _phone = this.refs.userphone;
        if(_phone.state.hasError){
            return;
        }
        if(this.state.showsmslayer === true){
            return;
        }

        
        /** 弹出短信验证码层 */
        this.setState({
            userphone: _phone.state.value,
            showsmslayer: true,
            smserror: ""
        });
    }

    HandleCloseLayer = (e) => {
        e.preventDefault();
        this.setState({
            showsmslayer: false
        })
    }

    render(){
        return (
            <div className="fixed-form" style={{backgroundColor:"#ffffff"}}>
                <div className="wrap-form">
                    <FormInput 
                        ftype="text"
                        placeholder="请输入手机号码"
                        errormsg="请输入正确的手机号码"
                        value={this.state.userphone} ref="userphone"></FormInput>
                    <Button className="button-box" onClick={this.handleClick}>立即获取优惠码</Button>
                </div>
                {this.state.showsmslayer === true?
                    <SmsLayer phone={this.state.userphone} onHandleSubmit={this.sendCarClubNew} onHandleClose={this.HandleCloseLayer} smserror={this.state.smserror}></SmsLayer>:null
                }
            </div>
        )
    }
}

export default FixedForm