import React from "react";
import {IonPage} from "@ionic/react";
import {Route,useRouteMatch,Redirect,Switch} from "react-router-dom";
import {LeftSideBarComponent} from "../StudentComponent/LeftSideBarComponent";
import {TeacherDesktopDashboard} from "./TeacherDesktopDashboard";

export default function TeacherTabDesktopLinkEntryPage() {
    const { path } = useRouteMatch();
    return (
        <IonPage className={"main_padding_main_page dashboard_container"}>
            <div className={"row"}>
                <div className={"col-2"}>
                    <LeftSideBarComponent/>
                </div>
                <div className={"col-10"}>
                    <Switch>
                        <Route path={path}>
                            <TeacherDesktopDashboard/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </IonPage>
    )
}
