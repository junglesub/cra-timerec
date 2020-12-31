import React, { useMemo, useState } from "react";
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
import { Logout } from "./pages/Logout";

function PrivateRoute({ children, ...rest }: any) {
  const [user, loading] = useAuthState(firebaseApp.auth());
  const [approved, setApproved] = useState(null);

  useMemo(async () => {
    user &&
      firebaseApp
        .database()
        .ref(`/users/${user.uid}/approved`)
        .get()
        .then((doc) => setApproved(doc.val()))
        .finally(() => console.log("Database Request"));
  }, [user]);

  // 로딩중일경우 로딩화면만 보여주기
  if (loading) return <IonLoading isOpen={loading} />;

  if (!!user) {
    // 인증을 받았는지 확인
    // approveChecker.then((doc) => console.log(doc?.val()));
    if (approved === null) return <IonLoading isOpen={true} />;
    if (approved) {
      return <Route {...rest} />;
    } else {
      return <Wait />;
    }
    // if ((await approveChecker)?.val()) return <Route {...rest} />;
    // else return <Wait />;
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

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <MenuContainer />
        <IonRouterOutlet id="main">
          <PrivateRoute path="/home" component={Home} exact={true} />
          <PrivateRoute path="/idle" component={WorkIdle} exact={true} />
          <PrivateRoute path="/work" component={WorkProgress} exact={true} />
          {/* 로그인/대기목록 */}
          <Route path="/login" component={Login} exact={true} />
          <Route path="/logout" component={Logout} exact={true} />
          <Route path="/wait" component={Wait} exact={true} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
