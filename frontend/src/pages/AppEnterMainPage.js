import React, {useEffect} from 'react';
import {isStudentLogin, isSuperAdminLogin, isTeacherMasterLogin} from "../middlewear/auth";
import {IonReactRouter} from "@ionic/react-router";
import {Redirect, Route} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {w3cwebsocket as W3CWebSocket} from "websocket";

import {IonRouterOutlet} from "@ionic/react";

import StudentTabCommonLinkEntryPage from "./StudentPage/StudentTabCommonLinkPage";
import {getWebsocketConnectedMessage} from "../helper/WebSocketHelper";
import {actionToGetAllSchoolBoardDataList, actionToGetAllSubjectDataList,actionToGetAllStudentDataList} from "../actions/CommonAction";
import TeacherTabCommonLinkEntryPage from "./TeacherPages/TeacherTabCommonLinkEntryPage";
import SuperAdminTabCommonLinkEntryPage from "./SuperAdminPages/SuperAdminTabCommonLinkEntryPage";
import {useEffectOnce} from "../helper/UseEffectOnce";


export const AppEnterMainPage = ()=>{
    const {userInfo} = useSelector((state) => state.userSignin);
    const dispatch = useDispatch();

    const StudentPrivateRoutes = () => {
        return (
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/dashboard"  component={StudentTabCommonLinkEntryPage} />
                    <Redirect exact from="/" to="/dashboard" />
                    <Route render={() => <Redirect to="/dashboard" />} />
                </IonRouterOutlet>
            </IonReactRouter>
        );
    }
    const SuperAdminPrivateRoutes = () => {
        return (
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/dashboard"  component={SuperAdminTabCommonLinkEntryPage} />
                    <Redirect exact from="/" to="/dashboard" />
                    <Route render={() => <Redirect to="/dashboard" />} />
                </IonRouterOutlet>
            </IonReactRouter>
        );
    }
    const TeacherPrivateRoutes = () => {
        return (
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/dashboard"  component={TeacherTabCommonLinkEntryPage} />
                    <Redirect exact from="/" to="/dashboard" />
                    <Route render={() => <Redirect to="/dashboard" />} />
                </IonRouterOutlet>
            </IonReactRouter>
        );
    }


    useEffectOnce(() => {
        getWebsocketConnectedMessage(W3CWebSocket,dispatch,userInfo);
        dispatch(actionToGetAllSubjectDataList());
        dispatch(actionToGetAllSchoolBoardDataList());
    },[]);

    return(
        (isStudentLogin()) ? <StudentPrivateRoutes/> : (isTeacherMasterLogin())  ? <TeacherPrivateRoutes/> :(isSuperAdminLogin()) ? <SuperAdminPrivateRoutes/> : ''
    )
}