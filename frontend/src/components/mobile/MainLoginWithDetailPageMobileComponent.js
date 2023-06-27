import React, {IonContent} from '@ionic/react';
import headerLogoOne from "../../theme/images/header_logo_one.png";
import  earthBg from "../../theme/images/slider/earth-bg.svg";
import  slider01 from "../../theme/images/slider/01.png";
import {useState} from "react";
import LoginMobileComponent from "./LoginMobileComponent";
import SignupMobileComponent from "./SignupMobileComponent";
import {useEffectOnce} from "../../helper/UseEffectOnce";

const MainLoginWithDetailPageMobileComponent=() => {
    const [tabName,setTabName] = useState('');
    const [initialLoading,setInitialLoading] = useState(true);

    useEffectOnce(()=>{
        setTimeout(function(){
            setInitialLoading(false);
        },1000)
    },[])

    return (
       <IonContent>
           {(initialLoading) && (
               <div id="preloader">
                   <div className="preloader">
                       <span></span>
                       <span></span>
                   </div>
               </div>
           )}
           <div style={{display:initialLoading ? 'none' : 'block'}}>
               <div className={"main_header_section"}>
                   <div className={"row"}>
                       <div className={"col image_col"}><img src={headerLogoOne} alt=""/></div>
                       <div className={"col"}>
                           {(tabName) ?
                               <button onClick={() => setTabName('')} className={"login_button"}><i className={"fa fa-times"}/></button>
                               :
                               <button onClick={() => setTabName('login')} className={"login_button"}>Login</button>
                           }
                       </div>
                   </div>
               </div>
               {(tabName === 'login') ?
                   <div className={"mobile_login_section"}>
                       <LoginMobileComponent/>
                   </div>
                   :(tabName === 'signup') ?
                       <div className={"mobile_signup_section"}>
                           <SignupMobileComponent/>
                       </div>
                       :(<div className={"main_body_content_login_mobile"}>
                           <div>
                               <div className={"title_main_section_container"}>
                                   <div className={"slider__img__box"}>
                                       <img className="img-one" src={slider01} alt=""/>s
                                       <img className="slide-shape img-eight" src={earthBg} alt=""/>
                                       <div className={"inner_slide_text_section_main"}>
                                           <p className={"heading_text"}>
                                               121 Tuition live class.
                                           </p>
                                           <p className={"heading_text_p"}>
                                               Easy and user-friendly access to live classes along with interactive doubt solving sessions help students to achieve their goals
                                           </p>
                                           <p className={"title_enhanced_app"}>
                                               One student one teacher concept <br/>
                                               Distance will be no bar now
                                           </p>
                                           <button onClick={()=>setTabName('signup')} className="theme_btn search_btn">Join Us Now</button>
                                       </div>
                                   </div>
                               </div>
                           </div>
                           <div className="why-chose-section-wrapper gradient-bg mt-25 why-chose-section-wrapper-mobile">
                               <section className="why-chose-us">
                                   <div className="why-chose-us-bg">
                                       <div className="container pt-3">
                                           <div className={"align-items-center"}>
                                               <div className="chose-wrapper">
                                                   <div className="section-title mb-30 wow fadeInUp2  animated"
                                                        data-wow-delay=".1s"
                                                        style={{visibility: 'visible', 'animationDelay': '0.2s' , 'animationName': 'fadeInUp2'}}>
                                                       <h5 className="bottom-line mb-25">Explore 121 Tuition</h5>
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
                               </section>
                           </div>
                           <div className="copy-right-area-mobile">
                               <div className="copyright text-center">
                                   <h5>Copyright@ 2022 <a>121 Tuition</a>. All Rights Reserved</h5>
                               </div>
                           </div>
                       </div>)
               }
           </div>
       </IonContent>
    );
};

export default MainLoginWithDetailPageMobileComponent;
