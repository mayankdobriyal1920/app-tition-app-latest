import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {TeacherMainDesktopDashboardComponent} from "./TeacherMainDesktopDashboardComponent";

function TeacherDesktopDashboardFunction(){
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path}>
                <TeacherMainDesktopDashboardComponent/>
            </Route>
        </Switch>
    )
}
export const TeacherDesktopDashboard = React.memo(TeacherDesktopDashboardFunction);
