import React from "react";
import {useSelector} from "react-redux";
import StudentTodayClassesMobileComponent from "./StudentTodayClassesMobileComponent";
import {StudentCreateProfileMobileComponent} from "./StudentCreateProfileMobileComponent";
import {IonContent} from "@ionic/react";


export default function StudentDashboardMobile() {
    const {userInfo} = useSelector((state) => state.userSignin);

    return (
        <IonContent>
            {(userInfo?.has_profile) ?
                <StudentTodayClassesMobileComponent/>
                :
                <StudentCreateProfileMobileComponent/>
            }

        </IonContent>
    )
}
