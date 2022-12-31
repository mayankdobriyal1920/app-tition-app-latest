import React from "react";
import {useDispatch, useSelector} from "react-redux";
import StudentTabDesktopLinkEntryPage from "../../components/desktop/StudentComponent/StudentTabDesktopLinkEntryPage";
import StudentTabMobileLinkEntryPage from "../../components/mobile/StudentComponent/StudentTabMobileLinkEntryPage";
import {useEffectOnce} from "../../helper/UseEffectOnce";
import {getWebsocketConnectedMessage} from "../../helper/WebSocketHelper";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import {
    actionToGetAllSchoolBoardDataList,
    actionToGetAllSubjectDataList, actionToGetUserAllClasses,
    actionToGetUserFreshData
} from "../../actions/CommonAction";

let loadOnce = true;
export default function StudentTabCommonLinkEntryPage() {
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    const {userInfo} = useSelector((state) => state.userSignin);
    const dispatch = useDispatch();

    useEffectOnce(()=>{
        if(loadOnce) {
            getWebsocketConnectedMessage(W3CWebSocket, dispatch, userInfo);
            dispatch(actionToGetAllSubjectDataList());
            dispatch(actionToGetAllSchoolBoardDataList());
            dispatch(actionToGetUserFreshData(userInfo?.id));
            dispatch(actionToGetUserAllClasses());
            loadOnce = false;
        }
    },[])

    return (
        <>
            {(windowResizeCount >= 1200) ?
                <StudentTabDesktopLinkEntryPage/>
                :
                <StudentTabMobileLinkEntryPage/>
            }
        </>
    )
}
