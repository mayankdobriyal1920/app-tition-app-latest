import React from '@ionic/react';
import svgIcon01 from '../../theme/images/icon/01.svg';
import svgIcon02 from '../../theme/images/icon/02.svg';
import svgIcon03 from '../../theme/images/icon/03.svg';
import svgIcon04 from '../../theme/images/icon/04.svg';
import svgIcon05 from '../../theme/images/icon/05.svg';
import svgIcon06 from '../../theme/images/icon/06.svg';
import dotBox5 from '../../theme/images/icon/dot-box-5.svg';
import slider1 from '../../theme/images/slider/01.png';
import slider2 from '../../theme/images/slider/02.png';
import slider3 from '../../theme/images/slider/03.png';
import dotBox1 from '../../theme/images/shape/dot-box-1.svg';
import dotBox2 from '../../theme/images/shape/dot-box-2.svg';
import dotPlane1 from '../../theme/images/shape/dot-plan-1.svg';
import earthBg from '../../theme/images/slider/earth-bg.svg';
import chose5 from '../../theme/images/chose/05.png';
import dotBox3 from '../../theme/images/icon/dot-box3.svg';
import {useDispatch} from "react-redux";
import {actionToOpenCloseSignupPopup} from "../../actions/CommonAction";

const DesktopMainBodyContainerComponent=() => {
    const dispatch = useDispatch();
    const callFunctionToOpenSighupPopup = ()=>{
        dispatch(actionToOpenCloseSignupPopup(true));
    }
    return (
        <main>
            <section className={"slider-area pt-180 pt-xs-150 pt-150 pb-xs-35"}>
                <img className="sl-shape shape_01" src={svgIcon01} alt=""/>
                <img className="sl-shape shape_02" src={svgIcon02} alt=""/>
                <img className="sl-shape shape_03" src={svgIcon03} alt=""/>
                <img className="sl-shape shape_04" src={svgIcon04} alt=""/>
                <img className="sl-shape shape_05" src={svgIcon05} alt=""/>
                <img className="sl-shape shape_06" src={svgIcon06} alt=""/>
                <img className="sl-shape shape_07" src={dotBox5} alt=""/>
                <div className="main-slider pt-10">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-lg-6 order-last order-lg-first">
                                <div className="slider__img__box mb-50 pr-30">
                                    <img className="img-one mt-55 pr-70" src={slider1} alt=""/>
                                    <img className="slide-shape img-two" src={slider2} alt=""/>
                                    <img className="slide-shape img-three" src={slider3} alt=""/>
                                    <img className="slide-shape img-four" src={dotBox1} alt=""/>
                                    <img className="slide-shape img-five" src={dotBox2} alt=""/>
                                    <img className="slide-shape img-six" src={dotPlane1} alt=""/>
                                    <img
                                        className="slide-shape img-seven wow fadeInRight animated animated"
                                        data-delay="1.5s"
                                        src={dotPlane1} alt="Chose-img"
                                        style={{visibility: 'visible'}}/>
                                    <img className="slide-shape img-eight" src={earthBg} alt=""/>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <div className="slider__content pt-15">
                                    <h1 className="main-title mb-40 wow fadeInUp2  animated" data-wow-delay=".1s"
                                        style={{visibility: "visible" ,animationDelay: '0.1s' , animationName: 'fadeInUp2'}}>
                                        121 Tuition live class.
                                    </h1>
                                    <div className="chose-wrapper pl-25 pl-lg-0 pl-md-0 pl-xs-0">
                                        <div className="section-title mb-30 wow fadeInUp2  animated"
                                             data-wow-delay=".1s"
                                             style={{visibility: 'visible', 'animationDelay': '0.2s' , 'animationName': 'fadeInUp2'}}>
                                            <h2 className="mb-25">Why it’s India’s No. 1?</h2>
                                            <p>Get the offline experience in Online Mode</p>
                                        </div>
                                        <ul className="text-list mb-40 wow fadeInUp2  animated" data-wow-delay=".2s"
                                            style={{visibility: 'visible', 'animationDelay': '0.2s' , 'animationName': 'fadeInUp2'}}>
                                            <li>Student will be fully attentive as video of student will always be on and teacher can monitor the child all time and understand with his/her expressions whether he/she is paying attention or not and also get to know whether he/ she is understanding or not.</li>
                                            <li>Video of child will always be on so the child cannot distract himself/herself with any other activities like phone, games etc. Teacher will be able to see the child in entire duration of class. </li>
                                            <li>This app has a unique feature of “ Writing from both sides in Real Time” i.e. teacher can write on the digital white board as well as student can also write on the board. </li>
                                            <li>The solution to the problem of child opening any other window during online study is solved on this platform as student will not be able to open any other window during the class time and if he/she does teacher will get to know and will warn student to be attentive in class.</li>
                                        </ul>
                                    </div>
                                    <p className={"title_enhanced_desktop"}>
                                        One student one teacher concept <br/>
                                        Distance will be no bar now
                                    </p>
                                    <ul className="search__area d-md-inline-flex align-items-center justify-content-between mb-30">
                                        <li>
                                            <button
                                                onClick={callFunctionToOpenSighupPopup}
                                                className="theme_btn search_btn">Join Us Now</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <section className={"pt-150 pb-45 pt-md-95 pb-md-20"}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="section-title text-center mb-50">
                                <h5 className="bottom-line mb-25">Featured</h5>
                                <h2>Explore 121 Tuition</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <div className="why-chose-section-wrapper gradient-bg mr-100 ml-100">
                <section className="why-chose-us">
                    <div className="why-chose-us-bg pb-175 pb-md-90 pt-xs-95 pb-xs-90">
                        <div className="container">
                            <div className={"row align-items-center"}>
                                <div className={"col-xl-7 col-lg-7"}>
                                    <div className="chose-img-wrapper mb-50 pos-rel">
                                        <div className="img-bg pos-rel">
                                            <img className="chose_05 pl-70 pl-lg-0 pl-md-0 pl-xs-0" src={chose5} alt="Chose-img"/>
                                        </div>
                                        <img className="chose chose_06" src={dotBox3} alt="Chose-img"/>
                                    </div>
                                </div>
                                <div className={"col-xl-5 col-lg-5"}>
                                    <div className="chose-wrapper pl-25 pl-lg-0 pl-md-0 pl-xs-0">
                                        <div className="section-title mb-30 wow fadeInUp2  animated"
                                             data-wow-delay=".1s"
                                             style={{visibility: 'visible', 'animationDelay': '0.2s' , 'animationName': 'fadeInUp2'}}>
                                            <h2 className="mb-25">Why Choose 121 Tuition?</h2>
                                            <p>Get the same learning experience as school with the comfort of being at home with 121 Tuition. Learn from top faculty anytime, anywhere</p>
                                        </div>
                                        <ul className="text-list mb-40 wow fadeInUp2  animated" data-wow-delay=".2s"
                                            style={{visibility: 'visible', 'animationDelay': '0.2s' , 'animationName': 'fadeInUp2'}}>
                                            <li>Accessibility: anyone with a good internet connection can have access to online classes with a click of a button.</li>
                                            <li>Cost-effective classes at affordable prices.</li>
                                            <li>Quality courses are available anytime, anywhere.</li>
                                            <li>In Class Doubts Solving.</li>
                                            <li>Test & Analysis – Proper tests after completion of each chapter for progress tracking.</li>
                                            <li>Students will also get help in the completion of homework and project work.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default DesktopMainBodyContainerComponent;
