import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, NavBar } from 'antd-mobile';
import './header.css';
import Logo from './Logo';

/**
 * <Button className="header-right-menu">
        <img style={{width:"50%",verticalAlign:"middle"}} src="images/header-more.png" alt="menu more" />
    </Button>
 */
class Header extends Component{
    render() {
        var _tit = this.props.title;
        return (
            <div className={this.props.className}>
                <NavBar
                mode="dark"
                icon={this.props.leftback === true?<Icon type="left" style={{width:'22px',height:'22px',marginLeft:'10px'}} />:null}
                onLeftClick={this.props.leftback === true?(this.props.leftClick): null}
                rightContent={
                    this.props.righthome === true?
                    <Link to="/" className="header-right-menu" style={{backgroundColor:"transparent"}}>
                        <img style={{width:"50%",verticalAlign:"middle"}} src="images/header-home.png" alt="menu home" />
                    </Link>:null
                }
                >{_tit==='Logo'?<Logo>jeep</Logo>:_tit}
                </NavBar>
            </div>
        )
    }
}

export default Header;