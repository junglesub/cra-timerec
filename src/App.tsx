import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonLoading, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { useAuthState } from "react-firebase-hooks/auth";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Wait from "./pages/Wait";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import WorkIdle from "./pages/WorkIdle";
import WorkProgress from "./pages/WorkProgress";
import MenuContainer from "./components/MenuContainer";
import { firebaseApp } from "./FirebaseApp";

function PrivateRoute({ children, ...rest }: any) {
  const [user, loading, error] = useAuthState(firebaseApp.auth());
  console.log({ user, loading });
  if (loading) {
    return <IonLoading isOpen={true} />;
  }
  if (!!user) {
    // Check Handong Domain
    return <Route {...rest} />;
    // if (auth.email.split("@").pop() === "handong.edu") {
    // } else {
    //   return (
    //     <IonAlert
    //       isOpen={!auth.isEmpty}
    //       onDidDismiss={() => firebase.logout()}
    //       header={"한동대 이메일을 이용해주세요"}
    //       message={"한동대 이메일 (학번@handong.edu) 만 사용할 수 있습니다."}
    //       buttons={["로그아웃"]}
    //     />
    //   );
    // }
  } else {
    // Not Logged In
    return (
      <Route
        {...rest}
        component={null}
        render={() => <Redirect to="/login" />}
      />
    );
  }
}

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <MenuContainer />
      <IonRouterOutlet id="main">
        <PrivateRoute path="/home" component={Home} exact={true} />
        <Route path="/idle" component={WorkIdle} exact={true} />
        <Route path="/work" component={WorkProgress} exact={true} />
        {/* 로그인/대기목록 */}
        <Route path="/login" component={Login} exact={true} />
        <Route path="/wait" component={Wait} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
