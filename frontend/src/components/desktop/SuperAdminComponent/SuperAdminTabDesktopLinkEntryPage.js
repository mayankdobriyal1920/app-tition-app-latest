import React from "react";
import {Route,useRouteMatch,Switch} from "react-router-dom";
import {useDispatch} from "react-redux";
import SuperAdminLeftSideBarComponent from "./SuperAdminLeftSideBarComponent";
import SuperAdminDesktopDashboard from "./SuperAdminDesktopDashboard";
import AllTeacherDataTableComponent from "./AllTeacherDataTableComponent";
import AllStudentDataTableComponent from "./AllStudentDataTableComponent";
import NewStudentProfileComponent from "./NewStudentProfileComponent";
import AllSubscribedClassesComponent from "./AllSubscribedClassesComponent";
import {IonContent, IonPage} from "@ionic/react";

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
                        <Route exact path={`${path}`}>
                            <SuperAdminDesktopDashboard/>
                        </Route>
                        <Route exact path={`${path}/home`}>
                            <SuperAdminDesktopDashboard/>
                        </Route>
                        <Route path={`${path}/teacher-datatable`}>
                            <AllTeacherDataTableComponent/>
                        </Route>
                        <Route path={`${path}/student-datatable`}>
                            <AllStudentDataTableComponent/>
                        </Route>
                        <Route path={`${path}/new-student-profile-datatable`}>
                            <NewStudentProfileComponent/>
                        </Route>
                        <Route path={`${path}/all-subscribed-classes`}>
                            <AllSubscribedClassesComponent/>
                        </Route>
                    </Switch>
                </div>
            </IonContent>
        </IonPage>
    )
}
