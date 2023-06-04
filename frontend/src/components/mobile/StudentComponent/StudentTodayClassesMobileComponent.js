import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../../Loader/FacebookLoader";
import {_generateUniqueId, _getIconBySubjectKey} from "../../../helper/CommonHelper";
import moment from "moment";
import noClassFound from "../../../theme/images/chose/no_classes_found.png";

import {
    addCallSubscriptionEvents,
    addVideoStream, connectToNewUser, myPeer, myStream, removeClosePeerConnection,
    setMyPeer,
    setMyPeerConnectionId,
    setMyStream
} from "../../../helper/CallModuleHelper";
import Peer from "peerjs";
import {
    actionToGetPrevCallOnGroupClass,
    actionToGetWhiteBoardPrevDataForGroupId,
    actionToUpdateAttendanceClassStatus
} from "../../../actions/CommonAction";
import {sendWebsocketRequest} from "../../../helper/WebSocketHelper";
import {cloneDeep} from "lodash";
import StudentPayForSubscriptionMobileComponent from "./StudentPayForSubscriptionMobileComponent";
import TeacherStudentVideoCallComponent from "../../desktop/TeacherComponent/TeacherStudentVideoCallComponent";
let allowOnce = true;
const iceServers= [
    {
        urls: "stun:stun.l.google.com:19302",
    },
    {
        urls: "turn:121tuition.in:3478?transport=tcp",
        username: "121tuition",
        credential: "121tuition123",
    },
    {
        urls: "turn:121tuition.in:5349?transport=tcp",
        username: "121tuition",
        credential: "121tuition123",
    },
];

