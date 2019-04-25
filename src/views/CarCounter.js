import React, { Component } from 'react';
// import { findDOMNode } from 'react-dom';
// import axios from "../assets/js/axiosConfig";
import {WhiteSpace, InputItem} from 'antd-mobile';

import Header from '../components/Header/Header';


const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}

const CounterItemTit = (props) => {
    return (<div className="counter-item-title">
        <span>{props.title}</span>
        <div onClick={props.onHandleClick} onDoubleClick={()=>{
            console.log('onDoubleClick');
        }}>
            <span>{props.value}</span>
            <i className={props.isopen === true?"ic-arrow open":"ic-arrow close"}></i>
        </div>
    </div>)
}

const PopDialog = (props) => {
    console.log(props);
    const {show, listdata, checkedIndex, onHandleClose, onHandleSelect} = props;
    return (<div className="Pop-cover" style={show !== true? {display:"none"}:null}>
        <div className="pop-cover-bg"></div>
        <div className="pop-list">
            <i className="pop-close" onClick={onHandleClose}></i>
            <div className="pop-title">{listdata.title}</div>
            <div className="pop-content">
                <ul>
                    {listdata.list.map((element,index) => {
                        return <li key={index} onClick={() => {
                            console.log(index);
                            onHandleSelect(index);
                        }} className={checkedIndex === index?"pop-list-row checked":"pop-list-row"}>{element}</li>
                    })}
                </ul>
            </div>
        </div>
    </div>)
}

class CarCounter extends Component {
    constructor(props){
        super(props);
        this.state = {
            specid: this.props.match.params.specid || '',
            counterType: 1, /**{1:贷款, 2:全款} */
            ctRatio: 30, /**首付额度 */
            ctYear: 2, /**还款年数 */
            necessVal: { /**必要花费价格 */
                necess1: 1900,
                necess2: 190,
                necess3: 100,
                necess4: 900,
            },
            necess3: 2, /**必要花费 车船使用税 */
            necess4: 1, /**必要花费 交通事故责任强制保险*/
            insuranceVal: { /**商业保险 [价格,是否被选中-1否 1是]*/
                insurance1: [0, -1],
                insurance2: [0, -1],
                insurance3: [0, -1],
                insurance4: [0, -1],
                insurance5: [1000, 1],
                insurance6: [1000, 1],
                insurance7: [1000, 1],
                insurance8: [1500, 1],
                insurance9: [1800, 1],
                insurance10: [2000, 1],
            },
            insurance1: 2, /**第三者责任险 */
            insurance4: 1, /**玻璃单独破碎险 */
            insurance9: 1, /**车身划痕险 */
            isRatioOpen: false, /**是否展开 */
            isYearOpen: false,
            isNecessOpen: false,
            isInsuranceOpen: false,
            showPopDialog: false, /**展开弹出层 */
            popListName: 'necess3',
            popListParent: 'necess'
        }
    }

    baseData = {
        ratio:[0,20,30,40,50,60],
        year:[1,2,3,4,5,6],
        necess:[{
            'name': 'necess1',
            'title':'购置税',
        },{
            'name': 'necess2',
            'title':'上牌费用',
        },{
            'name': 'necess3',
            'title':'车船使用税',
            'list': ['1.0L(含)以下','1.0L-1.6L(含)','1.6L-2.0L(含)','2.0L-2.5L(含)','2.5L-3.0L(含)']
        },{
            'name': 'necess4',
            'title':'交通事故责任强制保险',
            'list': ['家用6座以下','家用6座以上']
        }],
        insurance:[{
            'name': 'insurance1',
            'title':'第三者责任险',
            'list': ['5万','10万','20万','50万','100万']
        },{
            'name': 'insurance2',
            'title':'车辆损失险',
        },{
            'name': 'insurance3',
            'title':'全车盗抢险',
        },{
            'name': 'insurance4',
            'title':'玻璃单独破碎险',
            'list': ['进口','国产']
        },{
            'name': 'insurance5',
            'title':'自燃损失险',
        },{
            'name': 'insurance6',
            'title':'不计免赔特约险',
        },{
            'name': 'insurance7',
            'title':'无过责任险',
        },{
            'name': 'insurance8',
            'title':'车上人员责任险',
        },{
            'name': 'insurance9',
            'title':'车身划痕险',
            'list': ['2千','5千','1万','2万']
        },{
            'name': 'insurance10',
            'title':'涉水险',
        }]
    }

