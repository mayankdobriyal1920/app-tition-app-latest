import {useState,useRef} from 'react';
import React, {IonPage} from '@ionic/react';
import DesktopHeaderContainerComponent from "../../components/desktop/DesktopHeaderContainerComponent";
import DesktopMainBodyContainerComponent from "../../components/desktop/DesktopMainBodyContainerComponent";
import DesktopFooterContainerComponent from "../../components/desktop/DesktopFooterContainerComponent";
import DesktopSignUpComponent from "../../components/desktop/DesktopSignUpComponent";
import DesktopLoginComponent from "../../components/desktop/DesktopLoginComponent";
import StudentTabDesktopLinkEntryPage from "../../components/desktop/StudentComponent/StudentTabDesktopLinkEntryPage";
import StudentTabMobileLinkEntryPage from "../../components/mobile/StudentComponent/StudentTabMobileLinkEntryPage";
import {useSelector} from "react-redux";
import MainLoginWithDetailPageMobileComponent from "../../components/mobile/MainLoginWithDetailPageMobileComponent";

const MainAppHomePageWithLogin=() => {
    const windowResizeCount = useSelector((state) => state.windowResizeCount);
    const mainScrollDivRef = useRef();
    const [scrollBodyValue,setScrollBodyValue] = useState(0);
    const getScrollValue = (e)=>{
        setScrollBodyValue(e.target.scrollTop);
    }
    return (
        <IonPage>
            <>
                {(windowResizeCount >= 1000) ?
                    <div className={"main_scroll_body_component"} ref={mainScrollDivRef} onScroll={getScrollValue}>
                        <DesktopHeaderContainerComponent scrollBodyValue={scrollBodyValue}/>
                        <DesktopMainBodyContainerComponent/>
                        <DesktopFooterContainerComponent/>
                        <DesktopSignUpComponent/>
                        <DesktopLoginComponent/>
                    </div>
                    :
                    <MainLoginWithDetailPageMobileComponent/>
                }
            </>
        </IonPage>
    );
};

export default MainAppHomePageWithLogin;
