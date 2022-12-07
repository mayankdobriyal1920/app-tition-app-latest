import React from "react";
import {IonPage} from "@ionic/react";
import {Route,useRouteMatch,Redirect,Switch} from "react-router-dom";
import {LeftSideBarComponent} from "./LeftSideBarComponent";
import {StudentDesktopDashboard} from "./StudentDesktopDashboard";
import StudentDesktopScheduledClasses from "./StudentDesktopScheduledClasses";
import {useDispatch} from "react-redux";
import {useEffectOnce} from "../../../helper/UseEffectOnce";
import {actionToGetUserAllClasses} from "../../../actions/CommonAction";

export default function StudentTabDesktopLinkEntryPage() {
    const { path } = useRouteMatch();
    const dispatch = useDispatch();
    useEffectOnce(()=>{
        dispatch(actionToGetUserAllClasses());
    },[])
    return (
        <IonPage className={"main_padding_main_page dashboard_container"}>
            <div className={"row"}>
                <div className={"col-2"}>
                    <LeftSideBarComponent/>
                </div>
                <div className={"col-10"}>
                    <Switch>
                        <Route exact path={path} render={()=> (<Redirect to={`${path}/home`}/>)}></Route>
                        <Route path={`${path}/home`}>
                            <StudentDesktopDashboard/>
                        </Route>
                        <Route path={`${path}/student-scheduled-classes`}>
                            <StudentDesktopScheduledClasses/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </IonPage>
    )
}
