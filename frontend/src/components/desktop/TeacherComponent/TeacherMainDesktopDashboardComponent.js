import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../../Loader/FacebookLoader";
import {_generateUniqueId, _getIconBySubjectKey} from "../../../helper/CommonHelper";
import noClassFound from "../../../theme/images/chose/no_classes_found.png";
import {StudentDashHeaderComponent} from "../StudentComponent/StudentDashHeaderComponent";
import moment from "moment";
import fixWebmDuration from 'webm-duration-fix';
import {
    addCallSubscriptionEvents,
    addVideoStream,
    connectToNewUser,
    myPeer,
    myStream,
    setMyMediaRecorder,
    setMyPeer,
    setMyPeerConnectionId, setMyShareScreenStream,
    setMyStream
} from "../../../helper/CallModuleHelper.js";
import {sendWebsocketRequest} from "../../../helper/WebSocketHelper";
import Peer from 'peerjs';
import {
    actionToRemoveCurrentGroupCallData,
    actionToSendVideoChunkDataToServerFinishProcess,
    actionToSetCurrentCallDataGroupData, actionToSetTeacherStudentInClassStatus
} from "../../../actions/CommonAction";
import TeacherStudentVideoCallComponent from "./TeacherStudentVideoCallComponent";
import {
    CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS,
} from "../../../constants/CommonConstants";
import {cloneDeep} from "lodash";
import {transformSdp} from "../../../helper/SdpTransformHelper";

const iceServers= [
    {
        urls: "stun:stun.l.google.com:19302",
    },
    {
        urls: "turn:121tuition.in:3478?transport=tcp",
        username: "121tuition",
        credential: "121tuition123",
    }, {
        urls: "turn:121tuition.in:3478",
        username: "121tuition",
        credential: "121tuition123",
    },
];

// const iceServers= [
//     {
//         urls: "stun:stun.relay.metered.ca:80",
//     },
//     {
//         urls: "turn:a.relay.metered.ca:80",
//         username: "81a9bd437713718412339ca3",
//         credential: "pwsLYC29rmjea4oo",
//     },
//     {
//         urls: "turn:a.relay.metered.ca:80?transport=tcp",
//         username: "81a9bd437713718412339ca3",
//         credential: "pwsLYC29rmjea4oo",
//     },
//     {
//         urls: "turn:a.relay.metered.ca:443",
//         username: "81a9bd437713718412339ca3",
//         credential: "pwsLYC29rmjea4oo",
//     },
//     {
//         urls: "turn:a.relay.metered.ca:443?transport=tcp",
//         username: "81a9bd437713718412339ca3",
//         credential: "pwsLYC29rmjea4oo",
//     },
// ];

