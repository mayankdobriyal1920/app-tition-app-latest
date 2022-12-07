import React from "react";
import {useSelector} from "react-redux";
import StudentTabDesktopLinkEntryPage from "../../components/desktop/StudentComponent/StudentTabDesktopLinkEntryPage";
import StudentTabMobileLinkEntryPage from "../../components/mobile/StudentComponent/StudentTabMobileLinkEntryPage";

export default function StudentTabCommonLinkEntryPage() {
    const windowResizeCount = useSelector((state) => state.windowResizeCount);

    return (
        <>
            {(windowResizeCount >= 1200) ?
                <StudentTabDesktopLinkEntryPage/>
                :
                <StudentTabMobileLinkEntryPage/>
            }
        </>
    )
}
