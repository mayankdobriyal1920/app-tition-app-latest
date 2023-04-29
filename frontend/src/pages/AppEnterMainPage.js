import React from 'react';
import {isStudentLogin, isSuperAdminLogin, isTeacherMasterLogin} from "../middlewear/auth";
import {IonReactRouter} from "@ionic/react-router";
import {Redirect, Route} from "react-router-dom";
import {IonRouterOutlet} from "@ionic/react";
import StudentTabCommonLinkEntryPage from "./StudentPage/StudentTabCommonLinkPage";
import TeacherTabCommonLinkEntryPage from "./TeacherPages/TeacherTabCommonLinkEntryPage";
import SuperAdminTabCommonLinkEntryPage from "./SuperAdminPages/SuperAdminTabCommonLinkEntryPage";
import {Buffer} from 'buffer';
window.Buffer = window.Buffer || Buffer;

export const AppEnterMainPage = ()=>{

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

    return(
        (isStudentLogin()) ? <StudentPrivateRoutes/> : (isTeacherMasterLogin())  ? <TeacherPrivateRoutes/> :(isSuperAdminLogin()) ? <SuperAdminPrivateRoutes/> : ''
    )
}