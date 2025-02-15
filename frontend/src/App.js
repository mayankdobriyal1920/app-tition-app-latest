import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React, {useEffect} from 'react';
import {IonApp, IonLoading, setupIonicReact} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/css/facebook.css';
import './theme/css/custom-progress-bar.css';
import './theme/css/animate.css';
import './theme/css/style.css';
import './theme/css/spacing.css';
import './theme/css/_common.css';
import './theme/css/app_style.css';
import './theme/css/responsive.css';
import './theme/css/app_style_common.scss';
/* Theme variables */
import './theme/variables.css';
import {useDispatch, useSelector} from "react-redux";
import MainAppHomePageWithLogin from "./pages/MainAppHomePageWithLogin/MainAppHomePageWithLogin";
import $ from "jquery";
import {actionToGetUserSessionData, actionToSetWindowSizeCount} from "./actions/CommonAction";
import {isStudentLogin, isSuperAdminLogin, isTeacherMasterLogin} from "./middlewear/auth";
import {AppEnterMainPage} from "./pages/AppEnterMainPage";
import {useEffectOnce} from "./helper/UseEffectOnce";
import AppAboutUsPage from "./pages/MainAppHomePageWithLogin/AppAboutUsPage";
import AppMainPricingPage from "./pages/MainAppHomePageWithLogin/AppMainPricingPage";
import AppMainContactUsPage from "./pages/MainAppHomePageWithLogin/AppMainContactUsPage";

setupIonicReact();

const PublicRoutes = () => {
  return (
      <IonReactRouter>
        <Route path="/home" exact={true} component={MainAppHomePageWithLogin} />
        <Route path="/about" exact={true} component={AppAboutUsPage} />
        <Route path="/pricing" exact={true} component={AppMainPricingPage} />
        <Route path="/contact" exact={true} component={AppMainContactUsPage} />
        <Redirect exact from="/" to="/home" />
        <Route render={() => <Redirect to="/home" />} />
      </IonReactRouter>
  );
};


const App = () => {
   const dispatch = useDispatch();
   const userSession = useSelector((state) => state.userSession);
   const {userInfo} = useSelector((state) => state.userSignin);

    useEffect(() => {
        dispatch(actionToSetWindowSizeCount($(window).width()));
        window.addEventListener('resize', function() {
          dispatch(actionToSetWindowSizeCount($(window).width()));
        });
    }, []);

    useEffect(() => {
        dispatch(actionToGetUserSessionData());
    }, []);


  return (
      <IonApp>

          {(!userSession?.loading) ?
              <React.Fragment>
                  {userInfo?.id ? <AppEnterMainPage/> : <PublicRoutes/>}
              </React.Fragment>
              :
              <IonLoading className={"loading_loader_spinner_container"} isOpen={userSession?.loading} message={"Loading..."}/>
          }
      </IonApp>
  )
}

export default App;

