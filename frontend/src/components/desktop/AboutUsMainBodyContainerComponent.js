import React from '@ionic/react';
import svgIcon01 from '../../theme/images/icon/01.svg';
import svgIcon02 from '../../theme/images/icon/02.svg';
import svgIcon03 from '../../theme/images/icon/03.svg';
import svgIcon04 from '../../theme/images/icon/04.svg';
import svgIcon05 from '../../theme/images/icon/05.svg';
import svgIcon06 from '../../theme/images/icon/06.svg';
import shieldCheck from '../../theme/images/icon/shield-check.svg';
import catalog from '../../theme/images/icon/catalog.svg';
import slide2 from '../../theme/images/slider/slide2.png';
import dotPlane from '../../theme/images/icon/dot-plane.svg';
import avatarBg from '../../theme/images/slider/avatar-bg.png';
import studentDash from '../../theme/images/gif/student-dash.gif';
import teacherDash from '../../theme/images/gif/teacher-dash.gif';
import classTimetable from '../../theme/images/gif/class-timetable.gif';
import attendanceAssignment from '../../theme/images/gif/attendance-assignment.gif';
import mobileTour from "../../theme/images/gif/movile-vodeo-tour-bg.gif";
import classWhiteboard from "../../theme/images/gif/class-whiteboard.gif";

