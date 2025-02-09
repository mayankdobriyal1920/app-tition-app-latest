import React from 'react';
import {useSelector} from "react-redux";
import noClassFound from "../../../theme/images/chose/no_classes_found.png";
import {FacebookLoader} from "../../Loader/FacebookLoader";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendarComponent from "../../FullCalendarComponent";

export default function StudentDesktopScheduledClasses({isMobile}){
    const {loading,classData} = useSelector((state) => state.studentAllTimeClassList);

    return(
        <div className={"main_body_content_section all_student_subject_main_container "+(isMobile ? 'mobile' : '')}>
            <div className={"main_body_content_section_inner_calander mt-60"}>
                <div className={""}>
                    <h2 className={"heading_sch"}>Scheduled Classes</h2>
                    <div className={"mt-15 scheduled_classes_main_section"}>
                        {(loading) ?
                            (isMobile) ?
                                <FacebookLoader type={"facebookStyle"} item={7}/>
                                :
                                <FacebookLoader type={"facebookStyle"} item={2}/>
                            : (Object.keys(classData)?.length) ?
                                <FullCalendarComponent
                                    events={classData}
                                />
                                :
                                <div className={"no_demo_classes_div_section"}>
                                    <img alt={"no_demo_classes"} src={noClassFound}/><br></br>
                                    Class is not assigned you you yet, we will notify you when it will scheduled.
                                </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}