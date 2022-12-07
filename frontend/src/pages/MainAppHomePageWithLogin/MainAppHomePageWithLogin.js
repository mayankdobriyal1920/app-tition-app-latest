import {useState,useRef} from 'react';
import React, {IonPage} from '@ionic/react';
import DesktopHeaderContainerComponent from "../../components/desktop/DesktopHeaderContainerComponent";
import DesktopMainBodyContainerComponent from "../../components/desktop/DesktopMainBodyContainerComponent";
import DesktopFooterContainerComponent from "../../components/desktop/DesktopFooterContainerComponent";
import DesktopSignUpComponent from "../../components/desktop/DesktopSignUpComponent";
import DesktopLoginComponent from "../../components/desktop/DesktopLoginComponent";

const MainAppHomePageWithLogin=() => {

    const mainScrollDivRef = useRef();
    const [scrollBodyValue,setScrollBodyValue] = useState(0);
    const getScrollValue = (e)=>{
        setScrollBodyValue(e.target.scrollTop);
    }
    return (
        <IonPage>
            <div className={"main_scroll_body_component"} ref={mainScrollDivRef} onScroll={getScrollValue}>
                <DesktopHeaderContainerComponent scrollBodyValue={scrollBodyValue}/>
                <DesktopMainBodyContainerComponent/>
                <DesktopFooterContainerComponent/>
                <DesktopSignUpComponent/>
                <DesktopLoginComponent/>
            </div>
        </IonPage>
    );
};

export default MainAppHomePageWithLogin;
