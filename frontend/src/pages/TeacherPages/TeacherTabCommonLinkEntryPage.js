import React from "react";
import {useDispatch, useSelector} from "react-redux";
import StudentTabMobileLinkEntryPage from "../../components/mobile/StudentComponent/StudentTabMobileLinkEntryPage";
import TeacherTabDesktopLinkEntryPage from "../../components/desktop/TeacherComponent/TeacherTabDesktopLinkEntryPage";
import {
    actionToGetAllSchoolBoardDataList,
    actionToGetAllStudentAttendClassWithAssignment,
    actionToGetAllSubjectDataList,
    actionToGetTeacherAllClasses, actionToGetUserFreshData
} from "../../actions/CommonAction";
import {useEffectOnce} from "../../helper/UseEffectOnce";
import {getWebsocketConnectedMessage} from "../../helper/WebSocketHelper";
import {w3cwebsocket as W3CWebSocket} from "websocket";

let loadOnce = true;
export default function TeacherTabCommonLinkEntryPage() {
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    const {userInfo} = useSelector((state) => state.userSignin);
    const dispatch = useDispatch();

    useEffectOnce(()=>{
        if(loadOnce) {
            dispatch(actionToGetTeacherAllClasses());
            dispatch(actionToGetAllStudentAttendClassWithAssignment());
            getWebsocketConnectedMessage(W3CWebSocket, dispatch, userInfo);
            dispatch(actionToGetAllSubjectDataList());
            dispatch(actionToGetAllSchoolBoardDataList());
            dispatch(actionToGetUserFreshData(userInfo?.id));
            loadOnce = false;
        }
    },[])


    return (
        <>
            {(windowResizeCount >= 1200) ?
                <TeacherTabDesktopLinkEntryPage/>
                :
                <StudentTabMobileLinkEntryPage/>
            }
        </>
    )
}
