import React, {useEffect} from "react";
import '../../theme/css/admin-style.css';
import {useDispatch, useSelector} from "react-redux";
import StudentTabMobileLinkEntryPage from "../../components/mobile/StudentComponent/StudentTabMobileLinkEntryPage";
import {
    actionToGetAllSchoolBoardDataList, actionToGetAllStudentSubscriptionDataList,
    actionToGetAllSubjectDataList, actionToGetLatestDemoClassesDetails,
    actionToGetLatestStudentProfileDataList,
    actionToGetLatestSubscriptionsDataList,
    actionToGetLatestTeachersDataList,
    actionToGetTeacherAllClasses, actionToGetTodayProfileDataList,
    actionToGetUserFreshData
} from "../../actions/CommonAction";
import SuperAdminTabDesktopLinkEntryPage
    from "../../components/desktop/SuperAdminComponent/SuperAdminTabDesktopLinkEntryPage";
import {useEffectOnce} from "../../helper/UseEffectOnce";
import {getWebsocketConnectedMessage} from "../../helper/WebSocketHelper";
import {w3cwebsocket as W3CWebSocket} from "websocket";
let loadOnce = true;

export default function SuperAdminTabCommonLinkEntryPage() {
    const windowResizeCount = useSelector((state) => state.windowResizeCount);

    const dispatch = useDispatch();
    const {userInfo} = useSelector((state) => state.userSignin);
    useEffectOnce(()=>{
        if(loadOnce) {
            getWebsocketConnectedMessage(W3CWebSocket, dispatch, userInfo);
            dispatch(actionToGetAllSubjectDataList());
            dispatch(actionToGetAllSchoolBoardDataList());
            dispatch(actionToGetUserFreshData(userInfo?.id));
            dispatch(actionToGetLatestTeachersDataList());
            dispatch(actionToGetLatestStudentProfileDataList());
            dispatch(actionToGetLatestSubscriptionsDataList());
            dispatch(actionToGetLatestDemoClassesDetails());
            dispatch(actionToGetAllStudentSubscriptionDataList());
            dispatch(actionToGetTodayProfileDataList());
            loadOnce = false;
        }
    },[])

    return (
        <>
            <SuperAdminTabDesktopLinkEntryPage/>
        </>
    )
}
