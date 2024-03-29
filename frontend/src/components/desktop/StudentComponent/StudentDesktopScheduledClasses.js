import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import noClassFound from "../../../theme/images/chose/no_classes_found.png";
import {FacebookLoader} from "../../Loader/FacebookLoader";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function StudentDesktopScheduledClasses({isMobile}){
    const {loading,classData} = useSelector((state) => state.studentAllTimeClassList);

    function renderEventContent(eventInfo) {
        let eventData = JSON.parse(eventInfo?.event?.title);
        return (
            <div className={"time_text_event_container_in_calander"}>
                <p><span>Time :- </span>{eventData?.time}</p>
                <p><span>Subject :- </span>{eventData?.subject_name}</p>
                <p>{eventData?.teacher_name}</p>
            </div>
        )
    }

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
                            : (classData?.length) ?
                                <div className={""}>
                                    <FullCalendar
                                        plugins={[ dayGridPlugin ]}
                                        initialView="dayGridMonth"
                                        weekends={true}
                                        events={classData}
                                        eventContent={renderEventContent}
                                    />
                                </div>
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