let currentClassId = null;
let currentClassAssignedId = null;
function TeacherMainDesktopDashboardComponentFunction(){
    const chatModuleNewUserAddedInCurrentCall = useSelector((state) => state.chatModuleNewUserAddedInCurrentCall);
    const teacherAllClassesList = useSelector((state) => state.teacherAllClassesList);
    const teacherAllTodayClassesList = useSelector((state) => state.teacherAllTodayClassesList);
    const teacherAllDemoClassesList = useSelector((state) => state.teacherAllDemoClassesList);
    const inClassStatusTeacherStudent = useSelector((state) => state.inClassStatusTeacherStudent);
    const {userInfo} = useSelector((state) => state.userSignin);
    const [callLoading,setCallLoading] = React.useState(null);
    const dispatch = useDispatch();

    const callFunctionToExportRecordedVideo = async (chunks)=>{

        // const mimeType = 'video/webm;codecs=vp9';
        // const fixBlob = await fixWebmDuration(new Blob([...chunks], { type: mimeType }));
        //
        // const reader = new FileReader();
        // reader.readAsDataURL(fixBlob);
        // reader.onload = () => {
        //     const base64String = reader.result.split(',')[1];
        //     //dispatch(actionToSendVideoChunkDataToServerFinishProcess(currentClassAssignedId,base64String));
        // };
        dispatch(actionToRemoveCurrentGroupCallData());
    }

    const startCallInGroup = (e,classGroupData)=>{
        e.preventDefault();

        if (callLoading) return false;
        setCallLoading(classGroupData?.id);

        let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator);
        if(getUserMedia) {
            getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true,
                    },
                    video: {
                        width:320,
                        height:240,
                        frameRate:30,
                    }
                },
                function(stream){
                    // navigator.mediaDevices.getDisplayMedia({preferCurrentTab:true})
                    //     .then(recordStream => {
                            dispatch(actionToSetTeacherStudentInClassStatus('JOINING'));

                            let memberData = cloneDeep(userInfo);
                            memberData.id = classGroupData?.id;
                            memberData.peer_connection_id = 'teacher_' + _generateUniqueId()+'_'+classGroupData?.id;
                            memberData.mute = false;
                            memberData.isTeacher = true;

                            let myPeer = new Peer(memberData.peer_connection_id, {
                                host: '121tuition.in',
                                secure: true,
                                config: {'iceServers': iceServers},
                                path: '/peerApp',
                            });

                            setMyPeerConnectionId(memberData.peer_connection_id);
                            setMyPeer(myPeer);
                            currentClassId = cloneDeep(classGroupData?.id);
                            currentClassAssignedId = cloneDeep(classGroupData?.class_id);
                            console.log('classGroupData',classGroupData);

                            dispatch(actionToSetCurrentCallDataGroupData(classGroupData));
                            console.log('[ PEER JS CONNECTION INSTANCE ]', myPeer,memberData.peer_connection_id);

                           myPeer?.on('candidate', e => {
                               console.log('icecandidate ------- ',e);
                                if (!e.candidate) return;

                                // Display candidate string e.g
                                // candidate:842163049 1 udp 1677729535 XXX.XXX.XX.XXXX 58481 typ srflx raddr 0.0.0.0 rport 0 generation 0 ufrag sXP5 network-cost 999
                                console.log(e.candidate.candidate);

                                // If a srflx candidate was found, notify that the STUN server works!
                                if(e.candidate.type === "srflx"){
                                    console.log("The STUN server is reachable!");
                                    console.log(`   Your Public IP Address is: ${e.candidate.address}`);
                                }

                                // If a relay candidate was found, notify that the TURN server works!
                                if(e.candidate.type === "relay"){
                                    console.log("The TURN server is reachable !");
                                }
                            })

                            myPeer?.on('open', id => {
                                console.log('[PEER CONNECTION OPEN IN ID]', id);
                                console.log('[PEER CONNECTION USER MEDIA]', getUserMedia);
                                navigator.mediaDevices.enumerateDevices()
                                    .then(sourceInfos => {
                                        let audioSource = null;
                                        let videoSource = null;

                                        for (let i = 0; i !== sourceInfos.length; ++i) {
                                            let sourceInfo = sourceInfos[i];
                                            if (sourceInfo?.kind === 'audioinput') {
                                                audioSource = sourceInfo.deviceId;
                                            } else if (sourceInfo?.kind === 'videoinput') {
                                                videoSource = sourceInfo.deviceId;
                                                console.log(sourceInfo)
                                            }
                                        }
                                        setMyStream(stream);

                                        console.log('[PEER CONNECTION USER STREAM]', stream);
                                        let finalClassGroupData = classGroupData;
                                        finalClassGroupData.started_at = new Date().toISOString();
                                        let allMembersInCall = [memberData];
                                        finalClassGroupData.allMembers = allMembersInCall;
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

                                        sendWebsocketRequest(JSON.stringify({
                                            clientId: localStorage.getItem('clientId'),
                                            groupId: classGroupData?.id,
                                            classGroupData: finalClassGroupData,
                                            members: allMembersInCall,
                                            memberData: memberData,
                                            type: "startNewCallInGroupChannel"
                                        }));

                                        setTimeout(function(){
                                            addVideoStream(memberData.peer_connection_id, stream,true);
                                            setCallLoading(null);
                                            dispatch(actionToSetTeacherStudentInClassStatus('INCALL'));
                                        },1000)

                                        myPeer.on('call', call => {
                                            console.log('[PEER JS INCOMMING CALL]', call);
                                            call.answer(stream,{ sdpTransform: transformSdp });
                                            addCallSubscriptionEvents(call);
                                        })
                                    })
                            })

                            if(!classGroupData?.is_demo_class) {
                                ////// record current call //////////

                                try {
                                    const chunks = [];
                                    const mimeType = 'video/webm;codecs=vp9';

                                    const displayMediaStreamConstraints = {
                                        video: {
                                            displaySurface: 'monitor', // monitor, window, application, browser
                                            logicalSurface: true,
                                            cursor: 'always' // never, always, motion
                                        }
                                    }

                                    //////// RECORDING SCREEN ///////////
                                    let audioTrack, videoTrack, mediaStream;
                                    navigator.mediaDevices.getDisplayMedia(displayMediaStreamConstraints)
                                        .then(async displayStream => {
                                            [videoTrack] = displayStream.getVideoTracks();
                                            [audioTrack] = stream.getAudioTracks();
                                            mediaStream = new MediaStream([videoTrack, audioTrack]); // do stuff
                                            const recorder = new MediaRecorder(mediaStream, {mimeType});
                                            recorder.ondataavailable = (e) => {
                                                chunks.push(e.data);
                                            }
                                            recorder.onstop = e => callFunctionToExportRecordedVideo(chunks);
                                            recorder.start(1000);
                                            setMyMediaRecorder(recorder);
                                            setMyShareScreenStream(mediaStream);
                                    }).catch(console.error);
                                    //////// RECORDING SCREEN ///////////
                                } catch (e) {
                                    alert('SCREEN RECORDING NOT SUPPORTED BY YOUR BROWSER');
                                }
                            }
                        // }, error => {
                        //     console.log("Unable to acquire screen capture", error);
                        // });
                },function(er){
                  console.log(er);
                })
        }else{
            alert('Media Not Supported In Insecure Url');
        }
    }


    React.useEffect(()=>{
        if(chatModuleNewUserAddedInCurrentCall?.id){
            connectToNewUser(chatModuleNewUserAddedInCurrentCall,myStream,myPeer);
        }
    },[chatModuleNewUserAddedInCurrentCall]);

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
                                                                <div onClick={(e)=>startCallInGroup(e,myClasses)} className={"take_demo_button"}>
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
                                                                <div onClick={(e)=>startCallInGroup(e,myClasses)} className={"take_demo_button"}>
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
                <TeacherStudentVideoCallComponent isTeacher={true}/>
           }
        </div>
    )
}
export const TeacherMainDesktopDashboardComponent = React.memo(TeacherMainDesktopDashboardComponentFunction);
