import React from "react";
import {IonPage} from "@ionic/react";
import {Route,useRouteMatch,Redirect,Switch} from "react-router-dom";
import {LeftSideBarComponent} from "../StudentComponent/LeftSideBarComponent";
import {TeacherDesktopDashboard} from "./TeacherDesktopDashboard";
import StudentAttendanceAndAssignmentComponent from "../StudentComponent/StudentAttendanceAndAssignmentComponent";
import StudentDesktopScheduledClasses from "../StudentComponent/StudentDesktopScheduledClasses";

export default function TeacherTabDesktopLinkEntryPage() {
    const { path } = useRouteMatch();
    return (
        <IonPage className={"main_padding_main_page dashboard_container"}>
            <div className={"row"}>
                <div className={"col-2"}>
                    <LeftSideBarComponent isTeacherLeftSideBar={true}/>
                </div>
                <div className={"col-10"}>
                    <Switch>
                        <Route path={`${path}/home`}>
                            <TeacherDesktopDashboard/>
                        </Route>
                        <Route path={`${path}/student-attendance-assignment`}>
                            <StudentAttendanceAndAssignmentComponent/>
                        </Route>
                        <Route exact path={`${path}/student-scheduled-classes`}>
                            <StudentDesktopScheduledClasses/>
                        </Route>
                        <Redirect exact from="/dashboard" to={`${path}/home`} />
                    </Switch>
                </div>
            </div>
        </IonPage>
    )
}
