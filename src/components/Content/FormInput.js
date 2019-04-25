import React, { Component } from 'react';
import { InputItem, Toast } from 'antd-mobile';
class FormInput extends Component {
    constructor(props){
        super(props);
        this.state = {
            hasError: false, //初始化状态 输入正确
            value: this.props.value, //初始数值空
        }
    }
    static defaultProps = {
        mytype: 'text',
        placeholder: '请输入正确的值',
        errormsg: '输入错误',
        value: ''
    }
    onErrorClick = (msg) => {
        if (this.state.hasError) {
            //state.hasError为true时说明输入错误
            //Toast.info('请输入你正确的手机号码');
            Toast.info(msg);
        }
    }
    onChange = (value) => {
        switch(this.props.ftype){
            case 'phone':
                this.setState({
                    hasError: value.replace(/\s/g, '').length < 11?true:false,
                });
            break;
            default:
                this.setState({
                    hasError: value.replace(/\s/g, '')===''?true:false,
                });
            break;
        }
        this.setState({
            value,
        });
    }
    render() {
        const {ftype, placeholder, errormsg} = this.props;
        return (
            <div className="input-text" style={this.props.style || {}} onClick={() => this.inputRef.focus()}>
                <InputItem
                    type={ftype}
                    placeholder={placeholder}
                    error={this.state.hasError}
                    onErrorClick={this.onErrorClick.bind(this,errormsg)}
                    ref={el => this.inputRef = el}
                    onChange={this.onChange.bind(this)}
                    value={this.state.value}
                ></InputItem>
            </div>
        );
    }
}

export default FormInput;