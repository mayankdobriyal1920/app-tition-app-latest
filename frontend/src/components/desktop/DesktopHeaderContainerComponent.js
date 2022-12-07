import React from '@ionic/react';
import headerLogoOne from '../../theme/images/header_logo_one.svg';
import userLogoSvg from '../../theme/images/user.svg';
import {useDispatch} from "react-redux";
import {actionToOpenCloseLoginPopup, actionToOpenCloseSignupPopup} from "../../actions/CommonAction";

const DesktopHeaderContainerComponent=({scrollBodyValue}) => {
    const dispatch = useDispatch();
    const callFunctionToOpenSighupPopup = ()=>{
        dispatch(actionToOpenCloseSignupPopup(true));
    }
    const callFunctionToOpenLoginPopup = ()=>{
        dispatch(actionToOpenCloseLoginPopup(true));
    }
    return (
        <header>
            <div id="theme-menu-one" className={"main-header-area pl-100 pr-100 pt-20 pb-15 "+(scrollBodyValue >= 200 ? 'sticky' :'')}>
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-xl-2 col-lg-2 col-5">
                            <div className="logo">
                                <a>
                                  <img src={headerLogoOne} alt=""/>
                                </a>
                            </div>
                        </div>
                        <div className="col-xl-7 col-lg-8 d-none d-lg-block">
                            <nav className="main-menu navbar navbar-expand-lg justify-content-center">
                                <div className="nav-container">
                                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                        <ul className="navbar-nav">
                                            <li className="nav-item dropdown active">
                                                <a role="button" className="nav-link">
                                                    Home
                                                </a>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a role="button" className="nav-link">
                                                    About Us
                                                </a>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a role="button" className="nav-link">
                                                    Pricing
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a role="button" className="nav-link">
                                                    Contact Us
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>
                        </div>
                        <div className="col-xl-3 col-lg-2 col-7">
                            <div className="right-nav d-flex align-items-center justify-content-end">
                                <div className="right-btn mr-25 mr-xs-15">
                                    <ul className="d-flex align-items-center">
                                        <li>
                                            <a onClick={callFunctionToOpenSighupPopup} className="theme_btn free_btn">Try Free Now</a>
                                        </li>
                                        <li>
                                            <a  onClick={callFunctionToOpenLoginPopup}  className="sign-in ml-20">
                                                <img src={userLogoSvg} alt=""/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
);
};

export default DesktopHeaderContainerComponent;
