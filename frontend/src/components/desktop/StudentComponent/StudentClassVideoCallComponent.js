import React from "react";
import {useDispatch, useSelector} from "react-redux";
import WhiteboardComponent from "../WhiteboardComponent";
import moment from "moment";
import {_getFirstLatterOfName} from "../../../helper/CommonHelper";
import SpinnerLoader from "../../Loader/SpinnerLoader";

export default function StudentClassVideoCallComponent({inCallStatus}){
    const chatModuleCurrentCallGroupData = useSelector((state) => state.chatModuleCurrentCallGroupData);
    const userInfo = useSelector((state) => state.userSignin.userInfo);
    const dispatch = useDispatch();

    console.log('chatModuleCurrentCallGroupData',chatModuleCurrentCallGroupData)

    return(
        <div id={"teacher_video_class_container"} className={"video_call_white_board_main_container"}>
            <div style={{display:inCallStatus === 'INCALL' ? 'flex' : 'none'}} className={"row teacher_video_class_container_inner_row"}>
                <div className={"col-3 side_my_video_with_details"}>
                    {/*Important div for call*/}
                    <div id={"main_user_video_call_video_section"} className="main_user_video_call_video_section"></div>
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
                </div>
                {/*Important div for call*/}
                <div className={"col-2 side_other_video_with_details"} id={"student_all_class_group_data_videos_section"}></div>
                {/*Important div for call*/}
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