import React from "react";
import {Route, useRouteMatch, Switch, Redirect} from "react-router-dom";
import {useDispatch} from "react-redux";
import SuperAdminLeftSideBarComponent from "./SuperAdminLeftSideBarComponent";
import SuperAdminDesktopDashboard from "./SuperAdminDesktopDashboard";
import AllTeacherDataTableComponent from "./AllTeacherDataTableComponent";
import AllStudentDataTableComponent from "./AllStudentDataTableComponent";
import NewStudentProfileComponent from "./NewStudentProfileComponent";
import AllSubscribedClassesComponent from "./AllSubscribedClassesComponent";
import AddNewTeacherComponent from "./AddNewTeacherComponent";
import {IonContent, IonPage} from "@ionic/react";
import AllClassesDataTableComponent from "./AllClassesDataTableComponent";
import AllDemoClassDataTableComponent from "./AllDemoClassDataTableComponent";

export default function SuperAdminTabDesktopLinkEntryPage() {
    const { path } = useRouteMatch();
    const dispatch = useDispatch();
    // useEffectOnce(()=>{
    //     dispatch(actionToGetUserAllClasses());
    // },[])
    return (
        <IonPage>
            <IonContent fullscreen>
                <div className="container-xxl position-relative bg-white d-flex p-0">
                    <SuperAdminLeftSideBarComponent/>
                    <Switch>
                        <Redirect exact from="/dashboard" to={`${path}/home`} />
                        <Route exact path={`${path}/home`}>
                            <SuperAdminDesktopDashboard/>
                        </Route>
                        <Route exact path={`${path}/teacher-datatable`}>
                            <AllTeacherDataTableComponent/>
                        </Route>
                        <Route exact path={`${path}/student-datatable`}>
                            <AllStudentDataTableComponent/>
                        </Route>
                        <Route exact path={`${path}/new-student-profile-datatable`}>
                            <NewStudentProfileComponent/>
                        </Route>
                        <Route exact path={`${path}/all-subscribed-classes`}>
                            <AllSubscribedClassesComponent/>
                        </Route>
                        <Route exact path={`${path}/all-unassigned-classes`}>
                            <AllClassesDataTableComponent/>
                        </Route>
                        <Route exact path={`${path}/all-demo-classes`}>
                            <AllDemoClassDataTableComponent/>
                        </Route>
                        <Route exact path={`${path}/add-new-teacher`}>
                           <AddNewTeacherComponent/>
                        </Route>
                    </Switch>
                </div>
            </IonContent>
        </IonPage>
    )
}
