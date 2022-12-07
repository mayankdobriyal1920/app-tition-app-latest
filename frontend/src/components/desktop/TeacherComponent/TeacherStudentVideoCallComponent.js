import React from "react";
import {useDispatch, useSelector} from "react-redux";
import WhiteboardComponent from "../WhiteboardComponent";
import moment from "moment";
import {_getFirstLatterOfName} from "../../../helper/CommonHelper";
import SpinnerLoader from "../../Loader/SpinnerLoader";
import {myStream, myShareScreenStream, myPeer, myMediaRecorder} from "../../../helper/CallModuleHelper.js";
import {
    actionToEndCurrentCurrentCall, actionToMuteUnmuteUserCall,
    actionToRemoveUserFromCurrentCallAndEndCall
} from "../../../actions/CommonAction";
import $ from 'jquery';

export default function TeacherStudentVideoCallComponent({inCallStatus,setInCallStatus}){
    const chatModuleCurrentCallGroupData = useSelector((state) => state.chatModuleCurrentCallGroupData);
    const callSocketMessageBroadcast = useSelector((state) => state.callSocketMessageBroadcast);
    const userInfo = useSelector((state) => state.userSignin.userInfo);
    const dispatch = useDispatch();

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
        if($('#main_user_video_call_video_section').length)
            $('#main_user_video_call_video_section').html('');

        if($('#student_all_class_group_data_videos_section').length)
            $('#student_all_class_group_data_videos_section').html('');

        setInCallStatus('PREJOIN');

        if(myMediaRecorder)
            myMediaRecorder?.stop();

    }

    const handleMuteUnmuteInCall = ()=>{
        dispatch(actionToMuteUnmuteUserCall([userInfo.id],'MUTE',chatModuleCurrentCallGroupData?.id));
    }

    const endCallFunctionCall = (groupId)=>{
        endMyStreamTrackOnEndCall();
        setInCallStatus('PREJOIN');
        dispatch(actionToRemoveUserFromCurrentCallAndEndCall(userInfo.id,groupId));
        dispatch(actionToEndCurrentCurrentCall(groupId));
    }


    // React.useEffect(() => {
    //     const handleAppMessage = (message) => {
    //         if(callSocketMessageBroadcast && currentRoomData?.members != undefined) {
    //             switch(message) {
    //                 case 'participant-joined':
    //                     handleParticipantArrayUpdated(currentRoomData?.members);
    //                     break;
    //                 case 'participant-updated':
    //                     handleParticipantArrayUpdated(currentRoomData?.members);
    //                     break;
    //                 case 'participant-left':
    //                     handleParticipantArrayUpdated(currentRoomData?.members);
    //                     break;
    //                 case 'participant-removed':
    //                     handleParticipantArrayUpdated(currentRoomData?.members);
    //                     break;
    //                 case 'end-of-current-call':
    //                     handleParticipantArrayUpdated([]);
    //                     handleToSetViewNotInCall();
    //                     document.getElementById('userAudioSectionId').innerHTML = '';
    //                     break;
    //             }
    //         }
    //     }
    //     handleAppMessage(callSocketMessageBroadcast);
    // }, [callSocketMessageBroadcast]);

    return(
        <div id={"teacher_video_class_container"} className={"video_call_white_board_main_container"}>
            <div style={{display:inCallStatus === 'INCALL' ? 'flex' : 'none'}} className={"row teacher_video_class_container_inner_row"}>
                <div className={"col-3 side_my_video_with_details"}>
                    {/*Important div for call*/}
                    <div id={"main_user_video_call_video_section"} className="main_user_video_call_video_section">
                        {/*<video loop={true} playsInline={true} autoPlay={true} className={'my_video_peer_connection'}>*/}
                        {/*    <source src="http://techslides.com/demos/sample-videos/small.webm" />*/}
                        {/*</video>*/}
                    </div>
                    {/*Important div for call*/}
                    <div className={"video_class_description mt-15"}>
                            <div className={"video_class_description_details"}>
                                <div className={"video_class_description_details_first_col"}>
                                    <h1>Demo class of Hindi (01:12)</h1>
                                    <div className={"mt-15"}>
                                        <div className={"detail_main_h"}>
                                            <b>Class id :- </b> {chatModuleCurrentCallGroupData?.id}
                                        </div>
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
                                <div className={"video_class_description_details_all_students mt-30"}>
                                    <div className={"video_class_description_details_first_col"}>
                                        <h1>All Students :- </h1>
                                        <div className={"mt-15"}>
                                            {(chatModuleCurrentCallGroupData?.profile_subject_with_batch?.map((memberData,key)=>(
                                                <div key={key} className={"video_class_all_students_loop"}>
                                                    <div className={"name_initial"}>{_getFirstLatterOfName(memberData?.student_name)}</div>
                                                    <div className={"student_name"}>{memberData?.student_name}</div>
                                                </div>
                                            )))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <div className={"col-7 center_white_board_video_with_details"}>
                    {(inCallStatus === 'INCALL') ?
                        <WhiteboardComponent/>
                        : ''
                    }
                    <div className={"call_ent_button_section"}>
                        <button onClick={()=>handleMuteUnmuteInCall()} className={"mute_call_button  mr-10"}>
                            <svg  fill={"#fff"} width={"24"} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 18v-1.06A8 8 0 0 1 2 9h2a6 6 0 1 0 12 0h2a8 8 0 0 1-7 7.94V18h3v2H6v-2h3zM6 4a4 4 0 1 1 8 0v5a4 4 0 1 1-8 0V4z"/></svg>
                        </button>
                        <button onClick={()=>handleMuteUnmuteInCall()} className={"mute_call_button  mr-10"}>
                            <svg fill={"#fff"} width={"24"} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" className="bi bi-mic-mute-fill"><path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3z"/><path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z"/></svg>
                        </button>
                        <button onClick={()=>endCallFunctionCall(chatModuleCurrentCallGroupData)} className={"end_call_button"}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill={"#fff"} width={"24"} viewBox="0 0 511.632 511.632"><path d="M504.965 376.246c-19.435-36.715-81.472-73.813-88.704-78.059-14.421-8.192-29.739-10.731-42.987-6.997-10.432 2.88-18.965 9.301-24.789 18.624-8.128 9.664-18.176 21.056-20.288 22.912-16.384 11.115-27.179 9.963-41.323-4.181-4.629-4.651-11.136-6.997-17.749-6.08-6.507.811-12.309 4.608-15.68 10.261l-42.389 71.509c-4.971 8.384-3.627 19.093 3.264 25.963 61.141 61.141 113.301 81.429 155.627 81.429 46.059 0 80.448-24.043 102.037-45.632l22.912-22.912c17.77-17.771 21.824-44.608 10.069-66.837zM96.506 303.559a21.22 21.22 0 0 0 10.88-2.987l71.488-42.411c5.675-3.349 9.493-9.152 10.304-15.68s-1.429-13.099-6.08-17.749c-14.336-14.336-15.403-24.747-4.757-40.533 2.411-2.859 13.803-12.949 23.488-21.056 9.301-5.824 15.723-14.357 18.624-24.789 3.669-13.312 1.195-28.587-7.147-43.2-4.117-7.019-41.216-69.056-77.931-88.491-22.186-11.734-49.087-7.702-66.837 10.069L45.626 39.644C4.197 81.073-46.235 169.649 81.424 297.308c4.096 4.117 9.557 6.251 15.082 6.251zm344.813-233.25c-8.341-8.341-21.824-8.341-30.165 0l-384 384c-8.341 8.341-8.341 21.824 0 30.165 4.16 4.16 9.621 6.251 15.083 6.251s10.923-2.091 15.083-6.251l384-384c8.34-8.341 8.34-21.824-.001-30.165z"/></svg>
                        </button>
                    </div>
                </div>
                <div className={"col-2 side_other_video_with_details"} id={"student_all_class_group_data_videos_section"}>
                    {/*<video playsInline={true} autoPlay={true} className={'other_video_peer_connection'}>*/}
                    {/*    <source src="http://techslides.com/demos/sample-videos/small.webm" />*/}
                    {/*</video>*/}
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