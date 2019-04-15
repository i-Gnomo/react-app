import React, { Component } from 'react';
import { Icon } from 'antd-mobile';

//多个车型时 车型列表
class SelectCar extends Component {
    render(){
        /**
         * current: {id: 110, name: "JEEP 自由侠 1.4L 涡轮增压 2018款 180T 自动动能版"}
            handleSelect: ƒ (vals)
            handleToggle: ƒ ()
            listdata: (4) [{…}, {…}, {…}, {…}]
            show: false
         */
        const { show, current, listdata } = this.props;
        // console.log(this.props);
        return (<div className="selectlist-car">
            <div className="selected-val" onClick={() => {this.props.handleToggle(!show)}}>
                <p>{current.name}</p>
                <Icon className="select-icon" type={show?"up":"down"}></Icon>
            </div>
            <div className={"selectlist-content" + (show?"":" disn")}>
                <dl>
                    {listdata.map(item => {
                        return <dd key={item.id} className={current.id === item.id?"current":""} onClick={() => {this.props.handleSelect({id:item.id,name:item.name})}}>{item.name}</dd>
                    })}
                </dl>
            </div>
        </div>)
    }
}

export default SelectCar