export default function StudentTodayClassesMobileComponent() {

    const studentAllClassesList = useSelector((state) => state.studentAllClassesList);
    const allStudentDemoDataList = useSelector((state) => state.allStudentDemoDataList);
    const allStudentTodayDataList = useSelector((state) => state.allStudentTodayDataList);
    const [inCallStatus,setInCallStatus] = React.useState('PREJOIN');
    const [callLoading,setCallLoading] = React.useState(null);
    const chatModuleCurrentCallGroupData = useSelector((state) => state.chatModuleCurrentCallGroupData);
    const chatModuleNewUserAddedInCurrentCall = useSelector((state) => state.chatModuleNewUserAddedInCurrentCall);
    const chatModuleNewUserLeaveUserInCallData = useSelector((state) => state.chatModuleNewUserLeaveUserInCallData);
    const dispatch = useDispatch();


    const splitFrontName = (name)=>{
        let nameArray = name.trim().split(' ');
        return nameArray[0];
    }

    const ignoreIncomingCall = ()=>{
        //dispatch(actionToRemoveDataFromIncomingCall({}));
    }

    const pickCallInGroup = (e,myClasses)=>{
        e.preventDefault();

        if (callLoading) return false;
        setCallLoading(myClasses?.id);
        let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator);
        if(getUserMedia) {
            getUserMedia({
                    audio: true,
                    video: true
                },
                function(stream){
                    setInCallStatus('JOINING');
                    let memberData = cloneDeep(myClasses);
                    memberData.id = myClasses?.id;
                    //// Member profile name
                    memberData.name = studentAllClassesList?.classData?.name;
                    /// Student profile id
                    memberData.peer_connection_id = 'student_'+_generateUniqueId()+'_'+studentAllClassesList?.classData?.id;
                    memberData.mute = true;

                    setMyPeerConnectionId(memberData.peer_connection_id);

                    let myPeer = new Peer(memberData.peer_connection_id, {
                        host: '121tuition.in',
                        secure: true,
                        config: {'iceServers': iceServers},
                        path: '/peerApp',
                    });

                    setMyPeer(myPeer);
                    console.log('[PEER CONNECTION USER STREAM]', stream);
                    setTimeout(function() {
                        addVideoStream(memberData.peer_connection_id, stream,true)
                    })

                    console.log('[ PEER JS CONNECTION INSTANCE ]',myPeer)

                    myPeer?.on('open', id => {
                        console.log('[PEER CONNECTION OPEN IN ID]', id);
                        setMyStream(stream);
                        setInCallStatus('INCALL');
                        dispatch(actionToUpdateAttendanceClassStatus(studentAllClassesList?.classData,myClasses))
                        setTimeout(function(){
                            setCallLoading(null);
                            dispatch(actionToGetWhiteBoardPrevDataForGroupId(myClasses?.id))
                        },1000)
                        sendWebsocketRequest(JSON.stringify({
                            clientId: localStorage.getItem('clientId'),
                            groupId: myClasses?.id,
                            memberData: memberData,
                            type: "addNewMemberDataInGroup"
                        }));
                        myPeer.on('call', call => {
                            console.log('[PEER JS INCOMING CALL]', call);
                            call.answer(stream);
                            addCallSubscriptionEvents(call);
                        })
                    })
                },function(er){
                    console.log(er);
                })
        }else {
            alert('Media Not Supported In Insecure Url');
        }
    }

    React.useEffect(()=>{
        if(chatModuleNewUserAddedInCurrentCall?.id){
            connectToNewUser(chatModuleNewUserAddedInCurrentCall,myStream,myPeer);
        }
    },[chatModuleNewUserAddedInCurrentCall]);

    React.useEffect(()=>{
        if(chatModuleNewUserLeaveUserInCallData?.id){
            removeClosePeerConnection(chatModuleNewUserLeaveUserInCallData?.peer_connection_id);
        }
    },[chatModuleNewUserLeaveUserInCallData]);

    React.useEffect(()=>{
        if(studentAllClassesList?.classData.id && allowOnce){
            dispatch(actionToGetPrevCallOnGroupClass(studentAllClassesList?.classData))
            allowOnce = false;
        }
    },[studentAllClassesList?.classData]);

    const {userInfo} = useSelector((state) => state.userSignin);

    return (
        <>
            {(studentAllClassesList?.classData?.taken_single_demo && !studentAllClassesList?.classData?.subscription_end_date) ?
                <div className={"main_container_app_section"}>
                    <StudentPayForSubscriptionMobileComponent isEnd={false}/>
                </div>
                :(studentAllClassesList?.classData?.taken_single_demo && moment(new Date(studentAllClassesList?.classData?.subscription_end_date)).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) ?
                    <div className={"main_container_app_section"}>
                        <StudentPayForSubscriptionMobileComponent isEnd={true}/>
                    </div>
                    :
                    <>
                        {(inCallStatus === 'PREJOIN') ?
                            <div className={"main_container_app_section"}>
                                <div className={"name_tite_section"}>
                                    Hey {splitFrontName(userInfo?.name)},
                                    <div>Check your today's classes</div>
                                </div>
                                <div className={"main_subject_section_today_classes"}>
                                    <h3>Today's Classes</h3>
                                    <div className={"classes_main_section_div"}>
                                        <div className={"demo_classes_main_section"}>
                                            {(studentAllClassesList?.loading) ?
                                                <FacebookLoader type={"facebookStyle"} item={4}/>
                                                : (allStudentTodayDataList?.classData?.length) ?
                                                    <div className={"demo_classes_main_section_div"}>
                                                        {(allStudentTodayDataList?.classData?.map((myClasses,key)=>(
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
                                                                                <div className={"class_time_date_demo"}>
                                                                                    Start time : {moment(myClasses?.start_from_date_time).format('hh:mm a')}
                                                                                </div>
                                                                                <div className={"class_time_date_demo"}>
                                                                                    Class End : {moment(myClasses?.class_end_time).format('hh:mm a')}
                                                                                </div>
                                                                            </>
                                                                            :
                                                                            <div className={"class_time_date_demo"}>
                                                                                Start time : {moment(myClasses?.class_end_date_time).format('hh:mm a')}
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
                                                                    <div data-id={myClasses?.id} data-cur-class={chatModuleCurrentCallGroupData?.id} className={"col-5"}>
                                                                        {(chatModuleCurrentCallGroupData?.id === myClasses?.id) ?
                                                                            <div
                                                                                onClick={(e) => pickCallInGroup(e,myClasses)}
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
                                            {(allStudentDemoDataList?.loading) ?
                                                <FacebookLoader type={"facebookStyle"} item={4}/>
                                                : (allStudentDemoDataList?.classData?.length) ?
                                                    <div className={"demo_classes_main_section_div"}>
                                                        {(allStudentDemoDataList?.classData?.map((myClasses,key)=>(
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
                                                                                <div className={"class_time_date_demo"}>
                                                                                    Start time : {moment(myClasses?.starting_from_date).format('hh:mm a')}
                                                                                </div>
                                                                                <div className={"class_time_date_demo"}>
                                                                                    Class End : {moment(myClasses?.class_end_time).format('hh:mm a')}
                                                                                </div>
                                                                            </>
                                                                            :
                                                                            <div className={"class_time_date_demo"}>
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
                                                                                {myClasses?.class_assigned_teacher_batch?.teacher_name} ({myClasses?.subject_name} Teacher)
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
                                                                    <div data-id={myClasses?.id} data-cur-class={chatModuleCurrentCallGroupData?.id} className={"col-5"}>
                                                                        {(chatModuleCurrentCallGroupData?.id === myClasses?.id) ?
                                                                            <div
                                                                                onClick={(e) => pickCallInGroup(e,myClasses, chatModuleCurrentCallGroupData)}
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
                                                            Pack end
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
                                                            <div className={"col body"}>
                                                                {myClasses?.class_assigned_teacher_batch?.teacher_name ? myClasses?.class_assigned_teacher_batch?.teacher_name : 'N/A' }
                                                            </div>
                                                            <div data-date={studentAllClassesList?.classData?.subscription_end_date} className={"col body"}>
                                                                {(studentAllClassesList?.classData?.subscription_end_date) ?
                                                                    <>
                                                                        {moment(studentAllClassesList?.classData?.subscription_end_date).format('DD ddd MMM')}
                                                                    </>
                                                                    : 'N/A'
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
                                </div>
                            </div>
                            :
                            <TeacherStudentVideoCallComponent setInCallStatus={setInCallStatus} inCallStatus={inCallStatus}/>
                        }
                    </>
            }
        </>
    )
}
