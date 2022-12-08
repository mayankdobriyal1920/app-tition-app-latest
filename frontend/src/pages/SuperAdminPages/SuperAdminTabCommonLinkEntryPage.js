import React, {useEffect} from "react";
import '../../theme/css/admin-style.css';
import {useDispatch, useSelector} from "react-redux";
import StudentTabMobileLinkEntryPage from "../../components/mobile/StudentComponent/StudentTabMobileLinkEntryPage";
import { actionToGetTeacherAllClasses} from "../../actions/CommonAction";
import SuperAdminTabDesktopLinkEntryPage
    from "../../components/desktop/SuperAdminComponent/SuperAdminTabDesktopLinkEntryPage";

export default function SuperAdminTabCommonLinkEntryPage() {
    const windowResizeCount = useSelector((state) => state.windowResizeCount);


    const dispatch = useDispatch();
    // useEffect(()=>{
    //     dispatch(actionToGetTeacherAllClasses());
    // },[])
    return (
        <>
            {(windowResizeCount >= 1200) ?
                <SuperAdminTabDesktopLinkEntryPage/>
                :
                <StudentTabMobileLinkEntryPage/>
            }
        </>
    )
}
