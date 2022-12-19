import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import noClassFound from "../../../theme/images/chose/no_classes_found.png";
import {FacebookLoader} from "../../Loader/FacebookLoader";
import {_generateUniqueId, _getIconBySubjectKey, _getTodayTomorrowDateFormat} from "../../../helper/CommonHelper";
import {
    addCallSubscriptionEvents, addVideoStream, connectToNewUser, myPeer, myStream, removeClosePeerConnection,
    setMyPeer,
    setMyPeerConnectionId,
    setMyStream
} from "../../../helper/CallModuleHelper";
import {sendWebsocketRequest} from "../../../helper/WebSocketHelper";
import Peer from 'peerjs';
import TeacherStudentVideoCallComponent from "../TeacherComponent/TeacherStudentVideoCallComponent";
import StudentPayForSubscriptionComponent from "./StudentPayForSubscriptionComponent";
import moment from "moment";
import {cloneDeep} from "lodash";
import StarRatingOnEndCallComponent from "./StarRatingOnEndCallComponent";
import {actionToUpdateAttendanceClassStatus} from "../../../actions/CommonAction";

const iceServers= [
    {
        urls: "stun:openrelay.metered.ca:80",
    },
    {
        urls: "turn:openrelay.metered.ca:80",
        username: "openrelayproject",
        credential: "openrelayproject",
    },
    {
        urls: "turn:openrelay.metered.ca:443",
        username: "openrelayproject",
        credential: "openrelayproject",
    },
    {
        urls: "turn:openrelay.metered.ca:443?transport=tcp",
        username: "openrelayproject",
        credential: "openrelayproject",
    },
];


