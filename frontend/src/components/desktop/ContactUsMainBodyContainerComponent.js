import React from '@ionic/react';
import pageTitle01 from "../../theme/images/page-title-bg/01.jpg";
import contactUs from "../../theme/images/contactUs.jpg";
import materialLocation from "../../theme/images/icon/material-location-on.svg";
import phoneAlt from "../../theme/images/icon/phone-alt.svg";
import featherMail from "../../theme/images/icon/feather-mail.svg";

const ContactUsMainBodyContainerComponent=() => {
    return (
        <main>
            <main>
                <section className="page-title-area d-flex align-items-end" style={{backgroundImage: `url(${pageTitle01})`}}>
                    <div className="container">
                        <div className="row align-items-end">
                            <div className="col-lg-12">
                                <div className="page-title-wrapper mb-50">
                                    <h1 className="page-title mb-25">Contact Us</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="contact-us-area pt-150 pb-120 pt-md-100 pt-xs-100 pb-md-70 pb-xs-70">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-6 col-lg-6">
                                <div className="contact-img mb-30">
                                    <img className="img-fluid" src={contactUs} alt=""/>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <div className="contact-wrapper pl-75 mb-30">
                                    <div className="section-title mb-30">
                                        <h2>Get In Touch With Us</h2>
                                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed di nonumy eirmod
                                            tempor invidunt ut labore et dolore magn aliq erat.</p>
                                    </div>
                                    <div className="single-contact-box mb-30">
                                        <div className="contact__iocn">
                                            <img src={materialLocation} alt=""/>
                                        </div>
                                        <div className="contact__text">
                                            <h5>Kolkata</h5>
                                        </div>
                                    </div>
                                    <div className="single-contact-box cb-2 mb-30">
                                        <div className="contact__iocn">
                                            <img src={phoneAlt} alt=""/>
                                        </div>
                                        <div className="contact__text">
                                            <h5>+91 88009 29105</h5>
                                        </div>
                                    </div>
                                    <div className="single-contact-box cb-3 mb-30">
                                        <div className="contact__iocn">
                                            <img src={featherMail} alt=""/>
                                        </div>
                                        <div className="contact__text">
                                            <h5>121tution2022@gmail.com</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </main>
    );
};

export default ContactUsMainBodyContainerComponent;
