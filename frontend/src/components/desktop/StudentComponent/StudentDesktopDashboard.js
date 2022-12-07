import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import {StudentMainDesktopDashboardComponent} from "./StudentMainDesktopDashboardComponent";

function StudentDesktopDashboardFunction(){
    const { path } = useRouteMatch();
    return (
        <Switch>
            <Route exact path={path}>
                <StudentMainDesktopDashboardComponent/>
            </Route>
        </Switch>
    )
}
export const StudentDesktopDashboard = React.memo(StudentDesktopDashboardFunction);
