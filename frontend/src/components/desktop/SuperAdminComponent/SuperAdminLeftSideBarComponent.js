import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {signout} from "../../../actions/CommonAction";
import {IonAlert} from "@ionic/react";
import {useDispatch} from "react-redux";
import siteLogo from '../../../theme/images/header_logo_mini.svg'

export default function SuperAdminLeftSideBarComponent(){
    const path = '/dashboard';
    const dispatch = useDispatch();
    const [showAlert,setShowAlert] = useState(false);

    const logOutMe = ()=>{
        dispatch(signout())
    }
    return (
        <div className="sidebar pe-4 pb-3">
            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header="Logout"
                message="Are you sure to logout?"
                buttons={
                    [
                        {
                            text: 'No',
                            role: 'cancel',
                            handler: () => {
                                setShowAlert(false)
                            },
                        },
                        {
                            text: 'Yes',
                            role: 'confirm',
                            handler: () => {
                                logOutMe();
                            },
                        },
                    ]
                }
            />
            <nav className="navbar bg-light navbar-light mt-60">
                <a className="navbar-brand mx-4 mb-50">
                    <h3 className="text-primary"><i className="fa fa-hashtag me-2"></i>ADMIN</h3>
                </a>
                <div className="navbar-nav w-100">
                    <NavLink to={`${path}/home`} activeClassName={"active"} className="nav-item nav-link">
                        <i className="fa fa-tachometer-alt me-2"></i>
                        Dashboard
                    </NavLink>
                    <NavLink to={`${path}/student-datatable`} activeClassName={"active"} className={"nav-item nav-link"}>
                        <i className="fa fa-user me-2"></i>
                        All Students
                    </NavLink>
                    <NavLink to={`${path}/teacher-datatable`} activeClassName={"active"} className={"nav-item nav-link"}>
                        <i className="fa fa-users me-2"></i>
                        All Teachers
                    </NavLink>
                    <NavLink to={`${path}/all-subscribed-classes`} activeClassName={"active"} className={"nav-item nav-link"}>
                        <i className="fa fa-wallet me-2"></i>
                        All Subscriptions
                    </NavLink>
                    <NavLink to={`${path}/new-student-profile-datatable`} activeClassName={"active"} className={"nav-item nav-link"}>
                        <i className="fa fa-newspaper me-2"></i>
                        New Profiles
                    </NavLink>
                    <a onClick={()=>setShowAlert(true)} style={{cursor:'pointer'}} className="nav-item nav-link">
                        <i className="fa fa-sign-out me-2"></i>
                        Logout
                    </a>
                </div>
            </nav>
        </div>
    )
}