import React from "react";
import {useDispatch, useSelector} from "react-redux";
import TeacherTabDesktopLinkEntryPage from "../../components/desktop/TeacherComponent/TeacherTabDesktopLinkEntryPage";
import {
    actionToGetAllSchoolBoardDataList,
    actionToGetAllSubjectDataList, actionToGetStudentTimetableData,
    actionToGetTeacherAllClasses,
    actionToGetTeacherAllDemoClasses,
    actionToGetTeacherAllTodayClasses, actionToGetTeacherClassAttendWithAssignmentData,
    actionToGetUserFreshData
} from "../../actions/CommonAction";
import {useEffectOnce} from "../../helper/UseEffectOnce";
import {getWebsocketConnectedMessage} from "../../helper/WebSocketHelper";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import TeacherTabMobileLinkEntryPage from "../../components/mobile/TeacherComponent/TeacherTabMobileLinkEntryPage";

let loadOnce = true;
export default function TeacherTabCommonLinkEntryPage() {
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    const {userInfo} = useSelector((state) => state.userSignin);
    const dispatch = useDispatch();

    useEffectOnce(()=>{
        if(loadOnce) {
            dispatch(actionToGetTeacherAllClasses());
            dispatch(actionToGetTeacherAllTodayClasses());
            dispatch(actionToGetTeacherAllDemoClasses());
            getWebsocketConnectedMessage(W3CWebSocket, dispatch, userInfo);
            dispatch(actionToGetAllSubjectDataList());
            dispatch(actionToGetStudentTimetableData());
            dispatch(actionToGetTeacherClassAttendWithAssignmentData());
            dispatch(actionToGetAllSchoolBoardDataList());
            dispatch(actionToGetUserFreshData(userInfo?.id));
            loadOnce = false;
        }
    },[])


    return (
        <>
            {(windowResizeCount >= 1000) ?
                <TeacherTabDesktopLinkEntryPage/>
                :
                <TeacherTabMobileLinkEntryPage/>
            }
        </>
    )
}
