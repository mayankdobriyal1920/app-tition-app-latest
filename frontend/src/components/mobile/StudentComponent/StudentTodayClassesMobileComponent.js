import React from "react";
import {IonContent} from "@ionic/react";
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
import StudentPayForSubscriptionComponent from "../../desktop/StudentComponent/StudentPayForSubscriptionComponent";
import TeacherStudentVideoCallMobileComponent from "../TeacherStudentVideoCallMobileComponent";
import StudentPayForSubscriptionMobileComponent from "./StudentPayForSubscriptionMobileComponent";
let allowOnce = true;
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

export default function StudentTodayClassesMobileComponent() {

    const {loading,classData} = useSelector((state) => state.studentAllClassesList);
    const studentAllTodayClassList = useSelector((state) => state.studentAllTodayClassList);
    const [inCallStatus,setInCallStatus] = React.useState('PREJOIN');
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
                        setTimeout(function(){
                            dispatch(actionToGetWhiteBoardPrevDataForGroupId(groupData?.id))
                        },1000)
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

    React.useEffect(()=>{
        if(classData.id && allowOnce){
            dispatch(actionToGetPrevCallOnGroupClass(classData))
            allowOnce = false;
        }
    },[classData]);

    const {userInfo} = useSelector((state) => state.userSignin);

    return (
        <>
            {(classData?.taken_single_demo && !classData?.subscription_end_date) ?
                <div className={"main_container_app_section"}>
                    <StudentPayForSubscriptionMobileComponent/>
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
                                        {(loading) ?
                                            <FacebookLoader type={"facebookStyle"} item={4}/>
                                            : (studentAllTodayClassList?.length) ?
                                                <div className={"demo_classes_main_section_div"}>
                                                    {(studentAllTodayClassList?.map((myClasses,key)=>(
                                                        <div key={key} className={"demo_classes_section_loop"}>
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
                                                                            <div className={"class_time_date_demo"}>
                                                                                Start time : {moment(new Date(myClasses?.classes_assigned_to_teacher?.starting_from_date)).format('hh:mm a')}
                                                                            </div>
                                                                            <div className={"class_time_date_demo"}>
                                                                                Class End : {moment(new Date(myClasses?.classes_assigned_to_teacher?.class_end_time)).format('hh:mm a')}
                                                                            </div>
                                                                        </>
                                                                        :
                                                                        <div className={"class_time_date_demo"}>
                                                                            Start time : {moment(new Date(myClasses?.classes_assigned_to_teacher?.starting_from_date)).format('hh:mm a')}
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
                                                                <div data-id={myClasses?.id} data-cur-class={chatModuleCurrentCallGroupData?.id} className={"col-5"}>
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
                                </div>
                                <h3>Your Classes</h3>
                                <div className={"mt-15 demo_classes_main_section your_classes"}>
                                    {(loading) ?
                                        <FacebookLoader type={"facebookStyle"} item={2}/>
                                        : (classData?.profile_subject_with_batch?.length) ?
                                            <div className={"class_data_main_table_section"}>
                                                <div className={"row class_list_table header_row mb-15"}>
                                                    <div className={"col-3 header"}>
                                                        Subject
                                                    </div>
                                                    <div className={"col-3 header"}>
                                                        Teacher
                                                    </div>
                                                    <div className={"col-3 header"}>
                                                        Time
                                                    </div>
                                                    <div className={"col-3 header"}>
                                                        Pack end
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
                                                            {myClasses?.classes_assigned_to_teacher?.teacher_name ? myClasses?.classes_assigned_to_teacher?.teacher_name :
                                                                'N/A' }
                                                        </div>
                                                        <div className={"col-3 body"}>
                                                            {(myClasses?.classes_assigned_to_teacher?.starting_from_date) ?
                                                                <>
                                                                    {moment(new Date(myClasses?.classes_assigned_to_teacher?.starting_from_date)).format('hh:mm a')}
                                                                </>
                                                                : 'N/A'
                                                            }
                                                        </div>
                                                        <div data-date={classData?.subscription_end_date} className={"col-3 body"}>
                                                            {(classData?.subscription_end_date) ?
                                                                <>
                                                                    {moment(new Date(classData?.subscription_end_date)).format('DD MMM YY')}
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
                                                Demo class is not assigned you you yet, we will notify you when it will scheduled.
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <TeacherStudentVideoCallMobileComponent setInCallStatus={setInCallStatus} inCallStatus={inCallStatus}/>
                    }
                </>
            }
        </>
    )
}