const AboutUsMainBodyContainerComponent=() => {
    return (
        <main>
            <section className="slider-area slider-gradient-bg pt-180 pb-100 pb-xs-50">
                <img className="sl-shape shape_01" src={svgIcon01} alt=""/>
                <img className="sl-shape shape_02" src={svgIcon02} alt=""/>
                <img className="sl-shape shape_03" src={svgIcon03} alt=""/>
                <img className="sl-shape shape_04" src={svgIcon04} alt=""/>
                <img className="sl-shape shape_05" src={svgIcon05} alt=""/>
                <img className="sl-shape shape_06" src={svgIcon06} alt=""/>
                <div className="main-slider">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-6 col-lg-6">
                                <div className="slider__content slider__content__02 pt-120">
                                    <h5 className="left-line mb-20 pl-40 wow fadeInUp2  animated" data-wow-delay=".1s"
                                        style={{visibility: "visible",animationDelay: "0.1s", animationName: "fadeInUp2"}}>
                                        Browse Categories
                                    </h5>
                                    <h1 className="main-title mb-40 wow fadeInUp2  animated" data-wow-delay=".2s"
                                        style={{visibility: "visible",animationDelay: "0.2s", animationName: "fadeInUp2"}}>Learn
                                        online from the leaders in Business Education</h1>
                                    <h5 className="mb-35 wow fadeInUp2  animated" data-wow-delay=".3s"
                                        style={{visibility: "visible",animationDelay: "0.3s", animationName: "fadeInUp2"}}>There
                                        are many variations of passages of Lorem Ipsum available, but the majority have
                                        suffered alteration in some form, by injected humour, or randomised words which
                                        don't look .</h5>
                                </div>
                            </div>
                            <div className="col-xl-6 col-lg-6">
                                <div className="slider-img-box-two">
                                    <div className="chose-img-wrapper mb-50 pos-rel">
                                        <img className="shape-avatar-bg" src={avatarBg} alt=""/>
                                        <div className="feature tag_01">
                                            <span><img src={shieldCheck} alt=""/></span>
                                            Safe &amp; Secured
                                        </div>
                                        <div className="feature tag_02">
                                            <span><img src={catalog} alt=""/></span>
                                            120+ Catalog
                                        </div>
                                        <div className="feature tag_03">
                                            <span><i className="fal fa-check"></i></span>
                                            Quality Education
                                        </div>
                                        <div className="video-wrapper">
                                            <a href="https://www.youtube.com/watch?v=7omGYwdcS04" className="popup-video">
                                                <i className="fas fa-play"></i>
                                            </a>
                                        </div>
                                        <img className="chose_05 wow fadeInRight animated animated" data-delay="1.5s"
                                             src={slide2} alt="Chose-img"
                                             style={{visibility: "visible"}}/>
                                            <img className="chose_06 wow fadeInRight animated animated"
                                                 data-delay="1.5s" src={dotPlane} alt="Chose-img"
                                                 style={{visibility: "visible"}}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="section-title text-center">
                        <h2>Student & Teacher Dashboard</h2>
                    </div>
                </div>
            </div>
            <section className="blog-details-area pt-70 pb-105 pt-md-100 pb-md-55 pt-xs-100 pb-xs-55">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="blog-details-box mb-45 wow fadeInUp2  animated"
                                 data-wow-delay=".3s" style={{visibility: "visible",animationDelay: "0.3s", animationName: "fadeInUp2"}}>
                                <img className="img-fluid blog-details-img mb-35" src={studentDash} alt="blog-details-img"/>
                                <h3 className="mb-30">Student dashboard view</h3>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which don't
                                    look even slightly believable.There are many variations of passages of Lorem Ipsum
                                    available.</p>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which don't
                                    look even slightly believable.There are many variations of passages of Lorem Ipsum
                                    available.</p>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which don't
                                    look even slightly believable.There are many variations of passages of Lorem Ipsum
                                    available.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="blog-details-box mb-45">
                                <img className="img-fluid blog-details-img mb-35" src={teacherDash} alt="blog-details-img"/>
                                <h3 className="mb-30">Teacher dashboard view</h3>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which don't
                                    look even slightly believable.There are many variations of passages of Lorem Ipsum
                                    available.</p>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which don't
                                    look even slightly believable.There are many variations of passages of Lorem Ipsum
                                    available.</p>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which don't
                                    look even slightly believable.There are many variations of passages of Lorem Ipsum
                                    available.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="section-title text-center">
                        <h2>Class & Timetable</h2>
                    </div>
                </div>
            </div>
            <section className="blog-details-area pt-70 pb-105 pt-md-100 pb-md-55 pt-xs-100 pb-xs-55">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="blog-details-box mb-45">
                                <img className="img-fluid blog-details-img mb-35" src={classTimetable} alt="blog-details-img"/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="blog-details-box mb-45">
                                <h3 className="mb-30">Student class and timetable view</h3>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which don't
                                    look even slightly believable.There are many variations of passages of Lorem Ipsum
                                    available.</p>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which don't
                                    look even slightly believable.</p>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which don't
                                    look even slightly believable.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="section-title text-center">
                        <h2>Attendance & Assignment</h2>
                    </div>
                </div>
            </div>
            <section className="blog-details-area pt-70 pb-105 pt-md-100 pb-md-55 pt-xs-100 pb-xs-55">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="blog-details-box mb-45">
                                <h3 className="mb-30">Attendance and Assignment</h3>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which don't
                                    look even slightly believable.There are many variations of passages of Lorem Ipsum
                                    available.</p>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which don't
                                    look even slightly believable.</p>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which don't
                                    look even slightly believable.</p>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="blog-details-box mb-45">
                                <img className="img-fluid blog-details-img mb-35" src={attendanceAssignment} alt="blog-details-img"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="section-title text-center">
                        <h2>Video class with White board</h2>
                    </div>
                </div>
            </div>
            <section className="blog-details-area pt-70 pb-105 pt-md-100 pb-md-55 pt-xs-100 pb-xs-55">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="blog-details-box mb-45">
                                <img className="img-fluid blog-details-img mb-35" src={classWhiteboard} alt="blog-details-img"/>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="blog-details-box mb-45">
                                <h3 className="mb-30">Class video call with live white board</h3>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which don't
                                    look even slightly believable.There are many variations of passages of Lorem Ipsum
                                    available.</p>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which don't
                                    look even slightly believable.</p>
                                <p>There are many variations of passages of Lorem Ipsum available, but the majority have
                                    suffered alteration in some form, by injected humour, or randomised words which don't
                                    look even slightly believable.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="section-title text-center">
                        <h2>Mobile Application Tour</h2>
                    </div>
                </div>
            </div>
            <section className="blog-details-area pt-70 pb-105 pt-md-100 pb-md-55 pt-xs-100 pb-xs-55">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="mobile-tour-section-img mb-45">
                                <img className="img-fluid blog-details-img mb-35" src={mobileTour} alt="blog-details-img"/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AboutUsMainBodyContainerComponent;
