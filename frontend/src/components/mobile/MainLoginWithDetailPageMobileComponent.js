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
                       :(<div>
                           <div className={"main_body_content_login_mobile"}>
                               <div className={"title_main_section_container"}>
                                   <div className={"slider__img__box"}>
                                       <img className="img-one" src={slider01} alt=""/>
                                       <img className="slide-shape img-eight" src={earthBg} alt=""/>
                                       <div className={"inner_slide_text_section_main"}>
                                           <p className={"heading_text"}>
                                               Mr. Tutor live class program is a unique blend of conventional.
                                           </p>
                                           <p className={"heading_text_p"}>
                                               Easy and user-friendly access to live classes along with interactive doubt solving sessions help students to achieve their goals
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
                                                       <h5 className="bottom-line mb-25">Explore Mr. Tutor</h5>
                                                       <h2 className="mb-25">Why Choose Mr. Tutor?</h2>
                                                       <p>Get the same learning experience as school with the comfort of being at home with Extramarks. Learn from top faculty anytime, anywhere</p>
                                                   </div>
                                                   <ul className="text-list wow fadeInUp2  animated" data-wow-delay=".2s"
                                                       style={{visibility: 'visible', 'animationDelay': '0.2s' , 'animationName': 'fadeInUp2'}}>
                                                       <li>There are many variations of passages of Lorem Ipsum.</li>
                                                       <li>The majority have suffered alteration in some form.</li>
                                                       <li>There are many variations of passages of Lorem Ipsum.</li>
                                                   </ul>
                                               </div>
                                           </div>
                                       </div>
                                   </div>
                               </section>
                           </div>
                           <div className="copy-right-area-mobile">
                               <div className="copyright text-center">
                                   <h5>Copyright@ 2022 <a>Mr. Tutor</a>. All Rights Reserved</h5>
                               </div>
                           </div>
                       </div>)
               }
           </div>
       </IonContent>
    );
};

export default MainLoginWithDetailPageMobileComponent;
