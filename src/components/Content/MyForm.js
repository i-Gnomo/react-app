import React, { Component } from 'react';
import axios from "axios";
import {Button, WhiteSpace} from 'antd-mobile';
import FormInput from "./FormInput";




class MyForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            submiting: false,
            username:"",
            userphone:""
        }
    }

    submitFormData = (url, parms) => {
        console.log(url, parms);
        axios.post(url, parms).then(function(response){
            if(response.status === 200){
                if(response.data.result){
                    console.log(response.data.result);
                    //获取到
                }
            }
            this.setState({
                submiting: false
            });
        }).catch(function(error){
            console.log(error);
            this.setState({
                submiting: false
            });
        });
    }

    handleClick = (e) => {
        e.preventDefault();
        
        var _name = this.refs.username;
        var _phone = this.refs.userphone;
        console.log(this.refs.username.state.hasError, this.refs.userphone.state.hasError);
        if(_name.state.hasError || _phone.state.hasError){
            return;
        }

        if(this.state.submiting === true){
            return;
        }
        this.setState({
            submiting: true
        });

        console.log(_name.state.value, _phone.state.value);

        //没有提交路径暂时注释掉
        // var uurl = '';//提交路径
        // this.submitFormData(uurl,{"name":_name.state.value,"phone":_phone.state.value});
    }

    render(){
        return (
            <div style={{padding:"15px",backgroundColor:"#ffffff"}}>
                <div className="index-form">
                    <FormInput 
                        style={{width:"38vmin",marginRight:"15px"}}
                        className="input-text"
                        ftype="text"
                        placeholder="请输入姓名"
                        errormsg="姓名不能为空"
                        value={this.state.username} ref="username"></FormInput>
                    <FormInput 
                        ftype="phone"
                        placeholder="手机号码"
                        errormsg="请输入正确的手机号码"
                        value={this.state.userphone} ref="userphone"></FormInput>
                </div>
                <WhiteSpace size="lg"/>
                <Button style={{backgroundColor:"#c20c0c",color:"#ffffff"}} onClick={this.handleClick.bind(this)}>提交意向</Button>
            </div>
        )
    }
}

export default MyForm