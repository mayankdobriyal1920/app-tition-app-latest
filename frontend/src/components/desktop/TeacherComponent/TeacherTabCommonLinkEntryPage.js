import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import StudentTabMobileLinkEntryPage from "../../mobile/StudentComponent/StudentTabMobileLinkEntryPage";
import TeacherTabDesktopLinkEntryPage from "./TeacherTabDesktopLinkEntryPage";
import { actionToGetTeacherAllClasses} from "../../../actions/CommonAction";

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