export default function StudentTodayClassesComponent(){
    const {loading,classData} = useSelector((state) => state.studentAllClassesList);
    const studentAllTodayClassList = useSelector((state) => state.studentAllTodayClassList);
    const openCloseTeacherRatingPopup = useSelector((state) => state.openCloseTeacherRatingPopup);
    const [inCallStatus,setInCallStatus] = React.useState('PREJOIN');
    const chatModuleCurrentCallGroupData = useSelector((state) => state.chatModuleCurrentCallGroupData);
    const chatModuleNewUserAddedInCurrentCall = useSelector((state) => state.chatModuleNewUserAddedInCurrentCall);
    const chatModuleNewUserLeaveUserInCallData = useSelector((state) => state.chatModuleNewUserLeaveUserInCallData);
    const dispatch = useDispatch();

    const ignoreIncomingCall = ()=>{
        //dispatch(actionToRemoveDataFromIncomingCall({}));
    }


    const pickCallInGroup = (e,myClasses,groupData)=>{
        e.preventDefault();
        let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator);

        if(getUserMedia) {
            getUserMedia({
                    audio: true,
                    video: true
                },
                function(stream){
                    setInCallStatus('JOINING');
                    let memberData = cloneDeep(myClasses);
                    memberData.id = classData?.id;
                    memberData.name = classData?.name;
                    memberData.peer_connection_id = 'student_'+_generateUniqueId()+'_'+classData?.id;
                    memberData.audio = true;

                    setMyPeerConnectionId(memberData.peer_connection_id);

                    let myPeer = new Peer(memberData.peer_connection_id, {
                        host: 'apnafinances.com',
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
                        dispatch(actionToUpdateAttendanceClassStatus(classData,myClasses,groupData?.id))
                        sendWebsocketRequest(JSON.stringify({
                            clientId: localStorage.getItem('clientId'),
                            groupId: groupData?.id,
                            memberData: memberData,
                            type: "addNewMemberDataInGroup"
                        }));

                        myPeer.on('call', call => {
                            console.log('[PEER JS INCOMING CALL]', call);
                            call.answer(stream);
                            addCallSubscriptionEvents(call);
                        })

                    })
                })
        }else {
            alert('Media Not Supported In Insecure Url');
        }
    }


    React.useEffect(()=>{
        if(chatModuleNewUserAddedInCurrentCall?.id !== undefined){
            connectToNewUser(chatModuleNewUserAddedInCurrentCall,myStream,myPeer);
        }
    },[chatModuleNewUserAddedInCurrentCall]);

    React.useEffect(()=>{
        if(chatModuleNewUserLeaveUserInCallData?.id != undefined){
            removeClosePeerConnection(chatModuleNewUserLeaveUserInCallData?.peer_connection_id);
        }
    },[chatModuleNewUserLeaveUserInCallData]);

    return(
        <>
            {(openCloseTeacherRatingPopup?.isOpen) ?
                <StarRatingOnEndCallComponent classCallData={openCloseTeacherRatingPopup?.dropdownData}/>
              :''
            }
            <div className={"student_demo_classes_main_page"}>
                {(classData?.taken_single_demo && !classData?.subscription_end_date) ?
                    <StudentPayForSubscriptionComponent/>
                    :
                    <>
                        {(inCallStatus === 'PREJOIN') ?
                            <>
                                <h2>Today Classes</h2>
                                <div className={"mt-15 demo_classes_main_section"}>
                                    {(loading) ?
                                        <FacebookLoader type={"facebookStyle"} item={2}/>
                                        : (studentAllTodayClassList?.length) ?
                                            <div className={"demo_classes_main_section_div"}>
                                                {(studentAllTodayClassList?.map((myClasses,key)=>(
                                                    <div key={key} className={"demo_classes_section_loop mr-30 mb-10 mt-10"}>
                                                        <div className={"row"}>
                                                            <div className={"col-7 demo_classes_section_subject_icon_name"}>
                                                                <div className={"icon_sub"} style={{background:_getIconBySubjectKey(myClasses?.subject_name).color}}>
                                                                    {_getIconBySubjectKey(myClasses?.subject_name).icon}
                                                                </div>
                                                                <div className={"name_section"}>
                                                                    <div className={"name_section1"}>{myClasses?.subject_name}</div>
                                                                    <div className={"name_section2"}>{classData?.school_board}</div>
                                                                </div>
                                                            </div>
                                                            <div className={"col-5"}>
                                                                {(myClasses?.classes_assigned_to_teacher?.class_end_time
                                                                    &&
                                                                    moment(myClasses?.classes_assigned_to_teacher?.class_end_time).format('YYYYMMDD') === moment().format('YYYYMMDD')
                                                                    &&
                                                                    moment(myClasses?.classes_assigned_to_teacher?.class_end_time).format('HH:mm:ss') < moment().format('HH:mm:ss')
                                                                ) ?
                                                                    <>
                                                                        <div className={"class_time_date_demo mb-3"}>
                                                                            Start time : {moment(new Date(myClasses?.classes_assigned_to_teacher?.starting_from_date)).format('hh:mm a')}
                                                                        </div>
                                                                        <div className={"class_time_date_demo"}>
                                                                            Class End : {moment(new Date(myClasses?.classes_assigned_to_teacher?.class_end_time)).format('hh:mm a')}
                                                                        </div>
                                                                    </>
                                                                    :
                                                                    <div className={"class_time_date_demo mb-3"}>
                                                                        Start time : {moment(new Date(myClasses?.classes_assigned_to_teacher?.starting_from_date)).format('hh:mm a')}
                                                                    </div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className={"row"}>
                                                            <div className={"col-8 demo_classes_section_teacher_icon_name"}>
                                                                <div className={"teacher_detail_section"}>
                                                                    <div className={"teacher_font_icon"}>
                                                                        <i className={"fa fa-info-circle"}/>
                                                                    </div>
                                                                    <div className={"teacher_name_section"}>
                                                                        {myClasses?.classes_assigned_to_teacher?.teacher_name} ({myClasses?.subject_name} Teacher)
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
                                                            <div data-id={myClasses?.id} data-cur-class={chatModuleCurrentCallGroupData?.id} className={"col-4"}>
                                                                {(chatModuleCurrentCallGroupData?.id === myClasses?.classes_assigned_to_teacher_id) ?
                                                                    <div
                                                                        onClick={(e) => pickCallInGroup(e,myClasses, chatModuleCurrentCallGroupData)}
                                                                        className={"take_demo_button"}>
                                                                        <button className={"theme_btn"}>Join Class</button>
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
                                <h2 className={"mt-30"}>Your Classes</h2>
                                <div className={"mt-15 demo_classes_main_section"}>
                                    {(loading) ?
                                        <FacebookLoader type={"facebookStyle"} item={2}/>
                                        : (classData?.profile_subject_with_batch?.length) ?
                                            <div className={"class_data_main_table_section"}>
                                                <div className={"row class_list_table header_row mb-15"}>
                                                    <div className={"col-3 header"}>
                                                        Subject name
                                                    </div>
                                                    <div className={"col-3 header"}>
                                                        Teacher Name
                                                    </div>
                                                    <div className={"col-3 header"}>
                                                        Start time
                                                    </div>
                                                    <div className={"col-3 header"}>
                                                        Subscription end date
                                                    </div>
                                                </div>
                                                {(classData?.profile_subject_with_batch?.map((myClasses,key)=>(
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
                                                            {myClasses?.classes_assigned_to_teacher?.teacher_name ? myClasses?.classes_assigned_to_teacher?.teacher_name : 'Not Assigned' }
                                                        </div>
                                                        <div className={"col-3 body"}>
                                                            {(myClasses?.classes_assigned_to_teacher?.starting_from_date) ?
                                                                <>
                                                                    {_getTodayTomorrowDateFormat(myClasses?.classes_assigned_to_teacher?.starting_from_date)},
                                                                    {moment(new Date(myClasses?.classes_assigned_to_teacher?.starting_from_date)).format('hh:mm a')}
                                                                </>
                                                                : 'Not confirm'
                                                            }
                                                        </div>
                                                        <div data-date={classData?.subscription_end_date} className={"col-3 body"}>
                                                            {(classData?.subscription_end_date) ?
                                                                <>
                                                                    {moment(new Date(classData?.subscription_end_date)).format('DD ddd MMM, YYYY')}
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
                                                Demo class is not assigned you you yet, we will notify you when it will scheduled.
                                            </div>
                                    }
                                </div>
                            </>
                            :
                            <TeacherStudentVideoCallComponent setInCallStatus={setInCallStatus} inCallStatus={inCallStatus}/>
                        }
                    </>
                }
            </div>
        </>
    )
}