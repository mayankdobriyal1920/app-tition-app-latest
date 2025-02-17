import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../../Loader/FacebookLoader";
import {_getIconBySubjectKey} from "../../../helper/CommonHelper";
import noClassFound from "../../../theme/images/chose/no_classes_found.png";
import {StudentDashHeaderComponent} from "../StudentComponent/StudentDashHeaderComponent";
import moment from "moment";
import {
    actionToSetCurrentCallDataGroupData, actionToSetTeacherStudentInClassStatus
} from "../../../actions/CommonAction";
import TeacherStudentVideoCallComponent from "./TeacherStudentVideoCallComponent";
import {cloneDeep} from "lodash";
import {CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS} from "../../../constants/CommonConstants";
import {sendWebsocketRequest} from "../../../helper/WebSocketHelper";

function TeacherMainDesktopDashboardComponentFunction(){
    const teacherAllClassesList = useSelector((state) => state.teacherAllClassesList);
    const teacherAllTodayClassesList = useSelector((state) => state.teacherAllTodayClassesList);
    const teacherAllDemoClassesList = useSelector((state) => state.teacherAllDemoClassesList);
    const inClassStatusTeacherStudent = useSelector((state) => state.inClassStatusTeacherStudent);
    const [callLoading,setCallLoading] = React.useState(null);
    const dispatch = useDispatch();
    const [usersInCall, setUsersInCall] = useState([]);
    const userInfo = useSelector((state) => state.userSignin.userInfo);

    const startCallInGroupAgora = (e,classGroupData)=>{
        e.preventDefault();

        if (callLoading) return false;
        setCallLoading(classGroupData?.id);

        dispatch(actionToSetTeacherStudentInClassStatus('JOINING'));
        dispatch(actionToSetCurrentCallDataGroupData(classGroupData));

        let allMembersInCall = [];
        classGroupData?.profile_subject_with_batch?.map((studentProfile) => {
            allMembersInCall.push({
                id: studentProfile.student_id,
                name: studentProfile.student_name,
                mute:true,
                isTeacher:false
            });
        })

        dispatch(actionToSetCurrentCallDataGroupData(classGroupData));
        dispatch({type: CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS, payload: [...allMembersInCall]});


        let finalClassGroupData = classGroupData;
        finalClassGroupData.started_at = new Date().toISOString();
        finalClassGroupData.allMembers = allMembersInCall;

        setTimeout(()=>{
            sendWebsocketRequest(JSON.stringify({
                clientId: localStorage.getItem('clientId'),
                groupId: classGroupData?.batch_id,
                classId: classGroupData?.id,
                classGroupData: finalClassGroupData,
                members: allMembersInCall,
                memberData: userInfo,
                type: "startNewCallInGroupChannel"
            }));
        },4000)
    }

    return (
        <div className={"main_body_content_section all_student_subject_main_container teacher"}>
            {(inClassStatusTeacherStudent === 'PREJOIN') ?
                <>
                <StudentDashHeaderComponent type={"StudentMainDesktopDashboardComponent"}/>
                <div className={"student_dash_all_courses_main_section mt-60"}>
                    <div className={"student_demo_classes_main_page"}>
                        <h2>Today's Classes</h2>
                        <div className={"mt-15 demo_classes_main_section"}>
                            {(teacherAllTodayClassesList?.loading) ?
                                <FacebookLoader type={"facebookStyle"} item={2}/>
                                : (teacherAllTodayClassesList?.classData?.length) ?
                                    <div className={"demo_classes_main_section_div"}>
                                        {(teacherAllTodayClassesList?.classData?.map((myClasses,key)=>(
                                            <div key={key} className={"demo_classes_section_loop mr-30 mb-10 mt-10"}>
                                                <div className={"row"}>
                                                    <div className={"col demo_classes_section_subject_icon_name"}>
                                                        <div className={"icon_sub"} style={{background:_getIconBySubjectKey(myClasses?.subject_name).color}}>
                                                            {_getIconBySubjectKey(myClasses?.subject_name).icon}
                                                        </div>
                                                        <div className={"name_section"}>
                                                            <div className={"name_section1"}>{myClasses?.subject_name}</div>
                                                            <div className={"name_section2"}>{myClasses?.class_batch_name}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"row"}>
                                                    <div className={"col demo_classes_section_teacher_icon_name"}>
                                                        <div className={"teacher_detail_section"}>
                                                            <div className={"teacher_font_icon"}>
                                                                <i className={"fa fa-info-circle"}/>
                                                            </div>
                                                            <div className={"teacher_name_section"}>
                                                                {myClasses?.student_class}th (Student class)
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"row"}>
                                                    <div className={"col demo_classes_section_teacher_icon_name"}>
                                                        {(myClasses?.class_end_date_time) ?
                                                            <>
                                                                <div className={"class_time_date_demo mb-3"}>
                                                                    Start time : {moment(new Date(myClasses?.start_from_date_time)).format('hh:mm a')}
                                                                </div>
                                                                <div className={"class_time_date_demo"}>
                                                                    Class Taken : {moment(new Date(myClasses?.class_end_date_time)).format('hh:mm a')}
                                                                </div>
                                                            </>
                                                            :
                                                            <div className={"class_time_date_demo mb-3"}>
                                                                Start time : {moment(new Date(myClasses?.start_from_date_time)).format('hh:mm a')}
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className={"row"}>
                                                    <div className={"col demo_classes_section_teacher_icon_name"}>
                                                        <div>
                                                            {(!myClasses?.class_end_date_time) ?
                                                                <div onClick={(e)=>startCallInGroupAgora(e,myClasses)} className={"take_demo_button"}>
                                                                    <button className={"theme_btn"}>
                                                                        {callLoading === myClasses?.id ? 'Starting class...' :
                                                                            'Start Class'}
                                                                    </button>
                                                                </div>
                                                                :
                                                              ''
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )))}
                                    </div>
                                    :
                                    <div className={"no_demo_classes_div_section"}>
                                        <img alt={"no_demo_classes"} src={noClassFound}/><br></br>
                                       Class is not assigned you you yet, we will notify you when it will scheduled.
                                    </div>
                            }
                        </div>
                        <h2 className={"mt-30"}>Demo Classes</h2>
                        <div className={"mt-15 demo_classes_main_section"}>
                            {(teacherAllDemoClassesList?.loading) ?
                                <FacebookLoader type={"facebookStyle"} item={2}/>
                                : (teacherAllDemoClassesList?.classData?.length) ?
                                    <div className={"demo_classes_main_section_div"}>
                                        {(teacherAllDemoClassesList?.classData?.map((myClasses,key)=>(
                                            <div key={key} className={"demo_classes_section_loop mr-30 mb-10 mt-10"}>
                                                <div className={"row"}>
                                                    <div className={"col demo_classes_section_subject_icon_name"}>
                                                        <div className={"icon_sub"} style={{background:_getIconBySubjectKey(myClasses?.subject_name).color}}>
                                                            {_getIconBySubjectKey(myClasses?.subject_name).icon}
                                                        </div>
                                                        <div className={"name_section"}>
                                                            <div className={"name_section1"}>{myClasses?.subject_name}</div>
                                                            <div className={"name_section2"}>{myClasses?.class_batch_name}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"row"}>
                                                    <div className={"col demo_classes_section_teacher_icon_name"}>
                                                        <div className={"teacher_detail_section"}>
                                                            <div className={"teacher_font_icon"}>
                                                                <i className={"fa fa-info-circle"}/>
                                                            </div>
                                                            <div className={"teacher_name_section"}>
                                                                {myClasses?.student_class}th (Student class)
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"row"}>
                                                    <div className={"col demo_classes_section_teacher_icon_name"}>
                                                        {(myClasses?.class_end_time) ?
                                                            <>
                                                                <div className={"class_time_date_demo mb-3"}>
                                                                    Start time : {moment(myClasses?.starting_from_date).format('hh:mm a')}
                                                                </div>
                                                                <div className={"class_time_date_demo"}>
                                                                    Class Taken : {moment(myClasses?.class_end_time).format('hh:mm a')}
                                                                </div>
                                                            </>
                                                            :
                                                            <div className={"class_time_date_demo mb-3"}>
                                                                Start time : {moment(myClasses?.starting_from_date).format('hh:mm a')}
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className={"row"}>
                                                    <div className={"col demo_classes_section_teacher_icon_name"}>
                                                        <div>
                                                            {(!myClasses?.class_end_time) ?
                                                                <div onClick={(e)=>startCallInGroupAgora(e,myClasses)} className={"take_demo_button"}>
                                                                    <button className={"theme_btn"}>
                                                                        {callLoading === myClasses?.id ? 'Starting class...' :
                                                                       'Start Class'}
                                                                    </button>
                                                                </div>
                                                                :
                                                               ''
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )))}
                                    </div>
                                    :
                                    <div className={"no_demo_classes_div_section"}>
                                        <img alt={"no_demo_classes"} src={noClassFound}/><br></br>
                                        Demo class is not assigned you you yet, we will notify you when it will scheduled.
                                    </div>
                            }
                        </div>
                        <h2 className={"mt-30"}>Your Classes</h2>
                        <div className={"mt-15 demo_classes_main_section"}>
                            {(teacherAllClassesList?.loading) ?
                                <FacebookLoader type={"facebookStyle"} item={2}/>
                                : (teacherAllClassesList?.classData?.length) ?
                                    <div className={"class_data_main_table_section"}>
                                        <div className={"row class_list_table header_row mb-15"}>
                                            <div className={"col-3 header"}>
                                                Subject name
                                            </div>
                                            <div className={"col-3 header"}>
                                                Batch type
                                            </div>
                                            <div className={"col-3 header"}>
                                                Batch Name
                                            </div>
                                        </div>
                                        {(teacherAllClassesList?.classData?.map((myClasses,key)=>(
                                            <div key={key} className={"row class_list_table mb-15"}>
                                                <div className={"col-3 icon_main_col"}>
                                                    <div className={"icon_setion"} style={{background:_getIconBySubjectKey(myClasses?.subject_name).color}}>
                                                        {_getIconBySubjectKey(myClasses?.subject_name).icon}
                                                    </div>
                                                    <div className={"name_section"}>
                                                        {myClasses?.subject_name}
                                                    </div>
                                                </div>
                                                <div className={"col-3 body"}>
                                                    {myClasses?.batch === 1 ? '1 to 1' : (myClasses?.batch === 2) ? '1 to 3' :(myClasses?.batch === 3) ? '1 to 5' : ''}
                                                </div>
                                                <div className={"col-3 body"}>
                                                    {myClasses?.class_batch_name}
                                                </div>
                                            </div>
                                        )))}
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
                </>
                :
                <TeacherStudentVideoCallComponent isTeacher={true} classId={callLoading} users={usersInCall} setUsers={setUsersInCall}/>
           }
        </div>
    )
}
export const TeacherMainDesktopDashboardComponent = React.memo(TeacherMainDesktopDashboardComponentFunction);
