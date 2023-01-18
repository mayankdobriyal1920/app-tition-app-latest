import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {FacebookLoader} from "../../Loader/FacebookLoader";
import {_generateUniqueId, _getIconBySubjectKey, _getTodayTomorrowDateFormat} from "../../../helper/CommonHelper";
import noClassFound from "../../../theme/images/chose/no_classes_found.png";
import {StudentDashHeaderComponent} from "../StudentComponent/StudentDashHeaderComponent";
import moment from "moment";
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
    actionToSendVideoChunkDataToServer, actionToSendVideoChunkDataToServerFinishProcess,
    actionToSetCurrentCallDataGroupData
} from "../../../actions/CommonAction";
import TeacherStudentVideoCallComponent from "./TeacherStudentVideoCallComponent";
import {
    CHAT_MODULE_CURRENT_CALL_ALL_MEMBERS,
    CHAT_MODULE_CURRENT_CALL_GROUP_DATA
} from "../../../constants/CommonConstants";
import {cloneDeep} from "lodash";

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
let currentClassId = null;
function TeacherMainDesktopDashboardComponentFunction(){
    const chatModuleNewUserAddedInCurrentCall = useSelector((state) => state.chatModuleNewUserAddedInCurrentCall);
    const {loading,classData} = useSelector((state) => state.teacherAllClassesList);
    const {userInfo} = useSelector((state) => state.userSignin);
    const [callLoading,setCallLoading] = React.useState(false);
    const [inCallStatus,setInCallStatus] = React.useState('PREJOIN');
    const teacherAllDemoClassList = useSelector((state) => state.teacherAllDemoClassList);
    const dispatch = useDispatch();

    const callFunctionToExportRecordedVideo = ()=>{
        dispatch(actionToSendVideoChunkDataToServerFinishProcess(currentClassId));
        dispatch(actionToRemoveCurrentGroupCallData());
    }

    const callFunctionToUploadDataChunk =  (chunks)=>{
        function sendBlobAsBase64(blob) {
            const reader = new FileReader();

            reader.addEventListener('load', () => {
                const dataUrl = reader.result;
                const base64EncodedData = dataUrl.split(',')[1];
                sendDataToBackend(base64EncodedData);
            });

            reader.readAsDataURL(blob);
        }

        sendBlobAsBase64(chunks);

        function sendDataToBackend(base64EncodedData) {
            const body = JSON.stringify({
                data: base64EncodedData,
                groupId:currentClassId,
            });
            dispatch(actionToSendVideoChunkDataToServer(body));
        }
    }
    const startCallInGroup = (e,classGroupData)=>{
        e.preventDefault();
        if(!navigator?.mediaDevices?.getDisplayMedia){
            alert('Sorry!!! screen recording is not support on your device please try in WINDOWS and MACOS');
            return false;
        }
        let getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia).bind(navigator);
        if(getUserMedia) {
            getUserMedia({
                    audio: true,
                    video: true
                },
                function(stream){
                    navigator.mediaDevices.getDisplayMedia({preferCurrentTab:true})
                        .then(recordStream => {
                            if (callLoading) return;
                            setCallLoading(true);

                            setInCallStatus('JOINING');

                            let memberData = cloneDeep(userInfo);
                            memberData.id = classGroupData?.id;
                            memberData.peer_connection_id = 'teacher_' + _generateUniqueId()+'_'+classGroupData?.id;
                            memberData.mute = false;
                            memberData.isTeacher = true;

                            let myPeer = new Peer(memberData.peer_connection_id, {
                                host: 'apnafinances.com',
                                secure: true,
                                config: {'iceServers': iceServers},
                                path: '/peerApp',
                            });
                            setMyPeerConnectionId(memberData.peer_connection_id);
                            setMyPeer(myPeer);
                            currentClassId = cloneDeep(classGroupData?.id);

                            dispatch(actionToSetCurrentCallDataGroupData(classGroupData));
                            console.log('[ PEER JS CONNECTION INSTANCE ]', myPeer,memberData.peer_connection_id);

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
                                            setCallLoading(false);
                                            setInCallStatus('INCALL');
                                        },1000)

                                        myPeer.on('call', call => {
                                            console.log('[PEER JS INCOMMING CALL]', call);
                                            call.answer(stream);
                                            addCallSubscriptionEvents(call);
                                        })
                                    })
                            })


                            const mediaSource = new MediaSource();
                            mediaSource.addEventListener('sourceopen', handleSourceOpen, false);
                            let sourceBuffer;

                            function handleSourceOpen(event) {
                                sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8"');
                            }

                            ////// record current call //////////
                            const chunks = [];
                            let options = { mimeType: 'video/webm;codecs=vp9' };
                            const recorder = new MediaRecorder(recordStream,options);
                            recorder.ondataavailable = (e) => {
                                callFunctionToUploadDataChunk(e.data);
                                chunks.push(e.data);
                            }
                            recorder.onstop = e => callFunctionToExportRecordedVideo(new Blob(chunks));
                            recorder.start(5000);
                            setMyMediaRecorder(recorder);
                            setMyShareScreenStream(recordStream);
                        }, error => {
                            console.log("Unable to acquire screen capture", error);
                        });
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
            {(inCallStatus === 'PREJOIN') ?
                <>
                <StudentDashHeaderComponent type={"StudentMainDesktopDashboardComponent"}/>
                <div className={"student_dash_all_courses_main_section mt-60"}>
                    <div className={"student_demo_classes_main_page"}>
                        <h2>Today's Classes</h2>
                        <div className={"mt-15 demo_classes_main_section"}>
                            {(loading) ?
                                <FacebookLoader type={"facebookStyle"} item={2}/>
                                : (teacherAllDemoClassList?.length) ?
                                    <div className={"demo_classes_main_section_div"}>
                                        {(teacherAllDemoClassList?.map((myClasses,key)=>(
                                            <div key={key} className={"demo_classes_section_loop mr-30 mb-10 mt-10"}>
                                                <div className={"row"}>
                                                    <div className={"col demo_classes_section_subject_icon_name"}>
                                                        <div className={"icon_sub"} style={{background:_getIconBySubjectKey(myClasses?.subject_name).color}}>
                                                            {_getIconBySubjectKey(myClasses?.subject_name).icon}
                                                        </div>
                                                        <div className={"name_section"}>
                                                            <div className={"name_section1"}>{myClasses?.subject_name}</div>
                                                            <div className={"name_section2"}>{myClasses?.school_board}</div>
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
                                                                {myClasses?.is_demo_class ? 'YES' : 'NO'} (is demo class)
                                                            </div>
                                                        </div>
                                                        <div className={"teacher_detail_section"}>
                                                            <div className={"teacher_font_icon"}>
                                                                <i className={"fa fa-clapperboard"}/>
                                                            </div>
                                                            <div className={"teacher_name_section"}>
                                                                {myClasses?.student_class}th (Student class)
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={"row"}>
                                                    <div className={"col demo_classes_section_teacher_icon_name"}>
                                                        {(myClasses?.class_end_time
                                                            &&
                                                            moment(myClasses?.class_end_time).format('YYYYMMDD') === moment().format('YYYYMMDD')
                                                            &&
                                                            moment(myClasses?.class_end_time).format('HH:mm:ss') < moment().format('HH:mm:ss')
                                                        ) ?
                                                            <>
                                                                <div className={"class_time_date_demo mb-3"}>
                                                                    Start time : {moment(new Date(myClasses?.starting_from_date)).format('hh:mm a')}
                                                                </div>
                                                                <div className={"class_time_date_demo"}>
                                                                    Class Taken : {moment(new Date(myClasses?.class_end_time)).format('hh:mm a')}
                                                                </div>
                                                            </>
                                                            :
                                                            <div className={"class_time_date_demo mb-3"}>
                                                                Start time : {moment(new Date(myClasses?.starting_from_date)).format('hh:mm a')}
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                                <div className={"row"}>
                                                    <div className={"col demo_classes_section_teacher_icon_name"}>
                                                        <div>
                                                            {(myClasses?.class_end_time
                                                                &&
                                                                moment(myClasses?.class_end_time).format('YYYYMMDD') === moment().format('YYYYMMDD')
                                                                &&
                                                                moment(myClasses?.class_end_time).format('HH:mm:ss') < moment().format('HH:mm:ss')
                                                            ) ?
                                                                ''
                                                                :
                                                                <div onClick={(e)=>startCallInGroup(e,myClasses)} className={"take_demo_button"}>
                                                                    <button className={"theme_btn"}>Start Class</button>
                                                                </div>
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
                            {(loading) ?
                                <FacebookLoader type={"facebookStyle"} item={2}/>
                                : (classData?.length) ?
                                    <div className={"class_data_main_table_section"}>
                                        <div className={"row class_list_table header_row mb-15"}>
                                            <div className={"col-3 header"}>
                                                Subject name
                                            </div>
                                            <div className={"col-3 header"}>
                                                Batch type
                                            </div>
                                            <div className={"col-3 header"}>
                                                Start time
                                            </div>
                                        </div>
                                        {(classData?.map((myClasses,key)=>(
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
                                                    {(myClasses?.starting_from_date) ?
                                                        <>
                                                            {moment(new Date(myClasses?.starting_from_date)).format('ddd MMM D, hh:mm a')}
                                                        </>
                                                        : 'Not confirm'
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
                </>
                :
                <TeacherStudentVideoCallComponent inCallStatus={inCallStatus} setInCallStatus={setInCallStatus} isTeacher={true}/>
           }
        </div>
    )
}
export const TeacherMainDesktopDashboardComponent = React.memo(TeacherMainDesktopDashboardComponentFunction);
