import React, {useState} from "react";
import siteLogo from "../../../theme/images/header_logo_one.png";
import {useDispatch} from "react-redux";
import {IonAlert} from "@ionic/react";
import {NavLink} from "react-router-dom";
import {signout} from "../../../actions/CommonAction";

function LeftSideBarComponentFunction({isTeacherLeftSideBar}){
    const dispatch = useDispatch();
    const [showAlert,setShowAlert] = useState(false);
    const path = '/dashboard';

    const logOutMe = ()=>{
        dispatch(signout())
    }

    return (
        <div className={"left_side_bar_main_section_container"}>
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
            <div className={"left_side_bar_extra_div"}></div>
            <div className={"left_side_bar_logo_section"}>
                <div className={"logo_main_div"}>
                    <img src={siteLogo}/>
                </div>
            </div>
           <div className={"left_side_content_menu_section"}>
                    <div className={"menu_loop_section"}>
                        <NavLink to={`${path}/home`} activeClassName={"active"}
                                 className={"menu_loop_section_inner_section"}>
                            <div className={"left_menu_item"}>
                                <div className={"left_menu_item_1"}>
                                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24"><path d="M10,2H3C2.4,2,2,2.4,2,3v7c0,0.6,0.4,1,1,1h7c0.6,0,1-0.4,1-1V3C11,2.4,10.6,2,10,2z M10,13H3c-0.6,0-1,0.4-1,1v7c0,0.6,0.4,1,1,1h7c0.6,0,1-0.4,1-1v-7C11,13.4,10.6,13,10,13z M21,2h-7c-0.6,0-1,0.4-1,1v7c0,0.6,0.4,1,1,1h7c0.6,0,1-0.4,1-1V3C22,2.4,21.6,2,21,2z M21,13h-7c-0.6,0-1,0.4-1,1v7c0,0.6,0.4,1,1,1h7c0.6,0,1-0.4,1-1v-7C22,13.4,21.6,13,21,13z"/></svg>
                                </div>
                                <div className={"left_menu_item_2"}>
                                    Dashboard
                                </div>
                            </div>
                        </NavLink>
                    </div>
                  <div className={"menu_loop_section"}>
                       <NavLink to={`${path}/student-scheduled-classes`} activeClassName={"active"} className={"menu_loop_section_inner_section"}>
                           <div className={"left_menu_item"}>
                               <div className={"left_menu_item_1"}>
                                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30.14 30.14">
                                       <path d="M0 24.881h30.14v5.256H0zM3.095 4.327h4.324v19.007H3.095zm6.643 4.947h4.329v14.061H9.738zm6.491-3.556h4.327v17.615h-4.327zm6.7-5.716h4.324v23.331h-4.324z"/>
                                   </svg>
                               </div>
                               <div className={"left_menu_item_2"}>
                                   Scheduled classes
                               </div>
                           </div>
                       </NavLink>
                  </div>
                  {(!isTeacherLeftSideBar) ?
                    <div className={"menu_loop_section"}>
                        <NavLink to={`${path}/student-profile-page`} activeClassName={"active"}
                                 className={"menu_loop_section_inner_section"}>
                            <div className={"left_menu_item"}>
                                <div className={"left_menu_item_1"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                        <path
                                            d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 0 0 9.3-35.2l-.9-2.6a443.74 443.74 0 0 0-79.7-137.9l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 0 0-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.4a351.86 351.86 0 0 0-99 57.4l-81.9-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a446.02 446.02 0 0 0-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 0 0-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0 0 35.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0 0 25.8 25.7l2.7.5a449.4 449.4 0 0 0 159 0l2.7-.5a32.05 32.05 0 0 0 25.8-25.7l15.7-85a350 350 0 0 0 99.7-57.6l81.3 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9a283 283 0 0 1 0 92.2l-6.6 40.1 74.7 63.9a370.03 370.03 0 0 1-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 0 1-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 0 1 512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 0 1 400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390s58 11.6 79.2 32.8A111.6 111.6 0 0 1 624 502c0 29.9-11.7 58-32.8 79.2z"/>
                                    </svg>
                                </div>
                                <div className={"left_menu_item_2"}>
                                    Settings
                                </div>
                            </div>
                        </NavLink>
                    </div>:''}
                   <div className={"menu_loop_section"}>
                        <NavLink to={`${path}/student-attendance-assignment`} activeClassName={"active"}
                                 className={"menu_loop_section_inner_section"}>
                            <div className={"left_menu_item"}>
                                <div className={"left_menu_item_1"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                        <path
                                            d="M11.998 2.5A9.503 9.503 0 0 0 3.378 8H5.75a.75.75 0 0 1 0 1.5H2a1 1 0 0 1-1-1V4.75a.75.75 0 0 1 1.5 0v1.697A10.997 10.997 0 0 1 11.998 1C18.074 1 23 5.925 23 12s-4.926 11-11.002 11C6.014 23 1.146 18.223 1 12.275a.75.75 0 0 1 1.5-.037 9.5 9.5 0 0 0 9.498 9.262c5.248 0 9.502-4.253 9.502-9.5s-4.254-9.5-9.502-9.5zm.502 4.75a.75.75 0 0 0-1.5 0v5.5c0 .27.144.518.378.651l3.5 2a.75.75 0 0 0 .744-1.302L12.5 12.315V7.25z"/>
                                    </svg>
                                </div>
                                <div className={"left_menu_item_2"}>
                                    Attendance
                                </div>
                            </div>
                        </NavLink>
                    </div>
                    <div className={"menu_loop_section"}>
                        <div className={"menu_loop_section_inner_section"}>
                                <div onClick={() => setShowAlert(true)} className={"left_menu_item"}>
                                <div className={"left_menu_item_1"}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.9 489.9">
                                        <path d="M468.3 255.8l.2-.2c.3-.4.6-.7.8-1.1.1-.1.1-.2.2-.3.2-.4.5-.8.7-1.2 0-.1.1-.2.1-.2l.6-1.3c0-.1 0-.1.1-.2.2-.4.3-.9.5-1.4 0-.1 0-.2.1-.2.1-.5.3-.9.3-1.4 0-.2 0-.3.1-.5.1-.4.1-.8.2-1.2.1-.6.1-1.1.1-1.7s0-1.1-.1-1.7c0-.4-.1-.8-.2-1.2 0-.2 0-.3-.1-.5l-.3-1.4c0-.1 0-.2-.1-.2-.1-.5-.3-.9-.5-1.4 0-.1 0-.1-.1-.2l-.6-1.3c0-.1-.1-.2-.1-.2-.2-.4-.4-.8-.7-1.2-.1-.1-.1-.2-.2-.3-.3-.4-.5-.8-.8-1.1l-.2-.2c-.4-.4-.7-.9-1.2-1.3l-98.9-98.8c-6.7-6.7-17.6-6.7-24.3 0s-6.7 17.6 0 24.3l69.6 69.6H136.8c-9.5 0-17.2 7.7-17.2 17.1 0 9.5 7.7 17.2 17.2 17.2h276.8l-69.1 69.1c-6.7 6.7-6.7 17.6 0 24.3 3.3 3.3 7.7 5 12.1 5s8.8-1.7 12.1-5l98.3-98.3c.5-.6.9-1 1.3-1.4zM110.7 34.3h128c9.5 0 17.2-7.7 17.2-17.1 0-9.5-7.7-17.2-17.2-17.2h-128C59.4 0 17.6 41.8 17.6 93.1v303.7c0 51.3 41.8 93.1 93.1 93.1h125.9c9.5 0 17.2-7.7 17.2-17.1 0-9.5-7.7-17.2-17.2-17.2H110.7c-32.4 0-58.8-26.4-58.8-58.8V93.1c.1-32.5 26.4-58.8 58.8-58.8z"/>
                                    </svg>
                                </div>
                                <div className={"left_menu_item_2"}>
                                    Logout
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
export const LeftSideBarComponent = React.memo(LeftSideBarComponentFunction);
