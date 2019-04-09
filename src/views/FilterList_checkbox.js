import React,  {Component } from 'react';
// import { findDOMNode } from 'react-dom';
import { withRouter } from 'react-router-dom';
import axios from "axios";
import Header from './../components/Header/Header';

import { List, Checkbox, Flex } from 'antd-mobile';

const CheckboxItem = Checkbox.CheckboxItem;


// function inArray(search,array){
//     for(var i in array){
//         if(array[i] === search){
//             return true;
//         }
//     }
//     return false;
// }

class FilterList extends Component{

    constructor(props){
        super(props);
        this.state = {
            initialFilter: {},
            checkedVal: {}
        }
        this.filterUrl = '/datalist/filterItems.json';
        this.source = axios.CancelToken.source();
    }

    componentDidMount = () => {
        var _this = this;
        axios.get(this.filterUrl,{ cancelToken: _this.source.token }).then(function(response){
            if(response.status === 200){
                if(response.data.state === 'y'){
                    _this.setState({
                        initialFilter: response.data.rows
                    });
                }
            }
        }).catch(function(error){
            if (axios.isCancel(error)){
                console.log('Request canceled', error.message)
            }else{
                console.log(error);
            }
        });
    }

    goBack = () => {
        this.props.history.goBack();
    } 

    componentWillUnmount = () => {
        this.source.cancel('组件卸载，取消请求');
    }

    onChange = (name,val) => {
        //筛选分类每个类别下只能选择一个
        var v = this.state.checkedVal;
        if(!v[name]){
            // v[name] = [];
            // v[name].push(val);
            v[name] = val;
        }else{
            // if(inArray(val, v[name])){
            //     v[name] = v[name].filter(function(x){
            //         return x !== val;
            //     });
            // }else{
            //     v[name].push(val);
            // }
            if(v[name] === val){
                delete v[name];
            }else{
                v[name] = val;
            }
        }
        this.setState({
            checkedVal: v
        });
    }

    inCkedData = (name,val) => {
        var v = this.state.checkedVal;
        if(!v[name]){
            return false;
        }else{
            // if(inArray(val, v[name])){
            if(v[name] === val){
                return true;
            }else{
                return false;
            }
        }
    }

    render(){
        const intdata = this.state.initialFilter;
        const filterEles = [];

        Object.keys(intdata).forEach(element => {
            const item = intdata[element];
            filterEles.push(<List key={element} renderHeader={() => item.title}>
                <Flex>
                    {item.data.map(i => {
                        return (<Flex.Item key={i.value}>
                            <CheckboxItem
                            className={this.inCkedData(item.name,i.value)?'ck_checked':''}
                            onChange={(e) => {
                                this.onChange(item.name,i.value);
                            }}>
                            {i.title}
                            </CheckboxItem>
                        </Flex.Item>)
                    })}
                </Flex>
            </List>)
        });

        return (<div className="Page" style={{paddingBottom: 0}}>
            <Header className="Page-fiexedheader" title="更多筛选" leftback={true} leftClick={this.goBack}></Header>
            <div className="FilterList" style={{paddingTop:"14vmin"}}>
            {filterEles}                  
            </div>
        </div>)
    }
}

export default withRouter(FilterList)


/**
 * 
 * ,{
        "id": 5,
        "name": "qita",
        "title": "其他",
        "data": [{
            "title": "不限",
            "value": "0"
        },{
            "title": "2座",
            "value": "1"
        },{
            "title": "4座",
            "value": "2"
        },{
            "title": "5座",
            "value": "3"
        },{
            "title": "6座",
            "value": "4"
        },{
            "title": "7座",
            "value": "5"
        }]
    }
 */