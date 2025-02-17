import React, {useState} from "react";
import {IonContent} from "@ionic/react";
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../../Loader/FacebookLoader";
import {_getIconBySubjectKey} from "../../../helper/CommonHelper";
import moment from "moment";
import noClassFound from "../../../theme/images/chose/no_classes_found.png";

import {
    actionToSetCurrentCallDataGroupData,
    actionToSetTeacherStudentInClassStatus,
} from "../../../actions/CommonAction";
import {sendWebsocketRequest} from "../../../helper/WebSocketHelper";
import {CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS} from "../../../constants/CommonConstants";
import TeacherStudentVideoCallComponent from "../../desktop/TeacherComponent/TeacherStudentVideoCallComponent";

export default function TeacherDashboardMobile() {
    const teacherAllClassesList = useSelector((state) => state.teacherAllClassesList);
    const teacherAllTodayClassesList = useSelector((state) => state.teacherAllTodayClassesList);
    const teacherAllDemoClassesList = useSelector((state) => state.teacherAllDemoClassesList);
    const {userInfo} = useSelector((state) => state.userSignin);
    const [callLoading,setCallLoading] = React.useState(null);
    const dispatch = useDispatch();
    const inClassStatusTeacherStudent = useSelector((state) => state.inClassStatusTeacherStudent);
    const [usersInCall, setUsersInCall] = useState([]);

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


    const splitFrontName = (name)=>{
        let nameArray = name.trim().split(' ');
        return nameArray[0];
    }

    return (
        <>
            {(inClassStatusTeacherStudent === 'PREJOIN') ?
                <IonContent>
                    <div className={"main_container_app_section"}>
                        <div className={"name_tite_section"}>
                            Hey {splitFrontName(userInfo?.name)},
                            <div>Check your today's classes</div>
                        </div>
                        <div className={"main_subject_section_today_classes"}>
                            <h3>Today's Classes</h3>
                            <div className={"classes_main_section_div"}>
                                <div className={"demo_classes_main_section"}>
                                    {(teacherAllTodayClassesList?.loading) ?
                                        <FacebookLoader type={"facebookStyle"} item={4}/>
                                        : (teacherAllTodayClassesList?.classData?.length) ?
                                            <div className={"demo_classes_main_section_div"}>
                                                {(teacherAllTodayClassesList?.classData?.map((myClasses,key)=>(
                                                    <div key={key} className={"demo_classes_section_loop"}>
                                                        <div className={"row"}>
                                                            <div className={"col-7 demo_classes_section_subject_icon_name"}>
                                                                <div className={"icon_sub"} style={{background:_getIconBySubjectKey(myClasses?.subject_name).color}}>
                                                                    {_getIconBySubjectKey(myClasses?.subject_name).icon}
                                                                </div>
                                                                <div className={"name_section"}>
                                                                    <div className={"name_section1"}>{myClasses?.subject_name}</div>
                                                                    <div className={"name_section2"}>{myClasses?.class_batch_name}</div>
                                                                </div>
                                                            </div>
                                                            <div className={"col-5"}>
                                                                {(myClasses?.class_end_date_time) ?
                                                                    <>
                                                                        <div className={"class_time_date_demo mb-3"}>
                                                                            Start time : {moment(myClasses?.start_from_date_time).format('hh:mm a')}
                                                                        </div>
                                                                        <div className={"class_time_date_demo"}>
                                                                            Class Taken : {moment(myClasses?.class_end_date_time).format('hh:mm a')}
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <div className={"class_time_date_demo mb-3"}>
                                                                        Start time : {moment(myClasses?.start_from_date_time).format('hh:mm a')}
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className={"row"}>
                                                            <div className={"col-7 demo_classes_section_teacher_icon_name"}>
                                                                <div className={"teacher_detail_section"}>
                                                                    <div className={"teacher_font_icon"}>
                                                                        <i className={"fa fa-info-circle"}/>
                                                                    </div>
                                                                    <div className={"teacher_name_section"}>
                                                                        {myClasses?.student_class}th (Student class)
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={"col-5"}>
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
                            <h3>Demo Classes</h3>
                            <div className={"classes_main_section_div"}>
                                <div className={"demo_classes_main_section"}>
                                    {(teacherAllDemoClassesList?.loading) ?
                                        <FacebookLoader type={"facebookStyle"} item={4}/>
                                        : (teacherAllDemoClassesList?.classData?.length) ?
                                            <div className={"demo_classes_main_section_div"}>
                                                {(teacherAllDemoClassesList?.classData?.map((myClasses,key)=>(
                                                    <div key={key} className={"demo_classes_section_loop"}>
                                                        <div className={"row"}>
                                                            <div className={"col-7 demo_classes_section_subject_icon_name"}>
                                                                <div className={"icon_sub"} style={{background:_getIconBySubjectKey(myClasses?.subject_name).color}}>
                                                                    {_getIconBySubjectKey(myClasses?.subject_name).icon}
                                                                </div>
                                                                <div className={"name_section"}>
                                                                    <div className={"name_section1"}>{myClasses?.subject_name}</div>
                                                                    <div className={"name_section2"}>{myClasses?.class_batch_name}</div>
                                                                </div>
                                                            </div>
                                                            <div className={"col-5"}>
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
                                                            <div className={"col-7 demo_classes_section_teacher_icon_name"}>
                                                                <div className={"teacher_detail_section"}>
                                                                    <div className={"teacher_font_icon"}>
                                                                        <i className={"fa fa-info-circle"}/>
                                                                    </div>
                                                                    <div className={"teacher_name_section"}>
                                                                        {myClasses?.student_class}th (Student class)
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={"col-5"}>
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
                                                )))}
                                            </div>
                                            :
                                            <div className={"no_demo_classes_div_section"}>
                                                <img alt={"no_demo_classes"} src={noClassFound}/><br></br>
                                                Demo class is not assigned you you yet, we will notify you when it will scheduled.
                                            </div>
                                    }
                                </div>
                            </div>
                            <h3>Your Classes</h3>
                            <div className={"mt-15 demo_classes_main_section your_classes"}>
                                {(teacherAllClassesList?.loading) ?
                                    <FacebookLoader type={"facebookStyle"} item={2}/>
                                    : (teacherAllClassesList?.classData?.length) ?
                                        <div className={"class_data_main_table_section"}>
                                            <div className={"row class_list_table header_row mb-15"}>
                                                <div className={"col header"}>
                                                    Subject name
                                                </div>
                                                <div className={"col header"}>
                                                    Batch type
                                                </div>
                                                <div className={"col header"}>
                                                    Batch name
                                                </div>
                                            </div>
                                            {(teacherAllClassesList?.classData?.map((myClasses,key)=>(
                                                <div key={key} className={"row class_list_table mb-15"}>
                                                    <div className={"col icon_main_col"}>
                                                        <div className={"icon_setion"} style={{background:_getIconBySubjectKey(myClasses?.subject_name).color}}>
                                                            {_getIconBySubjectKey(myClasses?.subject_name).icon}
                                                        </div>
                                                        <div className={"name_section"}>
                                                            {myClasses?.subject_name}
                                                        </div>
                                                    </div>
                                                    <div className={"col body"}>
                                                        {myClasses?.batch === 1 ? '1 to 1' : (myClasses?.batch === 2) ? '1 to 3' :(myClasses?.batch === 3) ? '1 to 5' : ''}
                                                    </div>
                                                    <div className={"col body"}>
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
                </IonContent>
                :
                <TeacherStudentVideoCallComponent isTeacher={true} classId={callLoading} users={usersInCall} setUsers={setUsersInCall}/>

            }
        </>
    )
}
