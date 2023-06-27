import React,{useState,useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import WhiteboardComponent from "../WhiteboardComponent";
import moment from "moment";
import {_readableTimeFromSeconds} from "../../../helper/CommonHelper";
import SpinnerLoader from "../../Loader/SpinnerLoader";
import {myStream, myShareScreenStream, myPeer, myMediaRecorder} from "../../../helper/CallModuleHelper.js";
import jsPDF from "jspdf";
import {
    actionToEndCurrentCurrentCall,
    actionToMuteUnmuteUserCall,
    actionToSetTeacherZoomInOut,
    actionToStoreAssignmentDataForTeacher,
} from "../../../actions/CommonAction";
import $ from 'jquery';
import {useEffectOnce} from "../../../helper/UseEffectOnce";
import axios from "axios";
import {isTeacherMasterLogin} from "../../../middlewear/auth";

let loadOnce = false;
let canvasReservedJson = [];
let allImagesUrlArray = [];
export default function TeacherStudentVideoCallComponent({inCallStatus,setInCallStatus,isTeacher}){
    const chatModuleCurrentCallGroupData = useSelector((state) => state.chatModuleCurrentCallGroupData);
    const zoomInZoomOutTeacherVideo = useSelector((state) => state.zoomInZoomOutTeacherVideo);
    const chatModuleCurrentCallGroupMembers = useSelector((state) => state.chatModuleCurrentCallGroupMembers);
    const studentAllClassesList = useSelector((state) => state.studentAllClassesList);
    const userInfo = useSelector((state) => state.userSignin.userInfo);
    let [timerTimeInterval,setTimerTimeInterval] = useState(0);
    let [isPortraitMode,setIsPortraitMode] = useState(false);
    const dispatch = useDispatch();
    let [isMutedCall,setIsMutedCall] = useState(!isTeacher);


    const endMyStreamTrackOnEndCall = ()=>{
        if(myStream != null) {
            myStream.getTracks().forEach(function (track) {
                track.stop();
            });
        }
        if(myShareScreenStream != null) {
            myShareScreenStream.getTracks().forEach(function (track) {
                track.stop();
            });
        }
        if(myPeer != null){
            myPeer.disconnect();
        }
        if($('#main_user_video_call_video_section')?.length)
            $('#main_user_video_call_video_section').html('');

        if($('#student_all_class_group_data_videos_section')?.length)
            $('#student_all_class_group_data_videos_section').html('');

        setInCallStatus('PREJOIN');

        if(myMediaRecorder)
            myMediaRecorder?.stop();

    }
    const handleMuteUnmuteInCall = ()=>{
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
        setInCallStatus('JOINING');
        if(!chatModuleCurrentCallGroupData?.is_demo_class)
           await makePdfOfCanvases();
        endMyStreamTrackOnEndCall();
        setTimeout(function (){
            setInCallStatus('PREJOIN');
            let startDate = moment(startDateTime).format('YYYY-MM-DD');
            dispatch(actionToEndCurrentCurrentCall(groupId,classId,startDate));
        },5000)
    }
    const leaveCallFunctionCall = ()=>{
        endMyStreamTrackOnEndCall();
        setInCallStatus('PREJOIN');
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
            <div style={{display:inCallStatus === 'INCALL' ? 'flex' : 'none'}} className={"row teacher_video_class_container_inner_row"}>
                <div className={"col-3 side_my_video_with_details"}>
                    {/*Important div for call*/}
                    <div id={"main_user_video_call_video_section"} className="main_user_video_call_video_section">
                        {(chatModuleCurrentCallGroupMembers?.map((groupMembers,key)=>(
                            (groupMembers?.isTeacher) ?
                                <video key={key} loop={true} playsInline={true}
                                       onClick={()=>zoomInZoomOutVideoPanel()}
                                       style={{}}
                                       id={groupMembers?.id}
                                       data-user-id={userInfo?.id}
                                       data-teacher-id={chatModuleCurrentCallGroupData?.teacher_id}
                                       muted={(userInfo?.id === chatModuleCurrentCallGroupData?.teacher_id) ? true : groupMembers?.mute}
                                       data-muted={(userInfo?.id === chatModuleCurrentCallGroupData?.teacher_id) ? true : groupMembers?.mute}
                                       autoPlay={true} className={'my_video_peer_connection '+(zoomInZoomOutTeacherVideo ? 'zoom' : '')}></video>
                                :''
                        )))}
                        {(isTeacher) ?
                            <div className={"call_ent_button_section"}>
                                {isMutedCall ?
                                    <button onClick={()=>handleMuteUnmuteInCall()} className={"mute_call_button  mr-10"}>
                                        <svg fill={"#fff"} width={"24"} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="bi bi-mic-mute-fill"><path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3z"/><path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z"/></svg>
                                    </button>
                                    :
                                    <button onClick={()=>handleMuteUnmuteInCall()} className={"mute_call_button  mr-10"}>
                                        <svg  fill={"#fff"} width={"24"} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 18v-1.06A8 8 0 0 1 2 9h2a6 6 0 1 0 12 0h2a8 8 0 0 1-7 7.94V18h3v2H6v-2h3zM6 4a4 4 0 1 1 8 0v5a4 4 0 1 1-8 0V4z"/></svg>
                                    </button>
                                }
                                <button onClick={()=>endCallFunctionCall(chatModuleCurrentCallGroupData?.id,chatModuleCurrentCallGroupData?.class_id,chatModuleCurrentCallGroupData?.start_from_date_time)} className={"end_call_button"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill={"#fff"} width={"24"} viewBox="0 0 511.632 511.632"><path d="M504.965 376.246c-19.435-36.715-81.472-73.813-88.704-78.059-14.421-8.192-29.739-10.731-42.987-6.997-10.432 2.88-18.965 9.301-24.789 18.624-8.128 9.664-18.176 21.056-20.288 22.912-16.384 11.115-27.179 9.963-41.323-4.181-4.629-4.651-11.136-6.997-17.749-6.08-6.507.811-12.309 4.608-15.68 10.261l-42.389 71.509c-4.971 8.384-3.627 19.093 3.264 25.963 61.141 61.141 113.301 81.429 155.627 81.429 46.059 0 80.448-24.043 102.037-45.632l22.912-22.912c17.77-17.771 21.824-44.608 10.069-66.837zM96.506 303.559a21.22 21.22 0 0 0 10.88-2.987l71.488-42.411c5.675-3.349 9.493-9.152 10.304-15.68s-1.429-13.099-6.08-17.749c-14.336-14.336-15.403-24.747-4.757-40.533 2.411-2.859 13.803-12.949 23.488-21.056 9.301-5.824 15.723-14.357 18.624-24.789 3.669-13.312 1.195-28.587-7.147-43.2-4.117-7.019-41.216-69.056-77.931-88.491-22.186-11.734-49.087-7.702-66.837 10.069L45.626 39.644C4.197 81.073-46.235 169.649 81.424 297.308c4.096 4.117 9.557 6.251 15.082 6.251zm344.813-233.25c-8.341-8.341-21.824-8.341-30.165 0l-384 384c-8.341 8.341-8.341 21.824 0 30.165 4.16 4.16 9.621 6.251 15.083 6.251s10.923-2.091 15.083-6.251l384-384c8.34-8.341 8.34-21.824-.001-30.165z"/></svg>
                                </button>
                            </div>
                            :
                            ''
                        }
                    </div>
                    {/*Important div for call*/}
                    <div className={"video_class_description mt-15"}>
                        <div className={"video_class_description_details"}>
                            <div className={"video_class_description_details_first_col"}>
                                <h1>Class of {chatModuleCurrentCallGroupData?.subject_name} ({_readableTimeFromSeconds(timerTimeInterval)})</h1>
                                <div className={"mt-15"}>
                                    <div className={"detail_main_h"}>
                                        <b>Class started at :- </b> {moment(chatModuleCurrentCallGroupData?.class_time).format('hh:mm a')}
                                    </div>
                                    <div className={"detail_main_h"}>
                                        <b>Class :- </b> {chatModuleCurrentCallGroupData?.student_class}th
                                    </div>
                                    <div className={"detail_main_h"}>
                                        <b>School board :- </b> {chatModuleCurrentCallGroupData?.school_board}
                                    </div>
                                </div>
                            </div>
                            {/*<div className={"video_class_description_details_all_students mt-30"}>*/}
                            {/*    <div className={"video_class_description_details_first_col"}>*/}
                            {/*        <h1>All Students :- </h1>*/}
                            {/*        <div className={"mt-15"}>*/}
                            {/*            {(chatModuleCurrentCallGroupData?.profile_subject_with_batch?.map((memberData,key)=>(*/}
                            {/*                <div key={key} className={"video_class_all_students_loop"}>*/}
                            {/*                    <div className={"name_initial"}>{_getFirstLatterOfName(memberData?.student_name)}</div>*/}
                            {/*                    <div className={"student_name"}>{memberData?.student_name}</div>*/}
                            {/*                </div>*/}
                            {/*            )))}*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
                <div className={"col-7 center_white_board_video_with_details"}>
                    {(inCallStatus === 'INCALL') ?
                        <WhiteboardComponent groupId={chatModuleCurrentCallGroupData.id} canvasReservedJson={canvasReservedJson}/>
                        : ''
                    }
                </div>
                <div className={"col-2 side_other_video_with_details"} id={"student_all_class_group_data_videos_section"}>
                    {(chatModuleCurrentCallGroupMembers?.map((groupMembers,key)=>(
                        (!groupMembers?.isTeacher) ?
                            <span key={key} data-obj={JSON.stringify(groupMembers)}>
                                        <video key={key}
                                               muted={(studentAllClassesList?.classData?.id === groupMembers?.id) ? true : groupMembers?.mute}
                                               data-muted={(studentAllClassesList?.classData?.id === groupMembers?.id) ? true : groupMembers?.mute}
                                               playsInline={true}
                                               autoPlay={true}
                                               id={groupMembers?.id}
                                               className={'other_video_peer_connection'}></video>
                                        <div className={"member_name_section"}>{groupMembers?.name}</div>
                                {(studentAllClassesList?.classData?.id === groupMembers?.id) ?
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
                                    :''
                                }
                                    </span>:''
                    )))}
                </div>
            </div>
            {inCallStatus === 'JOINING' ?
                <div className={"call_pre_loader_section"}>
                    <SpinnerLoader/>
                </div>
                :''
            }
        </div>
    )
}