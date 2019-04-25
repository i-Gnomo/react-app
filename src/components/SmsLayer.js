/**短信验证码的弹出层 */
import React, { Component } from 'react';
import {Button,Toast} from 'antd-mobile';
import FormInput from "./Content/FormInput";
import "./SmsLayer.css";

class SmsLayer extends Component {
    constructor(props){
        super(props);
        this.intervalTimer = null;
        this.state = {
            smscode:"",
            timer: false,
            timecounter: 60
        }
    }
    componentWillUnmount = () => {
        clearInterval(this.intervalTimer);
    }
    
    getSmsCode = (e) => {
        e.preventDefault();
        console.log(this.props.phone);
        //this.props.phone 电话号码 获取验证码
        //获取验证码成功 开始倒计时
        this.setState({
            timer: true,
            timecounter: 60
        });

        this.intervalTimer = setInterval(()=>{
            if(this.state.timecounter > 1){
                this.setState({
                    timecounter: this.state.timecounter - 1
                })
            }else{
                this.setState({
                    timer: false,
                    timecounter: 60,
                });
                clearInterval(this.intervalTimer);
            }
        },1000);
    }
    handleSubmit = (e) => {
        var _smscode = this.refs.smscode;
        console.log(_smscode.state.value);
        //输入的验证码 不为空则提交
        if(_smscode.state.value === '') {
            Toast.info('请输入验证码',1);
            return;
        }
        this.props.onHandleSubmit(e, _smscode.state.value);
    }
    handleClose = (e) => {
        this.setState({
            timer: false
        });
        clearInterval(this.intervalTimer);
        this.props.onHandleClose(e);
    }
    render() {
        return (<div className="Sms-layer">
            <div className="Sms-layer-cover"></div>
            <div className="Sms-layer-content">
                <i className="Sms-layer-close" onClick={this.handleClose}></i>
                <div className="index-form">
                    <FormInput 
                        style={{width:"60vmin",marginRight:"15px"}}
                        className="input-text"
                        ftype="text"
                        placeholder="请输入验证码"
                        errormsg="验证码不能为空"
                        value = {this.state.smscode}
                        ref="smscode"></FormInput>
                    {this.state.timer === true?
                        <Button className="Get-code-btn gray-disabled">{this.state.timecounter}s后重发</Button>:
                        <Button className="Get-code-btn" onClick={this.getSmsCode.bind(this)}>发送验证码</Button>
                    }
                </div>
                {this.props.smserror !== ''?<div className="smscodeerror"><i>!</i> {this.props.smserror}</div>:null}
                <Button style={{backgroundColor:"#c20c0c",color:"#ffffff",marginTop: this.props.smserror !== ''?"0":"15px"}} onClick={this.handleSubmit}>确定</Button>
            </div>
        </div>)
    }
}

export default SmsLayer;