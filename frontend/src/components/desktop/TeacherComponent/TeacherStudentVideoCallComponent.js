import React,{useState,useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import WhiteboardComponent from "../WhiteboardComponent";
import { AgoraVideoPlayer } from "agora-rtc-react";
import moment from "moment";
import {_generateUniqueId, _readableTimeFromSeconds} from "../../../helper/CommonHelper";
import SpinnerLoader from "../../Loader/SpinnerLoader";
import jsPDF from "jspdf";
import AgoraRTM from 'agora-rtm-sdk';
import {
    actionToEndCurrentCurrentCall,
    actionToMuteUnmuteUserCall, actionToSendVideoChunkDataToServer, actionToSendVideoChunkDataToServerFinishProcess,
    actionToSetTeacherStudentInClassStatus,
    actionToSetTeacherZoomInOut,
    actionToStoreAssignmentDataForTeacher,
} from "../../../actions/CommonAction";
import {useEffectOnce} from "../../../helper/UseEffectOnce";
import axios from "axios";
import {isTeacherMasterLogin} from "../../../middlewear/auth";
import {IonAlert} from "@ionic/react";

import {
    config,
    useClient,
    useMicrophoneAndCameraTracks,
} from "../../../helper/settings";

let loadOnce = false;
let canvasReservedJson = [];
let allImagesUrlArray = [];
let maxTimeInterval = 3600;
let myUid = null;
let channel = null;
let userAudio = [];

function generateRandom6DigitString() {
    // Generate a random integer between 0 and 999999
    const randomInteger = Math.floor(Math.random() * 1000000);

    // Convert the integer to a string and pad it with leading zeros if necessary
    return randomInteger.toString().padStart(6, '0');
}
let myUserIdRTM = generateRandom6DigitString();
export default function TeacherStudentVideoCallComponent({isTeacher,classId,users,setUsers}){
    const chatModuleCurrentCallGroupData = useSelector((state) => state.chatModuleCurrentCallGroupData);
    const inClassStatusTeacherStudent = useSelector((state) => state.inClassStatusTeacherStudent);
    const zoomInZoomOutTeacherVideo = useSelector((state) => state.zoomInZoomOutTeacherVideo);
    const studentAllClassesList = useSelector((state) => state.studentAllClassesList);
    const userInfo = useSelector((state) => state.userSignin.userInfo);
    let [timerTimeInterval,setTimerTimeInterval] = useState(0);
    let [isPortraitMode,setIsPortraitMode] = useState(false);
    let [showExtendClassAlert,setShowExtendClassAlert] = useState(false);
    const dispatch = useDispatch();
    let [isMutedCall,setIsMutedCall] = useState(false);
    const rtmClient = AgoraRTM.createInstance(config.appId);
    const mediaStreamRef = React.useRef(null);
    const [mediaRecorder, setMediaRecorder] = useState(null);

    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();

    useEffect(() => {
        let init = async (name) => {
            let uid = `${isTeacher ? 'teacher' : 'student'}_${_generateUniqueId()}_${userInfo.id}`;
            myUid = uid;

            rtmClient.login({ uid: myUserIdRTM })
                .then(async () => {
                    channel = rtmClient.createChannel('mute_channel');
                    await channel.join();
                    channel.on('ChannelMessage', async ({text}) => {
                        let jsDataM = JSON.parse(text);
                        let {action,id} = jsDataM;
                        let senderId = id;
                        if (senderId !== uid) {
                            if(action === 'mute_audio'){
                                userAudio?.map((user)=>{
                                    if(user.uid === senderId)
                                        user.audioTrack.stop();
                                })
                            }else if(action === 'unmute_audio'){
                                userAudio?.map((user)=>{
                                    if(user.uid === senderId)
                                        user.audioTrack.play();
                                })
                            }
                        }
                    })
                })
                .catch((error) => {
                    console.error('RTM login error:', error);
                });


            client.on("user-published", async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === "video") {
                    setUsers((prevUsers) => {
                        return [...prevUsers, user];
                    });
                }
                if (mediaType === "audio") {
                    user.audioTrack.play();
                    userAudio.push(user);
                }
            });

            client.on("user-unpublished", (user, mediaType) => {
                if (mediaType === "audio") {
                    if (user.audioTrack) user.audioTrack.stop();
                }
                if (mediaType === "video") {
                    setUsers((prevUsers) => {
                        return prevUsers.filter((User) => User.uid !== user.uid);
                    });
                }
            });

            client.on("user-left", (user) => {
                setUsers((prevUsers) => {
                    return prevUsers.filter((User) => User.uid !== user.uid);
                });
            });

            try {
                await client.join(config.appId, name, config.token, uid);
            } catch (error) {
                console.log("error");
            }

            if (tracks) await client.publish([tracks[0], tracks[1]]);
            dispatch(actionToSetTeacherStudentInClassStatus('INCALL'));
        };

        if (ready && tracks) {
            try {
                init(classId.toLowerCase().split('-')[0]);
            } catch (error) {
                console.log(error);
            }
        }
    }, [classId, client, ready, tracks]);

    useEffect(() => {
        if (isTeacherMasterLogin()) {
            const startRecording = async () => {
                try {
                    let startVideoCallTime = Date.now();

                    // Step 1: Capture screen (includes system audio)
                    const screenStream = await navigator.mediaDevices.getDisplayMedia({
                        video: { displaySurface: "browser" },
                        audio: false,
                        preferCurrentTab: true,
                    });

                    // Step 2: Capture mic audio (🔴 Ensure it's recorded but not played)
                    const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });

                    // Step 3: Capture Agora's audio track (Remote Users)
                    if (!tracks || tracks.length === 0 || !tracks[0]) {
                        console.error("Agora audio track is missing.");
                        return;
                    }
                    const agoraAudioTrack = tracks[0]; // Remote users' audio
                    const agoraStream = new MediaStream();
                    agoraStream.addTrack(agoraAudioTrack.getMediaStreamTrack());

                    // Step 4: **Combine All Streams (Screen + Mic + Agora Audio)**
                    const combinedStream = new MediaStream([
                        ...screenStream.getTracks(), // Screen + System Audio
                        ...micStream.getTracks(), // ✅ Mic (User's Voice)
                        ...agoraStream.getTracks(), // ✅ Agora (Remote Users' Voices)
                    ]);
                    mediaStreamRef.current = combinedStream;

                    // Step 5: Initialize MediaRecorder
                    const recorder = new MediaRecorder(combinedStream, { mimeType: "video/webm; codecs=vp8" });

                    let chunks = [];
                    recorder.ondataavailable = (event) => {
                        if (event.data.size > 0) {
                            chunks.push(event.data);

                            // Convert Blob to Base64
                            const reader = new FileReader();
                            reader.addEventListener('load', () => {
                                const result = reader.result;
                                if (result.startsWith("data:video/webm")) {
                                    const lastCommaIndex = result.lastIndexOf(",");
                                    const base64Data = result.substring(lastCommaIndex + 1);
                                    dispatch(actionToSendVideoChunkDataToServer({
                                        groupId: classId,
                                        data: base64Data,
                                    }));
                                } else {
                                    console.error("Invalid Base64 MIME Type!", result.substring(0, 50));
                                }
                            });
                            reader.readAsDataURL(event.data);
                        }
                    };

                    recorder.onstop = async () => {
                        if (chunks.length > 0) {
                            const duration = Date.now() - startVideoCallTime;
                            dispatch(actionToSendVideoChunkDataToServerFinishProcess(classId, duration));
                        }
                    };

                    recorder.start(1000);
                    setMediaRecorder(recorder);
                } catch (error) {
                    console.error("Error starting screen recording:", error);
                }
            };


            if (tracks) {
                startRecording();
            }

            return () => {
                if (mediaRecorder) {
                    mediaRecorder.stop();
                }
                if (mediaStreamRef.current) {
                    mediaStreamRef.current.getTracks().forEach((track) => track.stop());
                }
            };
        }
    }, [classId, tracks]);


    const endMyStreamTrackOnEndCall = async () => {
        dispatch(actionToSetTeacherStudentInClassStatus('PREJOIN'));

        try {
            // Ensure the client leaves and removes listeners
            await client.leave();
            client.removeAllListeners();
            console.log("Agora client left successfully.");
        } catch (error) {
            console.error("Error leaving Agora client:", error);
        }

        // Stop & close local tracks (audio + video)
        if (tracks && tracks.length > 0) {
            console.log("Stopping and closing local tracks:", tracks);
            try {
                for (let track of tracks) {
                    if (track) {
                        await track.setEnabled(false);
                        track.stop();
                        track.close();
                    }
                }
                console.log("Local tracks stopped and closed successfully.");
            } catch (error) {
                console.error("Error stopping/closing tracks:", error);
            }
        }

        // Leave RTM channel and logout
        if (channel) {
            try {
                await channel.leave();
                channel = null;
                console.log("RTM channel left successfully.");
            } catch (error) {
                console.error("Error leaving RTM channel:", error);
            }
        }

        if (rtmClient) {
            if (rtmClient._logined) {
                try {
                    await rtmClient.logout();
                    console.log("RTM client logged out successfully.");
                } catch (error) {
                    console.error("RTM logout error:", error);
                }
            }
        }

        if (mediaRecorder) {
            mediaRecorder.stop();
        }
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach((track) => track.stop());
        }
    }

    useEffect(()=>{
        if(isTeacher) {
            if (timerTimeInterval === maxTimeInterval) {
                setShowExtendClassAlert(true);
            }
        }
    },[timerTimeInterval])



    const handleMuteUnmuteInCall = async ()=>{
        if(!isMutedCall)
            await channel.sendMessage({ text: JSON.stringify({action:'mute_audio',id:myUid}), target: myUid});
        else
            await channel.sendMessage({ text: JSON.stringify({action:'unmute_audio',id:myUid}), target: myUid});
        if(isTeacher){
            dispatch(actionToMuteUnmuteUserCall(chatModuleCurrentCallGroupData?.id,chatModuleCurrentCallGroupData?.id));
        }else{
            dispatch(actionToMuteUnmuteUserCall(studentAllClassesList?.classData?.id,chatModuleCurrentCallGroupData?.id));
        }
        setIsMutedCall(!isMutedCall);
    }

    const makePdfOfCanvases = async ()=>{
        const canvas = window.fabricCanvas;
        const json = canvasReservedJson;
        async function makeallImage(){
            for (let v = 0; v < json.length; v++){
                convertImgToBase64(v, "jpg");
            }
            await generatePdfFromImages(allImagesUrlArray);
        }
        function convertImgToBase64(number){
            let tmpData = canvas.loadFromJSON(json[number]);
            toImg(tmpData);
        }
        function toImg(){
            let url = canvas.toDataURL();
            allImagesUrlArray.push(url);
        }
        makeallImage();
    }

    const generatePdfFromImages = (images) => {

            // Default export is A4 paper, portrait, using millimeters for units.
            const doc = new jsPDF();
            const width = doc.internal.pageSize.getWidth();
            const height = doc.internal.pageSize.getHeight();

            doc.deletePage(1);
            images.forEach((image) => {
                doc.addPage();
                doc.addImage(
                    image,
                    'jpeg',
                    0, 0,
                    width,
                    height
                );
            });

            // Creates a PDF and opens it in a new browser tab.
            const myBlob = doc.output("blob");
            let fileName = Date.now() + "_whiteboard_data.pdf";
            const myFile = new File([myBlob], fileName, {
                type: myBlob.type,
            });
            const data = new FormData();
            data.append("file", myFile, fileName);
            data.append("id", chatModuleCurrentCallGroupData?.class_id);

            axios.post('https://121tuition.in/api-call-tutor/uploadAssignmentApiCall', data)
                .then(res => {
                    dispatch(actionToStoreAssignmentDataForTeacher(fileName, fileName, chatModuleCurrentCallGroupData?.class_id))
                })
                .catch(err => {
                });

    };

    const zoomInZoomOutVideoPanel = async  ()=>{
        if(isTeacherMasterLogin()) {
            dispatch(actionToSetTeacherZoomInOut(chatModuleCurrentCallGroupData?.id));
        }
    }
    const endCallFunctionCall = async  (groupId,classId,startDateTime)=>{
        dispatch(actionToSetTeacherStudentInClassStatus('JOINING'));
        if(!chatModuleCurrentCallGroupData?.is_demo_class)
           await makePdfOfCanvases();
        endMyStreamTrackOnEndCall();
        setTimeout(function (){
            dispatch(actionToSetTeacherStudentInClassStatus('PREJOIN'));
            let startDate = moment(startDateTime).format('YYYY-MM-DD');
            dispatch(actionToEndCurrentCurrentCall(groupId,classId,startDate));
        })
    }
    const leaveCallFunctionCall = ()=>{
        endMyStreamTrackOnEndCall();
        dispatch(actionToSetTeacherStudentInClassStatus('PREJOIN'));
    }

    const closeConfirmPopupAndEndClass = ()=>{
        endCallFunctionCall(chatModuleCurrentCallGroupData?.batch_id,chatModuleCurrentCallGroupData?.id,chatModuleCurrentCallGroupData?.start_from_date_time);
        setShowExtendClassAlert(false);
    }

    const closeConfirmPopupAndExtendClass = ()=>{
        maxTimeInterval += 3600;
        setShowExtendClassAlert(false);
    }

    useEffectOnce(()=>{
        if(!loadOnce) {
            setInterval(() => {
                setTimerTimeInterval(timerTimeInterval++);
            }, 1000)
            loadOnce = true;
        }
    },[])

    useEffect(()=>{
        if(!chatModuleCurrentCallGroupData?.id){
            leaveCallFunctionCall();
        }
    },[chatModuleCurrentCallGroupData])

    useEffect(()=>{
        const windowResized = ()=>{
            if(window.innerHeight > window.innerWidth){
                setIsPortraitMode(true);
            }else{
                setIsPortraitMode(false);
            }
        }
        windowResized();
        window.addEventListener('resize', windowResized);
        return () => {
            window.removeEventListener('resize', windowResized)
        }
    },[])


    return(
        <div id={"teacher_video_class_container"} className={"video_call_white_board_main_container"}>
            <div style={{display:isPortraitMode ? 'flex' : 'none'}} className={"isPortraitMode_mode_popup"}>
                <p>
                    Please use landscape mode to enter in class
                </p>
            </div>
            <div style={{display:inClassStatusTeacherStudent === 'INCALL' ? 'flex' : 'none'}} className={"row teacher_video_class_container_inner_row"}>
                {/*//////////// TEACHER VIDEO CONTAINER /////////////*/}
                <div className={"col-3 side_my_video_with_details"}>
                    {/*Important div for call*/}
                    {(isTeacher) ?
                        <div id={"main_user_video_call_video_section"} className="main_user_video_call_video_section">
                            {(tracks?.length) ?
                                <AgoraVideoPlayer
                                    videoTrack={tracks[1]}
                                    onClick={() => zoomInZoomOutVideoPanel()}
                                    style={{height: "100%", width: "100%"}}
                                    className={'my_video_peer_connection ' + (zoomInZoomOutTeacherVideo ? 'zoom' : '')}
                                /> : ''
                            }
                            <div className={"call_ent_button_section"}>
                                {isMutedCall ?
                                    <button onClick={() => handleMuteUnmuteInCall()}
                                            className={"mute_call_button  mr-10"}>
                                        <svg fill={"#fff"} width={"24"} viewBox="0 0 16 16"
                                             xmlns="http://www.w3.org/2000/svg" className="bi bi-mic-mute-fill">
                                            <path
                                                d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3z"/>
                                            <path
                                                d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z"/>
                                        </svg>
                                    </button>
                                    :
                                    <button onClick={() => handleMuteUnmuteInCall()}
                                            className={"mute_call_button  mr-10"}>
                                        <svg fill={"#fff"} width={"24"} viewBox="0 0 20 20"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9 18v-1.06A8 8 0 0 1 2 9h2a6 6 0 1 0 12 0h2a8 8 0 0 1-7 7.94V18h3v2H6v-2h3zM6 4a4 4 0 1 1 8 0v5a4 4 0 1 1-8 0V4z"/>
                                        </svg>
                                    </button>
                                }
                                <button
                                    onClick={() => endCallFunctionCall(chatModuleCurrentCallGroupData?.batch_id, chatModuleCurrentCallGroupData?.id, chatModuleCurrentCallGroupData?.start_from_date_time)}
                                    className={"end_call_button"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill={"#fff"} width={"24"}
                                         viewBox="0 0 511.632 511.632">
                                        <path
                                            d="M504.965 376.246c-19.435-36.715-81.472-73.813-88.704-78.059-14.421-8.192-29.739-10.731-42.987-6.997-10.432 2.88-18.965 9.301-24.789 18.624-8.128 9.664-18.176 21.056-20.288 22.912-16.384 11.115-27.179 9.963-41.323-4.181-4.629-4.651-11.136-6.997-17.749-6.08-6.507.811-12.309 4.608-15.68 10.261l-42.389 71.509c-4.971 8.384-3.627 19.093 3.264 25.963 61.141 61.141 113.301 81.429 155.627 81.429 46.059 0 80.448-24.043 102.037-45.632l22.912-22.912c17.77-17.771 21.824-44.608 10.069-66.837zM96.506 303.559a21.22 21.22 0 0 0 10.88-2.987l71.488-42.411c5.675-3.349 9.493-9.152 10.304-15.68s-1.429-13.099-6.08-17.749c-14.336-14.336-15.403-24.747-4.757-40.533 2.411-2.859 13.803-12.949 23.488-21.056 9.301-5.824 15.723-14.357 18.624-24.789 3.669-13.312 1.195-28.587-7.147-43.2-4.117-7.019-41.216-69.056-77.931-88.491-22.186-11.734-49.087-7.702-66.837 10.069L45.626 39.644C4.197 81.073-46.235 169.649 81.424 297.308c4.096 4.117 9.557 6.251 15.082 6.251zm344.813-233.25c-8.341-8.341-21.824-8.341-30.165 0l-384 384c-8.341 8.341-8.341 21.824 0 30.165 4.16 4.16 9.621 6.251 15.083 6.251s10.923-2.091 15.083-6.251l384-384c8.34-8.341 8.34-21.824-.001-30.165z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        :
                        <React.Fragment>
                            {users.length > 0 &&
                                users.map((user) => {
                                    if (user.videoTrack && user.uid.indexOf('teacher') >= 0) {
                                        return (
                                            <div key={user.uid} id={"main_user_video_call_video_section"}
                                                 className="main_user_video_call_video_section">
                                                <AgoraVideoPlayer
                                                    videoTrack={user.videoTrack}
                                                    id={user.uid}
                                                    onClick={() => zoomInZoomOutVideoPanel()}
                                                    style={{height: "100%", width: "100%"}}
                                                    className={'my_video_peer_connection ' + (zoomInZoomOutTeacherVideo ? 'zoom' : '')}
                                                />
                                            </div>
                                        );
                                    } else return null;
                                })}
                        </React.Fragment>
                    }
                    {/*////////// CLASS INFORMATION ///////////*/}
                    <div className={"video_class_description mt-15"}>
                        <div className={"video_class_description_details"}>
                            <div className={"video_class_description_details_first_col"}>
                                <h1>Class
                                    of {chatModuleCurrentCallGroupData?.subject_name} ({_readableTimeFromSeconds(timerTimeInterval)})</h1>
                                <div className={"mt-15"}>
                                    <div className={"detail_main_h"}>
                                        <b>Class started at
                                            :- </b> {moment(chatModuleCurrentCallGroupData?.class_time).format('hh:mm a')}
                                    </div>
                                    <div className={"detail_main_h"}>
                                        <b>Class :- </b> {chatModuleCurrentCallGroupData?.student_class}th
                                    </div>
                                    <div className={"detail_main_h"}>
                                        <b>School board :- </b> {chatModuleCurrentCallGroupData?.school_board}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*////////// CLASS INFORMATION ///////////*/}
                </div>
                {/*//////////// TEACHER VIDEO CONTAINER /////////////*/}
                {/*///////////// WHITE BOARD CONTAINER //////////////*/}
                <div className={"col-7 center_white_board_video_with_details"}>
                    {(inClassStatusTeacherStudent === 'INCALL') ?
                        <WhiteboardComponent groupId={chatModuleCurrentCallGroupData.id} canvasReservedJson={canvasReservedJson}/>
                        : ''
                    }
                </div>
                {/*///////////// WHITE BOARD CONTAINER //////////////*/}
                {/*////////// STUDENTS VIDEO CONTAINER PAGES /////////////*/}
                <div className={"col-2 side_other_video_with_details"} id={"student_all_class_group_data_videos_section"}>
                    {(!isTeacher) ?
                        <React.Fragment>
                            {(tracks?.length) ?
                                <div>
                                    <AgoraVideoPlayer
                                        videoTrack={tracks[1]}
                                        style={{ height: "100%", width: "100%" }}
                                        className={'my_video_peer_connection'}
                                    />
                                   <div className={"member_name_section"}>{userInfo?.name}</div>
                                    <div className={"call_ent_button_section"}>
                                        {isMutedCall ?
                                            <button onClick={()=>handleMuteUnmuteInCall()} className={"tap_to_speak_button  mr-10"}>
                                                <svg fill={"#fff"} width={"24"} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="bi bi-mic-mute-fill"><path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3z"/><path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z"/></svg>
                                            </button>
                                            :
                                            <button onClick={()=>handleMuteUnmuteInCall()} className={"tap_to_speak_button  mr-10 tap"}>
                                                <svg  fill={"#fff"} width={"24"} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 18v-1.06A8 8 0 0 1 2 9h2a6 6 0 1 0 12 0h2a8 8 0 0 1-7 7.94V18h3v2H6v-2h3zM6 4a4 4 0 1 1 8 0v5a4 4 0 1 1-8 0V4z"/></svg>
                                            </button>
                                        }
                                    </div>
                                </div>
                                    :''
                            }
                        </React.Fragment>:''
                    }
                    {isTeacher && users.length > 0 &&
                        users.map((user) => {
                            if (user.videoTrack && user.uid.indexOf('student') >= 0) {
                                return (
                                    <div key={user.uid}>
                                           <AgoraVideoPlayer
                                               videoTrack={user.videoTrack}
                                               id={user.uid}
                                               style={{ height: "100%", width: "100%" }}
                                               className={'my_video_peer_connection'}
                                           />
                                    </div>
                                );
                            } else return null;
                     })}
                </div>
                {/*////////// STUDENTS VIDEO CONTAINER PAGES /////////////*/}
            </div>

            {inClassStatusTeacherStudent === 'JOINING' ?
                <div className={"call_pre_loader_section"}>
                    <SpinnerLoader/>
                </div>
                :''
            }

            {isTeacher ?
                <IonAlert
                    header="Alert!"
                    subHeader={"Class time exceed 1 hour do you want to extend class for 1 hour?"}
                    isOpen={showExtendClassAlert}
                    buttons={[
                        {
                            text: 'No, End class',
                            role: 'cancel',
                            handler: () => closeConfirmPopupAndEndClass(),
                        },
                        {
                            text: 'Yes, Extend class',
                            role: 'confirm',
                            handler: () => closeConfirmPopupAndExtendClass(),
                        },
                    ]}
                    onDidDismiss={() => closeConfirmPopupAndExtendClass()}
                ></IonAlert>
                :''
            }

        </div>
    )
}