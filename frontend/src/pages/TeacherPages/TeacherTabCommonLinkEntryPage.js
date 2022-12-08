import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import StudentTabMobileLinkEntryPage from "../../components/mobile/StudentComponent/StudentTabMobileLinkEntryPage";
import TeacherTabDesktopLinkEntryPage from "../../components/desktop/TeacherComponent/TeacherTabDesktopLinkEntryPage";
import { actionToGetTeacherAllClasses} from "../../actions/CommonAction";

export default function TeacherTabCommonLinkEntryPage() {
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(actionToGetTeacherAllClasses());
    },[])
    return (
        <>
            {(windowResizeCount >= 1200) ?
                <TeacherTabDesktopLinkEntryPage/>
                :
                <StudentTabMobileLinkEntryPage/>
            }
        </>
    )
}
