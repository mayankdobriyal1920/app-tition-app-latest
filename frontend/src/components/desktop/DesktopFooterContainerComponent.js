import React from '@ionic/react';
import headerLogo from "../../theme/images/header_logo_one.png";

const DesktopHeaderContainerComponent=() => {
    return (
        <footer className="footer-area pt-70 pb-40">
            <div className="container">
                <div className="row mb-15">
                    <div className="col-xl-3 col-lg-4 col-md-6  wow fadeInUp2  animated" data-wow-delay=".1s"
                         style={{visibility: 'visible', 'animationDelay': '0.2s' , 'animationName': 'fadeInUp2'}}>
                        <div className="footer__widget mb-30">
                            <div className="footer-log mb-20">
                                <a className="logo">
                                    <img src={headerLogo} alt=""/>
                                </a>
                            </div>
                            <p>Get the same learning experience as school with the comfort of being at home with Mr.Tutor. Learn from top faculty anytime, anywhere
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp2  animated" data-wow-delay=".3s"
                         style={{visibility: 'visible', 'animationDelay': '0.3s' , 'animationName': 'fadeInUp2'}}>
                        <div className="footer__widget mb-30 pl-40 pl-md-0 pl-xs-0">
                            <h6 className="widget-title mb-35">Contact us</h6>
                            <ul className="fot-list">
                                <li><a href="#">info@example.com</a></li>
                                <li><a href="#">+00 652 54 432</a></li>
                                <li><a href="#">Terms &amp; Conditions</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4 col-md-6  wow fadeInUp2  animated" data-wow-delay=".5s"
                         style={{visibility: 'visible', 'animationDelay': '0.5s' , 'animationName': 'fadeInUp2'}}
                    >
                        <div className="footer__widget mb-25 pl-90 pl-md-0 pl-xs-0">
                            <h6 className="widget-title mb-35">Quick Links</h6>
                            <ul className="fot-list">
                                <li><a>About US</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-6 col-md-6  wow fadeInUp2  animated" data-wow-delay=".7s"
                         style={{visibility: 'visible', 'animationDelay': '0.7s' , 'animationName': 'fadeInUp2'}}>
                        <div className="footer__widget mb-30 pl-150 pl-lg-0 pl-md-0 pl-xs-0">
                            <h6 className="widget-title mb-35">Features</h6>
                            <ul className="fot-list mb-30">
                                <li><a >Home Page</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copy-right-area border-bot pt-40">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-12">
                            <div className="copyright text-center">
                                <h5>Copyright@ 2022 <a>Mr. Tutor</a>. All Rights Reserved</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default DesktopHeaderContainerComponent;
