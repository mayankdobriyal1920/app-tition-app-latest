import {useState,useRef} from 'react';
import React, {IonPage} from '@ionic/react';
import DesktopHeaderContainerComponent from "../../components/desktop/DesktopHeaderContainerComponent";
import DesktopFooterContainerComponent from "../../components/desktop/DesktopFooterContainerComponent";
import DesktopSignUpComponent from "../../components/desktop/DesktopSignUpComponent";
import DesktopLoginComponent from "../../components/desktop/DesktopLoginComponent";
import {useSelector} from "react-redux";
import MainLoginWithDetailPageMobileComponent from "../../components/mobile/MainLoginWithDetailPageMobileComponent";
import AboutUsMainBodyContainerComponent from "../../components/desktop/AboutUsMainBodyContainerComponent";

const AppAboutUsPage=() => {
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
                        <AboutUsMainBodyContainerComponent/>
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

export default AppAboutUsPage;
