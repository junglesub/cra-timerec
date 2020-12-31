import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { firebaseApp } from "../FirebaseApp";
import qs from "qs";
import signinwithslack from "../assets/signinwithslack.png";
import uriList from "../uriList";
import "./Login.css";

const Login: React.FC = () => {
  const location = useLocation();
  useEffect(() => {
    // Check if token is returned.
    const { token } = qs.parse(location.search, { ignoreQueryPrefix: true });
    if (!!token) {
      firebaseApp
        .auth()
        .signInWithCustomToken(token.toString())
        .then((e) =>
          console.log(
            "Signed in - ",
            JSON.stringify(firebaseApp.auth().currentUser),
            null,
            2
          )
        )
        .catch((err) => console.log("Error"));
    }
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <h1>슬랙을 활용해 로그인</h1>
          <div>
            <img
              id="signinwithslack"
              src={signinwithslack}
              alt="Sign With Slack Button"
              onClick={() =>
                (window.location.href = `${uriList.app}/slackauth`)
              }
            />
            🤫 <u>개인정보 수집 및 이용</u>을 동의합니다.
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
