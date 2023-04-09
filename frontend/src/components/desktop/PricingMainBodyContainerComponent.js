import React from '@ionic/react';
import pageTitle01 from '../../theme/images/page-title-bg/01.jpg';
import writing from '../../theme/images/icon/writing.svg';
import test from '../../theme/images/icon/tst.svg';
import lifetime from '../../theme/images/icon/lifetime.svg';

const PricingMainBodyContainerComponent=() => {
    return (
        <main>
            <section className="page-title-area d-flex align-items-end" style={{backgroundImage: `url(${pageTitle01})`}}>
                <div className="container">
                    <div className="row align-items-end">
                        <div className="col-lg-12">
                            <div className="page-title-wrapper mb-50">
                                <h1 className="page-title mb-25">Pricing Table</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="plan-area pt-150 pb-120 pt-md-100 pb-md-70 pt-xs-100 pb-xs-70">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-8 col-lg-9">
                            <div className="section-title text-center mb-55">
                                <h5 className="bottom-line mb-25">Pricing Table</h5>
                                <h2>Explore our Popular Courses?</h2>
                            </div>
                        </div>
                    </div>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                            <div className="row">
                                <div className="col-lg-4 col-md-6">
                                    <div className="plan text-center mb-30">
                                        <div className="pr__header mb-30">
                                            <h2>1 to 1</h2>
                                            <h5>Single teacher single student.</h5>
                                            <img src={writing} alt="" className="pr-icon"/>
                                        </div>
                                        <div className="pr__body">
                                            <h2 className="mb-10">
                                                <b>
                                                    <span className="new-price">Kg to 4th</span>
                                                </b>
                                            </h2>
                                            <h2 className="mb-10">
                                                <b>
                                                    <sup>₹</sup>2000<span className="new-price">/ Monthly</span>
                                                </b>
                                            </h2>
                                            <h2 className="mb-10">
                                                <b>
                                                    <span className="new-price">5th to 8th</span>
                                                </b>
                                            </h2>
                                            <h2 className="mb-10">
                                                <b>
                                                    <sup>₹</sup>2500<span className="new-price">/ Monthly</span>
                                                </b>
                                            </h2>
                                            <h2 className="mb-10">
                                                <b>
                                                    <span className="new-price">9th to 10th</span>
                                                </b>
                                            </h2>
                                            <h2 className="mb-10">
                                                <b>
                                                    <sup>₹</sup>3000<span className="new-price">/ Monthly</span>
                                                </b>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="plan plan-2 text-center mb-30">
                                        <div className="pr__header mb-30">
                                            <h2>1 to 3</h2>
                                            <h5>Single teacher three student.</h5>
                                            <img src={test} alt="" className="pr-icon"/>
                                        </div>
                                        <div className="pr__body">
                                            <h2 className="mb-10">
                                                <b>
                                                    <span className="new-price">Kg to 4th</span>
                                                </b>
                                            </h2>
                                            <h2 className="mb-10">
                                                <b>
                                                    <sup>₹</sup>1800<span className="new-price">/ Monthly</span>
                                                </b>
                                            </h2>
                                            <h2 className="mb-10">
                                                <b>
                                                    <span className="new-price">5th to 8th</span>
                                                </b>
                                            </h2>
                                            <h2 className="mb-10">
                                                <b>
                                                    <sup>₹</sup>2200<span className="new-price">/ Monthly</span>
                                                </b>
                                            </h2>
                                            <h2 className="mb-10">
                                                <b>
                                                    <span className="new-price">9th to 10th</span>
                                                </b>
                                            </h2>
                                            <h2 className="mb-10">
                                                <b>
                                                    <sup>₹</sup>2700<span className="new-price">/ Monthly</span>
                                                </b>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6">
                                    <div className="plan plan-2a text-center mb-30">
                                        <div className="pr__header mb-30">
                                            <h2>1 to 5</h2>
                                            <h5>Single teacher five student.</h5>
                                            <img src={lifetime} alt="" className="pr-icon"/>
                                        </div>
                                        <div className="pr__body">
                                            <h2 className="mb-10">
                                                <b>
                                                    <span className="new-price">Kg to 4th</span>
                                                </b>
                                            </h2>
                                            <h2 className="mb-10">
                                                <b>
                                                    <sup>₹</sup>1700<span className="new-price">/ Monthly</span>
                                                </b>
                                            </h2>
                                            <h2 className="mb-10">
                                                <b>
                                                    <span className="new-price">5th to 8th</span>
                                                </b>
                                            </h2>
                                            <h2 className="mb-10">
                                                <b>
                                                    <sup>₹</sup>2100<span className="new-price">/ Monthly</span>
                                                </b>
                                            </h2>
                                            <h2 className="mb-10">
                                                <b>
                                                    <span className="new-price">9th to 10th</span>
                                                </b>
                                            </h2>
                                            <h2 className="mb-10">
                                                <b>
                                                    <sup>₹</sup>2500<span className="new-price">/ Monthly</span>
                                                </b>
                                            </h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default PricingMainBodyContainerComponent;