    componentDidMount = () => {
        window.scrollTo(0,0);
    }

    goBack = () => {
        this.props.history.goBack();
    }

    toggleChecked = (_name) => {
        const _insur = this.state.insuranceVal;
        const _checked = 0 - _insur[_name][1];
        if(_checked === 1){
            //被选中 [insurance1,insurance4,insurance9时根据value重新计算价格]
            _insur[_name] = [2220, 1];
        }else{
            // -1 没被选中
            _insur[_name] = [0, -1];
        }
        this.setState({
            insuranceVal: _insur
        })
    }

    render(){
        console.log(this.baseData, this.props.match.params.specid);
        return (<div className="Page" style={{position:"absolute",width:"100%",minHeight:"100%",backgroundColor:"#eeeeee",padding:0}}>
            <Header ref="headerRef" className="Page-header" title="购车方案" leftback={true} leftClick={this.goBack}></Header>
            <div className="Counter-section">
                <div style={styleus.counterbg}><div className="Counter-bg"></div></div>
                <div className="Counter-tag">
                    <div className={this.state.counterType === 1?"tag-d active":"tag-d"} onClick={() => {
                        this.setState({
                            counterType: 1
                        })
                    }}>贷款</div>
                    <div className={this.state.counterType === 2?"tag-d active":"tag-d"} onClick={() => {
                        this.setState({
                            counterType: 2
                        })
                    }}>全款</div>
                </div>
                <div className="Counter-content">
                    <div className="price-box">
                        <div className="price-all">
                            184,400
                            <p className="ft-light">预计花费总额(元)</p>
                        </div>
                        <ul className="price-part-3">
                            <li>67,040<p className="ft-light">首付(元)</p></li>
                            <li>3200<p className="ft-light">月供(元)</p></li>
                            <li>30<p className="ft-light">期数(元)</p></li>
                        </ul>
                    </div>
                    <div className="counter-list">
                        <div className="counter-item" ref="ratio">
                            {/**首付额度 */}
                            <CounterItemTit title={"首付额度"} value={this.state.ctRatio + "%"} isopen={this.state.isRatioOpen} onHandleClick={() => {
                                this.setState({
                                    isRatioOpen: !this.state.isRatioOpen
                                })
                            }}></CounterItemTit>
                            <div className="counter-panel" open={this.state.isRatioOpen === true? true:false}>
                                {this.baseData.ratio.map((ele, idx) =>{
                                    return <div key={idx} className={ele === this.state.ctRatio?"ct-cell checked":"ct-cell"} onClick={() => {
                                        this.setState({
                                            ctRatio: ele
                                        })
                                    }}>{ele + '%'}</div>
                                })}
                            </div>
                        </div>
                        <div className="counter-item" ref="year">
                            {/**还款期限 */}
                            <CounterItemTit title={"还款期限"} value={this.state.ctYear * 12 + "期"} isopen={this.state.isYearOpen} onHandleClick={() => {
                                this.setState({
                                    isYearOpen: !this.state.isYearOpen
                                })
                            }}></CounterItemTit>
                            <div className="counter-panel" open={this.state.isYearOpen === true? true:false}>
                                {this.baseData.year.map((ele, idx) =>{
                                    return <div key={idx} className={ele === this.state.ctYear?"ct-cell checked":"ct-cell"} onClick={() => {
                                        this.setState({
                                            ctYear: ele
                                        })
                                    }}>{ele * 12 + '期'}</div>
                                })}
                            </div>
                        </div>
                        <div className="counter-item" ref="necess">
                            {/**必要花费 */}
                            <CounterItemTit title={"必要花费"} value={"1510元"} isopen={this.state.isNecessOpen} onHandleClick={() => {
                                this.setState({
                                    isNecessOpen: !this.state.isNecessOpen
                                })
                            }}></CounterItemTit>
                            <div className="counter-panel" open={this.state.isNecessOpen === true? true:false}>
                                {this.baseData.necess.map((ele, idx) => {
                                    return <div className="counter-row" key={idx}>
                                        <span className="r-left-tit">
                                            {ele.title}
                                            {ele.name === 'necess3'? (<i>{ele.list[this.state.necess3]}</i>):null}
                                            {ele.name === 'necess4'? (<i>{ele.list[this.state.necess4]}</i>):null}
                                        </span>
                                        <div className='r-right-price' onClick={() => {
                                            if(ele.list && ele.list.length>0){
                                                this.setState({
                                                    showPopDialog: true, /**展开弹出层 */
                                                    popListName: ele.name,
                                                    popListParent: 'necess'
                                                });
                                            }
                                        }}>
                                            <span>{this.state.necessVal[ele.name]+"元"}</span>
                                            {ele.list && ele.list.length>0?<i className="ic-arrow-select"></i>:null}
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div className="counter-item" ref="insurance">
                            {/**商业保险 */}
                            <CounterItemTit title={"商业保险"} value={"5491元"} isopen={this.state.isInsuranceOpen} onHandleClick={() => {
                                this.setState({
                                    isInsuranceOpen: !this.state.isInsuranceOpen
                                })
                            }}></CounterItemTit>
                            <div className="counter-panel" open={this.state.isInsuranceOpen === true? true:false}>
                                {this.baseData.insurance.map((ele, idx) => {
                                    return <div className="counter-row" key={idx}>
                                        <span className="r-left-tit" onClick={() => this.toggleChecked(ele.name)}>
                                            {this.state.insuranceVal[ele.name][1] === 1? <i className="r-cell-check checked"></i>:<i className="r-cell-check"></i>}
                                            {ele.title}
                                            {ele.name === 'insurance1'? (<i>{ele.list[this.state.insurance1]}</i>):null}
                                            {ele.name === 'insurance4'? (<i>{ele.list[this.state.insurance4]}</i>):null}
                                            {ele.name === 'insurance9'? (<i>{ele.list[this.state.insurance9]}</i>):null}
                                        </span>
                                        <div className='r-right-price' onClick={() => {
                                            if(ele.list && ele.list.length>0){
                                                this.setState({
                                                    showPopDialog: true, /**展开弹出层 */
                                                    popListName: ele.name,
                                                    popListParent: 'insurance'
                                                });
                                            }
                                        }}>
                                            <span>{this.state.insuranceVal[ele.name][0]+"元"}</span>
                                            {ele.list && ele.list.length>0?<i className="ic-arrow-select"></i>:null}
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <WhiteSpace size="lg" style={{backgroundColor:"#eeeeee"}}/>
            <div style={{padding:"0 15px",backgroundColor:"#ffffff"}}>
                <div className="selected-spec">
                    <p>JEEP自由侠啊啊啊啊啊</p>
                    <i className="ic-arrow-spec"></i>
                </div>
                <div className="selected-price">
                    <span>裸车价</span>
                    <div className="input-wraper" onClick={() => this.inputRef.focus()}>
                        <InputItem
                            type="number"
                            placeholder="请输入裸车价格"
                            clear
                            ref={el => this.inputRef = el}
                            onChange={(v) => { console.log('onChange', v); }}
                            onBlur={(v) => { console.log('onBlur', v); }}
                            moneyKeyboardWrapProps={moneyKeyboardWrapProps}
                        ></InputItem>
                    </div>
                    元</div>
            </div>
            <p style={{color:"#a0a0a0",textAlign:"center"}}>此结果仅供参考，实际费用以当地缴费为准</p>
            {/**下拉列表选择 */}
            {this.baseData[this.state.popListParent].map((element,index)=>{
                return element.name === this.state.popListName?
                <PopDialog key={index} show={this.state.showPopDialog} listdata={this.baseData[this.state.popListParent][index]} checkedIndex={this.state[this.state.popListName]} onHandleClose={()=>{
                    /** dialog关闭 */
                    this.setState({
                        showPopDialog: !this.state.showPopDialog
                    });
                }} onHandleSelect={select_v =>{
                    /**select选择 */
                    const mystates = {};
                    mystates[this.state.popListName] = select_v;
                    mystates.showPopDialog = false;
                    this.setState(mystates);
                }}></PopDialog>:null;
            })}
        </div>)
    }
}
export default CarCounter

const styleus = {
    counterbg: {
        position:"absolute", 
        width: "100%", 
        height: "180px", 
        overflow: "hidden"
    }
} 