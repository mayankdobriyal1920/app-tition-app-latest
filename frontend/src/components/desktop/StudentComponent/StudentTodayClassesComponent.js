import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import noClassFound from "../../../theme/images/chose/no_classes_found.png";
import {FacebookLoader} from "../../Loader/FacebookLoader";
import {_getIconBySubjectKey} from "../../../helper/CommonHelper";
import TeacherStudentVideoCallComponent from "../TeacherComponent/TeacherStudentVideoCallComponent";
import StudentPayForSubscriptionComponent from "./StudentPayForSubscriptionComponent";
import moment from "moment";
import StarRatingOnEndCallComponent from "./StarRatingOnEndCallComponent";
import {
    actionToGetPrevCallOnGroupClass,
    actionToGetWhiteBoardPrevDataForGroupId,
    actionToSetTeacherStudentInClassStatus,
    actionToUpdateAttendanceClassStatus
} from "../../../actions/CommonAction";
let allowOnce = true;


export default function StudentTodayClassesComponent(){
    const studentAllClassesList = useSelector((state) => state.studentAllClassesList);
    const allStudentDemoDataList = useSelector((state) => state.allStudentDemoDataList);
    const allStudentTodayDataList = useSelector((state) => state.allStudentTodayDataList);

    const openCloseTeacherRatingPopup = useSelector((state) => state.openCloseTeacherRatingPopup);
    const [callLoading,setCallLoading] = React.useState(null);
    const chatModuleCurrentCallGroupData = useSelector((state) => state.chatModuleCurrentCallGroupData);
    const dispatch = useDispatch();
    const inClassStatusTeacherStudent = useSelector((state) => state.inClassStatusTeacherStudent);
    const [usersInCall, setUsersInCall] = useState([]);

    const pickCallInGroupAgora = (e,myClasses,demoClass)=>{
        e.preventDefault();

        if (callLoading) return false;
        setCallLoading(myClasses?.id);

        dispatch(actionToSetTeacherStudentInClassStatus('JOINING'));
        dispatch(actionToUpdateAttendanceClassStatus(studentAllClassesList?.classData,myClasses,demoClass))
        setTimeout(function(){
            dispatch(actionToGetWhiteBoardPrevDataForGroupId(myClasses?.id))
        },1000)
    }


    React.useEffect(()=>{
        if(studentAllClassesList?.classData.id && allowOnce){
            dispatch(actionToGetPrevCallOnGroupClass(studentAllClassesList?.classData))
            allowOnce = false;
        }
    },[studentAllClassesList?.classData]);

    console.log('allStudentTodayDataList?.classData',allStudentTodayDataList?.classData);

    return(
        <>
            {(openCloseTeacherRatingPopup?.isOpen) ?
                <StarRatingOnEndCallComponent classCallData={openCloseTeacherRatingPopup?.dropdownData}/>
                :''
            }
            <div className={"student_demo_classes_main_page"}>
                {(studentAllClassesList?.classData?.taken_single_demo && !studentAllClassesList?.classData?.subscription_end_date) ?
                    <StudentPayForSubscriptionComponent isEnd={false}/>
                    :(studentAllClassesList?.classData?.taken_single_demo && moment(new Date(studentAllClassesList?.classData?.subscription_end_date)).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) ?
                        <StudentPayForSubscriptionComponent isEnd={true}/>
                        :
                        <>
                            {(inClassStatusTeacherStudent === 'PREJOIN') ?
                                <>
                                    <h2>Today Classes</h2>
                                    <div className={"mt-15 demo_classes_main_section"}>
                                        {(allStudentTodayDataList?.loading) ?
                                            <FacebookLoader type={"facebookStyle"} item={2}/>
                                            : (allStudentTodayDataList?.classData?.length) ?
                                                <div className={"demo_classes_main_section_div"}>
                                                    {(allStudentTodayDataList?.classData?.map((myClasses,key)=>(
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
                                                                            {myClasses?.teacher_name} ({myClasses?.subject_name} Teacher)
                                                                        </div>
                                                                    </div>
                                                                    <div className={"teacher_detail_section"}>
                                                                        <div className={"teacher_font_icon"}>
                                                                            <i className={"fa fa-clapperboard"}/>
                                                                        </div>
                                                                        <div className={"teacher_name_section"}>
                                                                            {myClasses?.batch === 1 ? '1 to 1' : (myClasses?.batch === 2) ? '1 to 3' :(myClasses?.batch === 3) ? '1 to 5' : ''} (Batch type)
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={"row"}>
                                                                <div className={"col demo_classes_section_teacher_icon_name"}>
                                                                    {(myClasses?.class_end_date_time) ?
                                                                        <>
                                                                            <div className={"class_time_date_demo"}>
                                                                                Start time : {moment(myClasses?.start_from_date_time).format('hh:mm a')}
                                                                            </div>
                                                                            <div className={"class_time_date_demo"}>
                                                                                Class End : {moment(myClasses?.class_end_date_time).format('hh:mm a')}
                                                                            </div>
                                                                        </>
                                                                        :
                                                                        <div className={"class_time_date_demo"}>
                                                                            Start time : {moment(myClasses?.start_from_date_time).format('hh:mm a')}
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className={"row"}>
                                                                <div className={"col demo_classes_section_teacher_icon_name"}>
                                                                    <div data-id={myClasses?.id} data-cur-class={chatModuleCurrentCallGroupData?.id}>
                                                                        {(chatModuleCurrentCallGroupData?.id === myClasses?.id) ?
                                                                            <div
                                                                                onClick={(e) => pickCallInGroupAgora(e,myClasses,false)}
                                                                                className={"take_demo_button"}>
                                                                                <button className={"theme_btn"}>
                                                                                    {callLoading === myClasses?.id ? 'Joining class...' :
                                                                                        'Join Class'}
                                                                                </button>
                                                                            </div>
                                                                            : ''
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
                                        {(allStudentDemoDataList?.loading) ?
                                            <FacebookLoader type={"facebookStyle"} item={2}/>
                                            : (allStudentDemoDataList?.classData?.length) ?
                                                <div className={"demo_classes_main_section_div"}>
                                                    {(allStudentDemoDataList?.classData?.map((myClasses,key)=>(
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
                                                                            {myClasses?.teacher_name} ({myClasses?.subject_name} Teacher)
                                                                        </div>
                                                                    </div>
                                                                    <div className={"teacher_detail_section"}>
                                                                        <div className={"teacher_font_icon"}>
                                                                            <i className={"fa fa-clapperboard"}/>
                                                                        </div>
                                                                        <div className={"teacher_name_section"}>
                                                                            {myClasses?.batch === 1 ? '1 to 1' : (myClasses?.batch === 2) ? '1 to 3' :(myClasses?.batch === 3) ? '1 to 5' : ''} (Batch type)
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className={"row"}>
                                                                <div className={"col demo_classes_section_teacher_icon_name"}>
                                                                    {(myClasses?.class_end_time) ?
                                                                        <>
                                                                            <div className={"class_time_date_demo"}>
                                                                                Start time : {moment(new Date(myClasses?.starting_from_date)).format('hh:mm a')}
                                                                            </div>
                                                                            <div className={"class_time_date_demo"}>
                                                                                Class End : {moment(new Date(myClasses?.class_end_time)).format('hh:mm a')}
                                                                            </div>
                                                                        </>
                                                                        :
                                                                        <div className={"class_time_date_demo"}>
                                                                            Start time : {moment(new Date(myClasses?.starting_from_date)).format('hh:mm a')}
                                                                        </div>
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className={"row"}>
                                                                <div className={"col demo_classes_section_teacher_icon_name"}>
                                                                    <div data-id={myClasses?.id} data-cur-class={chatModuleCurrentCallGroupData?.id}>
                                                                        {(chatModuleCurrentCallGroupData?.id === myClasses?.id) ?
                                                                            <div
                                                                                onClick={(e) => pickCallInGroupAgora(e,myClasses,true)}
                                                                                className={"take_demo_button"}>
                                                                                <button className={"theme_btn"}>
                                                                                    {callLoading === myClasses?.id ? 'Joining class...' :
                                                                                        'Join Class'}
                                                                                </button>
                                                                            </div>
                                                                            : ''
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
                                        {(studentAllClassesList?.loading) ?
                                            <FacebookLoader type={"facebookStyle"} item={2}/>
                                            : (studentAllClassesList?.classData?.profile_subject_with_batch?.length) ?
                                                <div className={"class_data_main_table_section"}>
                                                    <div className={"row class_list_table header_row mb-15"}>
                                                        <div className={"col header"}>
                                                            Subject
                                                        </div>
                                                        <div className={"col header"}>
                                                            Teacher
                                                        </div>
                                                        <div className={"col header"}>
                                                            Subscription
                                                        </div>
                                                    </div>
                                                    {(studentAllClassesList?.classData?.profile_subject_with_batch?.map((myClasses,key)=>(
                                                        <div key={key} className={"row class_list_table mb-15"}>
                                                            <div className={"col icon_main_col"}>
                                                                <div className={"icon_setion"} style={{background:_getIconBySubjectKey(myClasses?.subject_name).color}}>
                                                                    {_getIconBySubjectKey(myClasses?.subject_name).icon}
                                                                </div>
                                                                <div className={"name_section"}>
                                                                    {myClasses?.subject_name}
                                                                </div>
                                                            </div>
                                                            <div className={"col-3 body"}>
                                                                {myClasses?.class_assigned_teacher_batch?.teacher_name ? myClasses?.class_assigned_teacher_batch?.teacher_name : 'Not Assigned' }
                                                            </div>
                                                            <div data-date={studentAllClassesList?.classData?.subscription_end_date} className={"col body"}>
                                                                {(studentAllClassesList?.classData?.subscription_end_date) ?
                                                                    <>
                                                                        {moment(new Date(studentAllClassesList?.classData?.subscription_end_date)).format('DD ddd MMM, YYYY')}
                                                                    </>
                                                                    : 'No subscription'
                                                                }
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
                                </>
                                :
                                <TeacherStudentVideoCallComponent isTeacher={false} classId={callLoading} users={usersInCall} setUsers={setUsersInCall}/>

                            }
                        </>
                }
            </div>
        </>
    )
}