import React from "react";
import {IonPage} from "@ionic/react";
import {Route,useRouteMatch,Redirect,Switch} from "react-router-dom";
import {LeftSideBarComponent} from "./LeftSideBarComponent";
import {StudentDesktopDashboard} from "./StudentDesktopDashboard";
import StudentDesktopScheduledClasses from "./StudentDesktopScheduledClasses";
import StudentPaymentConfirmComponent from "./StudentPaymentConfirmComponent";
import StudentAttendanceAndAssignmentComponent from "./StudentAttendanceAndAssignmentComponent";
import UserProfileEditComponent from "../UserProfileEditComponent";

export default function StudentTabDesktopLinkEntryPage() {
    const { path } = useRouteMatch();

    return (
        <IonPage className={"main_padding_main_page dashboard_container"}>
            <div className={"row"}>
                <div className={"col-2"}>
                    <LeftSideBarComponent/>
                </div>
                <div className={"col-10"}>
                    <Switch>
                        <Route exact path={`${path}/home`}>
                            <StudentDesktopDashboard/>
                        </Route>
                        <Route exact path={`${path}/student-scheduled-classes`}>
                            <StudentDesktopScheduledClasses/>
                        </Route>
                        <Route path={`${path}/subscription-confirm`}>
                            <StudentPaymentConfirmComponent/>
                        </Route>
                        <Route path={`${path}/student-profile-page`}>
                            <UserProfileEditComponent/>
                        </Route>
                        <Route path={`${path}/student-attendance-assignment`}>
                            <StudentAttendanceAndAssignmentComponent/>
                        </Route>
                        <Redirect exact from="/dashboard" to={`${path}/home`} />
                    </Switch>
                </div>
            </div>
        </IonPage>
    )
}
