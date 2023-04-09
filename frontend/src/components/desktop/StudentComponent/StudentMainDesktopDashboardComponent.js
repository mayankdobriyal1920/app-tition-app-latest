import React from "react";
import {StudentDashHeaderComponent} from "./StudentDashHeaderComponent";
import {useSelector} from "react-redux";
import {StudentCreateProfileComponent} from "./StudentCreateProfileComponent";
import {StudentProfileFixedSectionComponent} from "./StudentProfileFixedSectionComponent";
import StudentTodayClassesComponent from "./StudentTodayClassesComponent";

function StudentMainDesktopDashboardComponentFunction(){
    const userInfo = useSelector((state) => state.userSignin.userInfo);
    return (
        <div className={"main_body_content_section all_student_subject_main_container with_student"}>
            <StudentDashHeaderComponent type={"StudentMainDesktopDashboardComponent"}/>
            <div className={"student_dash_all_courses_main_section mt-60"}>
                {(userInfo?.has_profile) ?
                    <StudentTodayClassesComponent/>
                    :
                    <StudentCreateProfileComponent/>
                }
            </div>
            {(userInfo?.has_profile) ?
                <StudentProfileFixedSectionComponent/>
                :''
            }
        </div>
    )
}
export const StudentMainDesktopDashboardComponent = React.memo(StudentMainDesktopDashboardComponentFunction);
