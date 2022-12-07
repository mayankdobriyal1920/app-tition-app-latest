import React from "react";
import {useSelector} from "react-redux";
import {FacebookLoader} from "../../Loader/FacebookLoader";
import userIcon from "../../../theme/images/icon/user-avatar-2.png";
import teacherBatch from "../../../theme/images/chose/teacher_batch.png";

function StudentProfileFixedSectionComponentFunction(){
    const {loading,classData} = useSelector((state) => state.studentAllClassesList);
    return (
        <div className={"user_profile_fixed_section_main_container"}>
            {(loading) ?
                <FacebookLoader type={"facebookStyle"} item={8}/>
               :
                <div className={"user_profile_main_section"}>
                    <div className={"user_profile_icon_user_section"}>
                        <div className={"user_icon_profile"}>
                            <img src={userIcon}/>
                        </div>
                        <div className={"user_icon_profile_name"}>
                            {classData?.name}
                        </div>
                        <div className={"class_standared_text"}>
                            {classData?.student_class}th Class
                        </div>
                    </div>
                    <div className={"user_profile_personal_detail mt-30"}>
                        <div className={"user_profile_personal_detail_heading"}>
                            <i className={"fa fa-info-circle"}/> Father's Name
                        </div>
                        <div className={"user_profile_personal_detail_text mb-10"}>
                            {classData?.father_name}
                        </div>
                        <div className={"user_profile_personal_detail_heading"}>
                            <i className={"fa fa-info-circle"}/> Mother's Name
                        </div>
                        <div className={"user_profile_personal_detail_text mb-10"}>
                            {classData?.mother_name}
                        </div>
                        <div className={"user_profile_personal_detail_heading"}>
                            <i className={"fa fa-info-circle"}/> Email Address
                        </div>
                        <div className={"user_profile_personal_detail_text mb-10"}>
                            {classData?.email}
                        </div>
                        <div className={"user_profile_personal_detail_heading"}>
                            <i className={"fa fa-school-circle-check"}/> School Name
                        </div>
                        <div className={"user_profile_personal_detail_text mb-10"}>
                            {classData?.school_name}
                        </div>
                        <div className={"user_profile_personal_detail_heading"}>
                            <i className={"fa fa-school-circle-check"}/> School Board
                        </div>
                        <div className={"user_profile_personal_detail_text mb-10"}>
                            {classData?.school_board}
                        </div>
                        <div className={"user_profile_personal_detail_heading"}>
                            <i className={"fa fa-address-book"}/> State
                        </div>
                        <div className={"user_profile_personal_detail_text mb-10"}>
                            {classData?.state}
                        </div>
                        <div className={"user_profile_personal_detail_heading"}>
                            <i className={"fa fa-address-book"}/> City
                        </div>
                        <div className={"user_profile_personal_detail_text mb-10"}>
                            {classData?.city}
                        </div>
                        <div className={"user_profile_personal_detail_heading"}>
                            <i className={"fa fa-address-book"}/> Batch
                        </div>
                        <div className={"user_profile_personal_detail_batch_section mb-10 row mt-10"}>
                            <div className={"col-2 user_batch_icon_section"}>
                                <img src={teacherBatch}/>
                            </div>
                            <div className={"col-10"}>
                                {
                                 (classData?.batch === 1) ?
                                     <div className={"batch_text_info"}>
                                         Your selected batch is one to one where we will provide you opportunity to learn with one to one teacher student.
                                     </div>
                                 :(classData?.batch === 2) ?
                                     <div className={"batch_text_info"}>
                                         Your selected batch is one to three where we will provide you opportunity to learn with one to three teacher student.
                                     </div>
                                 :<div className={"batch_text_info"}>
                                     Your selected batch is one to five where we will provide you opportunity to learn with one to five teacher student.
                                  </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}
export const StudentProfileFixedSectionComponent = React.memo(StudentProfileFixedSectionComponentFunction);
